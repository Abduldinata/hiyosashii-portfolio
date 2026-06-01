"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    // Skip on touch devices
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

    let mouseX = -300;
    let mouseY = -300;
    let currentX = -300;
    let currentY = -300;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      // Smooth lerp following
      currentX += (mouseX - currentX) * 0.06;
      currentY += (mouseY - currentY) * 0.06;

      glow.style.transform = `translate(${currentX - 200}px, ${currentY - 200}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    glow.style.opacity = "1";

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed left-0 top-0 pointer-events-none z-40 hidden opacity-0 transition-opacity duration-700 md:block"
      style={{
        width: "400px",
        height: "400px",
        willChange: "transform",
        background:
          "radial-gradient(circle at center, rgba(30, 141, 222, 0.15), rgba(0, 212, 255, 0.06) 40%, transparent 70%)",
      }}
      aria-hidden="true"
    />
  );
}
