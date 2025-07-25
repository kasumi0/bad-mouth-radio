import { useEffect, useRef, useState } from "react";
import styles from "./play.module.css";
import { Modal } from "./Modal";
const { radioArea, playButton, disabled } = styles;

const BGMs = ["/bgm1.mp3", "/bgm2.mp3", "/bgm3.mp3"];

const MAX_VOLUME = 1;
const INCREMENTS = 0.05;
const INTERVAL = 200;

const fadeInAudio = (audio: HTMLAudioElement) => {
  audio.volume = 0;
  audio.play();
  const fadeIn = setInterval(() => {
    if (audio.volume < MAX_VOLUME) {
      audio.volume = Math.min(audio.volume + INCREMENTS, MAX_VOLUME);
    } else {
      clearInterval(fadeIn);
    }
  }, INTERVAL);
};

const fadeOutAudio = (audio: HTMLAudioElement) => {
  const fadeOut = setInterval(() => {
    if (audio.volume > 0) {
      audio.volume = Math.max(audio.volume - INCREMENTS, 0);
    } else {
      clearInterval(fadeOut);
      audio.pause();
    }
  }, INTERVAL);
};

type Props = {
  audioBase64: string;
  onReset: () => void;
};

export const Play = ({ audioBase64, onReset }: Props) => {
  const voiceRef = useRef<HTMLAudioElement>(null);
  const bgmRef = useRef<HTMLAudioElement>(null);
  const [started, setStarted] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const [bgmSrc] = useState(() => {
    const rand = Math.floor(Math.random() * BGMs.length);
    return BGMs[rand];
  });

  const startPlayback = () => {
    const voice = voiceRef.current;
    const bgm = bgmRef.current;
    if (!voice || !bgm) return;
    
    setIsEnd(false);
    setStarted(true);
    voice.currentTime = 0;
    bgm.currentTime = 0;
    fadeInAudio(bgm);
    voice.play();
  };

  useEffect(() => {
    const voice = voiceRef.current;
    const bgm = bgmRef.current;
    if (!voice || !bgm) return;

    const handleEnded = () => {
      fadeOutAudio(bgm);
      setIsEnd(true);
    };

    voice.addEventListener("ended", handleEnded);
    return () => voice.removeEventListener("ended", handleEnded);
  }, [audioBase64, bgmSrc]);

  return (
    <div className={radioArea}>
      <audio ref={voiceRef} src={`data:audio/mp3;base64,${audioBase64}`} />
      <audio ref={bgmRef} src={bgmSrc} loop />
      {!started ? (
        <button
          onClick={startPlayback}
          className={`${playButton} ${started ? disabled : ""}`}
        >
          再生する
        </button>
      ) : (
        <Modal isEnd={isEnd} onRetry={startPlayback} onReset={onReset} />
      )}
    </div>
  );
};