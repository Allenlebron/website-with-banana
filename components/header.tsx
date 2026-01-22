"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState, useTransition } from "react"
import { createClient } from "@/lib/supabase/client"
import { signInWithGoogle, signOut } from "@/app/auth/actions"
import type { User } from "@supabase/supabase-js"

export function Header() {
  const [user, setUser] = useState<User | null>(null)
  const [isPending, startTransition] = useTransition()
  const supabase = createClient()

  useEffect(() => {
    // 获取当前用户
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleSignIn = () => {
    startTransition(() => {
      signInWithGoogle()
    })
  }

  const handleSignOut = () => {
    startTransition(() => {
      signOut()
    })
  }

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
            <Link href="/pricing" className="text-sm text-foreground hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="#faq" className="text-sm text-foreground hover:text-primary transition-colors">
              FAQ
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <div className="flex items-center gap-2">
                  {user.user_metadata?.avatar_url && (
                    <img
                      src={user.user_metadata.avatar_url}
                      alt="avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <span className="text-sm text-foreground hidden sm:inline">
                    {user.user_metadata?.full_name || user.email}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  disabled={isPending}
                >
                  {isPending ? "..." : "Sign Out"}
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignIn}
                  disabled={isPending}
                >
                  {isPending ? "..." : "Sign In with Google"}
                </Button>
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Launch Now
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
