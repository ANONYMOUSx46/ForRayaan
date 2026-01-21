import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    function unlockAudio() {
      if (!audioRef.current || unlocked) return;

      audioRef.current.volume = 0.5;
      audioRef.current.play().then(() => {
        setUnlocked(true);
      }).catch(() => {
        // Safari / iOS sometimes needs a second tap
      });
    }

    window.addEventListener("pointerdown", unlockAudio, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unlockAudio);
    };
  }, [unlocked]);

  return (
    <audio
      ref={audioRef}
      src="/love.mp3"
      loop
      preload="auto"
    />
  );
}
