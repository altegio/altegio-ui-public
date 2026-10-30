import { html, nothing } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'

import {
  type IAltCoreErrorProps,
} from '~core/ui/error/models/types'

import '~core/ui/error'

export interface IRenderErrorOptions extends Partial<IAltCoreErrorProps> {
  className?: string
}

/**
 * Options for rendering an error
 * @interface IRenderErrorOptions
 */
export default ({ className, ...props }: IRenderErrorOptions) => {
  if (!props.errors?.length) return nothing

  return html`
    <alt-core-error
      .errors=${props.errors}
      .locator=${props.locator}
      class=${ifDefined(className)}
    ></alt-core-error>
  `
}
