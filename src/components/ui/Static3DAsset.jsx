"use client";

import React from "react";

export default function Static3DAsset({
  src,
  className = "",
  position = "right",
  size = "md",
  opacity = 0.15,
}) {
  const sizeMap = {
    sm: "h-40 w-40 sm:h-52 sm:w-52",
    md: "h-56 w-56 sm:h-72 sm:w-72",
    lg: "h-72 w-72 sm:h-96 sm:w-96",
  };

  const posMap = {
    right: "top-1/4 right-0 -translate-y-1/4 translate-x-1/3",
    left: "top-1/3 left-0 -translate-y-1/3 -translate-x-1/3",
    "bottom-right": "bottom-8 right-0 translate-x-1/3",
    "bottom-left": "bottom-8 left-0 -translate-x-1/3",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  };

  const rotateDir = position === "left" || position === "bottom-left" ? 1 : -1;

  if (!src) return null;

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <style>{`
        @keyframes float-${position.replace(/\s/g, "")} {
          0%, 100% { transform: translateY(0) rotateY(${rotateDir * -8}deg) rotateX(4deg); }
          50% { transform: translateY(-12px) rotateY(${rotateDir * 3}deg) rotateX(1deg); }
        }
      `}</style>
      <div
        className={`absolute ${posMap[position] || posMap.right} ${sizeMap[size] || sizeMap.md}`}
        style={{
          perspective: "1200px",
          animation: `float-${position.replace(/\s/g, "")} 7s ease-in-out infinite`,
          opacity: opacity,
        }}
      >
        <img
          src={src}
          alt=""
          className="h-full w-full object-contain drop-shadow-[0_20px_60px_rgba(30,141,222,0.12)]"
          draggable={false}
        />
      </div>
    </div>
  );
}
