import { html, nothing } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import type { IAltCoreIconExternalProps } from '~core/ui/icon/models/types'

import '~core/ui/icon'

export interface IRenderIconOptions {
  icon?: IAltCoreIconExternalProps['icon']
  size?: IAltCoreIconExternalProps['size']
  className?: string
}

/**
 * Options for rendering an icon
 * @interface IRenderIconOptions
 * @property {IAltIcon} [icon] - Icon to render
 * @property {string} [size] - Icon size
 * @property {string} [className] - CSS class for the icon
 */
export default ({ icon, size, className }: IRenderIconOptions) => {
  if (!icon) return nothing

  return html`
    <alt-core-icon
      .icon=${icon}
      size=${ifDefined(size)}
      class=${ifDefined(className)}
    >
    </alt-core-icon>`
}
