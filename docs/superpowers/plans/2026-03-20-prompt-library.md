# Prompt Library Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an admin-only prompt/snippet library with custom categories, syntax-highlighted code previews, and full CRUD, integrated into the existing admin dashboard.

**Architecture:** Two Prisma models (`PromptCategory`, `Prompt`) backed by MongoDB. REST API routes at `/api/prompts` and `/api/prompts/categories` enforce admin auth on all verbs. Four new admin pages (`/admin/prompts`, `/admin/prompts/new`, `/admin/prompts/[id]/edit`, `/admin/prompts/categories`) follow existing `"use client"` + `force-dynamic` conventions. Syntax highlighting uses shiki v1 in client components via `useEffect`.

**Tech Stack:** Next.js 15 App Router, TypeScript, Prisma Client (MongoDB), NextAuth.js (JWT/getServerSession), Tailwind CSS, shadcn/ui components, shiki ^1.0, sonner (toast), lucide-react

**Spec:** `docs/superpowers/specs/2026-03-20-prompt-library-design.md`

---

## Chunk 1: Foundation — Prisma Schema + Singleton + shiki

### Task 1: Install shiki

**Files:**
- Modify: `package.json` (auto-updated by npm)
- Modify: `package-lock.json` (auto-updated by npm)

- [ ] **Step 1: Install shiki**

```bash
npm install shiki@^1.0
```

Expected output: shiki added to `dependencies` in `package.json`.

- [ ] **Step 2: Verify install**

```bash
npm ls shiki
```

Expected: `shiki@1.x.x` listed.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install shiki for syntax highlighting"
```

---

### Task 2: Add Prisma models to schema

**Files:**
- Modify: `prisma/schema.prisma`

- [ ] **Step 1: Add the two models at the end of `prisma/schema.prisma`**

Open `prisma/schema.prisma` and append after the last model:

```prisma
// Prompt Category model
model PromptCategory {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  name      String   @unique
  color     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  prompts   Prompt[]

  @@map("promptCategories")
}

// Prompt model
model Prompt {
  id          String         @id @default(auto()) @map("_id") @db.ObjectId
  title       String
  description String?
  content     String
  language    String?
  tags        String[]
  categoryId  String         @db.ObjectId
  category    PromptCategory @relation(fields: [categoryId], references: [id])
  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt

  @@map("prompts")
}
```

- [ ] **Step 2: Regenerate Prisma client**

```bash
npx prisma generate
```

Expected: `Generated Prisma Client` message with no errors.

- [ ] **Step 3: Commit**

```bash
git add prisma/schema.prisma
git commit -m "feat: add PromptCategory and Prompt Prisma models"
```

---

### Task 3: Create PrismaClient singleton

**Files:**
- Create: `src/lib/prisma.ts`

> **Note:** This project already uses Mongoose for blog/project/auth routes (`src/lib/mongoose.ts`). The Prisma singleton created here is a parallel data-access layer used only by the prompt API routes. Both can coexist safely — they connect to the same MongoDB database but through different clients.

- [ ] **Step 1: Create `src/lib/prisma.ts`**

```typescript
import { PrismaClient } from "@prisma/client"

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["error"],
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors relating to `src/lib/prisma.ts`.

- [ ] **Step 3: Commit**

```bash
git add src/lib/prisma.ts
git commit -m "feat: add PrismaClient singleton at src/lib/prisma.ts"
```

---

## Chunk 2: API Routes — Categories

### Task 4: Categories collection route (GET + POST)

**Files:**
- Create: `src/app/api/prompts/categories/route.ts`

> **Note:** The `categories` directory must be created before the `[id]` directory under `api/prompts/` so Next.js resolves the static segment first. Do not create `api/prompts/[id]/` until Task 6.

- [ ] **Step 1: Create `src/app/api/prompts/categories/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const COLOR_REGEX = /^#[0-9a-fA-F]{6}$/

function isAdmin(session: Awaited<ReturnType<typeof getServerSession>>) {
  return session && session.user?.role === "ADMIN"
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!isAdmin(session)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const categories = await prisma.promptCategory.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { prompts: true } } },
    })

    return NextResponse.json({ categories })
  } catch (error) {
    console.error("Failed to fetch prompt categories:", error)
    return NextResponse.json(
      { error: "Failed to fetch prompt categories" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!isAdmin(session)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    if (!body.name || typeof body.name !== "string" || body.name.trim().length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    if (body.name.trim().length > 50) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    if (body.color && !COLOR_REGEX.test(body.color)) {
      return NextResponse.json({ error: "Invalid color format" }, { status: 400 })
    }

    try {
      const category = await prisma.promptCategory.create({
        data: {
          name: body.name.trim(),
          color: body.color || null,
        },
      })
      return NextResponse.json(category, { status: 201 })
    } catch (err: unknown) {
      const prismaError = err as { code?: string }
      if (prismaError.code === "P2002") {
        return NextResponse.json(
          { error: "Category name already exists" },
          { status: 409 }
        )
      }
      throw err
    }
  } catch (error) {
    console.error("Failed to create prompt category:", error)
    return NextResponse.json(
      { error: "Failed to create prompt category" },
      { status: 500 }
    )
  }
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no new errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/prompts/categories/route.ts
git commit -m "feat: add GET/POST /api/prompts/categories"
```

