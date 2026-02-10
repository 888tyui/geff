"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#gallery", label: "Gallery" },
  { href: "#how-to-buy", label: "How to Buy" },
  { href: "/os", label: "geffOS", external: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4"
      style={{ paddingTop: scrolled ? "12px" : "24px", transition: "padding 0.5s ease" }}
    >
      <div
        className={`flex items-center gap-1 px-2 py-2 rounded-full border transition-all duration-500 ${
          scrolled
            ? "bg-geff-dark/80 border-geff-brown/30 shadow-lg shadow-geff-orange/10 backdrop-blur-xl"
            : "bg-geff-dark/40 border-geff-brown/15 backdrop-blur-md"
        }`}
      >
        <Link
          href="#home"
          className="flex items-center gap-2 px-3 py-1 hover:opacity-80 transition-opacity"
        >
          <Image
            src="/images/1.jpg"
            alt="geff"
            width={28}
            height={28}
            className="rounded-full"
          />
          <span className="font-display text-xl text-geff-orange tracking-wider">
            geff
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) =>
            link.external ? (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm text-geff-dark font-bold bg-geff-orange rounded-full transition-all duration-300 hover:bg-geff-gold hover:scale-105 active:scale-95 ml-1"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm text-geff-cream/60 hover:text-geff-cream rounded-full transition-all duration-300 hover:bg-geff-brown/15"
              >
                {link.label}
              </a>
            )
          )}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2.5 text-geff-cream/70 hover:text-geff-cream rounded-full hover:bg-geff-brown/20 transition-colors"
          aria-label="Toggle menu"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            {mobileOpen ? (
              <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <>
                <path d="M2 5H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M2 9H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M2 13H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 left-4 right-4 md:hidden bg-geff-dark/95 backdrop-blur-xl border border-geff-brown/30 rounded-2xl overflow-hidden shadow-xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-6 py-3.5 text-geff-cream/70 hover:text-geff-cream hover:bg-geff-brown/15 transition-all border-b border-geff-brown/10 last:border-b-0"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
