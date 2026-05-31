"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { achievementData } from "@/data/achievementData";

const sectionTitleMotion = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const itemMotion = {
  hidden: { opacity: 0.9, y: 16, scale: 0.992, filter: "blur(1.5px)" },
  visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
};

const filters = [
  { label: "All", value: "all" },
  { label: "Experience", value: "experience" },
  { label: "Project", value: "project" },
  { label: "Certificate", value: "certificate" },
  { label: "Workshop", value: "workshop" },
  { label: "Seminar", value: "seminar" },
];

const primaryActionClass =
  "group inline-flex items-center justify-center rounded-full bg-[#185987] px-6 py-3 text-sm font-black tracking-wide text-white shadow-[0_14px_34px_rgba(24,89,135,0.22)] transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.035] hover:bg-[#1E8DDE] hover:shadow-[0_20px_48px_rgba(30,141,222,0.34)] active:translate-y-0 active:scale-95";

const secondaryActionClass =
  "group inline-flex items-center justify-center rounded-full border border-[#BFD8EA] bg-white/75 px-5 py-3 text-sm font-black tracking-wide text-[#185987] shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.035] hover:border-[#1E8DDE] hover:bg-[#1E8DDE] hover:text-white hover:shadow-[0_16px_38px_rgba(30,141,222,0.26)] active:translate-y-0 active:scale-95";

const arrowClass =
  "ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1";

function getDisplayPeriod(item) {
  return item?.period && item.period !== item.year ? item.period : item?.year;
}

function getAchievementDocuments(item) {
  if (Array.isArray(item?.documents)) return item.documents.filter(Boolean);
  if (item?.certificateUrl) {
    return [{ label: "Lihat Sertifikat", url: item.certificateUrl }];
  }
  return [];
}

function normalizeText(value) {
  return value
    ?.toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function textMatchesSlug(text, slug) {
  const normalizedText = normalizeText(text);
  const slugTokens = normalizeText(slug)?.split(" ").filter(Boolean) ?? [];

  return (
    slugTokens.length > 0 &&
    slugTokens.every((token) => normalizedText.includes(token))
  );
}

function addPortfolioHighlight(card) {
  card.classList.add("portfolio-card-highlight");
  window.setTimeout(() => {
    card.classList.remove("portfolio-card-highlight");
  }, 2500);
}

function AchievementFallback() {
  return (
    <div className="flex h-full min-h-[240px] items-center justify-center rounded-[24px] border border-dashed border-[#BFD8EA] bg-gradient-to-br from-[#eef7ff] via-white to-[#d8eaf6] p-5 text-center shadow-[0_14px_28px_rgba(31,79,122,0.13)] ring-1 ring-white/80">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6d8798]">
        Preview Belum Tersedia
      </p>
    </div>
  );
}

function SafeAchievementImage({ item, className }) {
  const [currentSrc, setCurrentSrc] = useState(item?.thumbnail);
  const [imageError, setImageError] = useState(false);

  if (!currentSrc || imageError) {
    return <AchievementFallback />;
  }

  return (
    <img
      key={currentSrc}
      src={currentSrc}
      alt={item.title}
      className={className}
      onError={() => {
        if (item.fallbackThumbnail && currentSrc !== item.fallbackThumbnail) {
          setCurrentSrc(item.fallbackThumbnail);
          return;
        }

        setImageError(true);
      }}
    />
  );
}

