"use client";

import React, {
  useMemo,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { motion } from "framer-motion";
import { achievementData } from "@/data/achievementData";

const sectionTitleMotion = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.48,
      ease: [0.22, 1, 0.36, 1],
      filter: { duration: 0.08 },
    },
  },
};

const itemMotion = {
  hidden: { opacity: 0, y: 16, scale: 0.94, filter: "blur(1px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.38,
      ease: [0.22, 1, 0.36, 1],
      filter: { duration: 0.08 },
    },
  },
};

const filters = [
  { label: "All", value: "all" },
  { label: "Experience", value: "experience" },
  { label: "Project", value: "project" },
  { label: "Certificate", value: "certificate" },
  { label: "Workshop", value: "workshop" },
  { label: "Seminar", value: "seminar" },
];

const secondaryActionClass =
  "font-ui group inline-flex items-center justify-center rounded-full border border-[#BFD8EA] bg-white/90 px-5 py-3 text-sm font-black tracking-wide text-[#1a567a] shadow-sm dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-gray-300 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.035] hover:border-[#1E8DDE] hover:bg-[#1E8DDE] dark:hover:bg-[#3b9eff] hover:text-white hover:shadow-[0_16px_38px_rgba(30,141,222,0.26)] active:translate-y-0 active:scale-95";

function getDocuments(item) {
  if (Array.isArray(item?.documents)) return item.documents.filter(Boolean);
  if (item?.certificateUrl)
    return [{ label: "Lihat Sertifikat", url: item.certificateUrl }];
  return [];
}

function SafeImage({ item, className = "" }) {
  const src = item?.image || item?.thumbnail || "";
  const [errored, setErrored] = useState(false);
  if (!src || errored) return null;
  return (
    <img
      src={src}
      alt={item?.title || ""}
      className={className}
      loading="lazy"
      onError={() => setErrored(true)}
    />
  );
}

