import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { provide } from '@lit/context'
import { ifDefined } from 'lit/directives/if-defined.js'

import {
  createCoreCardWrapperProps,
  type IYCoreCardWrapperProps,
  BlurEvent, FocusEvent,
} from '~core/ui/cardWrapper/models/types'
import { YCoreCardWrapperTagName as tagName } from '~shared/constants'

import { checkedContextCreated, disabledContextCreated, hoverableContextCreated, focusableContextCreated, sizeContextCreated, hoveredContextCreated, focusedContextCreated } from '~core/ui/cardWrapper/providers'

import { bubblingEvent, type TDispatcher } from '~core/utils/event-decorator'
import { preventAndStopEvent } from '~shared/utils/helpers'
import { interceptEvents } from '~core/utils/event-interceptor'

import YCardWrapperVarsCss from '~core/ui/cardWrapper/css/CardWrapper.vars.css?inline'
import YCardWrapperScopedCss from '~core/ui/cardWrapper/css/CardWrapper.scoped.css?inline'
import { withLocator } from '~core/utils/locator'

const { checked, disabled, hoverable, focusable, size } = createCoreCardWrapperProps()

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class YCoreCardWrapper
  extends LitElement
  implements IYCoreCardWrapperProps {
  @provide({ context: checkedContextCreated })
  @property({ type: Boolean }) checked: IYCoreCardWrapperProps['checked'] = checked
  @provide({ context: disabledContextCreated })
  @property({ type: Boolean }) disabled: IYCoreCardWrapperProps['disabled'] = disabled
  @provide({ context: hoverableContextCreated })
  @property({ type: Boolean }) hoverable: IYCoreCardWrapperProps['hoverable'] = hoverable
  @provide({ context: focusableContextCreated })
  @property({ type: Boolean }) focusable: IYCoreCardWrapperProps['focusable'] = focusable
  @provide({ context: sizeContextCreated })
  @property({ type: String, reflect: true }) size: IYCoreCardWrapperProps['size'] = size

  @provide({ context: hoveredContextCreated })
  @state() private hovered = false
  @provide({ context: focusedContextCreated })
  @state() private focused = false

  @bubblingEvent(
    FocusEvent,
    { name: 'focus' },
  )
  private _focus!: TDispatcher<FocusEvent>
  @bubblingEvent(
    BlurEvent,
    { name: 'blur' },
  )
  private _blur!: TDispatcher<BlurEvent>

  @query('div') public readonly divElement?: HTMLDivElement

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(YCardWrapperVarsCss)}
      ${unsafeCSS(YCardWrapperScopedCss)}
    `,
  ]

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_checked`]: Boolean(this.checked),
      [`${this.baseClass}_disabled`]: Boolean(this.disabled),
      [`${this.baseClass}_focused`]: Boolean(this.focused),
      [`${this.baseClass}_hovered`]: Boolean(this.hovered),
      [`${this.baseClass}_hoverable`]: Boolean(this.hoverable),
      [`${this.baseClass}_focusable`]: Boolean(this.focusable),
    }
  }

  private handleFocus = (event: FocusEvent) => {
    preventAndStopEvent(event)

    if (this.disabled || !this.focusable) return

    this.focused = true

    this._focus({ detail: { event } })
  }

  private handleBlur = (event: FocusEvent) => {
    preventAndStopEvent(event)

    if (this.disabled || !this.focusable) return

    this.focused = false

    this._blur({ detail: { event } })
  }

  private handleMouseEnter = (event: MouseEvent) => {
    preventAndStopEvent(event)

    if (this.disabled || !this.hoverable) return

    this.hovered = true
  }

  private handleMouseLeave = (event: MouseEvent) => {
    preventAndStopEvent(event)

    if (this.disabled || !this.hoverable) return

    this.hovered = false
  }

  private get computedTabIndex() {
    return this.focusable ? '0' : '-1'
  }


  protected render() {
    return html`
      <div
        class=${classMap(this.computedClasses)}
        tabindex=${ifDefined(this.computedTabIndex)}
        data-checked=${ifDefined(this.checked)}
        data-disabled=${ifDefined(this.disabled)}
        data-focused=${ifDefined(this.focused)}
        data-hovered=${ifDefined(this.hovered)}
        data-hoverable=${ifDefined(this.hoverable)}
        data-focusable=${ifDefined(this.focusable)}
        data-size=${ifDefined(this.size)}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <slot></slot>
      </div>
    `
  }
}
