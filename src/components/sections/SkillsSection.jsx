"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

/* ── Entrance animation variants ── */
const sectionTitleMotion = {
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

const cardMotion = {
  hidden: { opacity: 0.88, y: 22, scale: 0.988, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      filter: { duration: 0.08 },
    },
  },
};

/* ── Icons ── */
function CodeIcon({ className = "h-3.5 w-3.5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 4L2 12l6 8" />
      <path d="M16 4l6 8-6 8" />
    </svg>
  );
}

function SparkleIcon({ className = "h-3.5 w-3.5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5z" />
      <path d="M18 14l.5 2.5L21 17l-2.5.5L18 20l-.5-2.5L15 17l2.5-.5z" />
    </svg>
  );
}

/* ── Continuous floating animation ── */
function FloatBox({ children, delay, duration }) {
  return (
    <motion.span
      animate={{ y: [0, -5, 0] }}
      transition={{
        duration: duration || 3,
        ease: "easeInOut",
        repeat: Infinity,
        delay: delay || 0,
      }}
      className="inline-block"
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.span>
  );
}

/* ── Level mappings ── */
function levelToPercent(level) {
  const map = {
    Learning: 25,
    Basic: 45,
    Familiar: 70,
    "Very Familiar": 80,
    Expert: 95,
    Repository: 40,
    Deployment: 60,
    Database: 65,
    Backend: 60,
    "Local Server": 50,
    "AI Tools": 70,
    IDE: 75,
  };
  return map[level] || 50;
}

function SkillColor(level) {
  const map = {
    Learning: "#f59e0b",
    Basic: "#3b82f6",
    Familiar: "#10b981",
    "Very Familiar": "#10b981",
    Expert: "#8b5cf6",
    Repository: "#6366f1",
    Deployment: "#06b6d4",
    Database: "#8b5cf6",
    Backend: "#06b6d4",
    "Local Server": "#f59e0b",
    "AI Tools": "#8b5cf6",
    IDE: "#6366f1",
  };
  return map[level] || "#3b82f6";
}

/* ── Category color scheme (all blue) ── */
const categoryColors = {
  foundation: {
    header: "text-[#2D8FE3] dark:text-[#5DC3F5]",
    line: "from-transparent via-[#2D8FE3]/30 to-transparent dark:via-[#5DC3F5]/20",
    pill: "border-white/70 bg-white/80 text-[#1a567a] dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-white/80",
  },
  tools: {
    header: "text-[#2D8FE3] dark:text-[#5DC3F5]",
    line: "from-transparent via-[#2D8FE3]/30 to-transparent dark:via-[#5DC3F5]/20",
    pill: "border-white/70 bg-white/80 text-[#1a567a] dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-white/80",
  },
  ai: {
    header: "text-[#2D8FE3] dark:text-[#5DC3F5]",
    line: "from-transparent via-[#2D8FE3]/30 to-transparent dark:via-[#5DC3F5]/20",
    pill: "border-white/70 bg-white/80 text-[#1a567a] dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-white/80",
  },
  editing: {
    header: "text-[#2D8FE3] dark:text-[#5DC3F5]",
    line: "from-transparent via-[#2D8FE3]/30 to-transparent dark:via-[#5DC3F5]/20",
    pill: "border-white/70 bg-white/80 text-[#1a567a] dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-white/80",
  },
  design: {
    header: "text-[#2D8FE3] dark:text-[#5DC3F5]",
    line: "from-transparent via-[#2D8FE3]/30 to-transparent dark:via-[#5DC3F5]/20",
    pill: "border-white/70 bg-white/80 text-[#1a567a] dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-white/80",
  },
};