---

### Task 5: Category individual route (PUT + DELETE)

**Files:**
- Create: `src/app/api/prompts/categories/[id]/route.ts`

- [ ] **Step 1: Create `src/app/api/prompts/categories/[id]/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const COLOR_REGEX = /^#[0-9a-fA-F]{6}$/

function isAdmin(session: Awaited<ReturnType<typeof getServerSession>>) {
  return session && session.user?.role === "ADMIN"
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!isAdmin(session)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()

    if (!body.name || typeof body.name !== "string" || body.name.trim().length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    if (body.color && !COLOR_REGEX.test(body.color)) {
      return NextResponse.json({ error: "Invalid color format" }, { status: 400 })
    }

    try {
      const category = await prisma.promptCategory.update({
        where: { id },
        data: {
          name: body.name.trim(),
          color: body.color || null,
        },
      })
      return NextResponse.json(category)
    } catch (err: unknown) {
      const prismaError = err as { code?: string }
      if (prismaError.code === "P2002") {
        return NextResponse.json(
          { error: "Category name already exists" },
          { status: 409 }
        )
      }
      if (prismaError.code === "P2025") {
        return NextResponse.json({ error: "Not found" }, { status: 404 })
      }
      throw err
    }
  } catch (error) {
    console.error("Failed to update prompt category:", error)
    return NextResponse.json(
      { error: "Failed to update prompt category" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!isAdmin(session)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const { searchParams } = new URL(request.url)
    const reassignTo = searchParams.get("reassignTo")
    const force = searchParams.get("force") === "true"

    // Validate reassignTo edge cases
    if (reassignTo) {
      if (reassignTo === id) {
        return NextResponse.json(
          { error: "Cannot reassign to the same category" },
          { status: 400 }
        )
      }
      const target = await prisma.promptCategory.findUnique({ where: { id: reassignTo } })
      if (!target) {
        return NextResponse.json({ error: "Target category not found" }, { status: 400 })
      }
    }

    // Check if category exists and count its prompts
    const category = await prisma.promptCategory.findUnique({
      where: { id },
      include: { _count: { select: { prompts: true } } },
    })

    if (!category) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    const promptCount = category._count.prompts

    if (promptCount > 0 && !reassignTo && !force) {
      return NextResponse.json(
        { error: "Category has prompts", count: promptCount },
        { status: 409 }
      )
    }

    if (reassignTo) {
      // Bulk reassign then delete
      await prisma.prompt.updateMany({
        where: { categoryId: id },
        data: { categoryId: reassignTo },
      })
    } else if (force) {
      // Delete all child prompts first
      await prisma.prompt.deleteMany({ where: { categoryId: id } })
    }

    await prisma.promptCategory.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to delete prompt category:", error)
    return NextResponse.json(
      { error: "Failed to delete prompt category" },
      { status: 500 }
    )
  }
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no new errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/prompts/categories/[id]/route.ts
git commit -m "feat: add PUT/DELETE /api/prompts/categories/[id]"
```

---

## Chunk 3: API Routes — Prompts

### Task 6: Prompts collection route (GET + POST)

**Files:**
- Create: `src/app/api/prompts/route.ts`

