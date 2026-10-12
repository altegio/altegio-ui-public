import { html, nothing } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'

import {
  type IYCoreErrorProps,
} from '~core/ui/error/models/types'

import '~core/ui/error'

export interface IRenderErrorOptions extends Partial<IYCoreErrorProps> {
  className?: string
}

/**
 * Опции для рендеринга ошибки
 * @interface IRenderErrorOptions
 */
export default ({ className, ...props }: IRenderErrorOptions) => {
  if (!props.errors?.length) return nothing

  return html`
    <y-core-error
      .errors=${props.errors}
      .locator=${props.locator}
      class=${ifDefined(className)}
    ></y-core-error>
  `
}
