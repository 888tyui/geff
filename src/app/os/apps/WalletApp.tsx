"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState, useEffect, useCallback } from "react";
import { Wallet } from "lucide-react";

export default function WalletApp() {
  const { publicKey, connected, disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchBalance = useCallback(async () => {
    if (!publicKey) return;
    setLoading(true);
    try {
      const bal = await connection.getBalance(publicKey);
      setBalance(bal / LAMPORTS_PER_SOL);
    } catch {
      setBalance(null);
    }
    setLoading(false);
  }, [publicKey, connection]);

  useEffect(() => {
    if (connected && publicKey) {
      fetchBalance();
    } else {
      setBalance(null);
    }
  }, [connected, publicKey, fetchBalance]);

  const shortenAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <div className="p-5 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <Wallet className="w-6 h-6 text-[#E88B3A]" />
        <h2
          className="text-xl text-[#E88B3A]"
          style={{ fontFamily: "'Cimo Ones', cursive" }}
        >
          Wallet
        </h2>
      </div>

      {!connected ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <svg width="48" height="48" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="22" fill="#E88B3A" />
            <text
              x="24"
              y="24"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#0D0906"
              fontSize="24"
              fontWeight="bold"
              fontFamily="sans-serif"
            >
              G
            </text>
          </svg>
          <p className="text-white/50 text-sm text-center">
            Connect wallet. Or don&apos;t. Your call.
          </p>
          <button
            onClick={() => setVisible(true)}
            className="px-6 py-3 bg-[#E88B3A] text-[#0D0906] font-bold rounded-xl hover:bg-[#F5C563] transition-colors"
          >
            Connect Wallet
          </button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col gap-4">
          {/* Address Card */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-white/40 text-[10px] tracking-wider uppercase mb-1">
              Connected Address
            </p>
            <p className="text-white/80 font-mono text-sm">
              {publicKey ? shortenAddress(publicKey.toBase58()) : ""}
            </p>
          </div>

          {/* Balance Card */}
          <div className="bg-gradient-to-br from-[#E88B3A]/10 to-[#F5C563]/5 border border-[#E88B3A]/20 rounded-xl p-5">
            <p className="text-white/40 text-[10px] tracking-wider uppercase mb-2">
              SOL Balance
            </p>
            <div className="flex items-end gap-2">
              <span
                className="text-3xl text-white"
                style={{ fontFamily: "'Cimo Ones', cursive" }}
              >
                {loading ? "..." : balance !== null ? balance.toFixed(4) : "\u2014"}
              </span>
              <span className="text-white/40 text-sm mb-1">SOL</span>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={fetchBalance}
              className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white/70 text-sm hover:bg-white/10 hover:text-white transition-all"
            >
              Refresh
            </button>
            <button
              onClick={() => {
                if (publicKey) {
                  navigator.clipboard.writeText(publicKey.toBase58());
                }
              }}
              className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white/70 text-sm hover:bg-white/10 hover:text-white transition-all"
            >
              Copy Address
            </button>
          </div>

          {/* Disconnect */}
          <button
            onClick={disconnect}
            className="mt-auto px-4 py-2.5 border border-red-500/30 text-red-400/70 rounded-xl text-sm hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}
