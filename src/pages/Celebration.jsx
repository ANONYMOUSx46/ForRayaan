import Confetti from "react-confetti";
import { useEffect, useState } from "react";

export default function Celebration() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        maxWidth: 400,
      }}
    >
      <Confetti width={dimensions.width} height={dimensions.height} />
      <h1 className="glow-title-celebrate">YOU SAID YES 💖</h1>
      <p className="glow-celebrate-sub">
        A little love.
        <br />
        A lot of forever.
      </p>
    </div>
  );
}
