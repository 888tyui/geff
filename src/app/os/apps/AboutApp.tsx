"use client";

import Image from "next/image";
import { Info } from "lucide-react";

export default function AboutApp() {
  return (
    <div className="p-5 h-full overflow-auto">
      <div className="flex items-center gap-3 mb-5">
        <Info className="w-6 h-6 text-[#E88B3A]" />
        <h2
          className="text-xl text-[#E88B3A]"
          style={{ fontFamily: "'Cimo Ones', cursive" }}
        >
          About geff
        </h2>
      </div>

      {/* Profile */}
      <div className="flex flex-col items-center gap-4 mb-6">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#E88B3A]/30">
          <Image src="/images/1.jpg" alt="Geff" fill className="object-cover" />
        </div>
        <div className="text-center">
          <h3
            className="text-2xl text-[#E88B3A]"
            style={{ fontFamily: "'Cimo Ones', cursive" }}
          >
            geff
          </h3>
          <p className="text-white/40 text-sm">The Tallest Meme on Solana</p>
        </div>
      </div>

      {/* Info Cards */}
      <div className="space-y-3">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-white/40 text-[10px] tracking-wider uppercase mb-1">Species</p>
          <p className="text-white/80 text-sm">Giraffe (Giraffa camelopardalis based)</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-white/40 text-[10px] tracking-wider uppercase mb-1">Signature Look</p>
          <p className="text-white/80 text-sm">White hoodie, pixel sunglasses (optional)</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-white/40 text-[10px] tracking-wider uppercase mb-1">Chain</p>
          <p className="text-white/80 text-sm">Solana (SOL)</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-white/40 text-[10px] tracking-wider uppercase mb-1">Hobbies</p>
          <p className="text-white/80 text-sm">
            Skateboarding, basketball, cycling, smoking cigars in armchairs,
            appearing in classic art, and looking cool while driving
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-white/40 text-[10px] tracking-wider uppercase mb-1">Motto</p>
          <p className="text-white/80 text-sm italic">&ldquo;Stand tall, HODL long.&rdquo;</p>
        </div>
      </div>

      {/* Version info */}
      <div className="mt-6 pt-4 border-t border-white/5 text-center">
        <p className="text-white/20 text-xs">geffOS v1.0.0</p>
      </div>
    </div>
  );
}
