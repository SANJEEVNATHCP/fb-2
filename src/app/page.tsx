import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import { ScrollSection } from "@/components/ScrollSection";
import DNASection from "@/components/DNASection";

export default function Home() {
  return (
    <>
      <Loader />
      <Navbar />
      <div className="flex-1 w-full relative z-0">
        {/* Hero is not wrapped — it has its own entry animations */}
        <Hero />

        {/* DNA Helix Scroll Experience */}
        <DNASection />

        <ScrollSection>
          <TrustedBy />
        </ScrollSection>

        <ScrollSection delay={50}>
          <Features />
        </ScrollSection>

        <ScrollSection delay={50}>
          <Testimonials />
        </ScrollSection>

        <ScrollSection delay={50}>
          <Pricing />
        </ScrollSection>

        <ScrollSection delay={50}>
          <FAQ />
        </ScrollSection>
      </div>
      <ScrollSection>
        <Footer />
      </ScrollSection>
    </>
  );
}
