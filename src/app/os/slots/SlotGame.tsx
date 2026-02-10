"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useSlotEngine } from "./useSlotEngine";
import SlotGrid from "./SlotGrid";
import type { SlotTheme } from "./types";

export default function SlotGame({ theme }: { theme: SlotTheme }) {
  const { state, spin, setBet, toggleAutoSpin, betOptions } = useSlotEngine(theme);

  return (
    <div className={`h-full flex flex-col bg-gradient-to-b ${theme.bgGradient} text-white`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
        <div>
          <h2
            className="text-sm font-bold"
            style={{ color: theme.accentColor }}
          >
            {theme.name}
          </h2>
          <p className="text-[10px] text-white/40">6x5 Tumble Slots</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-white/40">Balance</p>
          <p className="text-sm font-bold font-mono" style={{ color: theme.accentColor }}>
            {state.balance.toLocaleString()} GEFF
          </p>
        </div>
      </div>

      {/* Multiplier trail */}
      <AnimatePresence>
        {state.multiplier > 1 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-1 px-4 py-1 overflow-x-auto"
          >
            {Array.from({ length: state.multiplier - 1 }).map((_, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                style={{
                  backgroundColor: `${theme.accentColor}30`,
                  color: theme.accentColor,
                }}
              >
                x{i + 1}
              </motion.span>
            ))}
            <motion.span
              key="current"
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.2, 1] }}
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: theme.accentColor,
                color: "#000",
              }}
            >
              x{state.multiplier}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid */}
      <div className="flex-1 relative overflow-hidden px-2">
        <SlotGrid
          grid={state.grid}
          spinning={state.spinning}
          winPositions={state.winPositions}
          glowColor={theme.glowColor}
          accentColor={theme.accentColor}
        />

        {/* Win popup */}
        <AnimatePresence>
          {state.totalWin > 0 && !state.spinning && !state.tumbling && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div
                className="text-center px-6 py-3 rounded-2xl backdrop-blur-sm"
                style={{
                  backgroundColor: `${theme.accentColor}20`,
                  boxShadow: `0 0 40px ${theme.glowColor}`,
                  border: `2px solid ${theme.accentColor}`,
                }}
              >
                <p className="text-xs text-white/60">TOTAL WIN</p>
                <motion.p
                  className="text-3xl font-black"
                  style={{ color: theme.accentColor }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: 2, duration: 0.4 }}
                >
                  +{state.totalWin.toLocaleString()}
                </motion.p>
                {state.multiplier > 1 && (
                  <p className="text-xs font-bold" style={{ color: theme.accentColor }}>
                    x{state.multiplier} multiplier
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="px-4 py-3 border-t border-white/10 flex items-center gap-3">
        {/* Bet selector */}
        <div className="flex flex-col gap-1">
          <p className="text-[9px] text-white/30 uppercase tracking-wider">Bet</p>
          <div className="flex gap-1">
            {betOptions.map((b) => (
              <button
                key={b}
                onClick={() => setBet(b)}
                disabled={state.spinning || state.tumbling}
                className={`text-[10px] px-2 py-1 rounded-md font-bold transition-all ${
                  state.bet === b
                    ? "text-black"
                    : "bg-white/5 text-white/40 hover:bg-white/10"
                }`}
                style={
                  state.bet === b
                    ? { backgroundColor: theme.accentColor }
                    : undefined
                }
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Spin button */}
        <motion.button
          onClick={spin}
          disabled={state.spinning || state.tumbling || state.balance < state.bet}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 py-3 rounded-xl font-black text-sm text-black disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          style={{
            backgroundColor: theme.accentColor,
            boxShadow: `0 0 20px ${theme.glowColor}`,
          }}
        >
          {state.spinning || state.tumbling ? "..." : "SPIN"}
        </motion.button>

        {/* Auto */}
        <button
          onClick={toggleAutoSpin}
          className={`text-[10px] px-3 py-2 rounded-lg font-bold transition-all ${
            state.autoSpin
              ? "text-black"
              : "bg-white/5 text-white/40 hover:bg-white/10"
          }`}
          style={state.autoSpin ? { backgroundColor: theme.accentColor } : undefined}
        >
          AUTO
        </button>
      </div>
    </div>
  );
}
