import type { TValueOf } from '~shared/types/utils'
import type * as YCoreElements from '~shared/constants'

export type TCoreTagName = Record<TValueOf<typeof YCoreElements>, HTMLElement>

export const defineCustomElement = (
  tagName: keyof TCoreTagName,
  component: CustomElementConstructor,
) => {
  if (!customElements.get(tagName)) {
    customElements.define(tagName, component)
  }
}
