import { LitElement, html, css, unsafeCSS, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { renderIcon } from '~core/renderers'

import type { IAltCoreTagProps } from './models/types'
import {
  createCoreTagProps,
} from './models/types'

import { AltCoreTagTagName as tagName, AltCoreIconTagName } from '~shared/constants'

import AltCoreTagVarsCss from '~core/ui/tag/css/Tag.vars.css?inline'
import AltCoreTagScopedCss from '~core/ui/tag/css/Tag.scoped.css?inline'
import { interceptEvents } from '~core/utils/event-interceptor'
import { EAltSizes } from '~shared/types/global'
import type { TDispatcher } from '~core/utils/event-decorator'
import { bubblingEvent } from '~core/utils/event-decorator'
import { ClickIconEmitEvent } from './models/types/events'
import { defineCustomElement } from '~web/shared/utils/components'
import { AltCoreIcon } from '../icon/Icon.core'
import { withLocator } from '~core/utils/locator'

const { disabled, size, variant, iconLeft, locator, locatorLabel, locatorIcon } = createCoreTagProps()

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class AltCoreTag extends LitElement implements IAltCoreTagProps {
  @property({ type: String }) locator: IAltCoreTagProps['locator'] = locator
  @property({ type: String }) size: IAltCoreTagProps['size'] = size
  @property({ type: String }) variant: IAltCoreTagProps['variant'] = variant
  @property({ type: Object, attribute: 'icon-left' }) iconLeft: IAltCoreTagProps['iconLeft'] = iconLeft
  @property({ type: Boolean }) disabled: IAltCoreTagProps['disabled'] = disabled
  @property({ type: String, attribute: 'locator-label' }) locatorLabel: IAltCoreTagProps['locatorLabel'] = locatorLabel
  @property({ type: String, attribute: 'locator-icon' }) locatorIcon: IAltCoreTagProps['locatorIcon'] = locatorIcon

  @bubblingEvent(
    ClickIconEmitEvent,
    { name: 'click-icon' },
  )
  _iconClick!: TDispatcher<ClickIconEmitEvent>

  private readonly baseClass = tagName
  private readonly baseIconClass = `${this.baseClass}__icon`

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreTagVarsCss)}
      ${unsafeCSS(AltCoreTagScopedCss)}
    `,
  ]

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_size_${this.size}`]: Boolean(this.size),
      [`${this.baseClass}_variant_${this.variant}`]: Boolean(this.variant),
      [`${this.baseClass}_disabled`]: Boolean(this.disabled),
      [`${this.baseClass}_with-icon`]: Boolean(this.iconLeft),
    }
  }

  private handleIconClick = (event: PointerEvent) => {
    event.stopPropagation()

    if (this.disabled) return
    this._iconClick({ detail: event })
  }

  protected firstUpdated(): void {
    defineCustomElement(AltCoreIconTagName, AltCoreIcon)
  }

  protected render() {
    return html`
      <div class=${classMap(this.computedClasses)}>
      ${
        this.iconLeft
        ? html`
          <div
            @click=${this.handleIconClick}
            class=${this.baseIconClass}
            data-locator=${this.locatorIcon || `${tagName}__icon`}
          >
            ${renderIcon({ icon: this.iconLeft, size: this.size === EAltSizes.SMALL ? '12px' : this.size === EAltSizes.MEDIUM ? '14px' : '20px' })}
          </div>`
        : nothing
      }

        <slot data-locator=${this.locatorLabel || `${tagName}__label`}></slot>
      </div>
    `
  }
}
