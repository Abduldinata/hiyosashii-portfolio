"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SplitWords({
  text,
  className = "",
  baseDelay = 0.8,
  charDuration = 0.65,
}) {
  return (
    <motion.span
      initial={false}
      animate={{ opacity: 1 }}
      style={{ opacity: 0 }}
      className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}
      aria-label={text}
    >
      {text.split(" ").map((word, wordIndex) => (
        <span
          key={`${word}-${wordIndex}`}
          className="inline-flex overflow-hidden"
        >
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={`${word}-${wordIndex}-${charIndex}`}
              className="inline-block"
              initial={{
                opacity: 0,
                y: "40%",
                rotate: "1.5deg",
                filter: "blur(4px)",
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotate: "0deg",
                filter: "blur(0px)",
              }}
              viewport={{
                once: false,
                amount: 0.08,
                margin: "0px 0px 40% 0px",
              }}
              transition={{
                duration: charDuration,
                ease: [0.16, 1, 0.3, 1],
                delay: baseDelay + (wordIndex * 5 + charIndex) * 0.04,
                filter: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
}
