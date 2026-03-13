# Contact Form Phone Field + Admin Submissions — Design Spec

**Date:** 2026-03-13
**Status:** Approved

---

## Overview

Two connected features:

1. Add a phone number input (with country flag selector) to the public contact form
2. Wire up the admin contact page to real MongoDB data with reply capability

---

## Data Layer

### `ContactSubmission` model changes (`src/models/ContactSubmission.ts`)

- Add `phone?: string` to both the `ContactSubmissionDocument` TypeScript interface **and** the Mongoose `Schema` field definition
- Phone stored in E.164 format (e.g. `+15551234567`, no spaces — as returned by `react-phone-number-input`)
- The existing `status` enum `"NEW" | "READ" | "REPLIED" | "ARCHIVED"` is canonical; no changes needed
- The old stub admin page's stale `ContactMessage` interface is deleted in the admin page rewrite

---

## Dependencies

- Install: `react-phone-number-input` (TypeScript types included)
- Add `transpilePackages: ['react-phone-number-input']` to `next.config.js` — required to avoid a Next.js App Router build error (`Cannot use import statement`) with this package's ESM exports

---

## API Routes

### Shared patterns for all admin-only endpoints

**Auth check** (required in every admin handler):

```ts
const session = await getServerSession(authOptions)
if (!session || session.user?.role !== "ADMIN") {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
}
```

**DB connection**: call `await connectToDatabase()` before any Mongoose query.

**Next.js 15 async params**:

```ts
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
}
```

**ObjectId / not-found error handling** — exact catch-block pattern for every `[id]` route:

```ts
} catch (error) {
  if (error instanceof Error && error.name === 'CastError') {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }
  return NextResponse.json({ error: 'Server error' }, { status: 500 })
}
```

Return 404 with `{ error: 'Not found' }` when `findById` returns `null`.

Note: The existing `src/app/api/blog/[id]/route.ts` PUT handler is missing `connectToDatabase()` — do NOT use that file as an implementation reference. Use the contact `[id]` routes defined here as the pattern.

**`export const dynamic`**: not required on API route handlers. The `force-dynamic` directive in Client Component pages (including the admin contact page) is carried over for consistency with other admin pages, but has no effect in Client Components — it only applies to Server Components.

---

### `POST /api/contact` (updated — **public**, no auth)

Behavior change from current implementation:

1. Destructure `{ name, email, phone, budget, timeline, message }` from body
2. Save document to MongoDB first (all fields including `phone`)
3. Call Resend notification email (pass `phone` to `ContactFormEmail`)
4. Keep the existing `SEND_CONFIRMATION_EMAIL` secondary email block unchanged
5. If Resend fails at step 3: log the error, still return `200` with `{ message: 'Inquiry received!' }`
6. On full success: return `200` with `{ message: 'Inquiry received!' }`

Success response is always `{ message: 'Inquiry received!' }` regardless of Resend outcome.

---

### `GET /api/contact` (new — **admin-only**)

Added alongside POST in `src/app/api/contact/route.ts`.

- Requires ADMIN auth check
- Response: `{ submissions: ContactSubmissionDocument[] }` sorted by `createdAt` descending

---

### `PATCH /api/contact/[id]` (new — **admin-only**)

File: `src/app/api/contact/[id]/route.ts`

- Accepts `{ status: string }` body
- Validates status is one of `"NEW" | "READ" | "REPLIED" | "ARCHIVED"` — return 400 if invalid
- Returns 404 if document not found, 400 for CastError
- No status transition guards (any valid status overwrites any current status)

---

### `DELETE /api/contact/[id]` (new — **admin-only**)

File: same `src/app/api/contact/[id]/route.ts`

- Returns 404 if not found, 400 for CastError

---

### `POST /api/contact/[id]/reply` (new — **admin-only**)

File: `src/app/api/contact/[id]/reply/route.ts`

- Accepts `{ replyMessage: string }` body
- Fetches submission from MongoDB by `id` — returns 404 if not found, 400 for CastError
- Sends reply email via Resend using `ReplyEmail` React Email template:
  - `from`: `process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'`
  - `to`: submitter's email (from fetched submission)
  - `subject`: `Re: Your inquiry — Muhammad Aslan`
