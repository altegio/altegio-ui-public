import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

import {
  ClickIconEmitEvent,
  createCoreSimpleChipProps,
  type IYCoreSimpleChipProps,
} from '~core/ui/simpleChip/models/types'
import {
  YCoreSimpleChipTagName as tagName,
} from '~shared/constants'

import YCoreSimpleChipVarsCss from '~core/ui/simpleChip/css/SimpleChip.vars.css?inline'
import YCoreSimpleChipScopedCss from '~core/ui/simpleChip/css/SimpleChip.scoped.css?inline'

import { bubblingEvent, type TDispatcher } from '~core/utils/event-decorator'
import { renderIcon } from '~core/renderers'
import { yClose } from '~shared/icons'
import { withLocator } from '~core/utils/locator'

const { size, variant, disabled, readonly } = createCoreSimpleChipProps()

@customElement(tagName)
@withLocator(tagName)
export class YCoreSimpleChip extends LitElement implements IYCoreSimpleChipProps {
  @property({ type: String }) size: IYCoreSimpleChipProps['size'] = size
  @property({ type: String }) variant: IYCoreSimpleChipProps['variant'] = variant
  @property({ type: Boolean }) disabled: IYCoreSimpleChipProps['disabled'] = disabled
  @property({ type: Boolean }) readonly: IYCoreSimpleChipProps['readonly'] = readonly

  @bubblingEvent(
    ClickIconEmitEvent,
    { name: 'click-icon' },
  )
  _iconClick!: TDispatcher<ClickIconEmitEvent>

  private readonly baseClass = tagName
  private readonly baseIconClass = `${this.baseClass}__icon`

  static readonly styles = [
    css`
      ${unsafeCSS(YCoreSimpleChipVarsCss)}
      ${unsafeCSS(YCoreSimpleChipScopedCss)}
    `,
  ]

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_size_${this.size}`]: Boolean(this.size),
      [`${this.baseClass}_variant_${this.variant}`]: Boolean(this.variant),
      [`${this.baseClass}_disabled`]: Boolean(this.disabled),
      [`${this.baseClass}_readonly`]: Boolean(this.readonly),
    }
  }

  private handleIconClick = (event: PointerEvent) => {
    if (this.disabled) return

    this._iconClick({ detail: event })
  }


  protected render() {
    return html`
      <div class=${classMap(this.computedClasses)}>
        <slot></slot>

        <div @click=${this.handleIconClick} class=${this.baseIconClass}>
          ${renderIcon({ icon: yClose, size: '16px' })}
        </div>
      </div>
    `
  }
}
