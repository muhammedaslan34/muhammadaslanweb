# PRD: Portfolio Website (Next.js)

## 1) Overview
A personal portfolio to showcase projects and services as a **Web/WordPress specialist**, built with **Next.js** for performance and developer experience. Includes a lightweight admin to manage **Projects** and **Blog** content.

**Primary Objectives**
- Present a clean, modern brand and clear value proposition.
- Showcase projects with deep case studies.
- Generate qualified leads via contact form.
- Publish SEO‑friendly blog posts.
- Manage projects/blogs via an admin backend.

**Non‑Goals**
- Full e‑commerce.
- Multi‑tenant SaaS or multi‑author newsroom.

---

## 2) Tech Stack & Architecture
- **Frontend**: Next.js (App Router, TypeScript), React 18, **Tailwind CSS**, **shadcn/ui**.
- **Content**: Option A (Recommended) **Prisma + SQLite (dev) / Postgres (prod)**; Option B **Headless CMS** (Sanity/Strapi/Payload). See §9.
- **Auth**: NextAuth (Email magic link or OAuth GitHub/Google) with Role: `admin`.
- **Forms**: React Hook Form + Zod; server actions or API routes.
- **Images**: Next/Image with remote loader (Vercel/Cloudflare R2/S3).
- **SEO**: Next Metadata API, OpenGraph images per page; sitemap & robots.
- **Content Editing**: Blog in **MDX** (with Prisma-stored front‑matter) or WYSIWYG (if CMS).
- **Deployment**: Vercel (Primary); DB on Neon/PlanetScale/Supabase.
- **Analytics**: Vercel Analytics + optional Umami/GA4.

**Architecture**
- App Router with **server components** for data fetching.
- **ISR** for public pages (Projects/Blog), **SSR** for admin.
- **API routes** or **Server Actions** for CRUD.

---

## 3) Information Architecture & Routes

### Public Routes
- `/` Home
- `/services` Services
- `/pricing` Pricing
- `/contact` Contact
- `/projects` Projects (listing)
- `/projects/[slug]` Project Details
- `/blog` Blog (listing)
- `/blog/[slug]` Blog Post

### Admin Routes (auth required)
- `/admin` Dashboard
- `/admin/projects` List
- `/admin/projects/new` Create
- `/admin/projects/[id]` Edit
- `/admin/blog` List
- `/admin/blog/new` Create
- `/admin/blog/[id]` Edit
- `/admin/media` (optional) assets manager
- `/api/*` CRUD endpoints (only if not using Server Actions)

---

## 4) Page Requirements

### 4.1 Home
**Sections**: Hero (name + tagline + CTA), Trust badges/tech stack, Featured Services (3–4 cards), Featured Projects (3–6), Testimonials (slider), Blog highlights (3 posts), Final CTA.
**CTAs**: "Start a Project", "See Case Studies", "Contact".
**SEO**: H1 with value prop; meta description; OG image.

### 4.2 Services
List WordPress‑centric services with icons, benefits, deliverables, typical timeline, and CTA to contact/pricing. Optional comparison grid.

### 4.3 Pricing
Three tiers (Starter / Professional / Premium) with feature matrix, FAQ accordion, CTA to contact. Note about custom quotes.

### 4.4 Contact
Form: name, email, budget (select), timeline, message. Optional Calendly embed. Success state with next steps.

### 4.5 Projects (Listing)
Filter by category (Business, E‑commerce, Landing Page, etc.), search by keyword, grid of cards with cover, title, short excerpt, tags.

### 4.6 Project Details
Hero cover, summary (Role, Stack, Timeline, Live Link), rich body (Sections: Problem, Solution, Process, Results), gallery carousel, testimonials, related projects.

### 4.7 Blog (Listing)
Cards: cover, title, date, excerpt, tags; pagination or load‑more. Sidebar with categories/tags (optional).

### 4.8 Blog Post
Title, date, reading time, MDX content (code blocks), TOC (auto‑generated), social share, next/prev posts, related posts.

---

## 5) Data Model (Prisma)

