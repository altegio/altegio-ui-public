import { html, LitElement, css, unsafeCSS, nothing } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import type { PropertyValues } from 'lit'
import { classMap } from 'lit/directives/class-map.js'

import { type TDispatcher, bubblingEvent } from '~core/utils/event-decorator'
import { hasSlotContent } from '~core/utils/lit-slots'
import { AltCoreRadioButtonTagName as tagName, AltCoreRadioButtonGroupTagName } from '~shared/constants'
import {
  createCoreRadioButtonExternalProps,
  RadioButtonCheckedEvent,
  type IAltCoreRadioButtonExternalProps,
} from './models/types'

import AltCoreRadioButtonScopedCSS from '~core/ui/radioButton/css/RadioButton.scoped.css?inline'
import AltCoreRadioButtonVarsCSS from '~core/ui/radioButton/css/RadioButton.vars.css?inline'
import { alignmentContextCreated, groupValueContextCreated, requiredContextCreated, sizeContextCreated, tabStopValueContextCreated } from '~core/ui/radioButtonGroup/providers'
import { consume } from '@lit/context'

import '~core/ui/annotation'
import '~core/ui/error'
import '~core/ui/simpleRadioButton'
import '~core/ui/label'
import { withLocator } from '~core/utils/locator'
import { FormAssociated, getNativeValidity } from '~core/utils/a11y/form-associated'
import { getAccessibleDescription } from '~core/utils/a11y/accessible-text'

const { size, name, checked, value, disabled, labelText, labelTooltipText, annotationText, errors, labelOverflowDebounce, alignment, required, accessibleName } = createCoreRadioButtonExternalProps()

@customElement(tagName)
@withLocator(tagName)
export class AltCoreRadioButton extends FormAssociated(LitElement) implements Omit<IAltCoreRadioButtonExternalProps, 'error'> {
  @consume({ context: sizeContextCreated, subscribe: true })
  @property({ type: String, reflect: true }) size: IAltCoreRadioButtonExternalProps['size'] = size
  @property({ type: Boolean, reflect: true }) checked: IAltCoreRadioButtonExternalProps['checked'] = checked
  @property({ type: String, reflect: true }) value: IAltCoreRadioButtonExternalProps['value'] = value
  @property({ type: Boolean }) disabled: IAltCoreRadioButtonExternalProps['disabled'] = disabled
  @property({ type: String, reflect: true }) name: IAltCoreRadioButtonExternalProps['name'] = name
  @consume({ context: alignmentContextCreated, subscribe: true })
  @property({ type: String, reflect: true }) alignment: IAltCoreRadioButtonExternalProps['alignment'] = alignment
  @property({ type: String, attribute: 'label-text' }) labelText: IAltCoreRadioButtonExternalProps['labelText'] = labelText
  @property({ type: String, attribute: 'label-tooltip-text' }) labelTooltipText: IAltCoreRadioButtonExternalProps['labelTooltipText'] = labelTooltipText
  @property({ type: Boolean }) required: IAltCoreRadioButtonExternalProps['required'] = required
  @property({ type: String, attribute: 'annotation-text' }) annotationText: IAltCoreRadioButtonExternalProps['annotationText'] = annotationText
  @property({ type: Number, attribute: 'label-overflow-debounce' }) labelOverflowDebounce: IAltCoreRadioButtonExternalProps['labelOverflowDebounce'] = labelOverflowDebounce
  @property({ type: Array }) errors: IAltCoreRadioButtonExternalProps['errors'] = errors
  @property({ type: String, attribute: 'accessible-name' }) accessibleName: IAltCoreRadioButtonExternalProps['accessibleName'] = accessibleName

