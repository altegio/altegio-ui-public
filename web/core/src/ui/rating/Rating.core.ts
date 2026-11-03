import { LitElement, html, css, unsafeCSS, type PropertyValues } from 'lit'
import { customElement, property, queryAll, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { repeat } from 'lit/directives/repeat.js'
import { styleMap } from 'lit/directives/style-map.js'

import {
  createCoreRatingProps,
  RatingChangeEvent,
  type IAltCoreRatingProps,
} from '~core/ui/rating/models/types'
import { AltCoreRatingTagName as tagName } from '~shared/constants'
import { altStar, altStarFilled } from '~shared/icons'
import { renderIcon } from '~core/renderers'
import { booleanConverter } from '~core/utils/converters'
import { bubblingEvent, type TDispatcher } from '~core/utils/event-decorator'
import { withLocator } from '~core/utils/locator'
import { FormAssociated, getNativeValidity } from '~core/utils/a11y/form-associated'
import { getInlineKey } from '~core/utils/a11y/direction'
import { getElementMessage } from '~core/i18n'

import AltCoreRatingVarsCss from '~core/ui/rating/css/Rating.vars.css?inline'
import AltCoreRatingScopedCss from '~core/ui/rating/css/Rating.scoped.css?inline'

const { value, max, readonly, disabled, required, size, accessibleName } = createCoreRatingProps()

const ICON_SIZES: Record<NonNullable<IAltCoreRatingProps['size']>, string> = {
  small: '16px',
  medium: '20px',
  large: '24px',
}

/**
 * Star rating.
 *
 * An editable rating is a WAI-ARIA radio group: one radio per star with roving focus, the arrow keys
 * (reversed in a right-to-left layout), Home and End pick a value. A read-only rating is an image
 * named "4 of 5" and may show fractions such as 4.5. With a `name` it takes part in a native form.
 */
@customElement(tagName)
@withLocator(tagName)
export class AltCoreRating
  extends FormAssociated(LitElement)
  implements IAltCoreRatingProps {
  @property({ type: Number }) value: IAltCoreRatingProps['value'] = value
  @property({ type: Number }) max: IAltCoreRatingProps['max'] = max
  @property({ type: Boolean, reflect: true, converter: booleanConverter }) readonly: IAltCoreRatingProps['readonly'] = readonly
  @property({ type: Boolean, reflect: true, converter: booleanConverter }) disabled: IAltCoreRatingProps['disabled'] = disabled
  @property({ type: Boolean, converter: booleanConverter }) required: IAltCoreRatingProps['required'] = required
  @property({ type: String, reflect: true }) size: IAltCoreRatingProps['size'] = size
  @property({ type: String, attribute: 'accessible-name' }) accessibleName: IAltCoreRatingProps['accessibleName'] = accessibleName

  /** Star under the pointer, previewed before it is picked */
  @state() private hoverValue = 0

  @queryAll('[role="radio"]') private radios!: NodeListOf<HTMLElement>

  @bubblingEvent(RatingChangeEvent, { name: 'change' })
  protected _change!: TDispatcher<RatingChangeEvent>

  private readonly baseClass = tagName
  private defaultValue = 0

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreRatingVarsCss)}
      ${unsafeCSS(AltCoreRatingScopedCss)}
    `,
  ]

  /** A whole number of stars, at least one */
  private get computedMax() {
    return Number.isFinite(this.max) && this.max >= 1 ? Math.floor(this.max) : max
  }

  /** The value kept between 0 and the number of stars */
  private get computedValue() {
    return Math.min(Math.max(Number.isFinite(this.value) ? this.value : 0, 0), this.computedMax)
  }

  private get isDisabled() {
    return Boolean(this.disabled) || this.formDisabled
  }

  private get isInteractive() {
    return !this.readonly && !this.isDisabled
  }

  /** The checked star takes focus; with nothing checked, the first one does */
  private get focusableValue() {
    return Math.round(this.computedValue) || 1
  }

  private get groupName() {
    return this.accessibleName || getElementMessage('rating', this)
  }

  private describeValue(starValue: number) {
    return `${starValue} ${getElementMessage('of', this)} ${this.computedMax}`
  }

  protected get formValue() {
    return this.computedValue > 0 ? String(this.computedValue) : null
  }

  protected get formValidity() {
    return getNativeValidity(
      { type: 'radio', name: this.name, required: this.required },
      { checked: this.computedValue > 0 },
      this.radios.item(this.focusableValue - 1),
    )
  }

  protected resetFormControl() {
    this.value = this.defaultValue
  }

  protected firstUpdated() {
    this.defaultValue = this.value
  }

  private select(starValue: number) {
    if (!this.isInteractive || starValue === this.computedValue) return

    this.value = starValue
    this._change({ detail: { value: starValue } })
  }

  /** Where each key moves the checked star, wrapping around as radio groups do */
  private readonly keyTargets: Partial<Record<string, (current: number, count: number) => number>> = {
    ArrowRight: (current, count) => current % count + 1,
    ArrowDown: (current, count) => current % count + 1,
    ArrowLeft: (current, count) => (current + count - 2) % count + 1,
    ArrowUp: (current, count) => (current + count - 2) % count + 1,
    Home: () => 1,
    End: (_, count) => count,
  }

  private handleKeydown = (event: KeyboardEvent) => {
    if (!this.isInteractive) return

    const current = Number((event.target as HTMLElement).dataset.value) || this.focusableValue
    const key = getInlineKey(event.key, this)
    const getTarget = this.keyTargets[key]
    const target = getTarget ? getTarget(current, this.computedMax) : key === ' ' && current

    if (!target) return

    event.preventDefault()
    this.select(target)
    void this.updateComplete.then(() => { this.radios.item(target - 1).focus() })
  }

  private getStarValue(event: Event) {
    return Number((event.currentTarget as HTMLElement).dataset.value)
  }

  private handleStarClick = (event: MouseEvent) => {
    this.select(this.getStarValue(event))
  }

  private handleStarPointerEnter = (event: PointerEvent) => {
    if (this.isInteractive) this.hoverValue = this.getStarValue(event)
  }

  private handlePointerLeave = () => {
    this.hoverValue = 0
  }

  private renderStar(fill: number) {
    const iconSize = ICON_SIZES[this.size ?? size ?? 'medium']

    return html`
      <span class="${this.baseClass}__icon" aria-hidden="true">
        ${renderIcon({ icon: altStar, size: iconSize, className: `${this.baseClass}__empty` })}
        <span class="${this.baseClass}__fill" style=${styleMap({ width: `${fill * 100}%` })}>
          ${renderIcon({ icon: altStarFilled, size: iconSize })}
        </span>
      </span>
    `
  }

  private getFill(starValue: number) {
    const shown = this.hoverValue || this.computedValue

    return Math.min(Math.max(shown - starValue + 1, 0), 1)
  }

  private renderReadonly() {
    const name = this.accessibleName ? `${this.accessibleName}: ` : ''

    return html`
      <div class=${this.baseClass} role="img" aria-label=${`${name}${this.describeValue(this.computedValue)}`}>
        ${repeat(this.stars, (starValue) => starValue, (starValue) => this.renderStar(this.getFill(starValue)))}
      </div>
    `
  }

  private get stars() {
    return Array.from({ length: this.computedMax }, (_, index) => index + 1)
  }

  private renderRadio(starValue: number) {
    const checked = Math.round(this.computedValue) === starValue

    return html`
      <span
        role="radio"
        class=${classMap({ [`${this.baseClass}__star`]: true, [`${this.baseClass}__star_checked`]: checked })}
        data-value=${starValue}
        aria-checked=${checked ? 'true' : 'false'}
        aria-label=${this.describeValue(starValue)}
        tabindex=${this.isInteractive && starValue === this.focusableValue ? 0 : -1}
        @click=${this.handleStarClick}
        @pointerenter=${this.handleStarPointerEnter}
      >${this.renderStar(Math.round(this.getFill(starValue)))}</span>
    `
  }

  protected render() {
    if (this.readonly) return this.renderReadonly()

    return html`
      <div
        class=${classMap({ [this.baseClass]: true, [`${this.baseClass}_interactive`]: this.isInteractive })}
        role="radiogroup"
        aria-label=${this.groupName}
        aria-disabled=${ifDefined(this.isDisabled ? 'true' : undefined)}
        aria-required=${ifDefined(this.required ? 'true' : undefined)}
        @keydown=${this.handleKeydown}
        @pointerleave=${this.handlePointerLeave}
      >
        ${repeat(this.stars, (starValue) => starValue, (starValue) => this.renderRadio(starValue))}
      </div>
    `
  }

  protected updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties)

    if (changedProperties.has('disabled') && this.isDisabled) this.hoverValue = 0
  }
}
