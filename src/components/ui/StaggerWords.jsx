"use client";

import React from "react";
import { motion } from "framer-motion";

export default function StaggerWords({
  text,
  className = "",
  baseDelay = 0.5,
  wordDuration = 0.45,
  staggerDelay = 0.06,
}) {
  const words = text.split(" ");

  return (
    <motion.span
      initial={false}
      animate={{ opacity: 1 }}
      style={{ opacity: 0 }}
      className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}
      aria-label={text}
    >
      {words.map((word, wordIndex) => (
        <motion.span
          key={`${word}-${wordIndex}`}
          className="inline-block overflow-hidden"
          initial={{
            opacity: 0,
            y: "55%",
            scale: 0.96,
            filter: "blur(3px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
          }}
          viewport={{ once: false, amount: 0.08, margin: "0px 0px 40% 0px" }}
          transition={{
            duration: wordDuration,
            ease: [0.16, 1, 0.3, 1],
            delay: baseDelay + wordIndex * staggerDelay,
            filter: { duration: 0.15, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          {word === " " ? "\u00A0" : word}
        </motion.span>
      ))}
    </motion.span>
  );
}
