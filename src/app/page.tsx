import { Hero } from "@/components/landing/Hero"
import { CstSection } from "@/components/landing/CtaSection"
import { CharSection } from "@/components/landing/CharSection";
import { Footer } from "@/components/landing/Footer"


export default function Home() {
  return (
      <div className="min-h-screen"> 
            <Hero />
            <CharSection />
            <CstSection />
            <Footer />
        </div>
  );
}
