"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const socials = [
  {
    name: "X",
    href: "https://x.com/Geffmeme",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "X Community",
    href: "https://x.com/i/communities/2021322648903712992",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function CommunitySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0">
        <Image src="/images/bg2.jpg" alt="Night cityscape" fill className="object-cover" />
        <div className="absolute inset-0 bg-geff-dark/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-geff-dark via-transparent to-geff-dark/90" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-geff-cream mb-4 text-glow-cream">
            JOIN THE{" "}
            <span className="text-geff-gold text-glow-gold">HERD</span>
          </h2>
          <p className="text-geff-cream/35 text-lg max-w-md mx-auto">
            Misery loves company. So does a good meme coin.
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3">
          {socials.map((social, i) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.08, y: -3, boxShadow: "0 10px 30px rgba(232, 139, 58, 0.15)" }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center justify-center gap-3 px-7 py-4 bg-geff-dark/50 backdrop-blur-lg border border-geff-brown/15 rounded-full text-geff-cream/60 hover:text-geff-cream transition-all duration-300 hover:border-geff-orange/30 hover:bg-geff-dark/70"
            >
              <motion.span
                className="group-hover:text-geff-orange transition-colors duration-300"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {social.icon}
              </motion.span>
              <span className="font-medium text-sm">{social.name}</span>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-14 text-center"
        >
          <motion.a
            href="https://pump.fun/coin/9nB7UbFPVh1dBXDhFxSRMLACGbASbdVsgB6TVSbtpump"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.12, boxShadow: "0 0 40px rgba(232, 139, 58, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="group inline-flex items-center gap-3 px-10 py-5 bg-geff-orange text-geff-dark font-bold text-lg rounded-full transition-all duration-300 hover:bg-geff-gold"
          >
            <span className="font-display">Buy $geff Now</span>
            <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
