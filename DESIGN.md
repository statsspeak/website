# StatsSpeak — Design System

> The single source of truth for the StatsSpeak visual language. Read it before designing or shipping anything that affects the public marketing surface. Every decision in this document exists to project one thing: **institutional credibility**.

---

## 0. Mandate

StatsSpeak is a data consultancy and software development practice serving ministries, NGOs, and growth-stage enterprises across East Africa. The practice spans data strategy, governance, engineering, analytics, geospatial intelligence, AI workflows, software development, and data products. The visual identity must read the way a McKinsey or Palantir presentation reads in a procurement meeting: *quiet, exact, and unmistakably expensive.*

The site is not selling software. It is selling judgement.

Therefore the design is **subtractive** — we remove decoration until only what serves credibility remains.

---

## 1. Brand Personality

### 1.1 Tone

| Attribute | We are | We are not |
| --- | --- | --- |
| Voice | Plainspoken, declarative, evidence-led | Salesy, breathless, jargon-stacked |
| Posture | The senior consultant who has already done this for an institution you respect | The startup founder pitching for the first round |
| Confidence | Stated, never shouted | Caps-locked, exclamation-pointed |
| Specificity | Named clients, named outcomes, named tools | "Leading", "world-class", "innovative" |

### 1.2 Visual character

Editorial, not promotional. Closer to a financial-quarterly cover than a SaaS landing page. Generous whitespace, large serif display type, monochrome photography, restrained colour, hairline rules. The reader should feel they have opened a publication, not a brochure.

### 1.3 Design principles

1. **Restraint over reach.** If a component or animation does not earn its place, it is removed.
2. **Typography is the brand.** Layout decisions defer to type.
3. **Whitespace is paid-for.** Empty space signals confidence; we use it liberally.
4. **One accent, one role.** Colour is punctuation, not decoration.
5. **Motion confirms; it does not entertain.** No loops, no bounces, no marquees.
6. **Specificity beats superlatives.** Numbers, names, and dates over adjectives.
7. **Never decorate what content alone can carry.** If a section works in plain HTML, it works.

### 1.4 What we forbid

Pulsing blur orbs · rotating taglines · gradient banner CTAs · stock photography from Unsplash · italicised pull quotes · 5-star rating icons · pill buttons · drop shadows on hero text · `min-h-screen` per section · emoji as icons · "Learn more" buttons · animated counters · parallax effects on text · saturated cyan-blue as a primary fill.

---

## 2. Typography

Typography carries 60% of the perceived quality of this site. We invest in it accordingly.

### 2.1 Typefaces

| Role | Family | Loaded from | Notes |
| --- | --- | --- | --- |
| Display (editorial) | **Fraunces** (variable, opsz + wght) | Google Fonts | High-contrast modern serif. Used for hero headlines, pull quotes, large numerals. |
| Body & UI | **Inter Tight** (variable) | Google Fonts | Neutral grotesk. Used for everything else. |
| Data & code | **JetBrains Mono** | Google Fonts | Used for metrics, tabular numerals in cards, technology callouts, code. |

**Fallbacks**

```css
--font-display: "Fraunces", "Source Serif 4", Georgia, "Times New Roman", serif;
--font-sans:    "Inter Tight", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-mono:    "JetBrains Mono", "SF Mono", ui-monospace, Menlo, monospace;
```

Variable axes used: Fraunces `opsz 144, wght 400–600`. Inter Tight `wght 400–600`. Never use weights ≥ 700 for body or UI; reserve 600 for emphasis. Display weights stay at **400** — heavy weights destroy editorial register.

### 2.2 Type scale

Perfect fourth (1.333) scale, anchored at 16 px base. All sizes use `rem` and clamp for fluid response. Letter-spacing follows the curve: tighter at large sizes, looser at small sizes.

| Token | Size (desktop) | Mobile fluid | Family | Weight | Tracking | Leading |
| --- | --- | --- | --- | --- | --- | --- |
| `text-display-1` | 88 px / 5.5 rem | clamp(56px, 8vw, 88px) | Display | 400 | -0.02em | 1.02 |
| `text-display-2` | 64 px / 4 rem | clamp(44px, 6vw, 64px) | Display | 400 | -0.02em | 1.04 |
| `text-h1` | 48 px / 3 rem | clamp(36px, 5vw, 48px) | Display | 400 | -0.015em | 1.08 |
| `text-h2` | 36 px / 2.25 rem | clamp(28px, 4vw, 36px) | Display | 400 | -0.012em | 1.15 |
| `text-h3` | 24 px / 1.5 rem | 24px | Sans | 600 | -0.01em | 1.25 |
| `text-h4` | 20 px / 1.25 rem | 20px | Sans | 600 | -0.005em | 1.3 |
| `text-body-lg` | 18 px / 1.125 rem | 18px | Sans | 400 | 0 | 1.6 |
| `text-body` | 16 px / 1 rem | 16px | Sans | 400 | 0 | 1.6 |
| `text-caption` | 14 px / 0.875 rem | 14px | Sans | 400 | 0 | 1.5 |
| `text-micro` | 12 px / 0.75 rem | 12px | Sans | 500 | 0.08em | 1.4 |
| `text-mono` | 14 px / 0.875 rem | 14px | Mono | 500 | 0 | 1.5 |

