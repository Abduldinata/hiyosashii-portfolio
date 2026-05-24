"use client";

import React from "react";
import { motion } from "framer-motion";

const decorativeWords = [
  { label: "HELLO", className: "right-[13%] top-[18%] rotate-6" },
  { label: "こんにちは", className: "right-[22%] bottom-[22%] rotate-2" },
];

const focusItems = ["Editing", "Design", "UI/UX", "AI Workflow"];

const sectionVariants = {
  hidden: { opacity: 0.88, y: 22, scale: 0.988, filter: "blur(2px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
  },
};

function SplitWords({ text, className = "" }) {
  return (
    <span className={`split-reveal ${className}`} aria-label={text}>
      {text.split(" ").map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="split-word"
          style={{ "--word-index": index }}
          aria-hidden="true"
        >
          {word}
        </span>
      ))}
    </span>
  );
}

export default function IntroSection() {
  return (
    <section
      id="home"
      className="hiyo-scroll-section hiyo-section-surface relative min-h-[calc(100vh-88px)] scroll-mt-24 overflow-hidden bg-transparent px-6 py-20 sm:px-8 lg:px-12"
    >
      <div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        aria-hidden="true"
      >
        {decorativeWords.map((word, index) => (
          <span
            key={word.label}
            className={`hiyo-float-slow absolute text-xs font-black uppercase tracking-[0.28em] text-[#123A5A]/10 ${word.className}`}
            style={{ animationDelay: `${index * 0.45}s` }}
          >
            {word.label}
          </span>
        ))}
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-248px)] max-w-[1180px] items-center">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-12 xl:gap-14">
          <motion.div
            className="max-w-[760px] lg:ml-8"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: false,
              amount: 0.16,
              margin: "-6% 0px -6% 0px",
            }}
            variants={sectionVariants}
          >
            <motion.span
              variants={itemVariants}
              className="inline-flex rounded-full border border-white/60 bg-white/35 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-[#1E8DDE] shadow-sm backdrop-blur-sm"
            >
              Welcome to my portfolio
            </motion.span>

            <motion.h1
              variants={titleVariants}
              className="mt-7 text-5xl font-black tracking-[-0.055em] text-[#123A5A] sm:text-6xl lg:text-7xl"
            >
              <SplitWords text="Hi, I'm Abdul." />
            </motion.h1>

            <motion.h2
              variants={titleVariants}
              className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#2D8FE3] sm:text-4xl lg:text-5xl"
            >
              <SplitWords text="Creative Digital Portfolio" />
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="mt-5 text-lg font-extrabold leading-relaxed text-[#134E7D] sm:text-xl"
            >
              Editing, Design, UI/UX, and AI-Assisted Development.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="mt-5 max-w-[680px] text-sm font-semibold leading-relaxed text-[#123A5A]/80 sm:text-base"
            >
              Saya menggabungkan kemampuan visual, editing, UI layouting, dan
              AI-assisted workflow untuk membangun karya digital yang rapi,
              komunikatif, dan punya identitas visual.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="#profile"
                className="inline-flex items-center justify-center rounded-full bg-[#1E8DDE] px-7 py-3 text-sm font-black uppercase tracking-[0.16em] text-white shadow-sm shadow-[#1E8DDE]/10 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_16px_40px_rgba(30,141,222,0.32)] active:scale-95"
              >
                Explore Profile
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center rounded-full border-2 border-[#1E8DDE] bg-white/10 px-7 py-3 text-sm font-black uppercase tracking-[0.16em] text-[#1E8DDE] backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:bg-white/70 hover:shadow-[0_14px_34px_rgba(30,141,222,0.18)] active:scale-95"
              >
                View Portfolio
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative w-full max-w-[420px] justify-self-center lg:justify-self-end lg:-translate-x-8"
            initial={{
              opacity: 0.84,
              x: 28,
              scale: 0.975,
              filter: "blur(2px)",
            }}
            whileInView={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.16, margin: "-6% 0px -6% 0px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{
              y: -6,
              scale: 1.025,
              boxShadow: "0 28px 70px rgba(30, 141, 222, 0.24)",
            }}
          >
            <div className="relative w-full overflow-hidden rounded-[28px] border border-white/55 bg-white/22 p-6 shadow-[0_24px_70px_rgba(30,141,222,0.16)] ring-1 ring-white/30 backdrop-blur-md transition-shadow duration-500 hover:shadow-[0_26px_76px_rgba(30,141,222,0.20)] sm:p-7">
              <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-[#2D8FE3]/12 blur-2xl" />
              <div className="absolute -bottom-14 -left-14 h-28 w-28 rounded-full bg-white/35 blur-2xl" />
              <div className="hiyo-orbit absolute right-9 top-9 h-3 w-3 rounded-full bg-[#1E8DDE]/45 shadow-[0_0_22px_rgba(30,141,222,0.38)]" />

              <div className="relative">
                <p className="mb-5 text-[0.82rem] font-black uppercase tracking-[0.22em] text-[#1E8DDE]">
                  Focus Area
                </p>
                <div className="grid gap-4">
                  {focusItems.map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{
                        opacity: 0.88,
                        y: 14,
                        scale: 0.988,
                        filter: "blur(2px)",
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        filter: "blur(0px)",
                      }}
                      viewport={{ once: false, amount: 0.35 }}
                      transition={{
                        duration: 0.42,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.08 * index,
                      }}
                      whileHover={{ y: -4, x: 6, scale: 1.02 }}
                      className="group flex min-h-[54px] items-center rounded-2xl border border-white/70 bg-white/70 px-5 text-sm font-black uppercase tracking-[0.16em] text-[#123A5A] shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_14px_34px_rgba(30,141,222,0.20)] sm:min-h-[56px] sm:text-base"
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