export default function AchievementSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedId, setSelectedId] = useState(achievementData[0]?.id);

  const filteredAchievements = useMemo(() => {
    if (activeCategory === "all") return achievementData;
    return achievementData.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const selectedAchievement =
    filteredAchievements.find((item) => item.id === selectedId) ||
    filteredAchievements[0] ||
    achievementData[0];
  const selectedDisplayPeriod = getDisplayPeriod(selectedAchievement);
  const selectedDocuments = getAchievementDocuments(selectedAchievement);

  const handleFilterChange = (filterValue) => {
    setActiveCategory(filterValue);
    const nextItem =
      filterValue === "all"
        ? achievementData[0]
        : achievementData.find((item) => item.category === filterValue);
    setSelectedId(nextItem?.id);
  };

  const handlePortfolioFocus = (slug) => {
    const portfolioSection = document.getElementById("portfolio");
    if (!portfolioSection) return;

    portfolioSection.scrollIntoView({ behavior: "smooth", block: "start" });

    window.setTimeout(() => {
      const cards = Array.from(
        portfolioSection.querySelectorAll("article, [data-portfolio-slug]"),
      );
      const matchingCard = cards.find((card) =>
        textMatchesSlug(card.textContent, slug),
      );

      if (matchingCard) {
        matchingCard.scrollIntoView({ behavior: "smooth", block: "center" });
        addPortfolioHighlight(matchingCard);
      }
    }, 650);
  };

  return (
    <section
      id="achievement"
      className="hiyo-section-surface relative flex min-h-screen w-full scroll-mt-24 items-center justify-center overflow-visible bg-transparent px-4 py-24 text-slate-900 sm:px-6 lg:px-8"
    >
      <style jsx global>{`
        .portfolio-card-highlight {
          border-color: rgba(30, 141, 222, 0.9) !important;
          box-shadow:
            0 0 0 3px rgba(30, 141, 222, 0.18),
            0 24px 60px rgba(30, 141, 222, 0.3) !important;
          transform: scale(1.025);
          transition:
            border-color 280ms ease,
            box-shadow 280ms ease,
            transform 280ms ease;
        }
      `}</style>

      <div className="relative z-10 mx-auto w-full max-w-[1200px]">
        <motion.div
          variants={sectionTitleMotion}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.22, margin: "-8% 0px -8% 0px" }}
          transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          className="mb-7 text-center"
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-[#173d61] md:text-4xl">
            Experience & Certificates
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm font-medium leading-relaxed text-slate-600 md:text-base">
            Jejak pengalaman, project, sertifikat, workshop, dan perkembangan
            skill yang membentuk perjalanan kreatif dan akademik saya.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {filters.map((filter) => {
              const isActive = filter.value === activeCategory;

              return (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => handleFilterChange(filter.value)}
                  className={`rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.04] hover:bg-[#1E8DDE] hover:text-white active:scale-95 sm:text-xs ${
                    isActive
                      ? "bg-[#1f4f7a] text-white shadow-[0_8px_22px_rgba(31,79,122,0.2)]"
                      : "bg-white/60 text-[#1f4f7a] ring-1 ring-white/70"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          key={activeCategory}
          initial={{ opacity: 0.9, y: 16, scale: 0.992, filter: "blur(1.5px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.14, margin: "-6% 0px -6% 0px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-7"
        >
          <div className="rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-[0_18px_45px_rgba(31,79,122,0.13)] backdrop-blur-[3px] sm:p-6">
            <div className="relative space-y-4 pl-7">
              <div className="absolute bottom-2 left-[9px] top-2 w-px bg-[#8fb6d1]/70" />

              {filteredAchievements.length > 0 ? (
                filteredAchievements.map((item, index) => {
                  const isSelected = item.id === selectedAchievement?.id;
                  const shouldShowPeriod =
                    item.period && item.period !== item.year;

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
                      whileHover={{ y: -5, scale: 1.006 }}
                      whileTap={{ scale: 0.985 }}
                      className="relative"
                    >
                      <div className="absolute -left-[28px] top-4 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-[0_6px_16px_rgba(31,79,122,0.18)] ring-1 ring-[#cfe1ed]">
                        <span
                          className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
                            isSelected ? "bg-[#1E8DDE]" : "bg-[#8fb6d1]"
                          }`}
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedId(item.id)}
                        className={`group block w-full rounded-[28px] border p-4 text-left shadow-[0_18px_45px_rgba(31,79,122,0.09)] transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01] hover:border-[#1E8DDE]/50 hover:bg-white/90 hover:shadow-[0_18px_46px_rgba(30,141,222,0.16)] ${
                          isSelected
                            ? "border-[#BFD8EA] bg-white/95 ring-2 ring-[#d8eaf6]"
                            : "border-white/70 bg-white/80"
                        }`}
                      >
                        <div className="flex gap-4">
                          <div className="hidden h-24 w-28 shrink-0 overflow-hidden rounded-[20px] bg-[#eef7fc] shadow-[0_10px_24px_rgba(31,79,122,0.1)] sm:block">
                            <SafeAchievementImage
                              item={item}
                              className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="mb-2 flex flex-wrap items-center gap-2">
                              <span className="text-sm font-extrabold tracking-wide text-[#1f4f7a]">
                                {item.year}
                              </span>
                              <span className="rounded-full bg-[#e8f2f8] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#1f4f7a] ring-1 ring-white/80">
                                {item.type}
                              </span>
                            </div>
                            <h3 className="text-base font-extrabold tracking-tight text-[#173d61] sm:text-lg">
                              {item.title}
                            </h3>
                            <p className="mt-1 text-sm font-bold text-[#1f4f7a]">
                              {item.organization}
                            </p>
                            {shouldShowPeriod && (
                              <p className="mt-0.5 text-xs font-bold text-slate-500">
                                {item.period}
                              </p>
                            )}
                            <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-slate-600">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    </motion.article>
                  );
                })
              ) : (
                <p className="rounded-[28px] border border-white/70 bg-white/75 px-5 py-8 text-center text-sm font-bold text-[#1f4f7a] shadow-[0_18px_45px_rgba(31,79,122,0.1)]">
                  Belum ada data untuk kategori ini.
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
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -5, scale: 1.006 }}
            className="rounded-[28px] border border-white/70 bg-white/85 p-4 shadow-[0_18px_45px_rgba(31,79,122,0.13)] backdrop-blur-[3px] transition-all duration-300 ease-out hover:shadow-[0_24px_60px_rgba(30,141,222,0.16)] sm:p-5 lg:sticky lg:top-24"
          >
            <div className="overflow-hidden rounded-[24px] border border-[#D7EAF5] bg-white/70 shadow-[0_18px_50px_rgba(31,79,122,0.08)]">
              <div className="h-[240px] bg-[#eef7fc] sm:h-[320px] lg:h-[360px]">
                <SafeAchievementImage
                  item={selectedAchievement}
                  className="h-full w-full bg-[#f8fbff] object-cover transition-transform duration-300 ease-out"
                />
              </div>

              <div className="p-5 md:p-6">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex rounded-full bg-[#E8F4FB] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[#185987] ring-1 ring-white/80">
                    {selectedAchievement.type}
                  </span>
                  <span className="rounded-full border border-[#D7EAF5] bg-white/80 px-3 py-1.5 text-[10px] font-black tracking-[0.18em] text-[#185987]">
                    {selectedDisplayPeriod}
                  </span>
                </div>

                <h3 className="mt-4 text-2xl font-black leading-tight tracking-tight text-[#123A5A] md:text-3xl">
                  {selectedAchievement.title}
                </h3>
                <p className="mt-2 text-[11px] font-black uppercase leading-snug tracking-[0.2em] text-[#5F7FA0] md:text-xs">
                  {selectedAchievement.organization}
                </p>

                <p className="mt-5 text-sm leading-7 text-[#263B53] md:text-[15px]">
                  {selectedAchievement.description}
                </p>

                {selectedAchievement.tools?.length > 0 && (
                  <div className="mt-5">
                    <h4 className="text-[11px] font-black uppercase tracking-[0.18em] text-[#185987]">
                      Tools & Fokus
                    </h4>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedAchievement.tools.map((tool) => (
                        <span
                          key={tool}
                          className="rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-600 ring-1 ring-[#d7e5ef]"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6 flex flex-wrap gap-3">
                  {selectedAchievement.relatedPortfolioSlug && (
                    <button
                      type="button"
                      onClick={() =>
                        handlePortfolioFocus(
                          selectedAchievement.relatedPortfolioSlug,
                        )
                      }
                      className={primaryActionClass}
                    >
                      Lihat Portfolio
                      <span className={arrowClass}>→</span>
                    </button>
                  )}

                  {selectedDocuments.map((document) => (
                    <a
                      key={`${selectedAchievement.id}-${document.url}`}
                      href={document.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={secondaryActionClass}
                    >
                      {document.label || "Lihat Sertifikat"}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      </div>
    </section>
  );
}
