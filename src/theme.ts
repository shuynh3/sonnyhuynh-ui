export type Theme = 'light' | 'dark';

const COOKIE = 'theme';
const ONE_YEAR = 60 * 60 * 24 * 365;

/** The visitor's saved choice, or null if they haven't picked one (light is the default). */
export function readTheme(): Theme | null {
  const match = document.cookie.match(/(?:^|; )theme=(light|dark)/);
  return match ? (match[1] as Theme) : null;
}

/** The theme currently on screen. */
export function currentTheme(): Theme {
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'light' || attr === 'dark') return attr;
  return readTheme() ?? 'light';
}

/**
 * Applies a theme and remembers it. The cookie is scoped to .sonnyhuynh.dev so a choice on
 * one subdomain carries to the others; on localhost it stays host-only.
 */
export function setTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
  const domain = /(^|\.)sonnyhuynh\.dev$/.test(location.hostname) ? '; domain=.sonnyhuynh.dev' : '';
  document.cookie = `${COOKIE}=${theme}; path=/; max-age=${ONE_YEAR}; SameSite=Lax${domain}`;
}

/**
 * Inline this in each app's <head>, before any stylesheet, so a saved theme is applied before
 * first paint (no light flash for dark-mode visitors):
 *   <script>/* themeScript *\/</script>
 */
export const themeScript =
  "(function(){var m=document.cookie.match(/(?:^|; )theme=(light|dark)/);if(m)document.documentElement.setAttribute('data-theme',m[1]);})();";
