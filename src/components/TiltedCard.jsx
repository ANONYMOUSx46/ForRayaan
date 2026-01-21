import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import './TiltedCard.css'

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2
}

export default function TiltedCard({
  imageSrc,
  altText = 'Tilted card image',
  captionText = '',
  containerHeight = '420px',
  containerWidth = '420px',
  imageHeight = '420px',
  imageWidth = '420px',
  scaleOnHover = 1.04,
  rotateAmplitude = 10,
  onClick
}) {
  const ref = useRef(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(0, springValues)
  const rotateY = useSpring(0, springValues)
  const scale = useSpring(1, springValues)

  function handleMouse(e) {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const offsetX = e.clientX - rect.left - rect.width / 2
    const offsetY = e.clientY - rect.top - rect.height / 2

    rotateX.set((offsetY / rect.height) * -rotateAmplitude)
    rotateY.set((offsetX / rect.width) * rotateAmplitude)
  }

  function reset() {
    rotateX.set(0)
    rotateY.set(0)
    scale.set(1)
  }

  return (
    <figure
      ref={ref}
      className="tilted-card-figure"
      style={{ width: containerWidth, height: containerHeight }}
      onMouseMove={handleMouse}
      onMouseEnter={() => scale.set(scaleOnHover)}
      onMouseLeave={reset}
      onClick={onClick}
    >
      <motion.div
        className="tilted-card-inner"
        style={{ rotateX, rotateY, scale }}
      >
        <img
          src={imageSrc}
          alt={altText}
          className="tilted-card-img"
          style={{ width: imageWidth, height: imageHeight }}
        />
      </motion.div>

      <p className="mt-3 text-sm text-gray-600 text-center">
        {captionText}
      </p>
    </figure>
  )
}
