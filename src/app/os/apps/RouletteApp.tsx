"use client";

import { useState, useRef } from "react";
import { Dice6 } from "lucide-react";

const SEGMENTS = [
  { label: "geff", color: "#E88B3A", textColor: "#0D0906" },
  { label: "MOON", color: "#2A1F15", textColor: "#F5C563" },
  { label: "HODL", color: "#F5C563", textColor: "#0D0906" },
  { label: "DIP", color: "#8B5E3C", textColor: "#FFF8F0" },
  { label: "10X", color: "#E88B3A", textColor: "#0D0906" },
  { label: "MEME", color: "#2A1F15", textColor: "#F5C563" },
  { label: "JACKPOT", color: "#F5C563", textColor: "#0D0906" },
  { label: "BURN", color: "#8B5E3C", textColor: "#FFF8F0" },
];

export default function RouletteApp() {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const wheelRef = useRef<SVGSVGElement>(null);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    const spins = 5 + Math.random() * 5;
    const segmentAngle = 360 / SEGMENTS.length;
    const randomSegment = Math.floor(Math.random() * SEGMENTS.length);
    const targetAngle = spins * 360 + randomSegment * segmentAngle + segmentAngle / 2;

    setRotation((prev) => prev + targetAngle);

    setTimeout(() => {
      setSpinning(false);
      setResult(SEGMENTS[randomSegment].label);
    }, 4000);
  };

  const segmentAngle = 360 / SEGMENTS.length;
  const radius = 140;
  const center = 160;

  return (
    <div className="p-4 h-full flex flex-col items-center">
      <div className="flex items-center gap-3 mb-4 self-start">
        <Dice6 className="w-6 h-6 text-[#E88B3A]" />
        <h2
          className="text-xl text-[#E88B3A]"
          style={{ fontFamily: "'Cimo Ones', cursive" }}
        >
          geff Roulette
        </h2>
      </div>

      {/* Wheel Container */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4 min-h-0">
        <div className="relative">
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-10">
            <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[18px] border-l-transparent border-r-transparent border-t-[#E88B3A] drop-shadow-lg" />
          </div>

          {/* Wheel */}
          <svg
            ref={wheelRef}
            width="320"
            height="320"
            viewBox="0 0 320 320"
            className="drop-shadow-2xl"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
            }}
          >
            {SEGMENTS.map((seg, i) => {
              const startAngle = (i * segmentAngle - 90) * (Math.PI / 180);
              const endAngle = ((i + 1) * segmentAngle - 90) * (Math.PI / 180);
              const x1 = center + radius * Math.cos(startAngle);
              const y1 = center + radius * Math.sin(startAngle);
              const x2 = center + radius * Math.cos(endAngle);
              const y2 = center + radius * Math.sin(endAngle);
              const largeArc = segmentAngle > 180 ? 1 : 0;

              const midAngle = ((i + 0.5) * segmentAngle - 90) * (Math.PI / 180);
              const textX = center + radius * 0.6 * Math.cos(midAngle);
              const textY = center + radius * 0.6 * Math.sin(midAngle);
              const textRotate = (i + 0.5) * segmentAngle;

              return (
                <g key={i}>
                  <path
                    d={`M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`}
                    fill={seg.color}
                    stroke="#0D0906"
                    strokeWidth="2"
                  />
                  <text
                    x={textX}
                    y={textY}
                    fill={seg.textColor}
                    fontSize="11"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${textRotate}, ${textX}, ${textY})`}
                  >
                    {seg.label}
                  </text>
                </g>
              );
            })}
            {/* Center circle */}
            <circle cx={center} cy={center} r="24" fill="#0D0906" stroke="#E88B3A" strokeWidth="3" />
            <text
              x={center}
              y={center}
              fill="#E88B3A"
              fontSize="18"
              fontWeight="bold"
              textAnchor="middle"
              dominantBaseline="central"
            >
              G
            </text>
          </svg>
        </div>

        {/* Result */}
        {result && (
          <div className="bg-[#E88B3A]/15 border border-[#E88B3A]/30 rounded-xl px-6 py-3 text-center">
            <p className="text-white/50 text-xs mb-1">You got:</p>
            <p
              className="text-[#E88B3A] text-xl"
              style={{ fontFamily: "'Cimo Ones', cursive" }}
            >
              {result}
            </p>
          </div>
        )}

        {/* Spin Button */}
        <button
          onClick={spin}
          disabled={spinning}
          className={`px-8 py-3 rounded-xl font-bold text-lg transition-all ${
            spinning
              ? "bg-white/10 text-white/30 cursor-not-allowed"
              : "bg-[#E88B3A] text-[#0D0906] hover:bg-[#F5C563] hover:scale-105 active:scale-95"
          }`}
          style={{ fontFamily: "'Cimo Ones', cursive" }}
        >
          {spinning ? "Spinning..." : "SPIN!"}
        </button>
      </div>
    </div>
  );
}
