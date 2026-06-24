"use client";

import { useTheme } from "@/components/layout/ThemeProvider";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={toggleTheme}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="group relative flex h-7 w-[54px] cursor-pointer items-center rounded-full border outline-none transition-all duration-500 focus-visible:ring-2 focus-visible:ring-[#1E8DDE]/50"
      style={{
        borderColor: isDark
          ? "rgba(255,255,255,0.06)"
          : isHovered
            ? "rgba(30,141,222,0.3)"
            : "rgba(255,255,255,0.15)",
        background: isDark
          ? "linear-gradient(135deg, rgba(10,15,26,0.6), rgba(15,26,46,0.8))"
          : "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.35))",
        boxShadow: isDark
          ? "inset 0 1px 0 rgba(255,255,255,0.05), 0 0 12px rgba(59,158,255,0.08)"
          : "inset 0 1px 0 rgba(255,255,255,0.3), 0 2px 8px rgba(0,0,0,0.04)",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Track icons - Sun */}
      <span
        className="absolute left-[7px] z-10 flex items-center justify-center"
        style={{
          opacity: isDark ? 0.2 : 0.9,
          transition: "opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <svg
          className="h-3 w-3"
          style={{
            color: isDark ? "white" : "#f59e0b",
            filter: isDark
              ? "none"
              : "drop-shadow(0 0 3px rgba(245,158,11,0.3))",
            transition: "color 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      </span>

      {/* Track icons - Moon */}
      <span
        className="absolute right-[7px] z-10 flex items-center justify-center"
        style={{
          opacity: isDark ? 0.9 : 0.2,
          transition: "opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <svg
          className="h-3 w-3"
          style={{
            color: isDark ? "#93C5FD" : "white",
            filter: isDark
              ? "drop-shadow(0 0 4px rgba(147,197,253,0.4))"
              : "none",
            transition: "color 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>

      {/* Sliding knob */}
      <motion.span
        layout
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 28,
          mass: 0.6,
        }}
        className="absolute z-20 flex items-center justify-center rounded-full"
        style={{
          width: "22px",
          height: "22px",
          left: "3px",
          top: "50%",
          marginTop: "-11px",
          x: isDark ? 26 : 0,
          background: isDark
            ? "linear-gradient(135deg, #0f1a2e, #1a2a4a)"
            : "white",
          boxShadow: isDark
            ? "0 2px 8px rgba(0,0,0,0.3), 0 0 12px rgba(59,158,255,0.25)"
            : "0 2px 8px rgba(0,0,0,0.1), 0 0 4px rgba(255,255,255,0.5)",
          transition:
            "background 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
          transition={{
            duration: 0.25,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="flex items-center justify-center"
        >
          {isDark ? (
            <svg
              className="h-3 w-3"
              style={{ color: "#5DC3F5" }}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg
              className="h-3 w-3"
              style={{ color: "#f59e0b" }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          )}
        </motion.span>
      </motion.span>
    </button>
  );
}
