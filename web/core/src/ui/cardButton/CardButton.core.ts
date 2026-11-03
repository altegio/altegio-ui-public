import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { provide } from '@lit/context'
import { classMap } from 'lit/directives/class-map.js'

import { bubblingEvent, type TDispatcher } from '~core/utils/event-decorator'
import {
  createCoreCardButtonProps,
  type IAltCoreCardButtonProps,
  BlurEvent, FocusEvent,
} from '~core/ui/cardButton/models/types'
import { AltCoreCardButtonTagName as tagName } from '~shared/constants'
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
import { EAltSizes } from '~shared/types/global'
import type { TAltCoreTextSize, TAltCoreTextVariant } from '~core/ui/text/models/types'
import { EAltCoreTextSize, EAltCoreTextVariant } from '~core/ui/text/models/types'
import { SIZES } from '~tokens/index'
import { altBigChevronRight } from '~shared/icons'

import AltCardButtonVarsCss from '~core/ui/cardButton/css/CardButton.vars.css?inline'
import AltCardButtonScopedCss from '~core/ui/cardButton/css/CardButton.scoped.css?inline'

import '~core/ui/cardWrapper'
import '~core/ui/cardMain'
import '~core/ui/cardHeader'
import '~core/ui/text'
import { withLocator } from '~core/utils/locator'

const { disabled, hoverable, focusable, size, annotation, headerText, tagText, tagVariant, headerIcon } = createCoreCardButtonProps()

const mapSizeToAnnotationSize: Record<NonNullable<IAltCoreCardButtonProps['size']>, TAltCoreTextSize> = {
  [EAltSizes.SMALL]: EAltCoreTextSize.A1_REGULAR,
  [EAltSizes.MEDIUM]: EAltCoreTextSize.P2_REGULAR,
  [EAltSizes.LARGE]: EAltCoreTextSize.P1_REGULAR,
}

const mapSizeToAfterIconSize: Record<NonNullable<IAltCoreCardButtonProps['size']>, string> = {
  [EAltSizes.SMALL]: String(SIZES.spacing_4_x.cssValue),
  [EAltSizes.MEDIUM]: String(SIZES.spacing_6_x.cssValue),
  [EAltSizes.LARGE]: String(SIZES.spacing_6_x.cssValue),
}

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class AltCoreCardButton
  extends LitElement
  implements IAltCoreCardButtonProps {
  @provide({ context: disabledContextCreated })
  @property({ type: Boolean }) disabled: IAltCoreCardButtonProps['disabled'] = disabled
  @provide({ context: hoverableContextCreated })
  @property({ type: Boolean }) hoverable: IAltCoreCardButtonProps['hoverable'] = hoverable
  @provide({ context: focusableContextCreated })
  @property({ type: Boolean }) focusable: IAltCoreCardButtonProps['focusable'] = focusable
  @provide({ context: sizeContextCreated })
  @property({ type: String, reflect: true }) size: IAltCoreCardButtonProps['size'] = size
  @property({ type: String, attribute: 'header-text' }) headerText: IAltCoreCardButtonProps['headerText'] = headerText
  @property({ type: String, attribute: 'tag-text' }) tagText: IAltCoreCardButtonProps['tagText'] = tagText
  @property({ type: String, attribute: 'tag-variant' }) tagVariant: IAltCoreCardButtonProps['tagVariant'] = tagVariant
  @property({ type: Object, attribute: 'header-icon' }) headerIcon: IAltCoreCardButtonProps['headerIcon'] = headerIcon
  @property({ type: String }) annotation: IAltCoreCardButtonProps['annotation'] = annotation

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
      ${unsafeCSS(AltCardButtonVarsCss)}
      ${unsafeCSS(AltCardButtonScopedCss)}
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
    return this.size ?? EAltSizes.MEDIUM
  }

  private get computedAnnotationSize() {
    return mapSizeToAnnotationSize[this.computedSize]
  }

  private get computedAnnotationVariant(): TAltCoreTextVariant {
    if (this.disabled) return EAltCoreTextVariant.TERTIARY

    return EAltCoreTextVariant.PRIMARY
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
      <alt-core-card-wrapper
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
            <alt-core-card-main
              .hideSpaceLeft=${this.hasBeforeSlot}
              .hideSpaceRight=${true}
              .hasAnnotation=${this.hasAnnotationContent}
            >
              <alt-core-card-header
                .headerText=${this.headerText}
                .tagText=${this.tagText}
                .tagVariant=${this.tagVariant}
                .headerIcon=${this.headerIcon}
              ></alt-core-card-header>

              <alt-core-text
                .size=${this.computedAnnotationSize}
                .variant=${this.computedAnnotationVariant}
              >
                <slot
                  name="annotation"
                  @slotchange=${this.handleSlotAnnotationChange}
                >
                  ${this.annotation}
                </slot>
              </alt-core-text>
            </alt-core-card-main>
          </div>
        </slot>

        <div class=${`${this.baseClass}__after`}>
          <slot name="after"></slot>

          ${renderIcon({
            icon: altBigChevronRight,
            size: this.computedAfterIconSize,
            className: `${this.baseClass}__after-icon`,
          })}
        </div>
      </alt-core-card-wrapper>
    `
  }
}
