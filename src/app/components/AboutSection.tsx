"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Eye, Shirt, Coffee, TrendingDown } from "lucide-react";

const traits = [
  { icon: Eye, text: "Sees everything from up there" },
  { icon: Shirt, text: "Hoodie never comes off" },
  { icon: Coffee, text: "Unbothered. Moisturized." },
  { icon: TrendingDown, text: "Has seen worse dips" },
];

const scatteredImages = [
  { src: "/images/14.jpg", alt: "Geff", rotate: -6, top: "0%", left: "0%", w: "w-52 h-52 md:w-64 md:h-64", z: 10, delay: 0 },
  { src: "/images/9.jpg", alt: "Geff", rotate: 4, top: "15%", left: "55%", w: "w-44 h-44 md:w-56 md:h-56", z: 20, delay: 0.15 },
  { src: "/images/12.jpg", alt: "Geff", rotate: -2, top: "52%", left: "18%", w: "w-48 h-48 md:w-60 md:h-60", z: 30, delay: 0.3 },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="relative py-28 md:py-36 overflow-hidden grain">
      <div className="absolute inset-0 giraffe-spots opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[420px] md:h-[520px] hidden lg:block">
            {scatteredImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, rotate: img.rotate * 2 }}
                animate={isInView ? { opacity: 1, y: 0, rotate: img.rotate } : {}}
                transition={{ duration: 0.8, delay: img.delay, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute ${img.w} cursor-pointer group`}
                style={{ top: img.top, left: img.left, zIndex: img.z }}
              >
                <div
                  className="relative w-full h-full transition-all duration-500 group-hover:rotate-0 group-hover:scale-110 group-hover:z-50"
                  style={{ transform: `rotate(${img.rotate}deg)` }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover rounded-2xl shadow-xl shadow-geff-dark/60 border border-geff-brown/20 group-hover:shadow-2xl group-hover:shadow-geff-orange/20 transition-shadow duration-500"
                  />
                </div>
              </motion.div>
            ))}
            <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-geff-orange/8 rounded-full blur-2xl" />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-geff-orange mb-8 text-glow-orange">
              who is geff?
            </h2>

            <p className="text-geff-cream/60 text-lg leading-relaxed mb-6">
              geff doesn&apos;t care about your portfolio. geff doesn&apos;t care about the
              market. geff exists because the blockchain needed a giraffe, and honestly,
              nobody tried to stop it.
            </p>

            <p className="text-geff-cream/60 text-lg leading-relaxed mb-10">
              With a neck longer than most people&apos;s watchlists, geff has been staring
              at charts since before you knew what a candlestick was. He&apos;s not impressed.
              But he&apos;s still here.
            </p>

            <div className="flex gap-3 mb-10 lg:hidden overflow-x-auto pb-2">
              {scatteredImages.map((img, i) => (
                <div key={i} className="relative w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden">
                  <Image src={img.src} alt={img.alt} fill className="object-cover" />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {traits.map((trait, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="group flex items-center gap-3 p-4 bg-geff-dark-card/60 border border-geff-brown/15 rounded-xl hover:border-geff-orange/25 hover:bg-geff-dark-card/80 transition-all duration-300"
                >
                  <trait.icon
                    size={18}
                    className="text-geff-orange/60 group-hover:text-geff-orange transition-colors flex-shrink-0"
                  />
                  <span className="text-geff-cream/65 text-sm">{trait.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
