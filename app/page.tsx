import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { EditorSection } from "@/components/editor-section"
import { CaseStudies } from "@/components/case-studies"
import { Testimonials } from "@/components/testimonials"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <EditorSection />
      <CaseStudies />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  )
}
