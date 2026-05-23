"use client";

import React, { useState } from "react";
import { portfolioData } from "../../data/portfolioData";

const filters = [
  "All",
  "Web",
  "App",
  "Design",
  "Video Editing",
  "Game/Modding",
];

const detailDescriptions = {
  "expo-bazar":
    "Visual design package for Expo Bazar Wonosegoro 2025, including poster invitation, photobooth design, local UMKM MMT, and stage/event banner.",
  "kkn-publication":
    "Creative publication package for KKN-T Banyusri, including social media feed, documentation visuals, video recap materials, and local community publication assets.",
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
        className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
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

function PortfolioCard({ project, onOpenDetails }) {
  const [selectedImage, setSelectedImage] = useState(project.thumbnail);
  const visibleTools = project.tools.slice(0, 4);
  const hiddenToolsCount = project.tools.length - visibleTools.length;
  const primaryAction = project.primaryAction;
  const secondaryAction = project.secondaryActions?.[0];
  const shouldOpenDetails =
    project.detailType === "gallery" || !primaryAction?.url;

  const handlePrimaryAction = () => {
    if (shouldOpenDetails) {
      onOpenDetails(project, selectedImage);
      return;
    }

    window.open(primaryAction.url, "_blank", "noopener,noreferrer");
  };

  return (
    <article className="hiyo-hover-card group rounded-[28px] border border-white/70 bg-white/85 p-4 shadow-[0_18px_45px_rgba(31,79,122,0.13)] backdrop-blur-[3px] sm:p-5">
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

        <div className="mt-4 flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handlePrimaryAction}
            className="inline-flex items-center rounded-full bg-[#1f4f7a] px-4 py-2 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(31,79,122,0.2)] transition-colors hover:bg-[#173d61]"
          >
            {primaryAction?.label ?? "Open Details"}
            <span className="ml-1.5 transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>

          {secondaryAction?.url && (
            <a
              href={secondaryAction.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-white/80 px-3 py-2 text-xs font-extrabold text-[#1f4f7a] ring-1 ring-[#cfe1ed] transition-colors hover:bg-[#e8f2f8]"
            >
              {secondaryAction.label}
            </a>
          )}

          <button
            type="button"
            onClick={() => onOpenDetails(project, selectedImage)}
            className="text-xs font-extrabold text-[#1f4f7a] underline-offset-4 transition-colors hover:text-[#173d61] hover:underline"
          >
            Details
          </button>
        </div>
      </div>
    </article>
  );
}

function PortfolioModal({ project, selectedImage, onSelectImage, onClose }) {
  if (!project) return null;

  const gallery = project.gallery?.length
    ? project.gallery
    : [project.thumbnail];
  const activeImage = selectedImage || gallery[0];
  const extraDescription = detailDescriptions[project.id];

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

        <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <div className="flex aspect-video items-center justify-center overflow-hidden rounded-[22px] bg-[#eef6fb] shadow-[0_14px_34px_rgba(31,79,122,0.14)]">
              <SafeImage
                src={activeImage}
                alt={project.title}
                className="h-full w-full object-contain"
                fallback={
                  <FallbackThumbnail
                    project={project}
                    className="h-full w-full"
                  />
                }
              />
            </div>

            {gallery.length > 1 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {gallery.map((image) => {
                  const isActive = image === activeImage;

                  return (
                    <button
                      key={image}
                      type="button"
                      onClick={() => onSelectImage(image)}
                      className={`h-14 w-20 overflow-hidden rounded-xl border-2 transition ${
                        isActive
                          ? "border-[#1f4f7a] ring-2 ring-[#cfe1ed]"
                          : "border-white hover:border-[#9fc7e3]"
                      }`}
                      aria-label={`Select ${project.title} image`}
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

          <div>
            <p className="text-sm leading-relaxed text-slate-600">
              {project.description}
            </p>
            {extraDescription && (
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {extraDescription}
              </p>
            )}

            <div className="mt-4 flex flex-wrap gap-1.5">
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
              <div className="mt-5">
                <h4 className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#173d61]">
                  Links
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
                        className="inline-flex items-center rounded-full bg-[#1f4f7a] px-4 py-2 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(31,79,122,0.18)] transition-colors hover:bg-[#173d61]"
                      >
                        {link.label}
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
  const [modalImage, setModalImage] = useState(null);
  const filteredProjects =
    activeCategory === "All"
      ? portfolioData
      : portfolioData.filter((project) =>
          project.categories?.includes(activeCategory),
        );

  const openDetails = (project, image) => {
    setSelectedProject(project);
    setModalImage(image || project.thumbnail || project.gallery?.[0]);
  };

  const closeDetails = () => {
    setSelectedProject(null);
    setModalImage(null);
  };

  return (
    <section
      id="portfolio"
      className="relative flex min-h-[calc(100vh-88px)] w-full items-center justify-center overflow-hidden bg-transparent px-4 py-20 text-slate-900 sm:px-6 lg:px-8"
    >
      <div className="hiyo-section-reveal relative z-10 mx-auto w-full max-w-[1200px]">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#173d61] md:text-4xl">
            Portfolio
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm font-medium leading-relaxed text-slate-600 md:text-base">
            Kumpulan proyek utama yang menggabungkan sisi teknologi, desain, dan
            identitas kreatif saya.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {filters.map((filter) => {
              const isActive = filter === activeCategory;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveCategory(filter)}
                  className={`rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] transition-colors duration-200 sm:text-xs ${
                    isActive
                      ? "bg-[#1f4f7a] text-white shadow-[0_8px_22px_rgba(31,79,122,0.2)]"
                      : "bg-white/60 text-[#1f4f7a] ring-1 ring-white/70 hover:bg-white/85"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
          {filteredProjects.map((project) => (
            <PortfolioCard
              key={project.id}
              project={project}
              onOpenDetails={openDetails}
            />
          ))}
        </div>
      </div>

      <PortfolioModal
        project={selectedProject}
        selectedImage={modalImage}
        onSelectImage={setModalImage}
        onClose={closeDetails}
      />
    </section>
  );
}
