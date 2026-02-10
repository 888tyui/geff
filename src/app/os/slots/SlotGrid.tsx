"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { SlotSymbol } from "./types";

const COLS = 6;
const ROWS = 5;

function tierGlow(tier: string, glowColor: string) {
  switch (tier) {
    case "legendary":
      return `0 0 12px ${glowColor}, 0 0 24px ${glowColor}`;
    case "epic":
      return `0 0 8px ${glowColor}`;
    default:
      return "none";
  }
}

export default function SlotGrid({
  grid,
  spinning,
  winPositions,
  glowColor,
  accentColor,
}: {
  grid: SlotSymbol[][];
  spinning: boolean;
  winPositions: Set<string>;
  glowColor: string;
  accentColor: string;
}) {
  return (
    <div className="grid grid-cols-6 gap-1 p-2">
      {Array.from({ length: ROWS }).map((_, row) =>
        Array.from({ length: COLS }).map((_, col) => {
          const symbol = grid[col]?.[row];
          if (!symbol) return null;
          const key = `${col},${row}`;
          const isWin = winPositions.has(key);

          return (
            <motion.div
              key={`${col}-${row}-${symbol.id}-${spinning ? "spin" : "idle"}`}
              initial={spinning ? { y: -40, opacity: 0, scale: 0.7 } : { y: -20, opacity: 0, scale: 0.8 }}
              animate={{
                y: 0,
                opacity: 1,
                scale: isWin ? [1, 1.15, 1] : 1,
              }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: spinning ? col * 0.08 + row * 0.03 : col * 0.03,
                scale: isWin
                  ? { repeat: Infinity, duration: 0.6 }
                  : undefined,
              }}
              className={`
                relative flex items-center justify-center rounded-lg aspect-square text-xl sm:text-2xl
                ${isWin
                  ? "bg-white/20 ring-2"
                  : "bg-white/5 hover:bg-white/10"
                }
                transition-colors
              `}
              style={{
                boxShadow: isWin
                  ? `0 0 16px ${glowColor}, 0 0 32px ${glowColor}`
                  : tierGlow(symbol.tier, glowColor),
                ["--tw-ring-color" as string]: isWin ? accentColor : undefined,
                borderColor: isWin ? accentColor : "transparent",
              } as React.CSSProperties}
            >
              <span className="select-none" style={{ filter: isWin ? "brightness(1.3)" : "none" }}>
                {symbol.emoji}
              </span>
              {isWin && (
                <motion.div
                  className="absolute inset-0 rounded-lg"
                  animate={{ opacity: [0.3, 0, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  style={{ backgroundColor: accentColor }}
                />
              )}
            </motion.div>
          );
        })
      )}
    </div>
  );
}
