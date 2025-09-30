"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Sparkles, Play, Star, Users, Globe, Book, Paintbrush } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function KolamStudioLanding() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-purple-50">
      {/* Navigation Header */}
      <header className="fixed top-0 w-full z-50 glass border-b border-primary/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🎨</div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Kolam Studio</h1>
                <p className="text-xs text-muted-foreground">South Indian Floor Art</p>
              </div>
            </div>

            {/* Regional Greetings */}
            <div className="hidden lg:flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                வணக்கம்
              </Badge>
              <Badge variant="outline" className="text-xs">
                నమస్కారం
              </Badge>
              <Badge variant="outline" className="text-xs">
                ನಮಸ್ಕಾರ
              </Badge>
              <Badge variant="outline" className="text-xs">
                നമസ്കാരം
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          {/* Animated Kolam Pattern Background */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="w-full h-full bg-[radial-gradient(circle_at_25%_25%,_var(--color-primary)_2px,_transparent_2px)] bg-[length:50px_50px]"></div>
          </div>

          <div className="relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-gradient bg-gradient-to-r from-[color:var(--color-tamil-orange)] via-accent to-purple-600 bg-clip-text text-transparent leading-tight">
              Kolam Studio
            </h1>

            <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-4xl mx-auto leading-relaxed text-balance">
              Preserve & Create South Indian Floor Art - The world's first AI-powered platform that reverse-engineers
              traditional Kolam, Muggulu & Rangoli patterns
            </p>

            {/* Multi-language Greeting Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              <Badge className="bg-[color:var(--color-tamil-orange)] text-white px-4 py-2 text-sm animate-float">
                வணக்கம் Tamil
              </Badge>
              <Badge
                className="bg-[color:var(--color-telugu-blue)] text-white px-4 py-2 text-sm animate-float"
                style={{ animationDelay: "0.5s" }}
              >
                నమస్కారం Telugu
              </Badge>
              <Badge
                className="bg-[color:var(--color-kannada-gold)] text-white px-4 py-2 text-sm animate-float"
                style={{ animationDelay: "1s" }}
              >
                ನಮಸ್ಕಾರ Kannada
              </Badge>
              <Badge
                className="bg-[color:var(--color-malayalam-green)] text-white px-4 py-2 text-sm animate-float"
                style={{ animationDelay: "1.5s" }}
              >
                നമസ്കാരം Malayalam
              </Badge>
            </div>

            {/* Main Feature Navigation Icons */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
              <Link href="/scanner">
                <Card className="glass-card hover:scale-105 transition-all duration-300 group cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center group-hover:animate-pulse">
                      <Camera className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Scanner</h3>
                    <p className="text-sm text-muted-foreground">Scan & Recreate</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/generator">
                <Card className="glass-card hover:scale-105 transition-all duration-300 group cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-accent rounded-full flex items-center justify-center group-hover:animate-pulse">
                      <Sparkles className="w-8 h-8 text-accent-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Generator</h3>
                    <p className="text-sm text-muted-foreground">AI Create</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/whiteboard">
                <Card className="glass-card hover:scale-105 transition-all duration-300 group cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center group-hover:animate-pulse">
                      <Paintbrush className="w-8 h-8 text-secondary-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Whiteboard</h3>
                    <p className="text-sm text-muted-foreground">Draw & Create</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/community">
                <Card className="glass-card hover:scale-105 transition-all duration-300 group cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-purple-600 rounded-full flex items-center justify-center group-hover:animate-pulse">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Community</h3>
                    <p className="text-sm text-muted-foreground">Share & Learn</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/library">
                <Card className="glass-card hover:scale-105 transition-all duration-300 group cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center group-hover:animate-pulse">
                      <Book className="w-8 h-8 text-secondary-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Library</h3>
                    <p className="text-sm text-muted-foreground">Your Designs</p>
                  </CardContent>
                </Card>
              </Link>
            </div>

            {/* Demo Button */}
            <div className="mt-8">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-4 text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-foreground">Preserve Culture with AI Technology</h2>

          {/* Step 1: Scan */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="glass-card hover:scale-105 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center group-hover:animate-pulse">
                  <Camera className="w-8 h-8 text-primary-foreground" />
                </div>
                <Badge variant="outline" className="mb-3">
                  Step 1
                </Badge>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Scan a Pattern</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Capture any Kolam/Muggulu and let AI analyze its grid, symmetry, and stroke order.
                </p>
                <Link href="/scanner">
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-primary hover:text-primary-foreground bg-transparent"
                  >
                    Open Scanner
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Step 2: Generate */}
            <Card className="glass-card hover:scale-105 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-accent rounded-full flex items-center justify-center group-hover:animate-pulse">
                  <Sparkles className="w-8 h-8 text-accent-foreground" />
                </div>
                <Badge variant="outline" className="mb-3">
                  Step 2
                </Badge>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Generate Variations</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Choose size and colors, optionally include your own design as a reference, and create new patterns.
                </p>
                <Link href="/generator">
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-accent hover:text-accent-foreground bg-transparent"
                  >
                    Open Generator
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Step 3: Draw */}
            <Card className="glass-card hover:scale-105 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-secondary rounded-full flex items-center justify-center group-hover:animate-pulse">
                  <Paintbrush className="w-8 h-8 text-secondary-foreground" />
                </div>
                <Badge variant="outline" className="mb-3">
                  Step 3
                </Badge>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Draw on Whiteboard</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Use the canvas tools to refine or create from scratch, then save or upload when ready.
                </p>
                <Link href="/whiteboard">
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-secondary hover:text-secondary-foreground bg-transparent"
                  >
                    Open Whiteboard
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Step 4: Save & Share */}
            <Card className="glass-card hover:scale-105 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-purple-600 rounded-full flex items-center justify-center group-hover:animate-pulse">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <Badge variant="outline" className="mb-3">
                  Step 4
                </Badge>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Save & Share</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Keep your designs in Library or share with the Community to teach and inspire others.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <Link href="/library">
                    <Button variant="outline" size="sm" className="hover:bg-purple-600 hover:text-white bg-transparent">
                      Open Library
                    </Button>
                  </Link>
                  <Link href="/community">
                    <Button variant="ghost" size="sm">
                      Community
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 via-accent/5 to-purple-600/5">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center group-hover:animate-pulse">
                <Star className="w-10 h-10 text-primary-foreground" />
              </div>
              <div className="text-4xl font-bold text-foreground mb-2">10,000+</div>
              <div className="text-muted-foreground">Patterns</div>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-4 bg-accent rounded-full flex items-center justify-center group-hover:animate-pulse">
                <Users className="w-10 h-10 text-accent-foreground" />
              </div>
              <div className="text-4xl font-bold text-foreground mb-2">200M+</div>
              <div className="text-muted-foreground">South Indians</div>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center group-hover:animate-pulse">
                <Globe className="w-10 h-10 text-secondary-foreground" />
              </div>
              <div className="text-4xl font-bold text-foreground mb-2">5</div>
              <div className="text-muted-foreground">States</div>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-4 bg-purple-600 rounded-full flex items-center justify-center group-hover:animate-pulse">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-foreground mb-2">∞</div>
              <div className="text-muted-foreground">AI Creations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 bg-card">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="text-3xl">🎨</div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">Kolam Studio</h3>
              <p className="text-muted-foreground">Preserving South Indian Heritage Through AI</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Community
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Support
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy
            </a>
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <Badge variant="outline" className="text-sm">
              தமிழ்
            </Badge>
            <Badge variant="outline" className="text-sm">
              తెలుగు
            </Badge>
            <Badge variant="outline" className="text-sm">
              ಕನ್ನಡ
            </Badge>
            <Badge variant="outline" className="text-sm">
              മലയാളം
            </Badge>
            <Badge variant="outline" className="text-sm">
              English
            </Badge>
          </div>

          <p className="text-muted-foreground text-sm">
            © 2024 Kolam Studio. Preserving cultural heritage through technology.
          </p>
        </div>
      </footer>
    </div>
  )
}
