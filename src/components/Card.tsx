import type { HTMLAttributes, ReactNode } from 'react';
import { cx, focusRing } from '../cx';

export interface CardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title?: ReactNode;
  /** Mono line above the title: dates, stack, EXIF. */
  meta?: ReactNode;
  /** Image URL or a node, shown edge to edge above the body. */
  media?: string | ReactNode;
  mediaAlt?: string;
  /** Row under the text, usually Tags. */
  footer?: ReactNode;
  /** Makes the whole card a link (through the title). */
  href?: string;
}

export function Card({ title, meta, media, mediaAlt = '', footer, href, className, children, ...props }: CardProps) {
  return (
    <article
      {...props}
      className={cx(
        'relative flex flex-col border border-line bg-surface transition-colors',
        href && 'hover:border-line-strong',
        className,
      )}
    >
      {media && (
        <div>{typeof media === 'string' ? <img src={media} alt={mediaAlt} className="block h-auto w-full" /> : media}</div>
      )}
      <div className="flex flex-col gap-2 p-4">
        {meta && <p className="m-0 font-mono text-meta text-ink-muted">{meta}</p>}
        {title && (
          <h3 className="m-0 text-title text-ink">
            {href ? (
              <a
                href={href}
                className={cx(
                  'text-inherit no-underline hover:underline underline-offset-3 after:absolute after:inset-0',
                  focusRing,
                )}
              >
                {title}
              </a>
            ) : (
              title
            )}
          </h3>
        )}
        {children && <div className="text-small text-ink-muted [&_p]:m-0">{children}</div>}
        {footer && <div className="relative z-10 mt-2 flex flex-wrap gap-1">{footer}</div>}
      </div>
    </article>
  );
}
