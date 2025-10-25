# IterativAnalytics Design Theme

> The visual identity and experience guidelines that make IterativAnalytics feel cohesive, recognizable, and trusted.

---

## Brand Essence

- **Positioning**: Africa-first analytics platform that is fast, actionable, and human.
- **Personality**: Confident, warm, pragmatic, and transparent.
- **Attributes**: Reliable, insightful, inclusive, efficient.

Use this theme to drive consistent decisions across UI, marketing, and product experiences.

---

## Theme Principles (applied)

- **Clarity over decoration**: Minimal, spacious, purposeful.
- **Warm modernism**: Neutral bases with warm accents inspired by African palettes.
- **Actionable by design**: Emphasize insights and next steps visually.
- **Performance-aware**: Choices work on low bandwidth and older devices.
- **Inclusive by default**: Color, type, motion respect accessibility.

---

## Color System

Use semantic tokens. Never reference raw hex in components. Dark mode adjusts automatically.

### Core Palette

- **Background**: `--bg`  (#0C0E12 dark / #0F1115 light-inverse baseline)
- **Surface**: `--surface`  (#111318 dark / #FFFFFF light)
- **Muted**: `--muted`  (#171A20 dark / #F4F6F8 light)
- **Border**: `--border`  (#2A2F3A dark / #E5E7EB light)
- **Foreground**: `--fg`  (#E6E8EA dark / #111827 light)

### Brand & Accents

- **Primary**: `--primary`  (#2E7DFF)  Confident blue for actions and highlights
- **Primary/fg**: `--primary-fg`  (#FFFFFF)
- **Success**: `--success`  (#10B981)
- **Warning**: `--warning`  (#F59E0B)
- **Destructive**: `--destructive`  (#EF4444)
- **Info**: `--info`  (#3B82F6)
- **Accent (Warm)**: `--accent`  (#D97706) Subtle warm accent for emphasis

### States

- **Focus ring**: `--focus`  (#2563EB at 40% alpha)
- **Selection**: `--selection`  (primary at 12% alpha)
- **Overlay**: `--overlay`  (black at 60% in dark, 40% in light)

### Dark Mode Mapping

- Preserve contrast ≥ 4.5:1 for text. Increase border contrast by 10–15% vs light.
- Reduce saturation for large surfaces in dark to avoid glare.

---

## Typography

Prioritize legibility and density control. Use system fallbacks.

- **Display/Brand**: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Noto Sans
- **Numeric**: Tabular lining via `font-variant-numeric: tabular-nums;`

### Scale

- **Display**: 40/48/56
- **Heading**: 32, 24, 20
- **Body**: 16 (primary), 14 (secondary)
- **Small**: 12 for dense metadata

### Weights

- 600 for headings, 500 for interactive labels, 400 for body

### Line Heights

- Display 1.1, Heading 1.2, Body 1.5, Small 1.45

---

## Spacing, Radius, Elevation

### Spacing (8px base)

- 4, 8, 12, 16, 20, 24, 32, 40, 48, 64

### Radius

- **xs** 4
- **sm** 6
- **md** 10 (default)
- **lg** 14
- **full** 9999

### Elevation (Shadow tokens)

- **e0** none
- **e1** 0 1px 2px rgba(0,0,0,0.06)
- **e2** 0 2px 6px rgba(0,0,0,0.08)
- **e3** 0 6px 16px rgba(0,0,0,0.10)
- Use blur not spread in dark mode; avoid colored shadows.

---

## Layout & Density

- **Grid**: 4/8px physical rhythm, 12-column on desktop, 4-column on mobile.
- **Content max-width**: 1200px for long-form; dashboards are fluid with guard rails.
- **Density**: Default comfortable. Provide a compact mode (-2 to -4px vertical trims, 12px type). 

---

## Data Visualization Theme

Designed for clarity on mobile and low-contrast environments.

### Categorical Palette (10)

1. #2E7DFF  
2. #10B981  
3. #F59E0B  
4. #EF4444  
5. #8B5CF6  
6. #14B8A6  
7. #F43F5E  
8. #22C55E  
9. #0EA5E9  
10. #D97706

### Sequential (Blue) 5

- #E9F2FF → #D1E4FF → #A8C9FF → #5FA0FF → #2E7DFF

### Diverging (Red–Blue) 7

- #EF4444 → #F87171 → #FCA5A5 → #E5E7EB → #93C5FD → #60A5FA → #3B82F6

### Chart Rules

- 12px min tick size on mobile.
- Gridlines subtle (border color at 30% opacity). 
- Emphasize current period or target with thicker stroke (2.5–3px).
- Never rely on color alone; include markers, patterns, or labels.

---

## Motion

- **Purposeful, low-cost**: Communicate state changes and hierarchy.
- **Durations**: 120–200ms small, 200–280ms medium, 320ms entrance.
- **Easing**: `cubic-bezier(0.2, 0.8, 0.2, 1)`; use `ease-out` for entrances.
- **Reduce motion**: Respect `prefers-reduced-motion`, replace with opacity.

---

## Iconography

- Use Lucide set for consistency. Stroke 1.5px, corner radius consistent with UI.
- Size: 16, 20, 24. Pair with 500–600 text for labels.
- Decorative icons have `aria-hidden="true"`. Interactive controls require `aria-label`.

---

## Imagery & Illustration

- Favor real data/product imagery over abstract art.
- When using illustration: geometric, minimal, warm accent splashes; avoid visual noise.
- Optimize: responsive sizes, modern formats (WebP/AVIF), lazy-load.

---

## Tone & Microcopy

- **Voice**: Clear, honest, helpful.
- **Style**: Short sentences. Lead with action. Avoid jargon; define terms inline.
- **Errors**: State what happened, why it matters, how to fix. Offer a primary action.

---

## Accessibility Rules (Theme-level)

- Text contrast ≥ 4.5:1; large text (≥18 semibold / 24 normal) ≥ 3:1.
- Focus visible at all times; 2px ring with 3:1 contrast on both modes.
- Hit targets ≥ 44×44px; minimum 12px text in compact mode.
- Do not encode information using color alone—pair with icon/label/pattern.

---

## Theming Tokens

Expose tokens as CSS variables. Components and Tailwind utilities consume tokens, not raw values.

```css
:root {
  --bg: #FFFFFF;
  --surface: #FFFFFF;
  --muted: #F4F6F8;
  --border: #E5E7EB;
  --fg: #111827;

  --primary: #2E7DFF;
  --primary-fg: #FFFFFF;
  --success: #10B981;
  --warning: #F59E0B;
  --destructive: #EF4444;
  --info: #3B82F6;
  --accent: #D97706;

  --radius-xs: 4px;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;

  --shadow-e1: 0 1px 2px rgba(0,0,0,0.06);
  --shadow-e2: 0 2px 6px rgba(0,0,0,0.08);
  --shadow-e3: 0 6px 16px rgba(0,0,0,0.10);

  --focus: rgba(37, 99, 235, 0.4);
  --selection: rgba(46, 125, 255, 0.12);
}

[data-theme="dark"] {
  --bg: #0F1115;
  --surface: #111318;
  --muted: #171A20;
  --border: #2A2F3A;
  --fg: #E6E8EA;
}
```

### Tailwind Integration (reference)

```ts
// tailwind.config.ts (excerpt)
const tokens = {
  bg: 'var(--bg)',
  surface: 'var(--surface)',
  muted: 'var(--muted)',
  border: 'var(--border)',
  fg: 'var(--fg)',
  primary: 'var(--primary)',
};
export default {
  theme: {
    colors: tokens,
    borderRadius: {
      xs: 'var(--radius-xs)',
      sm: 'var(--radius-sm)',
      md: 'var(--radius-md)',
      lg: 'var(--radius-lg)',
    },
    boxShadow: {
      e1: 'var(--shadow-e1)',
      e2: 'var(--shadow-e2)',
      e3: 'var(--shadow-e3)',
    },
    extend: {
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui'] },
    },
  },
};
```

---

## Component Look & Feel

- **Cards**: Surface, md radius, e1 shadow, 16–24 padding. Title 600, body 400.
- **Buttons**: Primary solid, subtle ghost for secondary; 10px radius; focus ring.
- **Inputs**: 1px border, subtle inner shadow on focus; clear error text below.
- **Badges**: Use semantic colors; keep saturation low in dark mode.
- **Navigation**: Sticky top on mobile with large tappable areas; breadcrumbs on desktop.

---

## Dark Mode Specifics

- Increase text weight by +100 where helpful for readability.
- Lower surface luminance; prefer outlines to fills for separators.
- Elevation uses y-blur not spread; avoid bright glows.

---

## Content Patterns

- Lead with key insight; place action on the same row.
- Use progressive disclosure for dense details.
- Provide inline definitions for metrics (tooltip or help icon).

---

## Governance

- Proposals that change tokens or palettes require a short ADR with rationale, contrast checks, and screenshots in light/dark.
- Quarterly theme review aligned with Design Principles updates.

---

## Resources

- See `DESIGN_PRINCIPLES.md` for decision values and trade-offs.
- See `DESIGN_SYSTEM.md` for component APIs and usage.
- See `DESIGN_SYSTEM_QUICKREF.md` for quick tokens and patterns.

---

Last updated: October 2025
Maintainer: Design System Team
