import { useState } from "react";
import Silk from "./components/Silk";
import Intro from "./pages/Intro";
import Memories from "./pages/Memories";
import ValentineBox from "./pages/ValentineBox";
import Celebration from "./pages/Celebration";
import MusicPlayer from "./components/MusicPlayer";
import FloatingHearts from "./components/FloatingHearts";
import Ribbons from "./components/Ribbons";

export default function App() {
  const [page, setPage] = useState("intro"); // start with intro
  const [showCelebration, setShowCelebration] = useState(false);

  return (
    <>
      {/* Background */}
      <div style={backgroundStyle}>
        <Silk speed={5} scale={1} color="#b10b5e" noiseIntensity={1.5} rotation={0} />
        <Ribbons
          baseThickness={15}
          colors={["#fa0b6e", "#f7249f"]}
          speedMultiplier={0.5}
          maxAge={500}
          enableFade={false}
          enableShaderEffect={false}
        />
      </div>

      {/* Centered content */}
      <div style={contentStyle}>
        {page === "intro" && <Intro next={() => setPage("memories")} />}
        {page === "memories" && <Memories next={() => setPage("valentine")} />}
        {page === "valentine" && !showCelebration && (
          <ValentineBox onOpen={() => setShowCelebration(true)} />
        )}
        {page === "valentine" && showCelebration && <Celebration />}
      </div>

      <MusicPlayer />
      <FloatingHearts />
    </>
  );
}

const backgroundStyle = {
  position: "fixed",
  inset: 0,
  zIndex: -1,
};

const contentStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "24px",
};
