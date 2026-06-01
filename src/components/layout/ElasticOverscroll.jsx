"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

export default function ElasticOverscroll({ children }) {
  const pullY = useSpring(0, {
    stiffness: 280,
    damping: 25,
    mass: 0.15,
  });
  const isPulling = useRef(false);
  const prevDelta = useRef(0);

  useEffect(() => {
    const handleWheel = (e) => {
      const atTop = window.scrollY <= 0;
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      const scrollingUp = e.deltaY < 0;
      const scrollingDown = e.deltaY > 0;

      if ((atTop && scrollingUp) || (atBottom && scrollingDown)) {
        e.preventDefault();
        isPulling.current = true;

        const d = Math.abs(e.deltaY);
        // iOS-like rubber-band: logarithmic resistance
        const pull = (1 - Math.exp(-d / 180)) * 60;

        if (atTop && scrollingUp) {
          pullY.set(pull);
        } else if (atBottom && scrollingDown) {
          pullY.set(-pull);
        }
      } else {
        if (isPulling.current) {
          isPulling.current = false;
          pullY.set(0);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [pullY]);

  return (
    <motion.div style={{ y: pullY }} className="will-change-transform">
      {children}
    </motion.div>
  );
}
