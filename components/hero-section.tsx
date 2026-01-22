"use client"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  const scrollToEditor = () => {
    document.getElementById("editor")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToShowcase = () => {
    document.getElementById("showcase")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-primary/20">
            <span className="text-xl">🍌</span>
            <span className="text-sm font-medium text-foreground">The AI model that outperforms Flux Kontext</span>
            <span className="text-sm font-semibold text-primary">Try Now →</span>
          </div>

          <div className="flex items-center justify-center gap-8">
            <span className="text-6xl animate-bounce-slow">🍌</span>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground text-balance">Nano Banana</h1>
            <span className="text-6xl animate-bounce-slow" style={{ animationDelay: "0.3s" }}>
              🍌
            </span>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
            Transform any image with simple text prompts. Nano-banana's advanced model delivers consistent character
            editing and scene preservation that surpasses Flux Kontext. Experience the future of AI image editing.
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={scrollToEditor}>
              Start Editing
            </Button>
            <Button size="lg" variant="outline" onClick={scrollToShowcase}>
              View Examples
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 pt-8 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <span className="text-muted-foreground">One-shot editing</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🖼️</span>
              <span className="text-muted-foreground">Multi-image support</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">💬</span>
              <span className="text-muted-foreground">Natural language</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
