"use client";

import Image from "next/image";
import { useState } from "react";
import { Laugh } from "lucide-react";

const memes = [
  { src: "/images/5.jpg", caption: "When you check the chart at 3AM" },
  { src: "/images/12.jpg", caption: "Portfolio just hit ATH" },
  { src: "/images/3.jpg", caption: "After buying the dip" },
  { src: "/images/6.jpg", caption: "Mona geff" },
  { src: "/images/2.jpg", caption: "geff. James geff." },
  { src: "/images/4.jpg", caption: "Riding to the moon" },
  { src: "/images/8.jpg", caption: "SLAM DUNK on the bears" },
  { src: "/images/7.jpg", caption: "Me racing to buy the dip" },
  { src: "/images/11.jpg", caption: "Playing my cards right" },
  { src: "/images/15.jpg", caption: "Kickflipping over FUD" },
  { src: "/images/10.jpg", caption: "Deal? Deal." },
  { src: "/images/13.jpg", caption: "Baby geff on the way" },
];

export default function MemeGalleryApp() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const meme = memes[currentIndex];

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <Laugh className="w-6 h-6 text-[#E88B3A]" />
        <h2
          className="text-xl text-[#E88B3A]"
          style={{ fontFamily: "'Cimo Ones', cursive" }}
        >
          Meme Gallery
        </h2>
      </div>

      {/* Current Meme */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4 min-h-0">
        <div className="relative w-full max-w-sm aspect-square rounded-xl overflow-hidden border border-white/10">
          <Image
            src={meme.src}
            alt={meme.caption}
            fill
            className="object-cover"
          />
        </div>

        {/* Caption */}
        <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-3 max-w-sm w-full text-center">
          <p className="text-white/80 text-sm italic">&ldquo;{meme.caption}&rdquo;</p>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-4">
          <button
            onClick={() =>
              setCurrentIndex((currentIndex - 1 + memes.length) % memes.length)
            }
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/60 text-sm hover:bg-white/10 transition-all"
          >
            Prev
          </button>
          <span className="text-white/30 text-xs">
            {currentIndex + 1} / {memes.length}
          </span>
          <button
            onClick={() =>
              setCurrentIndex((currentIndex + 1) % memes.length)
            }
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/60 text-sm hover:bg-white/10 transition-all"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
