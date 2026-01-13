"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🍌</span>
            <span className="text-xl font-bold text-foreground">Nano Banana</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="#editor" className="text-sm text-foreground hover:text-primary transition-colors">
              Image Editor
            </Link>
            <Link href="#showcase" className="text-sm text-foreground hover:text-primary transition-colors">
              Showcase
            </Link>
            <Link href="#pricing" className="text-sm text-foreground hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="#faq" className="text-sm text-foreground hover:text-primary transition-colors">
              FAQ
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Launch Now
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