  static readonly shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  }

  @consume({ context: groupValueContextCreated, subscribe: true })
  @state() private groupValue: IAltCoreRadioButtonExternalProps['value']

  @consume({ context: tabStopValueContextCreated, subscribe: true })
  @state() private groupTabStopValue: IAltCoreRadioButtonExternalProps['value']

  @consume({ context: requiredContextCreated, subscribe: true })
  @state() private groupRequired: boolean | undefined

  @query('alt-core-simple-radio-button') private control?: HTMLElement

  @bubblingEvent(
    RadioButtonCheckedEvent,
    { name: 'checked' },
  )
  private _checked!: TDispatcher<RadioButtonCheckedEvent>

  private readonly baseClass = tagName
  private readonly baseLabelClass = `${tagName}__label`
  private readonly baseAnnotationClass = `${tagName}__annotation`

  @state() private hasAnnotationSlot = false
  @state() private isHovered = false
  private defaultChecked = false

  private get radioButtonClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_alignment-${this.alignment}`]: Boolean(this.alignment),
      [`${this.baseClass}_size-${this.size}`]: Boolean(this.size),
      [`${this.baseClass}_tooltip`]: Boolean(this.labelTooltipText),
      [`${this.baseClass}_disabled`]: this.isDisabled,
      [`${this.baseClass}_hovered`]: this.isHovered,
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

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreRadioButtonVarsCSS)}
      ${unsafeCSS(AltCoreRadioButtonScopedCSS)}
      `,
  ]

  private handleSlotAnnotationChange = (e: Event) => {
    const target = e.target as HTMLSlotElement

    this.hasAnnotationSlot = hasSlotContent(target)
  }

  get isDisabled() {
    return Boolean(this.disabled) || this.formDisabled
  }

  /** Whether Tab reaches the radio button: a group keeps only one of its radio buttons in the tab order */
  private get isTabStop() {
    return this.groupTabStopValue === undefined || this.groupTabStopValue === this.value
  }

  protected get formValue() {
    return this.checked
      ? String(this.value ?? 'on')
      : null
  }

  /** Radio buttons that are checked together: the ones of the surrounding group, or those with the same name in the same form */
  private get relatedRadioButtons(): AltCoreRadioButton[] {
    const group = this.closest(AltCoreRadioButtonGroupTagName)
    if (group) return Array.from(group.querySelectorAll<AltCoreRadioButton>(tagName))
    if (!this.name) return [this]

    const scope = this.form ?? this.getRootNode() as ParentNode
    return Array.from(scope.querySelectorAll<AltCoreRadioButton>(tagName))
      .filter((radioButton) => radioButton.name === this.name && radioButton.form === this.form)
  }

  /** Like native radio buttons, the group misses a value while it is required and none of its radio buttons is checked */
  protected get formValidity() {
    const radioButtons = this.relatedRadioButtons
    const required = Boolean(this.groupRequired) || radioButtons.some((radioButton) => radioButton.required)

    return getNativeValidity(
      // A radio button without a name forms no group and never misses a value
      { type: 'radio', name: this.name, required },
      { checked: radioButtons.some((radioButton) => radioButton.checked) },
      this.control,
    )
  }

  protected resetFormControl() {
    // A radio button cannot uncheck itself, so the initially checked one checks itself again
    if (this.defaultChecked && !this.checked) {
      this._checked({ detail: { checked: true, value: this.value } })
    }
  }

  protected firstUpdated() {
    this.defaultChecked = Boolean(this.computedChecked)
  }

  private handleClick = (event: Event) => {
    if (this.isDisabled) return
    event.stopPropagation()

    if (!this.checked) {
      this._checked({ detail: { checked: true, value: this.value } })
    }
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

  private get computedChecked() {
    if (this.value !== undefined) {
      return this.value === this.groupValue
    }

    return this.checked
  }

  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties)

    this.checked = this.computedChecked

    // The validity of the group depends on every radio button in it
    if (changedProperties.has('checked') || changedProperties.has('required')) {
      this.relatedRadioButtons
        .filter((radioButton) => radioButton !== this)
        .forEach((radioButton) => { radioButton.requestUpdate() })
    }
  }


  protected render() {
    return html`
      <div
        class=${classMap(this.radioButtonClasses)}
        @click=${this.handleClick}
      >
        <div class=${`${this.baseClass}__content`}>
          <alt-core-simple-radio-button
            .size=${this.size}
            .checked=${this.checked}
            .disabled=${this.isDisabled}
            .error=${Boolean(this.errors?.length)}
            .hovered=${this.isHovered}
            .name=${this.name}
            .tabStop=${this.isTabStop}
            .accessibleName=${this.accessibleName || this.labelText || undefined}
            .accessibleDescription=${getAccessibleDescription(this.errors, this.annotationText)}
            class=${`${this.baseClass}__radio-button`}
            @checked=${this.handleChecked}
            @mouseenter=${this.handleMouseEnter}
            @mouseleave=${this.handleMouseLeave}
          >
          </alt-core-simple-radio-button>

          <div class=${`${this.baseClass}__info`}>
            <alt-core-label
              .text=${this.labelText}
              .tooltipText=${this.labelTooltipText}
              .alignment=${this.alignment}
              .debounce=${this.labelOverflowDebounce}
              .wrap=${true}
              .required=${this.required}
              .tooltipActive=${!this.isDisabled}
              .disabled=${this.isDisabled}
              class=${classMap(this.computedLabelClasses)}
              @content-mouse-enter=${this.handleMouseEnter}
              @content-mouse-leave=${this.handleMouseLeave}
            >
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
                class=${`${this.baseClass}__error`}
                .errors=${this.errors}
              ></alt-core-error>
            `
          : nothing
        }
      </div>
    `
  }
}
