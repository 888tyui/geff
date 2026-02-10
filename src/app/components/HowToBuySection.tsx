"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

const CONTRACT_ADDRESS = "9nB7UbFPVh1dBXDhFxSRMLACGbASbdVsgB6TVSbtpump";

const steps = [
  {
    number: "01",
    title: "Get a Wallet",
    description:
      "Download Phantom or Solflare wallet from their official sites. Set it up and save your seed phrase somewhere safe.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="6" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M4 12H24" stroke="currentColor" strokeWidth="2" />
        <circle cx="19" cy="18" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Get Some SOL",
    description:
      "Buy SOL from an exchange like Coinbase, Binance, or Kraken. Then send it to your Solana wallet address.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="2" />
        <path d="M14 8V14L18 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Go to Jupiter",
    description:
      "Head to jup.ag — the best DEX aggregator on Solana. Connect your wallet and get ready to swap.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4L24 14L14 24L4 14Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="14" cy="14" r="3" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Swap for $geff",
    description:
      "Paste the $geff contract address below, set your amount of SOL, and swap. Welcome to the herd.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M7 10H21L17 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 18H7L11 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function ConfettiParticles() {
  const colors = ["#E88B3A", "#F5C563", "#4CAF50", "#FFF8F0", "#8B5E3C", "#F5A855"];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
          }}
          animate={{
            x: (Math.random() - 0.5) * 120,
            y: -(Math.random() * 60 + 20),
            scale: 0,
            opacity: 0,
            rotate: Math.random() * 720,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full"
          style={{ backgroundColor: colors[i % colors.length] }}
        />
      ))}
    </div>
  );
}

export default function HowToBuySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      setCopied(true);
      setShowConfetti(true);
      setTimeout(() => setCopied(false), 2000);
      setTimeout(() => setShowConfetti(false), 1000);
    } catch {
      /* clipboard not available */
    }
  };

  return (
    <section id="how-to-buy" ref={ref} className="relative py-28 md:py-36 grain">
      <div className="absolute inset-0 giraffe-spots opacity-20" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-geff-cream mb-4">
            HOW TO BUY{" "}
            <span className="text-geff-orange text-glow-orange">$geff</span>
          </h2>
          <p className="text-geff-cream/40 text-lg">
            Four simple steps to join the tallest community in crypto
          </p>
        </motion.div>

        {/* Contract Address Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mb-14"
        >
          <div className="relative bg-geff-dark-card border border-geff-brown/25 rounded-2xl p-5 md:p-6 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px shimmer-border" />

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-1 text-center sm:text-left min-w-0">
                <p className="text-geff-cream/35 text-[10px] tracking-[0.25em] uppercase mb-1.5 font-bold">
                  Contract Address
                </p>
                <p className="text-geff-cream/75 font-mono text-sm break-all leading-relaxed">
                  {CONTRACT_ADDRESS}
                </p>
              </div>
              <div className="relative">
                <AnimatePresence>
                  {showConfetti && <ConfettiParticles />}
                </AnimatePresence>
                <button
                  onClick={copyAddress}
                  className={`flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                    copied
                      ? "bg-green-500/15 border border-green-500/40 text-green-400"
                      : "bg-geff-orange/10 border border-geff-orange/30 text-geff-orange hover:bg-geff-orange/20 hover:scale-105 active:scale-95"
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.span
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      >
                        <Check size={14} />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      >
                        <Copy size={14} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {copied ? "Copied!" : "Copy Address"}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Step Cards */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 + i * 0.12 }}
              whileHover={{ y: -4 }}
              className="group relative bg-geff-dark-card/50 border border-geff-brown/15 rounded-2xl p-7 hover:border-geff-orange/25 transition-all duration-500 hover:shadow-lg hover:shadow-geff-orange/5"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-14 h-14 bg-geff-orange/8 border border-geff-orange/15 rounded-xl flex items-center justify-center text-geff-orange group-hover:bg-geff-orange/12 group-hover:scale-105 transition-all duration-300">
                  {step.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2.5">
                    <span className="font-display text-geff-orange/30 text-2xl">
                      {step.number}
                    </span>
                    <h3 className="font-display text-geff-cream text-xl">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-geff-cream/45 leading-relaxed text-[15px]">
                    {step.description}
                  </p>
                </div>
              </div>

              {i < steps.length - 1 && i % 2 === 0 && (
                <div className="hidden md:block absolute -right-3 top-1/2 w-6 h-px bg-geff-brown/20" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
