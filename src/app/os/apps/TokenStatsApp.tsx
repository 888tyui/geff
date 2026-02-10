"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface Stat {
  label: string;
  value: number;
  prefix: string;
  suffix: string;
  decimals: number;
  change: number;
  history: number[];
}

function formatNum(n: number, decimals: number, prefix: string, suffix: string) {
  if (n >= 1e9) return `${prefix}${(n / 1e9).toFixed(2)}B${suffix}`;
  if (n >= 1e6) return `${prefix}${(n / 1e6).toFixed(2)}M${suffix}`;
  if (n >= 1e3) return `${prefix}${(n / 1e3).toFixed(2)}K${suffix}`;
  return `${prefix}${n.toFixed(decimals)}${suffix}`;
}

function Sparkline({ data, positive }: { data: number[]; positive: boolean }) {
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 80;
  const h = 24;
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`)
    .join(" ");

  return (
    <svg width={w} height={h} className="opacity-60">
      <polyline
        points={points}
        fill="none"
        stroke={positive ? "#22c55e" : "#ef4444"}
        strokeWidth="1.5"
      />
    </svg>
  );
}

function randomWalk(base: number, volatility: number) {
  return base * (1 + (Math.random() - 0.48) * volatility);
}

export default function TokenStatsApp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stats, setStats] = useState<Stat[]>([
    { label: "Price", value: 0.00042, prefix: "$", suffix: "", decimals: 6, change: 0, history: [] },
    { label: "Market Cap", value: 4200000, prefix: "$", suffix: "", decimals: 0, change: 0, history: [] },
    { label: "Holders", value: 12847, prefix: "", suffix: "", decimals: 0, change: 0, history: [] },
    { label: "24h Volume", value: 890000, prefix: "$", suffix: "", decimals: 0, change: 0, history: [] },
  ]);
  const chartDataRef = useRef<number[]>([]);
  const animRef = useRef<number>(0);

  // Initialize chart data
  useEffect(() => {
    let val = 0.00042;
    const data: number[] = [];
    for (let i = 0; i < 200; i++) {
      val = randomWalk(val, 0.03);
      data.push(val);
    }
    chartDataRef.current = data;
  }, []);

  // Animate chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let running = true;
    const draw = () => {
      if (!running) return;
      const data = chartDataRef.current;
      if (data.length === 0) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      // Add new point
      const last = data[data.length - 1];
      data.push(randomWalk(last, 0.02));
      if (data.length > 200) data.shift();

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const min = Math.min(...data);
      const max = Math.max(...data);
      const range = max - min || 1;

      // Gradient fill
      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, "rgba(34,197,94,0.3)");
      gradient.addColorStop(1, "rgba(34,197,94,0)");

      ctx.beginPath();
      ctx.moveTo(0, h);
      data.forEach((v, i) => {
        const x = (i / (data.length - 1)) * w;
        const y = h - ((v - min) / range) * (h * 0.8) - h * 0.1;
        if (i === 0) ctx.lineTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      // Line
      ctx.beginPath();
      data.forEach((v, i) => {
        const x = (i / (data.length - 1)) * w;
        const y = h - ((v - min) / range) * (h * 0.8) - h * 0.1;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = "#22c55e";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Current price dot
      const lastY = h - ((data[data.length - 1] - min) / range) * (h * 0.8) - h * 0.1;
      ctx.beginPath();
      ctx.arc(w, lastY, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#22c55e";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(w, lastY, 8, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(34,197,94,0.3)";
      ctx.lineWidth = 2;
      ctx.stroke();

      animRef.current = requestAnimationFrame(draw);
    };

    // Small delay to draw every ~50ms for smoother chart
    const interval = setInterval(() => {
      animRef.current = requestAnimationFrame(draw);
    }, 50);

    return () => {
      running = false;
      clearInterval(interval);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  // Update stats every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) =>
        prev.map((s) => {
          const newVal = randomWalk(s.value, s.label === "Holders" ? 0.005 : 0.04);
          const change = ((newVal - s.value) / s.value) * 100;
          return {
            ...s,
            value: newVal,
            change,
            history: [...s.history.slice(-19), newVal],
          };
        })
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full bg-gradient-to-b from-[#0a0f0a] to-[#0d0906] text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-lg">🦒</span>
          <div>
            <h2 className="text-sm font-bold text-[#E88B3A]">GEFF Token</h2>
            <p className="text-[10px] text-white/30">Live Dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] text-green-400">LIVE</span>
        </div>
      </div>

      {/* Chart */}
      <div className="px-4 py-2 border-b border-white/10">
        <p className="text-[10px] text-white/30 mb-1">GEFF/USD</p>
        <canvas
          ref={canvasRef}
          width={560}
          height={120}
          className="w-full rounded-lg bg-white/5"
        />
      </div>

      {/* Stats */}
      <div className="flex-1 grid grid-cols-2 gap-2 p-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white/5 rounded-xl p-3 flex flex-col justify-between border border-white/5"
          >
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-white/40 uppercase tracking-wider">
                {s.label}
              </p>
              <span
                className={`text-[10px] font-bold ${
                  s.change >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {s.change >= 0 ? "+" : ""}
                {s.change.toFixed(2)}%
              </span>
            </div>
            <p className="text-lg font-bold font-mono mt-1">
              {formatNum(s.value, s.decimals, s.prefix, s.suffix)}
            </p>
            <div className="mt-1">
              <Sparkline data={s.history} positive={s.change >= 0} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
