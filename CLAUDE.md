# @sonnyhuynh/ui

Design system code for sonnyhuynh.dev apps. The visual source of truth is the design system artifact:
https://claude.ai/artifact/UPMtNR95M2YJQ8PCsRdHaE — read its `project/README.md` and `project/tokens.json` (Artifact tool) before changing tokens or components, and keep the two in sync: a token or component change here should be mirrored there, and vice versa.

- `src/tokens.css`: CSS custom properties (light default, dark under `[data-theme="dark"]`, `[data-app="photos"]`). Values must match the artifact's `tokens.json`.
- `src/styles.css`: Tailwind v4 entry. Clears the default palette and type scale; only system tokens exist as utilities (`bg-sage`, `text-meta`, `font-mono`…). Spacing keeps the 4px base.
- `src/components/*.tsx`: SiteNav, Button, Link, Tag, Card, ThemeToggle. Styled with Tailwind utilities; `styles.css` `@source`s this folder so consuming apps generate the classes.
- `src/theme.ts`: theme cookie helpers and `themeScript` (inline in each app's `<head>` so a saved dark choice applies before first paint). Light is the default; the device setting is ignored. Dark mode keeps the palette's hues as deep fills with light `on-accent` text.
- Shipped as TypeScript source (no build step); consuming Vite apps compile it. `npm run typecheck` before committing.
- Separate content with tonal layers, not lines: `surface-muted` (lowest) → `bg` → `surface` (highest). No rules under headings, between sections or around cards; borders only on controls that need an edge (secondary Button, inputs, the app switcher, floating menus).
- Rules: no colors or sizes outside the tokens, square corners except controls (`rounded-sm`) and dots (`rounded-full`), mono for labels/metadata, sans for prose, one primary Button per view.
