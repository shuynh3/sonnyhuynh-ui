import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { cx, focusRing } from '../cx';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md';

interface Common {
  /** primary: sage fill, at most one per view. secondary (default): outlined. ghost: no border. */
  variant?: Variant;
  size?: Size;
}

export type ButtonProps =
  | (Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })
  | (Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string });

const base =
  'inline-flex items-center justify-center gap-2 rounded-sm border font-sans font-medium no-underline ' +
  'cursor-pointer transition-colors active:translate-y-px';

const variants: Record<Variant, string> = {
  primary: 'bg-sage border-sage text-on-accent hover:bg-pistachio hover:border-accent',
  secondary: 'bg-transparent border-line-strong text-ink hover:bg-accent-subtle',
  ghost: 'bg-transparent border-transparent text-ink hover:bg-accent-subtle',
};

const sizes: Record<Size, string> = {
  md: 'text-small px-4 py-2',
  sm: 'text-[13px] leading-[18px] px-2 py-1',
};

export function Button({ variant = 'secondary', size = 'md', className, ...props }: ButtonProps) {
  const cls = cx(base, variants[variant], sizes[size], focusRing, className);
  if (props.href !== undefined) {
    return <a {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)} className={cls} />;
  }
  const { type = 'button', ...rest } = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return <button type={type} {...rest} className={cls} />;
}
