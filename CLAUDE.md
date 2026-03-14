# CLAUDE.md — IELTS Master Platform

This file provides full context for AI models working on this codebase. Read it entirely before making any changes or suggestions.

---

## Project Overview

**IELTS Master** is a full-stack web application designed to be the single place where self-directed learners can prepare for the IELTS exam. The platform covers both learning English from scratch and practicing all four exam modules (Reading, Listening, Writing, Speaking) with AI-powered feedback.

**All application content, UI copy, comments, variable names, and documentation must be written in English.**

---

## Tech Stack

| Layer     | Technology                  | Notes                                                    |
| --------- | --------------------------- | -------------------------------------------------------- |
| Framework | Next.js 16 (App Router)     | Single repo, frontend + backend                          |
| Language  | TypeScript                  | Strict mode enabled, React 19                            |
| Styling   | Tailwind CSS v4             | Utility-first, configured via @theme in globals.css      |
| ORM       | Prisma 7                    | Config via `prisma.config.ts`, not `schema.prisma`       |
| Database  | PostgreSQL                  | Hosted on Railway                                        |
| Auth      | Clerk                       | Latest API — use `<Show>` not `<SignedIn>`/`<SignedOut>` |
| AI        | Anthropic API (Claude)      | Writing and Speaking feedback                            |
| Runtime   | Bun                         | Use `bun` / `bunx` — never `npm` or `npx`                |
| Deploy    | Vercel (app) + Railway (DB) | ~$6/month infrastructure                                 |
| Payments  | Stripe                      | Future freemium — not yet implemented                    |

---

## Critical Rules

### Bun — always, no exceptions

This project uses **Bun** as the package manager and runtime. Never suggest or use `npm`, `npx`, `yarn`, or `pnpm`.

```bash
bun add <package>          # install dependency
bun add -d <package>       # install dev dependency
bunx <tool>                # run binary (replaces npx)
bun run <script>           # run package.json script
bun dev                    # start dev server
```

### Prisma 7 — config file pattern

Prisma 7 moved datasource configuration out of `schema.prisma`. The connection is defined in `prisma.config.ts` at the project root. The `schema.prisma` file keeps the `datasource db` block with only `provider`, no `url`:

```prisma
datasource db {
  provider = "postgresql"
}
```

The `DATABASE_URL` is read via `prisma.config.ts`:

```typescript
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: { url: env("DATABASE_URL") },
});
```

PrismaClient is imported from `prisma/client`, not `@prisma/client`:

```typescript
import { PrismaClient } from "prisma/client";
```

### Clerk — latest API

Always use the current Clerk API. Several APIs were deprecated in recent versions:

```typescript
// CORRECT
import { Show } from "@clerk/nextjs";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";

// WRONG — do not use these
import { SignedIn, SignedOut } from "@clerk/nextjs"; // deprecated
import { authMiddleware } from "@clerk/nextjs"; // deprecated
```

The middleware file is currently `src/proxy.ts` (not `middleware.ts`).

### Next.js App Router — patterns to follow

- Prefer **Server Components** by default. Only add `"use client"` when you need interactivity, browser APIs, or React hooks.
- Use **Server Actions** for form submissions and mutations instead of separate API routes when possible.
- **Route Groups** `(auth)` and `(dashboard)` are used to scope layouts without affecting URLs.
- Catch-all routes like `[[...sign-in]]` are optional catch-all — required by Clerk for its internal sub-routes.

---

## Project Structure

