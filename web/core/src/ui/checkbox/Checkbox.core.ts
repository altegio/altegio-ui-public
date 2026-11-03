import { html, LitElement, css, unsafeCSS, nothing } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

import { type TDispatcher, bubblingEvent } from '~core/utils/event-decorator'
import { hasSlotContent } from '~core/utils/lit-slots'
import { AltCoreCheckboxTagName as tagName, AltCoreAnnotationTagName, AltCoreErrorTagName, AltCoreLabelTagName, AltCoreSimpleCheckboxTagName } from '~shared/constants'
import {
  createCoreCheckboxProps,
  CheckboxCheckedEvent,
  type IAltCoreCheckboxProps,
} from './models/types'

import AltCoreCheckboxScopedCSS from '~core/ui/checkbox/css/Checkbox.scoped.css?inline'
import AltCoreCheckboxVarsCSS from '~core/ui/checkbox/css/Checkbox.vars.css?inline'

import '~core/ui/annotation'
import '~core/ui/error'
import '~core/ui/simpleCheckbox'
import '~core/ui/label'
import { defineCustomElement } from '~web/shared/utils/components'
import { AltCoreSimpleCheckbox } from '~core/ui/simpleCheckbox'
import { AltCoreLabel } from '~core/ui/label'
import { AltCoreAnnotation } from '~core/ui/annotation'
import { AltCoreError } from '~core/ui/error'
import { withLocator } from '~core/utils/locator'
import { FormAssociated, getNativeValidity } from '~core/utils/a11y/form-associated'
import { getAccessibleDescription, getSlotText } from '~core/utils/a11y/accessible-text'

const { size, checked, indeterminate, disabled, labelText, labelTooltipText, annotationText, errors, labelOverflowDebounce, alignment, required, labelTooltipPlacement, value, accessibleName } = createCoreCheckboxProps()

@customElement(tagName)
@withLocator(tagName)
export class AltCoreCheckbox extends FormAssociated(LitElement) implements IAltCoreCheckboxProps {
  @property({ type: String, reflect: true }) size: IAltCoreCheckboxProps['size'] = size
  @property({ type: Boolean, reflect: true }) checked: IAltCoreCheckboxProps['checked'] = checked
  @property({ type: Boolean, reflect: true }) indeterminate: IAltCoreCheckboxProps['indeterminate'] = indeterminate
  @property({ type: Boolean }) disabled: IAltCoreCheckboxProps['disabled'] = disabled
  @property({ type: String, reflect: true }) alignment: IAltCoreCheckboxProps['alignment'] = alignment
  @property({ type: String, attribute: 'label-text' }) labelText: IAltCoreCheckboxProps['labelText'] = labelText
  @property({ type: String, attribute: 'label-tooltip-text' }) labelTooltipText: IAltCoreCheckboxProps['labelTooltipText'] = labelTooltipText
  @property({ type: Boolean, attribute: 'required' }) required: IAltCoreCheckboxProps['required'] = required
  @property({ type: String, attribute: 'annotation-text' }) annotationText: IAltCoreCheckboxProps['annotationText'] = annotationText
  @property({ type: Number, attribute: 'label-overflow-debounce' }) labelOverflowDebounce: IAltCoreCheckboxProps['labelOverflowDebounce'] = labelOverflowDebounce
  @property({ type: Array }) errors: IAltCoreCheckboxProps['errors'] = errors
  @property({ type: String, attribute: 'label-tooltip-placement' }) labelTooltipPlacement: IAltCoreCheckboxProps['labelTooltipPlacement'] = labelTooltipPlacement
  @property({ type: String }) value: IAltCoreCheckboxProps['value'] = value
  @property({ type: String, attribute: 'accessible-name' }) accessibleName: IAltCoreCheckboxProps['accessibleName'] = accessibleName

