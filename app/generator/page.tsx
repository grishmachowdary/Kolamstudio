"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Wand2, Calendar, Star } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

const MOCK_IMAGES = [
  "/simple-morning-kolam-dots.png",
  "/daily-practice-kolam-simple.png",
  "/traditional-kolam-pattern-diwali.png",
  "/pongal-kolam-rice-pattern.png"
]

export default function GeneratorPage() {
  const [selectedSize, setSelectedSize] = useState<string>("Medium")
  const [selectedOccasion, setSelectedOccasion] = useState<string>("Festival")
  const [selectedColors, setSelectedColors] = useState<string[]>(["Red", "Yellow"])
  const [createdDesigns, setCreatedDesigns] = useState<{ id: string; image: string; name:string }[]>([])

  function handleGenerate() {
    // simple mock generation: pick a random mock image and create a design entry
    const img = MOCK_IMAGES[Math.floor(Math.random() * MOCK_IMAGES.length)]
    const newDesign = {
      id: `${Date.now()}`,
      image: img,
      name: `${selectedOccasion} - ${selectedSize}`
    }
    setCreatedDesigns(prev => [newDesign, ...prev])
  }

  function saveToLibrary(design:any) {
    // This example saves to localStorage as mock persistence
    const lib = JSON.parse(localStorage.getItem("kolam_library") || "[]")
    lib.unshift(design)
    localStorage.setItem("kolam_library", JSON.stringify(lib))
    alert("Saved to local library (mock)")
  }

  useEffect(() => {
    // load any previously created designs from session (optional)
    const saved = JSON.parse(sessionStorage.getItem("kolam_created") || "[]")
    setCreatedDesigns(saved)
  }, [])

  useEffect(() => {
    sessionStorage.setItem("kolam_created", JSON.stringify(createdDesigns))
  }, [createdDesigns])

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
                <p className="text-xs text-muted-foreground">Generator</p>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <div className="pt-28 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="glass-card mb-8">
            <CardHeader>
              <CardTitle>Create a Kolam Design (Mock)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm mb-1">Size</label>
                  <select className="w-full p-2 rounded border" value={selectedSize} onChange={e=>setSelectedSize(e.target.value)}>
                    <option>Small</option>
                    <option>Medium</option>
                    <option>Large</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-1">Occasion</label>
                  <select className="w-full p-2 rounded border" value={selectedOccasion} onChange={e=>setSelectedOccasion(e.target.value)}>
                    <option>Festival</option>
                    <option>Practice</option>
                    <option>Wedding</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-1">Colors (comma separated)</label>
                  <input className="w-full p-2 rounded border" value={selectedColors.join(", ")} onChange={e=>setSelectedColors(e.target.value.split(",").map(s=>s.trim()))} />
                </div>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <Button onClick={handleGenerate}>
                  <Wand2 className="w-4 h-4 mr-2" /> Generate Kolam Design
                </Button>
                <p className="text-sm text-muted-foreground">Generates mock designs using included images.</p>
              </div>
            </CardContent>
          </Card>

          {createdDesigns.length > 0 && (
            <Card className="glass-card mb-8">
              <CardHeader>
                <CardTitle>Your Generated Designs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {createdDesigns.map(d=>(
                    <div key={d.id} className="rounded overflow-hidden shadow-sm bg-white">
                      <img src={d.image} alt={d.name} className="w-full h-40 object-cover" />
                      <div className="p-3">
                        <div className="font-semibold">{d.name}</div>
                        <div className="mt-2 flex gap-2">
                          <Button onClick={()=>saveToLibrary(d)}>Save</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
