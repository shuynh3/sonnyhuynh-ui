# fonts

Put the self-hosted DejaVu Sans Mono files here:

- `DejaVuSansMono.woff2` (regular, 400)
- `DejaVuSansMono-Bold.woff2` (bold, 700) — optional; the system uses 400 only

They aren't on npm/Fontsource. Get them from the DejaVu fonts release (Bitstream Vera / DejaVu license allows self-hosting) and convert the `.ttf` to `.woff2` if needed. Then uncomment the `@font-face` block at the top of `src/tokens.css`.

Until then the mono stack falls back to Menlo/Monaco on Apple devices and `ui-monospace` elsewhere.
