import { html, nothing } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import type { IYCoreTagProps } from '~core/ui/tag/models/types'

import '~core/ui/tag'

export interface IRenderTagOptions extends Partial<IYCoreTagProps> {
  text?: string
  className?: string
}

/**
 * Опции для рендеринга тега
 * @interface IRenderTagOptions
 */
export default ({ text, className, ...props }: IRenderTagOptions) => {
  if (text || props.iconLeft) {
    return html`
      <y-core-tag
        .size=${props.size}
        .variant=${props.variant}
        .iconLeft=${props.iconLeft}
        .disabled=${props.disabled}
        class=${ifDefined(className)}
      >
        ${text}
      </y-core-tag>`
  }

  return nothing
}
