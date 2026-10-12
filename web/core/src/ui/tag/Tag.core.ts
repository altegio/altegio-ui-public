import { LitElement, html, css, unsafeCSS, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { renderIcon } from '~core/renderers'

import type { IYCoreTagProps } from './models/types'
import {
  createCoreTagProps,
} from './models/types'

import { YCoreTagTagName as tagName, YCoreIconTagName } from '~shared/constants'

import YCoreTagVarsCss from '~core/ui/tag/css/Tag.vars.css?inline'
import YCoreTagScopedCss from '~core/ui/tag/css/Tag.scoped.css?inline'
import { interceptEvents } from '~core/utils/event-interceptor'
import { EYSizes } from '~shared/types/global'
import type { TDispatcher } from '~core/utils/event-decorator'
import { bubblingEvent } from '~core/utils/event-decorator'
import { ClickIconEmitEvent } from './models/types/events'
import { defineCustomElement } from '~web/shared/utils/components'
import { YCoreIcon } from '../icon/Icon.core'
import { withLocator } from '~core/utils/locator'

const { disabled, size, variant, iconLeft, locator, locatorLabel, locatorIcon } = createCoreTagProps()

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class YCoreTag extends LitElement implements IYCoreTagProps {
  @property({ type: String }) locator: IYCoreTagProps['locator'] = locator
  @property({ type: String }) size: IYCoreTagProps['size'] = size
  @property({ type: String }) variant: IYCoreTagProps['variant'] = variant
  @property({ type: Object, attribute: 'icon-left' }) iconLeft: IYCoreTagProps['iconLeft'] = iconLeft
  @property({ type: Boolean }) disabled: IYCoreTagProps['disabled'] = disabled
  @property({ type: String, attribute: 'locator-label' }) locatorLabel: IYCoreTagProps['locatorLabel'] = locatorLabel
  @property({ type: String, attribute: 'locator-icon' }) locatorIcon: IYCoreTagProps['locatorIcon'] = locatorIcon

  @bubblingEvent(
    ClickIconEmitEvent,
    { name: 'click-icon' },
  )
  _iconClick!: TDispatcher<ClickIconEmitEvent>

  private readonly baseClass = tagName
  private readonly baseIconClass = `${this.baseClass}__icon`

  static readonly styles = [
    css`
      ${unsafeCSS(YCoreTagVarsCss)}
      ${unsafeCSS(YCoreTagScopedCss)}
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
    defineCustomElement(YCoreIconTagName, YCoreIcon)
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
            ${renderIcon({ icon: this.iconLeft, size: this.size === EYSizes.SMALL ? '12px' : this.size === EYSizes.MEDIUM ? '14px' : '20px' })}
          </div>`
        : nothing
      }

        <slot data-locator=${this.locatorLabel || `${tagName}__label`}></slot>
      </div>
    `
  }
}