**Eyebrows / kickers** above section headings use `text-micro`, weight 500, tracking `0.08em`, uppercase, in `--ink-500`. This is the only place uppercase appears.

### 2.3 Hierarchy rules

- One `display-1` per page (hero only).
- One `display-2` per major section, maximum.
- Body line length: 60–72 characters. Use `max-w-[62ch]` for prose.
- Never combine bold + italic + colour change. Pick one form of emphasis.
- Numerals in data contexts always use `font-variant-numeric: tabular-nums lining-nums`.

### 2.4 Editorial conventions

- Pull quotes use `text-display-2`, Display family, weight 400, with a thin left rule (`border-l-2 border-ink pl-6`). No quotation marks; the typographic treatment is the quotation.
- Numerals in proof statements use mono or display family at large size, paired with a serif description below. Example:

  ```
  3.2M     records ingested daily for
            Kenya Ministry of Health
  ```

---

## 3. Colour

### 3.1 Philosophy

The palette is **ink + bone + one restrained teal accent**. The site is monochrome with a single brand accent calibrated to complement the teal logo without making the interface feel loud. Saturation is intentionally low across the board. We do not gradient.

### 3.2 Tokens

All tokens are CSS variables on `:root`. Tailwind exposes them via `@theme inline`. Never hard-code hex values in components.

**Neutral scale (the spine of the system)**

| Token | Hex | Role |
| --- | --- | --- |
| `--ink` | `#0A0B0D` | Primary text, primary surface in dark mode, ink-on-bone CTAs |
| `--ink-800` | `#16181C` | Headings on bone, deep cards |
| `--ink-700` | `#2A2D33` | Strong body text |
| `--ink-500` | `#5C6068` | Secondary text, captions |
| `--ink-300` | `#A4A8B0` | Tertiary text, disabled |
| `--ink-200` | `#D6D8DC` | Hairlines, dividers |
| `--ink-100` | `#ECEDEF` | Subtle surfaces, hover states |
| `--bone` | `#F6F4EE` | Primary page background (warm off-white) |
| `--paper` | `#FFFFFF` | Card surfaces on bone |

**Brand accent (use sparingly)**

| Token | Hex | Role |
| --- | --- | --- |
| `--marine` | `#064A55` | Deep teal accent. Used for links and focus states; primary CTAs remain ink. |
| `--marine-700` | `#083F49` | Hover state for `--marine`. |
| `--marine-50` | `#E6F7F9` | Subtle teal tint — used sparingly as a section accent. |
| `--logo-teal` | `#00ACC8` | Logo mark only. Do not flood the interface with this brighter teal. |

**Punctuation (rare — once per page maximum)**

| Token | Hex | Role |
| --- | --- | --- |
| `--ochre` | `#B8893A` | One warm typographic flourish, e.g. a single underlined word in a pull quote, or a small dot indicator. |

**Semantic (forms & system)**

| Token | Hex | Role |
| --- | --- | --- |
| `--success` | `#1F6F4A` | Form success, validation tick (deep, not bright green) |
| `--danger` | `#8B2118` | Error states (deep oxblood, not bright red) |
| `--focus` | `#0B2E45` at 40% | Focus ring base (over an ink offset ring) |

### 3.3 What we explicitly do not use

- The previous `#1A7595` saturated cyan-blue.
- Tailwind's default `blue-*`, `sky-*`, `cyan-*`, `indigo-*` palettes.
- Any gradient with more than one ink stop (gradients are forbidden except hairline shadows).
- Yellow / amber / lime / pink / purple for any decorative purpose.
- Colour to differentiate cards. Cards differentiate by content, not by tint.

### 3.4 Dark mode

The bone surface inverts to `--ink` and the ink scale inverts. `--marine` stays. `--ochre` shifts +5% lightness. The site reads identical in editorial register in both modes — that is the test.

### 3.5 Contrast guarantees

| Pairing | Contrast | Min size |
| --- | --- | --- |
| `--ink-800` on `--bone` | 17.4:1 | any |
| `--ink-500` on `--bone` | 5.8:1 | 14 px+ |
| `--ink-300` on `--bone` | 2.6:1 | 24 px+ only |
| `--marine` on `--bone` | 11.7:1 | any |
| `--bone` on `--ink` | 16.2:1 | any |

---

## 4. Layout

### 4.1 Grid

- 12-column grid, gutter `24 px` desktop, `16 px` tablet, `16 px` mobile.
- Container max-width: `1280 px`. Hero may break out to `1440 px` for full-bleed editorial layouts.
- Outer page padding: `clamp(24px, 4vw, 80px)`.

### 4.2 Spacing scale

We use a strict 4-px scale with a tight inventory. **Do not invent intermediate values.**

```
0  ·  4  ·  8  ·  12  ·  16  ·  24  ·  32  ·  48  ·  64  ·  96  ·  128  ·  160  ·  200
```

