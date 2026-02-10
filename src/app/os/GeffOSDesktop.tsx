"use client";

import { useState, useCallback } from "react";
import WalletProvider from "./WalletProvider";
import Taskbar from "./components/Taskbar";
import DesktopIcons from "./components/DesktopIcons";
import WindowManager from "./components/WindowManager";
import type { AppWindow } from "./types";

export default function GeffOSDesktop() {
  const [windows, setWindows] = useState<AppWindow[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);

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
      const newWindow: AppWindow = {
        id,
        appId,
        title,
        x: 80 + offset,
        y: 40 + offset,
        width: appId === "gallery" || appId === "meme-gallery" ? 720 : 480,
        height: appId === "gallery" || appId === "meme-gallery" ? 520 : 440,
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
        style={{
          backgroundImage: "url(/images/bg2.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30" />

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
