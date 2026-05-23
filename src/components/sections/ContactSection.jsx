"use client";

import React from "react";

const contactLinks = [
  {
    name: "Gmail",
    short: "GM",
    href: "mailto:",
    icon: "/assets/icons/gmail.png",
  },
  { name: "GitHub", short: "GH", href: "#", icon: "/assets/icons/github.jpeg" },
  {
    name: "Instagram",
    short: "IG",
    href: "#",
    icon: "/assets/icons/instagram.png",
  },
  {
    name: "WhatsApp",
    short: "WA",
    href: "#",
    icon: "/assets/icons/whatsapp.png",
  },
  {
    name: "Telegram",
    short: "TG",
    href: "#",
    icon: "/assets/icons/telegram.png",
  },
  {
    name: "Discord",
    short: "DC",
    href: "#",
    icon: "/assets/icons/discord.png",
  },
  {
    name: "Messenger",
    short: "MS",
    href: "#",
    icon: "/assets/icons/messenger.png",
  },
  {
    name: "Facebook",
    short: "FB",
    href: "#",
    icon: "/assets/icons/facebook.png",
  },
];

const badges = ["Editing", "Design", "Web/App", "Collaboration"];

function ContactIcon({ contact }) {
  return (
    <a
      href={contact.href}
      title={contact.name}
      aria-label={contact.name}
      className="group flex flex-col items-center gap-2"
    >
      <span className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-white/80 bg-white text-sm font-extrabold text-[#1f4f7a] shadow-[0_12px_26px_rgba(31,79,122,0.14)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-[1.03] sm:h-[68px] sm:w-[68px]">
        <span>{contact.short}</span>
        {contact.icon ? (
          <img
            src={contact.icon}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-contain p-3"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        ) : null}
      </span>
      <span className="text-[11px] font-bold text-slate-600 sm:text-xs">
        {contact.name}
      </span>
    </a>
  );
}

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative flex min-h-[calc(100vh-88px)] w-full items-center justify-center overflow-hidden px-4 py-14 text-slate-900 sm:px-6 lg:px-8"
    >
      {/* Background image */}
      <img
        src="/assets/backgrounds/bg-contact.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />

      {/* Readability overlay */}
      <div className="absolute inset-0 z-[1] bg-white/10 pointer-events-none" />

      {/* Top fade from Achievement */}
      <div className="absolute left-0 right-0 top-0 z-[2] h-[110px] bg-gradient-to-b from-[#e7edf2] to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-[1160px]">
        <div className="grid min-h-[420px] grid-cols-1 items-center gap-10 rounded-[28px] border border-white/75 bg-white/85 p-7 shadow-[0_24px_60px_rgba(31,79,122,0.16)] backdrop-blur-[3px] sm:p-10 md:grid-cols-[1.05fr_0.95fr] lg:p-14 xl:p-16">
          <div>
            <h2 className="text-[clamp(3rem,5.8vw,5.6rem)] font-black leading-[0.92] tracking-tight text-slate-900">
              Let&rsquo;s work
              <br />
              <span className="text-[#1E8DDE]">together.</span>
            </h2>

            <p className="mt-6 max-w-md text-lg font-medium leading-relaxed text-slate-700 sm:text-xl md:text-[1.3rem]">
              Available for editing, design,
              <br className="hidden sm:block" />
              web/app project, and
              <br className="hidden sm:block" />
              collaboration.
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full bg-[#e8f2f8] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#1f4f7a] ring-1 ring-white/80 sm:text-xs"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className="mx-auto w-full max-w-[430px] md:ml-auto">
            <div className="rounded-[26px] border border-white/75 bg-[#f8fbff]/75 p-5 shadow-inner sm:p-6">
              <p className="mb-5 text-center text-lg font-extrabold tracking-tight text-[#173d61] md:text-left">
                Contact me on :
              </p>

              <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
                {contactLinks.map((contact) => (
                  <ContactIcon key={contact.name} contact={contact} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