| Token | px | Use |
| --- | --- | --- |
| `--space-1` | 4 | inline gaps in tags / kickers |
| `--space-2` | 8 | icon-to-label, dense list |
| `--space-3` | 12 | tight stack |
| `--space-4` | 16 | default stack |
| `--space-6` | 24 | grid gutter, default card padding inset |
| `--space-8` | 32 | card padding |
| `--space-12` | 48 | section sub-block |
| `--space-16` | 64 | between heading and content |
| `--space-24` | 96 | section bottom (compact) |
| `--space-32` | 128 | section bottom (default) |
| `--space-40` | 160 | section bottom (editorial) |
| `--space-50` | 200 | hero ↔ first section, page ↔ footer |

### 4.3 Vertical rhythm

Section spacing follows a 3-step cadence: **compact (96) · default (128) · editorial (160)**. We never use `min-h-screen` to force-fill. Sections size to content.

### 4.4 Radii

| Token | px | Use |
| --- | --- | --- |
| `--radius-sm` | 2 | inputs, hairline tags |
| `--radius` | 4 | buttons, default cards |
| `--radius-md` | 8 | large feature cards, dialogs |
| `--radius-lg` | 12 | images, media containers |

**No pill buttons.** No `rounded-full` except for avatar containers and the brand mark.

### 4.5 Elevation

Shadows are forbidden by default. Cards separate via:

1. A 1 px `--ink-200` hairline border, or
2. A `--paper` fill against `--bone` background, or
3. Generous whitespace (preferred).

The only allowed shadow is `--shadow-pop` for transient overlays (popovers, dropdowns):
`box-shadow: 0 1px 2px rgba(10,11,13,0.04), 0 12px 32px rgba(10,11,13,0.08);`

---

## 5. Components

### 5.1 Buttons

```
Variants:  primary  ·  secondary  ·  ghost  ·  link
Sizes:     sm (36px)  ·  md (44px)  ·  lg (52px)
Radius:    --radius (4px) — never rounded-full
Weight:    500
Tracking:  0
Icon size: 16px (sm/md), 18px (lg)
```

- **Primary** — `bg-ink text-bone`, hover `bg-ink-700`. Use once per section. Never two primaries side-by-side.
- **Secondary** — `bg-transparent text-ink border border-ink`, hover `bg-ink text-bone`. Slow transition (200ms, ease-out).
- **Ghost** — text-only with a 1 px underline-offset-8 underline that appears on hover.
- **Link** — inline link, `text-marine`, underline always present at `underline-offset-4 decoration-1`.

No shadows. No gradient fills. No glow on hover. No scale on hover. Hover changes are limited to `background-color`, `color`, and `border-color`.

### 5.2 Cards

- Surface: `--paper` on `--bone` page bg, or `--bone` on `--ink` (dark).
- Padding: `--space-8` (32 px) default, `--space-12` (48 px) feature.
- Border: 1 px `--ink-200` *or* no border with whitespace separation. Pick one and apply per section consistently.
- Heading: `text-h3`. Body: `text-body`. Action: `text-link` at base of card, with a trailing arrow `→` glyph.
- Hover: border darkens to `--ink-300`. No translate, no scale, no shadow lift.

### 5.3 Inputs

- Style: **flat with a 1 px bottom rule only.** Border on all four sides is replaced by `border-b border-ink-300`, `background: transparent`. Label sits above in `text-micro`.
- Focus: bottom rule thickens to 2 px and changes to `--marine`.
- Error: bottom rule changes to `--danger`, helper text appears `text-caption text-danger`.
- Height: 48 px.

Forms are the most over-decorated component on most sites. Ours are the quietest.

### 5.4 Tables

- Header row: `text-micro` uppercase, tracking `0.08em`, `border-b border-ink`. No background fill.
- Body rows: `border-b border-ink-100`, no zebra striping.
- Numerals: `font-mono`, `tabular-nums`, right-aligned in numeric columns.
- Hover: row background `--ink-100`.

### 5.5 Navigation

- Background: `--bone` (or transparent over hero, with a 1 px hairline on scroll).
- Logo: `--ink` at 24 px height.
- Links: `text-caption`, weight 500, `text-ink-700`. Active page: `text-ink` with a 1 px underline at `underline-offset-8`.
- Mobile: slide-in drawer from the right, `--ink` surface, `--bone` text. No hamburger animation gimmicks.
- Scroll behaviour: top bar collapses from 80 px → 64 px height with a hairline appearing below it. 200 ms transition.

### 5.6 Modals / Dialogs

- Surface: `--paper`, `--radius-md`, `--shadow-pop`.
- Backdrop: `--ink` at 60% opacity, `backdrop-blur-sm`.
- Close affordance: top-right `×` glyph in `--ink-500`, no circle around it.
- Entry: 200 ms fade + 8 px translate-y, ease-out.

### 5.7 CTAs (section-level)

The CTA section is a quiet block, not a coloured banner.

```
Layout:    Single column, centred, max-w 720px
Surface:   --bone (same as page) — no contrasting fill
Heading:   text-display-2, Display family, weight 400
Sub:       text-body-lg, --ink-500
Action:    One primary button. One ghost link below it.
Spacing:   space-32 vertical, space-12 between heading and action
```

The persuasion is the restraint — not the gradient.

### 5.8 Logo wall

