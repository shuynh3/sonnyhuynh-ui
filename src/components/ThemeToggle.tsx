import { useState, type ButtonHTMLAttributes } from 'react';
import { MoonIcon, SunIcon } from '@primer/octicons-react';
import { cx, focusRing } from '../cx';
import { currentTheme, setTheme, type Theme } from '../theme';

export interface ThemeToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  /** Called with the new theme after a click. */
  onChange?: (theme: Theme) => void;
}

/**
 * Icon button for SiteNav's right-hand slot. Light by default; a click switches theme and
 * saves the choice in a cookie shared across *.sonnyhuynh.dev. Shows the theme you'll
 * switch to: moon in light mode, sun in dark mode.
 */
export function ThemeToggle({ onChange, className, ...props }: ThemeToggleProps) {
  const [theme, setState] = useState<Theme>(() => (typeof document === 'undefined' ? 'light' : currentTheme()));
  const next: Theme = theme === 'dark' ? 'light' : 'dark';
  const Icon = theme === 'dark' ? SunIcon : MoonIcon;

  return (
    <button
      type="button"
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      {...props}
      onClick={() => {
        setTheme(next);
        setState(next);
        onChange?.(next);
      }}
      className={cx(
        'inline-flex size-7 cursor-pointer items-center justify-center rounded-sm border border-line-strong',
        'bg-transparent p-0 text-ink-muted hover:bg-accent-subtle hover:text-ink',
        focusRing,
        className,
      )}
    >
      <Icon size={16} aria-hidden="true" />
    </button>
  );
}
