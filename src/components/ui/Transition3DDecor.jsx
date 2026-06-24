"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ASSETS = [
  "/assets/3d/1.png",
  "/assets/3d/2.png",
  "/assets/3d/3.png",
  "/assets/3d/4.png",
  "/assets/3d/5.png",
];

const GREETINGS = [
  "Hello",
  "Welcome",
  "Selamat Datang",
  "Bonjour",
  "Hola",
  "你好",
  "こんにちは",
  "Ciao",
  "Hallo",
  "Olá",
  "Privet",
  "Salam",
];

const POSITIONS = [
  {
    cls: "top-1/4 right-0 -translate-y-1/4 translate-x-[5%] sm:translate-x-[18%]",
    size: "h-80 w-80 sm:h-[30rem] sm:w-[30rem] lg:h-[40rem] lg:w-[40rem]",
    side: "right",
  },
  {
    cls: "top-1/3 left-0 -translate-y-1/3 -translate-x-[5%] sm:-translate-x-[18%]",
    size: "h-80 w-80 sm:h-[30rem] sm:w-[30rem] lg:h-[40rem] lg:w-[40rem]",
    side: "left",
  },
  {
    cls: "bottom-[22%] left-0 -translate-x-[10%] sm:-translate-x-[30%]",
    size: "h-48 w-48 sm:h-64 sm:w-64 lg:h-80 lg:w-80",
    side: "left",
  },
  {
    cls: "bottom-[22%] right-0 translate-x-[10%] sm:translate-x-[30%]",
    size: "h-48 w-48 sm:h-64 sm:w-64 lg:h-80 lg:w-80",
    side: "right",
  },
  {
    cls: "top-[18%] right-[6%]",
    size: "h-56 w-56 sm:h-80 sm:w-80 lg:h-96 lg:w-96",
    side: "right",
  },
  {
    cls: "top-[12%] left-[8%]",
    size: "h-52 w-52 sm:h-72 sm:w-72 lg:h-80 lg:w-80",
    side: "left",
  },
  {
    cls: "bottom-[8%] right-[10%]",
    size: "h-56 w-56 sm:h-80 sm:w-80 lg:h-96 lg:w-96",
    side: "right",
  },
  {
    cls: "bottom-[12%] left-[15%]",
    size: "h-48 w-48 sm:h-64 sm:w-64 lg:h-80 lg:w-80",
    side: "left",
  },
];

/* ── 3 float pattern variants per side ── */
const FLOAT_KF = `
@keyframes fl-a-right {
  0%, 100% { transform: translateY(0) translateX(0) rotateY(-7deg) rotateX(4deg); }
  33%      { transform: translateY(-10px) translateX(10px) rotateY(2deg) rotateX(6deg); }
  66%      { transform: translateY(-5px) translateX(-6px) rotateY(-2deg) rotateX(2deg); }
}
@keyframes fl-a-left {
  0%, 100% { transform: translateY(0) translateX(0) rotateY(7deg) rotateX(4deg); }
  33%      { transform: translateY(-10px) translateX(-10px) rotateY(-2deg) rotateX(6deg); }
  66%      { transform: translateY(-5px) translateX(6px) rotateY(2deg) rotateX(2deg); }
}
@keyframes fl-b-right {
  0%, 100% { transform: translateY(0) translateX(0) rotateY(-5deg) rotateX(3deg); }
  50%      { transform: translateY(-12px) translateX(8px) rotateY(3deg) rotateX(5deg); }
}
@keyframes fl-b-left {
  0%, 100% { transform: translateY(0) translateX(0) rotateY(5deg) rotateX(3deg); }
  50%      { transform: translateY(-12px) translateX(-8px) rotateY(-3deg) rotateX(5deg); }
}
@keyframes fl-c-right {
  0%, 100% { transform: translateY(0) translateX(0) rotateY(-8deg) rotateX(2deg); }
  25%      { transform: translateY(-6px) translateX(12px) rotateY(-1deg) rotateX(5deg); }
  50%      { transform: translateY(-12px) translateX(-6px) rotateY(4deg) rotateX(3deg); }
  75%      { transform: translateY(-4px) translateX(8px) rotateY(-3deg) rotateX(4deg); }
}
@keyframes fl-c-left {
  0%, 100% { transform: translateY(0) translateX(0) rotateY(8deg) rotateX(2deg); }
  25%      { transform: translateY(-6px) translateX(-12px) rotateY(1deg) rotateX(5deg); }
  50%      { transform: translateY(-12px) translateX(6px) rotateY(-4deg) rotateX(3deg); }
  75%      { transform: translateY(-4px) translateX(-8px) rotateY(3deg) rotateX(4deg); }
}
@keyframes orbit-cw {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes orbit-ccw {
  from { transform: rotate(360deg); }
  to   { transform: rotate(0deg); }
}
`;

