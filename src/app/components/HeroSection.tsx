"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Radio } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/bg1.jpg"
          alt="Savanna sunset"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-geff-dark/95 via-geff-dark/70 to-geff-dark/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-geff-dark via-transparent to-geff-dark/40" />
      </div>

      <div className="absolute top-20 left-10 w-32 h-32 bg-geff-orange/5 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-20 w-48 h-48 bg-geff-gold/5 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-32 pb-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-geff-orange bg-geff-orange/10 border border-geff-orange/25 rounded-full mb-8 uppercase">
              <Radio size={10} className="animate-pulse" />
              Live on Solana
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-glow-orange leading-none"
          >
            <span className="block text-[clamp(5rem,14vw,12rem)] text-geff-cream tracking-tight">
              geff
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="font-display text-xl md:text-3xl text-geff-gold mt-2 mb-6 tracking-wide"
          >
            The Tallest Meme on Solana
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-geff-cream/50 text-base md:text-lg max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed"
          >
            No roadmap. No utility. No promises. Just a giraffe who&apos;s seen
            some things on the blockchain and decided to stay anyway.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <a
              href="#how-to-buy"
              className="group relative px-8 py-4 bg-geff-orange text-geff-dark font-bold text-lg rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-geff-orange/25 hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                Buy $geff
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-geff-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            <Link
              href="/os"
              className="group px-8 py-4 border-2 border-geff-cream/20 text-geff-cream font-bold text-lg rounded-full transition-all duration-300 hover:bg-geff-cream/5 hover:border-geff-orange/50 hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              Enter geffOS
              <ArrowRight size={16} className="text-geff-orange group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0 flex justify-center lg:justify-end"
        >
          <div className="relative animate-float">
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <Image
                src="/images/1.jpg"
                alt="Geff the Giraffe"
                fill
                className="object-cover rounded-3xl shadow-2xl shadow-geff-orange/20 border-2 border-geff-orange/10"
                priority
              />
            </div>
            <div className="absolute -inset-3 border-2 border-geff-orange/15 rounded-[2rem] -rotate-3" />
            <div className="absolute -inset-6 border border-geff-brown/8 rounded-[2.5rem] rotate-2" />

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, type: "spring", stiffness: 200 }}
              className="absolute -bottom-3 -right-3 bg-geff-orange text-geff-dark px-4 py-2 rounded-full font-display text-sm font-bold shadow-lg"
            >
              $geff
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-geff-cream/30 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 border-2 border-geff-cream/20 rounded-full flex justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 bg-geff-cream/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
