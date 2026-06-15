"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Supabase config ─── */
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
        ...(method === "POST" ? { Prefer: "return=representation" } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) throw new Error(`Supabase ${res.status}`);
    const data = await res.json();
    if (method === "POST") return data?.[0] || data;
    return data;
  } catch (e) {
    console.warn("[Supabase]", e?.message);
    return null;
  }
}

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

/* ── Spring config for smooth ui ── */
const smoothSpring = {
  type: "spring",
  stiffness: 300,
  damping: 28,
  mass: 0.8,
};

const fastSpring = {
  type: "spring",
  stiffness: 400,
  damping: 30,
  mass: 0.6,
};

const panelSpring = {
  type: "spring",
  stiffness: 350,
  damping: 30,
  mass: 0.9,
};

/* ── Typing dots ── */
function TypingDots() {
  return (
    <div className="flex items-center gap-[3px]">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="inline-block h-1.5 w-1.5 rounded-full bg-[#1E8DDE]/60"
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );
}

/* ── Emoji reaction ── */
const REACTIONS = [
  { emoji: "😊", label: "Suka" },
  { emoji: "😐", label: "Biasa" },
  { emoji: "😞", label: "Kurang" },
];

function ReactionBar({ onReact }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.25 }}
      className="flex items-center justify-center gap-2 pt-1"
    >
      <span className="text-[10px] font-semibold text-white/30">Reaksi:</span>
      {REACTIONS.map((r) => (
        <button
          key={r.emoji}
          type="button"
          onClick={() => onReact(r.emoji)}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-sm transition-all duration-200 hover:scale-110 hover:bg-white/10 active:scale-90"
          aria-label={r.label}
        >
          {r.emoji}
        </button>
      ))}
    </motion.div>
  );
}

/* ── Comment bubble ── */
function CommentBubble({ name, message, date, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.035, ...smoothSpring }}
      className="rounded-xl border border-white/8 bg-white/[0.035] p-3 transition-all duration-200 hover:border-white/[0.12] hover:bg-white/[0.06]"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 truncate text-sm font-bold text-white/75">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-[#1E8DDE] to-[#00d4ff] text-[9px] font-black text-white">
            {name.charAt(0).toUpperCase()}
          </span>
          {name}
        </span>
        <span className="shrink-0 text-[10px] font-medium text-white/15">
          {date}
        </span>
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-gray-300">{message}</p>
    </motion.div>
  );
}

/* ── Bot avatar ── */
function BotAvatar({ isThinking }) {
  return (
    <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-white/15 bg-[#0a1e30] shadow-lg shadow-black/20">
      <img
        src="/assets/characters/bot.png"
        alt=""
        className="h-full w-full object-cover"
        style={{
          animation: isThinking
            ? "hiyoBotThink 1s ease-in-out infinite"
            : undefined,
        }}
      />
      <span
        className="absolute inset-0 rounded-full bg-white/5"
        style={{
          animation: "hiyoBotBlink 3s ease-in-out infinite",
        }}
      />
    </div>
  );
}

/* ── Auto-resize textarea hook ── */
function useAutoResize(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const resize = () => {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 120) + "px";
    };
    el.addEventListener("input", resize);
    return () => el.removeEventListener("input", resize);
  }, [ref]);
}

