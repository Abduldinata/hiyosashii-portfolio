import React from "react";
import { SITE_CONFIG } from "@/constants/site";

export default function Footer() {
  return (
    <footer className="w-full pb-20 md:pb-8 pt-12 bg-transparent relative z-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#1E8DDE]/30 to-transparent mb-6" />
        <p className="text-sm font-semibold text-[#123A5A]/60">
          &copy; {new Date().getFullYear()} {SITE_CONFIG.name}
        </p>
        <p className="text-xs text-[#123A5A]/40 mt-2">
          Built with Next.js, Tailwind CSS, & Framer Motion
        </p>
      </div>
    </footer>
  );
}
