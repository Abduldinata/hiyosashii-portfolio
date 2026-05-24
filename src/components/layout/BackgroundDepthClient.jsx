"use client";

import { useEffect } from "react";

export default function BackgroundDepthClient() {
  useEffect(() => {
    let rafId = 0;

    const updateDepth = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;

      document.documentElement.style.setProperty(
        "--hiyo-scroll-progress",
        progress.toFixed(4)
      );

      rafId = 0;
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(updateDepth);
      }
    };

    updateDepth();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateDepth);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateDepth);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
