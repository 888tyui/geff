"use client";

import { useRef, useCallback } from "react";
import type { AppWindow } from "../types";
import WalletApp from "../apps/WalletApp";
import GalleryApp from "../apps/GalleryApp";
import MemeGalleryApp from "../apps/MemeGalleryApp";
import RouletteApp from "../apps/RouletteApp";
import RandomGameApp from "../apps/RandomGameApp";
import AboutApp from "../apps/AboutApp";

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

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (w.maximized) return;
      onFocus();
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
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [w.x, w.y, w.maximized, onFocus, onMove]
  );

  if (w.minimized) return null;

  const style = w.maximized
    ? { top: 0, left: 0, width: "100%", height: "calc(100vh - 52px)", zIndex }
    : { top: w.y, left: w.x, width: w.width, height: w.height, zIndex };

  return (
    <div
      className={`absolute flex flex-col rounded-xl overflow-hidden shadow-2xl transition-shadow ${
        isActive
          ? "shadow-[#E88B3A]/15 ring-1 ring-[#E88B3A]/30"
          : "shadow-black/40 ring-1 ring-white/5"
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
            className="w-3 h-3 rounded-full bg-[#F5C563] hover:bg-[#F5C563]/80 transition-colors"
          />
          <button
            onClick={(e) => { e.stopPropagation(); onMaximize(); }}
            className="w-3 h-3 rounded-full bg-[#4CAF50] hover:bg-[#4CAF50]/80 transition-colors"
          />
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="w-3 h-3 rounded-full bg-[#E88B3A] hover:bg-[#ff6b6b] transition-colors"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-[#0D0906]/95 backdrop-blur-sm overflow-auto">
        {getAppContent(w.appId)}
      </div>
    </div>
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
    <>
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
    </>
  );
}
