import React from 'react';
import { SITE_CONFIG } from '../../constants/site';

export default function Footer() {
  return (
    <footer className="w-full py-8 bg-gray-50 dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm text-gray-600 dark:text-zinc-400">
          &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
        </p>
        <p className="text-xs text-gray-400 dark:text-zinc-500 mt-2">
          Built with Next.js, Tailwind CSS, and Framer Motion
        </p>
      </div>
    </footer>
  );
}
