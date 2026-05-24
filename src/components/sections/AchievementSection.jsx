"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { achievementData } from "@/data/achievementData";

const sectionTitleMotion = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
};

const cardMotion = {
  hidden: {
    opacity: 0.9,
    y: 16,
    scale: 0.992,
    filter: "blur(1.5px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
  },
};

const itemMotion = {
  hidden: {
    opacity: 0.9,
    y: 16,
    scale: 0.992,
    filter: "blur(1.5px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
  },
};

const filters = ["All", "Certificate", "Experience", "Event"];

function getPreviewLabel(item) {
  if (item.category === "Certificate") return "Certificate Preview";
  if (item.category === "Event") return "Event Highlight";
  return "Experience Highlight";
}

function AchievementFallback({ item }) {
  const isCertificate = item.category === "Certificate";

  return (
    <div
      className={`rounded-[24px] bg-gradient-to-br from-[#eef7ff] via-white to-[#d8eaf6] p-5 shadow-[0_12px_28px_rgba(31,79,122,0.12)] ring-1 ring-white/80 ${
        isCertificate ? "border border-dashed border-[#8fb6d1]" : ""
      }`}
    >
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6d8798]">
        {getPreviewLabel(item)}
      </p>
      <h3 className="mt-3 text-xl font-extrabold tracking-tight text-[#173d61]">
        {item.title}
      </h3>
      <div className="mt-4 grid gap-2 text-sm font-semibold text-slate-600">
        {item.issuer && (
          <p>
            <span className="text-[#1f4f7a]">Penyelenggara:</span> {item.issuer}
          </p>
        )}
        {item.date && (
          <p>
            <span className="text-[#1f4f7a]">Tanggal:</span> {item.date}
          </p>
        )}
      </div>
      <p className="mt-5 text-center text-sm font-extrabold uppercase tracking-[0.14em] text-[#1f4f7a]/70">
        Certificate / Experience Preview
      </p>
    </div>
  );
}

