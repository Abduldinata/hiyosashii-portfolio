"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
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

const webAppSkills = [
  {
    name: "HTML",
    icon: "/assets/icons/html.png",
    fallback: "HTML",
    level: "Familiar",
  },
  {
    name: "CSS",
    icon: "/assets/icons/css.png",
    fallback: "CSS",
    level: "Familiar",
  },
  {
    name: "JavaScript",
    icon: "/assets/icons/javascript.png",
    fallback: "JS",
    level: "Basic",
  },
  {
    name: "Flutter",
    icon: "/assets/icons/flutter.png",
    fallback: "FLUT",
    level: "Basic",
  },
  {
    name: "Go",
    icon: "/assets/icons/golang.png",
    fallback: "GO",
    level: "Basic",
  },
  {
    name: "C",
    icon: "/assets/icons/c.png",
    fallback: "C",
    level: "Basic",
  },
  {
    name: "C++",
    icon: "/assets/icons/c++.png",
    fallback: "C++",
    level: "Learning",
  },
];

const toolDeploymentSkills = [
  {
    name: "GitHub",
    icon: "/assets/icons/github.jpeg",
    fallback: "GH",
    level: "Repository",
  },
  {
    name: "Vercel",
    icon: "/assets/icons/vercel.png",
    fallback: "VC",
    level: "Deployment",
  },
  {
    name: "Supabase",
    icon: "/assets/icons/supabase.png",
    fallback: "SUPABASE",
    level: "Database",
  },
  {
    name: "PostgreSQL",
    icon: "/assets/icons/postgres.png",
    fallback: "SQL",
    level: "Database",
  },
  {
    name: "Node.js",
    icon: "/assets/icons/nodejs.png",
    fallback: "NODE",
    level: "Backend",
  },
  {
    name: "Firebase",
    icon: "/assets/icons/firebase.png",
    fallback: "FIRE",
    level: "Backend",
  },
  {
    name: "XAMPP",
    icon: "/assets/icons/xampp.png",
    fallback: "XAMPP",
    level: "Local Server",
  },
];

const editingSkills = [
  {
    name: "After Effects",
    icon: "/assets/icons/aftereffects.png",
    fallback: "AE",
    level: "Familiar",
  },
  {
    name: "CapCut",
    icon: "/assets/icons/capcut.png",
    fallback: "CapCut",
    level: "Familiar",
  },
  {
    name: "Alight Motion",
    icon: "/assets/icons/alight-motion.png",
    fallback: "AM",
    level: "Familiar",
  },
  {
    name: "Unity",
    icon: "/assets/icons/unity.png",
    fallback: "UNITY",
    level: "Basic",
  },
  {
    name: "Blender",
    icon: "/assets/icons/blender.png",
    fallback: "BLEND",
    level: "Learning",
  },
];

const designSkills = [
  {
    name: "Photoshop",
    icon: "/assets/icons/photoshop.png",
    fallback: "PS",
    level: "Familiar",
  },
  {
    name: "Canva",
    icon: "/assets/icons/canva.png",
    fallback: "CANVA",
    level: "Basic",
  },
  {
    name: "Figma",
    icon: "/assets/icons/figma.png",
    fallback: "FIGMA",
    level: "Learning",
  },
];

function SkillIcon({ skill }) {
  const [hasError, setHasError] = useState(false);
  const label = skill.name || skill.label || skill.title || "Skill";
  const fallbackText = skill.fallback || label.slice(0, 2).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.15, margin: "0px 0px -20% 0px" }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      className="group flex w-[72px] flex-col items-center gap-1.5 text-center sm:w-[80px]"
    >
      <div className="hiyo-hover-icon relative flex h-[64px] w-[64px] items-center justify-center overflow-hidden rounded-2xl bg-white/70 shadow-sm ring-1 ring-white/70 before:pointer-events-none before:absolute before:inset-x-[-45%] before:top-[-60%] before:h-[70%] before:rotate-12 before:bg-white/30 before:blur-sm before:transition-transform before:duration-300 group-hover:before:translate-y-[135%] group-active:scale-95">
        {skill.icon && !hasError ? (
          <img
            src={skill.icon}
            alt={label}
            className="relative z-10 max-h-[48px] max-w-[48px] bg-white/70 object-contain transition-transform duration-300 group-hover:scale-[1.08]"
            onError={() => setHasError(true)}
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center px-1 text-center text-[11px] font-black uppercase leading-tight text-[#1F6FAE]">
            {fallbackText}
          </span>
        )}
      </div>
      <span className="text-[12px] font-bold leading-tight text-[#134E7D] transition-colors group-hover:text-[#1E8DDE] sm:text-[13px]">
        {label}
      </span>
      {skill.level && (
        <span className="font-ui text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#3d6f93]/75">
          {skill.level}
        </span>
      )}
    </motion.div>
  );
}

