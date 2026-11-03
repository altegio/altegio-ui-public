import { html, css, unsafeCSS, LitElement, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

import { type TDispatcher, bubblingEvent } from '~core/utils/event-decorator'
import { hasSlotContent } from '~core/utils/lit-slots'
import { type IAltCoreToggleExternalProps, createCoreToggleExternalProps } from './models/types'
import { ToggleCheckedEvent } from './models/types'
import { AltCoreToggleTagName as tagName } from '~shared/constants'

import AltCoreToggleScopedCSS from '~core/ui/toggle/css/Toggle.scoped.css?inline'
import AltCoreToggleVarsCSS from '~core/ui/toggle/css/Toggle.vars.css?inline'

import '~core/ui/annotation'
import '~core/ui/simpleToggle'
import '~core/ui/label'
import { withLocator } from '~core/utils/locator'
import { FormAssociated } from '~core/utils/a11y/form-associated'
import { getAccessibleDescription, getSlotText } from '~core/utils/a11y/accessible-text'

const { checked, disabled, labelText, labelTooltipText, annotationText, labelOverflowDebounce, alignment, size, value, accessibleName } = createCoreToggleExternalProps()

@customElement(tagName)
@withLocator(tagName)
export class AltCoreToggle extends FormAssociated(LitElement) implements IAltCoreToggleExternalProps {
  @property({ type: Boolean }) disabled: IAltCoreToggleExternalProps['disabled'] = disabled
  @property({ type: Boolean, reflect: true }) checked: IAltCoreToggleExternalProps['checked'] = checked
  @property({ type: String, attribute: 'label-text' }) labelText: IAltCoreToggleExternalProps['labelText'] = labelText
  @property({ type: String, attribute: 'label-tooltip-text' }) labelTooltipText: IAltCoreToggleExternalProps['labelTooltipText'] = labelTooltipText
  @property({ type: String, attribute: 'annotation-text' }) annotationText: IAltCoreToggleExternalProps['annotationText'] = annotationText
  @property({ type: Number, attribute: 'label-overflow-debounce' }) labelOverflowDebounce: IAltCoreToggleExternalProps['labelOverflowDebounce'] = labelOverflowDebounce
  @property({ type: String, reflect: true }) alignment: IAltCoreToggleExternalProps['alignment'] = alignment
  @property({ type: String, reflect: true }) size: IAltCoreToggleExternalProps['size'] = size
  @property({ type: String }) value: IAltCoreToggleExternalProps['value'] = value
  @property({ type: String, attribute: 'accessible-name' }) accessibleName: IAltCoreToggleExternalProps['accessibleName'] = accessibleName

  static readonly shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  }

  @bubblingEvent(
    ToggleCheckedEvent,
    { name: 'checked' },
  )
  private _checked!: TDispatcher<ToggleCheckedEvent>

  private readonly baseClass = tagName
  private readonly baseLabelClass = `${tagName}__label`
  private readonly baseAnnotationClass = `${tagName}__annotation`

  @state() private hasAnnotationSlot = false
  @state() private isHovered = false
  @state() private slottedAnnotationText = ''
  private defaultChecked = false

  private get toggleClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_alignment-${this.alignment}`]: Boolean(this.alignment),
      [`${this.baseClass}_disabled`]: this.isDisabled,
      [`${this.baseClass}_tooltip`]: Boolean(this.labelTooltipText),
    }
  }

  private get computedLabelClasses() {
    return {
      [this.baseLabelClass]: true,
      [`${this.baseLabelClass}_hidden`]: !this.labelText,
    }
  }
  private get computedAnnotationClasses() {
    return {
      [this.baseAnnotationClass]: true,
      [`${this.baseAnnotationClass}_hidden`]: !this.hasAnnotationSlot,
    }
  }

  private get hasInfoContent() {
    return this.labelText ||
      this.annotationText ||
      this.hasAnnotationSlot
  }

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreToggleVarsCSS)}
      ${unsafeCSS(AltCoreToggleScopedCSS)}
    `,
  ]

  private get isDisabled() {
    return Boolean(this.disabled) || this.formDisabled
  }

  protected get formValue() {
    return this.checked
      ? this.value || 'on'
      : null
  }

  protected resetFormControl() {
    if (Boolean(this.checked) === this.defaultChecked) return

    this.checked = this.defaultChecked
    this._checked({ detail: { checked: this.defaultChecked } })
  }

  protected firstUpdated() {
    this.defaultChecked = Boolean(this.checked)
  }

  private handleSlotAnnotationChange = (e: Event) => {
    const target = e.target as HTMLSlotElement

    this.hasAnnotationSlot = hasSlotContent(target)
    this.slottedAnnotationText = getSlotText(target)
  }

  private handleClick = (event: MouseEvent) => {
    event.stopPropagation()
    if (this.isDisabled) return

    this._checked({ detail: { checked: !this.checked } })
  }

  private handleChecked = (e: CustomEvent) => {
    e.stopPropagation()
  }

  private readonly handleMouseEnter = (event: Event) => {
    event.stopPropagation()

    this.isHovered = true
  }

  private readonly handleMouseLeave = (event: Event) => {
    event.stopPropagation()

    this.isHovered = false
  }


  protected renderInfoContent() {
    if (!this.hasInfoContent) return nothing

    return html`
      <div class=${`${this.baseClass}__info`}>
        <alt-core-label
          .text=${this.labelText}
          .tooltipText=${this.labelTooltipText}
          .tooltipActive=${!this.isDisabled}
          .alignment=${this.alignment}
          .debounce=${this.labelOverflowDebounce}
          .wrap=${true}
          .disabled=${this.isDisabled}
          class=${classMap(this.computedLabelClasses)}
          @content-mouse-enter=${this.handleMouseEnter}
          @content-mouse-leave=${this.handleMouseLeave}
        >
          <slot slot="tooltip-content" name="tooltip-content"></slot>
        </alt-core-label>

        <div class=${`${this.baseClass}__annotation-wrapper`}>
          <alt-core-annotation
            .disabled=${this.isDisabled}
            class=${classMap(this.computedAnnotationClasses)}
            @mouseenter=${this.handleMouseEnter}
            @mouseleave=${this.handleMouseLeave}
          >
            <slot slot="annotation" name="annotation" @slotchange=${this.handleSlotAnnotationChange}>
              ${this.annotationText}
            </slot>
          </alt-core-annotation>
        </div>
      </div>`
  }

  protected render() {
    return html`
      <div class=${classMap(this.toggleClasses)} @click=${this.handleClick}>
        <alt-core-simple-toggle
          .size=${this.size}
          .disabled=${this.isDisabled}
          .checked=${this.checked}
          .hovered=${this.isHovered}
          .accessibleName=${this.accessibleName || this.labelText || undefined}
          .accessibleDescription=${getAccessibleDescription(undefined, this.annotationText || this.slottedAnnotationText)}
          class=${`${this.baseClass}__toggle`}
          @checked=${this.handleChecked}
          @mouseenter=${this.handleMouseEnter}
          @mouseleave=${this.handleMouseLeave}
        >
        </alt-core-simple-toggle>

        ${this.renderInfoContent()}
      </div>
    `
  }
}
