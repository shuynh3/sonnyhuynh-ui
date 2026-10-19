import type { HTMLAttributes, ReactNode } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { cx, focusRing } from '../cx';

export interface SiteNavItem {
  id: string;
  label: string;
  href: string;
}

export interface SiteNavProps extends HTMLAttributes<HTMLElement> {
  /** id of the app the page belongs to. Shown in the switcher button. */
  current?: string;
  /** Apps listed in the switcher menu. Default: resume, photos, projects. */
  apps?: SiteNavItem[];
  /** This app's own pages. Omit for single-page apps: the second row is not rendered. */
  sections?: SiteNavItem[];
  /** id of the active section. */
  currentSection?: string;
  /** Wordmark text. Default 'sonnyhuynh.dev'. */
  brand?: ReactNode;
  brandHref?: string;
  /** Right-hand slot, e.g. a theme toggle. */
  children?: ReactNode;
}

export const DEFAULT_APPS: SiteNavItem[] = [
  { id: 'resume', label: 'resume', href: 'https://resume.sonnyhuynh.dev' },
  { id: 'photos', label: 'photos', href: 'https://photos.sonnyhuynh.dev' },
  { id: 'projects', label: 'projects', href: 'https://sonnyhuynh.dev/projects' },
];

const itemCls =
  'flex justify-between gap-4 px-4 py-2 text-ink no-underline outline-none cursor-pointer ' +
  'data-highlighted:bg-accent-subtle';

export function SiteNav({
  current,
  apps = DEFAULT_APPS,
  sections,
  currentSection,
  brand = 'sonnyhuynh.dev',
  brandHref = 'https://sonnyhuynh.dev',
  className,
  children,
  ...props
}: SiteNavProps) {
  const currentApp = apps.find((a) => a.id === current);

  return (
    <nav aria-label="Site" {...props} className={cx('sticky top-0 z-40 font-mono text-meta text-ink', className)}>
      <div className="flex items-center justify-between gap-4 bg-surface px-4 py-2 sm:px-8">
        <div className="flex min-w-0 items-center gap-2">
          <a href={brandHref} className={cx('whitespace-nowrap text-ink no-underline rounded-sm', focusRing)}>
            {brand}
          </a>
          <span aria-hidden="true" className="text-ink-muted">
            /
          </span>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger
              className={cx(
                'group inline-flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-sm border border-line-strong',
                'bg-transparent px-2 py-1 font-mono text-meta text-ink hover:bg-accent-subtle data-[state=open]:bg-accent-subtle',
                focusRing,
              )}
            >
              <span>{currentApp?.label ?? 'apps'}</span>
              <span aria-hidden="true" className="leading-none text-ink-muted group-data-[state=open]:rotate-180">
                ▾
              </span>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="start"
                sideOffset={4}
                className="z-50 min-w-[200px] border border-line-strong bg-surface pt-1 font-mono text-meta"
              >
                {apps.map((a) => {
                  const active = a.id === current;
                  return (
                    <DropdownMenu.Item key={a.id} asChild>
                      <a
                        href={a.href}
                        aria-current={active ? 'page' : undefined}
                        className={cx(itemCls, active && 'bg-accent-subtle')}
                      >
                        <span>{a.label}</span>
                        {active && <span aria-hidden="true">✓</span>}
                      </a>
                    </DropdownMenu.Item>
                  );
                })}
                <DropdownMenu.Item asChild>
                  <a href={brandHref} className={cx(itemCls, 'mt-1 bg-surface-muted text-ink-muted')}>
                    sonnyhuynh.dev home
                  </a>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
        {children && <div className="flex items-center gap-2">{children}</div>}
      </div>

      {sections && sections.length > 0 && (
        <ul
          aria-label="Sections"
          className="m-0 flex list-none gap-4 overflow-x-auto bg-surface-muted px-4 py-0 [scrollbar-width:none] sm:gap-8 sm:px-8"
        >
          {sections.map((s) => {
            const active = s.id === currentSection;
            return (
              <li key={s.id}>
                <a
                  href={s.href}
                  aria-current={active ? 'page' : undefined}
                  className={cx(
                    'inline-block whitespace-nowrap border-b-2 pt-2 pb-1.5 no-underline',
                    active ? 'border-accent text-ink' : 'border-transparent text-ink-muted hover:text-ink',
                    focusRing,
                  )}
                >
                  {s.label}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
}
