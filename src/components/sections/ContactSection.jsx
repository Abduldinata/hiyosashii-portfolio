"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

import { contactData } from "@/data/contactData";

const badges = [
  "Editing",
  "Design",
  "UI/UX",
  "AI-Assisted Dev",
  "Collaboration",
];

const contactFallbacks = {
  Gmail: "GM",
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
      viewport={{ once: false, amount: 0.25 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, scale: 1.04 }}
      href={contact.url}
      title={label}
      aria-label={label}
      target={contact.type === "link" ? "_blank" : undefined}
      rel={contact.type === "link" ? "noopener noreferrer" : undefined}
      className="group relative flex min-h-[116px] flex-col items-center justify-center gap-2 rounded-2xl border border-white/70 bg-white/90 p-3 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.04] hover:bg-white hover:shadow-[0_14px_34px_rgba(30,141,222,0.24)] active:scale-95"
    >
      <span className="pointer-events-none absolute right-2 top-1.5 z-20 text-xs font-black text-[#1E8DDE] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        ↗
      </span>

      <span className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white/70 text-sm font-extrabold text-[#1f4f7a] shadow-sm ring-2 ring-white/80 sm:h-16 sm:w-16">
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

      <span className="relative z-10 text-[11px] font-bold text-slate-600 transition-colors duration-300 group-hover:text-[#1E8DDE] sm:text-xs">
        {label}
      </span>
    </motion.a>
  );
}

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="hiyo-section-surface relative flex min-h-[calc(100vh-88px)] w-full scroll-mt-24 items-center justify-center overflow-visible bg-transparent px-4 py-20 text-slate-900 sm:px-6 lg:px-8"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0.88, y: 22, scale: 0.988, filter: "blur(2px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.16 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="grid min-h-0 lg:min-h-[420px] grid-cols-1 items-center gap-10 rounded-[28px] border border-white/75 bg-white/85 p-7 shadow-[0_24px_60px_rgba(31,79,122,0.16)] backdrop-blur-[3px] sm:p-10 md:grid-cols-[1.1fr_0.9fr] lg:grid-cols-[1.2fr_0.8fr] lg:p-12 xl:p-16"
        >
          <div>
            <h2 className="text-[clamp(2rem,5.8vw,5.6rem)] font-black leading-[0.92] tracking-tight text-slate-900">
              Let&rsquo;s work
              <br />
              <span className="text-[#1E8DDE]">together.</span>
            </h2>

            <p className="mt-6 max-w-md text-lg font-medium leading-relaxed text-slate-700 sm:text-xl md:text-[1.3rem]">
              Available for editing, design,
              <br className="hidden sm:block" />
              UI/UX layouting, web/app project,
              <br className="hidden sm:block" />
              and creative collaboration.
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-white/70 bg-white/50 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#123A5A] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1E8DDE] hover:text-white sm:text-xs"
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="mailto:abdul.dinata557@gmail.com"
                className="rounded-full bg-[#1E8DDE] px-8 py-3 font-bold text-white shadow-[0_14px_34px_rgba(30,141,222,0.28)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_46px_rgba(30,141,222,0.38)] active:scale-95"
              >
                Email Me
              </a>
              <a
                href="https://github.com/Abduldinata"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[#1E8DDE]/40 bg-white/40 px-5 py-2.5 text-sm font-bold text-[#123A5A] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/70 active:scale-95"
              >
                View GitHub
              </a>
            </div>
          </div>

          <div className="mx-auto w-full md:ml-auto">
            <div className="relative overflow-hidden rounded-[26px] border border-white/70 bg-white/70 p-5 shadow-[0_24px_70px_rgba(30,141,222,0.16)] backdrop-blur-md sm:p-6">
              <div className="relative z-10">
                <p className="mb-5 text-center text-lg font-extrabold tracking-tight text-[#173d61] md:text-left">
                  Contact me on :
                </p>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
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
