import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { provide } from '@lit/context'
import { ifDefined } from 'lit/directives/if-defined.js'
import { classMap } from 'lit/directives/class-map.js'

import { bubblingEvent, type TDispatcher } from '~core/utils/event-decorator'
import {
  createCoreCardSelectProps,
  type IAltCoreCardSelectProps,
  BlurEvent, FocusEvent,
} from '~core/ui/cardSelect/models/types'
import { AltCoreCardSelectTagName as tagName } from '~shared/constants'
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
import { EAltSizes } from '~shared/types/global'
import type { TAltCoreTextSize, TAltCoreTextVariant } from '~core/ui/text/models/types'
import { EAltCoreTextSize, EAltCoreTextVariant } from '~core/ui/text/models/types'

import AltCardSelectVarsCss from '~core/ui/cardSelect/css/CardSelect.vars.css?inline'
import AltCardSelectScopedCss from '~core/ui/cardSelect/css/CardSelect.scoped.css?inline'

import '~core/ui/cardWrapper'
import '~core/ui/cardMain'
import '~core/ui/cardHeader'
import '~core/ui/cardRadio'
import '~core/ui/text'
import { withLocator } from '~core/utils/locator'

const { checked, disabled, hoverable, focusable, size, annotation, headerText, tagText, tagVariant, headerIcon } = createCoreCardSelectProps()

const mapSizeToAnnotationSize: Record<NonNullable<IAltCoreCardSelectProps['size']>, TAltCoreTextSize> = {
  [EAltSizes.SMALL]: EAltCoreTextSize.A1_REGULAR,
  [EAltSizes.MEDIUM]: EAltCoreTextSize.P2_REGULAR,
  [EAltSizes.LARGE]: EAltCoreTextSize.P1_REGULAR,
}

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class AltCoreCardSelect
  extends LitElement
  implements IAltCoreCardSelectProps {
  @provide({ context: checkedContextCreated })
  @property({ type: Boolean }) checked: IAltCoreCardSelectProps['checked'] = checked
  @provide({ context: disabledContextCreated })
  @property({ type: Boolean }) disabled: IAltCoreCardSelectProps['disabled'] = disabled
  @provide({ context: hoverableContextCreated })
  @property({ type: Boolean }) hoverable: IAltCoreCardSelectProps['hoverable'] = hoverable
  @provide({ context: focusableContextCreated })
  @property({ type: Boolean }) focusable: IAltCoreCardSelectProps['focusable'] = focusable
  @provide({ context: sizeContextCreated })
  @property({ type: String, reflect: true }) size: IAltCoreCardSelectProps['size'] = size
  @property({ type: String, attribute: 'header-text' }) headerText: IAltCoreCardSelectProps['headerText'] = headerText
  @property({ type: String, attribute: 'tag-text' }) tagText: IAltCoreCardSelectProps['tagText'] = tagText
  @property({ type: String, attribute: 'tag-variant' }) tagVariant: IAltCoreCardSelectProps['tagVariant'] = tagVariant
  @property({ type: Object, attribute: 'header-icon' }) headerIcon: IAltCoreCardSelectProps['headerIcon'] = headerIcon
  @property({ type: String }) annotation: IAltCoreCardSelectProps['annotation'] = annotation

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
      ${unsafeCSS(AltCardSelectVarsCss)}
      ${unsafeCSS(AltCardSelectScopedCss)}
    `,
  ]

  private get computedClasses() {
    return { [this.baseClass]: true }
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
    `
  }


  protected render() {
    return html`
      <alt-core-card-wrapper
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
            <alt-core-card-main
              .hideSpaceLeft=${this.hasBeforeSlot}
              .hideSpaceRight=${this.hasAfterSlot}
              .hasAnnotation=${this.hasAnnotationContent}
            >
              <alt-core-card-header
                .headerText=${this.headerText}
                .tagText=${this.tagText}
                .tagVariant=${this.tagVariant}
                .headerIcon=${this.headerIcon}
              ></alt-core-card-header>

              ${this.renderCardAnnotation()}
            </alt-core-card-main>
          </div>
        </slot>

        <slot
          name="after"
          @slotchange=${this.handleSlotAfterChange}
        >
          <alt-core-card-radio
            slot="right"
          ></alt-core-card-radio>
        </slot>
      </alt-core-card-wrapper>
    `
  }
}
