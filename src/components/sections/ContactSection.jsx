"use client";

import React from "react";
import { motion } from "framer-motion";

import { contactData } from "@/data/contactData";
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

export default function ContactSection() {
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
          className="grid min-h-0 lg:min-h-[420px] grid-cols-1 items-center gap-10 rounded-[28px] border border-white/75 dark:border-white/[0.08] bg-white/85 dark:bg-[#0d1525]/80 p-7 shadow-[0_24px_60px_rgba(31,79,122,0.16)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.4)] backdrop-blur-[3px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(30,141,222,0.2)] sm:p-10 md:grid-cols-[1.1fr_0.9fr] lg:grid-cols-[1.2fr_0.8fr] lg:p-12 xl:p-16"
        >
          {/* ============ LEFT COLUMN ============ */}
          <div className="flex flex-col justify-center">
            {/* Heading */}
            <h2 className="text-[clamp(2rem,5.8vw,5.6rem)] font-black leading-[0.92] tracking-tight whitespace-nowrap">
              <span className="text-slate-900 dark:text-white">
                Let&apos;s Make
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#1E8DDE] to-[#818CF8] bg-clip-text text-transparent">
                It Happen
              </span>
            </h2>

            {/* Tagline */}
            <p className="mt-4 max-w-md text-base font-medium leading-relaxed text-slate-600 dark:text-gray-400 sm:text-lg">
              <StaggerWords
                text="Have a project in mind? Let's create something great together."
                baseDelay={0.15}
                wordDuration={0.35}
                staggerDelay={0.04}
              />
            </p>

            {/* Badges */}
            <div className="mt-5 flex flex-wrap gap-1.5">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-white/70 dark:border-white/10 bg-white/50 dark:bg-white/[0.05] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#0f3b5e] dark:text-gray-400 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1E8DDE] hover:text-white sm:text-[11px]"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href="mailto:abdul.dinata557@gmail.com"
                className="inline-flex items-center gap-2 rounded-full bg-[#1E8DDE] px-6 py-2.5 text-sm font-bold text-white shadow-[0_10px_28px_rgba(30,141,222,0.24)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(30,141,222,0.3)] active:scale-95 sm:px-7 sm:py-3"
              >
                <svg
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7l-10 7L2 7" />
                </svg>
                Email Me
              </a>
              <a
                href="#intro"
                onClick={(e) => {
                  // Dispatch custom event so IntroSection auto-opens CV dropdown
                  window.dispatchEvent(new CustomEvent("openCV"));
                }}
                className="inline-flex items-center gap-1.5 rounded-full border border-indigo-400/40 dark:border-indigo-400/20 bg-white/40 dark:bg-white/[0.05] px-5 py-2.5 text-sm font-bold text-indigo-600 dark:text-indigo-300 transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-500/10 dark:hover:bg-indigo-500/10 active:scale-95"
              >
                <svg
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4"
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
                Lihat CV
                <span className="text-xs opacity-60">↑</span>
              </a>
            </div>
          </div>

          {/* ============ RIGHT COLUMN — Find me on ============ */}
          <div className="mx-auto w-full md:ml-auto">
            <div className="rounded-[20px] border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-[#0d1525]/70 backdrop-blur-md p-5 sm:p-7">
              <p className="mb-4 text-sm font-extrabold tracking-tight text-slate-800 dark:text-white/70">
                Find me on
              </p>
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {contactData.map((contact, idx) => {
                  const label = contact.label;
                  const fallback =
                    contactFallbacks[label] ?? label.slice(0, 2).toUpperCase();
                  return (
                    <motion.a
                      key={label}
                      initial={{ opacity: 0, y: 12, scale: 0.96 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{
                        once: false,
                        amount: 0.15,
                        margin: "0px 0px -20% 0px",
                      }}
                      transition={{
                        duration: 0.35,
                        delay: idx * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      whileHover={{ y: -4, scale: 1.05 }}
                      href={contact.url}
                      title={label}
                      aria-label={label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-white/70 dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.04] py-3 px-2 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:bg-white dark:hover:bg-white/[0.08] hover:border-indigo-400/30 dark:hover:border-indigo-400/30 hover:shadow-[0_8px_20px_rgba(99,102,241,0.1)] active:scale-[0.92] active:shadow-[0_0_45px_rgba(99,102,241,0.35)] active:border-indigo-400/60"
                    >
                      <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-[10px] bg-white/70 dark:bg-white/[0.06]">
                        <img
                          src={contact.icon}
                          alt={label}
                          className="h-5 w-5 object-contain transition-transform duration-300 group-hover:scale-110"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                        <span className="hidden items-center justify-center text-[9px] font-black uppercase text-[#1a567a] dark:text-[#93C5FD]">
                          {fallback}
                        </span>
                      </span>
                      <span className="text-[10px] font-bold text-slate-600 dark:text-gray-400 transition-colors duration-300 group-hover:text-indigo-500 dark:group-hover:text-indigo-400">
                        {label}
                      </span>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
