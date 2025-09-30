"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, ArrowLeft, Zap, Eye, Sparkles } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function ScannerPage() {
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    const url = URL.createObjectURL(f)
    setPreview(url)
    // mock recognition after a short delay
    setResult(null)
    setTimeout(() => {
      setResult("Detected pattern: Traditional Diagonal Grid • Confidence: 94%")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-purple-50">
      <header className="fixed top-0 w-full z-50 glass border-b border-primary/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <ArrowLeft className="w-5 h-5" />
              <div className="text-2xl">🔍</div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Kolam Studio</h1>
                <p className="text-xs text-muted-foreground">Scanner</p>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <div className="pt-28 pb-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <Card className="glass-card mb-8">
            <CardHeader>
              <CardTitle>Scan a Kolam (Mock)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">Upload a photo of a Kolam and the mock AI will identify a pattern.</p>
              <input type="file" accept="image/*" onChange={handleFile} />
              {preview && <img src={preview} className="mt-4 w-full h-64 object-contain rounded" />}
              {result && (
                <div className="mt-4 p-4 bg-white rounded shadow">
                  <div className="font-semibold">Analysis Result</div>
                  <div className="mt-2 text-sm">{result}</div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
