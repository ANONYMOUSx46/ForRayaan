import { useState } from "react";
import { motion } from "framer-motion";
import MemoryCard from "../components/MemoryCard";

const memories = [
  { date: "💖 The Beginning", text: "The day our fun memories together started!", img: "/1.jpg" },
  { date: "🍰 First Date", text: "Nervous smiles & butterflies", img: "/2.jpg" },
  { date: "🏖️ First Trip", text: "Sleepy Time", img: "/3.jpg" },
  { date: "😂 Fun Memory", text: "Laughing until it hurt", img: "/5.jpg" },
  { date: "🤪 Silly Moment", text: "Being weird together", img: "/4.jpg" },
  { date: "💞 Recent Memory", text: "Still choosing each other", img: "/7.jpg" },
  { date: "✨ And Now…", text: "One more question", img: "/6.jpg" },
];

export default function Memories({ next }) {
  const [index, setIndex] = useState(0);

  function handleNext() {
    if (index < memories.length - 1) {
      setIndex(i => i + 1);
    } else {
      next();
    }
  }

  return (
    <motion.div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <MemoryCard
        key={index}
        memory={memories[index]}
        onNext={handleNext}
      />
    </motion.div>
  );
}
