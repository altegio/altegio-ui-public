import { html, nothing } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'

import {
  type IAltCoreAnnotationProps,
} from '~core/ui/annotation/models/types'

import '~core/ui/annotation'

export interface IRenderAnnotationOptions extends Partial<IAltCoreAnnotationProps> {
  className?: string
  hideClassName?: string
  handleSlotAnnotationChange?: (event: Event) => void
}

/**
 * Options for rendering an annotation
 * @interface IRenderAnnotationOptions
 */
export default ({ className, handleSlotAnnotationChange, ...props }: IRenderAnnotationOptions) => {
  return html`
    <alt-core-annotation
      .text=${props.text}
      .disabled=${props.disabled}
      class=${ifDefined(className)}
    >
      ${props.text
        ? nothing
        : html`
          <slot
            slot="annotation"
            name="annotation"
            @slotchange=${handleSlotAnnotationChange}
          ></slot>
        `
      }
    </alt-core-annotation>
  `
}
