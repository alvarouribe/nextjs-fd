'use client';

import { useEffect, useRef, useState } from 'react';
import type { ElementType, ReactNode, Ref } from 'react';
import type { CSSProperties } from 'react';

interface RevealStyle extends CSSProperties {
  '--reveal-index'?: number;
  '--reveal-step'?: string;
}

interface UseRevealResult<T extends HTMLElement> {
  ref: Ref<T>;
  className: string;
  style: RevealStyle;
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function useReveal<T extends HTMLElement = HTMLDivElement>(
  index = 0,
  step?: number
): UseRevealResult<T> {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(prefersReducedMotion);

  useEffect(() => {
    if (isVisible) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -12% 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const style: RevealStyle = { '--reveal-index': index };
  if (step !== undefined) style['--reveal-step'] = `${step}ms`;

  return {
    ref,
    className: isVisible ? 'reveal is-visible' : 'reveal',
    style,
  };
}

interface RevealProps {
  as?: ElementType;
  index?: number;
  step?: number;
  className?: string;
  children?: ReactNode;
  [key: string]: unknown;
}

export default function Reveal({
  as = 'div',
  index = 0,
  step,
  className,
  children,
  ...rest
}: RevealProps) {
  const { ref, className: revealClassName, style } = useReveal<HTMLElement>(
    index,
    step
  );
  const Component = as as ElementType;

  return (
    <Component
      ref={ref}
      className={[revealClassName, className].filter(Boolean).join(' ')}
      style={style}
      {...rest}
    >
      {children}
    </Component>
  );
}
