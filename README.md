# @sonnyhuynh/ui

Tokens, Tailwind v4 theme and shared React components for sonnyhuynh.dev.
Design reference: https://claude.ai/artifact/UPMtNR95M2YJQ8PCsRdHaE

## Use in an app

```bash
npm install ../sonnyhuynh-ui          # local, side by side
# or, once pushed and tagged:
npm install github:shuynh3/sonnyhuynh-ui#v0.1.0
```

```css
/* app CSS */
@import "tailwindcss";
@import "@sonnyhuynh/ui/styles.css";
```

```tsx
import { SiteNav, Button, Link, Tag, Card } from '@sonnyhuynh/ui'
```

When linked locally, the app's Vite config needs `resolve.dedupe: ['react', 'react-dom']` and `server.fs.allow` including this folder (see sonnyhuynh-resume's `vite.config.ts`).

## Theme

Light is the default, regardless of the device setting. `ThemeToggle` switches theme and saves the choice in a `theme` cookie on `.sonnyhuynh.dev` (a cookie rather than localStorage, so it carries across subdomains). Put the toggle in the nav and inline `themeScript` at the top of `<head>` so a saved theme applies before first paint:

```tsx
<SiteNav current="resume"><ThemeToggle /></SiteNav>
```

```html
<script>(function(){var m=document.cookie.match(/(?:^|; )theme=(light|dark)/);if(m)document.documentElement.setAttribute('data-theme',m[1]);})();</script>
```

In dark mode the three greens become deep fills with light `on-accent` text (same hues, not pastels). Set `data-app="photos"` on `<html>` for the neutral photos accent.

## Fonts

Inter comes from `@fontsource-variable/inter`. DejaVu Sans Mono must be added to `fonts/` by hand — see `fonts/README.md`.
