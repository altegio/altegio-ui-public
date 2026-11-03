import { html, nothing } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'

import {
  type IAltCoreLabelProps,
} from '~core/ui/label/models/types'

import { EAltCoreTextSize, EAltCoreTextVariant } from '~core/ui/text/models/types/external'

import '~core/ui/label'

export interface IRenderLabelOptions extends Partial<IAltCoreLabelProps> {
  className?: string
  handleClick?: (event: Event) => void
  handleMouseDown?: (event: Event) => void
}

/**
 * Options for rendering a label
 * @interface IRenderLabelOptions
 */
export default ({ className, handleClick, handleMouseDown, ...props }: IRenderLabelOptions) => {
  if (!props.text) return nothing

  return html`
    <alt-core-label
      .text=${props.text}
      .tooltipText=${props.tooltipText}
      .debounce=${props.debounce}
      .size=${props.size || EAltCoreTextSize.A2_REGULAR}
      .variant=${props.variant || EAltCoreTextVariant.SECONDARY}
      .tooltipActive=${props.tooltipActive}
      .required=${props.required}
      .disabled=${props.disabled}
      .locator=${props.locator}
      class=${ifDefined(className)}
      @click=${handleClick}
      @mousedown=${handleMouseDown}
    ></alt-core-label>
  `
}
