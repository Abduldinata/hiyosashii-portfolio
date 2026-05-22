import React from 'react';
import { SITE_CONFIG } from '../../constants/site';

export default function ProfileSection() {
  return (
    <section
      id="profile"
      className="min-h-screen w-full flex flex-col justify-center items-center px-6 pt-24 pb-16 bg-white dark:bg-black text-black dark:text-white"
    >
      <div className="max-w-4xl w-full text-center space-y-6">
        {/* Category badge / Identity Intro */}
        <div className="inline-flex gap-3 justify-center items-center">
          <span className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full">
            Mahasiswa / Tech
          </span>
          <span className="text-gray-300 dark:text-zinc-700">|</span>
          <span className="px-3 py-1 text-xs font-semibold bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 rounded-full">
            Content Creator / Creative
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Hi, I&apos;m <span className="text-blue-600 dark:text-blue-400">{SITE_CONFIG.name}</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          {SITE_CONFIG.description}
        </p>

        <div className="pt-8 flex flex-wrap justify-center gap-4">
          <a
            href="#portfolio"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Lihat Project
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-gray-300 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-900 text-black dark:text-white rounded-lg font-medium transition-colors"
          >
            Hubungi Saya
          </a>
        </div>

        {/* Identity Concept Teaser Box */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-3xl mx-auto">
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800">
            <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">01. Tech & Academics</h3>
            <p className="text-sm text-gray-600 dark:text-zinc-400">
              Fokus pada pengembangan web, pemecahan masalah dengan kode, dan eksplorasi teknologi terbaru sebagai mahasiswa.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800">
            <h3 className="text-lg font-bold text-purple-600 dark:text-purple-400 mb-2">02. Creative & Content</h3>
            <p className="text-sm text-gray-600 dark:text-zinc-400">
              Membuat konten digital edukatif dan menarik, desain visual, serta bercerita lewat media audio-visual.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
