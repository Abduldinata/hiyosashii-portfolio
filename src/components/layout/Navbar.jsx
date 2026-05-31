"use client";

import React from "react";
import { SITE_CONFIG } from "@/constants/site";

const { useState, useEffect, useCallback } = React;

const navItems = [
  { label: "Home", href: "#home", id: "home" },
  ...SITE_CONFIG.navItems,
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-gray-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#home"
          className="text-xl font-bold text-black dark:text-white tracking-tight"
        >
          Hiyosashii<span className="text-primary-blue">.</span>
        </a>
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
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

        {/* Mobile hamburger button */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="md:hidden relative w-10 h-10 flex items-center justify-center focus:outline-none"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <span className="sr-only">
            {mobileOpen ? "Close menu" : "Open menu"}
          </span>
          {/* Three bars that animate into an X */}
          <span
            className="absolute h-0.5 w-6 rounded-full bg-gray-800 dark:bg-white transition-all duration-300 ease-in-out"
            style={{
              transform: mobileOpen
                ? "translateY(0) rotate(45deg)"
                : "translateY(-8px) rotate(0)",
            }}
          />
          <span
            className="absolute h-0.5 w-6 rounded-full bg-gray-800 dark:bg-white transition-all duration-300 ease-in-out"
            style={{
              opacity: mobileOpen ? 0 : 1,
            }}
          />
          <span
            className="absolute h-0.5 w-6 rounded-full bg-gray-800 dark:bg-white transition-all duration-300 ease-in-out"
            style={{
              transform: mobileOpen
                ? "translateY(0) rotate(-45deg)"
                : "translateY(8px) rotate(0)",
            }}
          />
        </button>
      </div>

      {/* Mobile backdrop */}
      <div
        className="md:hidden fixed inset-0 z-40 transition-opacity duration-300 ease-in-out"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          top: "64px",
        }}
        onClick={closeMobile}
        aria-hidden="true"
      />

      {/* Mobile drawer */}
      <nav
        className="md:hidden fixed right-0 z-50 flex flex-col bg-white dark:bg-zinc-900 shadow-xl transition-transform duration-300 ease-in-out"
        style={{
          top: "64px",
          height: "calc(100dvh - 64px)",
          width: "280px",
          transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        <ul className="flex flex-col gap-1 px-4 py-6">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                onClick={closeMobile}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-zinc-300 hover:bg-[#1E8DDE]/10 hover:text-[#123A5A] dark:hover:text-[#1E8DDE] transition-colors duration-200"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Accent bar at bottom of drawer */}
        <div className="mt-auto px-8 py-6">
          <div className="h-1 w-12 rounded-full bg-[#1E8DDE]" />
        </div>
      </nav>
    </header>
  );
}
