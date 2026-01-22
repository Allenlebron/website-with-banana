import type { Metadata } from "next"
import { Header } from "@/components/header"
import { PricingSection } from "@/components/pricing-section"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
    title: "Nano Banana Pricing - Affordable AI Image Editing Plans",
    description:
        "Choose the perfect Nano Banana plan for your needs. Flexible pricing for individuals and teams. Start editing with AI today.",
}

export default function PricingPage() {
    return (
        <main className="min-h-screen">
            <Header />
            <div className="pt-20">
                <PricingSection />
                <FAQ />
            </div>
            <Footer />
        </main>
    )
}
