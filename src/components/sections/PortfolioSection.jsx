"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "../../data/portfolioData";

const sectionTitleMotion = {
  hidden: {
    opacity: 0,
    y: 28,
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
    opacity: 0.88,
    y: 22,
    scale: 0.988,
    filter: "blur(2px)",
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
    opacity: 0.92,
    y: 18,
    scale: 0.992,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
};

const filters = [
  "All",
  "Web",
  "App",
  "Design",
  "Video Editing",
  "Game/Modding",
];

const primaryActionClass =
  "group inline-flex items-center justify-center rounded-full bg-[#185987] px-6 py-3 text-sm font-black tracking-wide text-white shadow-[0_14px_34px_rgba(24,89,135,0.22)] transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.035] hover:bg-[#1E8DDE] hover:shadow-[0_20px_48px_rgba(30,141,222,0.34)] active:translate-y-0 active:scale-95";

const secondaryActionClass =
  "group inline-flex items-center justify-center rounded-full border border-[#BFD8EA] bg-white/75 px-5 py-3 text-sm font-black tracking-wide text-[#185987] shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.035] hover:border-[#1E8DDE] hover:bg-[#1E8DDE] hover:text-white hover:shadow-[0_16px_38px_rgba(30,141,222,0.26)] active:translate-y-0 active:scale-95";

const arrowClass =
  "ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1";

const getCleanLinkLabel = (label) => {
  const normalizedLabel = label?.toLowerCase() ?? "";

  if (normalizedLabel.includes("instagram")) return "Instagram";
  if (normalizedLabel.includes("youtube")) return "YouTube";
  if (normalizedLabel.includes("tiktok")) return "TikTok";
  if (normalizedLabel.includes("github")) return "GitHub";
  if (normalizedLabel.includes("live") || normalizedLabel.includes("demo")) {
    return "Live Demo";
  }

  return label;
};

function CategoryPills({ categories, className = "" }) {
  const visibleCategories = categories?.slice(0, 2) ?? [];

  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {visibleCategories.map((category) => (
        <span
          key={category}
          className="rounded-full bg-[#e8f2f8] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#1f4f7a] ring-1 ring-white/80"
        >
          {category}
        </span>
      ))}
    </div>
  );
}

function FallbackThumbnail({ project, className = "aspect-video" }) {
  return (
    <div
      className={`relative flex overflow-hidden rounded-[20px] bg-gradient-to-br from-[#e9f5ff] via-[#f8fbff] to-[#9fc7e3] shadow-[0_14px_28px_rgba(31,79,122,0.13)] ${className}`}
    >
      <div className="absolute -left-10 top-6 h-28 w-28 rounded-full bg-white/65 blur-sm" />
      <div className="absolute -right-8 bottom-5 h-32 w-32 rounded-full bg-[#6aa6cf]/30 blur-sm" />
      <div className="relative m-auto w-[76%] rounded-2xl border border-white/70 bg-white/70 p-4 shadow-[0_12px_26px_rgba(31,79,122,0.16)] backdrop-blur-sm">
        <span className="inline-flex rounded-full bg-[#1f4f7a] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
          {project.categories?.[0] ?? "Portfolio"}
        </span>
        <p className="mt-3 line-clamp-2 text-base font-extrabold leading-tight text-[#173d61]">
          {project.title}
        </p>
      </div>
    </div>
  );
}

function SafeImage({ src, alt, className, fallback, fallbackSrc, onError }) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [imageError, setImageError] = useState(false);

  if (imageError || !currentSrc) return fallback;

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (fallbackSrc && currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
          return;
        }

        setImageError(true);
        onError?.();
      }}
    />
  );
}

