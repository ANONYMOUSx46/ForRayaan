import TiltedCard from "./TiltedCard";

export default function MemoryCard({ memory, onNext }) {
  function handleClick(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;

    // Tap right half → next
    if (clickX > rect.width / 2) {
      onNext();
    }
  }

  return (
    <div
      onClick={handleClick}
      style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "12px",
      maxWidth: "320px",
      }}
    >
      <TiltedCard
        imageSrc={memory.img}
        altText={memory.text}
        captionText={memory.date}
        containerHeight="420px"
        containerWidth="420px"
        imageHeight="420px"
        imageWidth="420px"
        rotateAmplitude={20}
        scaleOnHover={1.15}
        showMobileWarning={false}
        showTooltip={false}
      />

      <p className="memory-text">
        {memory.text}
      </p>

    </div>
  );
}
