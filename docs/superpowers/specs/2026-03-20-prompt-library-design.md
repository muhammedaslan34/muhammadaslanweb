# Prompt Library — Design Spec

**Date:** 2026-03-20
**Status:** Approved

## Overview

A prompt/snippet library accessible only within the admin dashboard. Supports multiple content types (AI prompts, code snippets, email templates, etc.) with syntax-highlighted code previews, rich metadata, and category-based organization.

---

## Data Models

Two new Prisma models added to `prisma/schema.prisma`. All new API routes use **Prisma Client** directly (not Mongoose). A shared PrismaClient singleton must be created at `src/lib/prisma.ts` (the standard Next.js pattern to prevent multiple client instances during hot-reload) if it does not already exist. All prompt API routes import from `@/lib/prisma`.

```prisma
model PromptCategory {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  name      String   @unique   // max 50 characters
  color     String?            // hex color string, e.g. "#3b82f6"
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  prompts   Prompt[]
  @@map("promptCategories")
}

model Prompt {
  id          String         @id @default(auto()) @map("_id") @db.ObjectId
  title       String         // max 100 characters
  description String?        // max 300 characters
  content     String         // no enforced max; textarea
  language    String?        // one of the allowed language values (see below)
  tags        String[]       // each tag max 30 characters
  categoryId  String         @db.ObjectId
  category    PromptCategory @relation(fields: [categoryId], references: [id])
  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt
  @@map("prompts")
}
```

**Allowed `language` values:** `typescript`, `javascript`, `python`, `bash`, `json`, `html`, `css`, `sql`, `plaintext`. Both the form dropdown and API validation use this exact list.

**`color` format:** hex string (e.g. `#3b82f6`). The color picker in the UI emits hex. API validates with a `/^#[0-9a-fA-F]{6}$/` regex if provided.

**`language` storage:** if `language` is omitted or sent as `null` in the request body, it is stored as `null` (not coerced to `"plaintext"`). The form dropdown defaults to `plaintext` for display purposes only.

**`updatedAt` on category rename:** renaming or recoloring a category updates only the `PromptCategory.updatedAt`, not the `updatedAt` of child prompts.

---

## Routes & Pages

| Route | Purpose |
| --- | --- |
| `/admin/prompts` | Main library list — search, filter, browse |
| `/admin/prompts/new` | Create a new prompt |
| `/admin/prompts/[id]/edit` | Edit an existing prompt |
| `/admin/prompts/categories` | Manage categories |

The **"Prompt Library"** nav item is added to the `navMain` array in `AdminSidebar` between Blog and Messages, using the `BookMarked` icon from `lucide-react`.

---

## UI & Features

### Admin Page Requirements (all four pages)

All four admin page files (`/admin/prompts/page.tsx`, `/admin/prompts/new/page.tsx`, `/admin/prompts/[id]/edit/page.tsx`, `/admin/prompts/categories/page.tsx`) must follow the exact ordering used by every other admin page: `"use client"` as the absolute first line, followed immediately by `export const dynamic = "force-dynamic"`. The categories page is not exempt from this requirement even though it combines list and create functionality on one page.

### Library List (`/admin/prompts`)

- Search bar filtering by title or tags (client-side filter over fetched results)
- Category filter tabs/pills across the top (All + one per category)
- Cards grid showing: title, description excerpt, category badge, language badge, tags, copy button
- Code content renders with syntax-highlighted preview using `shiki` (`^1.0`)
- No pagination — all prompts are loaded at once (paginate only if > 200 prompts becomes a concern in future)

### Create/Edit Form (`/admin/prompts/new` and `/admin/prompts/[id]/edit`)

- Fields:
  - **Title** — text input, required, max 100 characters
  - **Description** — textarea, optional, max 300 characters
  - **Category** — dropdown populated from `PromptCategory`, required
  - **Language** — dropdown of allowed language values, optional; defaults to `plaintext`
  - **Tags** — comma-separated text input, stored as `String[]`; each tag max 30 characters
  - **Content** — textarea; switches to code editor view when a non-plaintext language is selected
- Live syntax-highlighted preview panel shown when language is set to a code language

### Categories Page (`/admin/prompts/categories`)

- Table listing all categories: name, color swatch, prompt count
- Inline form at the bottom to create a new category (name + hex color picker)
- Per-row edit: clicking Edit shows an inline edit row with a Save button and Cancel link; save is triggered explicitly (not on blur)
- Per-row delete: shows a confirmation dialog
  - If category has 0 prompts: deletes immediately
  - If category has prompts: shows two options — (1) reassign prompts to another category then delete, or (2) force-delete which also deletes all child prompts

---

## API Routes

All endpoints — including GETs — are protected by admin authentication. Unauthenticated or non-admin requests return `401`. Unlike `src/app/api/blog/route.ts` which has its GET auth guard commented out for demo purposes, the prompt routes must enforce authentication unconditionally on all methods.

