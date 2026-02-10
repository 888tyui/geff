import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative py-14 border-t border-geff-brown/15">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <Link href="#home" className="flex items-center gap-2 justify-center md:justify-start hover:opacity-80 transition-opacity">
              <Image src="/images/1.jpg" alt="geff" width={32} height={32} className="rounded-full" />
              <span className="font-display text-3xl text-geff-orange hover:text-geff-gold transition-colors">geff</span>
            </Link>
            <p className="text-geff-cream/25 text-sm mt-1">
              The Tallest Meme on Solana
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-sm text-geff-cream/35">
            <a href="#home" className="hover:text-geff-cream/70 transition-colors">Home</a>
            <a href="#about" className="hover:text-geff-cream/70 transition-colors">About</a>
            <a href="#gallery" className="hover:text-geff-cream/70 transition-colors">Gallery</a>
            <a href="#how-to-buy" className="hover:text-geff-cream/70 transition-colors">How to Buy</a>
            <Link href="/os" className="hover:text-geff-cream/70 transition-colors">geffOS</Link>
          </nav>

          <p className="text-geff-cream/15 text-xs">
            &copy; {new Date().getFullYear()} geff
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-geff-brown/8 text-center">
          <p className="text-geff-cream/15 text-xs leading-relaxed max-w-xl mx-auto">
            $geff is a meme coin with no intrinsic value or expectation of financial return.
            This is not financial advice. Always do your own research.
          </p>
        </div>
      </div>
    </footer>
  );
}
