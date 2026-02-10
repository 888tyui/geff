"use client";

const items = [
  "$geff",
  "PROBABLY NOTHING",
  "$geff",
  "NOT FINANCIAL ADVICE",
  "$geff",
  "FEW UNDERSTAND",
  "$geff",
  "NO PROMISES",
  "$geff",
  "JUST VIBES",
  "$geff",
  "PROBABLY NOTHING",
  "$geff",
  "NOT FINANCIAL ADVICE",
  "$geff",
  "FEW UNDERSTAND",
  "$geff",
  "NO PROMISES",
  "$geff",
  "JUST VIBES",
];

export default function Marquee() {
  return (
    <div className="bg-geff-orange py-3.5 overflow-hidden relative select-none">
      <div className="animate-marquee flex whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="mx-6 text-geff-dark font-display text-base tracking-wider font-bold">
              {item}
            </span>
            <span className="w-1 h-1 bg-geff-dark/30 rounded-full flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
