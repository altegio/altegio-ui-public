import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { provide } from '@lit/context'
import { classMap } from 'lit/directives/class-map.js'

import { bubblingEvent, type TDispatcher } from '~core/utils/event-decorator'
import {
  createCoreCardButtonProps,
  type IYCoreCardButtonProps,
  BlurEvent, FocusEvent,
} from '~core/ui/cardButton/models/types'
import { YCoreCardButtonTagName as tagName } from '~shared/constants'
import { preventAndStopEvent } from '~shared/utils/helpers'
import { hasSlotContent } from '~core/utils/lit-slots'
import { renderIcon } from '~core/renderers'
import { interceptEvents } from '~core/utils/event-interceptor'

import {
  disabledContextCreated,
  hoverableContextCreated,
  focusableContextCreated,
  sizeContextCreated,
} from '~core/ui/cardWrapper/providers'
import { EYSizes } from '~shared/types/global'
import type { TYCoreTextSize, TYCoreTextVariant } from '~core/ui/text/models/types'
import { EYCoreTextSize, EYCoreTextVariant } from '~core/ui/text/models/types'
import { SIZES } from '~tokens/index'
import { yBigChevronRight } from '~shared/icons'

import YCardButtonVarsCss from '~core/ui/cardButton/css/CardButton.vars.css?inline'
import YCardButtonScopedCss from '~core/ui/cardButton/css/CardButton.scoped.css?inline'

import '~core/ui/cardWrapper'
import '~core/ui/cardMain'
import '~core/ui/cardHeader'
import '~core/ui/text'
import { withLocator } from '~core/utils/locator'

const { disabled, hoverable, focusable, size, annotation, headerText, tagText, tagVariant, headerIcon } = createCoreCardButtonProps()

const mapSizeToAnnotationSize: Record<NonNullable<IYCoreCardButtonProps['size']>, TYCoreTextSize> = {
  [EYSizes.SMALL]: EYCoreTextSize.A1_REGULAR,
  [EYSizes.MEDIUM]: EYCoreTextSize.P2_REGULAR,
  [EYSizes.LARGE]: EYCoreTextSize.P1_REGULAR,
}

const mapSizeToAfterIconSize: Record<NonNullable<IYCoreCardButtonProps['size']>, string> = {
  [EYSizes.SMALL]: String(SIZES.spacing_4_x.cssValue),
  [EYSizes.MEDIUM]: String(SIZES.spacing_6_x.cssValue),
  [EYSizes.LARGE]: String(SIZES.spacing_6_x.cssValue),
}

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class YCoreCardButton
  extends LitElement
  implements IYCoreCardButtonProps {
  @provide({ context: disabledContextCreated })
  @property({ type: Boolean }) disabled: IYCoreCardButtonProps['disabled'] = disabled
  @provide({ context: hoverableContextCreated })
  @property({ type: Boolean }) hoverable: IYCoreCardButtonProps['hoverable'] = hoverable
  @provide({ context: focusableContextCreated })
  @property({ type: Boolean }) focusable: IYCoreCardButtonProps['focusable'] = focusable
  @provide({ context: sizeContextCreated })
  @property({ type: String, reflect: true }) size: IYCoreCardButtonProps['size'] = size
  @property({ type: String, attribute: 'header-text' }) headerText: IYCoreCardButtonProps['headerText'] = headerText
  @property({ type: String, attribute: 'tag-text' }) tagText: IYCoreCardButtonProps['tagText'] = tagText
  @property({ type: String, attribute: 'tag-variant' }) tagVariant: IYCoreCardButtonProps['tagVariant'] = tagVariant
  @property({ type: Object, attribute: 'header-icon' }) headerIcon: IYCoreCardButtonProps['headerIcon'] = headerIcon
  @property({ type: String }) annotation: IYCoreCardButtonProps['annotation'] = annotation

  private readonly baseClass = tagName

  @state() private hasBeforeSlot = false
  @state() private hasAnnotationSlot = false

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

  static readonly styles = [
    css`
      ${unsafeCSS(YCardButtonVarsCss)}
      ${unsafeCSS(YCardButtonScopedCss)}
    `,
  ]

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_disabled`]: Boolean(this.disabled),
      [`${this.baseClass}_size_${this.size}`]: true,
    }
  }

  private get computedSize() {
    return this.size ?? EYSizes.MEDIUM
  }

  private get computedAnnotationSize() {
    return mapSizeToAnnotationSize[this.computedSize]
  }

  private get computedAnnotationVariant(): TYCoreTextVariant {
    if (this.disabled) return EYCoreTextVariant.TERTIARY

    return EYCoreTextVariant.PRIMARY
  }

  private get computedAfterIconSize() {
    return mapSizeToAfterIconSize[this.computedSize]
  }

  private get hasAnnotationContent() {
    return this.hasAnnotationSlot || Boolean(this.annotation?.length)
  }

  private handleSlotBeforeChange = (event: Event) => {
    preventAndStopEvent(event)

    const target = event.target as HTMLSlotElement

    this.hasBeforeSlot = hasSlotContent(target)
  }

  private handleSlotAnnotationChange = (event: Event) => {
    preventAndStopEvent(event)

    const target = event.target as HTMLSlotElement

    this.hasAnnotationSlot = hasSlotContent(target)
  }

  private handleFocus = (event: FocusEvent) => {
    preventAndStopEvent(event)

    if (this.disabled || !this.focusable) return

    this._focus({ detail: { event } })
  }

  private handleBlur = (event: FocusEvent) => {
    preventAndStopEvent(event)

    if (this.disabled || !this.focusable) return

    this._blur({ detail: { event } })
  }


  protected render() {
    return html`
      <y-core-card-wrapper
        .checked=${false}
        .disabled=${this.disabled}
        .hoverable=${this.hoverable}
        .focusable=${this.focusable}
        .size=${this.size}
        class=${classMap(this.computedClasses)}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
      >
        <slot
          name="before"
          @slotchange=${this.handleSlotBeforeChange}
        ></slot>

        <slot name="main">
          <div class=${`${this.baseClass}__main`}>
            <y-core-card-main
              .hideSpaceLeft=${this.hasBeforeSlot}
              .hideSpaceRight=${true}
              .hasAnnotation=${this.hasAnnotationContent}
            >
              <y-core-card-header
                .headerText=${this.headerText}
                .tagText=${this.tagText}
                .tagVariant=${this.tagVariant}
                .headerIcon=${this.headerIcon}
              ></y-core-card-header>

              <y-core-text
                .size=${this.computedAnnotationSize}
                .variant=${this.computedAnnotationVariant}
              >
                <slot
                  name="annotation"
                  @slotchange=${this.handleSlotAnnotationChange}
                >
                  ${this.annotation}
                </slot>
              </y-core-text>
            </y-core-card-main>
          </div>
        </slot>

        <div class=${`${this.baseClass}__after`}>
          <slot name="after"></slot>

          ${renderIcon({
            icon: yBigChevronRight,
            size: this.computedAfterIconSize,
            className: `${this.baseClass}__after-icon`,
          })}
        </div>
      </y-core-card-wrapper>
    `
  }
}