const FLOAT_TYPES = ["a", "b", "c"];
const DURATIONS = [8, 9, 10, 11, 12];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateSlide() {
  const shuffled = [...ASSETS].sort(() => Math.random() - 0.5);
  const rights = POSITIONS.filter((p) => p.side === "right");
  const lefts = POSITIONS.filter((p) => p.side === "left");
  const rightPos = rights[Math.floor(Math.random() * rights.length)];
  const leftPos = lefts[Math.floor(Math.random() * lefts.length)];
  const swap = Math.random() > 0.5;

  return {
    id: Date.now(),
    items: [
      {
        src: shuffled[0],
        pos: swap ? rightPos : leftPos,
        anim: pick(FLOAT_TYPES),
        dur: pick(DURATIONS),
        primary: true,
      },
      {
        src: shuffled[1],
        pos: swap ? leftPos : rightPos,
        anim: pick(FLOAT_TYPES),
        dur: pick(DURATIONS),
        primary: false,
      },
    ],
  };
}

const ease = [0.22, 1, 0.36, 1];

/* ── Scroll state ── */
const scrollState = { lastY: 0, vel: 0, decayId: null };

function getScrollEffect() {
  const v = scrollState.vel;
  return {
    blur: Math.min(v * 0.08, 4),
    y: window.scrollY * 0.025,
    squish: Math.min(v * 0.002, 0.025),
  };
}

