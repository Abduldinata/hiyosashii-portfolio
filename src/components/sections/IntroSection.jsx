"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import SplitWords from "../ui/SplitWords";
import StaggerWords from "../ui/StaggerWords";

const focusItems = ["Editing", "Design", "UI/UX", "AI Workflow"];

const quickStats = [
  { label: "Experience", value: "3+", icon: "⚡" },
  { label: "Projects", value: "15+", icon: "📁" },
  { label: "Certificates", value: "4", icon: "🏆" },
];

const sectionVariants = {
  hidden: { opacity: 0.88, y: 22, scale: 0.988, filter: "blur(6px)" },
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
      filter: { duration: 0.08 },
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
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.48,
      ease: [0.22, 1, 0.36, 1],
      filter: { duration: 0.08 },
    },
  },
};

export default function IntroSection() {
  const [introCardRot, setIntroCardRot] = useState({ x: 0, y: 0 });
  const [isIntroCardHovered, setIsIntroCardHovered] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);
  const cvRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cvRef.current && !cvRef.current.contains(e.target)) {
        setCvOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleIntroCardTilt = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const maxAngle = 5;
    setIntroCardRot({
      x: (y - 0.5) * -maxAngle,
      y: (x - 0.5) * maxAngle,
    });
  }, []);

  return (
    <section
      id="home"
      className="hiyo-scroll-section hiyo-section-surface relative min-h-[calc(100vh-88px)] scroll-mt-24 overflow-hidden bg-transparent px-6 py-20 sm:px-8 lg:px-12"
    >
      {/* decorative words moved to Transition3DDecor as orbiting greetings */}

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-248px)] max-w-[1200px] items-center">
        <div className="grid w-full grid-cols-1 items-center gap-8 md:grid-cols-[1.1fr_0.9fr] md:gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12 xl:gap-14 md:pb-0 pb-6">
          <motion.div
            className="max-w-[760px] lg:ml-8 md:order-1 order-1 flex flex-col justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: false,
              amount: 0.15,
              margin: "0px 0px -20% 0px",
            }}
            variants={sectionVariants}
          >
            <motion.span
              initial={{ opacity: 0, letterSpacing: "0.38em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.22em" }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.15,
              }}
              className="font-ui inline-flex rounded-full border border-white/60 dark:border-white/10 bg-white/35 dark:bg-white/[0.06] px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-[#1E8DDE] dark:text-[#5DC3F5] shadow-sm backdrop-blur-sm"
            >
              Welcome to my portfolio
            </motion.span>

            <motion.h1
              variants={titleVariants}
              className="mt-7 text-5xl font-black tracking-[-0.055em] text-[#0f3b5e] dark:text-white sm:text-6xl lg:text-7xl"
            >
              <SplitWords text="Hi, I'm Abdul." />
            </motion.h1>

            <motion.h2
              variants={titleVariants}
              className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#2D8FE3] dark:text-[#5DC3F5] sm:text-4xl lg:text-5xl"
            >
              <SplitWords text="Creative Digital Portfolio" />
            </motion.h2>

            <p className="mt-5 text-lg font-extrabold leading-relaxed text-[#1a567a] dark:text-[#93C5FD] sm:text-xl">
              <StaggerWords
                text="Editing, Design, UI/UX, and AI-Assisted Development."
                baseDelay={0.25}
                wordDuration={0.4}
                staggerDelay={0.05}
              />
            </p>

            <p className="mt-5 max-w-[680px] text-sm font-semibold leading-relaxed text-[#0f3b5e]/80 dark:text-gray-400 sm:text-base">
              <StaggerWords
                text="Saya menggabungkan kemampuan visual, editing, UI layouting, dan AI-assisted workflow untuk membangun karya digital yang rapi, komunikatif, dan punya identitas visual."
                baseDelay={0.3}
                wordDuration={0.42}
                staggerDelay={0.04}
              />
            </p>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="#profile"
                className="font-ui inline-flex items-center justify-center rounded-full bg-[#1E8DDE] px-7 py-3 text-sm font-black uppercase tracking-[0.16em] text-white shadow-sm shadow-[#1E8DDE]/10 dark:shadow-lg dark:shadow-[#1E8DDE]/25 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(30,141,222,0.32)] active:scale-95"
              >
                Explore Profile
              </a>
              <a
                href="#portfolio"
                className="font-ui inline-flex items-center justify-center rounded-full border-2 border-[#1E8DDE] dark:border-white/20 bg-white/10 dark:bg-white/[0.05] px-7 py-3 text-sm font-black uppercase tracking-[0.16em] text-[#1E8DDE] dark:text-white backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/70 dark:hover:bg-white/10 hover:shadow-[0_14px_34px_rgba(30,141,222,0.18)] active:scale-95"
              >
                View Portfolio
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative w-full max-w-[420px] md:max-w-full justify-self-center lg:justify-self-end lg:-translate-x-4 xl:-translate-x-8 md:order-2 order-2 mt-2 md:mt-0"
            initial={{
              opacity: 0,
              x: 40,
              scale: 0.88,
              rotate: 3,
            }}
            whileInView={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
            viewport={{ once: false, amount: 0.15, margin: "0px 0px -20% 0px" }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            onMouseEnter={() => setIsIntroCardHovered(true)}
            onMouseLeave={() => {
              setIsIntroCardHovered(false);
              setIntroCardRot({ x: 0, y: 0 });
            }}
            onMouseMove={handleIntroCardTilt}
            style={{ perspective: "900px" }}
          >
            <div
              className="transform-gpu transition-transform duration-[250ms] ease-out will-change-transform"
              style={{
                transform: `
                  translateY(${isIntroCardHovered ? -3 : 0}px)
                  scale(${isIntroCardHovered ? 1.004 : 1})
                  rotateX(${introCardRot.x}deg)
                  rotateY(${introCardRot.y}deg)
                `,
              }}
            >
              <div className="relative w-full overflow-hidden rounded-[28px] border border-white/55 bg-white/22 p-6 shadow-[0_24px_70px_rgba(30,141,222,0.16)] ring-1 ring-white/30 backdrop-blur-md transition-shadow duration-500 hover:shadow-[0_26px_76px_rgba(30,141,222,0.20)] sm:p-7">
                <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-[#2D8FE3]/12 blur-2xl" />
                <div className="absolute -bottom-14 -left-14 h-28 w-28 rounded-full bg-white/35 blur-2xl" />
                <div className="hiyo-orbit absolute right-9 top-9 h-3 w-3 rounded-full bg-[#1E8DDE]/45 shadow-[0_0_22px_rgba(30,141,222,0.38)]" />

                <div className="relative">
                  <p className="font-ui mb-4 text-[0.82rem] font-black uppercase tracking-[0.22em] text-[#1E8DDE]">
                    Download CV
                  </p>

                  {/* CV Dropdown */}
                  <div className="relative mb-5" ref={cvRef}>
                    <button
                      onClick={() => setCvOpen((prev) => !prev)}
                      className="font-ui flex w-full items-center justify-between rounded-2xl border border-white/50 dark:border-white/[0.06] bg-white/80 dark:bg-white/[0.05] px-5 py-3.5 text-sm font-bold text-[#0f3b5e] dark:text-white/90 shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-white dark:hover:bg-white/[0.08] hover:shadow-[0_8px_24px_rgba(30,141,222,0.15)]"
                    >
                      <span className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4 text-[#1E8DDE]"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Pilih CV
                      </span>
                      <svg
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${cvOpen ? "rotate-180" : ""}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>

                    {cvOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="absolute left-0 right-0 z-20 mt-2 overflow-hidden rounded-2xl border border-white/70 dark:border-white/[0.08] bg-white dark:bg-[#0f1a2e]/95 shadow-lg backdrop-blur-md"
                      >
                        <a
                          href="/assets/cv/cv_ats_tech.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setCvOpen(false)}
                          className="flex items-center gap-3 px-4 py-3.5 text-sm font-bold text-[#0f3b5e] dark:text-white transition-colors hover:bg-[#1E8DDE]/10 dark:hover:bg-white/5"
                        >
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1E8DDE]/10 text-xs">
                            💻
                          </span>
                          CV - Tech
                        </a>
                        <a
                          href="/assets/cv/cv_ats_multimedia.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setCvOpen(false)}
                          className="flex items-center gap-3 border-t border-white/60 dark:border-white/10 px-4 py-3.5 text-sm font-bold text-[#0f3b5e] dark:text-white transition-colors hover:bg-[#1E8DDE]/10 dark:hover:bg-white/5"
                        >
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1E8DDE]/10 text-xs">
                            🎬
                          </span>
                          CV - Multimedia
                        </a>
                      </motion.div>
                    )}
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {quickStats.map((stat) => (
                      <div
                        key={stat.label}
                        className="flex flex-col items-center rounded-2xl border border-white/40 dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.04] px-2 py-3 text-center backdrop-blur-sm"
                      >
                        <span className="text-lg">{stat.icon}</span>
                        <span className="mt-0.5 text-lg font-black text-[#1E8DDE] dark:text-[#5DC3F5]">
                          {stat.value}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#0f3b5e]/60 dark:text-gray-400">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* GitHub Stats — data dari API asli */}
                  <div className="mt-4 rounded-2xl border border-white/40 dark:border-white/[0.06] bg-white/50 dark:bg-white/[0.04] px-3.5 py-3 backdrop-blur-sm">
                    <p className="mb-2.5 text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 dark:text-slate-500">
                      GitHub Stats
                    </p>
                    <a
                      href="https://github.com/Abduldinata"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block space-y-2"
                    >
                      <div className="grid grid-cols-3 gap-2">
                        <div className="flex flex-col items-center rounded-xl bg-slate-200/40 dark:bg-slate-800/40 py-2 transition-colors group-hover:bg-slate-200/60 dark:group-hover:bg-slate-800/60">
                          <span className="text-xs font-black text-slate-700 dark:text-slate-200">
                            16
                          </span>
                          <span className="text-[8px] font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider">
                            Repos
                          </span>
                        </div>
                        <div className="flex flex-col items-center rounded-xl bg-slate-200/40 dark:bg-slate-800/40 py-2 transition-colors group-hover:bg-slate-200/60 dark:group-hover:bg-slate-800/60">
                          <span className="text-xs font-black text-slate-700 dark:text-slate-200">
                            5
                          </span>
                          <span className="text-[8px] font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider">
                            Followers
                          </span>
                        </div>
                        <div className="flex flex-col items-center rounded-xl bg-slate-200/40 dark:bg-slate-800/40 py-2 transition-colors group-hover:bg-slate-200/60 dark:group-hover:bg-slate-800/60">
                          <span className="text-xs font-black text-amber-500">
                            8
                          </span>
                          <span className="text-[8px] font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider">
                            Stars
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {[
                          { lang: "Dart", color: "bg-cyan-500" },
                          { lang: "C++", color: "bg-blue-600" },
                          { lang: "HTML", color: "bg-orange-500" },
                          { lang: "JS", color: "bg-yellow-500" },
                          { lang: "PHP", color: "bg-indigo-500" },
                          { lang: "C", color: "bg-slate-500" },
                        ].map((l) => (
                          <span
                            key={l.lang}
                            className="inline-flex items-center gap-1 rounded-md bg-slate-200/40 dark:bg-slate-800/40 px-1.5 py-0.5 text-[8px] font-semibold text-slate-600 dark:text-slate-400"
                          >
                            <span
                              className={`inline-block h-1.5 w-1.5 rounded-full ${l.color}`}
                            />
                            {l.lang}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between rounded-xl bg-[#1E8DDE]/10 px-3 py-2 transition-colors group-hover:bg-[#1E8DDE]/20">
                        <span className="text-[9px] font-bold text-[#1E8DDE]">
                          github.com/Abduldinata
                        </span>
                        <svg
                          className="h-3 w-3 text-[#1E8DDE] transition-transform group-hover:translate-x-0.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
