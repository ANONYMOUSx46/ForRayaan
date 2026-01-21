import { motion } from "framer-motion";
import { useState } from "react";
import PresentBox from "../components/PresentBox";

export default function Valentine({ next }) {
  const [opened, setOpened] = useState(false);

  return (
    <motion.div
      style={{
        textAlign: "center",
        maxWidth: 320,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="glow-title-lg">
        Will you be
        <br />
        my Valentine? 💝
      </h1>

      {!opened && (
        <motion.button
          style={{
            padding: "14px 36px",
            background: "#111",
            color: "#fff",
            borderRadius: 999,
            fontSize: 18,
            border: "none",
            cursor: "pointer",
            boxShadow: "0 0 20px rgba(177, 11, 94, 0.4)",
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpened(true)}
        >
          NO
        </motion.button>
      )}

      {opened && <PresentBox onYes={next} />}
    </motion.div>
  );
}
