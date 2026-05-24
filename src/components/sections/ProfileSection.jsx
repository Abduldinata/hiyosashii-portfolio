"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";

const studentImage = "/assets/profile/profile-student.jpg";
const creatorImage = "/assets/profile/profile-creator.jpg";

const sectionVariants = {
  hidden: { opacity: 0.88, y: 22, scale: 0.988, filter: "blur(2px)" },
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
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0.92, y: 12, scale: 0.99 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] },
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

export default function ProfileSection({ mode = "student", onModeChange }) {
  const isCreator = mode === "creator";
  const isStudent = !isCreator;

  useEffect(() => {
    [studentImage, creatorImage].forEach((src) => {
      const img = new Image();
      img.src = src;
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
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-88px)] max-w-7xl items-center px-8 py-12 lg:px-12">
        <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_430px]">
          {/* Left content */}
          <motion.div
            className="max-w-[760px] rounded-[24px] border border-white/30 bg-white/10 p-5 pt-5 backdrop-blur-[1px] transition-all duration-500 ease-out sm:p-6 lg:ml-2 lg:p-7"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.16 }}
            variants={sectionVariants}
          >
            <motion.div
              key={isStudent ? "student-copy" : "creator-copy"}
              initial={{ opacity: 0, y: 22, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.42,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.32, delay: 0.04 }}
                className="inline-flex rounded-full border border-white/50 bg-white/30 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-[#1E8DDE] shadow-sm backdrop-blur-sm"
              >
                {profileCopy.eyebrow}
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.36, delay: 0.08 }}
                className={`mt-6 font-black tracking-[-0.055em] ${
                  isCreator ? "text-[#123A5A]" : "text-[#2D8FE3]"
                }`}
                style={{
                  fontSize: "clamp(2.7rem, 4.4vw, 4.8rem)",
                  lineHeight: 0.95,
                  textShadow: "0 8px 24px rgba(30, 141, 222, 0.1)",
                }}
              >
                {profileCopy.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.34, delay: 0.12 }}
                className="mt-3 text-sm font-black uppercase tracking-[0.2em] text-[#123A5A]/60"
              >
                {profileCopy.name}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.38, delay: 0.16 }}
                className={`mt-6 max-w-[720px] font-medium leading-[1.55] ${
                  isStudent ? "text-[#1F6FAE]" : "text-[#123E63]"
                }`}
                style={{
                  fontSize: "clamp(1rem, 1.25vw, 1.18rem)",
                  textShadow: isCreator
                    ? "0 2px 14px rgba(255,255,255,0.24)"
                    : undefined,
                }}
              >
                {profileCopy.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.36, delay: 0.2 }}
                className="mt-6 flex flex-wrap gap-2.5"
              >
                {profileCopy.badges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-white/50 bg-white/35 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-[#134E7D] backdrop-blur transition-transform duration-200 hover:scale-105"
                  >
                    {badge}
                  </span>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.36, delay: 0.24 }}
                className="mt-9 flex flex-wrap items-center gap-8"
              >
                <a
                  href="#skills"
                  className={`inline-flex items-center justify-center rounded-full border-2 px-10 py-4 text-sm font-bold uppercase tracking-[0.22em] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(30,141,222,0.24)] active:scale-[0.98] ${
                    isStudent
                      ? "border-[#2D8FE3] text-[#2D8FE3] hover:bg-[#2D8FE3] hover:text-white"
                      : "border-[#123E63] text-[#123E63] hover:bg-white hover:text-[#1E8DDE]"
                  }`}
                >
                  VIEW DETAILS
                </a>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right visual */}
          <motion.div
            className="relative flex justify-center lg:translate-x-0 lg:justify-end lg:pr-5"
            initial={{
              opacity: 0.86,
              x: 28,
              scale: 0.96,
              filter: "blur(3px)",
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              scale: 1,
              filter: "blur(0px)",
            }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="group relative"
              style={{
                width: "clamp(252px, 25.2vw, 351px)",
                height: "clamp(252px, 25.2vw, 351px)",
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

              <div className="pointer-events-none absolute inset-[-8px] rounded-full border border-white/50 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:shadow-[0_0_45px_rgba(30,141,222,0.28)]" />

              <button
                type="button"
                onClick={() =>
                  onModeChange?.(isCreator ? "student" : "creator")
                }
                className={`absolute bottom-4 right-4 z-20 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 text-2xl font-bold shadow-[0_12px_30px_rgba(30,141,222,0.28)] transition-all duration-500 hover:scale-110 hover:rotate-180 active:scale-95 ${
                  isStudent
                    ? "border-[#2D8FE3] bg-white/90 text-[#2D8FE3]"
                    : "border-white bg-[#1E8DDE]/90 text-white"
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
