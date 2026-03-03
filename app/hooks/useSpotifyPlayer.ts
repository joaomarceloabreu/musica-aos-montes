"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export function useSpotifyPlayer() {
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const destroyAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeAttribute("src");
      audioRef.current.load();
      audioRef.current = null;
    }
  }, []);

  const createAudio = useCallback(
    (src: string) => {
      destroyAudio();

      const audio = new Audio(src);
      audio.volume = volume;
      audio.preload = "metadata";

      audio.addEventListener("loadedmetadata", () =>
        setDuration(audio.duration)
      );
      audio.addEventListener("timeupdate", () =>
        setCurrentTime(audio.currentTime)
      );
      audio.addEventListener("ended", () => {
        setIsPlaying(false);
        setCurrentTime(0);
      });
      audio.addEventListener("error", () => setIsPlaying(false));

      audioRef.current = audio;
      return audio;
    },
    [volume, destroyAudio]
  );

  const playTrack = useCallback(
    async (trackIndex: number, previewUrl: string) => {
      if (currentTrack === trackIndex && audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          await audioRef.current.play();
          setIsPlaying(true);
        }
        return;
      }

      const audio = createAudio(previewUrl);
      setCurrentTrack(trackIndex);
      await audio.play();
      setIsPlaying(true);
    },
    [currentTrack, isPlaying, createAudio]
  );

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const stop = useCallback(() => {
    destroyAudio();
    setCurrentTrack(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, [destroyAudio]);

  const seekTo = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const changeVolume = useCallback((v: number) => {
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  }, []);

  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  return {
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
  };
}
