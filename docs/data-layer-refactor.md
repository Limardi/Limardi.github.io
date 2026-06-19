# Data / CMS Layer Refactor

Recap of the changes that reworked how portfolio content is fetched, typed, and
rendered. The goal was a cleaner, scalable, reliable, and maintainable data
structure on top of the existing Supabase backend (which we kept, and made
AI/RAG-ready).

## Why

The old setup had structural problems:

1. **Client-side fetch waterfall.** Every section was `'use client'` and fetched
  its own data in `useEffect` — 5 separate round-trips, skeleton flashes,
   layout shift, and **no CV content in the initial HTML** (bad for SEO / link
   previews).
2. **Two sources of truth.** `personal_info` was seeded in the DB but never read;
  `ProfileHeader` / `ContactSection` hardcoded name/email/phone/socials (and the
   phone had already drifted).
3. **Mapping boilerplate.** Each query hand-wrote snake_case→camelCase;
  `getProjects` / `getProjectBySlug` duplicated identical mapping. No generated
   DB types, so schema and TS could silently diverge.
4. **Fragile sorting.** Experience order came from parsing month names out of a
  free-text `period` string.
5. **Dead weight.** `skills` table + several types unused; `impact`/`focus`/
  `gpa`/`tScore` fetched but never rendered.
6. **Silent failure.** Queries swallowed errors and returned `[]`/`null`, so a
  DB outage rendered a blank CV with no signal.

## What changed

### Server-side rendering, one call

- `src/app/page.tsx` is now an **async server component** that calls a single
`getPortfolio()` (parallel `Promise.all`) and passes data down as props.
- Content is rendered into the initial HTML (verified: email + experience appear
in raw HTML). No skeleton flash, no request waterfall.
- ISR enabled via `export const revalidate = 3600`.

### One typed data pipeline

- `**src/lib/database.types.ts`** (new) — `Database` interface matching
`schema.sql`. Seam for `supabase gen types` later.
- `**src/lib/supabase/client.ts**` (new, replaces `src/lib/supabase.ts`) —
`createClient<Database>`, anonymous read-only client safe for server + browser.
- `**src/lib/mappers.ts**` (new) — the single place snake_case→camelCase happens;
`mapProject` shared by both project queries (duplication removed).
- `**src/lib/queries.ts**` (rewritten) — thin fetch+map, each wrapped in React
`cache()`; **throws on error** instead of returning blank; adds
`getPersonalInfo`, `getSkills`, and the `getPortfolio()` aggregate; sorts by
structured dates (the month-name parser was deleted).

### Single source of truth

- `ProfileHeader` and `ContactSection` now read name/email/phone/socials from
`personal_info`; the hardcoded literals were removed.
- These two components became server components (no client hooks needed).

### Sections are now presentational

- `Experience` / `Education` / `Organization` sections: removed
`'use client'`, `useEffect`, loading state, and `Skeleton`; they accept data
via props. `Reveal` stays the only client piece.
- `ProjectsSection` and `LanguageSection` stay `'use client'` (filter UI /
animated bar) but receive data via props instead of fetching — so their
content is still in the server HTML.

### Reliability

- `src/app/error.tsx` (new) — runtime error [boundary.si](http://boundary.si) w
- With ISR, a failed revalidation keeps serving the last good static render; a
failed build fails loudly instead of shipping a blank CV.
- `src/app/projects/[slug]/page.tsx` — dropped `force-dynamic`, added
`revalidate = 3600`, switched to cached query + `slug`.

### Schema / types cleanup

- Renamed the domain `id` field (which actually held the slug) to `**slug`** on
`Project` / `Experience` / `Organization`; updated all usages.
- Added optional `startDate` / `endDate` to `Experience` / `Organization`
(reliable ordering + useful for the future AI layer).
- Added `instagram` to `PersonalInfo`.
- `PortfolioData` is now the typed return of `getPortfolio()`.

### Database migrations

- `**supabase/migrations/0002_structured_dates.sql**` (new) — adds sortable
`start_date` / `end_date` to `experience` & `organizations`, backfills the seed
rows (`end_date NULL` = present), adds ordering indexes.
- `**supabase/migrations/0003_personal_socials.sql**` (new) — adds `instagram`
and backfills `linkedin` / `instagram` on `personal_info`.
- `**supabase/schema.sql**` updated so a fresh install matches (new columns +
seed values). Migrations are idempotent (`add column if not exists`,
`coalesce`).

## Files


| File                                            | Change                                           |
| ----------------------------------------------- | ------------------------------------------------ |
| `src/app/page.tsx`                              | async server component, `getPortfolio()`, ISR    |
| `src/app/projects/[slug]/page.tsx`              | ISR + `slug`, drop `force-dynamic`               |
| `src/app/error.tsx`                             | new error boundary                               |
| `src/lib/database.types.ts`                     | new typed schema                                 |
| `src/lib/supabase/client.ts`                    | new typed client (replaces `supabase.ts`)        |
| `src/lib/mappers.ts`                            | new — single snake→camel mapping                 |
| `src/lib/queries.ts`                            | rewritten — cached, throws, aggregate, date sort |
| `src/data/portfolio-data.ts`                    | `slug` rename, dates, `instagram`, cleanup       |
| `src/components/*Section.tsx`                   | presentational, props instead of fetching        |
| `src/components/ProfileHeader.tsx`              | reads `personal` prop                            |
| `src/components/ContactSection.tsx`             | reads `personal` prop                            |
| `supabase/schema.sql`                           | new columns + seed values                        |
| `supabase/migrations/0002_structured_dates.sql` | new                                              |
| `supabase/migrations/0003_personal_socials.sql` | new                                              |


## Verification

- `npx tsc --noEmit` — clean.
- Homepage renders experience + email in raw HTML (server-rendered).
- `/projects/<slug>` renders; unknown slug → 404.
- Socials (LinkedIn / Instagram / Phone) render from `personal_info`.

## Follow-ups

- **Run migration `0002_structured_dates.sql`** in Supabase. Until then,
experience falls back to `sort_order` (intern-first); after it, dates drive
reverse-chronological order automatically. (`0003` appears already applied
since socials render, but it is safe to re-run.)
- `impact` / `gpa` / `tScore` / `focus` are kept in the data model but still not
rendered in the UI — a separate design pass if/when wanted.
- The pinecone/langchain/openai deps are unused; `getPortfolio()` is the intended
single accessor for a future RAG feature, but no pipeline is wired yet.

