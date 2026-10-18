import type { HTMLAttributes } from 'react';
import { cx } from '../cx';

type Tone = 'neutral' | 'sage' | 'pistachio' | 'eucalyptus';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  /** Leading status dot, e.g. for "live". */
  dot?: boolean;
}

const tones: Record<Tone, string> = {
  neutral: 'bg-surface-muted text-ink-muted',
  sage: 'bg-sage text-on-accent',
  pistachio: 'bg-pistachio text-on-accent',
  eucalyptus: 'bg-eucalyptus text-on-accent',
};

export function Tag({ tone = 'neutral', dot, className, children, ...props }: TagProps) {
  return (
    <span
      {...props}
      className={cx(
        'inline-flex items-center gap-1 rounded-sm px-2 py-0.5 font-mono text-meta leading-4',
        tones[tone],
        className,
      )}
    >
      {dot && <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
