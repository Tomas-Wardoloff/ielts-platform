---
name: ielts-platform
description: Context and conventions for the IELTS Master full-stack platform (github.com/Tomas-Wardoloff/ielts-platform). Use this skill whenever working on any task related to the IELTS Master project — including writing components, API routes, DB schema, grading logic, admin features, auth, or any code/config that will live in this repo. Trigger on phrases like "en el proyecto IELTS", "en la plataforma IELTS", "ielts-platform", "agrega un ejercicio", "question type", or any task that involves the Next.js/Prisma/Clerk/Neon stack described below.
---

# IELTS Master — Project Skill

## Stack & Runtime

| Layer                     | Technology                                              |
| ------------------------- | ------------------------------------------------------- |
| Runtime / Package manager | **Bun** (always `bun` / `bunx`, never `npm` / `npx`)    |
| Framework                 | **Next.js 16** — App Router only                        |
| Language                  | **TypeScript** (strict)                                 |
| Styling                   | **Tailwind CSS v4**                                     |
| Auth                      | **Clerk** (public metadata for roles)                   |
| ORM                       | **Prisma 7** (`prisma.config.ts`, `@prisma/adapter-pg`) |
| Database                  | **PostgreSQL** via **Neon** (serverless)                |
| Deployment                | **Vercel** (auto-deploy on merge to `main`)             |
| Linting                   | **ESLint + Prettier**                                   |

## Repository Layout

```
ielts-platform/
├── app/                        # Next.js App Router
│   ├── (auth)/                 # Clerk auth routes
│   ├── (dashboard)/            # Protected routes
│   │   ├── reading/            # Reading module
│   │   └── admin/              # Admin panel (role-gated)
│   └── api/                    # API routes
│       └── attempts/           # POST /api/attempts
├── components/                 # Shared UI components
│   ├── Sidebar.tsx             # Collapsible sidebar (SidebarContext)
│   ├── PassagePanel.tsx        # Reading passage display
│   └── ConfirmModal.tsx        # Generic confirm dialog
├── lib/
│   ├── db.ts                   # Prisma client singleton
│   └── grading.ts              # gradeExercise() logic
├── middleware/
│   └── proxy.ts                # Auth middleware (named proxy.ts, not middleware.ts)
├── prisma/
│   ├── prisma.config.ts        # Prisma 7 config (adapter-pg)
│   └── schema.prisma
├── types/                      # TypeScript definitions
│   └── questions.ts            # All 11 IELTS question types
├── fixtures/                   # Sample exercises for dev/test
├── CLAUDE.md                   # AI context for the repo
├── README.md
└── docker-compose.yml          # Local Postgres fallback
```

## Naming Conventions

- **Component files**: PascalCase → `Sidebar.tsx`, `PassagePanel.tsx`, `ConfirmModal.tsx`
- **Non-component files**: kebab-case → `db.ts`, `grading.ts`, `question-types.ts`
- **Folders**: always kebab-case → `reading/`, `admin/`, `api/`
- **Auth middleware**: named `proxy.ts` (not `middleware.ts`)
- **Imports**: use path aliases (`@/components/...`, `@/lib/...`)

## Brand & Design

- **Primary color**: `#DA291C` (IELTS red)
- **Layout**: two-column exercise layout (passage left, questions right)
- **Sidebar**: collapsible, managed via `SidebarContext`
- Use Tailwind utility classes; avoid inline styles unless unavoidable

## Auth & Roles

- Auth provider: **Clerk**
- Role-based access via **Clerk public metadata**: `{ role: "admin" }`
- Admin panel gated by role check — never trust client-side role only
- Protect routes in `proxy.ts` middleware

## Database & ORM

- **Prisma 7** with `prisma.config.ts` (not `schema.prisma` for config)
- Adapter: `@prisma/adapter-pg` (required for Neon serverless)
- Client singleton in `lib/db.ts`
- Migrations via `bunx prisma migrate dev`
- Never use `npx prisma` — always `bunx prisma`

## Reading Module (Phase 2 — in progress)

### 11 IELTS Question Types (all defined in `types/questions.ts`)

1. Multiple Choice
2. Identifying Information (True/False/Not Given)
3. Identifying Writer's Views (Yes/No/Not Given)
4. Matching Information
5. Matching Headings
6. Matching Features
7. Matching Sentence Endings
8. Sentence Completion
9. Summary Completion
10. Note/Table/Flow-chart Completion
11. Short Answer Questions

### Grading

- `gradeExercise(answers, exercise)` in `lib/grading.ts`
- Returns score + per-question feedback
- Results passed via `sessionStorage` to results page (not URL params)

### API

- `POST /api/attempts` — saves attempt to DB (auth required)
- Admin panel reads from DB-backed reading list

## CI/CD

- Branch: `dev` → PR to `main` → lint / typecheck / build checks
- Vercel auto-deploys on merge to `main`
- Never push directly to `main`

## Key Commands

```bash
bun dev                        # Start dev server
bun run build                  # Production build
bun run lint                   # ESLint
bunx prisma migrate dev        # Run migrations
bunx prisma studio             # DB GUI
bunx prisma generate           # Regenerate client
```

## Do's and Don'ts

**Do:**

- Use `bun` / `bunx` exclusively
- Follow kebab-case for folders and non-component files
- Gate all admin routes both in middleware and server-side
- Use `sessionStorage` for passing exercise results between pages
- Keep `gradeExercise()` pure and testable

**Don't:**

- Use `npm`, `npx`, or `yarn`
- Use `middleware.ts` — the file must be `proxy.ts`
- Hardcode secrets — use `.env.local` / Vercel env vars
- Use client components when server components suffice
- Bypass Clerk auth checks on the server
