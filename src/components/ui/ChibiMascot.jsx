"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Supabase config — ganti pake key dari project Supabase kamu ─── */
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";

async function fetchSupabase(method, body) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/comments`, {
      method,
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) throw new Error(`Supabase ${res.status}`);
    if (method === "GET") return await res.json();
    return await res.json();
  } catch {
    return null;
  }
}

/* ─── Local fallback storage ─── */
const STORAGE_KEY = "hiyo-comments";

function getLocalComments() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveLocalComments(comments) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
  } catch {}
}

/* ─── Bubble component ─── */
function CommentBubble({ name, message, date }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-white/10 bg-white/[0.04] p-3"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-sm font-bold text-[#5DC3F5]">
          {name}
        </span>
        <span className="shrink-0 text-[10px] font-semibold text-white/25">
          {date}
        </span>
      </div>
      <p className="mt-1 text-sm leading-relaxed text-white/70">{message}</p>
    </motion.div>
  );
}

/* ─── Main component ─── */
export default function ChibiMascot() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [comments, setComments] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  // Load comments — coba dari Supabase dulu, fallback ke lokal
  useEffect(() => {
    (async () => {
      const fromServer = await fetchSupabase("GET");
      if (fromServer && Array.isArray(fromServer)) {
        const mapped = fromServer.map((c) => ({
          id: c.id,
          name: c.name,
          message: c.message,
          date: new Date(c.created_at).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
        }));
        setComments(mapped);
      } else {
        // Fallback lokal
        setComments(getLocalComments());
      }
    })();
  }, []);

  // Submit handler — kirim ke Supabase, fallback ke lokal
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!name.trim() || !message.trim()) return;

      const entry = {
        name: name.trim(),
        message: message.trim(),
      };

      // Coba kirim ke Supabase
      const result = await fetchSupabase("POST", entry);

      const newComment = {
        id: result?.id || Date.now(),
        name: entry.name,
        message: entry.message,
        date: new Date().toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      };

      const updated = [newComment, ...comments];
      setComments(updated);
      saveLocalComments(updated);

      setName("");
      setMessage("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2500);
    },
    [name, message, comments],
  );

  // Auto-hide after empty state prompt
  const isEmpty = comments.length === 0;

  return (
    <>
      {/* Feedback panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="feedback-panel"
            initial={{ opacity: 0, y: 16, scale: 0.95, originX: 1, originY: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.93, originX: 1, originY: 1 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-[76px] left-4 z-[90] flex w-[340px] flex-col overflow-hidden rounded-2xl border border-white/25 bg-[#0c1f2e]/95 shadow-[0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:w-[380px]"
            style={{ maxHeight: "min(560px, calc(100dvh - 100px))" }}
          >
            {/* ─── Header ─── */}
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full border border-white/20">
                <img
                  src="/assets/characters/bot.png"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-black tracking-tight text-white">
                  Feedback
                </p>
                <p className="text-[11px] font-semibold text-white/40">
                  {isEmpty
                    ? "Jadi yang pertama 😊"
                    : `${comments.length} komentar`}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full text-white/25 transition-colors hover:bg-white/10 hover:text-white/70"
                aria-label="Tutup"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 1L13 13M13 1L1 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* ─── Body ─── */}
            <div className="flex flex-1 flex-col overflow-y-auto overscroll-contain px-4 py-3">
              {/* Form */}
              <form onSubmit={handleSubmit} className="mb-4 space-y-2.5">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama kamu"
                  required
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white/80 placeholder-white/25 outline-none transition-colors focus:border-[#1E8DDE]/40 focus:bg-white/[0.07]"
                />
                <div className="relative">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Kesan / masukan untuk portfolio ini..."
                    required
                    rows={3}
                    className="w-full resize-none rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white/80 placeholder-white/25 outline-none transition-colors focus:border-[#1E8DDE]/40 focus:bg-white/[0.07]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!name.trim() || !message.trim()}
                  className="w-full rounded-xl bg-[#1E8DDE] py-2.5 text-sm font-black uppercase tracking-[0.08em] text-white transition-all duration-200 hover:bg-[#1870b3] hover:shadow-[0_0_24px_rgba(30,141,222,0.3)] active:scale-[0.98] disabled:opacity-30 disabled:hover:shadow-none disabled:active:scale-100"
                >
                  {submitted ? "✉️ Terkirim!" : "Kirim Feedback"}
                </button>
              </form>

              {/* Divider */}
              {!isEmpty && <div className="mb-3 h-px bg-white/5" />}

              {/* Comments list */}
              <div className="space-y-2.5">
                {comments.map((c) => (
                  <CommentBubble
                    key={c.id}
                    name={c.name}
                    message={c.message}
                    date={c.date}
                  />
                ))}
              </div>
            </div>

            {/* ─── Footer ─── */}
            <div className="border-t border-white/10 px-4 py-2 text-[10px] font-semibold text-white/20">
              Terkirim ke Supabase 🚀
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Floating toggle button ─── */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-4 left-4 z-[91] flex h-14 w-14 touch-none select-none items-center justify-center overflow-hidden rounded-full border-2 border-white/25 bg-gradient-to-br from-[#1a3045] to-[#0a1e30] shadow-[0_0_30px_rgba(30,141,222,0.2)] outline-none transition-transform duration-200 active:scale-90"
      >
        {isOpen ? (
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            className="text-white"
          >
            <path
              d="M4 4L14 14M14 4L4 14"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <img
            src="/assets/characters/bot.png"
            alt="Feedback"
            className="h-full w-full object-cover"
            draggable="false"
          />
        )}

        {/* Notification dot when closed */}
        {!isOpen && (
          <span className="absolute right-0.5 top-0.5 h-3 w-3 rounded-full border-2 border-[#0a1e30] bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]" />
        )}
      </button>
    </>
  );
}
