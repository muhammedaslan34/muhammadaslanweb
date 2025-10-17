"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link2,
  Image as ImageIcon,
  Code,
  Heading1,
  Heading2,
  Quote
} from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  label?: string
  placeholder?: string
  rows?: number
  required?: boolean
}

export default function MarkdownEditor({
  value,
  onChange,
  label = "Content",
  placeholder = "Write your content here...",
  rows = 15,
  required = false,
}: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write")

  const insertMarkdown = (before: string, after: string = "") => {
    const textarea = document.getElementById("markdown-editor") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end)

    onChange(newText)

    // Set cursor position after inserted text
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + before.length + selectedText.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  const toolbarButtons = [
    { icon: Heading1, action: () => insertMarkdown("# "), label: "Heading 1" },
    { icon: Heading2, action: () => insertMarkdown("## "), label: "Heading 2" },
    { icon: Bold, action: () => insertMarkdown("**", "**"), label: "Bold" },
    { icon: Italic, action: () => insertMarkdown("_", "_"), label: "Italic" },
    { icon: List, action: () => insertMarkdown("- "), label: "Bullet List" },
    { icon: ListOrdered, action: () => insertMarkdown("1. "), label: "Numbered List" },
    { icon: Link2, action: () => insertMarkdown("[", "](url)"), label: "Link" },
    { icon: ImageIcon, action: () => insertMarkdown("![alt](", ")"), label: "Image" },
    { icon: Code, action: () => insertMarkdown("`", "`"), label: "Inline Code" },
    { icon: Quote, action: () => insertMarkdown("> "), label: "Quote" },
  ]

  return (
    <div className="space-y-2">
      <Label>
        {label} {required && "*"}
      </Label>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "write" | "preview")}>
        <div className="flex items-center justify-between mb-2">
          <TabsList>
            <TabsTrigger value="write">Write</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          {activeTab === "write" && (
            <div className="flex gap-1 flex-wrap">
              {toolbarButtons.map((button, index) => (
                <Button
                  key={index}
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={button.action}
                  title={button.label}
                  className="h-8 w-8 p-0"
                >
                  <button.icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          )}
        </div>

        <TabsContent value="write" className="mt-0">
          <Textarea
            id="markdown-editor"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            required={required}
            className="font-mono text-sm"
          />
        </TabsContent>

        <TabsContent value="preview" className="mt-0">
          <div className="min-h-[300px] p-4 border rounded-md bg-card">
            {value ? (
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {value}
                </ReactMarkdown>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm italic">
                Nothing to preview yet. Start writing in the Write tab.
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <p>Supports Markdown formatting</p>
        <p>{value.length} characters</p>
      </div>
    </div>
  )
}
