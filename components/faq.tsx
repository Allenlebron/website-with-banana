import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What makes Nano Banana different from other AI image editors?",
    answer:
      "Nano Banana uses advanced AI models that excel at character consistency and scene preservation. Unlike other tools, our natural language processing understands complex editing instructions and maintains visual coherence across multiple edits.",
  },
  {
    question: "What file formats are supported?",
    answer:
      "We support all major image formats including JPG, PNG, WebP, and HEIC. Maximum file size is 50MB per image. You can upload multiple reference images for batch processing.",
  },
  {
    question: "How does the pricing work?",
    answer:
      "We offer flexible pricing based on usage. Start with our free tier that includes 10 generations per month, or upgrade to Pro for unlimited generations, faster processing, and priority support.",
  },
  {
    question: "Can I use Nano Banana for commercial projects?",
    answer:
      "Yes! All Pro plan subscribers have full commercial rights to their generated images. Free tier users can upgrade at any time to unlock commercial usage.",
  },
  {
    question: "How long does it take to generate an image?",
    answer:
      "Most generations complete in 5-15 seconds depending on complexity. Pro users get priority processing with even faster generation times.",
  },
  {
    question: "Is my data secure and private?",
    answer:
      "Absolutely. All uploads are encrypted in transit and at rest. We never use your images for training, and you can delete your data at any time from your account settings.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary mb-2">FAQ</p>
          <h2 className="text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">Everything you need to know about Nano Banana</p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                <span className="mr-2">🍌</span>
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
