"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Heart, Download, Share, Eye, Trash2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function LibraryPage() {
  const defaultSavedDesigns = [
    {
      id: 1,
      name: "Diwali Special",
      type: "Generated",
      difficulty: "Intermediate",
      likes: 24,
      image: "/traditional-kolam-pattern-diwali.png",
    },
    {
      id: 2,
      name: "Morning Kolam",
      type: "Scanned",
      difficulty: "Beginner",
      likes: 18,
      image: "/simple-morning-kolam-dots.png",
    },
    {
      id: 3,
      name: "Wedding Rangoli",
      type: "Generated",
      difficulty: "Advanced",
      likes: 42,
      image: "/elaborate-wedding-rangoli-pattern.png",
    },
    {
      id: 4,
      name: "Pongal Design",
      type: "Scanned",
      difficulty: "Intermediate",
      likes: 31,
      image: "/pongal-kolam-rice-pattern.png",
    },
    {
      id: 5,
      name: "Lotus Muggulu",
      type: "Generated",
      difficulty: "Advanced",
      likes: 56,
      image: "/lotus-muggulu-telugu-pattern.png",
    },
    {
      id: 6,
      name: "Daily Practice",
      type: "Scanned",
      difficulty: "Beginner",
      likes: 12,
      image: "/daily-practice-kolam-simple.png",
    },
  ]
  const [savedDesigns, setSavedDesigns] =
    useState<
      { id: number; name: string; type: "Generated" | "Scanned"; difficulty: string; likes: number; image: string }[]
    >(defaultSavedDesigns)
  const [createdDesigns, setCreatedDesigns] = useState<
    { id: string; name: string; type: "Created"; difficulty: string; likes: number; image: string }[]
  >([])

  useEffect(() => {
    try {
      const localCreated = JSON.parse(localStorage.getItem("createdDesigns") || "[]")
      setCreatedDesigns(localCreated)
      const localSaved = JSON.parse(localStorage.getItem("savedDesigns") || "null")
      if (Array.isArray(localSaved)) setSavedDesigns(localSaved)
    } catch {
      setCreatedDesigns([])
      setSavedDesigns(defaultSavedDesigns)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem("savedDesigns", JSON.stringify(savedDesigns))
    } catch {}
  }, [savedDesigns])

  const deleteCreated = (id: string) => {
    const next = createdDesigns.filter((d) => d.id !== id)
    setCreatedDesigns(next)
    try {
      localStorage.setItem("createdDesigns", JSON.stringify(next))
    } catch {}
  }
  const deleteSaved = (id: number) => {
    setSavedDesigns((prev) => prev.filter((d) => d.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-purple-50">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 glass border-b border-primary/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <ArrowLeft className="w-5 h-5" />
              <div className="text-2xl">🎨</div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Kolam Studio</h1>
                <p className="text-xs text-muted-foreground">Library</p>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-gradient bg-gradient-to-r from-[color:var(--color-tamil-orange)] via-accent to-purple-600 bg-clip-text text-transparent">
              Your Library
            </h1>
            <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed text-balance">
              Your saved and generated Kolam designs collection
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <Card className="glass-card text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-foreground">{savedDesigns.length + createdDesigns.length}</div>
                <div className="text-sm text-muted-foreground">Total Designs</div>
              </CardContent>
            </Card>
            <Card className="glass-card text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-[color:var(--color-tamil-orange)]">
                  {savedDesigns.filter((d) => d.type === "Generated").length}
                </div>
                <div className="text-sm text-muted-foreground">Generated</div>
              </CardContent>
            </Card>
            <Card className="glass-card text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-[color:var(--color-telugu-blue)]">
                  {savedDesigns.filter((d) => d.type === "Scanned").length}
                </div>
                <div className="text-sm text-muted-foreground">Scanned</div>
              </CardContent>
            </Card>
            <Card className="glass-card text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-[color:var(--color-kannada-gold)]">
                  {savedDesigns.reduce((acc, d) => acc + d.likes, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Likes</div>
              </CardContent>
            </Card>
            <Card className="glass-card text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-[color:var(--color-malayalam-green)]">
                  {createdDesigns.length}
                </div>
                <div className="text-sm text-muted-foreground">Created</div>
              </CardContent>
            </Card>
          </div>

          {/* Created Designs section */}
          {createdDesigns.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Created Designs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {createdDesigns.map((design) => (
                  <Card key={design.id} className="glass-card hover:scale-105 transition-all duration-300 group">
                    <CardHeader className="p-0">
                      <div className="relative">
                        <img
                          src={design.image || "/placeholder.svg"}
                          alt={design.name}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <Badge className="absolute top-3 left-3 bg-[color:var(--color-accent)] text-white">
                          Created
                        </Badge>
                        <Badge variant="outline" className="absolute top-3 right-3 bg-white/90">
                          {design.difficulty}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 text-foreground">{design.name}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm">{design.likes}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Share className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteCreated(design.id)}
                            aria-label="Delete created design"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {/* Designs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedDesigns.map((design) => (
              <Card key={design.id} className="glass-card hover:scale-105 transition-all duration-300 group">
                <CardHeader className="p-0">
                  <div className="relative">
                    <img
                      src={design.image || "/placeholder.svg"}
                      alt={design.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge
                      className={`absolute top-3 left-3 ${
                        design.type === "Generated"
                          ? "bg-[color:var(--color-tamil-orange)]"
                          : "bg-[color:var(--color-telugu-blue)]"
                      } text-white`}
                    >
                      {design.type}
                    </Badge>
                    <Badge variant="outline" className="absolute top-3 right-3 bg-white/90">
                      {design.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 text-foreground">{design.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{design.likes}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteSaved(design.id)}
                        aria-label="Delete saved design"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
