# Product

## Register

brand

## Users

Recruiters, hiring managers, potential collaborators, and peers landing on the
site cold — usually from a LinkedIn link, an email signature, or a referral.
They skim in 30–60 seconds on the way to deciding whether to follow up. Half
arrive on desktop in a quiet window, half on mobile between meetings. They are
not reading: they are forming an impression, scanning for signal, and looking
for one piece of evidence (a project, a story, a way of writing) that warrants
a conversation.

## Product Purpose

Show *who* Vincent Limardi is and *what he's built* in a way that opens
conversations. The CV facts (school, role, languages) are table stakes; the
job of the surface is to make the visitor think "I want to talk to this
person" within their 30-second skim. Success looks like inbound messages
that reference something specific they saw — a project, a phrase, a choice.

## Brand Personality

Sharp · curious · grounded.

- **Sharp**: opinionated, precise, no padding. Sentences end. Type is
  committed. Decisions are visible.
- **Curious**: shows range across disciplines (engineering, product, study
  abroad), not just one stack. Asks better questions than it answers.
- **Grounded**: confidence without volume. No "rockstar / ninja / 10x"
  language. No motion theater. Restraint is the voice; restraint is not
  bland.

Voice: first-person, direct, conversational but not casual. Closer to a
short essay than to a résumé.

## Anti-references

- **Notion-template CV.** Light background, big serif name, bullet lists,
  zero motion, looks like a typed document. Bland and forgettable. The
  primary anti-reference.
- **The current implementation's editorial-typographic trap.** Newsreader
  serif headings + tiny uppercase tracked eyebrows + numbered section
  markers (`01 · 02 · 03`) + zinc monochrome is the saturated 2026
  AI-portfolio fingerprint. Even when each element is "tasteful," the
  combination is exactly the Stripe-adjacent landing-page monoculture the
  brand register flags as a reflex-reject lane.
- **Vercel/Linear-clone dev portfolio.** Pure black background, Inter,
  glass cards, soft glows, generic "View Projects / GitHub" CTA pair. The
  dev-portfolio default of 2024–2025.
- **Awwwards-bait WebGL maximalism.** Three.js hero, scroll-jacking, custom
  cursor. Spectacle over substance. Slow, gimmicky.

## Design Principles

1. **Show, don't tell.** Project artifacts — images, links, real outcomes —
   carry more weight than adjectives. If a sentence describes how good
   something is, replace it with the thing.
2. **Confidence without volume.** "Sharp" means committed type, committed
   color, decisive spacing. It does not mean loud. The page should feel
   *made*, not designed-around.
3. **Each section earns its own treatment.** No template grammar. Education,
   Experience, Languages, Projects are different kinds of information; they
   should look different. The same card chrome repeated six times is a tell.
4. **Brand color, not safe gray.** A portfolio is the place to commit to a
   hue. Zinc + white is the absence of a decision. Pick one color and let it
   carry voice across surfaces.
5. **Motion is part of the build, not a layer on top.** When motion happens,
   it should reveal something the static page cannot. Reveal-on-scroll on
   every section is decoration; a language bar growing into its proficiency
   is information.

## Accessibility & Inclusion

- WCAG AA minimum across body text and interactive controls (≥4.5:1 contrast
  for body, ≥3:1 for large/bold).
- `prefers-reduced-motion: reduce` honored across every animation — already
  scaffolded in `globals.css` and respected in `Reveal` / `LanguageBar`.
- Keyboard navigation must reach every link, button, and project tile in
  visible focus order. No focus traps.
- Mobile-first: copy, headings, and tap targets must work at 360px width
  with no horizontal scroll. The most common visitor device is a phone.