function PortfolioThumbnail({ project, selectedImage, onSelectImage }) {
  const previewImages = project.gallery?.slice(0, 2) ?? [];

  return (
    <div className="relative aspect-video overflow-hidden rounded-[20px] bg-[#f8fbff] shadow-[0_14px_28px_rgba(31,79,122,0.13)]">
      <SafeImage
        key={selectedImage || project.thumbnail}
        src={selectedImage || project.thumbnail}
        fallbackSrc={project.fallbackThumbnail}
        alt={project.title}
        className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
        fallback={
          <FallbackThumbnail project={project} className="h-full w-full" />
        }
      />

      {project.gallery?.length > 1 && (
        <div className="absolute bottom-3 right-3 flex gap-1.5">
          {previewImages.map((image) => {
            const isActive = image === selectedImage;

            return (
              <button
                key={image}
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onSelectImage(image);
                }}
                className={`h-10 w-14 overflow-hidden rounded-xl border-2 object-cover shadow-[0_8px_18px_rgba(15,43,71,0.22)] transition sm:h-11 sm:w-16 ${
                  isActive
                    ? "border-[#1f4f7a] ring-2 ring-white"
                    : "border-white/90 hover:border-[#9fc7e3]"
                }`}
                aria-label={`Show ${project.title} preview`}
              >
                <SafeImage
                  src={image}
                  fallbackSrc={
                    image === project.thumbnail
                      ? project.fallbackThumbnail
                      : null
                  }
                  alt=""
                  className="h-full w-full object-cover"
                  fallback={
                    <div className="h-full w-full bg-gradient-to-br from-[#e9f5ff] to-[#9fc7e3]" />
                  }
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function PortfolioCard({ project, onOpenDetails, index }) {
  const [selectedImage, setSelectedImage] = useState(project.thumbnail);
  const visibleTools = project.tools.slice(0, 4);
  const hiddenToolsCount = project.tools.length - visibleTools.length;
  const visibleExternalLinks = project.links?.filter((link) => link.url) ?? [];
  const hasDetailAction = Boolean(
    project.gallery?.length || project.description,
  );
  const fallbackPrimaryLink = !hasDetailAction
    ? (visibleExternalLinks.find(
        (link) => getCleanLinkLabel(link.label) === "Live Demo",
      ) ??
      visibleExternalLinks.find(
        (link) => getCleanLinkLabel(link.label) === "GitHub",
      ))
    : null;
  const secondaryLinks = fallbackPrimaryLink
    ? visibleExternalLinks.filter(
        (link) => link.url !== fallbackPrimaryLink.url,
      )
    : visibleExternalLinks;

  const handleOpenDetails = () => {
    onOpenDetails(project, selectedImage);
  };

  return (
    <motion.article
      variants={cardMotion}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.14, margin: "-6% 0px -6% 0px" }}
      transition={{
        duration: 0.46,
        ease: [0.22, 1, 0.36, 1],
        delay: Math.min(index * 0.035, 0.16),
      }}
      whileHover={{
        y: -5,
        scale: 1.006,
      }}
      whileTap={{ scale: 0.985 }}
      className="group rounded-[28px] border border-white/70 bg-white/85 p-4 shadow-[0_18px_45px_rgba(31,79,122,0.13)] backdrop-blur-[3px] sm:p-5"
    >
      <PortfolioThumbnail
        project={project}
        selectedImage={selectedImage}
        onSelectImage={setSelectedImage}
      />

      <div className="px-1 pt-4">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <CategoryPills categories={project.categories} />
          <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#3d6f93]">
            {project.year}
          </span>
        </div>

        <h3 className="line-clamp-2 text-lg font-extrabold tracking-tight text-[#173d61] sm:text-xl">
          {project.title}
        </h3>
        {project.role && (
          <p className="mt-1 text-xs font-extrabold uppercase tracking-[0.1em] text-[#1f4f7a]/75">
            {project.role}
          </p>
        )}
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">
          {project.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {visibleTools.map((tool) => (
            <span
              key={tool}
              className="rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-semibold text-slate-600 ring-1 ring-[#d7e5ef]"
            >
              {tool}
            </span>
          ))}
          {hiddenToolsCount > 0 && (
            <span className="rounded-full bg-[#e8f2f8] px-2.5 py-1 text-[11px] font-bold text-[#1f4f7a] ring-1 ring-[#cfe1ed]">
              +{hiddenToolsCount}
            </span>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {hasDetailAction ? (
            <button
              type="button"
              onClick={handleOpenDetails}
              className={primaryActionClass}
            >
              Lihat Detail
              <span className={arrowClass}>→</span>
            </button>
          ) : (
            fallbackPrimaryLink && (
              <a
                href={fallbackPrimaryLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className={primaryActionClass}
              >
                {getCleanLinkLabel(fallbackPrimaryLink.label)}
                <span className={arrowClass}>→</span>
              </a>
            )
          )}

          {secondaryLinks.map((link) => (
            <a
              key={`${project.id}-${link.label}-${link.url}`}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={secondaryActionClass}
            >
              {getCleanLinkLabel(link.label)}
            </a>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function PortfolioModal({
  project,
  activeImageIndex,
  setActiveImageIndex,
  onClose,
}) {
  if (!project) return null;

  const galleryImages = project.gallery?.length
    ? project.gallery
    : project.thumbnail
      ? [project.thumbnail]
      : [];
  const safeActiveIndex =
    galleryImages.length > 0
      ? Math.min(activeImageIndex, galleryImages.length - 1)
      : 0;
  const activeImage = galleryImages[safeActiveIndex];

  const goToPreviousImage = (event) => {
    event?.stopPropagation();

    setActiveImageIndex((current) => {
      if (!galleryImages.length) return 0;
      return current === 0 ? galleryImages.length - 1 : current - 1;
    });
  };

  const goToNextImage = (event) => {
    event?.stopPropagation();

    setActiveImageIndex((current) => {
      if (!galleryImages.length) return 0;
      return current === galleryImages.length - 1 ? 0 : current + 1;
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 px-4 py-6 backdrop-blur-sm">
      <div className="max-h-[85vh] w-full max-w-[1000px] overflow-y-auto rounded-[28px] border border-white/70 bg-white/95 p-4 shadow-[0_28px_80px_rgba(15,43,71,0.32)] sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <CategoryPills categories={project.categories} />
              <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#3d6f93]">
                {project.year}
              </span>
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight text-[#173d61]">
              {project.title}
            </h3>
            {project.role && (
              <p className="mt-1 text-xs font-extrabold uppercase tracking-[0.1em] text-[#1f4f7a]/75">
                {project.role}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1f4f7a] text-lg font-black text-white shadow-[0_10px_24px_rgba(31,79,122,0.2)] transition-colors hover:bg-[#173d61]"
            aria-label="Close portfolio detail"
          >
            ×
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
          <div>
            <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-[22px] bg-[#eef7fc] shadow-[0_18px_50px_rgba(31,79,122,0.12)]">
              <SafeImage
                key={activeImage}
                src={activeImage}
                alt={project.title}
                className="h-full w-full object-cover transition-all duration-300"
                fallback={
                  <FallbackThumbnail
                    project={project}
                    className="h-full w-full"
                  />
                }
              />

              {galleryImages.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Previous image"
                    onClick={goToPreviousImage}
                    className="absolute left-4 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/90 text-2xl font-black text-[#123A5A] shadow-[0_12px_28px_rgba(15,77,120,0.20)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-[#1E8DDE] hover:text-white active:scale-95"
                  >
                    ‹
                  </button>

                  <button
                    type="button"
                    aria-label="Next image"
                    onClick={goToNextImage}
                    className="absolute right-4 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/90 text-2xl font-black text-[#123A5A] shadow-[0_12px_28px_rgba(15,77,120,0.20)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-[#1E8DDE] hover:text-white active:scale-95"
                  >
                    ›
                  </button>
                </>
              )}

              {galleryImages.length > 1 && (
                <span className="absolute bottom-3 right-3 z-30 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-[#123A5A] shadow-sm backdrop-blur-md">
                  {safeActiveIndex + 1} / {galleryImages.length}
                </span>
              )}
            </div>

            {galleryImages.length > 1 && (
              <div className="mt-4 flex flex-wrap gap-2.5">
                {galleryImages.map((image, index) => (
                  <button
                    type="button"
                    key={image}
                    onClick={(event) => {
                      event.stopPropagation();
                      setActiveImageIndex(index);
                    }}
                    className={`h-16 w-24 overflow-hidden rounded-xl border-2 transition-all duration-300 hover:-translate-y-1 hover:opacity-100 ${
                      safeActiveIndex === index
                        ? "border-[#1E8DDE] opacity-100 shadow-[0_10px_26px_rgba(30,141,222,0.24)]"
                        : "border-white/70 opacity-70"
                    }`}
                    aria-label={`Select ${project.title} image ${index + 1}`}
                  >
                    <SafeImage
                      src={image}
                      fallbackSrc={
                        image === project.thumbnail
                          ? project.fallbackThumbnail
                          : null
                      }
                      alt=""
                      className="h-full w-full object-cover"
                      fallback={
                        <div className="h-full w-full bg-gradient-to-br from-[#e9f5ff] to-[#9fc7e3]" />
                      }
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-[22px] border border-[#d7e5ef]/80 bg-white/70 p-4 shadow-[0_14px_34px_rgba(31,79,122,0.08)] sm:p-5">
            <p className="text-sm leading-relaxed text-slate-600">
              {project.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600 ring-1 ring-[#d7e5ef]"
                >
                  {tool}
                </span>
              ))}
            </div>

            {project.links?.some((link) => link.url) && (
              <div className="mt-6">
                <h4 className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#173d61]">
                  TAUTAN
                </h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.links
                    .filter((link) => link.url)
                    .map((link) => (
                      <a
                        key={`${link.label}-${link.url}`}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={secondaryActionClass}
                      >
                        {getCleanLinkLabel(link.label)}
                      </a>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const filteredProjects =
    activeCategory === "All"
      ? portfolioData
      : portfolioData.filter((project) =>
          project.categories?.includes(activeCategory),
        );

  useEffect(() => {
    if (selectedProject) {
      setActiveImageIndex(0);
    }
  }, [selectedProject?.id ?? selectedProject?.title]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setSelectedProject(null);
  };

  const openDetails = (project) => {
    setSelectedProject(project);
  };

  const closeDetails = () => {
    setSelectedProject(null);
  };

  return (
    <section
      id="portfolio"
      className="hiyo-section-surface relative flex min-h-screen w-full scroll-mt-24 items-center justify-center overflow-visible bg-transparent px-4 py-24 text-slate-900 sm:px-6 lg:px-8"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1200px]">
        <motion.div
          variants={sectionTitleMotion}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.22, margin: "-8% 0px -8% 0px" }}
          transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 text-center"
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-[#173d61] md:text-4xl">
            Portfolio
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm font-medium leading-relaxed text-slate-600 md:text-base">
            Kumpulan proyek utama yang menggabungkan sisi teknologi, desain, dan
            identitas kreatif saya.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.22, margin: "-8% 0px -8% 0px" }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
          >
            {filters.map((filter) => {
              const isActive = filter === activeCategory;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => handleCategoryChange(filter)}
                  className={`rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.04] hover:bg-[#1E8DDE] hover:text-white active:scale-95 sm:text-xs ${
                    isActive
                      ? "bg-[#1f4f7a] text-white shadow-[0_8px_22px_rgba(31,79,122,0.2)]"
                      : "bg-white/60 text-[#1f4f7a] ring-1 ring-white/70"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </motion.div>
        </motion.div>

        <div
          key={activeCategory}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6"
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <PortfolioCard
                key={`${activeCategory}-${project.id}`}
                project={project}
                onOpenDetails={openDetails}
                index={index}
              />
            ))
          ) : (
            <motion.p
              variants={itemMotion}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: false,
                amount: 0.14,
                margin: "-6% 0px -6% 0px",
              }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[24px] border border-white/70 bg-white/75 px-5 py-8 text-center text-sm font-bold text-[#1f4f7a] shadow-[0_18px_45px_rgba(31,79,122,0.1)] md:col-span-2"
            >
              Belum ada portfolio untuk kategori ini.
            </motion.p>
          )}
        </div>
      </div>

      <PortfolioModal
        project={selectedProject}
        activeImageIndex={activeImageIndex}
        setActiveImageIndex={setActiveImageIndex}
        onClose={closeDetails}
      />
    </section>
  );
}
