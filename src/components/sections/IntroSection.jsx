"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import SplitWords from "../ui/SplitWords";
import StaggerWords from "../ui/StaggerWords";

const focusItems = ["Editing", "Design", "UI/UX", "AI Workflow"];

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
                  <p className="font-ui mb-5 text-[0.82rem] font-black uppercase tracking-[0.22em] text-[#1E8DDE]">
                    Focus Area
                  </p>
                  <div className="grid gap-4">
                    {focusItems.map((item, index) => (
                      <motion.div
                        key={item}
                        initial={{
                          opacity: 0,
                          y: 18,
                          scale: 0.9,
                          rotate: -2,
                        }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          rotate: 0,
                        }}
                        viewport={{
                          once: false,
                          amount: 0.15,
                          margin: "0px 0px -20% 0px",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 180,
                          damping: 14,
                          mass: 0.6,
                          delay: 0.08 * index,
                        }}
                        className="font-ui group flex min-h-[54px] items-center rounded-2xl border border-white/50 bg-white/80 px-5 text-sm font-black uppercase tracking-[0.16em] text-[#0f3b5e] shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-[0_14px_34px_rgba(30,141,222,0.20)] dark:border-white/[0.06] dark:bg-white/[0.05] dark:text-white/90 dark:hover:bg-white/[0.08] dark:hover:shadow-[0_14px_34px_rgba(30,141,222,0.15)] sm:min-h-[56px] sm:text-base"
                      >
                        {item}
                      </motion.div>
                    ))}
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
