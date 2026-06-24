"use client";

import React, { useEffect, useState } from "react";

const sections = [
  { id: "home", label: "Home", href: "#home" },
  { id: "profile", label: "Profile", href: "#profile" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "portfolio", label: "Portfolio", href: "#portfolio" },
  { id: "achievement", label: "Achievement", href: "#achievement" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export default function SideNavigation() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map((item) =>
        document.getElementById(item.id),
      );
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside className="fixed right-7 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-5 md:flex">
      {sections.map((item) => (
        <a
          key={item.id}
          href={item.href}
          className="group relative flex items-center justify-end"
          aria-label={`Go to ${item.label}`}
        >
          <span className="pointer-events-none absolute right-7 whitespace-nowrap rounded-full border border-white/60 bg-white/90 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#0f3b5e] dark:border-white/[0.08] dark:bg-[#0f1a2e]/90 dark:text-white opacity-0 shadow-md backdrop-blur-md transition-all duration-300 ease-out group-hover:-translate-x-1 group-hover:opacity-100">
            {item.label}
          </span>
          <span
            className={`relative block rounded-full border transition-all duration-300 ease-out hover:scale-125 hover:border-[#1E8DDE] dark:hover:border-white hover:bg-[#1E8DDE] dark:hover:bg-white/90 hover:shadow-[0_0_18px_rgba(30,141,222,0.35)] ${
              activeSection === item.id
                ? "h-4 w-4 border-[#1E8DDE] bg-[#1E8DDE] dark:border-white dark:bg-white shadow-[0_0_0_4px_rgba(30,141,222,0.16),0_0_22px_rgba(30,141,222,0.35)] dark:shadow-[0_0_0_4px_rgba(255,255,255,0.16),0_0_22px_rgba(30,141,222,0.35)]"
                : "h-3 w-3 border-[#123A5A]/30 bg-transparent dark:border-white/30"
            }`}
          />
        </a>
      ))}
    </aside>
  );
}
