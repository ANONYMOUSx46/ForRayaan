import { useEffect } from "react";

export default function FloatingHearts() {
  useEffect(() => {
    const container = document.createElement("div");
    container.className = "hearts-container";
    document.body.appendChild(container);

    const interval = setInterval(() => {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = 6 + Math.random() * 4 + "s";
      container.appendChild(heart);

      setTimeout(() => heart.remove(), 10000);
    }, 500);

    return () => {
      clearInterval(interval);
      container.remove();
    };
  }, []);

  return null;
}
