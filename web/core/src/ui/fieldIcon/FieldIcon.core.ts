import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { consume } from '@lit/context'

import {
  createCoreFieldIconProps,
  type IYCoreFieldIconProps,
} from '~core/ui/fieldIcon/models/types'
import {
  YCoreFieldIconTagName as tagName,
} from '~shared/constants'

import YCoreFieldIconVarsCSS from '~core/ui/fieldIcon/css/FieldIcon.vars.css?inline'
import YCoreFieldIconScopedCSS from '~core/ui/fieldIcon/css/FieldIcon.scoped.css?inline'

import { interceptEvents } from '~core/utils/event-interceptor'
import { EYSizes } from '~shared/types/global'
import {
  disabledContextCreated,
  readonlyContextCreated,
  sizeContextCreated,
} from '~core/ui/fieldWrapper/providers'

import '~core/ui/icon'
import { withLocator } from '~core/utils/locator'

const { disabled, readonly, size, hoverable, clickable, locator } = createCoreFieldIconProps()

const mapSizeToIconSize: Record<NonNullable<IYCoreFieldIconProps['size']>, string> = {
  [EYSizes.SMALL]: '16px',
  [EYSizes.MEDIUM]: '20px',
  [EYSizes.LARGE]: '24px',
}

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class YCoreFieldIcon
  extends LitElement
  implements IYCoreFieldIconProps {
  @property({ type: Boolean }) disabled: IYCoreFieldIconProps['disabled'] = disabled
  @consume({ context: readonlyContextCreated, subscribe: true })
  @property({ type: Boolean, reflect: true }) readonly: IYCoreFieldIconProps['readonly'] = readonly
  @consume({ context: sizeContextCreated, subscribe: true })
  @property({ type: String, reflect: true }) size: IYCoreFieldIconProps['size'] = size
  @property({ type: Object }) icon!: IYCoreFieldIconProps['icon']
  @property({ type: Boolean, reflect: true }) hoverable: IYCoreFieldIconProps['hoverable'] = hoverable
  @property({ type: Boolean, reflect: true }) clickable: IYCoreFieldIconProps['clickable'] = clickable
  @property({ type: String }) locator: IYCoreFieldIconProps['locator'] = locator

  @consume({ context: disabledContextCreated, subscribe: true })
  private _contextDisabled?: boolean

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(YCoreFieldIconVarsCSS)}
      ${unsafeCSS(YCoreFieldIconScopedCSS)}
    `,
  ]

  private get computedSize() {
    return this.size ?? EYSizes.MEDIUM
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
        <y-core-icon
          .icon=${this.icon}
          .size=${this.computedIconSize}
        ></y-core-icon>
      </div>
    `
  }
}
