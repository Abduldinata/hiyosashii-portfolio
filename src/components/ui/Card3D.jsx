"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";

const springSmooth = {
  type: "spring",
  stiffness: 120,
  damping: 22,
  mass: 1.2,
};

export default function Card3D({ children, className = "", intensity = 8 }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setRotate({
        x: (y - 0.5) * -intensity,
        y: (x - 0.5) * intensity,
      });
    },
    [intensity],
  );

  const handleMouseLeave = useCallback(() => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  return (
    <motion.div
      className={`transform-gpu will-change-transform ${className}`}
      style={{
        perspective: "900px",
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotate.x,
        rotateY: rotate.y,
        scale: isHovered ? 1.006 : 1,
      }}
      transition={springSmooth}
    >
      <div style={{ transformStyle: "preserve-3d" }} className="relative">
        {children}
      </div>
    </motion.div>
  );
}
