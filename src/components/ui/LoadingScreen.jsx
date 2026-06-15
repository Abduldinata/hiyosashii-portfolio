"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

function GeistDots() {
  return (
    <span className="inline-flex items-center gap-[3px]" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block h-[5px] w-[5px] rounded-full bg-[#5DC3F5]"
          animate={{ opacity: [0.2, 1, 1, 0.2], scale: [0.7, 1, 1, 0.7] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}
    </span>
  );
}

export default function LoadingScreen({ onFinish }) {
  const finishedRef = useRef(false);

  useEffect(() => {
    let timeoutId;

    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      timeoutId = setTimeout(() => {
        onFinish?.();
      }, 400);
    };

    if (document.readyState === "complete") {
      timeoutId = setTimeout(finish, 2800);
    } else {
      const onLoad = () => {
        window.removeEventListener("load", onLoad);
        timeoutId = setTimeout(finish, 2800);
      };
      window.addEventListener("load", onLoad);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [onFinish]);

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="h-20 w-20 overflow-hidden rounded-full border-2 border-white/25 bg-white/10 shadow-[0_0_45px_rgba(30,141,222,0.2)]"
      >
        <img
          src="/assets/characters/load.png"
          alt="Loading"
          className="h-full w-full object-cover"
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-[#5DC3F5]/60"
      >
        Loading
        <GeistDots />
      </motion.p>
    </div>
  );
}
