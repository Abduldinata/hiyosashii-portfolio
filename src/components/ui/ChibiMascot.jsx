"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/layout/ThemeProvider";

/* ─── Supabase config ─── */
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";

async function fetchSupabase(method, body, tableName = "comments", query = "") {
  try {
    const url = query
      ? `${SUPABASE_URL}/rest/v1/${tableName}?${query}`
      : `${SUPABASE_URL}/rest/v1/${tableName}`;
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: "return=representation",
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) throw new Error(`Supabase ${res.status}`);

    /* DELETE — cukup cek status, gak perlu parsing JSON */
    if (method === "DELETE") return true;

    const data = await res.json();
    /* ── FIX: GET harus return array penuh, bukan cuma data[0] ── */
    if (Array.isArray(data)) {
      if (method === "GET") return data;
      return data.length > 0 ? data[0] : null;
    }
    return data;
  } catch (e) {
    console.warn("[Supabase]", e?.message);
    return null;
  }
}

/* ─── Upload avatar file to Supabase Storage ─── */
const AVATAR_BUCKET = "avatars";

async function uploadAvatarToSupabase(file, sessionToken) {
  const ext = file.name.split(".").pop() || "png";
  const filename = `avatar_${sessionToken}_${Date.now()}.${ext}`;
  const uploadUrl = `${SUPABASE_URL}/storage/v1/object/${AVATAR_BUCKET}/${filename}`;
  const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${AVATAR_BUCKET}/${filename}`;

  try {
    const res = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": file.type,
        "x-upsert": "true",
      },
      body: file,
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.warn("[Supabase Upload]", res.status, errText);
      return null;
    }

    return publicUrl;
  } catch (e) {
    console.warn("[Supabase Upload]", e?.message);
    return null;
  }
}

/* ─── Keys ─── */
const STORAGE_KEY = "hiyo-comments";
const SESSION_KEY = "hiyo-session";
const COLOR_KEY = "hiyo-avatar-color";
const RATED_KEY = "hiyo-rated";
const AVATAR_URL_KEY = "hiyo-avatar-url";

/* ─── Dual storage: localStorage + cookie (biar survive clear cache) ─── */
function storageGet(key) {
  if (typeof window === "undefined") return null;
  try {
    const ls = localStorage.getItem(key);
    if (ls !== null) return ls;
  } catch {}
  /* fallback ke cookie */
  try {
    const match = document.cookie.match("(^| )" + key + "=([^;]+)");
    if (match) return decodeURIComponent(match[2]);
  } catch {}
  return null;
}

function storageSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {}
  try {
    document.cookie =
      key +
      "=" +
      encodeURIComponent(value) +
      "; path=/; max-age=31536000; SameSite=Lax";
  } catch {}
}

function storageRemove(key) {
  try {
    localStorage.removeItem(key);
  } catch {}
  try {
    document.cookie = key + "=; path=/; max-age=0; SameSite=Lax";
  } catch {}
}

const AVATAR_COLORS = [
  "from-[#1E8DDE] to-[#00d4ff]",
  "from-[#f472b6] to-[#ec4899]",
  "from-[#a78bfa] to-[#7c3aed]",
  "from-[#34d399] to-[#10b981]",
  "from-[#fbbf24] to-[#f59e0b]",
  "from-[#f97316] to-[#ea580c]",
  "from-[#06b6d4] to-[#0891b2]",
  "from-[#8b5cf6] to-[#6d28d9]",
];

const AVATAR_BG_STYLES = [
  "linear-gradient(135deg, #1E8DDE, #00d4ff)",
  "linear-gradient(135deg, #f472b6, #ec4899)",
  "linear-gradient(135deg, #a78bfa, #7c3aed)",
  "linear-gradient(135deg, #34d399, #10b981)",
  "linear-gradient(135deg, #fbbf24, #f59e0b)",
  "linear-gradient(135deg, #f97316, #ea580c)",
  "linear-gradient(135deg, #06b6d4, #0891b2)",
  "linear-gradient(135deg, #8b5cf6, #6d28d9)",
];

/* ── Device fingerprint — survive meski localStorage + cookies dibersihin ── */
function getDeviceFingerprint() {
  if (typeof window === "undefined") return "";
  try {
    const parts = [
      navigator.userAgent,
      navigator.language,
      navigator.platform,
      screen.width + "x" + screen.height + "x" + screen.colorDepth,
      new Date().getTimezoneOffset(),
      navigator.hardwareConcurrency || "",
    ];
    const raw = parts.join("|||");
    let hash = 0;
    for (let i = 0; i < raw.length; i++) {
      const c = raw.charCodeAt(i);
      hash = (hash << 5) - hash + c;
      hash = hash & hash;
    }
    return "device_" + Math.abs(hash).toString(36);
  } catch {
    return "";
  }
}

function getSessionToken() {
  if (typeof window === "undefined") return "";
  try {
    /* 1) Coba storage dulu (localStorage + cookie) */
    let token = storageGet(SESSION_KEY);
    if (token) {
      /* simpan ulang ke storage biar refresh expire time */
      storageSet(SESSION_KEY, token);
      return token;
    }

    /* 2) Fallback: device fingerprint — gak butuh storage sama sekali */
    const fp = getDeviceFingerprint();
    if (fp) {
      token = "session_" + fp;
      storageSet(SESSION_KEY, token);
      return token;
    }

    /* 3) Terakhir: random biasa */
    token =
      "session_" +
      Date.now().toString(36) +
      Math.random().toString(36).substring(2, 10);
    storageSet(SESSION_KEY, token);
    return token;
  } catch {
    return "";
  }
}

function getAvatarColor() {
  if (typeof window === "undefined") return 0;
  try {
    const saved = storageGet(COLOR_KEY);
    if (saved !== null) {
      const idx = parseInt(saved, 10);
      if (!isNaN(idx) && idx >= 0 && idx < AVATAR_COLORS.length) return idx;
    }
    return Math.floor(Math.random() * AVATAR_COLORS.length);
  } catch {
    return 0;
  }
}

function getSavedAvatarUrl() {
  if (typeof window === "undefined") return null;
  try {
    return storageGet(AVATAR_URL_KEY);
  } catch {
    return null;
  }
}

function saveAvatarUrl(url) {
  try {
    if (url) storageSet(AVATAR_URL_KEY, url);
    else storageRemove(AVATAR_URL_KEY);
  } catch {}
}

function getSessionRated() {
  if (typeof window === "undefined") return false;
  try {
    return storageGet(RATED_KEY) === "true";
  } catch {
    return false;
  }
}

function setSessionRated() {
  try {
    storageSet(RATED_KEY, "true");
  } catch {}
}

/* ── Komentar lokal (tetap localStorage aja, karena data besar) ── */
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

/* ── Star rating display (small, inline) ── */
function StarRating({ rating, size = "sm" }) {
  if (!rating) return null;
  const sizeClass = size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5";
  return (
    <div className="flex items-center gap-px">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${sizeClass} ${
            star <= rating ? "text-amber-400" : "text-white/10"
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

/* ── Comment bubble ── */
function CommentBubble({
  name,
  message,
  date,
  index,
  isDark,
  avatarColor,
  avatarUrl,
  rating,
  isOwner,
  onEdit,
  onDelete,
}) {
  const bgStyle = AVATAR_BG_STYLES[avatarColor] || AVATAR_BG_STYLES[0];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.035, ...smoothSpring }}
      className={`group relative overflow-hidden rounded-xl border p-3 transition-all duration-200 ${
        isDark
          ? "border-white/8 bg-white/[0.035] hover:border-white/12 hover:bg-white/6"
          : "border-gray-200/50 bg-white/85 hover:border-gray-300/70 hover:bg-white"
      }`}
      style={{
        boxShadow: isDark
          ? "inset 0 1px 0 rgba(255,255,255,0.04), 0 1px 3px rgba(0,0,0,0.1)"
          : "inset 0 1px 0 rgba(255,255,255,0.8), 0 1px 4px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.02)",
      }}
    >
      {/* Noise grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015] dark:opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />
      {/* Left accent stripe — avatar color */}
      <div
        className="absolute left-0 top-2 bottom-2 w-[2.5px] rounded-r-full opacity-30 transition-opacity duration-300 group-hover:opacity-60"
        style={{ background: bgStyle }}
      />
      <div className="flex items-center justify-between gap-2 relative z-10">
        <span
          className={`flex items-center gap-1.5 truncate text-sm font-bold ${
            isDark ? "text-white/75" : "text-[#0f3b5e]"
          }`}
        >
          {/* Avatar dengan ring glow */}
          <span className="relative">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt=""
                className="h-5 w-5 shrink-0 rounded-full object-cover ring-1 ring-white/20"
              />
            ) : (
              <span
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px] font-black text-white ring-1 ring-white/20"
                style={{ background: bgStyle }}
              >
                {name.charAt(0).toUpperCase()}
              </span>
            )}
          </span>
          {name}
          {isOwner && (
            <span
              className={`ml-0.5 rounded-full px-1.5 py-px text-[8px] font-bold uppercase tracking-wider ${
                isDark
                  ? "bg-[#1E8DDE]/20 text-[#00d4ff]"
                  : "bg-[#1E8DDE]/10 text-[#1E8DDE]"
              }`}
            >
              kamu
            </span>
          )}
        </span>
        <div className="flex shrink-0 items-center gap-1.5 relative z-10">
          {rating > 0 && <StarRating rating={rating} />}
          <span
            className={`text-[10px] font-medium ${
              isDark ? "text-white/15" : "text-slate-400"
            }`}
          >
            {date}
          </span>
        </div>
      </div>
      <p
        className={`relative z-10 mt-1.5 text-sm leading-relaxed ${
          isDark ? "text-gray-300" : "text-[#1a567a]"
        }`}
      >
        {message}
      </p>
      {isOwner && (
        <div className="absolute right-2 top-2 z-20 flex gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <button
            type="button"
            onClick={onEdit}
            className={`flex h-5 w-5 items-center justify-center rounded-md text-[10px] font-bold backdrop-blur-sm transition-all duration-200 hover:scale-110 ${
              isDark
                ? "bg-white/8 text-white/40 hover:bg-white/15 hover:text-white/70"
                : "bg-white/80 text-slate-400 hover:bg-gray-100 hover:text-slate-600"
            }`}
            aria-label="Edit komentar"
          >
            ✏️
          </button>
          <button
            type="button"
            onClick={onDelete}
            className={`flex h-5 w-5 items-center justify-center rounded-md text-[10px] font-bold backdrop-blur-sm transition-all duration-200 hover:scale-110 ${
              isDark
                ? "bg-white/8 text-white/40 hover:bg-red-500/20 hover:text-red-400"
                : "bg-white/80 text-slate-400 hover:bg-red-50 hover:text-red-500"
            }`}
            aria-label="Hapus komentar"
          >
            🗑️
          </button>
        </div>
      )}
    </motion.div>
  );
}

/* ── Bot avatar ── */
function BotAvatar({ isThinking, isDark }) {
  return (
    <div
      className={`relative h-8 w-8 shrink-0 overflow-hidden rounded-full border shadow-lg ${
        isDark
          ? "border-white/15 bg-[#0a1e30] shadow-black/20"
          : "border-gray-200/60 bg-[#e8e0d5] shadow-gray-300/20"
      }`}
    >
      <img
        src="/assets/characters/bot.png"
        alt=""
        className={`h-full w-full object-cover ${
          isDark ? "" : "brightness-[1.15] contrast-[0.9]"
        }`}
        style={{
          animation: isThinking
            ? "hiyoBotThink 1s ease-in-out infinite"
            : undefined,
        }}
      />
      <span
        className={`absolute inset-0 rounded-full ${
          isDark ? "bg-white/5" : "bg-black/[0.03]"
        }`}
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
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [comments, setComments] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [rating, setRating] = useState(0);
  const [rated, setRated] = useState(getSessionRated());
  const [editId, setEditId] = useState(null);
  const [avatarColorIdx, setAvatarColorIdx] = useState(getAvatarColor());
  const [avatarUrl, setAvatarUrl] = useState(getSavedAvatarUrl());
  const [uploading, setUploading] = useState(false);
  const sessionToken = getSessionToken();
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const [btnPos, setBtnPos] = useState({ x: 16, y: 16 });
  const dragRef = useRef({
    dragging: false,
    startX: 0,
    startY: 0,
    startPosX: 0,
    startPosY: 0,
  });

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
            rating: c.rating,
            avatar_color: c.avatar_color,
            avatar_url: c.avatar_url,
            session_token: c.session_token,
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

  /* ── Handle file selection & upload ── */
  const handleAvatarUpload = useCallback(
    async (e) => {
      const file = e.target?.files?.[0];
      if (!file) return;

      /* Validate type */
      const allowed = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!allowed.includes(file.type)) {
        alert("Hanya file gambar yang diperbolehkan (JPG, PNG, GIF, WebP)");
        e.target.value = "";
        return;
      }

      /* Validate size (max 2MB) */
      if (file.size > 2 * 1024 * 1024) {
        alert("Ukuran file maksimal 2MB");
        e.target.value = "";
        return;
      }

      setUploading(true);

      /* Show local preview immediately */
      const localUrl = URL.createObjectURL(file);
      setAvatarUrl(localUrl);

      /* Upload to Supabase */
      const publicUrl = await uploadAvatarToSupabase(file, sessionToken);

      if (publicUrl) {
        setAvatarUrl(publicUrl);
        saveAvatarUrl(publicUrl);
      } else {
        /* Upload failed — keep local preview for this session */
        saveAvatarUrl(localUrl);
      }

      setUploading(false);
      e.target.value = "";
    },
    [sessionToken],
  );

  /* ── Remove uploaded avatar ── */
  const removeAvatar = useCallback(() => {
    setAvatarUrl(null);
    saveAvatarUrl(null);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!name.trim() || !message.trim()) return;

      setIsThinking(true);

      await new Promise((r) => setTimeout(r, 600));

      if (editId) {
        /* ── UPDATE existing comment ── */
        const entry = {
          name: name.trim(),
          message: message.trim(),
          rating: rating || null,
          avatar_color: avatarColorIdx,
          avatar_url: avatarUrl || null,
        };
        await fetchSupabase("PATCH", entry, "comments", `id=eq.${editId}`);

        setComments((prev) =>
          prev.map((c) =>
            c.id === editId
              ? {
                  ...c,
                  name: entry.name,
                  message: entry.message,
                  rating: entry.rating,
                  avatar_color: entry.avatar_color,
                  avatar_url: entry.avatar_url,
                }
              : c,
          ),
        );
        saveLocalComments(
          comments.map((c) => (c.id === editId ? { ...c, ...entry } : c)),
        );
        setEditId(null);
      } else {
        /* ── CREATE new comment ── */
        const entry = {
          name: name.trim(),
          message: message.trim(),
          rating: rating || null,
          session_token: sessionToken,
          avatar_color: avatarColorIdx,
          avatar_url: avatarUrl || null,
        };
        const result = await fetchSupabase("POST", entry);
        const serverId = result?.id || Date.now();

        const newComment = {
          id: serverId,
          name: entry.name,
          message: entry.message,
          rating: entry.rating,
          avatar_color: entry.avatar_color,
          avatar_url: entry.avatar_url,
          session_token: entry.session_token,
          date: new Date().toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
        };

        const updated = [newComment, ...comments];
        setComments(updated);
        saveLocalComments(updated);

        /* Lock rating once submitted */
        if (rating > 0) {
          setRated(true);
          setSessionRated();
        }
      }

      setName("");
      setMessage("");
      setRating(0);
      setSubmitted(true);
      setIsThinking(false);
    },
    [
      editId,
      name,
      message,
      rating,
      avatarColorIdx,
      avatarUrl,
      sessionToken,
      comments,
    ],
  );

  /* ── Enter edit mode ── */
  const handleEdit = useCallback((comment) => {
    setName(comment.name);
    setMessage(comment.message);
    setRating(comment.rating || 0);
    setAvatarColorIdx(comment.avatar_color ?? getAvatarColor());
    setAvatarUrl(comment.avatar_url || getSavedAvatarUrl());
    setEditId(comment.id);
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  /* ── Cancel edit ── */
  const cancelEdit = useCallback(() => {
    setEditId(null);
    setName("");
    setMessage("");
    setRating(0);
    setAvatarColorIdx(getAvatarColor());
    setAvatarUrl(getSavedAvatarUrl());
  }, []);

  /* ── Delete comment ── */
  const handleDelete = useCallback(
    async (id) => {
      const ok = await fetchSupabase("DELETE", null, "comments", `id=eq.${id}`);
      if (!ok) {
        alert(
          "Gagal menghapus komentar. Pastikan koneksi internet kamu stabil.",
        );
        return;
      }
      const deleted = comments.find((c) => c.id === id);
      const updated = comments.filter((c) => c.id !== id);
      setComments(updated);
      saveLocalComments(updated);

      /* Reset rating — kasih kesempatan rate lagi di komentar baru */
      if (deleted && rated) {
        setRated(false);
        try {
          storageRemove(RATED_KEY);
        } catch {}
      }
    },
    [comments, rated],
  );

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
            className={`fixed z-90 flex w-[360px] flex-col overflow-hidden rounded-2xl border shadow-[0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:w-[440px] ${
              isDark
                ? "border-white/12 bg-[#0c1f2e]/95 shadow-[0_0_30px_rgba(30,141,222,0.04)]"
                : "border-gray-200 bg-white/90 shadow-lg"
            }`}
            style={{
              left: btnPos.x,
              bottom: btnPos.y + 64,
              maxHeight: "min(520px, calc(100dvh - 100px))",
            }}
          >
            {/* ── Header ── */}
            <div
              className={`flex items-center gap-3 border-b px-4 py-3.5 ${
                isDark ? "border-white/6" : "border-gray-200"
              }`}
            >
              <BotAvatar isThinking={isThinking} isDark={isDark} />
              <div className="min-w-0 flex-1">
                <p
                  className={`text-sm font-black tracking-tight ${
                    isDark ? "text-white/85" : "text-[#0f3b5e]"
                  }`}
                >
                  Feedback
                </p>
                <p
                  className={`flex items-center gap-1.5 text-[11px] font-semibold ${
                    isDark ? "text-white/30" : "text-slate-500"
                  }`}
                >
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400/70 shadow-[0_0_6px_rgba(52,211,153,0.3)]" />
                  {isEmpty
                    ? "Belum ada komentar"
                    : `${comments.length} komentar`}
                </p>
              </div>
              {editId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className={`text-[10px] font-semibold transition-colors ${
                    isDark
                      ? "text-white/30 hover:text-white/60"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  Batal
                </button>
              )}
            </div>

            {/* ── Body ── */}
            <div className="flex flex-1 flex-col overflow-y-auto overscroll-contain px-4 py-4 scroll-smooth">
              {/* Welcome / edit banner */}
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, ...smoothSpring }}
                className={`mb-4 text-center text-[13px] font-medium leading-relaxed ${
                  isDark ? "text-white/40" : "text-slate-500"
                }`}
              >
                {editId
                  ? "✏️ Edit komentar kamu..."
                  : "Hai! 👋 Tulis nama, kesan & rating ya..."}
              </motion.p>

              {/* ── Form ── */}
              <form onSubmit={handleSubmit} className="mb-5 space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama kamu"
                    required
                    className={`w-full rounded-xl border px-3.5 py-2.5 pl-9 text-sm outline-none transition-all duration-200 focus:border-[#1E8DDE]/35 focus:shadow-[0_0_0_3px_rgba(30,141,222,0.06)] ${
                      isDark
                        ? "border-white/12 bg-white/4 text-white/80 placeholder-white/20 focus:bg-white/6"
                        : "border-gray-200 bg-gray-100/80 text-[#1a567a] placeholder-slate-400 focus:bg-white"
                    }`}
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
                    className={`w-full resize-none rounded-xl border px-3.5 py-2.5 pl-9 text-sm outline-none transition-all duration-200 focus:border-[#1E8DDE]/35 focus:shadow-[0_0_0_3px_rgba(30,141,222,0.06)] ${
                      isDark
                        ? "border-white/12 bg-white/4 text-white/80 placeholder-white/20 focus:bg-white/6"
                        : "border-gray-200 bg-gray-100/80 text-[#1a567a] placeholder-slate-400 focus:bg-white"
                    }`}
                  />
                  <span className="pointer-events-none absolute left-3 top-2.5 text-sm text-white/25">
                    💬
                  </span>
                </div>

                {/* ── Hidden file input ── */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />

                {/* ── Avatar (Foto + Warna) ── */}
                <div className="pt-1">
                  <span
                    className={`block text-[10px] font-semibold mb-1.5 ${
                      isDark ? "text-white/25" : "text-slate-400"
                    }`}
                  >
                    Avatar
                  </span>
                  <div className="flex items-center gap-3">
                    {/* Preview — cukup lihat, gak bisa diklik */}
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                      {avatarUrl ? (
                        <img
                          src={avatarUrl}
                          alt=""
                          className={`h-full w-full object-cover ${
                            uploading ? "opacity-50" : ""
                          }`}
                        />
                      ) : (
                        <span
                          className="flex h-full w-full items-center justify-center rounded-full text-sm font-black text-white"
                          style={{
                            background:
                              AVATAR_BG_STYLES[avatarColorIdx] ||
                              AVATAR_BG_STYLES[0],
                          }}
                        >
                          {name ? name.charAt(0).toUpperCase() : "?"}
                        </span>
                      )}
                      {uploading && (
                        <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 text-[10px] font-bold text-white">
                          ...
                        </span>
                      )}
                    </div>

                    {/* Upload button + remove */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className={`rounded-lg border px-3 py-1.5 text-[11px] font-semibold transition-all duration-200 hover:scale-105 disabled:opacity-40 ${
                          isDark
                            ? "border-white/12 bg-white/4 text-white/60 hover:bg-white/8 hover:text-white/80"
                            : "border-gray-200 bg-gray-50 text-slate-500 hover:bg-gray-100 hover:text-slate-700"
                        }`}
                      >
                        {avatarUrl ? "Ganti" : "Upload"}
                      </button>
                      {avatarUrl && (
                        <button
                          type="button"
                          onClick={removeAvatar}
                          className={`rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold transition-all duration-200 hover:scale-105 ${
                            isDark
                              ? "border-white/12 text-white/30 hover:border-red-400/30 hover:text-red-400"
                              : "border-gray-200 text-slate-400 hover:border-red-200 hover:text-red-500"
                          }`}
                        >
                          Hapus
                        </button>
                      )}
                    </div>

                    {/* Color picker — hanya kalau belum upload foto */}
                    {!avatarUrl && (
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[10px] font-semibold ${
                            isDark ? "text-white/25" : "text-slate-400"
                          }`}
                        >
                          Warna
                        </span>
                        <div className="flex gap-1">
                          {AVATAR_COLORS.map((_, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setAvatarColorIdx(idx);
                                storageSet(COLOR_KEY, String(idx));
                              }}
                              className={`h-4 w-4 rounded-full transition-all duration-200 hover:scale-125 ${
                                avatarColorIdx === idx
                                  ? "ring-2 ring-white scale-110"
                                  : "opacity-40 hover:opacity-100"
                              }`}
                              style={{ background: AVATAR_BG_STYLES[idx] }}
                              aria-label={`Warna ${idx + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* ── Separator ── */}
                <div
                  className={`h-px ${isDark ? "bg-white/6" : "bg-gray-200"}`}
                />

                {/* ── Rating — locked after first submission (seperti Gojek) ── */}
                <div className="flex items-center justify-between pt-0.5">
                  <span
                    className={`text-[10px] font-semibold ${
                      isDark ? "text-white/25" : "text-slate-400"
                    }`}
                  >
                    Rating
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => {
                            if (!rated || editId) setRating(star);
                          }}
                          disabled={rated && !editId}
                          className={`flex h-7 w-7 items-center justify-center transition-all duration-200 ${
                            rated && !editId
                              ? "cursor-not-allowed opacity-40"
                              : "hover:scale-125"
                          }`}
                          aria-label={`${star} bintang`}
                        >
                          <svg
                            className={`h-5 w-5 ${
                              star <= rating
                                ? "text-amber-400 drop-shadow-[0_0_3px_rgba(251,191,36,0.4)]"
                                : isDark
                                  ? "text-white/15"
                                  : "text-slate-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        </button>
                      ))}
                    </div>
                    {rated && !editId && (
                      <span
                        className={`text-[9px] font-semibold ${
                          isDark ? "text-white/20" : "text-slate-400"
                        }`}
                      >
                        ✓ 1x
                      </span>
                    )}
                    {!rated && (
                      <span
                        className={`text-[9px] ${
                          isDark ? "text-white/15" : "text-slate-300"
                        }`}
                      >
                        opsional
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!name.trim() || !message.trim() || isThinking}
                  className="group relative w-full overflow-hidden rounded-xl bg-linear-to-r from-[#1E8DDE] to-[#00a6ff] py-2.5 text-sm font-black uppercase tracking-[0.06em] text-white transition-all duration-200 hover:shadow-[0_0_20px_rgba(30,141,222,0.25)] active:scale-[0.98] disabled:opacity-25 disabled:hover:shadow-none disabled:active:scale-100"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isThinking ? (
                      <>
                        <TypingDots />
                        <span className="text-[10px] font-semibold tracking-normal">
                          {editId ? "MENYIMPAN..." : "MENGIRIM..."}
                        </span>
                      </>
                    ) : submitted && !editId ? (
                      <motion.span
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                      >
                        ✉️ TERKIRIM!
                      </motion.span>
                    ) : editId ? (
                      "SIMPAN EDIT"
                    ) : (
                      "KIRIM FEEDBACK"
                    )}
                  </span>
                  <span className="absolute inset-0 -translate-x-full rounded-xl bg-linear-to-r from-[#1870b3] to-[#0090e0] transition-transform duration-300 group-hover:translate-x-0 group-disabled:translate-x-full" />
                </button>

                {/* ── Success message ── */}
                <AnimatePresence>
                  {submitted && !editId && (
                    <motion.p
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-center text-[10px] font-semibold text-emerald-400"
                    >
                      ✅ Komentar & rating terkirim!
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>

              {/* ── Comments ── */}
              {!isEmpty && (
                <>
                  <div className="mb-3 flex items-center gap-2">
                    <div
                      className={`h-px flex-1 ${isDark ? "bg-white/6" : "bg-gray-200"}`}
                    />
                    <div
                      className={`flex items-center gap-1.5 text-[10px] font-semibold ${isDark ? "text-white/15" : "text-slate-400"}`}
                    >
                      <span
                        className={`inline-block h-1 w-1 rounded-full ${isDark ? "bg-white/20" : "bg-slate-300"}`}
                      />
                      Komentar
                      <span
                        className={`inline-block h-1 w-1 rounded-full ${isDark ? "bg-white/20" : "bg-slate-300"}`}
                      />
                    </div>
                    <div
                      className={`h-px flex-1 ${isDark ? "bg-white/6" : "bg-gray-200"}`}
                    />
                  </div>

                  <div className="space-y-2">
                    {comments.map((c, i) => (
                      <CommentBubble
                        key={c.id}
                        name={c.name}
                        message={c.message}
                        date={c.date}
                        rating={c.rating}
                        avatarColor={c.avatar_color}
                        avatarUrl={c.avatar_url}
                        index={i}
                        isDark={isDark}
                        isOwner={c.session_token === sessionToken}
                        onEdit={() => handleEdit(c)}
                        onDelete={() => handleDelete(c.id)}
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
                  <p
                    className={`text-[11px] font-medium ${isDark ? "text-white/20" : "text-slate-400"}`}
                  >
                    Jadilah yang pertama memberi kesan & rating!
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Toggle button — bisa di-drag ke mana aja ── */}
      <button
        type="button"
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          dragRef.current = {
            dragging: false,
            startX: e.clientX,
            startY: e.clientY,
            startPosX: btnPos.x,
            startPosY: btnPos.y,
          };
        }}
        onPointerMove={(e) => {
          const d = dragRef.current;
          if (!d.startX && !d.startY) return;
          const dx = e.clientX - d.startX;
          const dy = d.startY - e.clientY;
          if (Math.abs(dx) > 3 || Math.abs(dy) > 3) d.dragging = true;
          if (!d.dragging) return;
          setBtnPos({
            x: Math.max(4, Math.min(window.innerWidth - 44, d.startPosX + dx)),
            y: Math.max(4, Math.min(window.innerHeight - 44, d.startPosY + dy)),
          });
        }}
        onPointerUp={(e) => {
          const wasDragging = dragRef.current.dragging;
          dragRef.current = {
            dragging: false,
            startX: 0,
            startY: 0,
            startPosX: 0,
            startPosY: 0,
          };
          /* geser = gerakin bot, tekan = toggle panel */
          if (!wasDragging) {
            setIsOpen((prev) => !prev);
          }
        }}
        className={`fixed z-91 flex h-9 w-9 touch-none select-none items-center justify-center outline-none transition-transform duration-200 active:scale-85`}
        style={{ left: btnPos.x, bottom: btnPos.y }}
      >
        {isOpen ? (
          <motion.span
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={fastSpring}
            className={`flex h-full w-full items-center justify-center rounded-xl backdrop-blur-sm ${
              isDark
                ? "bg-[#0c1f2e]/90 shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
                : "bg-white/90 shadow-[0_4px_16px_rgba(0,0,0,0.1)] border border-gray-200"
            }`}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 18 18"
              fill="none"
              className={isDark ? "text-white/70" : "text-[#0f3b5e]/70"}
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