export default function AchievementSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [expandedId, setExpandedId] = useState(null);

  const filtered = useMemo(() => {
    const data =
      activeCategory === "all"
        ? achievementData
        : achievementData.filter((i) => i.category === activeCategory);
    return [...data].sort((a, b) => (b.year || "").localeCompare(a.year || ""));
  }, [activeCategory]);

  // Group by year
  const groups = useMemo(() => {
    const map = {};
    filtered.forEach((item) => {
      const y = item.year || "Lainnya";
      if (!map[y]) map[y] = [];
      map[y].push(item);
    });
    return Object.entries(map).sort(([a], [b]) => b.localeCompare(a));
  }, [filtered]);

  // Auto-switch to grid when items per year are few
  useEffect(() => {
    const maxPerYear = Math.max(...groups.map(([, items]) => items.length), 0);
    if (maxPerYear <= 3) setViewMode("grid");
  }, [groups]);

  const handlePortfolioFocus = useCallback((slug) => {
    document.querySelectorAll(".portfolio-card-highlight").forEach((el) => {
      el.classList.remove("portfolio-card-highlight");
    });
    const section = document.getElementById("portfolio");
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    if (!slug) return;
    // Poll until scroll settles, then locate card
    const waitForScroll = () => {
      const card = document.querySelector(`[data-portfolio-slug="${slug}"]`);
      if (card) {
        card.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
        card.classList.add("portfolio-card-highlight");
        setTimeout(
          () => card.classList.remove("portfolio-card-highlight"),
          3000,
        );
      } else {
        requestAnimationFrame(waitForScroll);
      }
    };
    requestAnimationFrame(waitForScroll);
  }, []);

  return (
    <section
      id="achievement"
      className="hiyo-section-surface relative flex min-h-screen w-full scroll-mt-24 items-center justify-center overflow-visible bg-transparent px-4 py-24 text-slate-900 dark:text-white sm:px-6 lg:px-8"
    >
      <style>{`.portfolio-card-highlight { box-shadow: 0 0 0 2px rgba(30,141,222,0.35), 0 8px 24px rgba(30,141,222,0.1) !important; transition: box-shadow 280ms ease; }`}</style>
      <div className="relative z-10 mx-auto w-full max-w-[1200px]">
        <motion.div
          variants={sectionTitleMotion}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.08, margin: "0px 0px 40% 0px" }}
          className="mb-8 flex flex-col items-center text-center"
        >
          <h2 className="font-ui text-3xl font-extrabold tracking-tight text-[#0f3b5e] dark:text-white/90 md:text-4xl">
            Experience & Certificates
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm font-medium leading-relaxed text-slate-600 dark:text-gray-400 md:text-base">
            Jejak pengalaman, project, sertifikat, workshop, dan perkembangan
            skill.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {filters.map((f) => {
              const active = f.value === activeCategory;
              return (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setActiveCategory(f.value)}
                  className={`font-ui rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:scale-[1.04] active:scale-95 sm:text-xs ${
                    active
                      ? "border border-transparent bg-[#1E8DDE] text-white shadow-[0_8px_22px_rgba(30,141,222,0.3)] dark:bg-[#3b9eff] dark:shadow-[0_8px_22px_rgba(59,158,255,0.3)]"
                      : "border border-white/60 bg-white/50 text-[#1a567a] shadow-sm hover:bg-white/80 dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-gray-300 dark:hover:bg-white/10"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Toggle Timeline / Grid */}
        {groups.reduce((sum, [, items]) => sum + items.length, 0) > 6 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex rounded-full border border-white/40 bg-white/50 p-1 shadow-sm backdrop-blur-md dark:border-white/[0.08] dark:bg-[#0b1425]/60">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] rounded-full backdrop-blur-sm transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-[#1E8DDE] text-white shadow-[0_4px_12px_rgba(30,141,222,0.25)] dark:bg-[#5DC3F5] dark:text-[#0a1e30]"
                    : "text-[#0f3b5e]/60 dark:text-gray-400 hover:text-[#0f3b5e] dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5"
                }`}
              >
                Grid View
              </button>
              <button
                onClick={() => setViewMode("timeline")}
                className={`px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] rounded-full backdrop-blur-sm transition-all duration-300 ${
                  viewMode === "timeline"
                    ? "bg-[#1E8DDE] text-white shadow-[0_4px_12px_rgba(30,141,222,0.25)] dark:bg-[#5DC3F5] dark:text-[#0a1e30]"
                    : "text-[#0f3b5e]/60 dark:text-gray-400 hover:text-[#0f3b5e] dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5"
                }`}
              >
                Timeline
              </button>
            </div>
          </motion.div>
        )}

        {/* ── Content: Grid or Timeline ── */}
        {groups.length > 0 ? (
          viewMode === "timeline" ? (
            /* ══ TIMELINE VIEW ══ */
            <div className="space-y-10">
              {groups.map(([year, items]) => (
                <div key={year}>
                  {/* Year Header */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    className="flex items-center gap-4 mb-6"
                  >
                    <div className="rounded-full border border-white/40 bg-white/40 px-5 py-2 shadow-sm backdrop-blur-md dark:border-white/[0.08] dark:bg-white/[0.05]">
                      <span className="text-xl font-black tracking-widest text-[#1E8DDE] dark:text-[#5DC3F5]">
                        {year}
                      </span>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-[#1E8DDE]/40 to-transparent dark:from-[#5DC3F5]/30" />
                  </motion.div>

                  {/* Timeline items */}
                  <div className="relative pl-8">
                    {/* Vertical line */}
                    <div className="absolute left-[11px] top-2 bottom-2 w-px bg-[#8fb6d1]/50 dark:bg-white/[0.08]" />

                    <div className="space-y-5">
                      {items.map((item, i) => {
                        const docs = getDocuments(item);
                        const hasPeriod =
                          item.period && item.period !== item.year;
                        return (
                          <motion.div
                            key={`tl-${activeCategory}-${item.id}`}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false, amount: 0.15 }}
                            transition={{
                              duration: 0.35,
                              ease: [0.22, 1, 0.36, 1],
                              delay: Math.min(i * 0.05, 0.2),
                            }}
                            whileHover={{ x: 3 }}
                            className="relative"
                          >
                            {/* Dot */}
                            <div className="absolute -left-8 top-1.5 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-white dark:bg-[#0f1a2e] shadow-[0_2px_8px_rgba(31,79,122,0.15)] ring-1 ring-[#cfe1ed] dark:ring-white/[0.05]">
                              <span className="h-2.5 w-2.5 rounded-full bg-[#1E8DDE] dark:bg-[#5DC3F5]" />
                            </div>

                            {/* Card */}
                            <div className="relative overflow-hidden rounded-[20px] border border-white/50 dark:border-white/[0.06] bg-white/80 dark:bg-[#0b1425]/70 p-4 shadow-sm backdrop-blur-sm ring-1 ring-white/30 dark:ring-slate-800/30 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(30,141,222,0.1)]">
                              {/* Decorative elements */}
                              <div className="pointer-events-none absolute -right-8 -top-8 h-16 w-16 rounded-full bg-[#1E8DDE]/5 blur-2xl dark:bg-[#5DC3F5]/3" />
                              <div className="pointer-events-none absolute -bottom-6 -left-6 h-12 w-12 rounded-full bg-white/20 blur-2xl dark:bg-white/5" />
                              <div className="flex flex-wrap gap-2 mb-1.5">
                                <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#1E8DDE] dark:text-[#5DC3F5]">
                                  {item.type}
                                </span>
                                {hasPeriod && (
                                  <span className="text-[10px] font-bold text-slate-500 dark:text-gray-500">
                                    {item.period}
                                  </span>
                                )}
                              </div>
                              <h3 className="text-base font-extrabold tracking-tight text-[#0f3b5e] dark:text-white">
                                {item.title}
                              </h3>
                              {item.organization && (
                                <p className="mt-0.5 text-xs font-bold text-[#1a567a] dark:text-gray-400">
                                  {item.organization}
                                </p>
                              )}
                              {item.description && (
                                <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-gray-400">
                                  {item.description}
                                </p>
                              )}
                              {item.tools?.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-1.5">
                                  {item.tools.map((tool) => (
                                    <span
                                      key={tool}
                                      className="rounded-full border border-white/40 dark:border-white/[0.05] bg-white/50 dark:bg-white/[0.04] px-2.5 py-0.5 text-[9px] font-bold text-[#0f3b5e]/70 dark:text-gray-400"
                                    >
                                      {tool}
                                    </span>
                                  ))}
                                </div>
                              )}
                              <div className="mt-3 flex flex-wrap gap-2">
                                {docs.map((doc) => (
                                  <a
                                    key={doc.url}
                                    href={doc.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 rounded-full border border-[#BFD8EA]/60 dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.04] px-3 py-1 text-[9px] font-bold text-[#1E8DDE] dark:text-[#5DC3F5] transition-all duration-300 hover:bg-[#1E8DDE] hover:text-white dark:hover:bg-[#3b9eff]"
                                  >
                                    {doc.label || "Lihat"}{" "}
                                    <span className="text-[10px]">↗</span>
                                  </a>
                                ))}
                                {item.relatedPortfolioSlug && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handlePortfolioFocus(
                                        item.relatedPortfolioSlug,
                                      )
                                    }
                                    className="inline-flex items-center gap-1 rounded-full border border-[#1E8DDE]/30 dark:border-[#5DC3F5]/30 bg-white/70 dark:bg-white/[0.04] px-3 py-1 text-[9px] font-bold text-[#1E8DDE] dark:text-[#5DC3F5] transition-all duration-300 hover:bg-[#1E8DDE] hover:text-white dark:hover:bg-[#3b9eff]"
                                  >
                                    Lihat Portfolio{" "}
                                    <span className="text-[10px]">→</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* ══ GRID VIEW ══ */
            <div className="space-y-8">
              {groups.map(([year, items]) => (
                <div key={year}>
                  {/* Year Header */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    className="flex items-center gap-4 mb-5"
                  >
                    <div className="rounded-full border border-white/40 bg-white/40 px-5 py-2 shadow-sm backdrop-blur-md dark:border-white/[0.08] dark:bg-white/[0.05]">
                      <span className="text-xl font-black tracking-widest text-[#1E8DDE] dark:text-[#5DC3F5]">
                        {year}
                      </span>
                    </div>
                  </motion.div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((item, i) => {
                      const docs = getDocuments(item);
                      const hasPeriod =
                        item.period && item.period !== item.year;
                      return (
                        <motion.div
                          key={`${activeCategory}-${item.id}`}
                          variants={itemMotion}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{
                            once: false,
                            amount: 0.08,
                            margin: "0px 0px 40% 0px",
                          }}
                          whileHover={{ y: -4, scale: 1.01 }}
                          transition={{
                            duration: 0.42,
                            ease: [0.22, 1, 0.36, 1],
                            delay: Math.min(i * 0.04, 0.2),
                          }}
                          onClick={() =>
                            setExpandedId(
                              expandedId === item.id ? null : item.id,
                            )
                          }
                          className="group relative cursor-pointer overflow-hidden rounded-[24px] border border-white/50 dark:border-white/[0.06] bg-white/80 dark:bg-[#0b1425]/80 p-4 sm:p-5 shadow-sm backdrop-blur-sm ring-1 ring-white/30 dark:ring-slate-800/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(30,141,222,0.12)] dark:hover:shadow-[0_12px_32px_rgba(0,0,0,0.25)] hover:border-[#1E8DDE]/30 dark:hover:border-[#3b9eff]/20"
                        >
                          {/* Decorative elements */}
                          <div className="pointer-events-none absolute -right-10 -top-10 h-20 w-20 rounded-full bg-[#1E8DDE]/6 blur-2xl dark:bg-[#5DC3F5]/4" />
                          <div className="pointer-events-none absolute -bottom-8 -left-8 h-16 w-16 rounded-full bg-white/25 blur-2xl dark:bg-white/5" />
                          {/* Image */}
                          {(item.image || item.thumbnail) && (
                            <div className="mb-3 h-36 w-full overflow-hidden rounded-[16px] bg-[#eef7fc] shadow-[0_4px_12px_rgba(31,79,122,0.06)]">
                              <SafeImage
                                item={item}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                              />
                            </div>
                          )}

                          {/* Badges */}
                          <div className="flex flex-wrap items-center gap-1.5 mb-2">
                            <span className="rounded-full bg-[#e8f2f8] dark:bg-white/[0.06] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#1a567a] dark:text-gray-300">
                              {item.type}
                            </span>
                            <span className="rounded-full border border-white/40 dark:border-white/[0.05] bg-white/50 dark:bg-white/[0.04] px-2.5 py-0.5 text-[9px] font-bold text-[#1E8DDE] dark:text-[#5DC3F5]">
                              {item.category}
                            </span>
                            {hasPeriod && (
                              <span className="text-[9px] font-bold text-slate-500 dark:text-gray-500">
                                {item.period}
                              </span>
                            )}
                          </div>

                          {/* Title */}
                          <h3 className="text-sm font-extrabold tracking-tight text-[#0f3b5e] dark:text-white leading-snug">
                            {item.title}
                          </h3>

                          {/* Org */}
                          {item.organization && (
                            <p className="mt-1 text-xs font-bold text-[#1a567a] dark:text-gray-400">
                              {item.organization}
                            </p>
                          )}

                          {/* Description - expandable */}
                          {item.description && (
                            <div className="mt-2">
                              <p
                                className={`text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-gray-400 ${expandedId === item.id ? "" : "line-clamp-2"}`}
                              >
                                {item.description}
                              </p>
                              {item.description.length > 100 && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setExpandedId(
                                      expandedId === item.id ? null : item.id,
                                    );
                                  }}
                                  className="mt-1 text-[10px] font-bold text-[#1E8DDE] dark:text-[#5DC3F5] hover:opacity-80 transition-opacity"
                                >
                                  {expandedId === item.id
                                    ? "Show less ▲"
                                    : "Read more ▼"}
                                </button>
                              )}
                            </div>
                          )}

                          {/* Tools - show all when expanded, 3 when collapsed */}
                          {item.tools?.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-1">
                              {(expandedId === item.id
                                ? item.tools
                                : item.tools.slice(0, 3)
                              ).map((tool) => (
                                <span
                                  key={tool}
                                  className="rounded-full border border-white/40 dark:border-white/[0.05] bg-white/50 dark:bg-white/[0.04] px-2 py-0.5 text-[9px] font-bold text-[#0f3b5e]/70 dark:text-gray-400"
                                >
                                  {tool}
                                </span>
                              ))}
                              {expandedId !== item.id &&
                                item.tools.length > 3 && (
                                  <span className="text-[9px] font-bold text-[#1E8DDE] dark:text-[#5DC3F5] self-center">
                                    +{item.tools.length - 3}
                                  </span>
                                )}
                            </div>
                          )}

                          {/* Documents */}
                          {docs.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {docs.map((doc) => (
                                <a
                                  key={doc.url}
                                  href={doc.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="inline-flex items-center gap-1 rounded-full border border-[#BFD8EA]/60 dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.04] px-3 py-1 text-[9px] font-bold text-[#1E8DDE] dark:text-[#5DC3F5] transition-all duration-300 hover:bg-[#1E8DDE] hover:text-white dark:hover:bg-[#3b9eff] active:scale-95"
                                >
                                  {doc.label || "Lihat"}
                                  <span className="text-[10px]">↗</span>
                                </a>
                              ))}
                            </div>
                          )}
                          {item.relatedPortfolioSlug && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handlePortfolioFocus(
                                    item.relatedPortfolioSlug,
                                  );
                                }}
                                className="inline-flex items-center gap-1 rounded-full border border-[#1E8DDE]/30 dark:border-[#5DC3F5]/30 bg-white/70 dark:bg-white/[0.04] px-3 py-1 text-[9px] font-bold text-[#1E8DDE] dark:text-[#5DC3F5] transition-all duration-300 hover:bg-[#1E8DDE] hover:text-white dark:hover:bg-[#3b9eff] active:scale-95"
                              >
                                Lihat Portfolio
                                <span className="text-[10px]">→</span>
                              </button>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <motion.p
            variants={itemMotion}
            initial="hidden"
            whileInView="visible"
            className="rounded-[24px] border border-white/50 bg-white/80 px-5 py-8 text-center text-sm font-bold text-[#1a567a] shadow-sm backdrop-blur-sm dark:border-white/[0.06] dark:bg-[#0b1425]/80 dark:text-gray-300"
          >
            Belum ada data untuk kategori ini.
          </motion.p>
        )}
      </div>
    </section>
  );
}
