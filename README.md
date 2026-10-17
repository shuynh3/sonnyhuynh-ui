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

Set `data-theme="light" | "dark"` on `<html>` to force a theme (otherwise it follows the OS), and `data-app="photos"` for the neutral photos accent.

## Fonts

Inter comes from `@fontsource-variable/inter`. DejaVu Sans Mono must be added to `fonts/` by hand — see `fonts/README.md`.
