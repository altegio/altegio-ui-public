import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { provide } from '@lit/context'
import { ifDefined } from 'lit/directives/if-defined.js'
import { classMap } from 'lit/directives/class-map.js'

import { bubblingEvent, type TDispatcher } from '~core/utils/event-decorator'
import {
  createCoreCardSelectProps,
  type IYCoreCardSelectProps,
  BlurEvent, FocusEvent,
} from '~core/ui/cardSelect/models/types'
import { YCoreCardSelectTagName as tagName } from '~shared/constants'
import { preventAndStopEvent } from '~shared/utils/helpers'
import { hasSlotContent } from '~core/utils/lit-slots'
import { interceptEvents } from '~core/utils/event-interceptor'

import {
  checkedContextCreated,
  disabledContextCreated,
  hoverableContextCreated,
  focusableContextCreated,
  sizeContextCreated,
} from '~core/ui/cardWrapper/providers'
import { EYSizes } from '~shared/types/global'
import type { TYCoreTextSize, TYCoreTextVariant } from '~core/ui/text/models/types'
import { EYCoreTextSize, EYCoreTextVariant } from '~core/ui/text/models/types'

import YCardSelectVarsCss from '~core/ui/cardSelect/css/CardSelect.vars.css?inline'
import YCardSelectScopedCss from '~core/ui/cardSelect/css/CardSelect.scoped.css?inline'

import '~core/ui/cardWrapper'
import '~core/ui/cardMain'
import '~core/ui/cardHeader'
import '~core/ui/cardRadio'
import '~core/ui/text'
import { withLocator } from '~core/utils/locator'

const { checked, disabled, hoverable, focusable, size, annotation, headerText, tagText, tagVariant, headerIcon } = createCoreCardSelectProps()

const mapSizeToAnnotationSize: Record<NonNullable<IYCoreCardSelectProps['size']>, TYCoreTextSize> = {
  [EYSizes.SMALL]: EYCoreTextSize.A1_REGULAR,
  [EYSizes.MEDIUM]: EYCoreTextSize.P2_REGULAR,
  [EYSizes.LARGE]: EYCoreTextSize.P1_REGULAR,
}

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class YCoreCardSelect
  extends LitElement
  implements IYCoreCardSelectProps {
  @provide({ context: checkedContextCreated })
  @property({ type: Boolean }) checked: IYCoreCardSelectProps['checked'] = checked
  @provide({ context: disabledContextCreated })
  @property({ type: Boolean }) disabled: IYCoreCardSelectProps['disabled'] = disabled
  @provide({ context: hoverableContextCreated })
  @property({ type: Boolean }) hoverable: IYCoreCardSelectProps['hoverable'] = hoverable
  @provide({ context: focusableContextCreated })
  @property({ type: Boolean }) focusable: IYCoreCardSelectProps['focusable'] = focusable
  @provide({ context: sizeContextCreated })
  @property({ type: String, reflect: true }) size: IYCoreCardSelectProps['size'] = size
  @property({ type: String, attribute: 'header-text' }) headerText: IYCoreCardSelectProps['headerText'] = headerText
  @property({ type: String, attribute: 'tag-text' }) tagText: IYCoreCardSelectProps['tagText'] = tagText
  @property({ type: String, attribute: 'tag-variant' }) tagVariant: IYCoreCardSelectProps['tagVariant'] = tagVariant
  @property({ type: Object, attribute: 'header-icon' }) headerIcon: IYCoreCardSelectProps['headerIcon'] = headerIcon
  @property({ type: String }) annotation: IYCoreCardSelectProps['annotation'] = annotation

  private readonly baseClass = tagName

  @state() private hasBeforeSlot = false
  @state() private hasAfterSlot = true
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
      ${unsafeCSS(YCardSelectVarsCss)}
      ${unsafeCSS(YCardSelectScopedCss)}
    `,
  ]

  private get computedClasses() {
    return { [this.baseClass]: true }
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

  private handleSlotBeforeChange = (event: Event) => {
    preventAndStopEvent(event)

    const target = event.target as HTMLSlotElement

    this.hasBeforeSlot = hasSlotContent(target)
  }

  private handleSlotAfterChange = (event: Event) => {
    preventAndStopEvent(event)

    const target = event.target as HTMLSlotElement

    this.hasAfterSlot = hasSlotContent(target)
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

  private get computedTabIndex() {
    return this.focusable ? '0' : '-1'
  }

  private get hasAnnotationContent() {
    return this.hasAnnotationSlot || Boolean(this.annotation?.length)
  }

  private handleSlotAnnotationChange = (event: Event) => {
    preventAndStopEvent(event)

    const target = event.target as HTMLSlotElement

    this.hasAnnotationSlot = hasSlotContent(target)
  }

  protected renderCardAnnotation() {
    return html`
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
    `
  }


  protected render() {
    return html`
      <y-core-card-wrapper
        tabindex=${ifDefined(this.computedTabIndex)}
        .checked=${this.checked}
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
              .hideSpaceRight=${this.hasAfterSlot}
              .hasAnnotation=${this.hasAnnotationContent}
            >
              <y-core-card-header
                .headerText=${this.headerText}
                .tagText=${this.tagText}
                .tagVariant=${this.tagVariant}
                .headerIcon=${this.headerIcon}
              ></y-core-card-header>

              ${this.renderCardAnnotation()}
            </y-core-card-main>
          </div>
        </slot>

        <slot
          name="after"
          @slotchange=${this.handleSlotAfterChange}
        >
          <y-core-card-radio
            slot="right"
          ></y-core-card-radio>
        </slot>
      </y-core-card-wrapper>
    `
  }
}
