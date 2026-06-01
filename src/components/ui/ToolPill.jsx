"use client";

import React, { useState } from "react";

export const TOOL_ICONS = {
  HTML: "/assets/icons/html.png",
  Html: "/assets/icons/html.png",
  CSS: "/assets/icons/css.png",
  JavaScript: "/assets/icons/javascript.png",
  Flutter: "/assets/icons/flutter.png",
  Go: "/assets/icons/golang.png",
  C: "/assets/icons/c.png",
  "C++": "/assets/icons/c++.png",
  "Node.js": "/assets/icons/nodejs.png",
  PostgreSQL: "/assets/icons/postgresql.png",
  Supabase: "/assets/icons/supabase.png",
  Vercel: "/assets/icons/vercel.png",
  Canva: "/assets/icons/canva.png",
  "Alight Motion": "/assets/icons/alight-motion.png",
  CapCut: "/assets/icons/capcut.png",
  "After Effects": "/assets/icons/aftereffects.png",
  Photoshop: "/assets/icons/photoshop.png",
  Unity: "/assets/icons/unity.png",
  Blender: "/assets/icons/blender.png",
  Figma: "/assets/icons/figma.png",
  Firebase: "/assets/icons/firebase.png",
  XAMPP: "/assets/icons/xampp.png",
  GitHub: "/assets/icons/github.png",
  Android: "/assets/icons/android.png",
  Dart: "/assets/icons/dart.png",
  Bootstrap: "/assets/icons/bootstrap.png",
  SQLite: "/assets/icons/sqlite.png",
  Railway: "/assets/icons/railway.png",
};

export default function ToolPill({ tool, className = "" }) {
  const [iconError, setIconError] = useState(false);
  const iconPath = TOOL_ICONS[tool];

  if (iconPath && !iconError) {
    return (
      <div className="group/pill relative">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 shadow-sm ring-1 ring-white/70 transition-transform duration-200 hover:scale-110 ${className}`}
        >
          <img
            src={iconPath}
            alt={tool}
            className="max-h-6 max-w-6 object-contain mix-blend-multiply"
            onError={() => setIconError(true)}
          />
        </div>
        {/* Tooltip */}
        <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-1.5 min-w-max -translate-x-1/2 opacity-0 transition-all duration-200 group-hover/pill:opacity-100">
          <div className="rounded-lg border border-white/60 bg-white px-2.5 py-1.5 text-xs font-bold text-[#123A5A] shadow-lg">
            {tool}
          </div>
          <div className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rotate-45 border-b border-r border-white/60 bg-white" />
        </div>
      </div>
    );
  }

  return (
    <span
      className={`rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-semibold text-slate-600 ring-1 ring-[#d7e5ef] ${className}`}
    >
      {tool}
    </span>
  );
}
