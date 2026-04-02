# IELTS Master

A full-stack web application for self-directed IELTS preparation. Practice all four exam modules — Reading, Listening, Writing, and Speaking — with AI-powered feedback, track your progress, and study grammar and vocabulary, all in one place.

## Tech Stack

- **Framework** — Next.js 16 (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS v4
- **Auth** — Clerk
- **ORM** — Prisma 7
- **Database** — PostgreSQL 
- **AI** — Anthropic API (Claude)
- **Runtime** — Bun
- **Deploy** — Vercel

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed
- [Docker](https://www.docker.com) installed (for local database)
- A [Clerk](https://clerk.com) account

### Local development

```bash
# 1 — Clone the repo
git clone https://github.com/Tomas-Wardoloff/ielts-platform.git
cd ielts-platform

# 2 — Install dependencies
bun install

# 3 — Set up environment variables
cp .env.example .env

# 4 — Start the local database
docker compose up -d

# 5 — Run database migrations
bunx prisma migrate dev

# 6 — Start the development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Environment Variables

Copy `.env.example` to `.env` and fill in the required values:

```env
# Clerk — get these from dashboard.clerk.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Enviroment
NODE_ENV=

# Local database (docker compose up -d)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ielts_platform"
```

### Database

This project uses PostgreSQL. For local development, a `docker-compose.yml` is included:

```bash
# Start the database
docker compose up -d

# Stop the database
docker compose down

# Stop and remove all data
docker compose down -v
```

## Project Structure

```
src/
├── app/
│   ├── (auth)/         
│   ├── (dashboard)/    
│   └── api/            
├── components/
│   ├── home/           
|   |   └── animations/ 
│   ├── dashboard/       
│   ├── reading/         
│   ├── ui/             
│   └── shared/         
└── lib/                
└── types/              
```
