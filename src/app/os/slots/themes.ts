import type { SlotTheme, SlotSymbol } from "./types";

const makeSym = (
  id: string,
  emoji: string,
  name: string,
  tier: SlotSymbol["tier"],
  payouts: Record<number, number>
): SlotSymbol => ({ id, emoji, name, tier, payouts });

// ── Savanna Spins ──
const savannaWild = makeSym("s-wild", "👑", "Geff Crown", "legendary", {
  8: 10, 9: 25, 10: 50, 11: 125, 12: 500,
});
export const savannaTheme: SlotTheme = {
  name: "Savanna Spins",
  bgGradient: "from-amber-950 via-orange-950 to-yellow-950",
  accentColor: "#E88B3A",
  glowColor: "rgba(232,139,58,0.5)",
  wildSymbol: savannaWild,
  symbols: [
    savannaWild,
    makeSym("s-giraffe", "🦒", "Giraffe", "epic", { 8: 5, 9: 12, 10: 25, 11: 50, 12: 250 }),
    makeSym("s-lion", "🦁", "Lion", "epic", { 8: 4, 9: 10, 10: 20, 11: 40, 12: 200 }),
    makeSym("s-elephant", "🐘", "Elephant", "rare", { 8: 3, 9: 6, 10: 12, 11: 25, 12: 100 }),
    makeSym("s-zebra", "🦓", "Zebra", "rare", { 8: 2, 9: 4, 10: 8, 11: 15, 12: 60 }),
    makeSym("s-red", "🔴", "Red Gem", "common", { 8: 1, 9: 2, 10: 4, 11: 8, 12: 30 }),
    makeSym("s-blue", "🔵", "Blue Gem", "common", { 8: 1, 9: 2, 10: 4, 11: 8, 12: 30 }),
    makeSym("s-green", "🟢", "Green Gem", "common", { 8: 0.8, 9: 1.5, 10: 3, 11: 6, 12: 25 }),
    makeSym("s-purple", "🟣", "Purple Gem", "common", { 8: 0.8, 9: 1.5, 10: 3, 11: 6, 12: 25 }),
  ],
};

// ── Crypto Rockets ──
const cryptoWild = makeSym("c-wild", "🚀", "Rocket", "legendary", {
  8: 10, 9: 25, 10: 50, 11: 125, 12: 500,
});
export const cryptoTheme: SlotTheme = {
  name: "Crypto Rockets",
  bgGradient: "from-purple-950 via-indigo-950 to-cyan-950",
  accentColor: "#8B5CF6",
  glowColor: "rgba(139,92,246,0.5)",
  wildSymbol: cryptoWild,
  symbols: [
    cryptoWild,
    makeSym("c-btc", "₿", "Bitcoin", "epic", { 8: 5, 9: 12, 10: 25, 11: 50, 12: 250 }),
    makeSym("c-eth", "⟠", "Ethereum", "epic", { 8: 4, 9: 10, 10: 20, 11: 40, 12: 200 }),
    makeSym("c-sol", "◎", "Solana", "rare", { 8: 3, 9: 6, 10: 12, 11: 25, 12: 100 }),
    makeSym("c-moon", "🌙", "Moon", "rare", { 8: 2, 9: 4, 10: 8, 11: 15, 12: 60 }),
    makeSym("c-star", "⭐", "Star", "common", { 8: 1, 9: 2, 10: 4, 11: 8, 12: 30 }),
    makeSym("c-cyan", "💠", "Cyan", "common", { 8: 1, 9: 2, 10: 4, 11: 8, 12: 30 }),
    makeSym("c-bolt", "⚡", "Bolt", "common", { 8: 0.8, 9: 1.5, 10: 3, 11: 6, 12: 25 }),
    makeSym("c-orb", "🔮", "Orb", "common", { 8: 0.8, 9: 1.5, 10: 3, 11: 6, 12: 25 }),
  ],
};

// ── Golden Geff ──
const goldenWild = makeSym("g-wild", "🏆", "Golden Geff", "legendary", {
  8: 10, 9: 25, 10: 50, 11: 125, 12: 500,
});
export const goldenTheme: SlotTheme = {
  name: "Golden Geff",
  bgGradient: "from-yellow-950 via-amber-950 to-stone-950",
  accentColor: "#F59E0B",
  glowColor: "rgba(245,158,11,0.5)",
  wildSymbol: goldenWild,
  symbols: [
    goldenWild,
    makeSym("g-diamond", "💎", "Diamond", "epic", { 8: 5, 9: 12, 10: 25, 11: 50, 12: 250 }),
    makeSym("g-crown", "👑", "Crown", "epic", { 8: 4, 9: 10, 10: 20, 11: 40, 12: 200 }),
    makeSym("g-chalice", "🏆", "Chalice", "rare", { 8: 3, 9: 6, 10: 12, 11: 25, 12: 100 }),
    makeSym("g-ring", "💍", "Ring", "rare", { 8: 2, 9: 4, 10: 8, 11: 15, 12: 60 }),
    makeSym("g-coin", "🪙", "Coin", "common", { 8: 1, 9: 2, 10: 4, 11: 8, 12: 30 }),
    makeSym("g-bar", "🥇", "Gold Bar", "common", { 8: 1, 9: 2, 10: 4, 11: 8, 12: 30 }),
    makeSym("g-ruby", "❤️", "Ruby", "common", { 8: 0.8, 9: 1.5, 10: 3, 11: 6, 12: 25 }),
    makeSym("g-emerald", "💚", "Emerald", "common", { 8: 0.8, 9: 1.5, 10: 3, 11: 6, 12: 25 }),
  ],
};
