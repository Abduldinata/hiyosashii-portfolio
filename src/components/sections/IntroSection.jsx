"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [gitExpand, setGitExpand] = useState(false);
  const [commits, setCommits] = useState([
    {
      msg: "Fix mobile avatar clipping and adjust profile layout",
      date: "Jun 24",
      repo: "hiyosashii-portfolio",
      url: "https://github.com/Abduldinata/hiyosashii-portfolio/commit/e4111c181d28b183e575772ef6d2b1c3c6e8f9d7",
    },
    {
      msg: "Refactor 3D assets into global slideshow with scroll-reactive effects",
      date: "Jun 24",
      repo: "hiyosashii-portfolio",
      url: "https://github.com/Abduldinata/hiyosashii-portfolio/commit/1c203dbc35e69d3e0a951c17ed279abc3a752de1",
    },
    {
      msg: "Update CV and replace liquid orbs with fluid mesh gradients",
      date: "Jun 19",
      repo: "hiyosashii-portfolio",
      url: "https://github.com/Abduldinata/hiyosashii-portfolio/commit/648c6b4e9dfd04144cc1e3e1d97fa8ea15acac0f",
    },
    {
      msg: "redeploy with env vars",
      date: "Jun 15",
      repo: "hiyosashii-portfolio",
      url: "https://github.com/Abduldinata/hiyosashii-portfolio/commit/918a8f6318b4b3d6cf7b985694d68c497fd07e8e",
    },
    {
      msg: "Refactor file structure",
      date: "Jun 9",
      repo: "hiyosashii-portfolio",
      url: "https://github.com/Abduldinata/hiyosashii-portfolio/commit/de0cc58e0c7fcb61cd15d20cd574647e6c1a264d",
    },
  ]);
  const cvRef = useRef(null);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const res = await fetch(
          "https://api.github.com/repos/Abduldinata/hiyosashii-portfolio/commits?per_page=5",
        );
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data)) {
          const formatted = data.map((item) => {
            const dateObj = new Date(item.commit.author.date);
            const formattedDate = dateObj.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });
            return {
              msg: item.commit.message.split("\n")[0],
              date: formattedDate,
              repo: "hiyosashii-portfolio",
              url: item.html_url,
            };
          });
          setCommits(formatted);
        }
      } catch (err) {
        console.error("Error fetching commits:", err);
      }
    };

    fetchCommits();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cvRef.current && !cvRef.current.contains(e.target)) {
        setCvOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-open CV when requested from Contact Section
  useEffect(() => {
    const handler = () => setCvOpen(true);
    window.addEventListener("openCV", handler);
    return () => window.removeEventListener("openCV", handler);
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
              <div className="relative w-full overflow-hidden rounded-[28px] border border-white/55 dark:border-slate-700/50 bg-white/22 dark:bg-[#0d1525]/85 p-6 shadow-[0_24px_70px_rgba(30,141,222,0.16)] dark:shadow-[0_24px_70px_rgba(0,0,0,0.5)] ring-1 ring-white/30 dark:ring-slate-800/30 backdrop-blur-md transition-shadow duration-500 hover:shadow-[0_26px_76px_rgba(30,141,222,0.20)] dark:hover:shadow-[0_26px_76px_rgba(0,0,0,0.6)] sm:p-7">
                <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-[#2D8FE3]/12 blur-2xl" />
                <div className="absolute -bottom-14 -left-14 h-28 w-28 rounded-full bg-white/35 blur-2xl" />
                <div className="hiyo-orbit absolute right-9 top-9 h-3 w-3 rounded-full bg-[#1E8DDE]/45 shadow-[0_0_22px_rgba(30,141,222,0.38)]" />

                <div className="relative">
                  <p className="font-ui mb-4 text-[0.82rem] font-black uppercase tracking-[0.22em] text-[#1E8DDE] dark:text-[#5DC3F5]">
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
                        initial={{ opacity: 0, y: -4, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          duration: 0.25,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="absolute left-0 right-0 z-20 mt-2 overflow-hidden rounded-xl border border-white/70 bg-white/95 shadow-xl backdrop-blur-md dark:border-white/[0.1] dark:bg-[#0f1a2e]/95"
                      >
                        <a
                          href="https://drive.google.com/file/d/1k8nHk4PUK9KIoKVGhWwHWL2BZN3nMPv1/view?usp=drive_link"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setCvOpen(false)}
                          className="group flex items-center gap-2.5 px-4 py-3 text-sm font-bold text-[#0f3b5e] dark:text-white transition-all duration-200 hover:bg-[#1E8DDE]/10 dark:hover:bg-white/5 hover:pl-5"
                        >
                          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#1E8DDE]/10 text-[10px] transition-transform duration-200 group-hover:scale-110">
                            💻
                          </span>
                          <span className="flex-1">CV - Tech</span>
                          <svg
                            className="h-3.5 w-3.5 text-[#1E8DDE]/50 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[#1E8DDE]"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M7 17L17 7" />
                            <path d="M7 7h10v10" />
                          </svg>
                        </a>
                        <a
                          href="https://drive.google.com/file/d/151FpoPUVge0KK2u81iPOtbT97oe-Hcxo/view?usp=drive_link"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setCvOpen(false)}
                          className="group flex items-center gap-2.5 border-t border-white/50 px-4 py-3 text-sm font-bold text-[#0f3b5e] dark:text-white dark:border-white/[0.06] transition-all duration-200 hover:bg-[#1E8DDE]/10 dark:hover:bg-white/5 hover:pl-5"
                        >
                          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#1E8DDE]/10 text-[10px] transition-transform duration-200 group-hover:scale-110">
                            🎬
                          </span>
                          <span className="flex-1">CV - Multimedia</span>
                          <svg
                            className="h-3.5 w-3.5 text-[#1E8DDE]/50 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[#1E8DDE]"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M7 17L17 7" />
                            <path d="M7 7h10v10" />
                          </svg>
                        </a>
                      </motion.div>
                    )}
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {quickStats.map((stat) => (
                      <div
                        key={stat.label}
                        className="flex flex-col items-center rounded-2xl border border-white/40 dark:border-slate-700/50 bg-white/60 dark:bg-slate-800/40 px-2 py-3 text-center"
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

                  {/* Toggle Button */}
                  <button
                    onClick={() => setGitExpand((prev) => !prev)}
                    className="mt-3 flex w-full items-center justify-between rounded-xl border border-white/40 dark:border-slate-700/50 bg-white/40 dark:bg-slate-800/30 px-3 py-2 transition-all duration-200 hover:bg-white/60 dark:hover:bg-slate-800/60 group/toggle"
                  >
                    <span className="flex items-center gap-2 text-[9px] font-bold text-slate-500 dark:text-slate-400">
                      <svg
                        className="h-3 w-3 text-slate-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                      </svg>
                      {gitExpand
                        ? "Sembunyikan aktivitas"
                        : "Lihat aktivitas GitHub"}
                    </span>
                    <motion.svg
                      animate={{ rotate: gitExpand ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </motion.svg>
                  </button>

                  {/* Collapsible Commits */}
                  <AnimatePresence initial={false}>
                    {gitExpand && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.35,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 rounded-2xl border border-white/40 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/40 px-3.5 pt-2.5 pb-2">
                          <div className="mb-3 flex items-center gap-2 px-1">
                            <div className="flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-2 py-0.5">
                              <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(34,197,94,0.5)]" />
                              <span className="text-[8px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                                main
                              </span>
                            </div>
                            <span className="text-[9px] font-semibold text-slate-400 dark:text-slate-500">
                              Recent Commits
                            </span>
                          </div>
                          <div className="group">
                            <div className="relative">
                              <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-emerald-400/40 via-indigo-400/20 to-transparent" />
                              <div className="space-y-0">
                                {commits.map((c, i) => (
                                  <a
                                    key={i}
                                    href={c.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative flex items-start gap-3 rounded-lg px-2 py-2 transition-all duration-200 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 group/commit"
                                  >
                                    <div className="relative mt-0.5 flex shrink-0">
                                      <div className="h-[10px] w-[10px] rounded-full border-2 border-emerald-400 dark:border-emerald-400 bg-white dark:bg-slate-900 shadow-[0_0_8px_rgba(52,211,153,0.3)] dark:shadow-[0_0_10px_rgba(52,211,153,0.2)] transition-all duration-300 group-hover/commit:scale-125 group-hover/commit:shadow-[0_0_14px_rgba(52,211,153,0.5)]" />
                                      <div
                                        className="absolute inset-0 h-[10px] w-[10px] rounded-full bg-emerald-400/20 animate-ping"
                                        style={{
                                          animationDuration: "3s",
                                          animationDelay: `${i * 0.3}s`,
                                        }}
                                      />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-200 leading-snug line-clamp-2 group-hover/commit:text-[#1E8DDE] dark:group-hover/commit:text-[#5DC3F5] transition-colors duration-200">
                                        {c.msg}
                                      </p>
                                      <div className="mt-1 flex items-center gap-2 text-[8px] text-slate-400 dark:text-slate-600">
                                        <span className="inline-flex items-center gap-1">
                                          <svg
                                            className="h-2.5 w-2.5"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          >
                                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                                          </svg>
                                          {c.repo}
                                        </span>
                                        <span>•</span>
                                        <span>{c.date}</span>
                                      </div>
                                    </div>
                                    <svg
                                      className="h-3 w-3 shrink-0 text-indigo-400 opacity-0 group-hover/commit:opacity-100 transition-all duration-200 translate-x-0 group-hover/commit:translate-x-0.5"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <path d="M9 18l6-6-6-6" />
                                    </svg>
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="mt-1 flex items-center justify-between rounded-xl bg-gradient-to-r from-[#1E8DDE]/5 to-indigo-500/5 dark:from-[#1E8DDE]/10 dark:to-indigo-500/10 px-3 py-2 transition-all duration-300 hover:from-[#1E8DDE]/15 hover:to-indigo-500/15 dark:hover:from-[#1E8DDE]/20 dark:hover:to-indigo-500/20 group/bar">
                            <span className="text-[9px] font-bold text-[#1E8DDE] dark:text-[#5DC3F5]">
                              github.com/Abduldinata
                            </span>
                            <span className="flex items-center gap-1.5 text-[9px] font-semibold text-indigo-400 transition-all group-hover/bar:gap-2.5">
                              <span>View all</span>
                              <svg
                                className="h-3 w-3"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></svg>
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
