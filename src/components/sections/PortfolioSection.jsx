import React from 'react';
import { projectsData } from '../../data/projects';

export default function PortfolioSection() {
  return (
    <section
      id="portfolio"
      className="min-h-screen w-full flex flex-col justify-center items-center px-6 py-20 bg-white dark:bg-black text-black dark:text-white"
    >
      <div className="max-w-5xl w-full space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Portfolio</h2>
          <p className="text-gray-600 dark:text-zinc-400 max-w-xl mx-auto">
            Kumpulan proyek yang mencerminkan sisi teknis dan kreatif saya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="group p-6 rounded-2xl bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-200 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300">
                  {project.category}
                </span>
                <span className="text-xs text-gray-400">2024</span>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-zinc-400">
                {project.description}
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                Lihat Detail &rarr;
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