export default function AchievementSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedId, setSelectedId] = useState(achievementData[0]?.id);

  const filteredAchievements = useMemo(() => {
    if (activeCategory === "All") return achievementData;
    return achievementData.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const selectedAchievement =
    filteredAchievements.find((item) => item.id === selectedId) ||
    filteredAchievements[0] ||
    achievementData[0];

  const handleFilterChange = (filter) => {
    setActiveCategory(filter);
    const nextItem =
      filter === "All"
        ? achievementData[0]
        : achievementData.find((item) => item.category === filter);
    setSelectedId(nextItem?.id);
  };

  return (
    <section
      id="achievement"
      className="hiyo-section-surface relative flex min-h-screen w-full scroll-mt-24 items-center justify-center overflow-visible bg-transparent px-4 py-24 text-slate-900 sm:px-6 lg:px-8"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1200px]">
        <motion.div
          variants={sectionTitleMotion}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.22, margin: "-8% 0px -8% 0px" }}
          transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          className="mb-7 text-center"
        >
          <div className="mb-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {filters.map((filter) => {
              const isActive = filter === activeCategory;

              return (
                <motion.button
                  key={filter}
                  type="button"
                  onClick={() => handleFilterChange(filter)}
                  whileHover={{ y: -3, scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                  className={`rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] transition-colors sm:text-xs ${
                    isActive
                      ? "bg-[#1f4f7a] text-white shadow-[0_8px_22px_rgba(31,79,122,0.18)]"
                      : "bg-white/55 text-[#1f4f7a] ring-1 ring-white/60 hover:bg-white/75"
                  }`}
                >
                  {filter}
                </motion.button>
              );
            })}
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-[#173d61] md:text-4xl">
            Achievements
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm font-medium leading-relaxed text-slate-600 md:text-base">
            Jejak pengalaman sebagai mahasiswa TRPL, digital creative, editor,
            serta eksplorasi web/app dengan workflow berbantuan AI.
          </p>
        </motion.div>

        <motion.div
          key={activeCategory}
          initial={{ opacity: 0.9, y: 16, scale: 0.992, filter: "blur(1.5px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.14, margin: "-6% 0px -6% 0px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-[1.08fr_0.92fr] lg:gap-7"
        >
          <div className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_18px_45px_rgba(31,79,122,0.14)] backdrop-blur-[3px] sm:p-6">
            <div className="relative space-y-4 pl-7">
              <div className="absolute bottom-2 left-[9px] top-2 w-px bg-[#8fb6d1]/70" />

              {filteredAchievements.length > 0 ? (
                filteredAchievements.map((item, index) => {
                  const isSelected = item.id === selectedAchievement?.id;

                  return (
                    <motion.article
                      key={`${activeCategory}-${item.id}`}
                      variants={itemMotion}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false, amount: 0.16 }}
                      transition={{
                        duration: 0.42,
                        ease: [0.22, 1, 0.36, 1],
                        delay: Math.min(index * 0.03, 0.14),
                      }}
                      whileHover={{ y: -3, scale: 1.004 }}
                      whileTap={{ scale: 0.985 }}
                      className="relative"
                    >
                      <div className="absolute -left-[28px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-[0_6px_16px_rgba(31,79,122,0.18)] ring-1 ring-[#cfe1ed]">
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${
                            isSelected ? "bg-[#1f4f7a]" : "bg-[#8fb6d1]"
                          }`}
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedId(item.id)}
                        className={`block w-full rounded-[22px] border p-4 text-left shadow-[0_10px_24px_rgba(31,79,122,0.08)] transition-colors ${
                          isSelected
                            ? "border-[#9fc3da] bg-white/95 ring-2 ring-[#d8eaf6]"
                            : "border-white/65 bg-white/80 hover:bg-white/90"
                        }`}
                      >
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <span className="text-sm font-extrabold tracking-wide text-[#1f4f7a]">
                            {item.year}
                          </span>
                          <span className="rounded-full bg-[#e8f2f8] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#1f4f7a] ring-1 ring-white/80">
                            {item.category}
                          </span>
                          {item.date && (
                            <span className="text-xs font-bold text-slate-500">
                              {item.date}
                            </span>
                          )}
                        </div>
                        <h3 className="text-base font-extrabold tracking-tight text-[#173d61] sm:text-lg">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-slate-600">
                          {item.description}
                        </p>
                      </button>
                    </motion.article>
                  );
                })
              ) : (
                <p className="rounded-[22px] border border-white/65 bg-white/80 p-4 text-sm font-bold text-[#1f4f7a] shadow-[0_10px_24px_rgba(31,79,122,0.08)]">
                  Belum ada achievement untuk kategori ini.
                </p>
              )}
            </div>
          </div>

          <motion.aside
            key={selectedAchievement?.id || "achievement-preview"}
            initial={{
              opacity: 0.92,
              y: 12,
              scale: 0.994,
              filter: "blur(1.5px)",
            }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.14, margin: "-6% 0px -6% 0px" }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{
              y: -3,
              scale: 1.004,
            }}
            className="rounded-[28px] border border-white/75 bg-white/80 p-5 shadow-[0_18px_45px_rgba(31,79,122,0.14)] backdrop-blur-[3px] sm:p-6"
          >
            <div className="flex h-full min-h-[420px] flex-col justify-between rounded-[24px] border border-white/75 bg-[#f8fbff]/80 p-5 shadow-inner">
              <div>
                <span className="inline-flex rounded-full bg-[#1f4f7a] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_8px_20px_rgba(31,79,122,0.16)]">
                  Achievement Preview
                </span>

                <div className="mt-5">
                  {selectedAchievement?.image ? (
                    <img
                      src={selectedAchievement.image}
                      alt={selectedAchievement.title}
                      className="h-56 w-full rounded-[24px] object-cover shadow-[0_12px_28px_rgba(31,79,122,0.12)] ring-1 ring-white/80"
                    />
                  ) : (
                    <AchievementFallback item={selectedAchievement} />
                  )}
                </div>

                <div className="mt-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#e8f2f8] px-3 py-1 text-xs font-extrabold uppercase tracking-[0.12em] text-[#1f4f7a] ring-1 ring-white/80">
                      {selectedAchievement.category}
                    </span>
                    <span className="rounded-full bg-white/75 px-3 py-1 text-xs font-extrabold text-[#1f4f7a] ring-1 ring-[#d7e5ef]">
                      {selectedAchievement.year}
                    </span>
                    {selectedAchievement.date && (
                      <span className="rounded-full bg-white/75 px-3 py-1 text-xs font-extrabold text-[#1f4f7a] ring-1 ring-[#d7e5ef]">
                        {selectedAchievement.date}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-[#173d61]">
                    {selectedAchievement.title}
                  </h3>
                  {selectedAchievement.issuer && (
                    <p className="mt-2 text-sm font-bold text-[#1f4f7a]">
                      {selectedAchievement.issuer}
                    </p>
                  )}
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">
                    {selectedAchievement.description}
                  </p>
                </div>
              </div>

              {selectedAchievement.links?.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {selectedAchievement.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center rounded-full bg-[#1f4f7a] px-4 py-2 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(31,79,122,0.18)] transition-transform hover:-translate-y-0.5"
                    >
                      {link.label} <span className="ml-1">→</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.aside>
        </motion.div>
      </div>
    </section>
  );
}
