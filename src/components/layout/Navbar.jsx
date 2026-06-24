"use client";

import React from "react";
import { SITE_CONFIG } from "@/constants/site";
import AnimatedTooltip from "@/components/ui/AnimatedTooltip";
import ThemeSwitch from "@/components/ui/ThemeSwitch";

const { useState, useEffect, useCallback } = React;

const navItems = [
  { label: "Home", href: "#home", id: "home" },
  ...SITE_CONFIG.navItems,
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [navbarHidden, setNavbarHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // Track scroll position & direction
  useEffect(() => {
    let prevScrollY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;

      setScrolled(currentY > 30);

      // Hide navbar when scrolling down past threshold, show when scrolling up
      if (currentY > 80 && currentY > prevScrollY) {
        setNavbarHidden(true);
      } else {
        setNavbarHidden(false);
      }

      prevScrollY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ensure navbar is visible when mobile menu opens
  useEffect(() => {
    if (mobileOpen) setNavbarHidden(false);
  }, [mobileOpen]);

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
    <header
      className={`fixed top-0 left-0 w-full z-[60] transition-all duration-500 ${
        navbarHidden ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled
          ? "bg-white/70 dark:bg-[#0a1e30]/75 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20 border-b border-gray-200/50 dark:border-white/5"
          : "bg-white/10 md:bg-transparent dark:bg-[#0a1e30]/20 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#home"
          className="font-heading text-xl font-bold text-[#0f3b5e] dark:text-white tracking-tight relative"
        >
          <span className="relative">
            Hiyosashii
            <span className="text-[#5DC3F5]">.</span>
            <span className="absolute -bottom-0.5 left-0 h-[2.5px] w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-[#1E8DDE] to-[#00d4ff] transition-transform duration-500 group-hover:scale-x-100" />
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <AnimatedTooltip
              key={item.id}
              content={
                item.label === "Home"
                  ? "Ke halaman utama"
                  : `Lihat bagian ${item.label}`
              }
              position="bottom"
            >
              <a
                href={item.href}
                className="font-ui relative px-3.5 py-2 text-sm font-semibold text-[#0f3b5e]/70 dark:text-gray-300 hover:text-[#0f3b5e] dark:hover:text-white transition-all duration-300 group"
              >
                {item.label}
                <span className="absolute inset-x-3 bottom-0 h-[2.5px] rounded-full bg-gradient-to-r from-[#1E8DDE] to-[#00d4ff] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
            </AnimatedTooltip>
          ))}
        </nav>

        {/* Theme toggle */}
        <div className="hidden md:flex items-center ml-4">
          <ThemeSwitch />
        </div>

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
            className="absolute h-0.5 w-6 rounded-full bg-[#123A5A]/60 dark:bg-white/70 transition-all duration-300 ease-in-out"
            style={{
              transform: mobileOpen
                ? "translateY(0) rotate(45deg)"
                : "translateY(-8px) rotate(0)",
            }}
          />
          <span
            className="absolute h-0.5 w-6 rounded-full bg-[#123A5A]/60 dark:bg-white/70 transition-all duration-300 ease-in-out"
            style={{
              opacity: mobileOpen ? 0 : 1,
            }}
          />
          <span
            className="absolute h-0.5 w-6 rounded-full bg-[#123A5A]/60 dark:bg-white/70 transition-all duration-300 ease-in-out"
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
        className="md:hidden fixed right-0 z-50 flex flex-col bg-white/95 dark:bg-[#0a1e30]/95 backdrop-blur-xl shadow-2xl shadow-black/10 dark:shadow-black/30 transition-transform duration-300 ease-in-out"
        style={{
          top: "64px",
          height: "calc(100dvh - 64px)",
          width: "280px",
          transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* Decorative top gradient line */}
        <div className="h-[3px] w-full bg-gradient-to-r from-[#1E8DDE] via-[#00d4ff]/60 to-transparent" />

        <ul className="flex flex-col gap-1 px-4 py-6">
          {navItems.map((item, index) => (
            <li key={item.id}>
              <a
                href={item.href}
                onClick={closeMobile}
                className="font-ui flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-semibold text-[#0f3b5e]/60 dark:text-gray-400 hover:bg-gradient-to-r hover:from-[#1E8DDE]/10 hover:to-transparent hover:text-[#0f3b5e] dark:hover:text-white transition-all duration-200 group"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <span className="h-[3px] w-0 rounded-full bg-[#1E8DDE] transition-all duration-300 group-hover:w-4" />
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile theme toggle */}
        <div className="px-4 py-2">
          <div className="flex items-center justify-between rounded-xl px-4 py-3">
            <span className="text-sm font-semibold text-[#0f3b5e]/60 dark:text-gray-400">
              Theme
            </span>
            <ThemeSwitch />
          </div>
        </div>

        {/* Accent bar at bottom of drawer */}
        <div className="mt-auto px-8 py-6">
          <div className="flex items-center gap-2">
            <div className="h-[3px] flex-1 rounded-full bg-gradient-to-r from-[#1E8DDE]/40 dark:from-[#5DC3F5]/40 to-transparent" />
            <div className="h-3 w-3 rounded-full border-2 border-[#1E8DDE]/30" />
          </div>
        </div>
      </nav>
    </header>
  );
}