export default function ChibiMascot() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [comments, setComments] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const textareaRef = useRef(null);

  useAutoResize(textareaRef);

  useEffect(() => {
    (async () => {
      try {
        const fromServer = await fetchSupabase("GET");
        if (fromServer && Array.isArray(fromServer) && fromServer.length > 0) {
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
          saveLocalComments(mapped);
        } else {
          setComments(getLocalComments());
        }
      } catch {
        setComments(getLocalComments());
      }
    })();
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!name.trim() || !message.trim()) return;

      setIsThinking(true);

      await new Promise((r) => setTimeout(r, 600));

      const entry = { name: name.trim(), message: message.trim() };
      await fetchSupabase("POST", entry);

      const newComment = {
        id: Date.now(),
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
      setIsThinking(false);
      setShowReactions(true);
      setTimeout(() => {
        setSubmitted(false);
        setShowReactions(false);
      }, 3000);
    },
    [name, message, comments],
  );

  const handleReaction = useCallback((emoji) => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  }, []);

  const isEmpty = comments.length === 0;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="feedback-panel"
            initial={{ opacity: 0, y: 20, scale: 0.94, originX: 0, originY: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.92, originX: 0, originY: 1 }}
            transition={panelSpring}
            className="fixed bottom-[76px] left-4 z-[90] flex w-[340px] flex-col overflow-hidden rounded-2xl border border-white/12 bg-[#0c1f2e]/95 shadow-[0_24px_80px_rgba(0,0,0,0.5)] shadow-[0_0_30px_rgba(30,141,222,0.04)] backdrop-blur-xl sm:w-[380px]"
            style={{ maxHeight: "min(520px, calc(100dvh - 100px))" }}
          >
            {/* ── Header ── */}
            <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3.5">
              <BotAvatar isThinking={isThinking} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-black tracking-tight text-white/85">
                  Feedback
                </p>
                <p className="flex items-center gap-1.5 text-[11px] font-semibold text-white/30">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400/70 shadow-[0_0_6px_rgba(52,211,153,0.3)]" />
                  {isEmpty
                    ? "Belum ada komentar"
                    : `${comments.length} komentar`}
                </p>
              </div>
            </div>

            {/* ── Body ── */}
            <div className="flex flex-1 flex-col overflow-y-auto overscroll-contain px-4 py-4 scroll-smooth">
              {/* Welcome message — shown compactly on first open */}
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, ...smoothSpring }}
                className="mb-4 text-center text-[13px] font-medium leading-relaxed text-white/40"
              >
                Hai! 👋 Tulis nama & kesan kamu ya...
              </motion.p>

              {/* ── Form ── */}
              <form onSubmit={handleSubmit} className="mb-4 space-y-2.5">
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama kamu"
                    required
                    className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-3.5 py-2.5 pl-9 text-sm text-white/80 placeholder-white/20 outline-none transition-all duration-200 focus:border-[#1E8DDE]/35 focus:bg-white/[0.06] focus:shadow-[0_0_0_3px_rgba(30,141,222,0.06)]"
                  />
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-white/25">
                    👤
                  </span>
                </div>
                <div className="relative">
                  <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Kesan / masukan..."
                    required
                    rows={2}
                    className="w-full resize-none rounded-xl border border-white/12 bg-white/[0.04] px-3.5 py-2.5 pl-9 text-sm text-white/80 placeholder-white/20 outline-none transition-all duration-200 focus:border-[#1E8DDE]/35 focus:bg-white/[0.06] focus:shadow-[0_0_0_3px_rgba(30,141,222,0.06)]"
                  />
                  <span className="pointer-events-none absolute left-3 top-2.5 text-sm text-white/25">
                    💬
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={!name.trim() || !message.trim() || isThinking}
                  className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#1E8DDE] to-[#00a6ff] py-2.5 text-sm font-black uppercase tracking-[0.06em] text-white transition-all duration-200 hover:shadow-[0_0_20px_rgba(30,141,222,0.25)] active:scale-[0.98] disabled:opacity-25 disabled:hover:shadow-none disabled:active:scale-100"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isThinking ? (
                      <>
                        <TypingDots />
                        <span className="text-[10px] font-semibold tracking-normal">
                          MENGIRIM...
                        </span>
                      </>
                    ) : submitted ? (
                      "✉️ TERKIRIM!"
                    ) : (
                      "KIRIM FEEDBACK"
                    )}
                  </span>
                  <span className="absolute inset-0 -translate-x-full rounded-xl bg-gradient-to-r from-[#1870b3] to-[#0090e0] transition-transform duration-300 group-hover:translate-x-0 group-disabled:translate-x-full" />
                </button>

                {/* ── Reaction bar ── */}
                <AnimatePresence>
                  {showReactions && <ReactionBar onReact={handleReaction} />}
                </AnimatePresence>
              </form>

              {/* ── Comments ── */}
              {!isEmpty && (
                <>
                  <div className="mb-3 flex items-center gap-2">
                    <div className="h-px flex-1 bg-white/[0.06]" />
                    <div className="flex items-center gap-1.5 text-[10px] font-semibold text-white/15">
                      <span className="inline-block h-1 w-1 rounded-full bg-white/20" />
                      Komentar
                      <span className="inline-block h-1 w-1 rounded-full bg-white/20" />
                    </div>
                    <div className="h-px flex-1 bg-white/[0.06]" />
                  </div>

                  <div className="space-y-2">
                    {comments.map((c, i) => (
                      <CommentBubble
                        key={c.id}
                        name={c.name}
                        message={c.message}
                        date={c.date}
                        index={i}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* ── Empty state ── */}
              {isEmpty && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                  className="flex flex-col items-center gap-2 pb-2 pt-1 text-center"
                >
                  <span className="text-xl opacity-60">💭</span>
                  <p className="text-[11px] font-medium text-white/20">
                    Jadilah yang pertama memberi kesan!
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Toggle button ── */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-4 left-4 z-[91] flex h-9 w-9 touch-none select-none items-center justify-center outline-none transition-transform duration-200 active:scale-85"
      >
        {isOpen ? (
          <motion.span
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={fastSpring}
            className="flex h-full w-full items-center justify-center rounded-xl bg-[#0c1f2e]/90 shadow-[0_4px_16px_rgba(0,0,0,0.3)] backdrop-blur-sm"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 18 18"
              fill="none"
              className="text-white/70"
            >
              <path
                d="M4 4L14 14M14 4L4 14"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </motion.span>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={fastSpring}
            className="relative h-full w-full"
          >
            <img
              src="/assets/characters/bot.png"
              alt="Feedback"
              className="h-full w-full animate-bob rounded-full object-cover shadow-[0_4px_16px_rgba(0,0,0,0.3)] ring-2 ring-white/15"
              draggable="false"
            />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-[1.5px] border-[#0c1f2e] bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
          </motion.div>
        )}
      </button>
    </>
  );
}
