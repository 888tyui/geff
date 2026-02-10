import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Marquee from "./components/Marquee";
import AboutSection from "./components/AboutSection";
import GallerySection from "./components/GallerySection";
import HowToBuySection from "./components/HowToBuySection";
import CommunitySection from "./components/CommunitySection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <Marquee />
      <AboutSection />
      <GallerySection />
      <HowToBuySection />
      <CommunitySection />
      <Footer />
    </main>
  );
}