- Surface: `--bone`, no card.
- Logos: monochrome `--ink-500`, single size band (`h-8`), single row of even spacing.
- No hover colourisation. No grayscale-to-colour. Logos display once, consistently, always.
- Caption above wall: kicker style ("INSTITUTIONAL CLIENTS"), `text-micro`, tracking `0.08em`.

### 5.9 Testimonials

A testimonial without a named attribution is forbidden.

```
Layout:    1-column or 2-column max, no carousel
Quote:     text-display-2, Display family, weight 400
            -- no quotation marks, no italics
Attribution:
  Name        text-body-lg, weight 500, --ink
  Role        text-caption, --ink-500
  Company     text-caption, --ink-500
Hairline:   1 px --ink-200 above attribution block
```

No star ratings, ever. No photo bubbles unless every testimonial has one.

### 5.10 Proof / metrics

Replace vanity counters. The proof block format:

```
[Display numeral, font-display 64px]      [Description, text-body, --ink-500]
3.2M                                       records ingested daily for
                                           Kenya Ministry of Health
─────────────────────────────────────────  ← 1px --ink-200 hairline
```

No `+`. No animated count-up. The number is what it is.

---

## 6. Motion

Motion communicates *system quality*. It is never decorative.

### 6.1 Principles

1. **Reveal, do not perform.** Motion confirms a state change; it does not entertain.
2. **One axis at a time.** Translate OR fade OR scale, never combined as a "burst".
3. **Short and ease-out.** Default 200 ms, `cubic-bezier(0.2, 0, 0, 1)`.
4. **Reduced motion is honoured.** All animation respects `prefers-reduced-motion: reduce`.
5. **No loops.** Nothing pulses, breathes, floats, or rotates on idle.

### 6.2 Durations & easings

