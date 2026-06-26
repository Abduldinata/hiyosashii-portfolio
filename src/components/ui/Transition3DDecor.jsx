"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ASSETS = [
  "/assets/3d/1.png",
  "/assets/3d/2.png",
  "/assets/3d/3.png",
  "/assets/3d/4.png",
  "/assets/3d/5.png",
];

const POSITIONS = [
  {
    cls: "top-1/4 right-0 -translate-y-1/4 translate-x-[5%] sm:translate-x-[15%]",
    size: "h-80 w-80 sm:h-[28rem] sm:w-[28rem] lg:h-[42rem] lg:w-[42rem]",
  },
  {
    cls: "top-1/3 left-0 -translate-y-1/3 -translate-x-[5%] sm:-translate-x-[15%]",
    size: "h-80 w-80 sm:h-[28rem] sm:w-[28rem] lg:h-[42rem] lg:w-[42rem]",
  },
  {
    cls: "top-[15%] right-[8%]",
    size: "h-72 w-72 sm:h-96 sm:w-96 lg:h-[36rem] lg:w-[36rem]",
  },
  {
    cls: "top-[20%] left-[10%]",
    size: "h-64 w-64 sm:h-80 sm:w-80 lg:h-[30rem] lg:w-[30rem]",
  },
  {
    cls: "bottom-[20%] right-[5%]",
    size: "h-72 w-72 sm:h-96 sm:w-96 lg:h-[36rem] lg:w-[36rem]",
  },
  {
    cls: "bottom-[15%] left-[5%]",
    size: "h-64 w-64 sm:h-80 sm:w-80 lg:h-[30rem] lg:w-[30rem]",
  },
];

const ease = [0.25, 0.1, 0.25, 1];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function assetKey(src) {
  return src.replace("/assets/3d/", "").replace(".png", "");
}

export default function Transition3DDecor() {
  const [src, setSrc] = useState(null);
  const [pos, setPos] = useState(null);

  useEffect(() => {
    const next = () => {
      setSrc(pick(ASSETS));
      setPos(pick(POSITIONS));
    };
    next();
    const timer = setInterval(next, 14000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-10" aria-hidden="true">
      <AnimatePresence mode="wait">
        {src && pos && (
          <motion.div
            key={assetKey(src)}
            className={`absolute ${pos.size} ${pos.cls}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.18, transition: { duration: 1.2, ease } }}
            exit={{ opacity: 0, transition: { duration: 1.2, ease } }}
            style={{ perspective: "1400px" }}
          >
            <div
              className="relative h-full w-full"
              style={{
                transformStyle: "preserve-3d",
                animation: "drift 25s ease-in-out infinite",
              }}
            >
              <style>{`
                @keyframes drift {
                  0%, 100% { transform: translateY(0) translateX(0) rotateY(-5deg) rotateX(3deg); }
                  25%  { transform: translateY(-8px) translateX(8px) rotateY(2deg) rotateX(5deg); }
                  50%  { transform: translateY(-12px) translateX(-4px) rotateY(-3deg) rotateX(2deg); }
                  75%  { transform: translateY(-4px) translateX(10px) rotateY(1deg) rotateX(4deg); }
                }
              `}</style>
              <img
                src={src}
                alt=""
                className="h-full w-full object-contain"
                style={{
                  filter:
                    "hue-rotate(340deg) saturate(0.85) drop-shadow(0 30px 80px rgba(0,0,0,0.08))",
                }}
                draggable={false}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
