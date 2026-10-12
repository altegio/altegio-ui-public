import { html, nothing } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'

import {
  type IYCoreLabelProps,
} from '~core/ui/label/models/types'

import { EYCoreTextSize, EYCoreTextVariant } from '~core/ui/text/models/types/external'

import '~core/ui/label'

export interface IRenderLabelOptions extends Partial<IYCoreLabelProps> {
  className?: string
  handleClick?: (event: Event) => void
  handleMouseDown?: (event: Event) => void
}

/**
 * Опции для рендеринга лейбла
 * @interface IRenderLabelOptions
 */
export default ({ className, handleClick, handleMouseDown, ...props }: IRenderLabelOptions) => {
  if (!props.text) return nothing

  return html`
    <y-core-label
      .text=${props.text}
      .tooltipText=${props.tooltipText}
      .debounce=${props.debounce}
      .size=${props.size || EYCoreTextSize.A2_REGULAR}
      .variant=${props.variant || EYCoreTextVariant.SECONDARY}
      .tooltipActive=${props.tooltipActive}
      .required=${props.required}
      .disabled=${props.disabled}
      .locator=${props.locator}
      class=${ifDefined(className)}
      @click=${handleClick}
      @mousedown=${handleMouseDown}
    ></y-core-label>
  `
}
