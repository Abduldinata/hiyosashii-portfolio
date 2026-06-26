"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "../../data/portfolioData";
import ToolPill from "../ui/ToolPill";

const sectionTitleMotion = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: "blur(8px)",
  },
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

const cardMotion = {
  hidden: {
    opacity: 0.88,
    y: 22,
    scale: 0.988,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      filter: { duration: 0.08 },
    },
  },
};

const itemMotion = {
  hidden: {
    opacity: 0,
    y: 18,
    scale: 0.94,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
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
  "font-ui group inline-flex items-center justify-center rounded-full bg-[#185987] dark:bg-[#1a567a] px-6 py-3 text-sm font-black tracking-wide text-white shadow-[0_14px_34px_rgba(24,89,135,0.22)] transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.035] hover:bg-[#1E8DDE] dark:hover:bg-[#3b9eff] hover:shadow-[0_20px_48px_rgba(30,141,222,0.34)] active:translate-y-0 active:scale-95";

const secondaryActionClass =
  "font-ui group inline-flex items-center justify-center rounded-full border border-[#BFD8EA] bg-white/90 px-5 py-3 text-sm font-black tracking-wide text-[#1a567a] shadow-sm dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-gray-300 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.035] hover:border-[#1E8DDE] dark:hover:border-[#3b9eff] hover:bg-[#1E8DDE] dark:hover:bg-[#3b9eff] hover:text-white hover:shadow-[0_16px_38px_rgba(30,141,222,0.26)] dark:hover:shadow-[0_16px_38px_rgba(0,0,0,0.3)] active:translate-y-0 active:scale-95";

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
          className="font-ui rounded-full border border-white/50 bg-white/40 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#1a567a] shadow-sm backdrop-blur-sm dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-gray-300"
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
        <p className="mt-3 line-clamp-2 text-base font-extrabold leading-tight text-[#0f3b5e]">
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
      loading="lazy"
      decoding="async"
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

function PortfolioCard({ project, onOpenDetails, setActiveImageIndex, index }) {
  const [selectedImage, setSelectedImage] = useState(project.thumbnail);
  const [tiltRot, setTiltRot] = useState({ x: 0, y: 0 });
  const [isCardHovered, setIsCardHovered] = useState(false);
  const cardInnerRef = useRef(null);
  const isTouchDevice =
    typeof window !== "undefined" && "ontouchstart" in window;

  // Auto-add related tools
  const relatedTools = {
    Flutter: ["Dart"],
    "C++": ["Android"],
    Dart: ["Flutter"],
    Android: ["C++"],
  };

  const enrichedTools = project.tools.flatMap((tool) => {
    const extras = relatedTools[tool] || [];
    return [tool, ...extras.filter((ext) => !project.tools.includes(ext))];
  });

  const visibleTools = enrichedTools.slice(0, 5);
  const hiddenToolsCount = Math.max(0, project.tools.length - 5);
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

  const handleTilt = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const maxAngle = 5;
    setTiltRot({
      x: (y - 0.5) * -maxAngle,
      y: (x - 0.5) * maxAngle,
    });
  }, []);

  const resetTilt = useCallback(() => {
    setTiltRot({ x: 0, y: 0 });
  }, []);

  return (
    <motion.article
      data-portfolio-slug={
        project.slug ||
        project.id ||
        project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
      }
      tabIndex={-1}
      variants={cardMotion}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.15, margin: "0px 0px -20% 0px" }}
      transition={{
        duration: 0.46,
        ease: [0.22, 1, 0.36, 1],
        delay: Math.min(index * 0.035, 0.16),
      }}
      whileHover={{ y: -5, scale: 1.01 }}
      whileTap={{
        scale: 0.98,
        transition: { duration: 0.12 },
      }}
      className="group relative overflow-hidden rounded-[28px] border border-white/50 bg-white/40 p-4 shadow-sm backdrop-blur-sm ring-1 ring-white/30 dark:border-white/[0.06] dark:bg-white/[0.05] dark:shadow-[0_4px_12px_rgba(0,0,0,0.2)] dark:ring-slate-800/30 sm:p-5"
      onMouseEnter={!isTouchDevice ? () => setIsCardHovered(true) : undefined}
      onMouseLeave={
        !isTouchDevice
          ? () => {
              setIsCardHovered(false);
              resetTilt();
            }
          : undefined
      }
      onMouseMove={!isTouchDevice ? handleTilt : undefined}
      style={{ perspective: "900px" }}
    >
      {/* Decorative elements */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-24 w-24 rounded-full bg-[#1E8DDE]/8 blur-2xl dark:bg-[#5DC3F5]/5" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-20 w-20 rounded-full bg-white/30 blur-2xl dark:bg-white/5" />
      <div className="hiyo-orbit pointer-events-none absolute right-6 top-6 h-2 w-2 rounded-full bg-[#1E8DDE]/35 shadow-[0_0_14px_rgba(30,141,222,0.3)] dark:bg-[#5DC3F5]/30" />

      <div
        ref={cardInnerRef}
        className="transform-gpu transition-transform duration-[250ms] ease-out"
        style={{
          transform: isTouchDevice
            ? "none"
            : `
                translateY(${isCardHovered ? -3 : 0}px)
                scale(${isCardHovered ? 1.004 : 1})
                rotateX(${tiltRot.x}deg)
                rotateY(${tiltRot.y}deg)
              `,
        }}
      >
        <PortfolioThumbnail
          project={project}
          selectedImage={selectedImage}
          onSelectImage={setSelectedImage}
        />

        <div className="px-1 pt-4">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <CategoryPills categories={project.categories} />
            <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#3d6f93] dark:text-gray-500">
              {project.year}
            </span>
          </div>

          <h3 className="line-clamp-2 text-lg font-extrabold tracking-tight text-[#0f3b5e] dark:text-white sm:text-xl">
            {project.title}
          </h3>
          {project.role && (
            <p className="mt-1 text-xs font-extrabold uppercase tracking-[0.1em] text-[#1a567a]/75 dark:text-gray-400">
              {project.role}
            </p>
          )}
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-gray-400">
            {project.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {visibleTools.map((tool) => (
              <ToolPill key={tool} tool={tool} />
            ))}
            {hiddenToolsCount > 0 && (
              <span className="rounded-full bg-[#e8f2f8] px-2.5 py-1 text-[11px] font-bold text-[#1a567a] ring-1 ring-[#cfe1ed] dark:bg-white/[0.06] dark:text-gray-300 dark:ring-white/[0.05]">
                +{hiddenToolsCount}
              </span>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {hasDetailAction ? (
              <button
                type="button"
                onClick={() => {
                  onOpenDetails(project);
                  setActiveImageIndex(0);
                }}
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
  // Keyboard: Escape to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 overflow-y-auto bg-[#061424]/85"
      onClick={onClose}
    >
      <div className="flex min-h-full items-center justify-center px-4 py-8 sm:py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-[1120px] rounded-[30px] border border-white/70 bg-white/90 dark:border-white/[0.06] dark:bg-[#0b1425]/90 p-4 shadow-[0_34px_100px_rgba(15,77,120,0.28)] dark:shadow-[0_34px_80px_rgba(0,0,0,0.4)] sm:p-5 md:p-6"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-40 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1f4f7a] dark:bg-[#1a567a] text-lg font-black text-white shadow-[0_10px_24px_rgba(31,79,122,0.2)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.035] hover:bg-[#173d61] dark:hover:bg-[#0f3b5e] hover:shadow-[0_16px_38px_rgba(31,79,122,0.26)] active:translate-y-0 active:scale-95"
            aria-label="Close portfolio detail"
          >
            ×
          </button>

          <header className="pr-12">
            <div className="flex flex-wrap items-center gap-2">
              {project.categories?.slice(0, 2).map((category) => (
                <span
                  key={category}
                  className="font-ui inline-flex rounded-full bg-[#E8F4FB] dark:bg-white/[0.06] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[#1a567a] dark:text-gray-300"
                >
                  {category}
                </span>
              ))}
              <span className="text-[11px] font-black tracking-[0.2em] text-[#1a567a] dark:text-gray-300 md:text-xs">
                {project.year}
              </span>
            </div>

            <h3 className="mt-3 max-w-4xl text-2xl font-black leading-tight tracking-tight text-[#0f3b5e] dark:text-white md:text-3xl">
              {project.title}
            </h3>
            {project.role && (
              <p className="mt-2 max-w-4xl text-[11px] font-black uppercase leading-snug tracking-[0.2em] text-[#5F7FA0] dark:text-gray-500 md:text-xs">
                {project.role}
              </p>
            )}
          </header>

          <div className="mt-5 grid gap-5 md:grid-cols-[1.3fr_1fr] lg:grid-cols-[1.35fr_0.95fr] md:items-start lg:items-start">
            <div className="space-y-3 min-w-0">
              <div className="relative flex min-h-[300px] w-full items-center justify-center overflow-hidden rounded-[24px] bg-[#E8F4FB] dark:bg-[#0b1425]/50 shadow-[0_18px_50px_rgba(31,79,122,0.12)] border border-slate-100 dark:border-white/[0.06] md:min-h-[400px]">
                <SafeImage
                  key={activeImage}
                  src={activeImage}
                  alt={project.title}
                  className="max-h-[70vh] w-full object-contain"
                  fallback={
                    <FallbackThumbnail
                      project={project}
                      className="h-full w-full object-cover"
                    />
                  }
                />

                {galleryImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label="Previous image"
                      onClick={goToPreviousImage}
                      className="absolute left-3 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/90 dark:border-white/[0.06] dark:bg-[#0b1425]/90 text-2xl font-black text-[#1a567a] dark:text-gray-300 shadow-[0_16px_38px_rgba(15,77,120,0.22)] transition-all duration-300 hover:-translate-x-1 hover:scale-110 hover:bg-[#1E8DDE] dark:hover:bg-[#3b9eff] hover:text-white hover:shadow-[0_18px_46px_rgba(30,141,222,0.34)] active:scale-95"
                    >
                      ‹
                    </button>

                    <button
                      type="button"
                      aria-label="Next image"
                      onClick={goToNextImage}
                      className="absolute right-3 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/90 dark:border-white/[0.06] dark:bg-[#0b1425]/90 text-2xl font-black text-[#1a567a] dark:text-gray-300 shadow-[0_16px_38px_rgba(15,77,120,0.22)] transition-all duration-300 hover:translate-x-1 hover:scale-110 hover:bg-[#1E8DDE] dark:hover:bg-[#3b9eff] hover:text-white hover:shadow-[0_18px_46px_rgba(30,141,222,0.34)] active:scale-95"
                    >
                      ›
                    </button>
                  </>
                )}

                {galleryImages.length > 1 && (
                  <span className="absolute bottom-3 right-3 z-30 rounded-full border border-white/70 bg-white/90 px-3 py-1 text-xs font-black tracking-wide text-[#0f3b5e] dark:border-white/[0.06] dark:bg-[#0b1425]/80 dark:text-gray-300 dark:text-white shadow-sm">
                    {safeActiveIndex + 1} / {galleryImages.length}
                  </span>
                )}
              </div>

              {galleryImages.length > 1 && (
                <div className="mt-3 flex items-center justify-center gap-2">
                  {galleryImages.map((_, index) => (
                    <button
                      key={`dot-${index}`}
                      type="button"
                      aria-label={`Go to image ${index + 1}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        setActiveImageIndex(index);
                      }}
                      className={`h-2 rounded-full transition-all duration-300 hover:bg-[#1E8DDE] dark:hover:bg-[#3b9eff] ${
                        safeActiveIndex === index
                          ? "w-7 bg-[#185987] dark:bg-[#1a567a] shadow-[0_8px_20px_rgba(30,141,222,0.28)]"
                          : "w-2 bg-[#BFD8EA] dark:bg-white/[0.1]"
                      }`}
                    />
                  ))}
                </div>
              )}

              {galleryImages.length > 1 && (
                <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                  {galleryImages.map((image, index) => (
                    <button
                      type="button"
                      key={image}
                      onClick={(event) => {
                        event.stopPropagation();
                        setActiveImageIndex(index);
                      }}
                      className={`group h-12 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.04] hover:opacity-100 hover:shadow-[0_12px_28px_rgba(30,141,222,0.22)] active:scale-95 md:h-14 md:w-24 ${
                        safeActiveIndex === index
                          ? "border-[#1E8DDE] opacity-100 shadow-[0_10px_26px_rgba(30,141,222,0.24)]"
                          : "border-white/70 opacity-70 dark:border-white/[0.05] dark:opacity-50"
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
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        fallback={
                          <div className="h-full w-full bg-gradient-to-br from-[#e9f5ff] to-[#9fc7e3]" />
                        }
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-[22px] border border-[#D7EAF5] bg-white/70 dark:border-white/[0.06] dark:bg-[#0b1425]/50 p-4 shadow-[0_18px_50px_rgba(31,79,122,0.08)] md:p-5">
              <h4 className="font-ui text-xs font-black uppercase tracking-[0.2em] text-[#1a567a] dark:text-gray-300">
                RINGKASAN
              </h4>

              <p className="mt-3 text-sm leading-7 text-[#0f3b5e] dark:text-white md:text-[15px]">
                {project.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <ToolPill key={tool} tool={tool} />
                ))}
              </div>

              {project.links?.some((link) => link.url) && (
                <div className="mt-4">
                  <h4 className="font-ui text-xs font-black uppercase tracking-[0.2em] text-[#1a567a] dark:text-gray-300">
                    TAUTAN
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.links
                      .filter((link) => link.url)
                      .map((link) => (
                        <a
                          key={`${link.label}-${link.url}`}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center justify-center rounded-full border border-[#BFD8EA] bg-white/90 px-4 py-2 text-sm font-black tracking-wide text-[#1a567a] dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-gray-300 dark:text-gray-300 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.035] hover:border-[#1E8DDE] dark:hover:border-[#3b9eff] hover:bg-[#1E8DDE] dark:hover:bg-[#3b9eff] hover:text-white hover:shadow-[0_16px_38px_rgba(30,141,222,0.26)] dark:hover:shadow-[0_16px_38px_rgba(0,0,0,0.3)] active:translate-y-0 active:scale-95"
                        >
                          {getCleanLinkLabel(link.label)}
                        </a>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const portfolioRef = useRef(null);
  const carouselRef = useRef(null);
  const filteredProjects =
    activeCategory === "All"
      ? portfolioData
      : portfolioData.filter((project) =>
          project.categories?.includes(activeCategory),
        );

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

  // Reset on filter change
  useEffect(() => {
    setCurrentIndex(0);
    setShowMore(false);
    if (carouselRef.current) carouselRef.current.scrollLeft = 0;
  }, [activeCategory]);

  // Track currentIndex from scroll position
  useEffect(() => {
    const el = carouselRef.current;
    if (!el || filteredProjects.length === 0) return;
    const cards = Array.from(el.children);
    if (cards.length === 0) return;
    const update = () => {
      const cx = el.scrollLeft + el.clientWidth / 2;
      let closest = 0;
      let closestDist = Infinity;
      for (let i = 0; i < cards.length; i++) {
        const d = Math.abs(
          cx - (cards[i].offsetLeft + cards[i].offsetWidth / 2),
        );
        if (d < closestDist) {
          closestDist = d;
          closest = i;
        }
      }
      setCurrentIndex(closest);
    };
    el.addEventListener("scroll", update, { passive: true });
    return () => el.removeEventListener("scroll", update);
  }, [filteredProjects.length]);

  const scrollTo = (index) => {
    const total = filteredProjects.length;
    const safe = ((index % total) + total) % total;
    if (!carouselRef.current) return;
    const el = carouselRef.current;
    const child = el.children[safe];
    if (!child) return;
    const scrollLeft =
      child.offsetLeft + child.offsetWidth / 2 - el.clientWidth / 2;
    el.scrollTo({ left: scrollLeft, behavior: "smooth" });
    setCurrentIndex(safe);
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  return (
    <section
      id="portfolio"
      ref={portfolioRef}
      className="hiyo-section-surface relative flex min-h-screen w-full scroll-mt-24 items-center justify-center overflow-visible bg-transparent px-4 py-24 text-slate-900 dark:text-white sm:px-6 lg:px-8"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1200px]">
        <motion.div
          variants={sectionTitleMotion}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15, margin: "0px 0px -20% 0px" }}
          className="mb-6 flex flex-col items-center text-center"
        >
          <h2 className="font-ui text-3xl font-extrabold tracking-tight text-[#0f3b5e] dark:text-white/90 md:text-4xl">
            Portfolio
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm font-medium leading-relaxed text-slate-600 dark:text-gray-400 md:text-base">
            Kumpulan proyek utama yang menggabungkan sisi teknologi, desain, dan
            identitas kreatif saya.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15, margin: "0px 0px -20% 0px" }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
          >
            {filters.map((filter) => {
              const isActive = filter === activeCategory;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => handleCategoryChange(filter)}
                  className={`font-ui rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:scale-[1.04] active:scale-95 sm:text-xs ${
                    isActive
                      ? "border border-transparent bg-[#1E8DDE] text-white shadow-[0_8px_22px_rgba(30,141,222,0.3)] dark:bg-[#3b9eff] dark:shadow-[0_8px_22px_rgba(59,158,255,0.3)]"
                      : "border border-white/60 bg-white/50 text-[#1a567a] shadow-sm hover:bg-white/80 dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-gray-300 dark:hover:bg-white/10"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </motion.div>
        </motion.div>

        <style>{`.ps-hide-scrollbar { scrollbar-width: none; -ms-overflow-style: none; } .ps-hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>

        {showMore ? (
          /* ── GRID VIEW (Show More) ── */
          <div
            key={activeCategory + "-grid"}
            className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6 pt-4"
          >
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <PortfolioCard
                  key={`${activeCategory}-${project.id}`}
                  project={project}
                  onOpenDetails={openDetails}
                  setActiveImageIndex={setActiveImageIndex}
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
                  amount: 0.15,
                  margin: "10% 0px 10% 0px",
                }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[24px] border border-white/50 bg-white/80 px-5 py-8 text-center text-sm font-bold text-[#1a567a] shadow-sm backdrop-blur-sm dark:border-white/[0.06] dark:bg-[#0b1425]/80 dark:text-gray-300 md:col-span-2"
              >
                Belum ada portfolio untuk kategori ini.
              </motion.p>
            )}
          </div>
        ) : (
          /* ── CAROUSEL VIEW (ML style) ── */
          <div key={activeCategory + "-carousel"} className="relative pt-4">
            {filteredProjects.length > 0 ? (
              <>
                {/* Left arrow */}
                <button
                  onClick={() => scrollTo(currentIndex - 1)}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/90 dark:bg-[#0f1a2e]/90 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-white/60 dark:border-white/[0.08] flex items-center justify-center text-[#1E8DDE] transition-all duration-300 hover:bg-white dark:hover:bg-[#0f1a2e] hover:shadow-[0_6px_24px_rgba(30,141,222,0.2)] hover:scale-105 active:scale-95"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                {/* Carousel */}
                <div
                  ref={carouselRef}
                  className="flex gap-4 overflow-x-auto snap-x snap-proximity scroll-smooth ps-hide-scrollbar py-2 px-4 md:px-16"
                >
                  {filteredProjects.map((project, i) => {
                    const dist = Math.abs(currentIndex - i);
                    return (
                      <div
                        key={`${activeCategory}-${project.id}`}
                        className="snap-center shrink-0 w-[80vw] sm:w-[400px] lg:w-[480px] transition-all duration-500 ease-out"
                        style={{
                          opacity: dist === 0 ? 1 : dist === 1 ? 0.55 : 0.15,
                          transform:
                            dist === 0
                              ? "scale(1)"
                              : dist === 1
                                ? "scale(0.88)"
                                : "scale(0.75)",
                        }}
                      >
                        <PortfolioCard
                          project={project}
                          onOpenDetails={openDetails}
                          setActiveImageIndex={setActiveImageIndex}
                          index={i}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Right arrow */}
                <button
                  onClick={() => scrollTo(currentIndex + 1)}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/90 dark:bg-[#0f1a2e]/90 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-white/60 dark:border-white/[0.08] flex items-center justify-center text-[#1E8DDE] transition-all duration-300 hover:bg-white dark:hover:bg-[#0f1a2e] hover:shadow-[0_6px_24px_rgba(30,141,222,0.2)] hover:scale-105 active:scale-95"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </>
            ) : (
              <motion.p
                variants={itemMotion}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: false,
                  amount: 0.15,
                  margin: "10% 0px 10% 0px",
                }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[24px] border border-white/50 bg-white/80 px-5 py-8 text-center text-sm font-bold text-[#1a567a] shadow-sm backdrop-blur-sm dark:border-white/[0.06] dark:bg-[#0b1425]/80 dark:text-gray-300"
              >
                Belum ada portfolio untuk kategori ini.
              </motion.p>
            )}

            {/* Show More toggle */}
            {filteredProjects.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => setShowMore(true)}
                    className="font-ui inline-flex items-center gap-2 rounded-full border border-white/50 dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.05] px-6 py-2.5 text-sm font-bold text-[#0f3b5e] dark:text-gray-300 shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-white dark:hover:bg-white/[0.08] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(30,141,222,0.12)] active:scale-95"
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Show More
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* Show Less button (when in grid view) */}
        {showMore && filteredProjects.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => {
                  setShowMore(false);
                  setTimeout(() => scrollTo(currentIndex), 50);
                  portfolioRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className="font-ui inline-flex items-center gap-2 rounded-full border border-white/50 dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.05] px-6 py-2.5 text-sm font-bold text-[#0f3b5e] dark:text-gray-300 shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-white dark:hover:bg-white/[0.08] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(30,141,222,0.12)] active:scale-95"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="19" x2="12" y2="5" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Show Less
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {selectedProject && (
              <PortfolioModal
                key="portfolio-modal"
                project={selectedProject}
                activeImageIndex={activeImageIndex}
                setActiveImageIndex={setActiveImageIndex}
                onClose={closeDetails}
              />
            )}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
}
