export type SymbolTier = "legendary" | "epic" | "rare" | "common";

export interface SlotSymbol {
  id: string;
  emoji: string;
  name: string;
  tier: SymbolTier;
  payouts: Record<number, number>; // matches -> payout multiplier
}

export interface SlotTheme {
  name: string;
  symbols: SlotSymbol[];
  bgGradient: string;
  accentColor: string;
  glowColor: string;
  wildSymbol: SlotSymbol;
}

export interface WinResult {
  symbol: SlotSymbol;
  count: number;
  payout: number;
  positions: [number, number][]; // [col, row]
}

export interface SpinResult {
  grid: SlotSymbol[][]; // [col][row] - 6 columns, 5 rows
  wins: WinResult[];
  totalPayout: number;
  hasWin: boolean;
}

export interface SlotState {
  balance: number;
  bet: number;
  grid: SlotSymbol[][];
  spinning: boolean;
  tumbling: boolean;
  multiplier: number;
  wins: WinResult[];
  totalWin: number;
  autoSpin: boolean;
  winPositions: Set<string>;
}
