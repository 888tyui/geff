"use client";

import { Wallet, Image as ImageIcon, Laugh, Dice6, Gamepad2, Info } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const apps: { id: string; title: string; icon: LucideIcon }[] = [
  { id: "wallet", title: "Wallet", icon: Wallet },
  { id: "gallery", title: "Gallery", icon: ImageIcon },
  { id: "meme-gallery", title: "Memes", icon: Laugh },
  { id: "roulette", title: "Roulette", icon: Dice6 },
  { id: "random-game", title: "geff Run", icon: Gamepad2 },
  { id: "about", title: "About", icon: Info },
];

export default function DesktopIcons({
  onOpenApp,
}: {
  onOpenApp: (appId: string, title: string) => void;
}) {
  return (
    <div className="p-4 md:p-6 flex flex-col flex-wrap gap-2 h-full content-start">
      {apps.map((app) => (
        <button
          key={app.id}
          onDoubleClick={() => onOpenApp(app.id, app.title)}
          onClick={() => onOpenApp(app.id, app.title)}
          className="group flex flex-col items-center gap-1.5 w-20 py-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-[#E88B3A]/15 border border-[#E88B3A]/20 flex items-center justify-center group-hover:bg-[#E88B3A]/25 group-hover:scale-110 transition-all">
            <app.icon size={18} className="text-[#E88B3A]" />
          </div>
          <span className="text-[11px] text-white font-medium drop-shadow-md text-center leading-tight">
            {app.title}
          </span>
        </button>
      ))}
    </div>
  );
}
