"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Loader2, Download, X } from "lucide-react"

type Mode = "image-to-image" | "text-to-image"

export function EditorSection() {
  const [prompt, setPrompt] = useState("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mode, setMode] = useState<Mode>("image-to-image")

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
        setError(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleClearImage = () => {
    setSelectedImage(null)
  }

  const handleGenerate = async () => {
    // 验证输入
    if (!prompt.trim()) {
      setError("请输入提示词")
      return
    }

    if (mode === "image-to-image" && !selectedImage) {
      setError("请先上传一张参考图片")
      return
    }

    setIsLoading(true)
    setError(null)
    setGeneratedImage(null)

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          image: mode === "image-to-image" ? selectedImage : null,
          mode,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "生成失败")
      }

      setGeneratedImage(data.image)
    } catch (err) {
      setError(err instanceof Error ? err.message : "生成失败，请重试")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = () => {
    if (!generatedImage) return

    const link = document.createElement("a")
    link.href = generatedImage
    link.download = `nano-banana-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section id="editor" className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary mb-2">Get Started</p>
          <h2 className="text-4xl font-bold text-foreground mb-4">Try The AI Editor</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the power of nano-banana's natural language image editing. Transform any photo with simple text
            commands
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Prompt Engine */}
          <Card className="p-6 bg-card border-2 border-primary/20">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🍌</span>
              <h3 className="text-xl font-bold text-card-foreground">Prompt Engine</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Transform your image with AI-powered editing</p>

            <div className="space-y-4">
              <div className="flex gap-2">
                <Button
                  className={`flex-1 ${mode === "image-to-image" ? "bg-primary hover:bg-primary/90 text-primary-foreground" : "bg-transparent"}`}
                  variant={mode === "image-to-image" ? "default" : "outline"}
                  onClick={() => setMode("image-to-image")}
                >
                  Image to Image
                </Button>
                <Button
                  className={`flex-1 ${mode === "text-to-image" ? "bg-primary hover:bg-primary/90 text-primary-foreground" : "bg-transparent"}`}
                  variant={mode === "text-to-image" ? "default" : "outline"}
                  onClick={() => setMode("text-to-image")}
                >
                  Text to Image
                </Button>
              </div>

              {mode === "image-to-image" && (
                <div>
                  <label className="text-sm font-medium text-card-foreground mb-2 block">
                    <span className="text-xl mr-1">🍌</span>
                    Reference Image
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      {selectedImage ? (
                        <div className="relative inline-block">
                          <img
                            src={selectedImage}
                            alt="Preview"
                            className="max-h-32 mx-auto rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault()
                              handleClearImage()
                            }}
                            className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">Add Image</p>
                          <p className="text-xs text-muted-foreground">Max 50MB</p>
                        </>
                      )}
                    </label>
                  </div>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-card-foreground mb-2 block">
                  <span className="text-xl mr-1">😊</span>
                  Main Prompt
                </label>
                <Textarea
                  value={prompt}
                  onChange={(e) => {
                    setPrompt(e.target.value)
                    setError(null)
                  }}
                  placeholder={mode === "image-to-image"
                    ? "Transform this image into anime style, add vibrant colors..."
                    : "A futuristic city powered by nano technology, golden hour lighting, ultra detailed..."}
                  className="min-h-32 resize-none"
                />
              </div>

              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                size="lg"
                onClick={handleGenerate}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <span className="text-xl mr-2">✨</span>
                    Generate Now
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Output Gallery */}
          <Card className="p-6 bg-card border-2 border-primary/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🖼️</span>
                <h3 className="text-xl font-bold text-card-foreground">Output Gallery</h3>
              </div>
              {generatedImage && (
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-4">Your ultra-fast AI creations appear here instantly</p>

            <div className="border-2 border-dashed border-border rounded-lg p-4 flex flex-col items-center justify-center min-h-96 bg-muted/30">
              {isLoading ? (
                <div className="flex flex-col items-center">
                  <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                  <h4 className="text-lg font-semibold text-card-foreground mb-2">Generating your image...</h4>
                  <p className="text-sm text-muted-foreground text-center">This may take a few seconds</p>
                </div>
              ) : generatedImage ? (
                <img
                  src={generatedImage}
                  alt="Generated"
                  className="max-w-full max-h-96 rounded-lg shadow-lg"
                />
              ) : (
                <>
                  <div className="text-6xl mb-4">📸</div>
                  <h4 className="text-lg font-semibold text-card-foreground mb-2">Ready for Instant generation</h4>
                  <p className="text-sm text-muted-foreground text-center">Enter your prompt and unleash the power</p>
                </>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
