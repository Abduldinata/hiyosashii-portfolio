"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tooltipSpring = {
  type: "spring",
  stiffness: 400,
  damping: 25,
  mass: 0.6,
};

export default function AnimatedTooltip({ children, content, position = "top" }) {
  const [show, setShow] = useState(false);
  const ref = useRef(null);

  const positionStyles = {
    top: { bottom: "calc(100% + 8px)", left: "50%", x: "-50%", y: 0 },
    bottom: { top: "calc(100% + 8px)", left: "50%", x: "-50%", y: 0 },
    left: { right: "calc(100% + 8px)", top: "50%", x: 0, y: "-50%" },
    right: { left: "calc(100% + 8px)", top: "50%", x: 0, y: "-50%" },
  };

  const pos = positionStyles[position] || positionStyles.top;

  return (
    <div
      ref={ref}
      className="relative inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: pos.y, x: pos.x }}
            animate={{ opacity: 1, scale: 1, y: pos.y, x: pos.x }}
            exit={{ opacity: 0, scale: 0.85, y: pos.y, x: pos.x }}
            transition={tooltipSpring}
            style={{
              position: "absolute",
              [pos.top !== undefined ? "top" : "bottom"]: pos.bottom || pos.top,
              [pos.left !== undefined ? "left" : "right"]: pos.right || pos.left,
            }}
            className="pointer-events-none z-[999] whitespace-nowrap"
          >
            <div className="rounded-xl border border-[#1E8DDE]/15 bg-[#0c1f2e]/95 px-3.5 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.2)] shadow-[0_0_20px_rgba(30,141,222,0.06)] backdrop-blur-md">
              <p className="text-xs font-semibold text-white/90">{content}</p>
            </div>
            {/* Arrow */}
            <div
              style={{
                position: "absolute",
                [position === "top" ? "bottom" : "top"]: position === "top" ? "-4px" : "-4px",
                left: "50%",
                marginLeft: "-4px",
                transform: position === "bottom" ? "rotate(180deg)" : "none",
              }}
            >
              <svg width="8" height="4" viewBox="0 0 8 4" fill="none">
                <path d="M0 0L4 4L8 0H0Z" fill="#0c1f2e" fillOpacity="0.95" />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
