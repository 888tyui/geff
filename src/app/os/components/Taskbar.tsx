"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, Image as ImageIcon, Laugh, Dice6, Gamepad2, Info, Home, Cherry, Rocket, Crown, Terminal, BarChart3, Bug } from "lucide-react";
import type { AppWindow } from "../types";
import type { LucideIcon } from "lucide-react";

const startMenuApps: { id: string; title: string; icon: LucideIcon }[] = [
  { id: "wallet", title: "Wallet", icon: Wallet },
  { id: "gallery", title: "Gallery", icon: ImageIcon },
  { id: "meme-gallery", title: "Memes", icon: Laugh },
  { id: "roulette", title: "Roulette", icon: Dice6 },
  { id: "random-game", title: "geff Run", icon: Gamepad2 },
  { id: "about", title: "About geff", icon: Info },
  { id: "savanna-spins", title: "Savanna Spins", icon: Cherry },
  { id: "crypto-rockets", title: "Crypto Rockets", icon: Rocket },
  { id: "golden-geff", title: "Golden Geff", icon: Crown },
  { id: "terminal", title: "Terminal", icon: Terminal },
  { id: "token-stats", title: "Token Stats", icon: BarChart3 },
  { id: "snake-game", title: "Snake", icon: Bug },
];

export default function Taskbar({
  windows,
  activeWindowId,
  onFocusWindow,
  onOpenApp,
}: {
  windows: AppWindow[];
  activeWindowId: string | null;
  onFocusWindow: (id: string) => void;
  onOpenApp: (appId: string, title: string) => void;
}) {
  const [time, setTime] = useState("");
  const [startOpen, setStartOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };
    update();
    const timer = setInterval(update, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {startOpen && (
          <div className="fixed inset-0 z-40" onClick={() => setStartOpen(false)}>
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="absolute bottom-[52px] left-2 w-64 bg-[#1a1209]/95 backdrop-blur-xl border border-[#8B5E3C]/30 rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-[#8B5E3C]/20">
                <p className="font-bold text-[#E88B3A] text-lg" style={{ fontFamily: "'Cimo Ones', cursive" }}>
                  geffOS
                </p>
                <p className="text-white/30 text-xs">v1.0.0</p>
              </div>
              <div className="p-2">
                {startMenuApps.map((app, i) => (
                  <motion.button
                    key={app.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => { onOpenApp(app.id, app.title); setStartOpen(false); }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all text-sm text-left"
                  >
                    <app.icon size={16} className="text-[#E88B3A]/60" />
                    {app.title}
                  </motion.button>
                ))}
              </div>
              <div className="p-2 border-t border-[#8B5E3C]/20">
                <Link
                  href="/"
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all text-sm"
                >
                  <Home size={16} className="text-white/30" />
                  Back to Home
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-0 left-0 right-0 h-[52px] bg-[#0D0906]/90 backdrop-blur-xl border-t border-[#8B5E3C]/20 z-50 flex items-center px-2 gap-1">
        <button
          onClick={() => setStartOpen(!startOpen)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
            startOpen
              ? "bg-[#E88B3A]/20 text-[#E88B3A]"
              : "hover:bg-white/10 text-white/60 hover:text-white"
          }`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />
          </svg>
          <span className="text-xs font-bold hidden sm:inline" style={{ fontFamily: "'Cimo Ones', cursive" }}>
            geff
          </span>
        </button>

        <div className="w-px h-6 bg-white/10 mx-1" />

        <div className="flex-1 flex items-center gap-1 overflow-x-auto">
          <AnimatePresence>
            {windows.map((w) => (
              <motion.button
                key={w.id}
                initial={{ scale: 0.8, opacity: 0, width: 0 }}
                animate={{ scale: 1, opacity: 1, width: "auto" }}
                exit={{ scale: 0.8, opacity: 0, width: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                onClick={() => onFocusWindow(w.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all max-w-[160px] truncate ${
                  activeWindowId === w.id && !w.minimized
                    ? "bg-[#E88B3A]/15 text-white border-b-2 border-[#E88B3A]"
                    : "text-white/40 hover:text-white hover:bg-white/8"
                } ${w.minimized ? "opacity-40" : ""}`}
              >
                <span className="truncate">{w.title}</span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-3 px-3">
          <span className="text-white/30 text-[11px] font-mono">{time}</span>
        </div>
      </div>
    </>
  );
}
