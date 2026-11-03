import axe from 'axe-core'
import type { ReactiveElement } from 'lit'
import { expect } from 'vitest'

/**
 * Options for the per-pattern accessibility tests. Palette contrast is tracked per story
 * in web/core/src/a11y/knownViolations.ts, so these tests leave it out.
 */
export const PATTERN_AXE_OPTIONS: axe.RunOptions = { rules: { 'color-contrast': { enabled: false } } }

export interface IAxeViolationSummary {
  id: string
  targets: string[]
}

/**
 * Runs axe-core and returns a compact summary of the violations
 * @param context - Element or axe context to check, the whole document by default
 * @param options - axe-core run options
 * @returns {Promise<IAxeViolationSummary[]>} Rule ids with the selectors of the failing nodes
 */
export const getAxeViolations = async(
  context: axe.ElementContext = document,
  options: axe.RunOptions = {},
): Promise<IAxeViolationSummary[]> => {
  const { violations } = await axe.run(
    context,
    {
      resultTypes: ['violations'],
      ...options,
    },
  )

  return violations.map(({ id, nodes }) => ({
    id,
    targets: nodes.map(({ target }) => target.flat().join(' >> ')),
  }))
}

/**
 * Asserts that axe-core finds no violations
 * @param context - Element or axe context to check, the whole document by default
 * @param options - axe-core run options
 */
export const expectNoAxeViolations = async(
  context: axe.ElementContext = document,
  options: axe.RunOptions = {},
) => {
  expect(await getAxeViolations(
    context,
    options,
  )).toEqual([])
}

/**
 * Returns the focused element, following open shadow roots
 * @param root - Document or shadow root to start from
 * @returns {Element | null} The innermost focused element
 */
export const getDeepActiveElement = (root: Document | ShadowRoot = document): Element | null => {
  let active = root.activeElement

  while (active?.shadowRoot?.activeElement) {
    active = active.shadowRoot.activeElement
  }

  return active
}

const collectReactiveElements = (root: Element | ShadowRoot, result: ReactiveElement[] = []) => {
  for (const element of Array.from(root.querySelectorAll('*'))) {
    if ('updateComplete' in element) {
      result.push(element as ReactiveElement)
    }
    if (element.shadowRoot) {
      collectReactiveElements(
        element.shadowRoot,
        result,
      )
    }
  }

  return result
}

/**
 * Waits until every Lit element inside the root, including nested shadow roots, has rendered
 * @param root - Element to wait for
 * @param rounds - How many render rounds to wait: nested components can schedule more updates
 */
export const waitForLitTree = async(root: Element, rounds = 3) => {
  for (let round = 0; round < rounds; round++) {
    await Promise.all(collectReactiveElements(root).map((element) => element.updateComplete))
    await new Promise((resolve) => requestAnimationFrame(resolve))
  }
}
