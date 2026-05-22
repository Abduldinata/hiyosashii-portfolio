import React from 'react';
import { skillsData } from '../../data/skills';

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="min-h-screen w-full flex flex-col justify-center items-center px-6 py-20 bg-gray-50 dark:bg-zinc-950 text-black dark:text-white"
    >
      <div className="max-w-4xl w-full space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Skills & Expertise</h2>
          <p className="text-gray-600 dark:text-zinc-400 max-w-xl mx-auto">
            Kombinasi kemampuan teknis di bidang teknologi dan keahlian kreatif dalam pembuatan konten.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tech Skills Card */}
          <div className="p-8 rounded-2xl bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 shadow-sm">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-6 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              Tech & Student Skills
            </h3>
            <div className="space-y-4">
              {skillsData.tech.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">{skill.name}</span>
                    <span className="text-gray-500 dark:text-zinc-400 text-xs">{skill.level}</span>
                  </div>
                  {/* Visual indicator placeholder */}
                  <div className="w-full bg-gray-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full"
                      style={{ width: skill.level.includes("Advanced") ? "85%" : "60%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Creative Skills Card */}
          <div className="p-8 rounded-2xl bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 shadow-sm">
            <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-6 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
              Creative & Creator Skills
            </h3>
            <div className="space-y-4">
              {skillsData.creative.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">{skill.name}</span>
                    <span className="text-gray-500 dark:text-zinc-400 text-xs">{skill.level}</span>
                  </div>
                  {/* Visual indicator placeholder */}
                  <div className="w-full bg-gray-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-purple-600 h-full rounded-full"
                      style={{ width: skill.level.includes("Advanced") ? "85%" : "60%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
