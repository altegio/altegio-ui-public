import type { LitElement } from 'lit'
import type * as YCoreElements from '~shared/constants'
import type { TValueOf } from '~shared/types/utils'
import type { TCoreTagName } from '../utils/components'

export type TCoreComponent = HTMLElementTagNameMap[TValueOf<typeof YCoreElements>]
export type TCoreElement = TCoreComponent & LitElement

/**
 * Renders slots into the component
 * @param component - Web component
 * @param slots - Slots
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
 * Removes the slots from the component
 * @param component - Component
 */
const resetSlots = (component: TCoreElement) => {
  component.innerHTML = ''
}

/**
 * Applies props to the component
 * @param component - Component
 * @param props - Props
 */
const renderProps = (
  component: TCoreElement,
  props?: Partial<TCoreComponent>,
) => {
  if (!props) return

  // Explicit type arguments: the inferred result, TCoreElement & Partial<TCoreComponent>, is a
  // 75 × 75 = 5,625-member union that costs type-aware lint rules gigabytes of memory.
  Object.assign<TCoreElement, object>(
    component,
    props,
  )
}

/**
 * Resets the component props to their defaults
 * @param component - Component
 * @param defaultProps - Default props
 */
const resetProps = (
  component: TCoreElement,
  defaultProps?: Partial<TCoreComponent>,
) => {
  Object.assign<TCoreElement, object>(
    component,
    defaultProps ?? {},
  )
}

/**
 * Creates a new component
 * @param slots - Slots
 * @param props - Props
 * @returns {TCoreComponent} - The created component
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
 * Test helper for web components.
 * @param tagName - Web component tag name.
 * @param defaultProps - Default props.
 * @returns {
 *  component: HTMLElementTagNameMap[T] & LitElement,
 *  updateComponent: (args: { slots?: Record<string, string>, props?: Partial<HTMLElementTagNameMap[T]> }) => Promise<void>,
 *  resetComponent: () => Promise<void>,
 *  injectComponentToBody: () => void,
 *  removeComponent: () => void,
 * } The component plus helpers to update, reset, mount and remove it.
 */
export const useCoreTests = <T extends keyof TCoreTagName>(
  tagName: T,
  defaultProps?: Partial<HTMLElementTagNameMap[T]>,
) => {
  const component = document.createElement(tagName)

  /**
   * Updates the component
   * @param component - Component
   * @param slots - Slots
   * @param props - Props
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
   * Resets the component
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
   * Mounts the component into the DOM
   */
  const injectComponentToBody = () => {
    document.body.appendChild(component)
  }

  /**
   * Removes the component from the DOM
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
