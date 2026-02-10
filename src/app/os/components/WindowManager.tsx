"use client";

import { useRef, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { AppWindow } from "../types";
import WalletApp from "../apps/WalletApp";
import GalleryApp from "../apps/GalleryApp";
import MemeGalleryApp from "../apps/MemeGalleryApp";
import RouletteApp from "../apps/RouletteApp";
import RandomGameApp from "../apps/RandomGameApp";
import AboutApp from "../apps/AboutApp";
import SavannaSpinsApp from "../apps/SavannaSpinsApp";
import CryptoRocketsApp from "../apps/CryptoRocketsApp";
import GoldenGeffApp from "../apps/GoldenGeffApp";
import TerminalApp from "../apps/TerminalApp";
import TokenStatsApp from "../apps/TokenStatsApp";
import SnakeGameApp from "../apps/SnakeGameApp";

function getAppContent(appId: string) {
  switch (appId) {
    case "wallet":
      return <WalletApp />;
    case "gallery":
      return <GalleryApp />;
    case "meme-gallery":
      return <MemeGalleryApp />;
    case "roulette":
      return <RouletteApp />;
    case "random-game":
      return <RandomGameApp />;
    case "about":
      return <AboutApp />;
    case "savanna-spins":
      return <SavannaSpinsApp />;
    case "crypto-rockets":
      return <CryptoRocketsApp />;
    case "golden-geff":
      return <GoldenGeffApp />;
    case "terminal":
      return <TerminalApp />;
    case "token-stats":
      return <TokenStatsApp />;
    case "snake-game":
      return <SnakeGameApp />;
    default:
      return <div className="p-4 text-white/50">Unknown app</div>;
  }
}

function Window({
  window: w,
  isActive,
  zIndex,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
}: {
  window: AppWindow;
  isActive: boolean;
  zIndex: number;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onMove: (x: number, y: number) => void;
}) {
  const dragRef = useRef<{ startX: number; startY: number; winX: number; winY: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (w.maximized) return;
      onFocus();
      setIsDragging(true);
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        winX: w.x,
        winY: w.y,
      };

      const handleMouseMove = (ev: MouseEvent) => {
        if (!dragRef.current) return;
        const dx = ev.clientX - dragRef.current.startX;
        const dy = ev.clientY - dragRef.current.startY;
        onMove(dragRef.current.winX + dx, dragRef.current.winY + dy);
      };

      const handleMouseUp = () => {
        dragRef.current = null;
        setIsDragging(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [w.x, w.y, w.maximized, onFocus, onMove]
  );

  const style = w.maximized
    ? { top: 0, left: 0, width: "100%", height: "calc(100vh - 52px)", zIndex }
    : { top: w.y, left: w.x, width: w.width, height: w.height, zIndex };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, filter: "blur(8px)" }}
      animate={
        w.minimized
          ? { scale: 0.15, opacity: 0, y: "80vh", filter: "blur(4px)" }
          : { scale: 1, opacity: 1, y: 0, filter: "blur(0px)" }
      }
      exit={{ scale: 0.75, opacity: 0, filter: "blur(8px)" }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`absolute flex flex-col rounded-xl overflow-hidden transition-shadow duration-200 ${
        isDragging
          ? "shadow-[0_25px_60px_rgba(0,0,0,0.5)] scale-[1.01]"
          : isActive
          ? "shadow-[#E88B3A]/15 ring-1 ring-[#E88B3A]/30 shadow-2xl"
          : "shadow-black/40 ring-1 ring-white/5 shadow-2xl"
      }`}
      style={style}
      onMouseDown={onFocus}
    >
      {/* Title Bar */}
      <div
        className={`flex items-center justify-between h-9 px-3 cursor-move flex-shrink-0 ${
          isActive
            ? "bg-[#1a1209] border-b border-[#8B5E3C]/30"
            : "bg-[#151010] border-b border-white/5"
        }`}
        onMouseDown={handleMouseDown}
      >
        <span className="text-[11px] text-white/60 font-medium truncate mr-4">
          {w.title}
        </span>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="w-3 h-3 rounded-full bg-[#F5C563] hover:bg-[#F5C563]/80 hover:shadow-[0_0_6px_rgba(245,197,99,0.4)] transition-all active:scale-75"
          />
          <button
            onClick={(e) => { e.stopPropagation(); onMaximize(); }}
            className="w-3 h-3 rounded-full bg-[#4CAF50] hover:bg-[#4CAF50]/80 hover:shadow-[0_0_6px_rgba(76,175,80,0.4)] transition-all active:scale-75"
          />
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="w-3 h-3 rounded-full bg-[#E88B3A] hover:bg-[#ff6b6b] hover:shadow-[0_0_6px_rgba(232,139,58,0.4)] transition-all active:scale-75"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-[#0D0906]/95 backdrop-blur-sm overflow-auto">
        {getAppContent(w.appId)}
      </div>
    </motion.div>
  );
}

export default function WindowManager({
  windows,
  activeWindowId,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
}: {
  windows: AppWindow[];
  activeWindowId: string | null;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onFocus: (id: string) => void;
  onMove: (id: string, x: number, y: number) => void;
}) {
  return (
    <AnimatePresence>
      {windows.map((w, i) => (
        <Window
          key={w.id}
          window={w}
          isActive={activeWindowId === w.id}
          zIndex={activeWindowId === w.id ? 100 : 10 + i}
          onClose={() => onClose(w.id)}
          onMinimize={() => onMinimize(w.id)}
          onMaximize={() => onMaximize(w.id)}
          onFocus={() => onFocus(w.id)}
          onMove={(x, y) => onMove(w.id, x, y)}
        />
      ))}
    </AnimatePresence>
  );
}
