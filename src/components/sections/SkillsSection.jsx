"use client";

import React, { useState } from "react";

const programmingSkills = [
  { name: "HTML", icon: "/assets/icons/html.png", fallback: "HTML" },
  { name: "CSS", icon: "/assets/icons/css.png", fallback: "CSS" },
  { name: "JavaScript", icon: "/assets/icons/javascript.png", fallback: "JS" },
  { name: "PHP", icon: "/assets/icons/php.png", fallback: "PHP" },
  { name: "Python", icon: "/assets/icons/python.png", fallback: "PY" },
  { name: "Dart", icon: "/assets/icons/dart.png", fallback: "DART" },
  { name: "C", icon: "/assets/icons/c.png", fallback: "C" },
  { name: "C++", icon: "/assets/icons/c++.png", fallback: "C++" },
  { name: "Go", icon: "/assets/icons/golang.png", fallback: "GO" },
];

const backendSkills = [
  { name: "PostgreSQL", icon: "/assets/icons/postgres.png", fallback: "SQL" },
  { name: "Node.js", icon: "/assets/icons/nodejs.png", fallback: "NODE" },
  { name: "XAMPP", icon: "/assets/icons/xampp.png", fallback: "XAMPP" },
  { name: "Supabase", icon: "/assets/icons/supabase.png", fallback: "SUPA" },
  { name: "Firebase", icon: "/assets/icons/firebase.png", fallback: "FIRE" },
  { name: "Vercel", icon: "/assets/icons/vercel.png", fallback: "VC" },
];

const editingSkills = [
  {
    name: "After Effects",
    icon: "/assets/icons/aftereffects.png",
    fallback: "AE",
  },
  { name: "CapCut", icon: "/assets/icons/capcut.png", fallback: "CapCut" },
  {
    name: "Alight Motion",
    icon: "/assets/icons/alight-motion.png",
    fallback: "AM",
  },
  { name: "Blender", icon: "/assets/icons/blender.png", fallback: "BLEND" },
  { name: "Unity", icon: "/assets/icons/unity.png", fallback: "UNITY" },
];

const designSkills = [
  { name: "Photoshop", icon: "/assets/icons/photoshop.png", fallback: "PS" },
  {
    name: "Alight Motion",
    icon: "/assets/icons/alight-motion.png",
    fallback: "AM",
  },
  { name: "Canva", icon: "/assets/icons/canva.png", fallback: "CANVA" },
  { name: "Figma", icon: "/assets/icons/figma.png", fallback: "FIGMA" },
];

function SkillIcon({ skill }) {
  return (
    <div className="flex w-[72px] flex-col items-center gap-1.5 text-center sm:w-[80px]">
      <div className="relative flex h-[64px] w-[64px] items-center justify-center rounded-2xl bg-white/70 shadow-sm ring-1 ring-white/70">
        <span className="absolute inset-0 flex items-center justify-center px-1 text-center text-[11px] font-black uppercase leading-tight text-[#1F6FAE]">
          {skill.fallback}
        </span>
        <img
          src={skill.icon}
          alt={skill.name}
          className="relative z-10 max-h-[48px] max-w-[48px] object-contain"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      </div>
      <span className="text-[12px] font-bold leading-tight text-[#134E7D] sm:text-[13px]">
        {skill.name}
      </span>
    </div>
  );
}

function SkillGroup({ title, skills }) {
  return (
    <div className="rounded-[1.75rem] bg-[#b8d7ef]/90 px-6 py-5 shadow-xl shadow-[#1E8DDE]/10 ring-1 ring-white/60 sm:px-8 sm:py-6">
      <h3 className="mb-5 text-center text-2xl font-black uppercase tracking-[-0.035em] text-[#2D8FE3] sm:text-3xl lg:text-[2rem]">
        {title}
      </h3>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-5 sm:gap-x-8">
        {skills.map((skill) => (
          <SkillIcon key={skill.name} skill={skill} />
        ))}
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const [mode, setMode] = useState("tech");
  const isTech = mode === "tech";
  const skillGroups = isTech
    ? [
        { title: "PROGRAMMING LANGUAGE :", skills: programmingSkills },
        { title: "DATABASE & BACKEND :", skills: backendSkills },
      ]
    : [
        { title: "EDITING & 3D SOFTWARE :", skills: editingSkills },
        { title: "DESIGN SOFTWARE :", skills: designSkills },
      ];

  return (
    <section
      id="skills"
      className="relative min-h-[calc(100vh-88px)] overflow-hidden bg-[#f1f2f2] px-6 py-10 sm:px-8 lg:px-12"
    >
      {/* Layer 1: Background image */}
      <img
        src="/assets/backgrounds/bg-skills.png"
        alt=""
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
      />

      {/* Layer 2: Subtle panel contrast overlay */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-white/5" />

      {/* Layer 3: Top fade transition from Profile */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-[2] h-[110px] bg-gradient-to-b from-[#f1f2f2] to-transparent" />

      {/* Layer 4: Bottom fade transition to Portfolio */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[2] h-[100px] bg-gradient-to-b from-transparent to-[#e7edf2]" />

      {/* Layer 5: Content */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-168px)] max-w-[1150px] flex-col justify-center gap-8">
        <div className="flex flex-col gap-8 transition-opacity duration-300">
          {skillGroups.map((group) => (
            <SkillGroup
              key={group.title}
              title={group.title}
              skills={group.skills}
            />
          ))}
        </div>

        <div
          className={`flex pt-0 ${isTech ? "justify-end" : "justify-start"}`}
        >
          <button
            type="button"
            onClick={() => setMode(isTech ? "creative" : "tech")}
            className="rounded-full border-2 border-white bg-[#1E8DDE] px-5 py-2.5 text-xs font-black uppercase tracking-[0.16em] text-white shadow-lg shadow-[#1E8DDE]/20 transition-transform duration-300 hover:scale-105 sm:text-sm"
          >
            {isTech ? "Switch to Creative →" : "← Switch to Tech"}
          </button>
        </div>
      </div>
    </section>
  );
}
