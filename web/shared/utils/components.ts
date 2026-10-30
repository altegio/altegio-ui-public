import type { TValueOf } from '~shared/types/utils'
import type * as AltCoreElements from '~shared/constants'

export type TCoreTagName = Record<TValueOf<typeof AltCoreElements>, HTMLElement>

export const defineCustomElement = (
  tagName: keyof TCoreTagName,
  component: CustomElementConstructor,
) => {
  if (!customElements.get(tagName)) {
    customElements.define(tagName, component)
  }
}
