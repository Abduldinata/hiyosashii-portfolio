"use client";

import React, { useEffect, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import SplitWords from "../ui/SplitWords";
import StaggerWords from "../ui/StaggerWords";

const studentImage = "/assets/profile/profile-student.jpg";
const creatorImage = "/assets/profile/profile-creator.jpg";

const sectionVariants = {
  hidden: { opacity: 0.88, y: 22, scale: 0.988, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.06,
      delayChildren: 0.08,
      filter: { duration: 0.08 },
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0.92, y: 12, scale: 0.99, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.36,
      ease: [0.22, 1, 0.36, 1],
      filter: { duration: 0.08 },
    },
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

export default function ProfileSection({ mode = "student", onModeChange }) {
  const isCreator = mode === "creator";
  const isStudent = !isCreator;

  useEffect(() => {
    [studentImage, creatorImage].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const [profileRot, setProfileRot] = useState({ x: 0, y: 0 });
  const [isProfileHovered, setIsProfileHovered] = useState(false);

  const handleProfileTilt = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const maxAngle = 5;
    setProfileRot({
      x: (y - 0.5) * -maxAngle,
      y: (x - 0.5) * maxAngle,
    });
  }, []);

  const profileCopy = isStudent
    ? {
        eyebrow: "ABOUT PROFILE",
        title: "Creative Tech Student",
        name: "Abdul Aziz Dinata",
        description:
          "Saya adalah mahasiswa TRPL dan digital creative yang fokus pada editing, desain visual, UI/UX, serta eksplorasi pengembangan web/app berbantuan AI. Saya tertarik membuat produk digital yang rapi secara tampilan, mudah digunakan, dan punya identitas visual yang kuat.",
        badges: ["TRPL Student", "UI/UX Layouting", "AI-Assisted Dev"],
      }
    : {
        eyebrow: "CREATIVE SIDE",
        title: "Digital Creative",
        name: "Abdul Aziz Dinata",
        description:
          "Saya juga aktif sebagai content creator dan editor video dengan fokus pada AMV, motion graphic, transisi, VFX ringan, desain konten, dan storytelling visual.",
        badges: ["Video Editing", "Motion/AMV", "Visual Design"],
      };

  return (
    <section
      id="profile"
      className="hiyo-section-surface relative min-h-[calc(100vh-88px)] scroll-mt-24 overflow-hidden bg-transparent"
    >
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-88px)] max-w-[1200px] items-center px-5 py-16 sm:px-8 lg:px-12">
        <div className="grid w-full grid-cols-1 items-center gap-8 md:grid-cols-[1fr_1.2fr] lg:gap-12">
          {/* Left - Photo with Premium Gradient Ring */}
          <motion.div
            className="flex justify-center md:justify-start"
            initial={{ opacity: 0, x: -30, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="group relative"
              style={{
                width: "clamp(260px, 42vw, 340px)",
                aspectRatio: 1,
              }}
            >
              {/* Gradient Ring Wrapper */}
              <div className="h-full w-full rounded-full bg-gradient-to-br from-[#1E8DDE] to-[#6366F1] p-[3px] shadow-[0_0_40px_rgba(30,141,222,0.25)] dark:shadow-[0_0_50px_rgba(99,102,241,0.2)] transition-all duration-500 group-hover:shadow-[0_0_60px_rgba(30,141,222,0.4)] group-hover:scale-[1.02]">
                <div className="h-full w-full rounded-full bg-[#0d1525] p-[2px]">
                  <div className="relative h-full w-full rounded-full overflow-hidden bg-[#222831]">
                    {/* Crossfade Transition for Premium Feel */}
                    <img
                      src={studentImage}
                      alt="Abdul Aziz Dinata - Student"
                      className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isStudent
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-110"
                      }`}
                    />
                    <img
                      src={creatorImage}
                      alt="Abdul Aziz Dinata - Creator"
                      className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isCreator
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-110"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Mode Switch — nempel border ring */}
              <button
                type="button"
                onClick={() =>
                  onModeChange?.(isCreator ? "student" : "creator")
                }
                className={`absolute -bottom-2 -right-2 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 backdrop-blur-md transition-all duration-500 ease-out hover:scale-110 hover:rotate-45 hover:shadow-[0_8px_30px_rgba(30,141,222,0.4)] active:scale-90 ${
                  isStudent
                    ? "border-white/60 bg-white/80 text-[#1E8DDE] shadow-[0_4px_16px_rgba(30,141,222,0.2)] dark:border-white/30 dark:bg-[#0a1e30]/80 dark:text-[#5DC3F5]"
                    : "border-[#1E8DDE]/60 bg-[#1E8DDE]/90 text-white shadow-[0_4px_16px_rgba(30,141,222,0.3)] dark:border-[#5DC3F5]/40 dark:bg-[#3b9eff]/80"
                }`}
                aria-label="Switch profile mode"
                title="Switch profile mode"
              >
                <svg
                  className={`h-4.5 w-4.5 transition-transform duration-500 ${
                    isCreator ? "rotate-180" : "rotate-0"
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                  <path d="M21 3v5h-5" />
                </svg>
              </button>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            className="relative rounded-[24px] border border-white/40 dark:border-white/[0.06] bg-white/25 dark:bg-white/[0.05] p-6 backdrop-blur-md sm:p-8 lg:p-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25, margin: "0px 0px -20% 0px" }}
            variants={sectionVariants}
            onMouseEnter={() => setIsProfileHovered(true)}
            onMouseLeave={() => {
              setIsProfileHovered(false);
              setProfileRot({ x: 0, y: 0 });
            }}
            onMouseMove={handleProfileTilt}
            style={{ perspective: "900px" }}
          >
            <div
              className="transform-gpu transition-transform duration-[250ms] ease-out will-change-transform"
              style={{
                transform: `
                  translateY(${isProfileHovered ? -2 : 0}px)
                  scale(${isProfileHovered ? 1.002 : 1})
                  rotateX(${profileRot.x}deg)
                  rotateY(${profileRot.y}deg)
                `,
              }}
            >
              <motion.div
                key={isStudent ? "student-copy" : "creator-copy"}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: false,
                  amount: 0.25,
                  margin: "0px 0px -20% 0px",
                }}
                variants={sectionVariants}
                className="flex flex-col items-center text-center sm:items-start sm:text-left"
              >
                <span className="font-ui inline-flex rounded-full border border-white/50 dark:border-white/10 bg-white/30 dark:bg-white/[0.06] px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-[#1E8DDE] dark:text-[#5DC3F5] shadow-sm backdrop-blur-sm">
                  <SplitWords
                    text={profileCopy.eyebrow}
                    baseDelay={0.1}
                    charDuration={0.3}
                  />
                </span>

                <motion.h1
                  variants={titleVariants}
                  className={`mt-5 font-black tracking-[-0.055em] ${
                    isCreator
                      ? "text-[#0f3b5e] dark:text-white/90"
                      : "text-[#2D8FE3] dark:text-[#5DC3F5]"
                  }`}
                  style={{
                    fontSize: "clamp(2rem, 4vw, 4.5rem)",
                    lineHeight: 1.05,
                    textShadow: "0 8px 24px rgba(30, 141, 222, 0.1)",
                  }}
                >
                  <SplitWords text={profileCopy.title} />
                </motion.h1>

                <div className="font-heading mt-3">
                  <SplitWords
                    text={profileCopy.name}
                    baseDelay={0.2}
                    charDuration={0.4}
                    className="text-sm font-black uppercase tracking-[0.2em] text-[#2a5f7a] dark:text-[#94a3b8]"
                  />
                </div>

                <p
                  className={`mt-5 font-medium leading-[1.55] ${
                    isStudent
                      ? "text-[#2a6f9e] dark:text-gray-300"
                      : "text-[#2a6f9e] dark:text-gray-400"
                  }`}
                  style={{ fontSize: "clamp(0.9rem, 1.1vw, 1.1rem)" }}
                >
                  <StaggerWords
                    text={profileCopy.description}
                    baseDelay={0.25}
                    wordDuration={0.4}
                    staggerDelay={0.04}
                  />
                </p>

                <motion.div
                  variants={itemVariants}
                  className="mt-5 flex flex-wrap justify-center gap-2 sm:justify-start"
                >
                  {profileCopy.badges.map((badge) => (
                    <span
                      key={badge}
                      className="font-ui rounded-full border border-white/50 dark:border-white/10 bg-white/35 dark:bg-white/[0.06] px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-[#1a567a] dark:text-[#93C5FD] backdrop-blur transition-transform duration-200 hover:scale-105"
                    >
                      {badge}
                    </span>
                  ))}
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="mt-7 flex flex-wrap items-center justify-center gap-4 sm:justify-start"
                >
                  <a
                    href="#skills"
                    className={`font-ui inline-flex items-center justify-center rounded-full border-2 px-8 py-3.5 text-sm font-bold uppercase tracking-[0.22em] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(30,141,222,0.32)] active:scale-[0.98] ${
                      isStudent
                        ? "border-[#2D8FE3] dark:border-[#5DC3F5]/40 text-[#2D8FE3] dark:text-[#5DC3F5] hover:bg-[#2D8FE3] dark:hover:bg-[#5DC3F5]/20 hover:text-white dark:hover:text-white"
                        : "border-[#1E8DDE] dark:border-[#5DC3F5]/30 text-[#1a567a] dark:text-white/70 hover:bg-[#1E8DDE] dark:hover:bg-[#3b9eff] hover:text-white hover:shadow-[0_16px_40px_rgba(30,141,222,0.32)]"
                    }`}
                  >
                    VIEW DETAILS
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