- If Resend fails: return `500` with `{ error: 'Failed to send reply. Please try again.' }` — do **not** patch status
- If Resend succeeds: patch submission status to `REPLIED` using `findByIdAndUpdate`, return `200` with `{ message: 'Reply sent' }`

---

## Contact Form (`src/components/contact/contact-form.tsx`)

### Phone field

- Use `react-phone-number-input/withoutStyles` import (avoids Tailwind v4 CSS conflicts)
- Apply Tailwind classes to wrapper and flag button for glass-card consistency:
  - Wrapper div: `flex items-center border rounded-md bg-background px-3 py-2`
  - Flag select button: `mr-2 focus:outline-none`
- Phone field placed between Email and Budget/Timeline fields
- **Optional** — not `required`
- E.164 format via library's `value` / `onChange` props
- Include `phone` in the JSON body sent to `/api/contact`

---

## Email Templates

### Updated `ContactFormEmail` (`src/emails/contact-form-email.tsx`)

- Add `phone?: string` to `ContactFormEmailProps` interface
- Also fix `budget` and `timeline` to `budget?: string` and `timeline?: string` (pre-existing non-optional type mismatch)
- Add `Phone` row to the contact details section — show `"Not provided"` if `phone` is empty/undefined
- Update the `ContactFormEmail` call in `POST /api/contact` to pass `phone`

### New `ReplyEmail` (`src/emails/reply-email.tsx`)

- React Email component, consistent with `ContactFormEmail` styling (same font, colors, container)
- Props: `{ replyMessage: string; originalName: string; originalMessage: string }`
- Body layout: admin reply text → `<Hr>` → `"Original message from [originalName]:"` → quoted original message
- Subject is set at the Resend call site, not inside this component

---

## Admin Contact Page (`src/app/admin/contact/page.tsx`)

Full rewrite. Kept for consistency with other admin pages (no functional effect in Client Components):

```ts
export const dynamic = "force-dynamic"
```

Remove all mock data and the stale `ContactMessage` interface.

### List view

- On mount: `fetch('/api/contact')` then destructure `data.submissions`
- Card heading: submitter's **name**
- Each card shows: name, email, phone (if provided), budget, timeline, message preview (truncated), date, status badge
- Badge colors: `NEW` = blue, `READ` = yellow, `REPLIED` = green, `ARCHIVED` = gray

### Actions

| Action  | Behavior |
| ------- | -------- |
| View    | Opens detail modal; auto-calls `PATCH /api/contact/[id]` with `{ status: "READ" }` |
| Reply   | Opens reply modal with textarea; Send → `POST .../reply`; on `200` → update local state status to `REPLIED`, close modal; on `500` → show error message inside modal |
| Archive | `PATCH /api/contact/[id]` with `{ status: "ARCHIVED" }`; update local state |
| Delete  | `DELETE /api/contact/[id]`; remove card from local state on `200` |

---

## Files to Create / Modify

| File | Change |
| ---- | ------ |
| `next.config.js` | Add `transpilePackages: ['react-phone-number-input']` |
| `src/models/ContactSubmission.ts` | Add `phone?: string` to interface AND schema |
| `src/app/api/contact/route.ts` | Update POST (save-first, `phone`, always-200); add GET (admin-only) |
| `src/app/api/contact/[id]/route.ts` | New — PATCH + DELETE (auth, enum validation, 404, CastError) |
| `src/app/api/contact/[id]/reply/route.ts` | New — POST reply (fetch sub, send email, patch REPLIED) |
| `src/components/contact/contact-form.tsx` | Add phone field (withoutStyles, Tailwind-styled wrapper) |
| `src/emails/contact-form-email.tsx` | Add phone prop; fix budget/timeline to optional |
| `src/emails/reply-email.tsx` | New — reply React Email template |
| `src/app/admin/contact/page.tsx` | Full rewrite — force-dynamic, real data, modals, all 4 actions |

---

## Out of Scope

- Reply history / thread storage
- Pagination on admin contact list
- Status transition guards
- Separate `RESEND_REPLY_FROM_EMAIL` env var
