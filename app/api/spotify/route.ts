import { NextResponse } from "next/server";

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const PLAYLIST_ID =
  process.env.SPOTIFY_PLAYLIST_ID || "4uk0ZIJDZBT7fLmD5mChwC";

let accessToken: string | null = null;
let tokenExpiry = 0;

async function getAccessToken(): Promise<string> {
  if (accessToken && Date.now() < tokenExpiry) {
    return accessToken;
  }

  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
    throw new Error("Spotify credentials not configured");
  }

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64")}`,
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    throw new Error(`Failed to get Spotify access token: ${res.status}`);
  }

  const data = await res.json();
  accessToken = data.access_token;
  tokenExpiry = Date.now() + data.expires_in * 1000 - 60_000;
  return accessToken!;
}

interface SpotifyTrackItem {
  track: {
    id: string;
    name: string;
    duration_ms: number;
    preview_url: string | null;
    external_urls: { spotify: string };
    artists: Array<{ name: string; external_urls: { spotify: string } }>;
    album: {
      name: string;
      images: Array<{ url: string; height: number; width: number }>;
      external_urls: { spotify: string };
    };
  } | null;
}

interface SpotifyPlaylistResponse {
  id: string;
  name: string;
  description: string;
  external_urls: { spotify: string };
  images: Array<{ url: string; height: number; width: number }>;
  owner: { display_name: string };
  tracks: {
    items: SpotifyTrackItem[];
    total: number;
    next: string | null;
  };
}

function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export async function GET() {
  try {
    const token = await getAccessToken();

    const res = await fetch(
      `https://api.spotify.com/v1/playlists/${PLAYLIST_ID}?market=BR`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      throw new Error(`Spotify API error: ${res.status}`);
    }

    const data: SpotifyPlaylistResponse = await res.json();

    const tracks = data.tracks.items
      .filter((item) => item.track !== null)
      .map((item) => {
        const t = item.track!;
        return {
          id: t.id,
          name: t.name,
          artists: t.artists.map((a) => a.name).join(", "),
          artistsDetail: t.artists.map((a) => ({
            name: a.name,
            spotifyUrl: a.external_urls.spotify,
          })),
          duration: formatDuration(t.duration_ms),
          durationMs: t.duration_ms,
          previewUrl: t.preview_url,
          spotifyUrl: t.external_urls.spotify,
          albumName: t.album.name,
          albumImage: t.album.images[0]?.url ?? null,
          albumImageSmall: t.album.images[t.album.images.length - 1]?.url ?? null,
        };
      });

    return NextResponse.json({
      playlist: {
        id: data.id,
        name: data.name,
        description: data.description,
        spotifyUrl: data.external_urls.spotify,
        image: data.images[0]?.url ?? null,
        owner: data.owner.display_name,
        totalTracks: data.tracks.total,
      },
      tracks,
    });
  } catch (error) {
    console.error("Spotify API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch playlist data" },
      { status: 500 }
    );
  }
}
