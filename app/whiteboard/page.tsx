"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Eraser, Trash2, Save, Upload, Paintbrush } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type CreatedDesign = {
  id: string
  name: string
  type: "Created"
  difficulty: "Custom"
  likes: number
  image: string // data URL
  createdAt: string
}

export default function WhiteboardPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const isDrawingRef = useRef(false)
  const lastPointRef = useRef<{ x: number; y: number } | null>(null)

  const [color, setColor] = useState<string>("var(--color-accent)")
  const [size, setSize] = useState<number>(6)
  const [isEraser, setIsEraser] = useState<boolean>(false)

  // Cultural color swatches
  const swatches = [
    { id: "tamil", value: "var(--color-tamil-orange)" },
    { id: "telugu", value: "var(--color-telugu-blue)" },
    { id: "kannada", value: "var(--color-kannada-gold)" },
    { id: "malayalam", value: "var(--color-malayalam-green)" },
    { id: "kumkum", value: "var(--color-accent)" },
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = containerRef.current
    if (!canvas || !parent) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    function resize() {
      const dpr = window.devicePixelRatio || 1
      const width = parent.clientWidth
      const height = Math.max(360, Math.floor(parent.clientWidth * 0.6))
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)

      // Soft paper-like background
      ctx.fillStyle = "rgba(245,242,230,0.9)"
      ctx.fillRect(0, 0, width, height)

      // Optional subtle dot grid like kolam guide
      ctx.fillStyle = "rgba(0,0,0,0.06)"
      const step = 30
      for (let y = step; y < height; y += step) {
        for (let x = step; x < width; x += step) {
          ctx.beginPath()
          ctx.arc(x, y, 1, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    resize()
    window.addEventListener("resize", resize)
    return () => window.removeEventListener("resize", resize)
  }, [])

  function getPos(e: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  function onPointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    isDrawingRef.current = true
    lastPointRef.current = getPos(e)
  }
  function onPointerUp() {
    isDrawingRef.current = false
    lastPointRef.current = null
  }
  function onPointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!isDrawingRef.current) return
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!
    const { x, y } = getPos(e)

    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.lineWidth = size
    ctx.strokeStyle = isEraser ? "rgba(245,242,230,0.9)" : color

    ctx.beginPath()
    const last = lastPointRef.current ?? { x, y }
    ctx.moveTo(last.x, last.y)
    ctx.lineTo(x, y)
    ctx.stroke()

    lastPointRef.current = { x, y }
  }

  function clearCanvas() {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!
    ctx.fillStyle = "rgba(245,242,230,0.9)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  function saveToLibrary() {
    const canvas = canvasRef.current!
    const dataUrl = canvas.toDataURL("image/png")
    const newDesign: CreatedDesign = {
      id: `${Date.now()}`,
      name: "Created Kolam",
      type: "Created",
      difficulty: "Custom",
      likes: 0,
      image: dataUrl,
      createdAt: new Date().toISOString(),
    }
    const existing = JSON.parse(localStorage.getItem("createdDesigns") || "[]")
    localStorage.setItem("createdDesigns", JSON.stringify([newDesign, ...existing]))
    alert("Saved to Library!")
  }

  function uploadToCommunity() {
    const canvas = canvasRef.current!
    const dataUrl = canvas.toDataURL("image/png")
    const post = {
      id: `${Date.now()}`,
      caption: "New Kolam from Whiteboard",
      image: dataUrl,
      createdAt: new Date().toISOString(),
      likes: 0,
      author: "You",
    }
    const existing = JSON.parse(localStorage.getItem("communityPosts") || "[]")
    localStorage.setItem("communityPosts", JSON.stringify([post, ...existing]))
    alert("Uploaded to Community!")
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
                <p className="text-xs text-muted-foreground">Whiteboard</p>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 animate-gradient bg-gradient-to-r from-[color:var(--color-tamil-orange)] via-accent to-purple-600 bg-clip-text text-transparent">
              Whiteboard
            </h1>
            <p className="text-foreground/80">Draw kolams with cultural palettes, then save or share.</p>
          </div>

          <Card className="glass-card mb-6">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Paintbrush className="w-5 h-5" /> Drawing Tools
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Toolbar */}
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground mr-1">Colors:</span>
                  {swatches.map((s) => (
                    <button
                      key={s.id}
                      className={`h-8 w-8 rounded-full border ${color === s.value ? "ring-2 ring-primary" : ""}`}
                      style={{ background: `var(--color-${s.id === "kumkum" ? "accent" : s.id}-???)` }}
                      // The style above is only for ring contrast; actual color is applied inline:
                      onClick={() => {
                        setColor(s.value)
                        setIsEraser(false)
                      }}
                      aria-label={`Select ${s.id} color`}
                    >
                      {/* color fill */}
                      <span className="block h-full w-full rounded-full" style={{ background: s.value }} />
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Brush</span>
                  <input
                    type="range"
                    min={2}
                    max={24}
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    className="w-40"
                    aria-label="Brush size"
                  />
                  <span className="text-sm text-muted-foreground">{size}px</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant={isEraser ? "default" : "outline"} onClick={() => setIsEraser((v) => !v)}>
                    <Eraser className="w-4 h-4 mr-2" />
                    {isEraser ? "Eraser On" : "Eraser"}
                  </Button>
                  <Button variant="outline" onClick={clearCanvas}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                </div>
              </div>

              {/* Canvas */}
              <div ref={containerRef} className="w-full">
                <canvas
                  ref={canvasRef}
                  className="w-full rounded-lg border bg-white touch-none"
                  onPointerDown={onPointerDown}
                  onPointerUp={onPointerUp}
                  onPointerMove={onPointerMove}
                  onPointerLeave={onPointerUp}
                />
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={saveToLibrary}>
                  <Save className="w-4 h-4 mr-2" /> Save to Library
                </Button>
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={uploadToCommunity}>
                  <Upload className="w-4 h-4 mr-2" /> Upload to Community
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Badge variant="outline" className="text-muted-foreground">
              Tip: Use smaller brush for intricate loops.
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
