# VSL 360 — Experience Sri Lanka Completely

A premium, mobile-first, story-driven travel web app for **VSL 360**, a curator of authentic, high-end Sri Lankan journeys. Inspired by the editorial, expert-led approach of [olankatravels.com](https://www.olankatravels.com/).

## Design System — "Coastal & Organic"

| Token | Hex | Usage |
| --- | --- | --- |
| Ocean Blue | `#2a435d` | Primary, headers, text |
| Tropical Green | `#4e6e5d` | Secondary, nature tags |
| Sand Beige | `#e0d9d1` | Background |
| Sunset Gold | `#d18d36` | Accent, CTAs, active states |
| Surface Cream | `#fff8f3` | Cards & surfaces |

- **Headings**: EB Garamond (editorial serif)
- **Body / UI**: Inter (Mundial fallback)
- **Shape**: ~12px rounded corners, flat/minimal elevation, generous whitespace
- **Viewport**: Mobile-first, designed for 390×844; canvas centered on larger screens

## Tech Stack

- **Next.js 15** (App Router, React Server Components) + **TypeScript**
- **Tailwind CSS** with custom design tokens
- **Prisma ORM** + **PostgreSQL** (persists quote requests, journeys, stories, bookings)
- **Server Actions** for form mutations
- **Docker** + **Docker Compose** for one-command deployment

## Screens

- **Discover** — leopard hero, gold "Get a Quote" CTA, "How It Works" timeline, featured journeys & stories
- **Journeys** — curated experience cards + day-by-day itinerary detail
- **Planner** — 10-day vertical itinerary with activity icons, confirmed/planning status, sticky "Message Expert" module
- **Stories** — editorial article layout with drop-caps, pull-quotes, and "Book Your Journey" CTA
- **Get a Quote** — persists a `QuoteRequest`
- **Secure Checkout** — itemised invoice summary, persists a `Booking`

## Quick Start (Docker — recommended)

```bash
docker compose up --build
```

This starts PostgreSQL, applies the schema, seeds curated content, and serves the app:

- App: http://localhost:3002
- Postgres: localhost:5433 (`vsl360` / `vsl360`)

Custom itinerary wizard submissions are sent to the **VSL360 admin API** (`ADMIN_API_URL`), not stored in this database. Set `ADMIN_INGEST_API_KEY` to match `INGEST_API_KEY` on the admin backend.

## Local Development

Requires Node 20+ and a running PostgreSQL instance.

```bash
# 1. Install dependencies
npm install

# 2. Configure the database connection
cp .env.example .env   # edit DATABASE_URL if needed

# 3. Create tables and seed content
npm run db:setup

# 4. Start the dev server (use 3002 when VSL360 admin API is on 3000)
PORT=3002 npm run dev
```

App runs at http://localhost:3002 (or http://localhost:3000 if port 3002 is unused).

Set `ADMIN_API_URL` and `ADMIN_INGEST_API_KEY` in `.env` for the custom itinerary wizard.

### Useful Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Start the production server |
| `npm run db:setup` | `prisma db push` + seed |
| `npm run seed` | Seed curated journeys & stories |
| `npm run prisma:generate` | Regenerate the Prisma client |

## Project Structure

```
prisma/
  schema.prisma      # Journey, Story, QuoteRequest, Booking
  seed.ts            # Curated journeys & traveler stories
src/
  app/
    (app)/           # Tabbed shell: discover, journeys, planner, stories
    quote/           # Get a Quote form
    checkout/        # Secure checkout invoice
  components/        # UI: nav, cards, timelines, forms
  lib/               # prisma client, data access, server actions
Dockerfile
docker-compose.yml
```

> Photography is sourced from Unsplash for demonstration purposes.
