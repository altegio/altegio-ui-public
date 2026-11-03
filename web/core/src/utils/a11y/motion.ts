const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

/**
 * Whether the user asked the operating system to minimize non-essential motion
 * @returns {boolean} True when `prefers-reduced-motion: reduce` matches
 */
export const prefersReducedMotion = (): boolean => typeof window !== 'undefined' && window.matchMedia(REDUCED_MOTION_QUERY).matches

/**
 * Scroll behavior that respects `prefers-reduced-motion`
 * @param {ScrollBehavior} behavior - Behavior to use when motion is allowed
 * @returns {ScrollBehavior} `auto` when the user prefers reduced motion, otherwise the given behavior
 */
export const getScrollBehavior = (behavior: ScrollBehavior = 'smooth'): ScrollBehavior => prefersReducedMotion()
  ? 'auto'
  : behavior
