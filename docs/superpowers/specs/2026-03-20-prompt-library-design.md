# Prompt Library — Design Spec

**Date:** 2026-03-20
**Status:** Approved

## Overview

A prompt/snippet library accessible only within the admin dashboard. Supports multiple content types (AI prompts, code snippets, email templates, etc.) with syntax-highlighted code previews, rich metadata, and category-based organization.

---

## Data Models

Two new Prisma models added to `prisma/schema.prisma`:

```prisma
model PromptCategory {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  name      String   @unique
  color     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  prompts   Prompt[]
  @@map("promptCategories")
}

model Prompt {
  id          String         @id @default(auto()) @map("_id") @db.ObjectId
  title       String
  description String?
  content     String
  language    String?        // e.g. "typescript", "bash", "plaintext"
  tags        String[]
  categoryId  String         @db.ObjectId
  category    PromptCategory @relation(fields: [categoryId], references: [id])
  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt
  @@map("prompts")
}
```

---

## Routes & Pages

| Route | Purpose |
|---|---|
| `/admin/prompts` | Main library list — search, filter, browse |
| `/admin/prompts/new` | Create a new prompt |
| `/admin/prompts/[id]/edit` | Edit an existing prompt |
| `/admin/prompts/categories` | Manage categories |

The **"Prompt Library"** nav item is added to the main nav in `AdminSidebar` alongside Projects, Blog, and Messages.

---

## UI & Features

### Library List (`/admin/prompts`)

- Search bar filtering by title or tags
- Category filter tabs/pills across the top (All + one per category)
- Cards grid showing: title, description excerpt, category badge, language badge, tags, copy button
- Code content renders with syntax-highlighted preview using `shiki`
- `force-dynamic` export for auth consistency with other admin pages

### Create/Edit Form (`/admin/prompts/new` and `/admin/prompts/[id]/edit`)

- Fields:
  - **Title** — text input, required
  - **Description** — textarea, optional
  - **Category** — dropdown populated from `PromptCategory`, required
  - **Language** — dropdown (typescript, javascript, bash, python, json, plaintext, etc.), optional
  - **Tags** — comma-separated text input, stored as `String[]`
  - **Content** — textarea; switches to code editor view when a code language is selected
- Live syntax-highlighted preview panel shown when language is set

### Categories Page (`/admin/prompts/categories`)

- Table listing all categories: name, color swatch, prompt count
- Inline form to create a new category (name + color picker)
- Edit (inline rename + color) and delete per row
- Delete shows a confirmation dialog; if the category has prompts, warns the user and requires reassignment or force-delete

---

## API Routes

| Method | Route | Purpose |
|---|---|---|
| GET | `/api/prompts` | List all prompts (supports `?categoryId=`, `?search=`, `?tags=`) |
| POST | `/api/prompts` | Create a prompt |
| GET | `/api/prompts/[id]` | Get single prompt |
| PUT | `/api/prompts/[id]` | Update prompt |
| DELETE | `/api/prompts/[id]` | Delete prompt |
| GET | `/api/prompts/categories` | List all categories |
| POST | `/api/prompts/categories` | Create category |
| PUT | `/api/prompts/categories/[id]` | Update category |
| DELETE | `/api/prompts/categories/[id]` | Delete category |

All API routes require admin authentication, consistent with existing `/api/blog` and `/api/projects` patterns.

---

## Error Handling

- Delete category with existing prompts: return 409 with message prompting reassignment
- Duplicate category name: return 409
- Prompt not found: return 404
- Unauthenticated requests: return 401

---

## Dependencies

- **shiki** — syntax highlighting for code preview (Next.js ecosystem standard)
- No other new dependencies required

---

## Out of Scope

- Public-facing prompt display (admin-only)
- Prompt versioning or history
- Import/export functionality
- Sharing prompts between users