- [ ] **Step 1: Create `src/app/api/prompts/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const ALLOWED_LANGUAGES = [
  "typescript", "javascript", "python", "bash",
  "json", "html", "css", "sql", "plaintext",
]

function isAdmin(session: Awaited<ReturnType<typeof getServerSession>>) {
  return session && session.user?.role === "ADMIN"
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!isAdmin(session)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get("categoryId")
    const search = searchParams.get("search")
    const tagsParam = searchParams.get("tags")

    // Build where clause
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: Record<string, any> = {}

    if (categoryId) where.categoryId = categoryId

    if (search) {
      where.title = { contains: search, mode: "insensitive" }
    }

    if (tagsParam && tagsParam.trim()) {
      const tags = tagsParam.split(",").map((t) => t.trim()).filter(Boolean)
      if (tags.length > 0) {
        where.tags = { hasEvery: tags }
      }
    }

    const prompts = await prisma.prompt.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      include: { category: true },
    })

    return NextResponse.json({ prompts })
  } catch (error) {
    console.error("Failed to fetch prompts:", error)
    return NextResponse.json(
      { error: "Failed to fetch prompts" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!isAdmin(session)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    if (!body.title || !body.content || !body.categoryId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    if (body.language && !ALLOWED_LANGUAGES.includes(body.language)) {
      return NextResponse.json({ error: "Invalid language" }, { status: 400 })
    }

    const prompt = await prisma.prompt.create({
      data: {
        title: body.title.trim().slice(0, 100),
        description: body.description ? body.description.trim().slice(0, 300) : null,
        content: body.content,
        language: body.language || null,
        tags: Array.isArray(body.tags) ? body.tags.map((t: string) => t.trim().slice(0, 30)) : [],
        categoryId: body.categoryId,
      },
      include: { category: true },
    })

    return NextResponse.json(prompt, { status: 201 })
  } catch (error) {
    console.error("Failed to create prompt:", error)
    return NextResponse.json(
      { error: "Failed to create prompt" },
      { status: 500 }
    )
  }
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no new errors.

- [ ] **Step 3: Run lint**

```bash
npm run lint
```

Expected: no new errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/api/prompts/route.ts
git commit -m "feat: add GET/POST /api/prompts"
```

---

### Task 7: Prompt individual route (GET + PUT + DELETE)

**Files:**
- Create: `src/app/api/prompts/[id]/route.ts`

- [ ] **Step 1: Create `src/app/api/prompts/[id]/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const ALLOWED_LANGUAGES = [
  "typescript", "javascript", "python", "bash",
  "json", "html", "css", "sql", "plaintext",
]

function isAdmin(session: Awaited<ReturnType<typeof getServerSession>>) {
  return session && session.user?.role === "ADMIN"
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!isAdmin(session)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const prompt = await prisma.prompt.findUnique({
      where: { id },
      include: { category: true },
    })

    if (!prompt) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    return NextResponse.json(prompt)
  } catch (error) {
    console.error("Failed to fetch prompt:", error)
    return NextResponse.json(
      { error: "Failed to fetch prompt" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!isAdmin(session)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()

    if (!body.title || !body.content || !body.categoryId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    if (body.language && !ALLOWED_LANGUAGES.includes(body.language)) {
      return NextResponse.json({ error: "Invalid language" }, { status: 400 })
    }

    try {
      const prompt = await prisma.prompt.update({
        where: { id },
        data: {
          title: body.title.trim().slice(0, 100),
          description: body.description ? body.description.trim().slice(0, 300) : null,
          content: body.content,
          language: body.language || null,
          tags: Array.isArray(body.tags) ? body.tags.map((t: string) => t.trim().slice(0, 30)) : [],
          categoryId: body.categoryId,
        },
        include: { category: true },
      })
      return NextResponse.json(prompt)
    } catch (err: unknown) {
      const prismaError = err as { code?: string }
      if (prismaError.code === "P2025") {
        return NextResponse.json({ error: "Not found" }, { status: 404 })
      }
      throw err
    }
  } catch (error) {
    console.error("Failed to update prompt:", error)
    return NextResponse.json(
      { error: "Failed to update prompt" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!isAdmin(session)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    try {
      await prisma.prompt.delete({ where: { id } })
      return NextResponse.json({ success: true })
    } catch (err: unknown) {
      const prismaError = err as { code?: string }
      if (prismaError.code === "P2025") {
        return NextResponse.json({ error: "Not found" }, { status: 404 })
      }
      throw err
    }
  } catch (error) {
    console.error("Failed to delete prompt:", error)
    return NextResponse.json(
      { error: "Failed to delete prompt" },
      { status: 500 }
    )
  }
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no new errors.

- [ ] **Step 3: Run lint**

```bash
npm run lint
```

Expected: no new errors. (Warnings about `any` in existing files are pre-existing and acceptable.)

- [ ] **Step 4: Commit**

```bash
git add src/app/api/prompts/[id]/route.ts
git commit -m "feat: add GET/PUT/DELETE /api/prompts/[id]"
```

---

## Chunk 4: Admin Navigation + Library List Page

### Task 8: Add Prompt Library to admin sidebar

**Files:**
- Modify: `src/components/admin-sidebar.tsx`

- [ ] **Step 1: Add `BookMarked` to the import in `src/components/admin-sidebar.tsx`**

Find the existing import block:
```typescript
import {
  Briefcase,
  FileText,
  LayoutDashboard,
  Mail,
  Settings,
  Users,
  LogOut,
  Plus,
  Star,
} from "lucide-react"
```

Replace with:
```typescript
import {
  Briefcase,
  FileText,
  LayoutDashboard,
  Mail,
  Settings,
  Users,
  LogOut,
  Plus,
  Star,
  BookMarked,
} from "lucide-react"
```

- [ ] **Step 2: Add the nav item between Blog and Messages in the `navMain` array**

Find:
```typescript
      {
        title: "Blog",
        url: "/admin/blog",
        icon: FileText,
      },
      {
        title: "Messages",
        url: "/admin/contact",
        icon: Mail,
      },
