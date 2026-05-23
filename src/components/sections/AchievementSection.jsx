import React from "react";

const filters = ["All", "Certificate", "Experience", "Event"];

const milestones = [
  {
    year: "2025",
    title: "KKN Desa Banyusri",
    category: "Experience",
    description:
      "Melaksanakan KKN dan membantu digitalisasi desa melalui website profil desa serta sistem pengaduan masyarakat.",
  },
  {
    year: "2025",
    title: "Web Desa Project",
    category: "Experience",
    description:
      "Membuat website desa berbasis HTML, CSS, JavaScript, dan deployment untuk kebutuhan informasi desa.",
  },
  {
    year: "2024",
    title: "Creative Editing Journey",
    category: "Experience",
    description:
      "Mengembangkan skill video editing, motion graphic, AMV, dan desain menggunakan After Effects, Alight Motion, CapCut, dan Photoshop.",
  },
];

export default function AchievementSection() {
  const selectedMilestone = milestones[0];

  return (
    <section
      id="achievement"
      className="relative flex min-h-[calc(100vh-88px)] w-full items-center justify-center overflow-hidden px-4 py-14 text-slate-900 sm:px-6 lg:px-8"
    >
      {/* Background image */}
      <img
        src="/assets/backgrounds/bg-achievement.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />

      {/* Readability overlay */}
      <div className="absolute inset-0 z-[1] bg-white/10 pointer-events-none" />

      {/* Top fade from Portfolio */}
      <div className="absolute left-0 right-0 top-0 z-[2] h-[110px] bg-gradient-to-b from-[#e7edf2] to-transparent pointer-events-none" />

      {/* Bottom fade to Contact */}
      <div className="absolute bottom-0 left-0 right-0 z-[2] h-[105px] bg-gradient-to-b from-transparent to-[#e7edf2] pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px]">
        <div className="mb-7 text-center">
          <div className="mb-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {filters.map((filter) => {
              const isActive = filter === "All";

              return (
                <button
                  key={filter}
                  type="button"
                  className={`rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] transition-colors sm:text-xs ${
                    isActive
                      ? "bg-[#1f4f7a] text-white shadow-[0_8px_22px_rgba(31,79,122,0.18)]"
                      : "bg-white/55 text-[#1f4f7a] ring-1 ring-white/60 hover:bg-white/75"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-[#173d61] md:text-4xl">
            Achievements
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm font-medium leading-relaxed text-slate-600 md:text-base">
            Jejak pengalaman, proyek, dan perkembangan skill yang membentuk
            perjalanan akademik serta kreatif saya.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-[1.12fr_0.88fr] lg:gap-7">
          <div className="rounded-[28px] border border-white/70 bg-white/58 p-5 shadow-[0_18px_45px_rgba(31,79,122,0.14)] backdrop-blur-[2px] sm:p-6">
            <div className="relative space-y-5 pl-7">
              <div className="absolute bottom-2 left-[9px] top-2 w-px bg-[#8fb6d1]/70" />

              {milestones.map((milestone) => (
                <article
                  key={`${milestone.year}-${milestone.title}`}
                  className="relative"
                >
                  <div className="absolute -left-[28px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-[0_6px_16px_rgba(31,79,122,0.18)] ring-1 ring-[#cfe1ed]">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#1f4f7a]" />
                  </div>

                  <div className="rounded-[22px] border border-white/65 bg-white/55 p-4 shadow-[0_10px_24px_rgba(31,79,122,0.08)]">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="text-sm font-extrabold tracking-wide text-[#1f4f7a]">
                        {milestone.year}
                      </span>
                      <span className="rounded-full bg-[#e8f2f8] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#1f4f7a] ring-1 ring-white/80">
                        {milestone.category}
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold tracking-tight text-[#173d61] sm:text-lg">
                      {milestone.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                      {milestone.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-[28px] border border-white/75 bg-white/68 p-5 shadow-[0_18px_45px_rgba(31,79,122,0.14)] backdrop-blur-[2px] sm:p-6">
            <div className="flex h-full min-h-[300px] flex-col justify-between rounded-[24px] border border-white/75 bg-[#f8fbff]/80 p-5 shadow-inner">
              <div>
                <span className="inline-flex rounded-full bg-[#1f4f7a] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_8px_20px_rgba(31,79,122,0.16)]">
                  Achievement Preview
                </span>

                <div className="mt-6 rounded-[22px] bg-gradient-to-br from-[#eef7ff] via-white to-[#d8eaf6] p-4 shadow-[0_12px_28px_rgba(31,79,122,0.12)] ring-1 ring-white/80">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6d8798]">
                    Selected milestone
                  </p>
                  <h3 className="mt-2 text-xl font-extrabold tracking-tight text-[#173d61]">
                    {selectedMilestone.title}
                  </h3>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-white/75 px-3 py-1 text-xs font-extrabold text-[#1f4f7a] ring-1 ring-[#d7e5ef]">
                      {selectedMilestone.year}
                    </span>
                    <span className="rounded-full bg-white/75 px-3 py-1 text-xs font-extrabold text-[#1f4f7a] ring-1 ring-[#d7e5ef]">
                      {selectedMilestone.category}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">
                    {selectedMilestone.description}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="mt-5 inline-flex w-fit items-center rounded-full bg-[#1f4f7a] px-4 py-2 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(31,79,122,0.18)] transition-transform hover:-translate-y-0.5"
              >
                View Detail <span className="ml-1">→</span>
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
