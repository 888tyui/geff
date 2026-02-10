"use client";

import Image from "next/image";
import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";

const images = Array.from({ length: 16 }, (_, i) => ({
  src: `/images/${i + 1}.jpg`,
  label: `geff #${i + 1}`,
}));

export default function GalleryApp() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <ImageIcon className="w-6 h-6 text-[#E88B3A]" />
        <h2
          className="text-xl text-[#E88B3A]"
          style={{ fontFamily: "'Cimo Ones', cursive" }}
        >
          Gallery
        </h2>
        <span className="text-white/30 text-xs ml-auto">{images.length} images</span>
      </div>

      {selected !== null ? (
        <div className="flex-1 flex flex-col">
          <div className="flex-1 relative rounded-xl overflow-hidden bg-black/30">
            <Image
              src={images[selected].src}
              alt={images[selected].label}
              fill
              className="object-contain"
            />
          </div>
          <div className="flex items-center justify-between mt-3">
            <button
              onClick={() => setSelected((selected - 1 + images.length) % images.length)}
              className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white/60 text-sm hover:bg-white/10 transition-all"
            >
              Prev
            </button>
            <span className="text-white/50 text-xs">
              {images[selected].label}
            </span>
            <button
              onClick={() => setSelected((selected + 1) % images.length)}
              className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white/60 text-sm hover:bg-white/10 transition-all"
            >
              Next
            </button>
          </div>
          <button
            onClick={() => setSelected(null)}
            className="mt-2 text-white/30 text-xs hover:text-white/60 transition-colors"
          >
            Back to grid
          </button>
        </div>
      ) : (
        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-4 gap-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className="group relative aspect-square rounded-lg overflow-hidden border border-white/5 hover:border-[#E88B3A]/40 transition-all"
              >
                <Image
                  src={img.src}
                  alt={img.label}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="100px"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
