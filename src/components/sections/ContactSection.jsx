"use client";

import React from "react";

import { contactData } from "@/data/contactData";

const contactFallbacks = {
  Gmail: "GM",
  GitHub: "GH",
  Instagram: "IG",
  YouTube: "YT",
  Telegram: "TG",
  Discord: "DC",
};

const badges = [
  "Editing",
  "Design",
  "UI/UX",
  "AI-Assisted Dev",
  "Collaboration",
];

function ContactIcon({ contact, index }) {
  const fallback =
    contactFallbacks[contact.label] ?? contact.label.slice(0, 2).toUpperCase();

  return (
    <a
      href={contact.url}
      title={contact.label}
      aria-label={contact.label}
      className="hiyo-pop-in group relative flex flex-col items-center gap-2 rounded-2xl border border-white/70 bg-white/80 p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_14px_34px_rgba(30,141,222,0.24)] active:scale-95"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <span className="pointer-events-none absolute right-2 top-1.5 text-xs font-black text-[#1E8DDE] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        ↗
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl text-sm font-extrabold text-[#1f4f7a] sm:h-16 sm:w-16">
        <span>{fallback}</span>
        {contact.icon ? (
          <img
            src={contact.icon}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-110"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        ) : null}
      </span>
      <span className="text-[11px] font-bold text-slate-600 transition-colors duration-300 group-hover:text-[#1E8DDE] sm:text-xs">
        {contact.label}
      </span>
    </a>
  );
}

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative flex min-h-[calc(100vh-88px)] w-full items-center justify-center overflow-hidden bg-transparent px-4 py-20 text-slate-900 sm:px-6 lg:px-8"
    >
      <div className="hiyo-section-reveal relative z-10 mx-auto w-full max-w-[1160px]">
        <div className="hiyo-hover-card grid min-h-[420px] grid-cols-1 items-center gap-10 rounded-[28px] border border-white/75 bg-white/85 p-7 shadow-[0_24px_60px_rgba(31,79,122,0.16)] backdrop-blur-[3px] sm:p-10 md:grid-cols-[1.05fr_0.95fr] lg:p-14 xl:p-16">
          <div>
            <h2 className="text-[clamp(3rem,5.8vw,5.6rem)] font-black leading-[0.92] tracking-tight text-slate-900">
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
                className="rounded-full border border-[#1E8DDE]/40 bg-white/40 px-5 py-2.5 text-sm font-bold text-[#123A5A] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/70 active:scale-95"
              >
                View GitHub
              </a>
            </div>

            <p className="mt-4 max-w-md text-sm font-medium leading-relaxed text-[#123A5A]/70">
              Open for creative collaboration, visual content, UI layouting, and
              AI-assisted web/app projects.
            </p>
          </div>

          <div className="mx-auto w-full max-w-[430px] md:ml-auto">
            <div className="relative overflow-hidden rounded-[26px] border border-white/70 bg-white/70 p-5 shadow-[0_24px_70px_rgba(30,141,222,0.16)] backdrop-blur-md transition-all duration-300 hover:shadow-[0_28px_80px_rgba(30,141,222,0.22)] sm:p-6">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-blue-100/20" />
              <div className="relative z-10">
                <p className="mb-5 text-center text-lg font-extrabold tracking-tight text-[#173d61] md:text-left">
                  Contact me on :
                </p>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {contactData.map((contact, index) => (
                    <ContactIcon
                      key={contact.label}
                      contact={contact}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