  static readonly shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  }

  @query(AltCoreSimpleCheckboxTagName) private readonly control?: HTMLElement

  @bubblingEvent(
    CheckboxCheckedEvent,
    { name: 'checked' },
  )
  private _checked!: TDispatcher<CheckboxCheckedEvent>

  private readonly baseClass = tagName
  private readonly baseLabelClass = `${tagName}__label`
  private readonly baseAnnotationClass = `${tagName}__annotation`
  private readonly baseInfoClass = `${tagName}__info`
  private readonly baseErrorClass = `${tagName}__error`

  @state() private hasAnnotationSlot = false
  @state() private hasLabelSlot = false
  @state() private slottedLabelText = ''
  @state() private slottedAnnotationText = ''
  private defaultChecked = false
  @state() private isHovered = false

  private get checkboxClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_alignment-${this.alignment}`]: Boolean(this.alignment),
      [`${this.baseClass}_size-${this.size}`]: Boolean(this.size),
      [`${this.baseClass}_tooltip`]: Boolean(this.labelTooltipText),
      [`${this.baseClass}_disabled`]: this.isDisabled,
      [`${this.baseClass}_hovered`]: this.isHovered,
    }
  }

  private get computedInfoClasses() {
    return {
      [this.baseInfoClass]: true,
      [`${this.baseInfoClass}_hidden`]: !this.labelText && !this.annotationText && !this.hasAnnotationSlot,
    }
  }

  private get computedErrorClasses() {
    return {
      [this.baseErrorClass]: true,
      [`${this.baseErrorClass}_hidden`]: !this.shownErrors?.length,
    }
  }

  private get computedLabelClasses() {
    return {
      [this.baseLabelClass]: true,
      [`${this.baseLabelClass}_hidden`]: !this.labelText && !this.hasLabelSlot,
    }
  }
  private get computedAnnotationClasses() {
    return {
      [this.baseAnnotationClass]: true,
      [`${this.baseAnnotationClass}_hidden`]: !this.annotationText && !this.hasAnnotationSlot,
    }
  }

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreCheckboxVarsCSS)}
      ${unsafeCSS(AltCoreCheckboxScopedCSS)}
      `,
  ]

  private get isDisabled() {
    return Boolean(this.disabled) || this.formDisabled
  }

  private get controlAccessibleName() {
    return this.accessibleName || this.labelText || this.slottedLabelText || undefined
  }

  private get controlAccessibleDescription() {
    return getAccessibleDescription(
      this.shownErrors,
      this.annotationText || this.slottedAnnotationText,
    )
  }

  protected get formValue() {
    return this.checked
      ? this.value || 'on'
      : null
  }

  /** Errors to render, with the message from `validate()` when there are none */
  private get shownErrors() {
    return this.withValidationError(this.errors)
  }

  protected get formValidity() {
    return getNativeValidity(
      { type: 'checkbox', required: this.required },
      { checked: Boolean(this.checked) },
      this.control,
    )
  }

  protected resetFormControl() {
    if (Boolean(this.checked) === this.defaultChecked) return

    this.checked = this.defaultChecked
    this._checked({ detail: { checked: this.defaultChecked } })
  }

  private handleSlotAnnotationChange = (e: Event) => {
    const target = e.target as HTMLSlotElement

    this.hasAnnotationSlot = hasSlotContent(target)
    this.slottedAnnotationText = getSlotText(target)
  }

  private handleSlotLabelChange = (e: Event) => {
    const target = e.target as HTMLSlotElement

    this.hasLabelSlot = hasSlotContent(target)
    this.slottedLabelText = getSlotText(target)
  }

  private handleClick = (event: Event) => {
    if (this.isDisabled) return

    event.stopPropagation()

    this._checked({ detail: { checked: !this.checked } })
  }

  private handleChecked = (event: Event) => {
    event.stopPropagation()

    this.handleClick(event)
  }

  private handleMouseEnter = (event: Event) => {
    event.stopPropagation()

    this.isHovered = true
  }

  private handleMouseLeave = (event: Event) => {
    event.stopPropagation()

    this.isHovered = false
  }


  protected firstUpdated(): void {
    this.defaultChecked = Boolean(this.checked)

    defineCustomElement(tagName, AltCoreCheckbox)
    defineCustomElement(AltCoreSimpleCheckboxTagName, AltCoreSimpleCheckbox)
    defineCustomElement(AltCoreLabelTagName, AltCoreLabel)
    defineCustomElement(AltCoreAnnotationTagName, AltCoreAnnotation)
    defineCustomElement(AltCoreErrorTagName, AltCoreError)
  }

  protected render() {
    return html`
      <div
        class=${classMap(this.checkboxClasses)}
        @click=${this.handleClick}
      >
        <div class=${`${this.baseClass}__content`}>
          <alt-core-simple-checkbox
            .size=${this.size}
            .checked=${this.checked}
            .indeterminate=${this.indeterminate}
            .disabled=${this.isDisabled}
            .error=${Boolean(this.shownErrors?.length)}
            .hovered=${this.isHovered}
            .accessibleName=${this.controlAccessibleName}
            .accessibleDescription=${this.controlAccessibleDescription}
            .accessibleRequired=${this.required}
            class=${`${this.baseClass}__checkbox`}
            @checked=${this.handleChecked}
            @mouseenter=${this.handleMouseEnter}
            @mouseleave=${this.handleMouseLeave}
          >
          </alt-core-simple-checkbox>

          <div class=${classMap(this.computedInfoClasses)}>
            <alt-core-label
              .text=${this.labelText}
              .tooltipText=${this.labelTooltipText}
              .alignment=${this.alignment}
              .debounce=${this.labelOverflowDebounce}
              .wrap=${true}
              .required=${this.required}
              .tooltipActive=${!this.isDisabled}
              .disabled=${this.isDisabled}
              .tooltipPlacement=${this.labelTooltipPlacement}
              class=${classMap(this.computedLabelClasses)}
              @content-mouse-enter=${this.handleMouseEnter}
              @content-mouse-leave=${this.handleMouseLeave}
            >
              <slot name="label" slot="label" @slotchange=${this.handleSlotLabelChange}>${this.labelText}</slot>
              
              <slot slot="tooltip-content" name="tooltip-content"></slot>
            </alt-core-label>

            <alt-core-annotation
              .disabled=${this.isDisabled}
              class=${classMap(this.computedAnnotationClasses)}
              @mouseenter=${this.handleMouseEnter}
              @mouseleave=${this.handleMouseLeave}
            >
              <slot
                slot="annotation"
                name="annotation"
                @slotchange=${this.handleSlotAnnotationChange}
              >
                ${this.annotationText}
              </slot>
            </alt-core-annotation>
          </div>
        </div>
        ${!this.isDisabled
          ? html`
              <alt-core-error
                class=${classMap(this.computedErrorClasses)}
                .errors=${this.shownErrors}
              ></alt-core-error>
            `
          : nothing
        }
      </div>
    `
  }
}