/* ── Skill badge ── */
function SkillPill({ skill, floatDelay }) {
  const [hasError, setHasError] = useState(false);
  const [tipOpen, setTipOpen] = useState(false);
  const label = skill.name || skill.label || skill.title || "Skill";
  const fallbackText = skill.fallback || label.slice(0, 2).toUpperCase();
  const barColor = SkillColor(skill.level);
  const barWidth = levelToPercent(skill.level);

  return (
    <FloatBox delay={floatDelay} duration={(floatDelay % 2) + 2.5}>
      <div
        className="group/pill relative"
        tabIndex={0}
        role="button"
        aria-label={label}
        onClick={(e) => {
          e.stopPropagation();
          setTipOpen((prev) => !prev);
        }}
        onBlur={() => setTipOpen(false)}
      >
        <span
          className={`relative inline-flex items-center gap-1.5 overflow-hidden rounded-full border px-2.5 py-1 text-xs font-semibold leading-none transition-all duration-200 hover:scale-105 ${
            tipOpen ? "scale-105" : ""
          } ${categoryColors[skill._cat]?.pill || categoryColors.foundation.pill}`}
        >
          {/* Shimmer overlay */}
          <span className="pointer-events-none absolute inset-0 -translate-x-full rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-[600ms] group-hover/pill:translate-x-full" />

          {skill.icon && !hasError ? (
            <img
              src={skill.icon}
              alt=""
              className="relative z-10 h-3.5 w-3.5 object-contain"
              onError={() => setHasError(true)}
            />
          ) : (
            <span className="relative z-10 text-[9px] font-black uppercase">
              {fallbackText}
            </span>
          )}
          <span className="relative z-10">{label}</span>
        </span>

        {/* Tooltip */}
        <div
          className={`pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 min-w-[120px] -translate-x-1/2 translate-y-1 transition-all duration-200 ${
            tipOpen
              ? "translate-y-0 opacity-100"
              : "translate-y-1 opacity-0 group-hover/pill:translate-y-0 group-hover/pill:opacity-100"
          }`}
        >
          <div className="rounded-xl border border-white/60 bg-white p-2.5 text-left shadow-xl dark:border-white/[0.08] dark:bg-[#0f1a2e]">
            <p className="text-xs font-bold text-[#0f3b5e] dark:text-white">
              {label}
            </p>
            {skill.level && (
              <>
                <div className="mt-1.5 h-1 w-full rounded-full bg-gray-200 dark:bg-white/10">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: barWidth + "%", backgroundColor: barColor }}
                  />
                </div>
                <p
                  className="mt-0.5 text-[9px] font-extrabold uppercase tracking-[0.08em]"
                  style={{ color: barColor }}
                >
                  {skill.level}
                </p>
              </>
            )}
          </div>
          <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-white/60 bg-white dark:border-white/[0.08] dark:bg-[#0f1a2e]" />
        </div>
      </div>
    </FloatBox>
  );
}

/* ── Skill group card ── */
function SkillGroup({ title, subtitle, skills, index, catKey }) {
  const c = categoryColors[catKey] || categoryColors.foundation;
  return (
    <motion.div
      variants={cardMotion}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.15, margin: "0px 0px -20% 0px" }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -3, scale: 1.003 }}
      className="group/card rounded-2xl border border-white/60 bg-white/45 px-5 py-5 shadow-lg shadow-[#1E8DDE]/6 ring-1 ring-white/50 backdrop-blur-sm transition-shadow duration-400 hover:shadow-[0_0_30px_rgba(30,141,222,0.12)] hover:ring-[#1E8DDE]/30 dark:border-white/[0.06] dark:bg-white/[0.03] dark:shadow-[0_24px_60px_rgba(0,0,0,0.3)] dark:ring-white/[0.03] dark:hover:shadow-[0_0_40px_rgba(59,158,255,0.08)] dark:hover:ring-[#5DC3F5]/20 sm:px-7"
    >
      <div className="mb-3 flex items-center gap-3 sm:mb-3">
        <div className={`h-px flex-1 bg-gradient-to-r ${c.line}`} />
        <h3
          className={`font-ui shrink-0 text-center text-xs font-black tracking-[-0.02em] ${c.header} sm:text-sm`}
        >
          {title}
        </h3>
        <div className={`h-px flex-1 bg-gradient-to-l ${c.line}`} />
      </div>
      {subtitle && (
        <p className="mx-auto mb-3 max-w-[500px] text-center text-[10px] font-semibold leading-relaxed text-[#1a567a]/70 dark:text-white/40 sm:text-[11px]">
          {subtitle}
        </p>
      )}
      <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
        {Array.isArray(skills) &&
          skills.map((s, i) => (
            <SkillPill
              key={s.name || s.label || s.title}
              skill={{ ...s, _cat: catKey }}
              floatDelay={i * 0.12}
            />
          ))}
      </div>
    </motion.div>
  );
}

