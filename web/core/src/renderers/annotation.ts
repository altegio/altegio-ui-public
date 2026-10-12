import { html, nothing } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'

import {
  type IYCoreAnnotationProps,
} from '~core/ui/annotation/models/types'

import '~core/ui/annotation'

export interface IRenderAnnotationOptions extends Partial<IYCoreAnnotationProps> {
  className?: string
  hideClassName?: string
  handleSlotAnnotationChange?: (event: Event) => void
}

/**
 * Опции для рендеринга аннотации
 * @interface IRenderAnnotationOptions
 */
export default ({ className, handleSlotAnnotationChange, ...props }: IRenderAnnotationOptions) => {
  return html`
    <y-core-annotation
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
    </y-core-annotation>
  `
}