| Token | ms | Use |
| --- | --- | --- |
| `--ease-out` | `cubic-bezier(0.2, 0, 0, 1)` | Default. Entrances, hover-out. |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Re-arrangement, position swaps. |
| `--ease-expo-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Page-level reveals. |
| `--dur-1` | 120 ms | Micro (hover colour). |
| `--dur-2` | 200 ms | Default. |
| `--dur-3` | 320 ms | Page-section reveal. |
| `--dur-4` | 600 ms | Editorial entrance (display headings). |

### 6.3 Scroll-reveal

- 16-24 px translate-y + opacity 0 → 1.
- 600 ms, `--ease-expo-out`.
- One element per stagger; stagger interval 60-80 ms maximum.
- Triggered at 15% intersection.
- **Never combine with scale or rotate.**

### 6.4 Page transitions

- 200 ms fade + 8 px lift, `--ease-out`.
- Lenis smooth scroll retained, but `lerp: 0.08` (not the more aggressive defaults).
- No "parallax" on text. Parallax permitted only on full-bleed photographic surfaces, at 0.15 ratio maximum.

### 6.5 Hover

- Buttons: background-colour transition only, 120 ms.
- Cards: 1 px border colour transition, 200 ms.
- Images in editorial cards: a 200 ms `filter: brightness(0.96)` darken — never a scale.
- Links: underline thickens from 1 px to 2 px, 120 ms.

### 6.6 Forbidden motion

`animate-pulse`, `animate-bounce`, `animate-float`, `animate-rotate-text`, `animate-glowing-lines`, `animate-pulse-primary-blue`, `.shutter-effect`, blob/orb pulses, mouse-trail effects, hero parallax on text, on-scroll counters, marquees of any kind.

### 6.7 Hero canvas — the only permitted idle motion

The §6.1 "no loops" rule has **one** carve-out: a single WebGL scene in the hero, behind the right-hand column. It is permitted because it functions as ambient texture, not animation. The canvas may take one of two forms — never both, never a mix:

- **Form A · Sculpted object.** A single noise-displaced wireframe icosahedron (current). Reads as an editorial still life.
- **Form B · Constellation.** A sparse field of nodes and edges. Reads as a quiet field. (Kept as a documented fallback for very low-end devices or as a future variant.)

Whichever form is in flight, the canvas must hold every one of these constraints:

- **Palette.** Lines in `--ink`. Fresnel/accent in `--marine`. The brighter `--logo-teal` is reserved for the logo mark and never appears in the canvas. Off-palette `--statsspeak-navy`, `--statsspeak-blue`, `--statsspeak-teal` are forbidden — they exist only for legacy compatibility and are scheduled for removal (§15.3 #1).
- **Wireframe only.** No solid surfaces, no PBR materials, no env maps, no shadows. The site is line work.
- **Density (Form A).** A single mesh, icosahedron subdivision ≤ 64. Vertex noise displacement amplitude ≤ 0.15 world units. No additional meshes, no orbiters, no particle systems.
- **Density (Form B).** ≤ 24 nodes and ≤ 24 edges. No flow particles or moving dots travelling along edges.
- **Opacity.** Line/edge alpha ≤ 0.95. Background of the scene is fully transparent (renderer `alpha: true`, `setClearColor(_, 0)`); the `--bone` page surface shows through.
- **Drift.** Mesh rotation accumulators ≤ 0.001 rad / frame (Form A). Per-node sine amplitude ≤ 0.025 world units, phase multiplier ≤ 0.25 (Form B). The motion should feel like breath, not a fan.
- **Cursor lerp (Form A only).** A single point-light position may track the cursor, but always through a lerp factor ≤ 0.08 — never `position.copy()`. A snapped follow reads as a trail effect, which §6.6 forbids.
- **Scrim.** A CSS overlay (`statsspeak-hero-scrim`) fades the canvas into `--bone` under the headline column (left side ≥ 90% bone) and lets it breathe in the right column (≤ 10% bone at the far right). Type always sits on quiet ground.
- **Position.** On viewports ≥ 1024 px, the mesh is offset to the right so it sits in the right column. On narrow viewports it returns to centre.
- **Reduced motion.** When `prefers-reduced-motion: reduce` matches: noise time is frozen, rotation accumulators stop, and the cursor lerp factor becomes 1 (the light snaps once and stays). The scene continues to render — but the only thing that changes is the resize.
- **Cost.** WebGL renderer uses `powerPreference: "low-power"` and `setPixelRatio(min(devicePixelRatio, 1.6))`. The canvas does not earn a fan spin-up.

If a future hero variant cannot meet all of the above, the canvas is removed and the hero falls back to a typographic-only layout per §13.2 P5.

---

## 7. Iconography

- `lucide-react` only, 1.5 px stroke weight, never filled.
- Sizes: 16 / 18 / 20 / 24 px. Match the line-height of the adjacent text.
- Colour: inherit (`currentColor`) from the surrounding text. Never accent-coloured for decoration.
- No icon-in-coloured-tile patterns ("rounded-2xl gradient square with a Shield in it"). Icons sit inline with text, period.

---

## 8. Imagery

### 8.1 Sources

- **Forbidden:** Unsplash, Pexels, generic stock libraries. The "abstract data network", "satellite map", "person looking at code" stock photos are blacklisted.
- **Allowed:**
  1. Anonymised product / dashboard screenshots from real client work.
  2. Bespoke editorial photography of the team and office in Nairobi (monochrome or near-monochrome treatment).
  3. Custom illustration / typographic compositions.
  4. Public-domain or named-source field photography for case studies, with credit line.

### 8.2 Treatment

- Default treatment: full colour but desaturated to ~70%. Apply a `filter: saturate(0.7) contrast(1.05)` system filter.
- Containers: `--radius-lg` (12 px). Never rounded-full except avatars.
- Aspect ratios: `4/3` for team & case-study cards, `16/9` for inline, `3/2` for hero feature.
- No drop shadows on imagery. Images sit flat on the page.

### 8.3 Captions

Every meaningful image has a caption set in `text-caption`, `--ink-500`, with a 1 px hairline above it. This is editorial signalling: real publications caption their imagery.

---

## 9. Content & Voice

### 9.1 Headlines

- Declarative, not interrogative.
- Single sentence, ≤ 12 words.
- No marquee rotators. No "we are X. we are Y. we are Z."
- Subject is concrete: *"Data and software institutions can defend."* — not *"Transforming organisations through data."*
- The headline carries both disciplines (data **and** software). A data-only headline misrepresents the practice.
- No three-word triadic taglines (`Data. Intelligence. Impact.`-style). They read as boilerplate consultancy speak.

### 9.2 Body copy

- Active voice.
- Specific institutions, specific outcomes, specific dates.
- One idea per paragraph. Paragraphs ≤ 4 lines on desktop.

### 9.3 Proof statements

Replace adjectives with attributed numbers.

| Don't | Do |
| --- | --- |
| "Trusted by leading organisations" | "Institutional clients since 2020 — AMREF Health Africa, Kenya MoH, Pezesha, LVCT Health." |
| "100+ projects · 50+ clients · 5+ years" | "Forty-eight engagements delivered in five years for partners across health, fintech, and public sector." |
| "Measurable results" | "Reduced reporting latency by 38% for [named client]." |

### 9.4 CTA copy

- One verb + one noun. *"See the case study"*, *"Book an introduction"*, *"Read our approach"*.
- Sentence case throughout — not Title Case. (`Book an introduction`, not `Book An Introduction`.)
- The same action uses the same label across the site. The hero primary CTA is `Book an introduction` — not `Schedule Consultation`, not `Contact us`.
- No "Learn more". No "Get started". No "Discover".

### 9.5 Brand mark in copy

The only correct spelling in prose is **StatsSpeak** (camel case, capital S in both syllables). `Statsspeak`, `statsspeak`, and `STATSSPEAK` are bugs. The lowercase form is reserved for URLs (`statsspeak.co.ke`) and code identifiers (`StatsspeakHero`).

---

## 10. Accessibility

This is a non-negotiable layer of the design system, not a "polish pass".

- **Contrast:** all text meets WCAG AA at 4.5:1 minimum; large display text meets 3:1.
- **Focus rings:** visible on every interactive element. Style: 2 px `--marine` outline with 2 px transparent offset. Never removed.
- **Motion:** every animation is wrapped in a `prefers-reduced-motion: reduce` guard that disables transforms and durations ≥ 200 ms.
- **Forms:** every input has a programmatically associated label. Errors announced via `aria-live="polite"`.
- **Icons:** decorative icons get `aria-hidden="true"`. Functional icons get `aria-label`.
- **Heading order:** strictly sequential. One `<h1>` per page.
- **Keyboard:** every interactive flow completable via keyboard. Tab order matches visual order.

---

## 11. UX Principles

### 11.1 Information density

The site is *intentionally low-density*. We do not pack the page. A premium page communicates by what it leaves out.

### 11.2 Conversion model

- **One primary action per page.** Home: *Book an introduction*. Services: *See a relevant case study*. Case Studies: *Book an introduction*. About: *Read our approach* or *Book an introduction*. Contact: *Send brief*.
- **Tertiary actions are text links**, never buttons.
- **Forms are short.** Contact form fields, in order: Name, Work email, Organisation (optional), Brief (textarea, 1000 chars). No phone, no budget, no service selector. Budget conversations happen in the meeting.

### 11.3 Navigation

- 4 items max in the top bar (Services, Work, About, Contact). "Home" is the logo.
- No mega-menus. No flyouts. If a section is too complex for a link, it is too complex for the nav.
- Footer is a sitemap, not a billboard. Three columns max.

### 11.4 Trust hierarchy

On every page, in this order:
1. **A specific proposition** (1 sentence).
2. **One named client outcome** (proof).
3. **Institutional client wordmarks** (logo wall, monochrome).
4. **Detailed case study or service** (depth).
5. **A single CTA.**

If a section does not serve one of these five purposes, it is removed.

---

## 12. Implementation Notes

### 12.1 Files of record

| File | Role |
| --- | --- |
| [src/index.css](src/index.css) | Token definitions (`:root` + `@theme inline`) |
| [src/lib/utils.ts](src/lib/utils.ts) | `cn()` helper |
| [components.json](components.json) | shadcn registry config |
| [src/components/ui/](src/components/ui/) | shadcn primitives — extend in place, do not wrap |
| [DESIGN.md](DESIGN.md) | This document |

### 12.2 Tailwind theme mapping

All semantic tokens are exposed through `@theme inline` in [src/index.css](src/index.css):

```css
--color-bg-bone:      var(--bone);
--color-bg-paper:     var(--paper);
--color-bg-ink:       var(--ink);
--color-text-ink:     var(--ink-800);
--color-text-muted:   var(--ink-500);
--color-text-faint:   var(--ink-300);
--color-line:         var(--ink-200);
--color-marine:       var(--marine);
--color-marine-hover: var(--marine-700);
--color-ochre:        var(--ochre);
```

Tailwind classes resolve to `bg-bone`, `text-ink`, `border-line`, `text-marine`, etc. **Do not use raw Tailwind colour utilities (`bg-blue-500`, `text-gray-600`).**

### 12.3 Adding shadcn components

`npx shadcn@latest add <name>` drops into `src/components/ui/`. Restyle to match this spec before shipping: replace `rounded-2xl` with `rounded` (4 px), remove shadows, swap colour tokens to the marine/ink scale, and ensure focus rings use `--marine`.

---

## 13. Migration Plan — From Current Site to This System

This document is the *destination*. The current site needs the following surgery to reach it.

### 13.1 P0 — Brand-damaging fixes (ship this week)

1. **Delete the anonymous testimonials block** from [HomePage.tsx:128-153](src/components/HomePage.tsx#L128). Replace with one attributed quote, or remove the section until real attribution is collected.
2. **Replace emoji in footer** ([App.tsx:60-62](src/App.tsx#L60)) with `lucide-react` icons (`Mail`, `Phone`, `MapPin`).
3. **Dynamic copyright year** in [App.tsx:130](src/App.tsx#L130): `© {new Date().getFullYear()} StatsSpeak Limited. Nairobi, Kenya.` (`StatsSpeak`, camel case — see §9.5.)
4. **Replace vanity counters** ([HomePage.tsx:317-360](src/components/HomePage.tsx#L317)) with attributed proof statements per §9.3.

### 13.2 P1 — Brand uplift (next sprint)

5. **Rip out the photo-overlay hero.** Replace with a typographic hero on `--bone`: `display-1` headline + `body-lg` description + one primary CTA + one secondary link. No subtitle line, no background image, no glow orbs, no rotating word, no text shadow. Delete the sticky `-mt-[100vh]` overlap trick. The only permitted background is the §6.7 hero canvas — a low-density ink constellation that reads as ambient texture. If the canvas cannot meet §6.7 constraints, ship the typographic-only fallback.
6. **Strip all Unsplash imagery** from service cards in [HomePage.tsx](src/components/HomePage.tsx) and [ServicesPage.tsx](src/components/ServicesPage.tsx). Replace with type-only cards bearing the service name as `display-2`, a description, and a "→ See related work" link.
7. **Adopt the new palette.** Edit [src/index.css](src/index.css) to replace the `--primary-blue*` / `--charcoal` / `--medium-blue` / chart palette with §3 tokens. Find/replace `bg-primary-blue` → `bg-ink`, `text-primary-blue` → `text-ink`, etc.
8. **Replace Google Fonts import** in [src/index.css](src/index.css):
   ```css
   @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter+Tight:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');
   ```
9. **Rebuild the button variants** in [src/components/ui/button.tsx](src/components/ui/button.tsx): `rounded-2xl` → `rounded`, drop the `xl` / `2xl` sizes, redefine `default` / `outline` / `ghost` / `link` per §5.1.
10. **Replace the gradient CTA banner** ([HomePage.tsx:604-637](src/components/HomePage.tsx#L604)) with the §5.7 quiet CTA pattern.
11. **Remove `min-h-screen`** from every section. Replace with `py-32 lg:py-40` (default) or `py-24 lg:py-32` (compact).
12. **Reduce scroll progress bar** ([App.tsx:181](src/App.tsx#L181)) to `h-px` and `bg-ink` (no gradient).

### 13.3 P2 — Motion & detail cleanup

13. **Delete decorative keyframes** from [src/index.css](src/index.css): `.animate-rotate-text`, `.animate-glowing-lines`, `.animate-pulse-primary-blue`, `.animate-float`, `.shutter-effect`, `.data-network-background`, `.hero-pattern`, all `.gradient-*` utilities.
14. **Delete the rotating-text useEffect** in [HomePage.tsx:192-198](src/components/HomePage.tsx#L192) and the `rotatingTexts` array.
15. **Disable hover scale** on images: search `group-hover:scale-105` → remove. Replace with a `brightness-95` filter transition per §6.5.
16. **Strip the 4-colour "Why Choose Us" tiles** ([HomePage.tsx:550-600](src/components/HomePage.tsx#L550)) — uniform card surface, no coloured icon tile, content-only differentiation.
17. **Logo wall:** remove `grayscale group-hover:grayscale-0`. Set logos to a single monochrome treatment (`filter: grayscale(1) opacity(0.7)`) and leave them there.
18. **Contact form** ([ContactPage.tsx](src/components/ContactPage.tsx)): reduce to Name / Work email / Organisation / Brief. Remove budget and service-type selectors.

### 13.4 P3 — Editorial polish

19. **Captions on imagery.** Every figure gets a 1-line caption per §8.3.
20. **`prefers-reduced-motion` guards** wrap every animation. Add a single media query block in [src/index.css](src/index.css).
21. **Tabular numerals** on metrics: add `font-variant-numeric: tabular-nums lining-nums` to a `.metric` utility class.
22. **Audit headings**: one `<h1>` per page, sequential order downward. Currently [HomePage.tsx](src/components/HomePage.tsx) has multiple h2s with no clear hierarchy.

---

## 14. Quick Reference — "Is this on brand?"

A 30-second self-check before shipping any new screen:

- [ ] No colour outside the §3 palette
- [ ] No font outside Fraunces / Inter Tight / JetBrains Mono
- [ ] No `rounded-full` except avatars and the brand mark
- [ ] No drop shadow except `--shadow-pop` on transient overlays
- [ ] No gradient anywhere
- [ ] No stock photo
- [ ] No emoji as icon
- [ ] No `min-h-screen` forcing layout
- [ ] One primary CTA in this section, not two
- [ ] No animation that loops on idle
- [ ] Every metric has a citation; every testimonial has a name
- [ ] Body copy ≤ 4 lines per paragraph; line length 60–72 ch
- [ ] Focus rings visible on every interactive element
- [ ] Captions present on meaningful imagery

If any box is unchecked, the screen is not ready.

---

## 15. Premium Positioning Audit (2026-05-28)

This section is the standing answer to the question "is the site competing at the level of high-end consulting firms, premium technology companies, and award-winning agency sites?" It must be re-run before every major release. Findings live here; once a finding is resolved, it is struck and the relevant rule moves into §§1–14.

### 15.1 Executive summary

The visual language is correctly *editorial*: serif display, ink-on-bone, hairline rules, generous whitespace, monochrome photography, no gradients. That foundation already separates StatsSpeak from the SaaS template trap. What still leaks perceived value is **execution inconsistency**: legacy off-palette tokens that sneak into otherwise on-brand components, ad-hoc Tailwind utilities that bypass the type scale, and a hero animation tuned without a stated standard. Closing those gaps is what moves the site from "well-designed boutique consultancy" to "the brand a CIO defends in a procurement meeting."

The site is not failing because it tried to do too much. It is leaking value at the seams of components that were built before the design system existed.

### 15.2 Premium benchmarks

The brands this site is measured against in 2026: **McKinsey & Company**, **Bain & Company**, **Palantir**, **Stripe**, **Linear**, **Vercel**, **Bruno Sancho**, **Hartmann & Forbes**, **Apple "Pro" pages**, **Pentagram**. The common signature: typography carries 60% of the perceived quality; colour is punctuation; motion confirms rather than entertains; the page does *less* than the visitor expects.

### 15.3 Impact-ranked open issues

| # | Severity | Issue | Why it leaks value | Fix |
|---|---|---|---|---|
| 1 | **P0** | Legacy off-palette tokens `--statsspeak-navy`, `--statsspeak-blue`, `--statsspeak-teal` still defined in [src/index.css](src/index.css). | Two parallel colour vocabularies guarantee components drift apart over time. McKinsey-tier sites have one. | Delete the three tokens and any `bg-statsspeak-*` / `text-statsspeak-*` / `border-statsspeak-*` references. Migrate to `--ink` / `--marine`. |
| 2 | **P0** | Hero `<h1>` used raw `text-5xl font-semibold` instead of the `text-display-1` token. (Fixed in this revision — guard against regressions.) | Display weight 600 destroys editorial register; raw size utilities fragment the scale. | All display headings use `text-display-1`/`text-display-2`. No `font-semibold` on display. |
| 3 | **P0** | Hero CTAs were styled with off-palette className overrides, bypassing the canonical `primary`/`secondary` Button variants. (Fixed in this revision.) | When the most prominent buttons on the site ignore the design system, every downstream component reads the system as optional. | Hero primary = `bg-ink text-bone`. Hero secondary = `bg-transparent text-ink border-ink`. No overrides. |
| 4 | **P1** | Logo wall uses inline `style={{ filter: "grayscale(1) brightness(0.6)", opacity: 0.85 }}`. | Inline filters can't be themed and read as ad-hoc. | Move to a single `.logo-monochrome` utility in [src/index.css](src/index.css) with `filter: grayscale(1) opacity(.65)`. |
| 5 | **P1** | Disciplines grid on the home page uses `text-h2` for every card title. | Five h2-weight headings in a grid read as shouty. The premium move is restraint — `text-h3` keeps the cards scannable. | Demote the five cards to `text-h3`. Reserve `text-h2` for section anchors. |
| 6 | **P1** | Section CTA "See related work →" mixes a string arrow with the lucide `ArrowRight` icon used elsewhere. | Mixed icon languages signal an incomplete system. | Standardise on lucide `ArrowRight`, 16 px, inline with text. Or commit to the typographic arrow everywhere — pick one. |
| 7 | **P1** | About page section header `How the work is held.` reads precious next to the plainspoken voice of the rest of the site. | Premium voice is confident, not poetic. The line stands out for the wrong reason. | Replace with `How we work` or fold values into a numbered "Operating values" block. |
| 8 | **P2** | About page milestones are dateless (`Founded in Nairobi`, `Institutional work deepened`). | A milestone without a date is an adjective. McKinsey-tier sites cite years. | Either add years (`Founded · 2018`, `Public-sector practice · 2021`) or rename the block "Practice areas". |
| 9 | **P2** | The phrase "AI workflows" appears ~5 times across the site. | Repetition of a current-moment phrase dates the page. | Substitute one or two occurrences with concrete instances (`automated reporting`, `decision-support workflows`). |
| 10 | **P2** | The disciplines list is enumerated in three different places (hero description, home grid, services page). | Repetition reads as filler. | Keep the list authoritative on the Services page; have the home page link to it rather than repeating it. |

### 15.4 Premium UX guidelines

1. **Density floor, not ceiling.** Sections size to content; we never pack the page. Empty space is paid-for.
2. **One verb per CTA, one CTA per section.** "Book an introduction" beats "Schedule a complimentary discovery consultation".
3. **Named proof beats adjective proof.** Replace any "leading", "world-class", "innovative" with a client name, a number, or a date.
4. **The page is read top to bottom once.** No flyouts, no mega-menus, no carousels, no on-load modals. The visitor never has to *navigate* to be persuaded.
5. **Trust signal hierarchy:** proposition → named outcome → wordmarks → case study → CTA. If a section does not advance one of those five, it is removed.
6. **Mobile is editorial too.** Display-1 must remain legible at 360 px; CTAs are full-width below 640 px; tap targets ≥ 44 × 44 px.

### 15.5 Concrete implementation tasks

These are the next-pass commits, ranked. They derive directly from §15.3.

1. Delete `--statsspeak-navy`, `--statsspeak-blue`, `--statsspeak-teal` from [src/index.css](src/index.css) and the corresponding `--color-statsspeak-*` entries in `@theme inline`. Grep the codebase for `statsspeak-` colour usages and migrate to `--ink` / `--marine`.
2. Audit all page headlines and section heads — replace any raw size utility (`text-5xl`, `text-4xl`, `text-3xl`) with the `text-display-*` / `text-h*` tokens.
3. Demote home `disciplines` grid card titles from `text-h2` to `text-h3`.
4. Standardise outgoing-link arrows: lucide `ArrowRight` 16 px, inline with text. Remove `→` glyph strings.
5. Add the `.logo-monochrome` utility and refactor [HomePage.tsx:91](src/components/HomePage.tsx#L91) to use it.
6. Revisit About copy per §15.3 issues 7 and 8.

---

_Last revised: 2026-05-28 — added §6.7 (hero canvas carve-out), §9.5 (brand-mark casing), §15 (premium positioning audit), CTA sentence-case rule; revised §9.1 headline guidance and §13.2 P5 hero migration item to reflect the constellation direction; raised §6.7 visibility caps after the hero canvas read as invisible against the scrim; rewrote §6.7 to cover two permitted canvas forms (Form A noise-displaced wireframe icosahedron, Form B sparse constellation) after evaluating an external generative-art hero component. This document supersedes every prior styling decision in the codebase. Where this document and the code disagree, the document is correct and the code is a bug._
