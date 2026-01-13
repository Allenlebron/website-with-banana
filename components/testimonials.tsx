import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Digital Artist",
    content:
      "Nano Banana has revolutionized my workflow. The character consistency is unmatched - I can edit portraits while maintaining every detail perfectly.",
    rating: 5,
    avatar: "👩‍🎨",
  },
  {
    name: "Marcus Rodriguez",
    role: "Content Creator",
    content:
      "Finally, an AI tool that understands natural language! I can describe exactly what I want and it delivers. The speed is incredible too.",
    rating: 5,
    avatar: "👨‍💼",
  },
  {
    name: "Emily Johnson",
    role: "Photography Studio Owner",
    content:
      "This tool has saved us countless hours in post-production. The scene preservation feature is a game-changer for our commercial work.",
    rating: 5,
    avatar: "👩‍💻",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary mb-2">Testimonials</p>
          <h2 className="text-4xl font-bold text-foreground mb-4">Loved by Creators</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">See what professionals are saying about Nano Banana</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-card-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>
              <div className="flex items-center gap-3">
                <div className="text-3xl">{testimonial.avatar}</div>
                <div>
                  <p className="font-semibold text-card-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
