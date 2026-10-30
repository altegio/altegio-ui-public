import { html, nothing } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import type { IAltCoreTagProps } from '~core/ui/tag/models/types'

import '~core/ui/tag'

export interface IRenderTagOptions extends Partial<IAltCoreTagProps> {
  text?: string
  className?: string
}

/**
 * Options for rendering a tag
 * @interface IRenderTagOptions
 */
export default ({ text, className, ...props }: IRenderTagOptions) => {
  if (text || props.iconLeft) {
    return html`
      <alt-core-tag
        .size=${props.size}
        .variant=${props.variant}
        .iconLeft=${props.iconLeft}
        .disabled=${props.disabled}
        class=${ifDefined(className)}
      >
        ${text}
      </alt-core-tag>`
  }

  return nothing
}
