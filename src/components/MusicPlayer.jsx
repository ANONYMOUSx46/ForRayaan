import { useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [started, setStarted] = useState(false);

  const startMusic = () => {
    if (!audioRef.current || started) return;

    audioRef.current.volume = 0.5;
    audioRef.current.muted = false;

    audioRef.current
      .play()
      .then(() => {
        setStarted(true);
      })
      .catch(() => {
        // iOS fallback: try again
        audioRef.current.play();
      });
  };

  return (
    <>
      {/* AUDIO ELEMENT */}
      <audio
        ref={audioRef}
        src="/love.mp3"
        loop
        preload="auto"
      />

      {/* TAP OVERLAY (required for mobile) */}
      {!started && (
        <div
          onClick={startMusic}
          onTouchStart={startMusic}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.85)",
            color: "#fff",
            fontSize: 18,
            cursor: "pointer",
          }}
        >
          💖 Tap to start the magic 💖
        </div>
      )}
    </>
  );
}