```
ielts-platform/
├── prisma/
│   ├── schema.prisma         # Data models — no datasource url here
│   └── migrations/
├── prisma.config.ts          # Prisma 7 datasource + migration config
├── src/
│   ├── app/
│   │   ├── (auth)/           # Route group — auth layout (no navbar)
│   │   │   ├── sign-in/[[...sign-in]]/page.tsx
│   │   │   └── sign-up/[[...sign-up]]/page.tsx
│   │   ├── (dashboard)/      # Route group — app layout (with navbar)
│   │   │   ├── layout.tsx
│   │   │   └── dashboard/page.tsx
│   │   ├── api/
│   │   │   └── webhooks/clerk/route.ts
│   │   ├── layout.tsx        # Root layout — ClerkProvider here
│   │   └── page.tsx          # Public homepage
│   ├── components/
│   │   ├── ui/               # Reusable primitives (Button, Card, Badge...)
│   │   └── shared/           # Cross-feature components (Navbar, Sidebar...)
│   ├── lib/
│   │   ├── db.ts             # Prisma client singleton
│   │   └── utils.ts          # Shared utilities
│   └── middleware.ts         # Clerk auth middleware
├── .env                      # Non-secret defaults (committed)
├── .env.local                # Real secrets (never committed)
├── .env.example              # Documentation of required env vars
├── CLAUDE.md                 # This file
└── package.json
```

---

## Database Schema

```prisma
enum Module       { READING LISTENING WRITING SPEAKING }
enum Difficulty   { BEGINNER INTERMEDIATE ADVANCED }
enum ExerciseType { MULTIPLE_CHOICE TRUE_FALSE_NG FILL_BLANK MATCHING OPEN_WRITING OPEN_SPEAKING }

model User {
  id         String    @id @default(cuid())
  clerkId    String    @unique   // Clerk user ID — source of truth for identity
  email      String    @unique
  name       String?
  targetBand Float?              // e.g. 7.5
  examDate   DateTime?
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @updatedAt
  attempts   Attempt[]
  progress   UserProgress[]
}

model Exercise {
  id            String       @id @default(cuid())
  module        Module
  type          ExerciseType
  difficulty    Difficulty
  title         String
  content       Json         // Structure varies by ExerciseType
  correctAnswer Json         // String, array, or object depending on type
  explanation   String?      // Why the correct answer is correct
  timeLimit     Int?         // Seconds — null means no limit
  createdAt     DateTime     @default(now())
  attempts      Attempt[]
}

model Attempt {
  id          String   @id @default(cuid())
  userId      String
  exerciseId  String
  userAnswer  Json
  score       Float?           // 0–9 band score or 0–100 percentage
  aiFeedback  Json?            // Structured Claude response
  completedAt DateTime @default(now())
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  exercise    Exercise @relation(fields: [exerciseId], references: [id], onDelete: Cascade)
}

model UserProgress {
  id             String   @id @default(cuid())
  userId         String
  module         Module
  totalAttempts  Int      @default(0)
  avgScore       Float?
  lastActivityAt DateTime @default(now())
  user           User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@unique([userId, module])
}
```

---

## Environment Variables

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Enviroment
NODE_ENV=

# Database
DATABASE_URL=postgresql://...
```

---

## Design System

### Brand colors

| Token         | Hex       | Usage                                      |
| ------------- | --------- | ------------------------------------------ |
| `brand`       | `#DA291C` | Primary CTA, accents, badges, hover states |
| `brand-dark`  | `#b91c1c` | Hover state for brand buttons              |
| `brand-light` | `#fef2f2` | Subtle backgrounds, badge fills            |

The red `#DA291C` is the official IELTS brand color. It anchors the visual identity of the platform.

### Aesthetic

Clean and professional, inspired by Linear, Notion, and the official IELTS visual language. The homepage alternates between white and red/tinted sections to create visual rhythm — not a fully white or fully dark page. Inside the app (dashboard, modules), the base is white with red accents.

### Typography

- Font: **DM Sans** for sans-serif (Google Fonts), **DM Serif Display** for serif
- Headings: `font-weight: 700`, tight letter-spacing (`-0.5px` to `-1.5px`)
- Body: `font-weight: 400`, `line-height: 1.65`
- Labels/badges: `font-weight: 500 or 600`, uppercase with letter-spacing for section labels

### Tailwind v4 config (src/app/globals.css)

```css
@theme {
  --font-sans: "DM Sans", system-ui, sans-serif;
  --font-serif: "DM Serif Display", Georgia, serif;
  --color-brand: #da291c;
  --color-brand-dark: #b91c1c;
  --color-brand-light: #fef2f2;
}
```

