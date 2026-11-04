/**
 * Axe rules that a story still fails, by story id. Stories.a11y.test.ts also rejects stale entries.
 * Active text/status labels now use accessible foreground roles. Native disabled controls retain
 * tertiary colors, which are exempt from WCAG contrast; informational tag labels remain readable.
 */
export const knownViolations: Partial<Record<string, string[]>> = {}
