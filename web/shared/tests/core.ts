import type { LitElement } from 'lit'
import type * as YCoreElements from '~shared/constants'
import type { TValueOf } from '~shared/types/utils'
import type { TCoreTagName } from '../utils/components'

export type TCoreComponent = HTMLElementTagNameMap[TValueOf<typeof YCoreElements>]
export type TCoreElement = TCoreComponent & LitElement

/**
 * Рендеринг слотов в компонент
 * @param component - WebComponent
 * @param slots - Слоты
 */
const renderSlots = (
  component: TCoreElement,
  slots?: Record<string, string>,
) => {
  if (!slots) return

  for (const [
    slotName,
    slotValue,
  ] of Object.entries(slots)) {
    if (slotName === 'default') {
      component.appendChild(document.createTextNode(slotValue))
    } else {
      const slotElement = document.createElement('div')
      slotElement.slot = slotName
      slotElement.innerHTML = slotValue

      component.appendChild(slotElement)
    }
  }
}

/**
 * Сброс слотов в компонент
 * @param component - Компонент
 */
const resetSlots = (component: TCoreElement) => {
  component.innerHTML = ''
}

/**
 * Рендеринг пропсов в компонент
 * @param component - Компонент
 * @param props - Пропсы
 */
const renderProps = (
  component: TCoreElement,
  props?: Partial<TCoreComponent>,
) => {
  if (!props) return

  Object.assign(
    component,
    props,
  )
}

/**
 * Сброс пропсов в компонент по умолчанию
 * @param component - Компонент
 * @param defaultProps - Пропсы по умолчанию
 */
const resetProps = (
  component: TCoreElement,
  defaultProps?: Partial<TCoreComponent>,
) => {
  Object.assign(
    component,
    defaultProps ?? {},
  )
}

/**
 * Создание нового компонента
 * @param slots - Слоты
 * @param props - Пропсы
 * @returns {TCoreComponent} - Созданный компонент
 */
export const createComponent = (
  tagName: TValueOf<typeof YCoreElements>,
  { slots, props }: {
    slots?: Record<string, string>
    props?: Partial<TCoreComponent>
  } = {},
) => {
  const component = document.createElement(tagName)

  renderSlots(
    component,
    slots,
  )
  renderProps(
    component,
    props,
  )

  return component
}

/**
 * Хелпер для тестирования WebComponent.
 * @param tagName - Имя WebComponent.
 * @param defaultProps - Пропсы по умолчанию.
 * @returns {
 *  component: HTMLElementTagNameMap[T] & LitElement,
 *  updateComponent: (args: { slots?: Record<string, string>, props?: Partial<HTMLElementTagNameMap[T]> }) => Promise<void>,
 *  resetComponent: () => Promise<void>,
 *  injectComponentToBody: () => void,
 *  removeComponent: () => void,
 * } Объект с компонентом, функцией обновления, сброса, вставки в DOM и удаления.
 */
export const useCoreTests = <T extends keyof TCoreTagName>(
  tagName: T,
  defaultProps?: Partial<HTMLElementTagNameMap[T]>,
) => {
  const component = document.createElement(tagName)

  /**
   * Обновление компонента
   * @param component - Компонент
   * @param slots - Слоты
   * @param props - Пропсы
   */
  const updateComponent = async({ slots, props }: {
    slots?: Record<string, string>
    props?: Partial<HTMLElementTagNameMap[T]>
  }) => {
    renderSlots(
      component,
      slots,
    )
    renderProps(
      component,
      props,
    )

    await component.updateComplete
  }

  /**
   * Сброс компонента
   */
  const resetComponent = async() => {
    resetSlots(component)
    resetProps(
      component,
      defaultProps,
    )

    await component.updateComplete
  }

  /**
   * Вставка компонента в DOM
   */
  const injectComponentToBody = () => {
    document.body.appendChild(component)
  }

  /**
   * Удаление компонента из DOM
   */
  const removeComponent = () => {
    component.remove()
  }

  return {
    component,
    updateComponent,
    resetComponent,
    injectComponentToBody,
    removeComponent,
  }
}
