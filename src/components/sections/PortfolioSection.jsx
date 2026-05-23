import React from "react";

const filters = [
  "All",
  "Web/App",
  "Design",
  "Video Editing",
  "3D",
  "Game/Modding",
];

const featuredProjects = [
  {
    title: "Sistem Pengaduan Desa",
    category: "Web/App",
    tools: [
      "HTML",
      "CSS",
      "JavaScript",
      "Node.js",
      "PostgreSQL",
      "Railway",
      "Vercel",
    ],
    description:
      "Web aplikasi untuk membantu digitalisasi pengaduan warga dengan form pengaduan, OTP email, dashboard admin, dan pengelolaan status laporan.",
  },
  {
    title: "Hiyosashii Portfolio Website",
    category: "Design/Web",
    tools: ["Next.js", "Tailwind CSS", "Alight Motion"],
    description:
      "Website portfolio personal dengan konsep dual identity sebagai mahasiswa teknologi dan content creator.",
  },
];

export default function PortfolioSection() {
  return (
    <section
      id="portfolio"
      className="relative flex min-h-[calc(100vh-88px)] w-full items-center justify-center overflow-hidden px-4 py-14 text-slate-900 sm:px-6 lg:px-8"
    >
      {/* Background image */}
      <img
        src="/assets/backgrounds/bg-portfolio.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />

      {/* Readability overlay */}
      <div className="absolute inset-0 z-[1] bg-white/10 pointer-events-none" />

      {/* Top fade from Skills */}
      <div className="absolute left-0 right-0 top-0 z-[2] h-[110px] bg-gradient-to-b from-[#e7edf2] to-transparent pointer-events-none" />

      {/* Bottom fade to Achievement */}
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
            Portfolio
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm font-medium leading-relaxed text-slate-600 md:text-base">
            Kumpulan proyek utama yang menggabungkan sisi teknologi, desain, dan
            identitas kreatif saya.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-7">
          {featuredProjects.map((project, index) => (
            <article
              key={project.title}
              className="group rounded-[28px] border border-white/70 bg-white/58 p-4 shadow-[0_18px_45px_rgba(31,79,122,0.14)] backdrop-blur-[2px] transition-transform duration-300 hover:-translate-y-1 sm:p-5"
            >
              <div className="aspect-video overflow-hidden rounded-[22px] border border-white/80 bg-[#f8fbff] shadow-[0_14px_28px_rgba(31,79,122,0.12)]">
                <div
                  className={`relative flex h-full w-full items-center justify-center overflow-hidden ${
                    index === 0
                      ? "bg-gradient-to-br from-[#e9f5ff] via-[#f8fbff] to-[#b9d6ee]"
                      : "bg-gradient-to-br from-[#f7fbff] via-[#dcecff] to-[#b7cde3]"
                  }`}
                >
                  <div className="absolute -left-10 top-8 h-28 w-28 rounded-full bg-white/65 blur-sm" />
                  <div className="absolute -right-8 bottom-5 h-32 w-32 rounded-full bg-[#7fb1d5]/30 blur-sm" />
                  <div className="absolute inset-x-8 bottom-7 h-16 rounded-2xl bg-white/55 shadow-inner" />
                  <div className="relative w-[72%] rounded-2xl border border-white/75 bg-white/75 p-4 shadow-[0_12px_26px_rgba(31,79,122,0.16)]">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="rounded-full bg-[#1f4f7a] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                        {project.category}
                      </span>
                      <span className="h-2 w-2 rounded-full bg-[#6aa6cf]" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-2.5 w-4/5 rounded-full bg-[#2f6d9b]/35" />
                      <div className="h-2.5 w-3/5 rounded-full bg-[#2f6d9b]/25" />
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        <div className="h-9 rounded-xl bg-[#d7e9f5]" />
                        <div className="h-9 rounded-xl bg-[#c6dfef]" />
                        <div className="h-9 rounded-xl bg-[#e9f3fa]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-1 pt-4">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#e8f2f8] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#1f4f7a] ring-1 ring-white/80">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold tracking-tight text-[#173d61] sm:text-xl">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {project.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full bg-white/70 px-2.5 py-1 text-[11px] font-semibold text-slate-600 ring-1 ring-[#d7e5ef]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  className="mt-4 inline-flex items-center text-sm font-extrabold text-[#1f4f7a] transition-colors group-hover:text-[#163b5e]"
                >
                  View Details{" "}
                  <span className="ml-1 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
