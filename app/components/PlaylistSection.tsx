"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { useSpotifyPlayer } from "../hooks/useSpotifyPlayer";

interface Track {
  id: string;
  name: string;
  artists: string;
  duration: string;
  durationMs: number;
  previewUrl: string | null;
  spotifyUrl: string;
  albumName: string;
  albumImage: string | null;
  albumImageSmall: string | null;
}

interface PlaylistInfo {
  id: string;
  name: string;
  description: string;
  spotifyUrl: string;
  image: string | null;
  owner: string;
  totalTracks: number;
}

interface PlaylistData {
  playlist: PlaylistInfo;
  tracks: Track[];
}

const TRACKS_PER_PAGE = 10;

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function SpotifyIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SkipBackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
    </svg>
  );
}

function SkipForwardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
    </svg>
  );
}

function VolumeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PlaylistSection() {
  const [data, setData] = useState<PlaylistData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    playTrack,
    pause,
    stop,
    seekTo,
    changeVolume,
  } = useSpotifyPlayer();

  useEffect(() => {
    async function fetchPlaylist() {
      try {
        const res = await fetch("/api/spotify");
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        setData(json);
      } catch {
        setError("Não foi possível carregar a playlist.");
      } finally {
        setLoading(false);
      }
    }
    fetchPlaylist();
  }, []);

  if (loading) {
    return (
      <section className="bg-cream py-24 md:py-32">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 px-6 py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple/20 border-t-purple" />
          <p className="text-sm text-navy/60">Carregando playlist...</p>
        </div>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="bg-cream py-24 md:py-32">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 px-6 py-20">
          <p className="text-terra">{error ?? "Dados não disponíveis"}</p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg border border-navy/20 px-4 py-2 text-sm font-bold text-navy transition-colors hover:bg-navy/5"
          >
            Tentar novamente
          </button>
        </div>
      </section>
    );
  }

  const { playlist, tracks } = data;
  const totalPages = Math.ceil(tracks.length / TRACKS_PER_PAGE);
  const startIdx = (page - 1) * TRACKS_PER_PAGE;
  const pageTracks = tracks.slice(startIdx, startIdx + TRACKS_PER_PAGE);
  const previewCount = tracks.filter((t) => t.previewUrl).length;

  const handlePlay = (globalIndex: number) => {
    const track = tracks[globalIndex];
    if (track.previewUrl) {
      playTrack(globalIndex, track.previewUrl);
    } else {
      window.open(track.spotifyUrl, "_blank");
    }
  };

  const currentTrackData =
    currentTrack !== null ? tracks[currentTrack] : null;

  return (
    <>
      <section id="playlist" className="bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <h2 className="mb-2 text-sm font-bold uppercase tracking-[0.3em] text-purple">
                {">"} Ouça
              </h2>
              <h3 className="mb-6 text-4xl font-bold text-navy md:text-5xl">
                Lançamentos do Selo
              </h3>
            </div>
          </ScrollReveal>

          <div className="grid gap-10 lg:grid-cols-[340px_1fr]">
            {/* Playlist cover */}
            <ScrollReveal direction="left">
              <div className="sticky top-28">
                <div className="overflow-hidden rounded-2xl shadow-2xl shadow-navy/20">
                  {playlist.image ? (
                    <Image
                      src={playlist.image}
                      alt={playlist.name}
                      width={340}
                      height={340}
                      className="aspect-square w-full object-cover"
                    />
                  ) : (
                    <div className="flex aspect-square w-full items-center justify-center bg-navy/10">
                      <SpotifyIcon className="h-20 w-20 text-navy/20" />
                    </div>
                  )}
                </div>
                <div className="mt-6">
                  <h4 className="text-xl font-bold text-navy">
                    {playlist.name}
                  </h4>
                  {playlist.description && (
                    <p className="mt-1 text-sm text-navy/60">
                      {playlist.description.replace(/<[^>]+>/g, "")}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-navy/40">
                    {playlist.totalTracks} músicas
                    {previewCount > 0 &&
                      ` · ${previewCount} com preview disponível`}
                  </p>
                  <a
                    href={playlist.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#1DB954] px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#1DB954]/30"
                  >
                    <SpotifyIcon className="h-5 w-5" />
                    Abrir no Spotify
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Track list */}
            <ScrollReveal direction="right" delay={150}>
              <div className="space-y-2">
                {pageTracks.map((track, i) => {
                  const globalIdx = startIdx + i;
                  const isActive = currentTrack === globalIdx;
                  const hasPreview = !!track.previewUrl;

                  return (
                    <div
                      key={track.id}
                      className={`group flex items-center gap-4 rounded-xl p-3 transition-all duration-200 ${
                        isActive
                          ? "bg-purple/10 shadow-sm"
                          : "hover:bg-navy/5"
                      }`}
                    >
                      {/* Album art */}
                      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg">
                        {track.albumImage ? (
                          <Image
                            src={track.albumImageSmall ?? track.albumImage}
                            alt={track.albumName}
                            width={48}
                            height={48}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-navy/10">
                            <SpotifyIcon className="h-5 w-5 text-navy/20" />
                          </div>
                        )}
                      </div>

                      {/* Play button */}
                      <button
                        onClick={() => handlePlay(globalIdx)}
                        title={
                          hasPreview
                            ? "Tocar preview de 30s"
                            : "Ouvir no Spotify"
                        }
                        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
                          isActive && isPlaying
                            ? "bg-purple text-cream"
                            : hasPreview
                              ? "bg-purple/10 text-purple hover:bg-purple hover:text-cream"
                              : "bg-[#1DB954]/10 text-[#1DB954] hover:bg-[#1DB954] hover:text-white"
                        }`}
                      >
                        {isActive && isPlaying ? (
                          <PauseIcon />
                        ) : hasPreview ? (
                          <PlayIcon />
                        ) : (
                          <ExternalLinkIcon />
                        )}
                      </button>

                      {/* Track info */}
                      <div className="min-w-0 flex-1">
                        <p
                          className={`truncate text-sm font-bold ${
                            isActive ? "text-purple" : "text-navy"
                          }`}
                        >
                          {track.name}
                        </p>
                        <p className="truncate text-xs text-navy/50">
                          {track.artists}
                          {track.albumName && ` · ${track.albumName}`}
                        </p>
                      </div>

                      {/* Duration & preview badge */}
                      <div className="hidden flex-shrink-0 items-center gap-3 sm:flex">
                        {hasPreview && (
                          <span className="rounded-full bg-purple/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-purple">
                            30s
                          </span>
                        )}
                        <span className="w-10 text-right text-xs tabular-nums text-navy/40">
                          {track.duration}
                        </span>
                      </div>

                      {/* Spotify link */}
                      <a
                        href={track.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 text-navy/20 transition-colors hover:text-[#1DB954]"
                        title="Abrir no Spotify"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <SpotifyIcon className="h-4 w-4" />
                      </a>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="rounded-lg border border-navy/10 px-3 py-2 text-xs font-bold text-navy/60 transition-colors hover:bg-navy/5 disabled:opacity-30"
                  >
                    Anterior
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`h-9 w-9 rounded-lg text-xs font-bold transition-colors ${
                          p === page
                            ? "bg-purple text-cream"
                            : "border border-navy/10 text-navy/60 hover:bg-navy/5"
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}
                  <button
                    onClick={() =>
                      setPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={page === totalPages}
                    className="rounded-lg border border-navy/10 px-3 py-2 text-xs font-bold text-navy/60 transition-colors hover:bg-navy/5 disabled:opacity-30"
                  >
                    Próxima
                  </button>
                </div>
              )}
              <p className="mt-3 text-center text-xs text-navy/40">
                Mostrando {startIdx + 1}–
                {Math.min(startIdx + TRACKS_PER_PAGE, tracks.length)} de{" "}
                {tracks.length} músicas
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Floating Mini Player */}
      {currentTrackData && (
        <div className="fixed bottom-4 right-4 z-50 w-80 animate-[fadeIn_0.3s_ease-out] rounded-2xl border border-navy/10 bg-cream/95 p-4 shadow-2xl shadow-navy/20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            {currentTrackData.albumImage && (
              <div className="h-11 w-11 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={
                    currentTrackData.albumImageSmall ??
                    currentTrackData.albumImage
                  }
                  alt={currentTrackData.albumName}
                  width={44}
                  height={44}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-navy">
                {currentTrackData.name}
              </p>
              <p className="truncate text-xs text-navy/50">
                {currentTrackData.artists}
              </p>
            </div>
            <button
              onClick={stop}
              className="flex-shrink-0 rounded-full p-1 text-navy/40 transition-colors hover:bg-navy/10 hover:text-navy"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Progress */}
          <div className="mt-3 flex items-center gap-2">
            <span className="w-8 text-right text-[10px] tabular-nums text-navy/40">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min={0}
              max={duration || 30}
              value={currentTime}
              onChange={(e) => seekTo(Number(e.target.value))}
              className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-navy/10 accent-purple [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple"
            />
            <span className="w-8 text-[10px] tabular-nums text-navy/40">
              {formatTime(duration)}
            </span>
          </div>

          {/* Controls */}
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  if (currentTrack !== null && currentTrack > 0) {
                    const prev = currentTrack - 1;
                    if (tracks[prev].previewUrl)
                      playTrack(prev, tracks[prev].previewUrl!);
                  }
                }}
                disabled={currentTrack === 0}
                className="rounded-full p-1.5 text-navy/40 transition-colors hover:text-navy disabled:opacity-30"
              >
                <SkipBackIcon />
              </button>
              <button
                onClick={() =>
                  isPlaying
                    ? pause()
                    : currentTrack !== null &&
                      tracks[currentTrack].previewUrl &&
                      playTrack(
                        currentTrack,
                        tracks[currentTrack].previewUrl!
                      )
                }
                className="flex h-9 w-9 items-center justify-center rounded-full bg-purple text-cream transition-transform hover:scale-105"
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>
              <button
                onClick={() => {
                  if (
                    currentTrack !== null &&
                    currentTrack < tracks.length - 1
                  ) {
                    const next = currentTrack + 1;
                    if (tracks[next].previewUrl)
                      playTrack(next, tracks[next].previewUrl!);
                  }
                }}
                disabled={currentTrack === tracks.length - 1}
                className="rounded-full p-1.5 text-navy/40 transition-colors hover:text-navy disabled:opacity-30"
              >
                <SkipForwardIcon />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <VolumeIcon />
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={volume}
                onChange={(e) => changeVolume(Number(e.target.value))}
                className="h-1 w-16 cursor-pointer appearance-none rounded-full bg-navy/10 accent-purple [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple"
              />
            </div>

            <a
              href={currentTrackData.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-1.5 text-[#1DB954] transition-colors hover:bg-[#1DB954]/10"
              title="Ouvir completa no Spotify"
            >
              <SpotifyIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
