"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

import { contactData } from "@/data/contactData";
import SplitWords from "../ui/SplitWords";
import StaggerWords from "../ui/StaggerWords";

const badges = [
  "Editing",
  "Design",
  "UI/UX",
  "AI-Assisted Dev",
  "Collaboration",
];

const contactFallbacks = {
  LinkedIn: "LI",
  GitHub: "GH",
  Instagram: "IG",
  YouTube: "YT",
  Telegram: "TG",
  Discord: "DC",
};

function ContactIcon({ contact }) {
  const [imageError, setImageError] = useState(false);
  const label = contact.label || "Contact";
  const fallbackText =
    contactFallbacks[label] ?? label.slice(0, 2).toUpperCase();

  return (
    <motion.a
      initial={{ opacity: 0, y: 16, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.15, margin: "0px 0px -20% 0px" }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, scale: 1.04 }}
      href={contact.url}
      title={label}
      aria-label={label}
      target={contact.type === "link" ? "_blank" : undefined}
      rel={contact.type === "link" ? "noopener noreferrer" : undefined}
      className="group relative flex min-h-[116px] flex-col items-center justify-center gap-2 rounded-2xl border border-white/70 dark:border-white/[0.08] bg-white/90 dark:bg-white/[0.05] p-3 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.04] hover:bg-white dark:hover:bg-white/10 hover:shadow-[0_14px_34px_rgba(30,141,222,0.24)] active:scale-95"
    >
      <span className="pointer-events-none absolute right-2 top-1.5 z-20 text-xs font-black text-[#1E8DDE] dark:text-[#5DC3F5] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        ↗
      </span>

      <span className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white/70 dark:bg-white/[0.08] text-sm font-extrabold text-[#1a567a] dark:text-[#93C5FD] shadow-sm ring-2 ring-white/80 dark:ring-white/[0.05] sm:h-16 sm:w-16">
        {contact.icon && !imageError ? (
          <img
            src={contact.icon}
            alt={label}
            className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="text-[11px] font-black uppercase leading-tight sm:text-xs">
            {fallbackText}
          </span>
        )}
      </span>

      <span className="relative z-10 text-[11px] font-bold text-slate-600 dark:text-gray-400 transition-colors duration-300 group-hover:text-[#1E8DDE] dark:group-hover:text-[#5DC3F5] sm:text-xs">
        {label}
      </span>
    </motion.a>
  );
}

export default function ContactSection() {
  const [showCVDropdown, setShowCVDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowCVDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section
      id="contact"
      className="hiyo-section-surface relative flex min-h-[calc(100vh-88px)] w-full scroll-mt-24 items-center justify-center overflow-visible bg-transparent px-4 py-16 sm:py-20 text-slate-900 dark:text-white sm:px-6 lg:px-8"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 22, scale: 0.988, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.15, margin: "0px 0px -20% 0px" }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
            filter: { duration: 0.08 },
          }}
          className="grid min-h-0 lg:min-h-[420px] grid-cols-1 items-center gap-10 rounded-[28px] border border-white/75 dark:border-white/[0.08] bg-white/85 dark:bg-[#0d1525]/80 p-7 shadow-[0_24px_60px_rgba(31,79,122,0.16)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.4)] backdrop-blur-[3px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(30,141,222,0.28)] sm:p-10 md:grid-cols-[1.1fr_0.9fr] lg:grid-cols-[1.2fr_0.8fr] lg:p-12 xl:p-16"
        >
          <div>
            <h2 className="text-[clamp(2rem,5.8vw,5.6rem)] font-black leading-[0.92] tracking-tight text-slate-900 dark:text-white">
              <SplitWords
                text="Let's work"
                baseDelay={0.1}
                charDuration={0.45}
              />
              <br />
              <span className="text-[#1E8DDE]">
                <SplitWords
                  text="together."
                  baseDelay={0.25}
                  charDuration={0.45}
                />
              </span>
            </h2>

            <p className="mt-6 max-w-md text-lg font-medium leading-relaxed text-slate-700 dark:text-gray-300 sm:text-xl md:text-[1.3rem]">
              <StaggerWords
                text="Available for editing, design, UI/UX layouting, web/app project, and creative collaboration."
                baseDelay={0.2}
                wordDuration={0.4}
                staggerDelay={0.04}
              />
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-white/70 dark:border-white/10 bg-white/50 dark:bg-white/[0.05] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f3b5e] dark:text-gray-300 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1E8DDE] hover:text-white sm:text-xs"
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="mailto:abdul.dinata557@gmail.com"
                className="rounded-full bg-[#1E8DDE] px-8 py-3 font-bold text-white shadow-[0_14px_34px_rgba(30,141,222,0.28)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(30,141,222,0.32)] active:scale-95"
              >
                Email Me
              </a>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowCVDropdown(!showCVDropdown)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#1E8DDE]/40 dark:border-white/10 bg-white/40 dark:bg-white/[0.05] px-5 py-2.5 text-sm font-bold text-[#0f3b5e] dark:text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:bg-white/70 dark:hover:bg-white/10 active:scale-95"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download CV
                  <svg
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${showCVDropdown ? "rotate-180" : ""}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {showCVDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute bottom-full left-0 mb-2 w-52 rounded-xl border border-white/80 dark:border-white/[0.08] bg-white dark:bg-[#0f1a2e]/95 shadow-lg backdrop-blur-md overflow-hidden"
                  >
                    <a
                      href="/assets/cv/cv_ats_tech.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setShowCVDropdown(false)}
                      className="flex items-center gap-2.5 px-4 py-3.5 text-sm font-bold text-[#0f3b5e] dark:text-white transition-colors hover:bg-[#1E8DDE]/10 dark:hover:bg-white/5"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1E8DDE]/10 text-xs">
                        💻
                      </span>
                      Tech CV
                    </a>
                    <a
                      href="/assets/cv/cv_ats_multimedia.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setShowCVDropdown(false)}
                      className="flex items-center gap-2.5 border-t border-white/60 dark:border-white/10 px-4 py-3.5 text-sm font-bold text-[#0f3b5e] dark:text-white transition-colors hover:bg-[#1E8DDE]/10 dark:hover:bg-white/5"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1E8DDE]/10 text-xs">
                        🎬
                      </span>
                      Multimedia CV
                    </a>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          <div className="mx-auto w-full md:ml-auto">
            <div className="relative overflow-hidden rounded-[26px] border border-white/70 dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.04] p-5 shadow-[0_24px_70px_rgba(30,141,222,0.16)] dark:shadow-[0_24px_70px_rgba(0,0,0,0.4)] backdrop-blur-md sm:p-6">
              <div className="relative z-10">
                <p className="mb-5 text-center text-lg font-extrabold tracking-tight text-[#0f3b5e] dark:text-white/80 md:text-left">
                  Contact me on :
                </p>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {contactData.map((contact) => (
                    <ContactIcon key={contact.label} contact={contact} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
