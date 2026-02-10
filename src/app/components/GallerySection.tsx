"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useCallback } from "react";

const images = Array.from({ length: 16 }, (_, i) => ({
  src: `/images/${i + 1}.jpg`,
  alt: `geff #${i + 1}`,
}));

const gridConfig = [
  "md:col-span-2 md:row-span-2",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-2",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-2 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-2",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-2 md:row-span-1",
];

export default function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const navigateImage = useCallback(
    (direction: number) => {
      if (selectedImage === null) return;
      const next = (selectedImage + direction + images.length) % images.length;
      setSelectedImage(next);
    },
    [selectedImage]
  );

  return (
    <section id="gallery" ref={ref} className="relative py-28 md:py-36">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-geff-dark via-geff-dark-light/20 to-geff-dark" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-geff-cream mb-4">
            THE MANY FACES OF{" "}
            <span className="text-geff-orange text-glow-orange">geff</span>
          </h2>
          <p className="text-geff-cream/40 text-lg">
            One giraffe. Infinite vibes. Click to explore.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3 auto-rows-[140px] md:auto-rows-[180px]" style={{ gridAutoFlow: "dense" }}>
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.6) }}
              className={`${gridConfig[i]} relative group cursor-pointer overflow-hidden rounded-xl md:rounded-2xl`}
              onClick={() => setSelectedImage(i)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-geff-dark/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 border-2 border-geff-orange/0 group-hover:border-geff-orange/40 rounded-xl md:rounded-2xl transition-all duration-300" />
              <div className="absolute bottom-2 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                <span className="font-display text-geff-cream text-sm">
                  #{String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-geff-dark/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 flex items-center justify-center text-geff-cream/50 hover:text-geff-cream bg-geff-dark-card/50 rounded-full border border-geff-brown/20 hover:border-geff-orange/30 transition-all z-10"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {/* Nav arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); navigateImage(-1); }}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-geff-cream/50 hover:text-geff-cream bg-geff-dark-card/50 rounded-full border border-geff-brown/20 hover:border-geff-orange/30 transition-all z-10"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigateImage(1); }}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-geff-cream/50 hover:text-geff-cream bg-geff-dark-card/50 rounded-full border border-geff-brown/20 hover:border-geff-orange/30 transition-all z-10"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M7 4L12 9L7 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Image */}
            <motion.div
              key={selectedImage}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-xl w-full aspect-square"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                fill
                className="object-contain rounded-2xl"
                sizes="(max-width: 768px) 90vw, 600px"
              />
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                <span className="font-display text-geff-cream/50 text-lg">
                  {selectedImage + 1} / {images.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
