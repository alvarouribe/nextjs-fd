import HeroSection from "./components/HeroSection";
import FooterSection from "./components/FooterSection";

export default function Home() {
  return (
    <main data-test="home-page">
      <HeroSection />
      <FooterSection />
    </main>
  );
}
