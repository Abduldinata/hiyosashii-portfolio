import React from 'react';
import { achievementsData } from '../../data/achievements';

export default function AchievementSection() {
  return (
    <section
      id="achievement"
      className="min-h-screen w-full flex flex-col justify-center items-center px-6 py-20 bg-gray-50 dark:bg-zinc-950 text-black dark:text-white"
    >
      <div className="max-w-4xl w-full space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Achievements</h2>
          <p className="text-gray-600 dark:text-zinc-400 max-w-xl mx-auto">
            Prestasi dan penghargaan yang telah diraih dalam perjalanan akademik dan kreatif.
          </p>
        </div>

        <div className="space-y-6">
          {achievementsData.map((achievement) => (
            <div
              key={achievement.id}
              className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-white dark:bg-black border border-gray-200 dark:border-zinc-800"
            >
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {achievement.year.slice(-2)}
                  </span>
                </div>
                <div className="w-0.5 h-full bg-gray-200 dark:bg-zinc-800 mx-auto mt-2"></div>
              </div>
              <div className="flex-grow space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">{achievement.title}</h3>
                  <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400">
                    {achievement.category}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-zinc-400">
                  {achievement.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
