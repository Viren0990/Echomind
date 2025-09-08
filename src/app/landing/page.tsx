import { Hero } from "@/components/landing/Hero"
import { CstSection } from "@/components/landing/CtaSection"
import { CharSection } from "@/components/landing/CharSection";
import { Footer } from "@/components/landing/Footer"

export default function Landing(){
    return(

        <div className="min-h-screen"> 
            <Hero />
            {/* Character Showcase Section */}
            <CharSection />
            
            {/* CTA Section */}
            <CstSection />
            
            {/* Footer */}
            <Footer />
            
        </div>
    )
}
