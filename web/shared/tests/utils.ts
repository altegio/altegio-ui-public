import type { TPropTestCase } from '../types/tests'

type TGeneratePropTestCase = <T, K extends keyof T>(testCasesKey: K, testVariable: T[K], defaultValue?: T[K], calculateExpected?: (value: T[K]) => unknown) => TPropTestCase<T, K>
type TGeneratePropTestCases = <T, K extends keyof T>(testCasesKey: K, testVariablesArray: T[K][], defaultValues?: T, calculateExpected?: (value: T[K]) => unknown) => TPropTestCase<T, K>[]

/**
 * Создает промис, который резолвится через указанное количество миллисекунд
 * @param {number} ms - Количество миллисекунд для ожидания
 * @returns {Promise<void>} Промис, который резолвится после указанной задержки
 */
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(
  resolve,
  ms,
))

/**
 * Дебаг утилита для ожидания стабилизации компонента
 * !!! Должна использоваться только для отладки тестов
 * @param {string} tagName - Имя тега веб-компонента
 * @returns {Promise<void>} Промис, который резолвится после стабилизации компонента
 * @description
 * Функция последовательно ожидает:
 * 1. Определение веб-компонента в customElements
 * 2. Выполнение всех микротасков
 * 3. Выполнение всех макротасков
 * 4. Завершение следующего фрейма рендеринга
 */
export const debugWaitForStability = async(tagName: string) => {
  // Ждем определения компонента
  await customElements.whenDefined(tagName)
  // Ждем микротаски
  await Promise.resolve()
  // Ждем макротаски
  await sleep(0)
  // Ждем фрейм рендеринга
  await new Promise((resolve) => requestAnimationFrame(resolve))
}


/**
 * Создает класс с модификатором.
 * @param baseClass - Базовый класс.
 * @param modifier - Модификатор.
 * @returns Строка с классом и модификатором.
 */
export const classWithModifier = (baseClass: string, modifier: string) => `${baseClass}_${modifier}`

/**
 * Возвращает элемент по селектору внутри компонента.
 * @param component - Компонент (HTMLElement).
 * @param selector - Селектор элемента.
 * @returns Элемент или null.
 */
export const getShadowElement = (component: HTMLElement, selector: string) => {
  return component.shadowRoot?.querySelector(selector)
}

/**
 * Возвращает корневой элемент компонента.
 * @param component - Компонент (HTMLElement).
 * @param baseClass - Базовый класс корневого элемента.
 * @returns Корневой элемент или null.
 */
export const getShadowRootElement = (component: HTMLElement, baseClass: string) => {
  return getShadowElement(
    component,
    `.${baseClass}`,
  )
}

/**
 * Возвращает массив классов элемента.
 * @param element - Элемент.
 * @returns Массив классов.
 */
export const getElementClasses = (element: Element | null | undefined) => {
  return Array.from(element?.classList ?? [])
}

/**
 * Возвращает массив селекторов стилей.
 * @param adoptedStyleSheets - Массив стилевых таблиц.
 * @returns Массив селекторов стилей.
 */
export const getStylesSelectors = (adoptedStyleSheets: CSSStyleSheet[]) => Array.from(adoptedStyleSheets)
  .flatMap((sheet) => Array.from(sheet.cssRules))
  .map((rule) => (rule as CSSStyleRule).selectorText)

/**
 * Возвращает правило стиля по селектору.
 * @param adoptedStyleSheets - Массив стилевых таблиц.
 * @param cssClasses - Селекторы стиля.
 * @returns {CSSStyleRule | undefined} Правило стиля или undefined.
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
 * Возвращает корневой элемент компонента.
 * @param component - Компонент (HTMLElement).
 * @returns {ShadowRoot} Корневой элемент или ошибку.
 */
export const getWCShadowRoot = (component: HTMLElement) => {
  const shadowRoot = component.shadowRoot

  if (!shadowRoot) throw new Error('Shadow root or shadow root element not found')

  return shadowRoot
}

/**
 * Возвращает значение Host CSS переменной
 * @param adoptedStyleSheets - Массив стилевых таблиц
 * @param variableName - Имя переменной
 * @returns Значение переменной
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
 * Создает и отправляет событие на указанный узел DOM.
 * @param node - DOM-узел, на котором будет отправлено событие
 * @param eventName - Имя события
 * @param eventInitDetails - Объект с настройками события
 */
export const dispatchEvent = (node: Node, eventName: string, eventInitDetails: EventInit) => {
  const event = new Event(
    eventName,
    eventInitDetails,
  )

  node.dispatchEvent(event)
}

/**
 * Генерирует тестовый случай для свойства компонента.
 * @template T - Тип объекта с тестируемыми свойствами
 * @template K - Тип ключа свойства (должен быть ключом T)
 * @param {K} testCaseKey - Ключ тестового случая (имя свойства)
 * @param {T[K]} testCaseValue - Значение для тестирования
 * @param {T[K]} [defaultValue] - Значение по умолчанию
 * @param {(value: T[K]) => unknown} [calculateExpected] - Функция для вычисления ожидаемого значения
 * @returns {Object} Объект с параметрами тестового случая
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
 * Генерирует массив тестовых случаев для свойства компонента.
 * @template T - Тип объекта с тестируемыми свойствами
 * @template K - Тип ключа свойства (должен быть ключом T)
 * @param {K} testCasesKey - Ключ тестового случая (имя свойства)
 * @param {T[K][]} testVariablesArray - Массив значений для тестирования
 * @param {T} [defaultValues] - Объект со значениями по умолчанию
 * @param {(value: T[K]) => unknown} [calculateExpected] - Функция для вычисления ожидаемого значения
 * @returns {TPropTestCase<T, K>[]} Массив объектов с параметрами тестовых случаев
 */
export const generatePropTestCases: TGeneratePropTestCases = (testCasesKey, testVariablesArray, defaultValues, calculateExpected) => {
  return testVariablesArray.map((testCaseValue) => generatePropTestCase(
    testCasesKey,
    testCaseValue,
    defaultValues?.[testCasesKey],
    calculateExpected,
  ))
}
