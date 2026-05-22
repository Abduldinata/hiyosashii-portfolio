import React from 'react';
import { SITE_CONFIG } from '../../constants/site';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#profile" className="text-xl font-bold text-black dark:text-white tracking-tight">
          Hiyosashii<span className="text-blue-600">.</span>
        </a>
        <nav className="hidden md:flex space-x-8">
          {SITE_CONFIG.navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="text-sm font-medium text-gray-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
        {/* Simple Mobile Menu Indicator Placeholder */}
        <div className="md:hidden text-xs text-gray-400 font-mono">
          [Menu]
        </div>
      </div>
    </header>
  );
}
