import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

import {
  ClickIconEmitEvent,
  createCoreSimpleChipProps,
  type IAltCoreSimpleChipProps,
} from '~core/ui/simpleChip/models/types'
import {
  AltCoreSimpleChipTagName as tagName,
} from '~shared/constants'

import AltCoreSimpleChipVarsCss from '~core/ui/simpleChip/css/SimpleChip.vars.css?inline'
import AltCoreSimpleChipScopedCss from '~core/ui/simpleChip/css/SimpleChip.scoped.css?inline'

import { bubblingEvent, type TDispatcher } from '~core/utils/event-decorator'
import { renderIcon } from '~core/renderers'
import { altClose } from '~shared/icons'
import { withLocator } from '~core/utils/locator'

const { size, variant, disabled, readonly } = createCoreSimpleChipProps()

@customElement(tagName)
@withLocator(tagName)
export class AltCoreSimpleChip extends LitElement implements IAltCoreSimpleChipProps {
  @property({ type: String }) size: IAltCoreSimpleChipProps['size'] = size
  @property({ type: String }) variant: IAltCoreSimpleChipProps['variant'] = variant
  @property({ type: Boolean }) disabled: IAltCoreSimpleChipProps['disabled'] = disabled
  @property({ type: Boolean }) readonly: IAltCoreSimpleChipProps['readonly'] = readonly

  @bubblingEvent(
    ClickIconEmitEvent,
    { name: 'click-icon' },
  )
  _iconClick!: TDispatcher<ClickIconEmitEvent>

  private readonly baseClass = tagName
  private readonly baseIconClass = `${this.baseClass}__icon`

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreSimpleChipVarsCss)}
      ${unsafeCSS(AltCoreSimpleChipScopedCss)}
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
          ${renderIcon({ icon: altClose, size: '16px' })}
        </div>
      </div>
    `
  }
}