### Prompts

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/api/prompts` | List all prompts |
| POST | `/api/prompts` | Create a prompt |
| GET | `/api/prompts/[id]` | Get single prompt |
| PUT | `/api/prompts/[id]` | Update prompt |
| DELETE | `/api/prompts/[id]` | Delete prompt |

**GET `/api/prompts` query params:**

- `?categoryId=<id>` — filter by category
- `?search=<string>` — filter by title substring match
- `?tags=<comma-separated>` — e.g. `?tags=react,hooks`; returns prompts containing ALL specified tags. An empty or missing value (e.g. `?tags=`) is ignored — treated as no tag filter.

**GET `/api/prompts` response shape:**

```json
{ "prompts": [ ...Prompt with category included... ] }
```

Results sorted by `updatedAt` descending (most recently updated first), consistent with existing project/blog list routes.

**GET `/api/prompts/categories` sort order:** alphabetical by `name` ascending.

**POST/PUT `/api/prompts` request body:**

```json
{
  "title": "string (required, max 100)",
  "description": "string (optional, max 300)",
  "content": "string (required)",
  "language": "typescript | javascript | ... | plaintext (optional)",
  "tags": ["string"],
  "categoryId": "string (required)"
}
```

**POST response:** returns `201` with the created `Prompt` document directly.

**PUT response:** returns `200` with the updated `Prompt` document directly. `PUT` is a full replacement — both `name` and `color` must be provided in the request body; omitting `color` sets it to `null`.

**DELETE `/api/prompts/[id]` response:** returns `200` with `{ success: true }`. Returns `404` if the prompt does not exist.

### Categories

**Note on file structure:** `categories` is a static route segment and must be defined as `app/api/prompts/categories/route.ts` and `app/api/prompts/categories/[id]/route.ts`, placed before the `[id]` dynamic segment directory. Next.js resolves static segments before dynamic ones, so there is no collision with `/api/prompts/[id]`.

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/api/prompts/categories` | List all categories with prompt count |
| POST | `/api/prompts/categories` | Create category |
| PUT | `/api/prompts/categories/[id]` | Update category (name and/or color) |
| DELETE | `/api/prompts/categories/[id]` | Delete category |

**GET `/api/prompts/categories` response shape:**

```json
{ "categories": [ ...PromptCategory with _count.prompts... ] }
```

**POST `/api/prompts/categories` response:** returns `201` with the created `PromptCategory` document.

**PUT `/api/prompts/categories/[id]` response:** returns `200` with the updated `PromptCategory`. Full replacement — both `name` and `color` required; omitting `color` sets it to `null`. Applies `@unique` constraint; returns `409` if `name` already belongs to a different category.

**DELETE `/api/prompts/categories/[id]` success response:** returns `200` with `{ success: true }` in all success paths.

**DELETE `/api/prompts/categories/[id]` behavior:**

- Default (no params): returns `409` if category has prompts, with `{ error: "Category has prompts", count: N }`
- `?reassignTo=<categoryId>`: bulk-updates all child prompts to the new category, then deletes the original category. Returns `200`.
  - If `reassignTo` equals the category being deleted: returns `400` with `{ error: "Cannot reassign to the same category" }`
  - If `reassignTo` target does not exist: returns `400` with `{ error: "Target category not found" }`
- `?force=true`: deletes all child prompts, then deletes the category. Returns `200`.

---

## Error Handling

| Scenario | HTTP Status | Response |
| --- | --- | --- |
| Unauthenticated or non-admin | 401 | `{ error: "Unauthorized" }` |
| Resource not found | 404 | `{ error: "Not found" }` |
| Duplicate category name (POST or PUT) | 409 | `{ error: "Category name already exists" }` |
| Delete category with prompts (no param) | 409 | `{ error: "Category has prompts", count: N }` |
| Invalid `language` value | 400 | `{ error: "Invalid language" }` |
| Invalid `color` format | 400 | `{ error: "Invalid color format" }` |
| Missing required fields | 400 | `{ error: "Missing required fields" }` |
| `reassignTo` target same as deleted category | 400 | `{ error: "Cannot reassign to the same category" }` |
| `reassignTo` target not found | 400 | `{ error: "Target category not found" }` |
| Unhandled server/database error | 500 | `{ error: "Failed to [operation]" }` (e.g. "Failed to create prompt") |

---

## Dependencies

- **shiki `^1.0`** — syntax highlighting for code preview (async API, compatible with Next.js 15 App Router). Must be installed via `npm install shiki` and the updated `package.json` and `package-lock.json` committed.
- No other new dependencies required

---

## Out of Scope

- Public-facing prompt display (admin-only)
- Prompt versioning or history
- Import/export functionality
- Sharing prompts between users
- Pagination (load all; revisit if collection exceeds ~200 items)