```

Replace with:
```typescript
      {
        title: "Blog",
        url: "/admin/blog",
        icon: FileText,
      },
      {
        title: "Prompt Library",
        url: "/admin/prompts",
        icon: BookMarked,
      },
      {
        title: "Messages",
        url: "/admin/contact",
        icon: Mail,
      },
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add src/components/admin-sidebar.tsx
git commit -m "feat: add Prompt Library nav item to admin sidebar"
```

---

### Task 9: Prompt Library list page

**Files:**
- Create: `src/app/admin/prompts/page.tsx`

The page fetches all prompts on mount, performs client-side filtering by category/search/tags, and renders syntax-highlighted code previews using shiki.

- [ ] **Step 1: Create `src/app/admin/prompts/page.tsx`**

```typescript
"use client"

export const dynamic = "force-dynamic"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { codeToHtml } from "shiki"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, Copy, Check, Settings2 } from "lucide-react"
import { toast } from "sonner"

interface Category {
  id: string
  name: string
  color: string | null
}

interface Prompt {
  id: string
  title: string
  description: string | null
  content: string
  language: string | null
  tags: string[]
  categoryId: string
  category: Category
  updatedAt: string
}

function PromptCard({
  prompt,
  onDelete,
}: {
  prompt: Prompt
  onDelete: (id: string) => void
}) {
  const [copied, setCopied] = useState(false)
  const [highlightedCode, setHighlightedCode] = useState<string>("")

  useEffect(() => {
    if (prompt.language && prompt.language !== "plaintext" && prompt.content) {
      codeToHtml(prompt.content, {
        lang: prompt.language,
        theme: "github-dark",
      }).then(setHighlightedCode).catch(() => setHighlightedCode(""))
    }
  }, [prompt.content, prompt.language])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDelete = async () => {
    if (!confirm(`Delete "${prompt.title}"?`)) return
    try {
      const res = await fetch(`/api/prompts/${prompt.id}`, { method: "DELETE" })
      if (!res.ok) throw new Error()
      toast.success("Prompt deleted")
      onDelete(prompt.id)
    } catch {
      toast.error("Failed to delete prompt")
    }
  }

  const isCode = prompt.language && prompt.language !== "plaintext"

  return (
    <Card className="glass-card flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base truncate">{prompt.title}</CardTitle>
            {prompt.description && (
              <CardDescription className="mt-1 line-clamp-2">
                {prompt.description}
              </CardDescription>
            )}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Button variant="ghost" size="sm" onClick={handleCopy}>
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/admin/prompts/${prompt.id}/edit`}>
                <Edit className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleDelete} className="text-destructive hover:text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          <Badge
            variant="secondary"
            style={prompt.category.color ? { backgroundColor: prompt.category.color + "33", borderColor: prompt.category.color } : undefined}
          >
            {prompt.category.name}
          </Badge>
          {prompt.language && (
            <Badge variant="outline">{prompt.language}</Badge>
          )}
          {prompt.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="pt-0 flex-1">
        {isCode && highlightedCode ? (
          <div
            className="rounded-md overflow-auto max-h-48 text-sm"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        ) : (
          <pre className="rounded-md bg-muted p-3 text-sm overflow-auto max-h-48 whitespace-pre-wrap font-mono">
            {prompt.content.slice(0, 300)}{prompt.content.length > 300 ? "…" : ""}
          </pre>
        )}
      </CardContent>
    </Card>
  )
}

export default function AdminPrompts() {
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null)

  useEffect(() => {
    fetchAll()
  }, [])

  const fetchAll = async () => {
    try {
      setLoading(true)
      const [promptsRes, catsRes] = await Promise.all([
        fetch("/api/prompts"),
        fetch("/api/prompts/categories"),
      ])
      if (!promptsRes.ok || !catsRes.ok) throw new Error()
      const [promptsData, catsData] = await Promise.all([
        promptsRes.json(),
        catsRes.json(),
      ])
      setPrompts(promptsData.prompts)
      setCategories(catsData.categories)
    } catch {
      toast.error("Failed to load prompts")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = useCallback((id: string) => {
    setPrompts((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const filtered = prompts.filter((p) => {
    if (activeCategoryId && p.categoryId !== activeCategoryId) return false
    if (search) {
      const q = search.toLowerCase()
      return (
        p.title.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      )
    }
    return true
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  return (
    <div className="px-4 lg:px-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Prompt Library</h2>
          <p className="text-muted-foreground">Manage your prompts and snippets</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/prompts/categories">
              <Settings2 className="h-4 w-4 mr-2" />
              Categories
            </Link>
          </Button>
          <Button asChild>
            <Link href="/admin/prompts/new">
              <Plus className="h-4 w-4 mr-2" />
              New Prompt
            </Link>
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by title or tag..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={activeCategoryId === null ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveCategoryId(null)}
        >
          All
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={activeCategoryId === cat.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategoryId(cat.id)}
            style={
              cat.color && activeCategoryId !== cat.id
                ? { borderColor: cat.color, color: cat.color }
                : undefined
            }
          >
            {cat.name}
          </Button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          {prompts.length === 0 ? "No prompts yet. Create your first one!" : "No prompts match your filter."}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no new errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/admin/prompts/page.tsx
git commit -m "feat: add admin prompt library list page"
```

---

## Chunk 5: Create/Edit Form Pages

### Task 10: New prompt form page

**Files:**
- Create: `src/app/admin/prompts/new/page.tsx`

- [ ] **Step 1: Create `src/app/admin/prompts/new/page.tsx`**

```typescript
"use client"

export const dynamic = "force-dynamic"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { codeToHtml } from "shiki"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Save, X } from "lucide-react"
import { toast } from "sonner"

const LANGUAGES = [
  "plaintext", "typescript", "javascript", "python",
  "bash", "json", "html", "css", "sql",
]

interface Category {
  id: string
  name: string
  color: string | null
}

export default function NewPrompt() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [tagInput, setTagInput] = useState("")
  const [preview, setPreview] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    language: "plaintext",
    tags: [] as string[],
    categoryId: "",
  })

  useEffect(() => {
    fetch("/api/prompts/categories")
      .then((r) => r.json())
      .then((d) => setCategories(d.categories))
      .catch(() => toast.error("Failed to load categories"))
  }, [])

  useEffect(() => {
    if (formData.language && formData.language !== "plaintext" && formData.content) {
      codeToHtml(formData.content, {
        lang: formData.language,
        theme: "github-dark",
      })
        .then(setPreview)
        .catch(() => setPreview(""))
    } else {
      setPreview("")
    }
  }, [formData.content, formData.language])

  const addTag = () => {
    const val = tagInput.trim().slice(0, 30)
    if (val && !formData.tags.includes(val)) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, val] }))
    }
    setTagInput("")
  }

  const removeTag = (tag: string) => {
    setFormData((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.content || !formData.categoryId) {
      toast.error("Title, content, and category are required")
      return
    }
    setLoading(true)
    try {
      const res = await fetch("/api/prompts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          language: formData.language === "plaintext" ? null : formData.language,
        }),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Failed to create prompt")
      }
      toast.success("Prompt created!")
      router.push("/admin/prompts")
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to create prompt")
    } finally {
      setLoading(false)
    }
  }

  const isCode = formData.language && formData.language !== "plaintext"

  return (
    <div className="min-h-screen bg-main">
      <header className="bg-muted/30 border-b">
        <div className="container flex items-center h-16 px-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/prompts">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Prompts
            </Link>
          </Button>
          <h1 className="text-xl font-semibold ml-4">New Prompt</h1>
        </div>
      </header>

      <main className="container py-8 px-4 max-w-5xl mt-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: form */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Prompt Details</CardTitle>
                <CardDescription>Fill in the prompt information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value.slice(0, 100) }))}
                    placeholder="Prompt title"
                    maxLength={100}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value.slice(0, 300) }))}
                    placeholder="Brief description"
                    rows={2}
                    maxLength={300}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Select
                      value={formData.categoryId}
                      onValueChange={(v) => setFormData((p) => ({ ...p, categoryId: v }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select
                      value={formData.language}
                      onValueChange={(v) => setFormData((p) => ({ ...p, language: v }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {LANGUAGES.map((lang) => (
                          <SelectItem key={lang} value={lang}>
                            {lang}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Add tag"
                      maxLength={30}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") { e.preventDefault(); addTag() }
                      }}
                    />
                    <Button type="button" variant="outline" onClick={addTag}>
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData((p) => ({ ...p, content: e.target.value }))}
                    placeholder={isCode ? "Paste your code here..." : "Enter your prompt..."}
                    rows={12}
                    required
                    className={isCode ? "font-mono text-sm" : ""}
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => router.push("/admin/prompts")}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? "Saving..." : "Save Prompt"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Right: preview */}
            {isCode && (
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>{formData.language} syntax highlighting</CardDescription>
                </CardHeader>
                <CardContent>
                  {preview ? (
                    <div
                      className="rounded-md overflow-auto text-sm"
                      dangerouslySetInnerHTML={{ __html: preview }}
                    />
                  ) : (
                    <div className="text-muted-foreground text-sm">Start typing to see the preview...</div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </form>
      </main>
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/app/admin/prompts/new/page.tsx
git commit -m "feat: add new prompt form page"
```

---

### Task 11: Edit prompt form page

**Files:**
- Create: `src/app/admin/prompts/[id]/edit/page.tsx`

- [ ] **Step 1: Create `src/app/admin/prompts/[id]/edit/page.tsx`**

This page is identical in structure to the New page but pre-populates from the existing prompt and uses PUT instead of POST.

```typescript
"use client"

export const dynamic = "force-dynamic"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { codeToHtml } from "shiki"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Save, X } from "lucide-react"
import { toast } from "sonner"

const LANGUAGES = [
  "plaintext", "typescript", "javascript", "python",
  "bash", "json", "html", "css", "sql",
]

interface Category {
  id: string
  name: string
  color: string | null
}

export default function EditPrompt() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [categories, setCategories] = useState<Category[]>([])
  const [tagInput, setTagInput] = useState("")
  const [preview, setPreview] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    language: "plaintext",
    tags: [] as string[],
    categoryId: "",
  })

  useEffect(() => {
    Promise.all([
      fetch(`/api/prompts/${params.id}`).then((r) => r.json()),
      fetch("/api/prompts/categories").then((r) => r.json()),
    ])
      .then(([promptData, catsData]) => {
        if (promptData.error) {
          toast.error("Prompt not found")
          router.push("/admin/prompts")
          return
        }
        setFormData({
          title: promptData.title || "",
          description: promptData.description || "",
          content: promptData.content || "",
          language: promptData.language || "plaintext",
          tags: promptData.tags || [],
          categoryId: promptData.categoryId || "",
        })
        setCategories(catsData.categories)
      })
      .catch(() => toast.error("Failed to load prompt"))
      .finally(() => setInitialLoading(false))
  }, [params.id, router])

  useEffect(() => {
    if (formData.language && formData.language !== "plaintext" && formData.content) {
      codeToHtml(formData.content, {
        lang: formData.language,
        theme: "github-dark",
      })
        .then(setPreview)
        .catch(() => setPreview(""))
    } else {
      setPreview("")
    }
  }, [formData.content, formData.language])

  const addTag = () => {
    const val = tagInput.trim().slice(0, 30)
    if (val && !formData.tags.includes(val)) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, val] }))
    }
    setTagInput("")
  }

  const removeTag = (tag: string) => {
    setFormData((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.content || !formData.categoryId) {
      toast.error("Title, content, and category are required")
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`/api/prompts/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          language: formData.language === "plaintext" ? null : formData.language,
        }),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Failed to update prompt")
      }
      toast.success("Prompt updated!")
      router.push("/admin/prompts")
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to update prompt")
    } finally {
      setLoading(false)
    }
  }

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  const isCode = formData.language && formData.language !== "plaintext"

  return (
    <div className="min-h-screen bg-main">
      <header className="bg-muted/30 border-b">
        <div className="container flex items-center h-16 px-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/prompts">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Prompts
            </Link>
          </Button>
          <h1 className="text-xl font-semibold ml-4">Edit Prompt</h1>
        </div>
      </header>

      <main className="container py-8 px-4 max-w-5xl mt-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Prompt Details</CardTitle>
                <CardDescription>Update the prompt information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value.slice(0, 100) }))}
                    maxLength={100}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value.slice(0, 300) }))}
                    rows={2}
                    maxLength={300}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Select
                      value={formData.categoryId}
                      onValueChange={(v) => setFormData((p) => ({ ...p, categoryId: v }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select
                      value={formData.language}
                      onValueChange={(v) => setFormData((p) => ({ ...p, language: v }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {LANGUAGES.map((lang) => (
                          <SelectItem key={lang} value={lang}>
                            {lang}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Add tag"
                      maxLength={30}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") { e.preventDefault(); addTag() }
                      }}
                    />
                    <Button type="button" variant="outline" onClick={addTag}>
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData((p) => ({ ...p, content: e.target.value }))}
                    rows={12}
                    required
                    className={isCode ? "font-mono text-sm" : ""}
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => router.push("/admin/prompts")}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? "Saving..." : "Update Prompt"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {isCode && (
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>{formData.language} syntax highlighting</CardDescription>
                </CardHeader>
                <CardContent>
                  {preview ? (
                    <div
                      className="rounded-md overflow-auto text-sm"
                      dangerouslySetInnerHTML={{ __html: preview }}
                    />
                  ) : (
                    <div className="text-muted-foreground text-sm">Preview will appear here...</div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </form>
      </main>
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/app/admin/prompts/[id]/edit/page.tsx
git commit -m "feat: add edit prompt page"
```

---

## Chunk 6: Categories Management Page

### Task 12: Categories admin page

**Files:**
- Create: `src/app/admin/prompts/categories/page.tsx`

- [ ] **Step 1: Create `src/app/admin/prompts/categories/page.tsx`**

```typescript
"use client"

export const dynamic = "force-dynamic"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Edit, Trash2, Save, X, Plus } from "lucide-react"
import { toast } from "sonner"

const COLOR_REGEX = /^#[0-9a-fA-F]{6}$/

interface CategoryWithCount {
  id: string
  name: string
  color: string | null
  _count: { prompts: number }
}

export default function AdminPromptCategories() {
  const [categories, setCategories] = useState<CategoryWithCount[]>([])
  const [loading, setLoading] = useState(true)

  // Create form
  const [newName, setNewName] = useState("")
  const [newColor, setNewColor] = useState("#3b82f6")
  const [creating, setCreating] = useState(false)

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState("")
  const [editColor, setEditColor] = useState("")
  const [saving, setSaving] = useState(false)

  // Delete dialog state
  const [deleteTarget, setDeleteTarget] = useState<CategoryWithCount | null>(null)
  const [deleteMode, setDeleteMode] = useState<"reassign" | "force" | null>(null)
  const [reassignTargetId, setReassignTargetId] = useState("")
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/prompts/categories")
      if (!res.ok) throw new Error()
      const data = await res.json()
      setCategories(data.categories)
    } catch {
      toast.error("Failed to load categories")
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName.trim()) return
    if (newColor && !COLOR_REGEX.test(newColor)) {
      toast.error("Invalid hex color")
      return
    }
    setCreating(true)
    try {
      const res = await fetch("/api/prompts/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName.trim(), color: newColor || null }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to create")
      toast.success("Category created")
      setNewName("")
      setNewColor("#3b82f6")
      fetchCategories()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to create category")
    } finally {
      setCreating(false)
    }
  }

  const startEdit = (cat: CategoryWithCount) => {
    setEditingId(cat.id)
    setEditName(cat.name)
    setEditColor(cat.color || "#3b82f6")
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditName("")
    setEditColor("")
  }

  const handleSaveEdit = async (id: string) => {
    if (!editName.trim()) return
    if (editColor && !COLOR_REGEX.test(editColor)) {
      toast.error("Invalid hex color")
      return
    }
    setSaving(true)
    try {
      const res = await fetch(`/api/prompts/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName.trim(), color: editColor || null }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to update")
      toast.success("Category updated")
      cancelEdit()
      fetchCategories()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to update category")
    } finally {
      setSaving(false)
    }
  }

  const openDeleteDialog = (cat: CategoryWithCount) => {
    setDeleteTarget(cat)
    setDeleteMode(null)
    setReassignTargetId("")
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      let url = `/api/prompts/categories/${deleteTarget.id}`
      if (deleteMode === "reassign" && reassignTargetId) {
        url += `?reassignTo=${reassignTargetId}`
      } else if (deleteMode === "force") {
        url += "?force=true"
      }

      const res = await fetch(url, { method: "DELETE" })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to delete")
      toast.success("Category deleted")
      setDeleteTarget(null)
      fetchCategories()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to delete category")
    } finally {
      setDeleting(false)
    }
  }

  const otherCategories = categories.filter((c) => c.id !== deleteTarget?.id)
  const hasPrompts = (deleteTarget?._count.prompts ?? 0) > 0

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-main">
      <header className="bg-muted/30 border-b">
        <div className="container flex items-center h-16 px-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/prompts">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Prompts
            </Link>
          </Button>
          <h1 className="text-xl font-semibold ml-4">Manage Categories</h1>
        </div>
      </header>

      <main className="container py-8 px-4 max-w-3xl mt-8 space-y-6">
        {/* Category table */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>
              {categories.length} categor{categories.length === 1 ? "y" : "ies"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Color</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Prompts</TableHead>
                  <TableHead className="w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      No categories yet
                    </TableCell>
                  </TableRow>
                ) : (
                  categories.map((cat) => (
                    <TableRow key={cat.id}>
                      {editingId === cat.id ? (
                        <>
                          <TableCell>
                            <input
                              type="color"
                              value={editColor}
                              onChange={(e) => setEditColor(e.target.value)}
                              className="h-8 w-12 rounded cursor-pointer border"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={editName}
                              onChange={(e) => setEditName(e.target.value.slice(0, 50))}
                              className="h-8"
                              maxLength={50}
                            />
                          </TableCell>
                          <TableCell>{cat._count.prompts}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleSaveEdit(cat.id)}
                                disabled={saving}
                              >
                                <Save className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={cancelEdit}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell>
                            <div
                              className="h-5 w-5 rounded-full border"
                              style={{ backgroundColor: cat.color || "#94a3b8" }}
                            />
                          </TableCell>
                          <TableCell className="font-medium">{cat.name}</TableCell>
                          <TableCell>{cat._count.prompts}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button size="sm" variant="ghost" onClick={() => startEdit(cat)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-destructive hover:text-destructive"
                                onClick={() => openDeleteDialog(cat)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Create new category */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>New Category</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="flex items-end gap-4">
              <div className="space-y-1">
                <Label htmlFor="newColor">Color</Label>
                <input
                  id="newColor"
                  type="color"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  className="h-10 w-16 rounded cursor-pointer border px-1"
                />
              </div>
              <div className="flex-1 space-y-1">
                <Label htmlFor="newName">Name *</Label>
                <Input
                  id="newName"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value.slice(0, 50))}
                  placeholder="Category name"
                  maxLength={50}
                  required
                />
              </div>
              <Button type="submit" disabled={creating || !newName.trim()}>
                <Plus className="h-4 w-4 mr-2" />
                {creating ? "Creating..." : "Create"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>

      {/* Delete dialog */}
      <Dialog open={!!deleteTarget} onOpenChange={(open) => { if (!open) setDeleteTarget(null) }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete &quot;{deleteTarget?.name}&quot;?</DialogTitle>
            <DialogDescription>
              {hasPrompts ? (
                <>
                  This category has {deleteTarget?._count.prompts} prompt(s). Choose how to proceed:
                </>
              ) : (
                "This will permanently delete this category."
              )}
            </DialogDescription>
          </DialogHeader>

          {hasPrompts && (
            <div className="space-y-4 py-2">
              <div className="flex flex-col gap-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="deleteMode"
                    value="reassign"
                    checked={deleteMode === "reassign"}
                    onChange={() => setDeleteMode("reassign")}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium">Reassign prompts to another category</div>
                    {deleteMode === "reassign" && (
                      <Select value={reassignTargetId} onValueChange={setReassignTargetId}>
                        <SelectTrigger className="mt-2 w-48">
                          <SelectValue placeholder="Choose category..." />
                        </SelectTrigger>
                        <SelectContent>
                          {otherCategories.map((c) => (
                            <SelectItem key={c.id} value={c.id}>
                              {c.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="deleteMode"
                    value="force"
                    checked={deleteMode === "force"}
                    onChange={() => setDeleteMode("force")}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium text-destructive">Delete category and all its prompts</div>
                    <div className="text-sm text-muted-foreground">
                      This will permanently delete {deleteTarget?._count.prompts} prompt(s).
                    </div>
                  </div>
                </label>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)} disabled={deleting}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={
                deleting ||
                (hasPrompts && !deleteMode) ||
                (deleteMode === "reassign" && !reassignTargetId)
              }
            >
              {deleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/app/admin/prompts/categories/page.tsx
git commit -m "feat: add categories management page"
```

---

## Chunk 7: Final Verification

### Task 13: Full build verification

- [ ] **Step 1: Run the linter**

```bash
npm run lint
```

Expected: exits with 0 errors. Warnings about `any` or existing code are acceptable.

- [ ] **Step 2: Run a production build**

```bash
npm run build
```

Expected: build succeeds with no errors. Note the route output — you should see:
- `○ /admin/prompts`
- `○ /admin/prompts/new`
- `○ /admin/prompts/[id]/edit`
- `○ /admin/prompts/categories`

- [ ] **Step 3: Manual smoke test**

Start the dev server:
```bash
npm run dev
```

Navigate to `http://localhost:3000/admin/login`, log in, then verify:

1. Sidebar shows "Prompt Library" between Blog and Messages
2. `/admin/prompts/categories` — create a category, edit its name and color, cancel edit works
3. `/admin/prompts/new` — create a plaintext prompt (no preview panel); create a TypeScript snippet (preview panel appears with syntax highlighting)
4. `/admin/prompts` — prompt appears in list, copy button works, category filter works, search works
5. `/admin/prompts/[id]/edit` — form pre-populates with existing data, save updates correctly
6. Delete prompt from list — disappears from grid
7. Delete category with prompts — reassign and force-delete both work

- [ ] **Step 4: Final commit**

If there are any uncommitted changes remaining (e.g. `package.json` or `package-lock.json` from the shiki install if not committed separately), stage them explicitly:

```bash
git add package.json package-lock.json prisma/schema.prisma src/lib/prisma.ts src/lib/auth.ts src/components/admin-sidebar.tsx src/app/api/prompts/route.ts src/app/api/prompts/\[id\]/route.ts src/app/api/prompts/categories/route.ts src/app/api/prompts/categories/\[id\]/route.ts src/app/admin/prompts/page.tsx src/app/admin/prompts/new/page.tsx src/app/admin/prompts/\[id\]/edit/page.tsx src/app/admin/prompts/categories/page.tsx
git commit -m "feat: prompt library — complete implementation"
```
