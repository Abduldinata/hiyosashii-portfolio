"use client";

import React, { useState } from "react";

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
    <div className="group flex w-[72px] flex-col items-center gap-1.5 text-center sm:w-[80px]">
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
        <span className="text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#3d6f93]/75">
          {skill.level}
        </span>
      )}
    </div>
  );
}

function SkillGroup({ title, subtitle, skills }) {
  return (
    <div className="hiyo-hover-card rounded-[1.75rem] border border-white/60 bg-white/45 px-6 py-5 shadow-xl shadow-[#1E8DDE]/10 ring-1 ring-white/50 backdrop-blur-sm sm:px-8 sm:py-6">
      <div className="mb-5 text-center">
        <h3 className="text-2xl font-black tracking-[-0.035em] text-[#2D8FE3] sm:text-3xl lg:text-[2rem]">
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
    </div>
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
      className="relative min-h-[calc(100vh-88px)] overflow-hidden bg-transparent px-6 py-20 sm:px-8 lg:px-12"
    >
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-248px)] max-w-[1150px] flex-col justify-center gap-8">
        <div key={mode} className="hiyo-section-reveal flex flex-col gap-8">
          <div className="text-center">
            <h2 className="text-4xl font-black tracking-[-0.045em] text-[#123E63] sm:text-5xl">
              {isTech ? "Tech & AI-Assisted Workflow" : "Creative Skills"}
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-sm font-semibold leading-relaxed text-[#134E7D]/80 sm:text-base">
              {isTech
                ? "Tech stack ini saya gunakan sebagai pendukung proses pembuatan project digital, terutama melalui eksplorasi, prompting, testing, dan AI-assisted development."
                : "Creative skills ini menjadi fokus utama saya dalam editing video, motion/AMV, desain visual, content design, dan eksplorasi UI layout untuk kebutuhan publikasi digital."}
            </p>
          </div>

          {skillGroups.map((group) => (
            <SkillGroup
              key={group.title}
              title={group.title}
              subtitle={group.subtitle}
              skills={group.skills}
            />
          ))}
        </div>

        <div
          className={`flex pt-0 ${isTech ? "justify-end" : "justify-start"}`}
        >
          <button
            type="button"
            onClick={() => onModeChange?.(isCreative ? "tech" : "creative")}
            className="hiyo-primary-button rounded-full border-2 border-white bg-[#1E8DDE] px-5 py-2.5 text-xs font-black uppercase tracking-[0.16em] text-white shadow-lg shadow-[#1E8DDE]/20 sm:text-sm"
          >
            {isTech ? "Switch to Creative →" : "← Switch to Tech"}
          </button>
        </div>
      </div>
    </section>
  );
}
