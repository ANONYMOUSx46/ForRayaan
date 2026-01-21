import { motion } from "framer-motion"
import { useState } from "react"

export default function PresentBox({ onYes }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      className="relative flex flex-col items-center"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
    >
      {/* GLOW */}
      <motion.div
        className="absolute w-40 h-40 rounded-full bg-pink-300 blur-3xl"
        animate={{ opacity: open ? 1 : 0 }}
      />

      {/* PRESENT */}
      <motion.div
        className="text-7xl"
        animate={
          !open
            ? { rotate: [0, -10, 10, -10, 0] }
            : { rotate: 0 }
        }
        transition={{ duration: 0.6 }}
        onClick={() => setOpen(true)}
      >
        🎁
      </motion.div>

      {/* LID OPEN EFFECT */}
      {open && (
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: -30, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute top-[-40px] text-6xl"
        >
          🎀
        </motion.div>
      )}

      {/* YES BUTTON */}
      {open && (
        <motion.button
          className="mt-6 px-8 py-4 bg-pink-500 text-white rounded-full shadow-xl text-xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          onClick={onYes}
        >
          YES 💖
        </motion.button>
      )}
    </motion.div>
  )
}
