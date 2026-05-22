import React from 'react';
import { socialsData } from '../../data/socials';

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="min-h-screen w-full flex flex-col justify-center items-center px-6 py-20 bg-white dark:bg-black text-black dark:text-white"
    >
      <div className="max-w-3xl w-full space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Get In Touch</h2>
          <p className="text-gray-600 dark:text-zinc-400 max-w-xl mx-auto">
            Tertarik untuk bekerja sama atau ingin tahu lebih banyak? Hubungi saya melalui media sosial atau kirim email.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info Card */}
          <div className="p-8 rounded-2xl bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 space-y-6">
            <h3 className="text-xl font-bold">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">@</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-zinc-400">Email</p>
                  <p className="font-medium">abdul.aziz@example.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <span className="text-sm font-bold text-purple-600 dark:text-purple-400">📱</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-zinc-400">WhatsApp</p>
                  <p className="font-medium">+62 812-3456-7890</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="p-8 rounded-2xl bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 space-y-6">
            <h3 className="text-xl font-bold">Follow Me</h3>
            <div className="grid grid-cols-2 gap-4">
              {socialsData.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  className="flex items-center justify-center gap-2 p-3 rounded-lg border border-gray-200 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors"
                >
                  <span className="text-sm font-medium">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Simple Contact Form Placeholder */}
        <div className="p-8 rounded-2xl bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800">
          <h3 className="text-xl font-bold mb-6">Send a Message</h3>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-black focus:outline-none focus:border-blue-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-black focus:outline-none focus:border-blue-500"
              />
            </div>
            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-black focus:outline-none focus:border-blue-500"
            ></textarea>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
