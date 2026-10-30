import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { consume } from '@lit/context'

import {
  createCoreFieldIconProps,
  type IAltCoreFieldIconProps,
} from '~core/ui/fieldIcon/models/types'
import {
  AltCoreFieldIconTagName as tagName,
} from '~shared/constants'

import AltCoreFieldIconVarsCSS from '~core/ui/fieldIcon/css/FieldIcon.vars.css?inline'
import AltCoreFieldIconScopedCSS from '~core/ui/fieldIcon/css/FieldIcon.scoped.css?inline'

import { interceptEvents } from '~core/utils/event-interceptor'
import { EAltSizes } from '~shared/types/global'
import {
  disabledContextCreated,
  readonlyContextCreated,
  sizeContextCreated,
} from '~core/ui/fieldWrapper/providers'

import '~core/ui/icon'
import { withLocator } from '~core/utils/locator'

const { disabled, readonly, size, hoverable, clickable, locator } = createCoreFieldIconProps()

const mapSizeToIconSize: Record<NonNullable<IAltCoreFieldIconProps['size']>, string> = {
  [EAltSizes.SMALL]: '16px',
  [EAltSizes.MEDIUM]: '20px',
  [EAltSizes.LARGE]: '24px',
}

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class AltCoreFieldIcon
  extends LitElement
  implements IAltCoreFieldIconProps {
  @property({ type: Boolean }) disabled: IAltCoreFieldIconProps['disabled'] = disabled
  @consume({ context: readonlyContextCreated, subscribe: true })
  @property({ type: Boolean, reflect: true }) readonly: IAltCoreFieldIconProps['readonly'] = readonly
  @consume({ context: sizeContextCreated, subscribe: true })
  @property({ type: String, reflect: true }) size: IAltCoreFieldIconProps['size'] = size
  @property({ type: Object }) icon!: IAltCoreFieldIconProps['icon']
  @property({ type: Boolean, reflect: true }) hoverable: IAltCoreFieldIconProps['hoverable'] = hoverable
  @property({ type: Boolean, reflect: true }) clickable: IAltCoreFieldIconProps['clickable'] = clickable
  @property({ type: String }) locator: IAltCoreFieldIconProps['locator'] = locator

  @consume({ context: disabledContextCreated, subscribe: true })
  private _contextDisabled?: boolean

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreFieldIconVarsCSS)}
      ${unsafeCSS(AltCoreFieldIconScopedCSS)}
    `,
  ]

  private get computedSize() {
    return this.size ?? EAltSizes.MEDIUM
  }

  private get computedIconSize() {
    return mapSizeToIconSize[this.computedSize]
  }

  private get isDisabled() {
    return this._contextDisabled || this.disabled || this.readonly
  }

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_disabled`]: Boolean(this.isDisabled),
      [`${this.baseClass}_hoverable`]: Boolean(this.hoverable),
      [`${this.baseClass}_clickable`]: Boolean(this.clickable),
      [`${this.baseClass}_size_${this.computedSize}`]: true,
    }
  }

  protected render() {
    return html`
      <div class=${classMap(this.computedClasses)}>
        <alt-core-icon
          .icon=${this.icon}
          .size=${this.computedIconSize}
        ></alt-core-icon>
      </div>
    `
  }
}
