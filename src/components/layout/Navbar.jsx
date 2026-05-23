"use client";

import React from "react";
import { SITE_CONFIG } from "@/constants/site";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-gray-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#profile"
          className="text-xl font-bold text-black dark:text-white tracking-tight"
        >
          Hiyosashii<span className="text-primary-blue">.</span>
        </a>
        <nav className="hidden md:flex space-x-8">
          {SITE_CONFIG.navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="text-sm font-medium text-gray-600 dark:text-zinc-400 hover:text-primary-blue dark:hover:text-primary-blue transition-colors relative group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-blue transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>
        {/* Simple Mobile Menu Indicator Placeholder */}
        <div className="md:hidden text-xs text-gray-400 font-mono">[Menu]</div>
      </div>
    </header>
  );
}
