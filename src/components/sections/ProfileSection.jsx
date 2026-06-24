"use client";

import React, { useEffect, useCallback, useState } from "react";
import { motion } from "framer-motion";
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
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-88px)] max-w-[1200px] items-center px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
        <div className="grid w-full grid-cols-1 items-center gap-6 md:gap-8 md:grid-cols-[1.1fr_0.9fr] lg:grid-cols-[1.2fr_0.8fr] lg:gap-10 xl:gap-12 md:pb-0 pb-12">
          {/* Left content */}
          <motion.div
            className="max-w-[760px] rounded-[24px] border border-white/40 dark:border-white/[0.06] bg-white/25 dark:bg-white/[0.05] p-5 pt-5 backdrop-blur-sm sm:p-6 lg:ml-2 lg:p-7 md:order-1 order-2 flex flex-col justify-center"
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
                  translateY(${isProfileHovered ? -3 : 0}px)
                  scale(${isProfileHovered ? 1.004 : 1})
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
                className="flex flex-col"
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
                  className={`mt-6 font-black tracking-[-0.055em] ${
                    isCreator
                      ? "text-[#0f3b5e] dark:text-white/90"
                      : "text-[#2D8FE3] dark:text-[#5DC3F5]"
                  }`}
                  style={{
                    fontSize: "clamp(2.7rem, 4.4vw, 4.8rem)",
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
                  className={`mt-6 max-w-[720px] font-medium leading-[1.55] ${
                    isStudent
                      ? "text-[#2a6f9e] dark:text-gray-300"
                      : "text-[#2a6f9e] dark:text-gray-400"
                  }`}
                  style={{
                    fontSize: "clamp(1rem, 1.25vw, 1.18rem)",
                    textShadow: isCreator
                      ? "0 2px 14px rgba(255,255,255,0.24)"
                      : undefined,
                  }}
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
                  className="mt-6 flex flex-wrap gap-2.5"
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
                  className="mt-9 flex flex-wrap items-center gap-4"
                >
                  <a
                    href="#skills"
                    className={`font-ui inline-flex items-center justify-center rounded-full border-2 px-7 py-4 md:px-10 text-sm font-bold uppercase tracking-[0.22em] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(30,141,222,0.32)] active:scale-[0.98] $
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

          {/* Right visual */}
          <motion.div
            className="relative flex justify-center lg:translate-x-0 lg:justify-end lg:pr-5 md:order-2 order-1 md:mt-0 sm:-mt-8"
            initial={{
              opacity: 0,
              x: 40,
              scale: 0.85,
              rotate: 4,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              scale: 1,
              rotate: 0,
            }}
            viewport={{ once: false, amount: 0.3, margin: "0px 0px -20% 0px" }}
            transition={{
              type: "spring",
              stiffness: 160,
              damping: 13,
              mass: 0.7,
            }}
          >
            <div
              className="group relative"
              style={{
                width: "min(clamp(240px, 60vw, 351px), 100%)",
                aspectRatio: "1/1",
                perspective: "1100px",
              }}
            >
              <div className="h-full w-full rounded-full transition-transform duration-500 group-hover:scale-[1.025]">
                <div
                  className="relative h-full w-full rounded-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isCreator ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  <div
                    className="absolute inset-0 overflow-hidden rounded-full border-[5px] border-white bg-[#222831] shadow-2xl shadow-[#1E8DDE]/20"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <img
                      src={studentImage}
                      alt="Abdul Aziz Dinata - Student"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div
                    className="absolute inset-0 overflow-hidden rounded-full border-[5px] border-white bg-[#222831] shadow-2xl shadow-[#1E8DDE]/20"
                    style={{
                      transform: "rotateY(180deg)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <img
                      src={creatorImage}
                      alt="Abdul Aziz Dinata - Creator"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-[-8px] rounded-full border border-white/50 dark:border-white/[0.06] opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:shadow-[0_0_45px_rgba(30,141,222,0.28)]" />

              <button
                type="button"
                onClick={() =>
                  onModeChange?.(isCreator ? "student" : "creator")
                }
                className={`absolute bottom-4 right-4 z-20 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 text-2xl font-bold shadow-[0_12px_30px_rgba(30,141,222,0.28)] transition-all duration-500 hover:scale-110 hover:rotate-180 active:scale-95 ${
                  isStudent
                    ? "border-[#2D8FE3] dark:border-[#5DC3F5]/50 bg-white/90 dark:bg-[#0a1e30]/90 text-[#2D8FE3] dark:text-[#5DC3F5]"
                    : "border-white dark:border-[#3b9eff]/60 bg-[#1E8DDE]/90 dark:bg-[#1E8DDE]/70 text-white"
                }`}
                aria-label="Switch profile mode"
                title="Switch profile mode"
              >
                ↻
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
