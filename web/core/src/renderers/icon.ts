import { html, nothing } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import type { IYCoreIconExternalProps } from '~core/ui/icon/models/types'

import '~core/ui/icon'

export interface IRenderIconOptions {
  icon?: IYCoreIconExternalProps['icon']
  size?: IYCoreIconExternalProps['size']
  className?: string
}

/**
 * Опции для рендеринга иконки
 * @interface IRenderIconOptions
 * @property {IYIcon} [icon] - Иконка для отображения
 * @property {string} [size] - Размер иконки
 * @property {string} [className] - CSS класс для иконки
 */
export default ({ icon, size, className }: IRenderIconOptions) => {
  if (!icon) return nothing

  return html`
    <y-core-icon
      .icon=${icon}
      size=${ifDefined(size)}
      class=${ifDefined(className)}
    >
    </y-core-icon>`
}
