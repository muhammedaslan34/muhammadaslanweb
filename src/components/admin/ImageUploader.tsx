"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X, Image as ImageIcon } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

interface ImageUploaderProps {
  value: string
  onChange: (url: string) => void
  type?: "projects" | "blog" | "general"
  label?: string
  required?: boolean
}

export default function ImageUploader({
  value,
  onChange,
  type = "general",
  label = "Image",
  required = false,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(value)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"]
    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed")
      return
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      toast.error("File too large. Maximum size is 5MB")
      return
    }

    setUploading(true)

    try {
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)

      // Upload file
      const formData = new FormData()
      formData.append("file", file)
      formData.append("type", type)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to upload image")
      }

      const data = await response.json()
      onChange(data.url)
      setPreview(data.url)
      toast.success("Image uploaded successfully!")
    } catch (error: any) {
      toast.error(error.message || "Failed to upload image")
      setPreview(value)
    } finally {
      setUploading(false)
    }
  }

  const handleUrlChange = (url: string) => {
    onChange(url)
    setPreview(url)
  }

  const handleRemove = () => {
    onChange("")
    setPreview("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-4">
      <Label>
        {label} {required && "*"}
      </Label>

      {/* URL Input */}
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => handleUrlChange(e.target.value)}
          placeholder="Or paste image URL"
          required={required}
        />
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Upload Button */}
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="w-full"
        >
          <Upload className="h-4 w-4 mr-2" />
          {uploading ? "Uploading..." : "Upload Image"}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Preview */}
      {preview && (
        <div className="relative w-full h-48 border rounded-lg overflow-hidden bg-muted">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover"
            onError={() => {
              setPreview("")
              toast.error("Failed to load image preview")
            }}
          />
        </div>
      )}

      {!preview && (
        <div className="flex items-center justify-center w-full h-48 border-2 border-dashed rounded-lg bg-muted/50">
          <div className="text-center text-muted-foreground">
            <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No image selected</p>
          </div>
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Accepted formats: JPEG, PNG, WebP, GIF (Max 5MB)
      </p>
    </div>
  )
}
