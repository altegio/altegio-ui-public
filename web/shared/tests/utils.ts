import type { TPropTestCase } from '../types/tests'

type TGeneratePropTestCase = <T, K extends keyof T>(testCasesKey: K, testVariable: T[K], defaultValue?: T[K], calculateExpected?: (value: T[K]) => unknown) => TPropTestCase<T, K>
type TGeneratePropTestCases = <T, K extends keyof T>(testCasesKey: K, testVariablesArray: T[K][], defaultValues?: T, calculateExpected?: (value: T[K]) => unknown) => TPropTestCase<T, K>[]

/**
 * Returns a promise that resolves after the given number of milliseconds
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise<void>} Promise that resolves after the delay
 */
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(
  resolve,
  ms,
))

/**
 * Debug helper that waits until a component settles
 * !!! Use it only while debugging tests
 * @param {string} tagName - Web component tag name
 * @returns {Promise<void>} Promise that resolves once the component has settled
 * @description
 * Waits, in order, for:
 * 1. The web component to be defined in customElements
 * 2. Pending microtasks
 * 3. Pending macrotasks
 * 4. The next animation frame
 */
export const debugWaitForStability = async(tagName: string) => {
  // Wait for the component definition
  await customElements.whenDefined(tagName)
  // Flush microtasks
  await Promise.resolve()
  // Flush macrotasks
  await sleep(0)
  // Wait for the next animation frame
  await new Promise((resolve) => requestAnimationFrame(resolve))
}


/**
 * Builds a class name with a modifier.
 * @param baseClass - Base class name.
 * @param modifier - Modifier.
 * @returns The class name with the modifier.
 */
export const classWithModifier = (baseClass: string, modifier: string) => `${baseClass}_${modifier}`

/**
 * Finds an element by selector inside the component's shadow root.
 * @param component - Component (HTMLElement).
 * @param selector - Element selector.
 * @returns The element or null.
 */
export const getShadowElement = (component: HTMLElement, selector: string) => {
  return component.shadowRoot?.querySelector(selector)
}

/**
 * Returns the component's root element.
 * @param component - Component (HTMLElement).
 * @param baseClass - Base class of the root element.
 * @returns The root element or null.
 */
export const getShadowRootElement = (component: HTMLElement, baseClass: string) => {
  return getShadowElement(
    component,
    `.${baseClass}`,
  )
}

/**
 * Returns the element's class list as an array.
 * @param element - Element.
 * @returns Class names.
 */
export const getElementClasses = (element: Element | null | undefined) => {
  return Array.from(element?.classList ?? [])
}

/**
 * Returns the selectors of all style rules.
 * @param adoptedStyleSheets - Style sheets.
 * @returns Style rule selectors.
 */
export const getStylesSelectors = (adoptedStyleSheets: CSSStyleSheet[]) => Array.from(adoptedStyleSheets)
  .flatMap((sheet) => Array.from(sheet.cssRules))
  .map((rule) => (rule as CSSStyleRule).selectorText)

/**
 * Returns the style rule with the given selector.
 * @param adoptedStyleSheets - Style sheets.
 * @param cssClasses - Rule selector.
 * @returns {CSSStyleRule | undefined} The style rule or undefined.
 */
export const getStyleRule = (adoptedStyleSheets: CSSStyleSheet[], selector: string) => {
  const result = Array.from(adoptedStyleSheets)
    .flatMap((sheet) => Array.from(sheet.cssRules))
    .find((rule) => rule instanceof CSSStyleRule && rule.selectorText === selector) as CSSStyleRule | undefined

  if (!result) {
    // eslint-disable-next-line no-console
    console.log(getStylesSelectors(adoptedStyleSheets))
    throw new Error(`${selector} - not found`)
  }

  return result
}

/**
 * Returns the component's shadow root.
 * @param component - Component (HTMLElement).
 * @returns {ShadowRoot} The shadow root; throws if it is missing.
 */
export const getWCShadowRoot = (component: HTMLElement) => {
  const shadowRoot = component.shadowRoot

  if (!shadowRoot) throw new Error('Shadow root or shadow root element not found')

  return shadowRoot
}

/**
 * Returns the value of a CSS variable declared on :host
 * @param adoptedStyleSheets - Style sheets
 * @param variableName - Variable name
 * @returns Variable value
 */
export const getHostCSSVariableValue = (
  adoptedStyleSheets: CSSStyleSheet[],
  variableName: string,
  hostSelector = ':host',
): string => {
  const hostRule = Array.from(adoptedStyleSheets)
    .flatMap((sheet) => Array.from(sheet.cssRules))
    .find((rule) => rule instanceof CSSStyleRule && rule.selectorText === hostSelector) as CSSStyleRule | undefined

  if (!hostRule) {
    throw new Error('Host rule not found')
  }

  return hostRule.style.getPropertyValue(variableName).trim()
}

/**
 * Creates an event and dispatches it on the given DOM node.
 * @param node - DOM node to dispatch the event on
 * @param eventName - Event name
 * @param eventInitDetails - Event init options
 */
export const dispatchEvent = (node: Node, eventName: string, eventInitDetails: EventInit) => {
  const event = new Event(
    eventName,
    eventInitDetails,
  )

  node.dispatchEvent(event)
}

export const trimTextContent = (value: string | null | undefined): string | undefined => {
  return typeof value === 'string' ? value.trim() : undefined
}

/**
 * Builds a test case for a component property.
 * @template T - Object with the properties under test
 * @template K - Property key (a key of T)
 * @param {K} testCaseKey - Test case key (property name)
 * @param {T[K]} testCaseValue - Value to test
 * @param {T[K]} [defaultValue] - Default value
 * @param {(value: T[K]) => unknown} [calculateExpected] - Computes the expected value
 * @returns {Object} Test case parameters
 */
const generatePropTestCase: TGeneratePropTestCase = (testCaseKey, testCaseValue, defaultValue, calculateExpected) => {
  let expected: unknown = testCaseValue ?? defaultValue

  if (calculateExpected instanceof Function) {
    expected = calculateExpected(testCaseValue)
  }

  return {
    prop: testCaseKey,
    case: `${String(testCaseKey)}:${String(testCaseValue)}`,
    value: testCaseValue,
    expected,
  }
}

/**
 * Builds test cases for a component property.
 * @template T - Object with the properties under test
 * @template K - Property key (a key of T)
 * @param {K} testCasesKey - Test case key (property name)
 * @param {T[K][]} testVariablesArray - Values to test
 * @param {T} [defaultValues] - Default values
 * @param {(value: T[K]) => unknown} [calculateExpected] - Computes the expected value
 * @returns {TPropTestCase<T, K>[]} Test case parameters
 */
export const generatePropTestCases: TGeneratePropTestCases = (testCasesKey, testVariablesArray, defaultValues, calculateExpected) => {
  return testVariablesArray.map((testCaseValue) => generatePropTestCase(
    testCasesKey,
    testCaseValue,
    defaultValues?.[testCasesKey],
    calculateExpected,
  ))
}
