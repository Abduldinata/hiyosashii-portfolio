"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/layout/ThemeProvider";

export default function LagPopup() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [status, setStatus] = useState("online"); // "online" | "offline" | "lag"
  const [show, setShow] = useState(false);
  const heartbeatRef = useRef(null);
  const lastBeatRef = useRef(Date.now());

  // Track online/offline status
  useEffect(() => {
    const goOnline = () => {
      setStatus("online");
      setShow(false);
    };
    const goOffline = () => {
      setStatus("offline");
      setShow(true);
    };

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    // Initial check
    if (!navigator.onLine) {
      setStatus("offline");
      setShow(true);
    }

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  // Heartbeat check for lag detection
  useEffect(() => {
    const check = () => {
      const now = Date.now();
      lastBeatRef.current = now;
    };

    // Ping every 5s — if no beat within 10s, consider it lag
    const interval = setInterval(() => {
      const elapsed = Date.now() - lastBeatRef.current;
      if (elapsed > 12000 && status === "online") {
        setStatus("lag");
        setShow(true);
      } else if (elapsed < 8000 && status === "lag") {
        setStatus("online");
        setShow(false);
      }
      lastBeatRef.current = Date.now();
    }, 5000);

    // Simulate beat on user interaction as a sign of liveliness
    const onActivity = () => {
      lastBeatRef.current = Date.now();
    };
    window.addEventListener("mousemove", onActivity, { passive: true });
    window.addEventListener("scroll", onActivity, { passive: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", onActivity);
      window.removeEventListener("scroll", onActivity);
    };
  }, [status]);

  const handleDismiss = useCallback(() => setShow(false), []);

  const accentColor = isDark ? "#5DC3F5" : "#1E8DDE";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="lag-popup"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={`fixed bottom-6 left-6 z-[100] max-w-[280px] rounded-2xl border p-4 shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-md sm:bottom-8 sm:left-8 ${
            isDark
              ? "border-white/30 bg-[#0a1e30]/95"
              : "border-gray-200/80 bg-white/95 shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
          }`}
        >
          <div className="flex items-start gap-3">
            {/* Lag/Lost chibi icon */}
            <div
              className={`h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 ${
                isDark ? "border-white/20" : "border-gray-200"
              }`}
            >
              <img
                src="/assets/characters/lag.png"
                alt=""
                className={`h-full w-full object-cover ${
                  status === "offline" ? "" : "animate-pulse"
                }`}
              />
            </div>

            <div className="min-w-0 flex-1">
              <p
                className="text-sm font-black uppercase tracking-[0.12em]"
                style={{ color: accentColor }}
              >
                {status === "offline" ? "Offline" : "Lag Detect"}
              </p>
              <p
                className={`mt-1 text-xs font-semibold leading-relaxed ${
                  isDark ? "text-white/70" : "text-gray-600"
                }`}
              >
                {status === "offline"
                  ? "Koneksi internet terputus. Beberapa konten mungkin tidak bisa dimuat."
                  : "Koneksi terasa lambat. Beberapa fitur mungkin mengalami delay."}
              </p>

              {/* Animated dots like reconnect */}
              <div
                className="mt-3 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.15em]"
                style={{ color: `${accentColor}80` }}
              >
                <span>Reconnecting</span>
                <span className="flex gap-0.5">
                  <span className="h-1 w-1 animate-bounce rounded-full bg-current [animation-delay:0ms]" />
                  <span className="h-1 w-1 animate-bounce rounded-full bg-current [animation-delay:150ms]" />
                  <span className="h-1 w-1 animate-bounce rounded-full bg-current [animation-delay:300ms]" />
                </span>
              </div>
            </div>

            {/* Close button */}
            <button
              type="button"
              onClick={handleDismiss}
              className={`-mr-1 -mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors ${
                isDark
                  ? "text-white/40 hover:bg-white/10 hover:text-white/80"
                  : "text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              }`}
              aria-label="Tutup"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
