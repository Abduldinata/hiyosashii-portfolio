"use client";

import React from "react";

export default function ProfileSection({ mode = "student", onModeChange }) {
  const isCreator = mode === "creator";
  const isStudent = !isCreator;
  const badges = isStudent
    ? ["TRPL Student", "UI/UX Layouting", "AI-Assisted Dev"]
    : ["Video Editing", "Motion/AMV", "Visual Design"];

  return (
    <section
      id="profile"
      className="relative min-h-[calc(100vh-88px)] overflow-hidden bg-transparent"
    >
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-88px)] max-w-7xl items-center px-8 py-12 lg:px-12">
        <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_430px]">
          {/* Left content */}
          <div className="hiyo-section-reveal max-w-[760px] rounded-[24px] border border-white/30 bg-white/10 p-5 pt-5 backdrop-blur-[1px] transition-all duration-500 ease-out sm:p-6 lg:ml-2 lg:p-7">
            <h1
              className={`font-black uppercase tracking-[-0.055em] sm:whitespace-nowrap ${
                isCreator ? "text-[#123A5A]" : "text-[#2D8FE3]"
              }`}
              style={{
                fontSize: "clamp(2.6rem, 4.1vw, 4.4rem)",
                lineHeight: 0.95,
                textShadow: "0 8px 24px rgba(30, 141, 222, 0.12)",
              }}
            >
              ABDUL AZIZ DINATA
            </h1>

            <p
              className={`mt-7 max-w-[720px] font-medium leading-[1.18] ${
                isStudent ? "text-[#1F6FAE]" : "text-[#123E63]"
              }`}
              style={{
                fontSize: "clamp(1.1rem, 1.6vw, 1.55rem)",
                textShadow: isCreator
                  ? "0 2px 14px rgba(255,255,255,0.28)"
                  : undefined,
              }}
            >
              {isStudent
                ? "Saya adalah mahasiswa TRPL dan digital creative yang fokus pada editing, desain visual, UI/UX, serta eksplorasi pengembangan web/app berbantuan AI. Saya tertarik membuat produk digital yang rapi secara tampilan, mudah digunakan, dan punya identitas visual yang kuat."
                : "Saya juga aktif sebagai content creator dan editor video dengan fokus pada AMV, motion graphic, transisi, VFX ringan, desain konten, dan storytelling visual."}
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-white/50 bg-white/35 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-[#134E7D] backdrop-blur transition-transform duration-200 hover:scale-105"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Button + thumbnail */}
            <div className="mt-9 flex flex-wrap items-center gap-8">
              <a
                href="#skills"
                className={`inline-flex items-center justify-center rounded-full border-2 px-10 py-4 text-sm font-bold uppercase tracking-[0.22em] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(30,141,222,0.24)] active:scale-[0.98] ${
                  isStudent
                    ? "border-[#2D8FE3] text-[#2D8FE3] hover:bg-[#2D8FE3] hover:text-white"
                    : "border-[#123E63] text-[#123E63] hover:bg-white hover:text-[#1E8DDE]"
                }`}
              >
                VIEW DETAILS
              </a>
            </div>

            <div className="mt-10">
              <p
                className={`font-black uppercase tracking-[-0.035em] ${
                  isCreator ? "text-[#123A5A]" : "text-black"
                }`}
                style={{
                  fontSize: "clamp(1.6rem, 2.7vw, 2.8rem)",
                  lineHeight: 1,
                }}
              >
                ABOUT ME AS
              </p>

              <p
                className="mt-2 font-black uppercase tracking-[-0.035em] text-[#2D8FE3]"
                style={{
                  fontSize: "clamp(1.55rem, 2.5vw, 2.6rem)",
                  lineHeight: 1,
                }}
              >
                {isCreator ? "DIGITAL CREATIVE" : "CREATIVE TECH STUDENT"}
              </p>
            </div>
          </div>

          {/* Right visual */}
          <div
            className="hiyo-section-reveal relative flex justify-center lg:translate-x-0 lg:justify-end lg:pr-5"
            style={{ animationDelay: "120ms" }}
          >
            <div
              className="hiyo-hover-card group relative flex cursor-default items-center justify-center overflow-hidden rounded-full border-[5px] border-white bg-[#222831] shadow-2xl"
              style={{
                width: "clamp(252px, 25.2vw, 351px)",
                height: "clamp(252px, 25.2vw, 351px)",
              }}
            >
              <img
                src={
                  isStudent
                    ? "/assets/profile/profile-student.jpg"
                    : "/assets/profile/profile-creator.jpg"
                }
                alt="Abdul Aziz Dinata"
                className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <button
              type="button"
              onClick={() => onModeChange?.(isCreator ? "student" : "creator")}
              className={`absolute bottom-4 right-9 flex h-12 w-12 items-center justify-center rounded-full border-2 text-2xl font-bold shadow-[0_12px_30px_rgba(30,141,222,0.28)] transition-all duration-300 hover:scale-110 hover:rotate-180 active:scale-95 ${
                isStudent
                  ? "border-[#2D8FE3] bg-white/90 text-[#2D8FE3]"
                  : "border-white bg-[#1E8DDE]/90 text-white"
              }`}
              aria-label="Switch profile mode"
              title="Switch profile mode"
            >
              ↻
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
