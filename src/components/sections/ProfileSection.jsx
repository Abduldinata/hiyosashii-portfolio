"use client";

import React, { useState } from "react";

export default function ProfileSection() {
  const [mode, setMode] = useState("student");
  const isStudent = mode === "student";

  return (
    <section
      id="profile"
      className={`relative min-h-[calc(100vh-88px)] overflow-hidden ${
        isStudent ? "bg-[#f1f2f2]" : "bg-[#1E8DDE]"
      }`}
    >
      {/* Layer 1: Base background */}

      {/* Layer 2: Shape overlay */}
      <img
        src={
          isStudent
            ? "/assets/profile/shape-student.png"
            : "/assets/profile/shape-creator.png"
        }
        alt=""
        className="pointer-events-none absolute inset-0 z-[2] h-full w-full object-cover opacity-50"
      />

      {/* Layer 3: Right diagonal panel */}
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 z-[3] ${
          isStudent ? "bg-[#1E8DDE]" : "bg-[#f1f2f2]"
        }`}
        style={{
          width: "43%",
          clipPath: "polygon(28% 0, 100% 0, 100% 100%, 0 100%)",
        }}
      />

      {/* Layer 4: Paper texture */}
      <div
        className="pointer-events-none absolute inset-0 z-[4] opacity-80"
        style={{
          backgroundImage: "url('/assets/textures/papper.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Layer 5: Main content */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-88px)] max-w-7xl items-center px-8 py-12 lg:px-12">
        <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_430px]">
          {/* Left content */}
          <div className="max-w-[760px] pt-2 lg:pl-8">
            <h1
              className={`font-black uppercase tracking-[-0.055em] ${
                isStudent ? "text-[#2D8FE3]" : "text-white"
              }`}
              style={{
                fontSize: "clamp(3.2rem, 5.2vw, 5.4rem)",
                lineHeight: 0.9,
              }}
            >
              ABDUL AZIZ DINATA
            </h1>

            <p
              className={`mt-7 max-w-[720px] font-medium leading-[1.18] ${
                isStudent ? "text-[#1F6FAE]" : "text-white"
              }`}
              style={{
                fontSize: "clamp(1.1rem, 1.6vw, 1.55rem)",
              }}
            >
              {isStudent
                ? "Saya adalah seorang mahasiswa teknologi rekayasa perangkat lunak yang tertarik pada dunia IT dengan minat menjadi developer mandiri / bekerja secara team fokus terhadap pengembangan App Mobile atau Web Service."
                : "Saya adalah seorang creator digital yang suka mengedit music video (MV), berfokus pada animasi level cutting, transisi, VFX, dan 3D untuk hiburan, side job editing, serta desain grafis."}
            </p>

            {/* Button + thumbnail */}
            <div className="mt-9 flex flex-wrap items-center gap-8">
              <a
                href="#skills"
                className={`inline-flex items-center justify-center rounded-full border-2 px-10 py-4 text-sm font-bold uppercase tracking-[0.22em] transition-transform duration-300 hover:scale-105 ${
                  isStudent
                    ? "border-[#2D8FE3] text-[#2D8FE3] hover:bg-[#2D8FE3] hover:text-white"
                    : "border-white text-white hover:bg-white hover:text-[#1E8DDE]"
                }`}
              >
                VIEW DETAILS
              </a>
            </div>

            <div
              className={`mt-10 flex flex-wrap gap-x-5 gap-y-2 font-black uppercase tracking-[-0.035em] ${
                isStudent ? "text-black" : "text-white"
              }`}
            >
              <span
                style={{
                  fontSize: "clamp(1.65rem, 2.65vw, 2.55rem)",
                }}
              >
                ABOUT ME AS
              </span>
              <span
                className={isStudent ? "text-[#2D8FE3]" : "text-cyan-300"}
                style={{
                  fontSize: "clamp(1.65rem, 2.65vw, 2.55rem)",
                }}
              >
                {isStudent ? "MAHASISWA" : "CONTENT CREATOR"}
              </span>
            </div>
          </div>

          {/* Right visual */}
          <div className="relative flex justify-center lg:translate-x-0 lg:justify-end lg:pr-5">
            <div
              className="relative flex items-center justify-center overflow-hidden rounded-full border-[5px] border-white bg-[#222831] shadow-2xl"
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
                className="h-full w-full object-cover object-center"
              />
            </div>

            <button
              type="button"
              onClick={() => setMode(isStudent ? "creator" : "student")}
              className={`absolute bottom-4 right-9 flex h-12 w-12 items-center justify-center rounded-full border-2 text-2xl font-bold shadow-lg transition-transform duration-300 hover:scale-110 hover:rotate-180 ${
                isStudent
                  ? "border-[#2D8FE3] bg-white/90 text-[#2D8FE3]"
                  : "border-white bg-[#1E8DDE]/90 text-white"
              }`}
              aria-label="Switch profile mode"
            >
              ↻
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
