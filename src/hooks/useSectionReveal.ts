import { useEffect } from 'react';
import type { RefObject } from 'react';

// Content starts visible. Animate only intersecting sections; unsupported APIs
// or initialization failures leave the document readable.
export default function useSectionReveal(
  root: RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  useEffect(() => {
    if (!enabled || !root.current || typeof IntersectionObserver === 'undefined') return;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches) return;

    const animations = new Set<Animation>();
    let observer: IntersectionObserver | undefined;

    function restore() {
      observer?.disconnect();
      animations.forEach(animation => animation.cancel());
      animations.clear();
    }

    try {
      observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer?.unobserve(entry.target);
          if (motion.matches || !(entry.target instanceof HTMLElement)) continue;
          try {
            const animation = entry.target.animate(
              [
                { opacity: .15, transform: 'translateY(12px)' },
                { opacity: 1, transform: 'translateY(0)' },
              ],
              { duration: 400, easing: 'ease-out' },
            );
            animations.add(animation);
            animation.onfinish = () => animations.delete(animation);
            animation.oncancel = () => animations.delete(animation);
          } catch {
            // Native animation is optional; the base styles are already visible.
          }
        }
      }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });

      root.current.querySelectorAll(':scope > .content-section').forEach(section => observer?.observe(section));
      motion.addEventListener('change', restore);
    } catch {
      restore();
    }

    return () => {
      restore();
      motion.removeEventListener('change', restore);
    };
  }, [root, enabled]);
}