### Entities
- **User**: id, name, email, role (`admin` | `viewer`), image, createdAt
- **Project**: id, slug, title, excerpt, body (rich), coverUrl, gallery[] (JSON), category, tags[], stack[], client, role, startedAt, finishedAt, liveUrl, repoUrl, testimonial (author, text, role), featured (bool), createdAt, updatedAt, published (bool)
- **Post**: id, slug, title, excerpt, mdx (or `body`), coverUrl, tags[], category, readingTime, publishedAt, authorId → User, published (bool), createdAt, updatedAt
- **Media** (optional if using S3/R2 only store URLs): id, url, alt, width, height, type, createdAt
- **Setting** (key‑value for sitewide): id, key, value

> Note: If using MDX files for blog, store front‑matter in DB and keep MDX on disk or in object storage; otherwise keep all in DB.

---

## 6) Admin UX
- Auth‑gated dashboard with KPIs (projects count, drafts, traffic snapshot).
- CRUD tables with sorting, search, filters.
- Rich editor: Markdown/MDX editor with image upload; drag‑and‑drop gallery for projects.
- Slug auto‑generation and uniqueness check.
- Draft/Publish toggles; schedule publish (optional).
- Image upload to S3/R2 with signed URLs; show responsive previews.

---

## 7) API/Server Actions (if not using headless CMS)

**Projects**
- `POST /api/projects` (create)
- `GET /api/projects` (list, filters: q, tag, category)
- `GET /api/projects/[id|slug]` (detail)
- `PATCH /api/projects/[id]` (update)
- `DELETE /api/projects/[id]` (delete)

**Posts**
- `POST /api/posts`
- `GET /api/posts`
- `GET /api/posts/[id|slug]`
- `PATCH /api/posts/[id]`
- `DELETE /api/posts/[id]`

**Uploads**
- `POST /api/upload` → returns signed URL + final URL

**Auth**
- NextAuth providers; middleware protecting `/admin/*`.

---

## 8) UI Components (shadcn/ui + Tailwind)
- Layout: `SiteHeader`, `SiteFooter`, `Container`, `ThemeToggle`.
- Navigation: `MainNav` (active link state), `MobileNav` (sheet/drawer).
- Content: `Hero`, `SectionHeading`, `ProjectCard`, `PostCard`, `Testimonial`, `PricingTable`, `FAQ`, `ContactForm`.
- Admin: `DataTable` (sorting/filter/pagination), `Form` (RHForm + Zod), `ImageUploader`, `MDXEditor`, `TagInput`, `DateRangePicker`.

---

## 9) CMS Decision (Two Paths)

**A) Local DB + Admin (Prisma) — Recommended for control**
- Pros: Full control, no vendor lock‑in, fast.
- Cons: Build more admin features.

**B) Headless CMS (Sanity/Strapi/Payload)**
- Pros: Visual studio/admin out of the box, image pipelines.
- Cons: Hosting/config overhead, learning curve.

> If B): map schemas 1:1 with §5 and query via GROQ/REST/GraphQL; keep the same public routes.

---

## 10) SEO & Performance
- Metadata API per page; canonical URLs; structured data (JSON‑LD) for `Article` and `CreativeWork`.
- Per‑page OG images (Vercel OG image generation).
- Image optimization (next/image), font optimization.
- **Lighthouse targets**: Perf ≥ 95, SEO ≥ 95, Accessibility ≥ 95.

---

## 11) Analytics & Observability
- Vercel Analytics; error tracking with Sentry (optional).
- Events: CTA clicks, form submissions, project detail views, blog reads.

---

## 12) Security & Privacy
- Rate‑limit form endpoints; CAPTCHA (hCaptcha/Cloudflare Turnstile).
- Sanitize MDX; limit embeds; content security policy.
- Store secrets in Vercel env; rotate keys.

---

## 13) Success Metrics
- 2–5 qualified leads/month via Contact.
- 30% of visitors view a Project Detail.
- 2+ blog posts/month; avg reading time > 2:30.
- GTMetrix A grade and Core Web Vitals passing.

