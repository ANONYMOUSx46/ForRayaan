import { motion } from "framer-motion"

export default function Intro({ next }) {
  return (
    <div
      onClick={next}
      style={{
        textAlign: "center",
        cursor: "pointer",
        maxWidth: 320,
      }}
    >
      <h1 className="glow-title">
        A little story,
        <br />
        just for you 💖
      </h1>

      <p className="glow-subtitle">
        Tap Here!
      </p>
    </div>
  );
}







