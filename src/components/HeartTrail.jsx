import { useEffect, useState } from "react"

export default function HeartTrail() {
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    const addHeart = e => {
      setHearts(h => [
        ...h,
        {
          id: Date.now(),
          x: e.clientX,
          y: e.clientY,
        },
      ])
    }

    window.addEventListener("mousemove", addHeart)
    return () => window.removeEventListener("mousemove", addHeart)
  }, [])

  useEffect(() => {
    if (hearts.length > 20) {
      setHearts(h => h.slice(1))
    }
  }, [hearts])

  return (
    <>
      {hearts.map(h => (
        <span
          key={h.id}
          style={{
            position: "fixed",
            left: h.x,
            top: h.y,
            pointerEvents: "none",
            opacity: 0.6,
          }}
        >
          💕
        </span>
      ))}
    </>
  )
}
