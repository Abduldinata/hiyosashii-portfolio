import React from "react";
import { SITE_CONFIG } from "@/constants/site";

export default function Footer() {
  return (
    <footer className="w-full pb-20 md:pb-8 pt-12 bg-gradient-to-b from-transparent dark:to-[#0a1e30]/80 to-white/60 relative z-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#5DC3F5]/30 to-transparent mb-6" />
        <p className="text-sm font-semibold text-[#0f3b5e]/60 dark:text-white/60">
          &copy; {new Date().getFullYear()} {SITE_CONFIG.name}
        </p>
        <p className="text-xs text-[#0f3b5e]/40 dark:text-white/40 mt-2">
          Built with Next.js, Tailwind CSS, & Framer Motion
        </p>
      </div>
    </footer>
  );
}
