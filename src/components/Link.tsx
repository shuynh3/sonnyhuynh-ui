import type { AnchorHTMLAttributes } from 'react';
import { cx, focusRing } from '../cx';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Opens in a new tab and appends an arrow. */
  external?: boolean;
  /** ink-muted instead of accent; for footers and metadata. */
  muted?: boolean;
}

export function Link({ external, muted, className, children, ...props }: LinkProps) {
  return (
    <a
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
      className={cx(
        'underline decoration-1 underline-offset-3 hover:decoration-2 rounded-sm',
        muted ? 'text-ink-muted hover:text-ink' : 'text-accent hover:text-accent-strong',
        focusRing,
        className,
      )}
    >
      {children}
      {external && (
        <>
          <span aria-hidden="true" className="ml-0.5 inline-block text-[0.85em] no-underline">
            ↗
          </span>
          <span className="sr-only"> (opens in a new tab)</span>
        </>
      )}
    </a>
  );
}
