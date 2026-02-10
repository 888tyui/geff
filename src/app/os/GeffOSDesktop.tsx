"use client";

import { useState, useCallback } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import WalletProvider from "./WalletProvider";
import Taskbar from "./components/Taskbar";
import DesktopIcons from "./components/DesktopIcons";
import WindowManager from "./components/WindowManager";
import type { AppWindow } from "./types";

export default function GeffOSDesktop() {
  const [windows, setWindows] = useState<AppWindow[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const bgX = useTransform(mouseX, [0, 1], ["-1.5%", "1.5%"]);
  const bgY = useTransform(mouseY, [0, 1], ["-1.5%", "1.5%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const openWindow = useCallback(
    (appId: string, title: string) => {
      const existing = windows.find((w) => w.appId === appId);
      if (existing) {
        setActiveWindowId(existing.id);
        setWindows((prev) =>
          prev.map((w) => (w.id === existing.id ? { ...w, minimized: false } : w))
        );
        return;
      }

      const id = `${appId}-${Date.now()}`;
      const offset = (windows.length % 6) * 30;
      const slotApps = ["savanna-spins", "crypto-rockets", "golden-geff"];
      const isSlot = slotApps.includes(appId);
      const isGallery = appId === "gallery" || appId === "meme-gallery";

      let width = 480;
      let height = 440;
      if (isGallery) { width = 720; height = 520; }
      else if (isSlot) { width = 780; height = 600; }
      else if (appId === "terminal") { width = 600; height = 420; }
      else if (appId === "token-stats") { width = 640; height = 480; }
      else if (appId === "snake-game") { width = 480; height = 440; }

      const newWindow: AppWindow = {
        id,
        appId,
        title,
        x: 80 + offset,
        y: 40 + offset,
        width,
        height,
        minimized: false,
        maximized: false,
      };

      setWindows((prev) => [...prev, newWindow]);
      setActiveWindowId(id);
    },
    [windows]
  );

  const closeWindow = useCallback(
    (id: string) => {
      setWindows((prev) => prev.filter((w) => w.id !== id));
      if (activeWindowId === id) {
        setActiveWindowId(null);
      }
    },
    [activeWindowId]
  );

  const minimizeWindow = useCallback(
    (id: string) => {
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, minimized: true } : w))
      );
      if (activeWindowId === id) setActiveWindowId(null);
    },
    [activeWindowId]
  );

  const maximizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, maximized: !w.maximized } : w
      )
    );
  }, []);

  const focusWindow = useCallback((id: string) => {
    setActiveWindowId(id);
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: false } : w))
    );
  }, []);

  const moveWindow = useCallback((id: string, x: number, y: number) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, x, y } : w))
    );
  }, []);

  return (
    <WalletProvider>
      <div
        className="relative w-screen h-screen overflow-hidden select-none"
        onMouseMove={handleMouseMove}
      >
        {/* Parallax background */}
        <motion.div
          className="absolute -inset-4"
          style={{ x: bgX, y: bgY }}
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: "url(/images/bg2.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </motion.div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Vignette overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)",
          }}
        />

        {/* Desktop Icons */}
        <div className="relative z-10 h-[calc(100vh-52px)]">
          <DesktopIcons onOpenApp={openWindow} />

          {/* Window Manager */}
          <WindowManager
            windows={windows}
            activeWindowId={activeWindowId}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            onMaximize={maximizeWindow}
            onFocus={focusWindow}
            onMove={moveWindow}
          />
        </div>

        {/* Taskbar */}
        <Taskbar
          windows={windows}
          activeWindowId={activeWindowId}
          onFocusWindow={focusWindow}
          onOpenApp={openWindow}
        />
      </div>
    </WalletProvider>
  );
}