/* ── Skill data ── */
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
    name: "Dart",
    icon: "/assets/icons/dart.png",
    fallback: "DART",
    level: "Basic",
  },
  {
    name: "PHP",
    icon: "/assets/icons/php.png",
    fallback: "PHP",
    level: "Basic",
  },
  {
    name: "Python",
    icon: "/assets/icons/python.png",
    fallback: "PY",
    level: "Basic",
  },
  {
    name: "Bootstrap",
    icon: "/assets/icons/bootstrap.png",
    fallback: "BS",
    level: "Familiar",
  },
  {
    name: "Go",
    icon: "/assets/icons/golang.png",
    fallback: "GO",
    level: "Basic",
  },
  { name: "C", icon: "/assets/icons/c.png", fallback: "C", level: "Basic" },
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
    icon: "/assets/icons/github.png",
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
    name: "Railway",
    icon: "/assets/icons/railway.png",
    fallback: "RW",
    level: "Deployment",
  },
  {
    name: "Node.js",
    icon: "/assets/icons/nodejs.png",
    fallback: "NODE",
    level: "Backend",
  },
  {
    name: "Supabase",
    icon: "/assets/icons/supabase.png",
    fallback: "SUPABASE",
    level: "Database",
  },
  {
    name: "PostgreSQL",
    icon: "/assets/icons/postgresql.png",
    fallback: "SQL",
    level: "Database",
  },
  {
    name: "SQLite",
    icon: "/assets/icons/sqlite.png",
    fallback: "SL",
    level: "Database",
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

const aiProductivitySkills = [
  {
    name: "Claude",
    icon: "/assets/icons/claude.png",
    fallback: "CL",
    level: "AI Tools",
  },
  {
    name: "Gemini",
    icon: "/assets/icons/gemini.png",
    fallback: "GEM",
    level: "AI Tools",
  },
  {
    name: "OpenAI",
    icon: "/assets/icons/openai.png",
    fallback: "GPT",
    level: "AI Tools",
  },
  {
    name: "OpenCode",
    icon: "/assets/icons/opencode.png",
    fallback: "OC",
    level: "AI Tools",
  },
  {
    name: "Antigravity",
    icon: "/assets/icons/antigravity.png",
    fallback: "AG",
    level: "AI Tools",
  },
  { name: "Zed", icon: "/assets/icons/zed.png", fallback: "ZED", level: "IDE" },
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

export default function SkillsSection({ mode = "tech", onModeChange }) {
  const isCreative = mode === "creative";
  const isTech = !isCreative;
  const skillGroups = isTech
    ? [
        {
          title: "Web/App Foundation",
          subtitle: "Bahasa dan framework pengembangan web & app.",
          skills: webAppSkills,
          catKey: "foundation",
        },
        {
          title: "Tools & Deployment",
          subtitle: "Platform, database, dan tools pendukung.",
          skills: toolDeploymentSkills,
          catKey: "tools",
        },
        {
          title: "AI & Productivity",
          subtitle: "Tools AI, prompting, dan editor untuk workflow.",
          skills: aiProductivitySkills,
          catKey: "ai",
        },
      ]
    : [
        {
          title: "Editing & Motion",
          subtitle: "Video editing, motion, AMV, dan 3D.",
          skills: editingSkills,
          catKey: "editing",
        },
        {
          title: "Design & Visual",
          subtitle: "Desain grafis, konten, dan layout UI.",
          skills: designSkills,
          catKey: "design",
        },
      ];

  return (
    <section
      id="skills"
      className="hiyo-section-surface relative min-h-[calc(100vh-88px)] scroll-mt-24 overflow-visible bg-transparent px-6 pt-16 pb-24 sm:pt-20 sm:pb-32 sm:px-8 lg:px-12"
      style={{ overflowAnchor: "none" }}
    >
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-168px)] max-w-[1000px] flex-col justify-center gap-8">
        <motion.div
          key={mode}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15, margin: "0px 0px -20% 0px" }}
          className="flex flex-col gap-6"
        >
          {/* Title + Segmented Control */}
          <motion.div
            variants={sectionTitleMotion}
            className="flex flex-col items-center gap-4"
          >
            <h2 className="font-ui text-3xl font-black tracking-[-0.045em] text-[#1a567a] dark:text-white sm:text-4xl lg:text-5xl">
              {isTech ? "Tech & AI Workflow" : "Creative Skills"}
            </h2>

            {/* Segmented control */}
            <div className="inline-flex items-center rounded-full border border-white/60 bg-white/30 p-0.5 shadow-sm ring-1 ring-white/50 backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.03] dark:ring-white/[0.03]">
              <button
                type="button"
                onClick={() => onModeChange?.("tech")}
                className={`relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.12em] transition-all duration-300 ${
                  isTech
                    ? "bg-[#1E8DDE] text-white shadow-[0_4px_16px_rgba(30,141,222,0.28)] dark:bg-[#5DC3F5] dark:text-[#0a1e30]"
                    : "text-[#1a567a]/60 hover:text-[#1a567a] dark:text-white/40 dark:hover:text-white/70"
                }`}
              >
                <CodeIcon className={isTech ? "h-3.5 w-3.5" : "h-3 w-3"} />
                Tech & AI
              </button>
              <button
                type="button"
                onClick={() => onModeChange?.("creative")}
                className={`relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.12em] transition-all duration-300 ${
                  isCreative
                    ? "bg-[#1E8DDE] text-white shadow-[0_4px_16px_rgba(30,141,222,0.28)] dark:bg-[#5DC3F5] dark:text-[#0a1e30]"
                    : "text-[#1a567a]/60 hover:text-[#1a567a] dark:text-white/40 dark:hover:text-white/70"
                }`}
              >
                <SparkleIcon
                  className={isCreative ? "h-3.5 w-3.5" : "h-3 w-3"}
                />
                Creative
              </button>
            </div>

            <p className="max-w-2xl text-center text-sm font-semibold leading-relaxed text-[#1a567a]/80 dark:text-white/50">
              {isTech
                ? "Teknologi dan tools yang saya gunakan untuk pengembangan digital, AI-assisted, dan deployment."
                : "Creative tools untuk editing, motion, desain, dan eksplorasi visual."}
            </p>
          </motion.div>

          {/* Skill cards */}
          <div className="flex flex-col gap-4 sm:gap-5">
            {skillGroups.map((group, gi) => (
              <SkillGroup
                key={group.title}
                title={group.title}
                subtitle={group.subtitle}
                skills={group.skills}
                catKey={group.catKey}
                index={gi}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
