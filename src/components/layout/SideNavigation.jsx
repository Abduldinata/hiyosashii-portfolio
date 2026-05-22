"use client";

import React, { useEffect, useState } from 'react';
import { SITE_CONFIG } from '../../constants/site';

export default function SideNavigation() {
  const [activeSection, setActiveSection] = useState('profile');

  useEffect(() => {
    const handleScroll = () => {
      const sections = SITE_CONFIG.navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSection(SITE_CONFIG.navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <aside className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">
      {SITE_CONFIG.navItems.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <a
            key={item.id}
            href={item.href}
            className="group relative flex items-center justify-end p-2"
            aria-label={`Go to ${item.label}`}
          >
            {/* Tooltip */}
            <span className="absolute right-8 text-xs font-semibold bg-gray-900 text-white dark:bg-white dark:text-black py-1 px-2 rounded opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap">
              {item.label}
            </span>
            {/* Dot */}
            <span
              className={`w-3 h-3 rounded-full transition-all duration-300 border ${
                isActive
                  ? 'bg-blue-600 border-blue-600 scale-125'
                  : 'bg-transparent border-gray-400 dark:border-zinc-600 hover:border-blue-500'
              }`}
            />
          </a>
        );
      })}
    </aside>
  );
}
