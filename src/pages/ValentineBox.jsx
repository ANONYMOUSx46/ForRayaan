import { useState } from "react";
import { motion } from "framer-motion";

export default function ValentineBox({ onOpen }) {
  const [step, setStep] = useState("ask"); // "ask" -> "box" -> "yes"
  const [opened, setOpened] = useState(false);

  // Handles the box opening animation
  const handleBoxClick = () => {
    if (!opened) {
      setOpened(true);
      setTimeout(() => {
        setStep("yes"); // move to YES button after box animation
      }, 700); // match animation timing
    }
  };

  return (
    <motion.div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        height: "100%",
        textAlign: "center",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      {/* STEP 1: Ask */}
      {step === "ask" && (
        <>
          <h1 className="glow-title-lg">
            Will you be
            <br />
            my Valentine? 💝
          </h1>
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
            onClick={() => setStep("box")}
          >
            NO
          </motion.button>
        </>
      )}

      {/* STEP 2: Box Animation */}
      {step === "box" && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <motion.div
            onClick={handleBoxClick}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9, rotate: -5 }}
            initial={{ scale: 1, rotate: 0 }}
            animate={{ scale: opened ? 1.2 : 1 }}
            style={{
              width: 120,
              height: 120,
              backgroundColor: "#ff69b4",
              borderRadius: "12px",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 0 15px #ff69b4, 0 0 30px #ff1493",
              color: "white",
              fontWeight: "bold",
              fontSize: "1.2rem",
              position: "relative",
            }}
          >
            {opened ? "💖" : "🎁"}
          </motion.div>
        </div>
      )}

      {/* STEP 3: YES to trigger Celebration */}
      {step === "yes" && (
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
          onClick={onOpen} // triggers Celebration
        >
          YES 💖
        </motion.button>
      )}
    </motion.div>
  );
}
