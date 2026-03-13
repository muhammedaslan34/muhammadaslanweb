# Repository Guidelines

## Project Structure & Module Organization
`src/app` contains App Router pages, layouts, and `api/*/route.ts` handlers. Reusable UI lives in `src/components`, organized into folders such as `about`, `blog`, `projects`, `project`, `admin`, and `ui`. Put shared logic in `src/lib`, hooks in `src/hooks`, Mongoose models in `src/models`, data fixtures in `src/data`, email templates in `src/emails`, and shared types in `src/types`. Store static files in `public/`. Database schema and seeds live in `prisma/`, and one-off maintenance scripts belong in `scripts/`. `Projects Details Page/` is a separate prototype excluded from the main app build.

## Build, Test, and Development Commands
Use `npm run dev` to start the site locally on port 3000. Use `npm run dev:port -- 3001` for a custom port. `npm run build` creates the production bundle, and `npm run start` serves it. `npm run lint` runs the Next.js ESLint configuration and should be clean before a PR. `npm run db:seed` loads sample data through `prisma/seed.ts`. For local MongoDB replica-set setup, use `docker-compose.yml` or `setup-mongodb.ps1`.

## Coding Style & Naming Conventions
This repo uses strict TypeScript with the `@/` import alias. Follow the existing style: 2-space indentation, single quotes, and no semicolons. Export React components in PascalCase, keep App Router folders lowercase, and use `page.tsx`, `layout.tsx`, and `route.ts` for route files. Most shared component files use kebab-case; keep new filenames consistent with the surrounding folder. ESLint currently rejects `any`, empty object types, and unescaped entities.

## Testing Guidelines
There is no automated test suite yet. Run `npm run lint` and `npm run build`, then manually smoke-test each changed page, admin flow, and API route. If you add tests, place them near the feature as `*.test.ts` or `*.spec.tsx` and focus on route handlers, form flows, and content-management regressions. Utility scripts such as `scripts/test-login.js` can help with local verification.

## Commit & Pull Request Guidelines
Recent commits use short, direct subjects such as `Fix PreviewModal project prop type mismatch` and `refactor home page and add admin contact form submissions`. Keep commits focused on one logical change and write the subject as a brief action statement. PRs should summarize user-facing impact, note schema or env changes, link related issues, and include screenshots or short recordings for UI updates.

## Security & Configuration Tips
Copy `.env.example` to `.env.local` and never commit real credentials. `MONGODB_URI` must target a MongoDB replica set, and `NEXTAUTH_SECRET` plus `NEXTAUTH_URL` must be set before testing auth or admin routes.
