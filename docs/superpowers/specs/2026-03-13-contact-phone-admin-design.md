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

### `ContactSubmission` model changes
- Add optional `phone?: string` field storing full international format (e.g. `+1 555 123 4567`)
- No other schema changes — existing `status` enum (`NEW | READ | REPLIED | ARCHIVED`) is sufficient

### New API endpoints
- `GET /api/contact` — admin-only, returns all submissions sorted newest first
- `PATCH /api/contact/[id]` — admin-only, updates `status` field
- `POST /api/contact/[id]/reply` — admin-only, sends reply email via Resend, sets status to `REPLIED`
- `DELETE /api/contact/[id]` — admin-only, removes submission from DB

### Updated `POST /api/contact`
- Save submission to MongoDB **before** sending email via Resend
- Add `phone` to the saved document and email template
- Submission is persisted even if Resend fails

---

## Contact Form (`src/components/contact/contact-form.tsx`)

### Phone field
- Install `react-phone-number-input`
- Phone field placed between Email and Budget/Timeline fields
- Optional (not required)
- Renders country flag dropdown + formatted number input
- Styled to match existing `glass-card` input style
- Submits phone in E.164 format (e.g. `+15551234567`) as part of JSON body

### Email notification update
- `ContactFormEmail` template updated to include phone number row in contact details section

---

## Admin Contact Page (`src/app/admin/contact/page.tsx`)

### List view
- Fetches submissions from `GET /api/contact` on mount
- Each card displays: name, email, phone (if provided), budget, timeline, message preview, date, status badge
- Status badge colors: `NEW` = blue, `READ` = yellow, `REPLIED` = green, `ARCHIVED` = gray

### Actions per submission
| Action | Behavior |
|--------|----------|
| View | Opens detail modal, auto-patches status to `READ` |
| Reply | Opens reply modal with textarea; on Send, calls `POST /api/contact/[id]/reply`, sets status to `REPLIED` |
| Archive | Calls `PATCH /api/contact/[id]` with `{ status: "ARCHIVED" }` |
| Delete | Calls `DELETE /api/contact/[id]`, removes from list |

### Reply email
- Sent from `RESEND_FROM_EMAIL` to contact's email
- Subject: `Re: Your inquiry — Muhammad Aslan`
- Body: admin's reply message + original message quoted below

---

## Files to Create / Modify

| File | Change |
|------|--------|
| `src/models/ContactSubmission.ts` | Add `phone` field |
| `src/app/api/contact/route.ts` | Add DB save to POST; add GET handler |
| `src/app/api/contact/[id]/route.ts` | New file — PATCH + DELETE handlers |
| `src/app/api/contact/[id]/reply/route.ts` | New file — POST reply handler |
| `src/components/contact/contact-form.tsx` | Add phone field with `react-phone-number-input` |
| `src/emails/contact-form-email.tsx` | Add phone row to email template |
| `src/app/admin/contact/page.tsx` | Full rewrite — real data, modals, actions |

---

## Dependencies

- Install: `react-phone-number-input`
- Dev install: `@types/react-phone-number-input` (if needed — package includes its own types)

---

## Out of Scope

- Reply history / thread storage (submissions store one reply per contact, no thread array)
- Pagination on admin contact list (acceptable for portfolio scale)