---

## 14) Milestones & Scope
**M1 – Foundation (1–2 days)**
- Next.js app setup, Tailwind, shadcn/ui, eslint/prettier.
- Layout, header/footer, nav, theme toggle.

**M2 – Content Models & Admin (2–4 days)**
- Prisma schema, DB migrations.
- Admin auth, Projects CRUD.

**M3 – Public Pages (2–4 days)**
- Home, Services, Pricing, Contact.
- Projects listing + details; Blog listing + post (MDX pipeline).

**M4 – Polish & SEO (1–2 days)**
- OG images, sitemap/robots, analytics, FAQs, testimonials.

---

## 15) Acceptance Criteria (Samples)
- Can create/edit/publish a Project with gallery and it appears on `/projects` and `/projects/[slug]` after publish.
- Blog MDX renders code blocks with syntax highlighting.
- Contact form sends email (Resend/Nodemailer) and writes to DB (leads table optional).
- Admin routes are blocked for non‑admins; 401/redirect to login.
- Site scores ≥95 on Lighthouse across core pages.

---

## 16) File/Folder Blueprint
```
app/
  (marketing)/
    layout.tsx
    page.tsx                # Home
    services/page.tsx
    pricing/page.tsx
    contact/page.tsx
    projects/page.tsx
    projects/[slug]/page.tsx
    blog/page.tsx
    blog/[slug]/page.tsx
  (admin)/
    admin/layout.tsx
    admin/page.tsx
    admin/projects/page.tsx
    admin/projects/new/page.tsx
    admin/projects/[id]/page.tsx
    admin/blog/page.tsx
    admin/blog/new/page.tsx
    admin/blog/[id]/page.tsx
  api/
    projects/route.ts       # GET/POST
    projects/[id]/route.ts  # PATCH/DELETE
    posts/route.ts
    posts/[id]/route.ts
    upload/route.ts
components/
  ui/* (shadcn)
  hero.tsx, project-card.tsx, post-card.tsx, pricing-table.tsx, ...
lib/
  db.ts (Prisma), auth.ts (NextAuth), validations.ts, seo.ts
prisma/
  schema.prisma
content/
  blog/*.mdx (if using MDX)
public/
  images/*
```

---

## 17) Prisma Schema (excerpt)
```prisma
model User {
  id        String   @id @default(cuid())
  name      String?
  email     String   @unique
  role      Role     @default(VIEWER)
  image     String?
  posts     Post[]
  createdAt DateTime @default(now())
}

enum Role { ADMIN VIEWER }

model Project {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  excerpt     String
  body        String   // JSON/Markdown serialized
  coverUrl    String?
  gallery     Json?
  category    String?
  tags        String[]
  stack       String[]
  client      String?
  roleLabel   String?
  startedAt   DateTime?
  finishedAt  DateTime?
  liveUrl     String?
  repoUrl     String?
  testimonial Json?
  featured    Boolean  @default(false)
  published   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Post {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  excerpt     String
  mdx         String   // or body
  coverUrl    String?
  tags        String[]
  category    String?
  readingTime Int?
  published   Boolean  @default(false)
  publishedAt DateTime?
  author      User?    @relation(fields: [authorId], references: [id])
  authorId    String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

## 18) Nice‑to‑Haves (Phase 2)
- Search across projects/blog (postgres full‑text or Meilisearch).
- RSS feed for blog.
- Newsletter (Resend + React Email templates).
- Case‑study PDF export.
- Dark/light theme memory and custom theme.

---

## 19) Risks & Mitigations
- **Content bottleneck** → Start with 3 strong projects + 3 blog posts.
- **Admin complexity** → Use shadcn data table; defer media manager to Phase 2.
- **SEO ramp‑up** → Publish cornerstone WordPress guides first.

---

## 20) Go/No‑Go Checklist
- [ ] All public routes implemented
- [ ] Admin CRUD stable
- [ ] Contact emails delivered & logged
- [ ] Lighthouse ≥95
- [ ] Deployed to prod with envs configured