export default function Transition3DDecor() {
  const [slide, setSlide] = useState(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [scrollFX, setScrollFX] = useState({ blur: 0, y: 0, squish: 0 });
  const [greetingIdx, setGreetingIdx] = useState(0);
  const counter = useRef(0);
  const fxRef = useRef(scrollState);

  /* ── Initialise on client only (avoid hydration mismatch) ── */
  useEffect(() => {
    setSlide(generateSlide());
  }, []);

  /* ── Scroll tracking (blur + parallax + squish) ── */
  useEffect(() => {
    const s = fxRef.current;
    s.lastY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - s.lastY;
      s.lastY = currentY;
      s.vel = s.vel * 0.85 + Math.abs(delta) * 0.15;
      setScrollFX(getScrollEffect());
      if (s.decayId) cancelAnimationFrame(s.decayId);
      const decay = () => {
        s.vel *= 0.88;
        if (s.vel > 0.5) {
          s.vel = Math.max(s.vel - 0.3, 0);
          setScrollFX(getScrollEffect());
          s.decayId = requestAnimationFrame(decay);
        } else {
          s.vel = 0;
          setScrollFX({ blur: 0, y: currentY * 0.025, squish: 0 });
          s.decayId = null;
        }
      };
      s.decayId = requestAnimationFrame(decay);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (s.decayId) cancelAnimationFrame(s.decayId);
    };
  }, []);

  /* ── Slideshow ── */
  useEffect(() => {
    const timer = setInterval(() => {
      counter.current += 1;
      setSlide(generateSlide());
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  /* ── Greeting cycler ── */
  useEffect(() => {
    const timer = setInterval(() => {
      setGreetingIdx((prev) => (prev + 1) % GREETINGS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  /* ── Mouse tilt ── */
  useEffect(() => {
    const onMove = (e) => {
      setTilt({
        x: ((e.clientX / window.innerWidth) * 2 - 1) * 5,
        y: ((e.clientY / window.innerHeight) * 2 - 1) * -4,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-10" aria-hidden="true">
      <style>{FLOAT_KF}</style>

      <AnimatePresence>
        {slide &&
          slide.items.map((item) => (
            <motion.div
              key={`${item.src}-${slide.id}`}
              className={`absolute ${item.pos.size} ${item.pos.cls}`}
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{
                opacity: item.primary ? 0.2 : 0.14,
                scale: 1,
                transition: {
                  duration: 0.65,
                  ease,
                  delay: item.primary ? 0 : 0.08,
                },
              }}
              exit={{
                opacity: 0,
                scale: 0.88,
                transition: { duration: 0.35, ease },
              }}
              style={{ perspective: item.primary ? "1600px" : "1200px" }}
            >
              <div
                className="relative h-full w-full"
                style={{
                  transformStyle: "preserve-3d",
                  animation: `fl-${item.pos.side}-${item.anim} ${item.dur}s ease-in-out infinite`,
                }}
              >
                <div
                  className="relative h-full w-full"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: `rotateY(${tilt.x * (item.primary ? 1 : 0.5)}deg) rotateX(${tilt.y * (item.primary ? 1 : 0.5)}deg) translateY(${scrollFX.y}px) scaleX(${1 + scrollFX.squish}) scaleY(${1 - scrollFX.squish})`,
                    transition: "transform 0.06s ease-out",
                  }}
                >
                  {/* Gloss — subtle blue tint to match branding */}
                  {item.primary && (
                    <div
                      className="pointer-events-none absolute inset-0 z-10 rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle at 30% 22%, rgba(30, 141, 222, 0.08) 0%, rgba(255,255,255,0.10) 40%, transparent 60%)",
                        mixBlendMode: "soft-light",
                      }}
                    />
                  )}

                  <img
                    src={item.src}
                    alt=""
                    className="relative h-full w-full object-contain"
                    style={{
                      transform: `translateZ(${item.primary ? 16 : 8}px)`,
                      filter: `blur(${scrollFX.blur}px) hue-rotate(340deg) saturate(0.85) ${
                        item.primary
                          ? "drop-shadow(0 30px 80px rgba(0, 0, 0, 0.10)) drop-shadow(0 12px 32px rgba(0, 0, 0, 0.06))"
                          : "drop-shadow(0 20px 60px rgba(0, 0, 0, 0.08)) drop-shadow(0 8px 24px rgba(0, 0, 0, 0.04))"
                      }`,
                    }}
                    draggable={false}
                  />

                  {/* Bottom rim — blue-tinted glow */}
                  {item.primary && (
                    <div
                      className="pointer-events-none absolute inset-x-[15%] bottom-[6%] z-10 h-[18%] rounded-full"
                      style={{
                        background:
                          "radial-gradient(ellipse at center, rgba(30, 141, 222, 0.06) 0%, transparent 70%)",
                        filter: "blur(8px)",
                        transform: "translateZ(4px)",
                      }}
                    />
                  )}

                  {/* ── Orbiting greeting ring (primary only) ── */}
                  {item.primary && (
                    <div
                      className="absolute pointer-events-none"
                      style={{
                        left: "50%",
                        top: "50%",
                        width: 0,
                        height: 0,
                        animation: "orbit-cw 30s linear infinite",
                      }}
                    >
                      {/* counter-rotate so text stays upright */}
                      <div
                        className="absolute"
                        style={{
                          left: "50%",
                          top: "-8rem",
                          width: 0,
                          height: 0,
                          animation: "orbit-ccw 30s linear infinite",
                        }}
                      >
                        <span
                          className="block text-sm font-black uppercase tracking-[0.28em] text-[#1E8DDE]/70 dark:text-[#5DC3F5]/60 whitespace-nowrap"
                          style={{
                            transform: "translateX(-50%)",
                          }}
                        >
                          {GREETINGS[greetingIdx]}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
}
