"use client"

import { useState, useEffect, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Check, Zap, Rocket, Crown } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { signInWithGoogle } from "@/app/auth/actions"
import type { User } from "@supabase/supabase-js"

const PAYPAL_LINK = "https://www.paypal.com/ncp/payment/MDPQSUK62MUQ2"

interface PricingPlan {
    name: string
    icon: React.ReactNode
    monthlyPrice: number
    yearlyPrice: number
    credits: string
    features: string[]
    highlighted?: boolean
    badge?: string
}

const pricingPlans: PricingPlan[] = [
    {
        name: "Basic",
        icon: <Zap className="w-6 h-6" />,
        monthlyPrice: 9,
        yearlyPrice: 4.5,
        credits: "100 images/month",
        features: [
            "100 high-quality images/month",
            "All style templates included",
            "Standard generation speed",
            "Basic customer support",
            "JPG/PNG format downloads",
            "Commercial Use License",
        ],
    },
    {
        name: "Pro",
        icon: <Rocket className="w-6 h-6" />,
        monthlyPrice: 39,
        yearlyPrice: 19.5,
        credits: "400 images/month",
        highlighted: true,
        badge: "Most Popular",
        features: [
            "400 high-quality images/month",
            "Support Seedream-4 Model",
            "Support Nanobanana-Pro Model",
            "All style templates included",
            "Priority generation queue",
            "Priority customer support",
            "JPG/PNG/WebP format downloads",
            "Batch generation feature",
            "Image editing tools (Coming Soon)",
            "Commercial Use License",
        ],
    },
    {
        name: "Enterprise",
        icon: <Crown className="w-6 h-6" />,
        monthlyPrice: 160,
        yearlyPrice: 80,
        credits: "1800 images/month",
        features: [
            "1800 high-quality images/month",
            "Support Seedream-4 Model",
            "Support Nanobanana-Pro Model",
            "All style templates included",
            "Fastest generation speed",
            "Dedicated account manager",
            "All format downloads",
            "Batch generation feature",
            "Professional editing suite (Coming Soon)",
            "Commercial Use License",
        ],
    },
]

export function PricingSection() {
    const [isYearly, setIsYearly] = useState(true)
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

    const handleSubscribe = () => {
        if (user) {
            // 已登录，跳转 PayPal
            window.open(PAYPAL_LINK, "_blank")
        } else {
            // 未登录，先登录
            startTransition(() => {
                signInWithGoogle()
            })
        }
    }

    return (
        <section id="pricing" className="py-24 bg-gradient-to-b from-amber-50/50 to-orange-50/30">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    {isYearly && (
                        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <Zap className="w-4 h-4" />
                            Limited Time: Save 50% with Annual Billing
                        </div>
                    )}
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                        Choose Your Perfect Plan
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Unlimited creativity starts here
                    </p>
                </div>

                {/* Billing Toggle */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex items-center bg-white rounded-full p-1 shadow-md border border-amber-200">
                        <button
                            onClick={() => setIsYearly(false)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${!isYearly
                                ? "bg-amber-500 text-white shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setIsYearly(true)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${isYearly
                                ? "bg-amber-500 text-white shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            Yearly
                            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                SAVE 50%
                            </span>
                        </button>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {pricingPlans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative rounded-2xl p-8 transition-all duration-300 ${plan.highlighted
                                ? "bg-white shadow-2xl scale-105 border-2 border-amber-400 z-10"
                                : "bg-white/80 shadow-lg border border-amber-100 hover:shadow-xl"
                                }`}
                        >
                            {/* Badge */}
                            {plan.badge && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold px-4 py-1 rounded-full shadow-lg">
                                        {plan.badge}
                                    </span>
                                </div>
                            )}

                            {/* Plan Header */}
                            <div className="text-center mb-6">
                                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${plan.highlighted
                                    ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white"
                                    : "bg-amber-100 text-amber-600"
                                    }`}>
                                    {plan.icon}
                                </div>
                                <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                            </div>

                            {/* Pricing */}
                            <div className="text-center mb-6">
                                <div className="flex items-baseline justify-center gap-1">
                                    <span className="text-4xl font-bold text-foreground">
                                        ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                                    </span>
                                    <span className="text-muted-foreground">/mo</span>
                                </div>
                                {isYearly && (
                                    <div className="mt-2 flex items-center justify-center gap-2">
                                        <span className="text-sm text-muted-foreground line-through">
                                            ${plan.monthlyPrice}/mo
                                        </span>
                                        <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">
                                            SAVE 50%
                                        </span>
                                    </div>
                                )}
                                <div className="mt-2 text-sm text-amber-600 font-medium">
                                    {isYearly
                                        ? `${parseInt(plan.credits) * 12} credits/year`
                                        : plan.credits}
                                </div>
                            </div>

                            {/* Features */}
                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm text-muted-foreground">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <Button
                                onClick={handleSubscribe}
                                disabled={isPending}
                                className={`w-full py-6 rounded-full font-semibold transition-all ${plan.highlighted
                                    ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg"
                                    : "bg-amber-100 hover:bg-amber-200 text-amber-800 border border-amber-300"
                                    }`}
                            >
                                {isPending ? "..." : user ? "Get Started" : "Sign In to Get Started"}
                            </Button>
                        </div>
                    ))}
                </div>

                {/* Footer Note */}
                <p className="text-center text-sm text-muted-foreground mt-12">
                    imgeditor.co is an independent product and is not affiliate with Google or any of its brands
                </p>
            </div>
        </section>
    )
}
