import { useState, useCallback, useRef } from "react";
import type { SlotTheme, SlotSymbol, SlotState, WinResult } from "./types";

const COLS = 6;
const ROWS = 5;
const BET_OPTIONS = [10, 25, 50, 100, 250];

function randomSymbol(symbols: SlotSymbol[]): SlotSymbol {
  // Weight by tier: common appears more
  const weights: Record<string, number> = {
    legendary: 1,
    epic: 3,
    rare: 5,
    common: 10,
  };
  const weighted: SlotSymbol[] = [];
  for (const s of symbols) {
    const w = weights[s.tier] || 5;
    for (let i = 0; i < w; i++) weighted.push(s);
  }
  return weighted[Math.floor(Math.random() * weighted.length)];
}

function generateGrid(symbols: SlotSymbol[]): SlotSymbol[][] {
  const grid: SlotSymbol[][] = [];
  for (let col = 0; col < COLS; col++) {
    const column: SlotSymbol[] = [];
    for (let row = 0; row < ROWS; row++) {
      column.push(randomSymbol(symbols));
    }
    grid.push(column);
  }
  return grid;
}

function evaluateWins(
  grid: SlotSymbol[][],
  wildSymbol: SlotSymbol
): WinResult[] {
  // Count each symbol across entire grid (anywhere pays)
  const counts = new Map<string, { symbol: SlotSymbol; positions: [number, number][] }>();

  for (let col = 0; col < COLS; col++) {
    for (let row = 0; row < ROWS; row++) {
      const sym = grid[col][row];
      const key = sym.id;
      if (!counts.has(key)) {
        counts.set(key, { symbol: sym, positions: [] });
      }
      counts.get(key)!.positions.push([col, row]);
    }
  }

  const wins: WinResult[] = [];

  for (const [, data] of counts) {
    const { symbol, positions } = data;
    const count = positions.length;
    if (count >= 8) {
      const payoutKey = Math.min(count, 12);
      const payout = symbol.payouts[payoutKey] || 0;
      if (payout > 0) {
        wins.push({ symbol, count, payout, positions });
      }
    }
  }

  // Also check wild separately if not already counted
  const wildPositions: [number, number][] = [];
  for (let col = 0; col < COLS; col++) {
    for (let row = 0; row < ROWS; row++) {
      if (grid[col][row].id === wildSymbol.id) {
        wildPositions.push([col, row]);
      }
    }
  }

  return wins;
}

function tumbleGrid(
  grid: SlotSymbol[][],
  winPositions: Set<string>,
  symbols: SlotSymbol[]
): SlotSymbol[][] {
  const newGrid: SlotSymbol[][] = [];

  for (let col = 0; col < COLS; col++) {
    // Keep non-winning symbols
    const remaining = grid[col].filter(
      (_, row) => !winPositions.has(`${col},${row}`)
    );
    // Fill from top
    const needed = ROWS - remaining.length;
    const newSymbols: SlotSymbol[] = [];
    for (let i = 0; i < needed; i++) {
      newSymbols.push(randomSymbol(symbols));
    }
    newGrid.push([...newSymbols, ...remaining]);
  }

  return newGrid;
}

export function useSlotEngine(theme: SlotTheme) {
  const [state, setState] = useState<SlotState>({
    balance: 10000,
    bet: BET_OPTIONS[0],
    grid: generateGrid(theme.symbols),
    spinning: false,
    tumbling: false,
    multiplier: 1,
    wins: [],
    totalWin: 0,
    autoSpin: false,
    winPositions: new Set(),
  });

  const autoSpinRef = useRef(false);
  const spinningRef = useRef(false);

  const processTumble = useCallback(
    async (
      currentGrid: SlotSymbol[][],
      currentMultiplier: number,
      totalWinSoFar: number,
      bet: number
    ): Promise<{ grid: SlotSymbol[][]; totalWin: number; multiplier: number }> => {
      const wins = evaluateWins(currentGrid, theme.wildSymbol);

      if (wins.length === 0) {
        setState((prev) => ({
          ...prev,
          tumbling: false,
          wins: [],
          winPositions: new Set(),
        }));
        return { grid: currentGrid, totalWin: totalWinSoFar, multiplier: currentMultiplier };
      }

      // Collect winning positions
      const posSet = new Set<string>();
      for (const w of wins) {
        for (const [c, r] of w.positions) {
          posSet.add(`${c},${r}`);
        }
      }

      // Calculate payout for this tumble
      const tumblePayout = wins.reduce((sum, w) => sum + w.payout * bet, 0) * currentMultiplier;
      const newTotalWin = totalWinSoFar + tumblePayout;

      // Show wins
      setState((prev) => ({
        ...prev,
        tumbling: true,
        wins,
        winPositions: posSet,
        multiplier: currentMultiplier,
        totalWin: newTotalWin,
      }));

      // Wait to show win highlights
      await new Promise((r) => setTimeout(r, 800));

      // Tumble: remove winners, drop new symbols
      const newGrid = tumbleGrid(currentGrid, posSet, theme.symbols);

      setState((prev) => ({
        ...prev,
        grid: newGrid,
        winPositions: new Set(),
      }));

      // Wait for animation
      await new Promise((r) => setTimeout(r, 500));

      // Recurse with increased multiplier
      return processTumble(newGrid, currentMultiplier + 1, newTotalWin, bet);
    },
    [theme]
  );

  const spin = useCallback(async () => {
    if (spinningRef.current) return;
    if (state.balance < state.bet) return;

    spinningRef.current = true;

    // Deduct bet
    const bet = state.bet;
    setState((prev) => ({
      ...prev,
      spinning: true,
      balance: prev.balance - bet,
      multiplier: 1,
      totalWin: 0,
      wins: [],
      winPositions: new Set(),
    }));

    // Spin animation delay
    await new Promise((r) => setTimeout(r, 600));

    // Generate new grid
    const newGrid = generateGrid(theme.symbols);
    setState((prev) => ({
      ...prev,
      grid: newGrid,
      spinning: false,
    }));

    await new Promise((r) => setTimeout(r, 300));

    // Process tumbles
    const result = await processTumble(newGrid, 1, 0, bet);

    // Add winnings to balance
    setState((prev) => ({
      ...prev,
      balance: prev.balance + result.totalWin,
      tumbling: false,
      spinning: false,
    }));

    spinningRef.current = false;

    // Auto spin
    if (autoSpinRef.current) {
      setTimeout(() => {
        if (autoSpinRef.current) spin();
      }, 1000);
    }
  }, [state.balance, state.bet, theme, processTumble]);

  const setBet = useCallback((bet: number) => {
    setState((prev) => ({ ...prev, bet }));
  }, []);

  const toggleAutoSpin = useCallback(() => {
    autoSpinRef.current = !autoSpinRef.current;
    setState((prev) => ({ ...prev, autoSpin: !prev.autoSpin }));
    if (autoSpinRef.current && !spinningRef.current) {
      spin();
    }
  }, [spin]);

  return { state, spin, setBet, toggleAutoSpin, betOptions: BET_OPTIONS };
}