function SkillGroup({ title, subtitle, skills }) {
  return (
    <motion.div
      initial={{ opacity: 0.88, y: 22, scale: 0.988, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.15, margin: "0px 0px -20% 0px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.004 }}
      className="rounded-[1.75rem] border border-white/60 bg-white/45 px-6 py-5 shadow-xl shadow-[#1E8DDE]/10 ring-1 ring-white/50 backdrop-blur-sm sm:px-8 sm:py-6"
    >
      <div className="mb-5 text-center">
        <h3 className="font-ui text-2xl font-black tracking-[-0.035em] text-[#2D8FE3] sm:text-3xl lg:text-[2rem]">
          {title}
        </h3>
        <p className="mx-auto mt-1.5 max-w-[520px] text-sm font-semibold leading-snug text-[#134E7D]/75 sm:text-base">
          {subtitle}
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-5 sm:gap-x-8">
        {Array.isArray(skills) &&
          skills.map((skill) => (
            <SkillIcon
              key={skill.name || skill.label || skill.title}
              skill={{
                ...skill,
                name: skill.name || skill.label || skill.title || "Skill",
              }}
            />
          ))}
      </div>
    </motion.div>
  );
}

export default function SkillsSection({ mode = "tech", onModeChange }) {
  const isCreative = mode === "creative";
  const isTech = !isCreative;
  const skillGroups = isTech
    ? [
        {
          title: "Web/App Foundation",
          subtitle:
            "Dasar pengembangan web dan app yang saya gunakan untuk project digital.",
          skills: webAppSkills,
        },
        {
          title: "Tools & Deployment",
          subtitle:
            "Tools pendukung untuk testing, database dasar, dan publikasi project.",
          skills: toolDeploymentSkills,
        },
      ]
    : [
        {
          title: "Editing & Motion",
          subtitle:
            "Tools utama untuk editing video, motion, AMV, dan eksplorasi visual.",
          skills: editingSkills,
        },
        {
          title: "Design & Content",
          subtitle: "Tools untuk desain visual, content design, dan layout UI.",
          skills: designSkills,
        },
      ];

  return (
    <section
      id="skills"
      className="hiyo-section-surface relative min-h-[calc(100vh-88px)] scroll-mt-24 overflow-visible bg-transparent px-6 py-20 sm:px-8 lg:px-12"
    >
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-248px)] max-w-[1200px] flex-col justify-center gap-8">
        <motion.div
          key={mode}
          className="flex flex-col gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15, margin: "0px 0px -20% 0px" }}
          variants={sectionVariants}
        >
          <motion.div
            initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.15, margin: "10% 0px 10% 0px" }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <h2 className="font-ui text-4xl font-black tracking-[-0.045em] text-[#123E63] sm:text-5xl">
              {isTech ? "Tech & AI-Assisted Workflow" : "Creative Skills"}
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-sm font-semibold leading-relaxed text-[#134E7D]/80 sm:text-base">
              {isTech
                ? "Tech stack ini saya gunakan sebagai pendukung proses pembuatan project digital, terutama melalui eksplorasi, prompting, testing, dan AI-assisted development."
                : "Creative skills ini menjadi fokus utama saya dalam editing video, motion/AMV, desain visual, content design, dan eksplorasi UI layout untuk kebutuhan publikasi digital."}
            </p>
          </motion.div>

          <div className="flex flex-col gap-6 lg:gap-8 pt-4">
            {skillGroups.map((group) => (
              <SkillGroup
                key={group.title}
                title={group.title}
                subtitle={group.subtitle}
                skills={group.skills}
              />
            ))}
          </div>
        </motion.div>

        <div
          className={`flex pt-0 ${isTech ? "justify-end" : "justify-start"}`}
        >
          <motion.button
            key={isTech ? "switch-creative" : "switch-tech"}
            type="button"
            onClick={() => onModeChange?.(isCreative ? "tech" : "creative")}
            initial={{ opacity: 0, y: 18, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.3, margin: "0px 0px 20% 0px" }}
            transition={{
              duration: 0.36,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
              y: -5,
              scale: 1.045,
              boxShadow: "0 18px 44px rgba(30, 141, 222, 0.34)",
            }}
            whileTap={{ scale: 0.94 }}
            className="group rounded-full border-2 border-[#1E8DDE] bg-white/10 px-8 py-3 text-xs font-black uppercase tracking-[0.18em] text-[#1E8DDE] shadow-sm backdrop-blur-sm transition-colors duration-300 ease-out hover:border-[#1E8DDE] hover:bg-[#1E8DDE] hover:text-white hover:shadow-[0_18px_44px_rgba(30,141,222,0.34)] sm:text-sm"
          >
            {isTech ? (
              <>
                Switch to Creative
                <span className="ml-3 inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </>
            ) : (
              <>
                <span className="mr-3 inline-block transition-transform duration-300 group-hover:-translate-x-1">
                  ←
                </span>
                Switch to Tech
              </>
            )}
          </motion.button>
        </div>
      </div>
    </section>
  );
}