---

## Product Architecture — The Three Pillars

### Pillar 1 — Learn

Static, well-curated content for building English from scratch.

- Grammar guides by level (A1 → C1)
- IELTS-specific vocabulary lists
- Exam tips and strategy articles
- Content stored as MDX files, rendered with a consistent layout
- No AI in this pillar — quality over dynamism

### Pillar 2 — Practice

The core of the product. Four modules:

| Module    | Interaction                                   | AI involvement                           |
| --------- | --------------------------------------------- | ---------------------------------------- |
| Reading   | Multiple choice, T/F/NG, fill-blank, matching | Explains wrong answers                   |
| Listening | Audio + form answers                          | Explains wrong answers                   |
| Writing   | Open text submission                          | Full band score + feedback per criterion |
| Speaking  | Text first, audio in future sprints           | Fluency, vocabulary, grammar feedback    |

**Writing AI feedback criteria** (official IELTS scoring):

1. Task Achievement / Task Response
2. Coherence and Cohesion
3. Lexical Resource
4. Grammatical Range and Accuracy

### Pillar 3 — Simulate

Full timed exam simulation replicating real IELTS conditions. Unlocks after the user has practiced individual modules. Produces a final band score and weakness analysis.

---

## Development Roadmap

### Phase 1 — Foundations (Weeks 1–2) ✅ In progress

- [x] Next.js 16 + TypeScript + Tailwind v4 setup
- [x] Clerk auth integrated
- [x] Prisma 7 schema defined
- [x] PostgreSQL on Railway connected
- [x] Landing page UI components (Hero, Navbar, Features, Footer)
- [x] First Vercel deploy
- [x] Basic dashboard UI

### Phase 2 — Reading + Listening (Weeks 3–5)

- [ ] Reading module — exercise rendering + auto-correction
- [ ] Listening module — audio player + answer validation
- [ ] Progress tracking per module
- [ ] Practice history page

### Phase 3 — Writing with AI + Learn section (Weeks 6–9)

- [ ] Writing module — open text submission
- [ ] Claude API integration — band score + per-criterion feedback
- [ ] Essay history with feedback timeline
- [ ] Learn section — grammar and vocabulary content (MDX)
- [ ] IELTS tips and exam strategy pages

### Phase 4 — Speaking + Public Beta (Weeks 10–12)

- [ ] Speaking module — text-based responses first
- [ ] Audio recording via Web Speech API
- [ ] Full exam simulation (Simulate pillar)
- [ ] Onboarding flow — target band + exam date
- [ ] Public beta launch

### Future (Post-beta)

- [ ] Stripe freemium model
- [ ] Dynamic AI-generated exercises
- [ ] Spaced repetition for vocabulary
- [ ] Detailed analytics dashboard

---

## Coding Conventions

- **Components**: PascalCase, one component per file
- **Files and folders**: kebab-case (`exercise-card.tsx`, `use-progress.ts`)
- **Hooks**: prefix with `use` (`useProgress`, `useExercise`)
- **Server vs Client**: default to Server Components; add `"use client"` only when necessary
- **API routes**: REST-style under `/api/` — e.g. `/api/exercises`, `/api/attempts`
- **Error handling**: always handle loading and error states in UI components
- **Types**: define shared types in `src/types/` — never use `any`
- **Formatting**: Prettier with `prettier-plugin-tailwindcss` — run `bun run format` before committing

---

## Key Decisions Log

| Decision                 | Rationale                                                |
| ------------------------ | -------------------------------------------------------- |
| Next.js over React+Vite  | Single repo, built-in API routes, SSR, industry standard |
| Bun over npm             | Faster installs, native TypeScript, modern DX            |
| Clerk over custom auth   | Auth is solved; focus on product, not security plumbing  |
| Prisma 7                 | Latest version — config-file pattern, better type safety |
| Static content for Learn | Simplicity first; AI-generated lessons in a later phase  |
| Text-first Speaking      | Audio adds complexity; validate the feedback loop first  |
| Vercel + Railway         | Familiar from prior projects; fits $6/month budget       |
