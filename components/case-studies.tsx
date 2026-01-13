import { Card } from "@/components/ui/card"

const caseStudies = [
  {
    title: "Character Consistency",
    description: "Maintain perfect character details across multiple edits",
    image: "/anime-character-portrait-consistent-style.jpg",
    emoji: "🎭",
  },
  {
    title: "Scene Preservation",
    description: "Edit subjects while keeping backgrounds intact",
    image: "/person-in-urban-environment-photo-editing.jpg",
    emoji: "🏙️",
  },
  {
    title: "Style Transfer",
    description: "Apply artistic styles with natural language prompts",
    image: "/artistic-style-transformation-digital-art.jpg",
    emoji: "🎨",
  },
  {
    title: "Object Manipulation",
    description: "Add, remove, or modify objects seamlessly",
    image: "/seamless-object-editing-composite-image.jpg",
    emoji: "✨",
  },
]

export function CaseStudies() {
  return (
    <section id="showcase" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary mb-2">Showcase</p>
          <h2 className="text-4xl font-bold text-foreground mb-4">See What's Possible</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the powerful capabilities of Nano Banana's AI-powered image editing
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {caseStudies.map((study, index) => (
            <Card key={index} className="overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="relative h-64 bg-muted overflow-hidden">
                <img
                  src={study.image || "/placeholder.svg"}
                  alt={study.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 text-4xl">{study.emoji}</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-card-foreground mb-2">{study.title}</h3>
                <p className="text-muted-foreground">{study.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
