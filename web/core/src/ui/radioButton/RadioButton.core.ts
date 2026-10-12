import { html, LitElement, css, unsafeCSS, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

import { type TDispatcher, bubblingEvent } from '~core/utils/event-decorator'
import { hasSlotContent } from '~core/utils/lit-slots'
import { YCoreRadioButtonTagName as tagName } from '~shared/constants'
import {
  createCoreRadioButtonExternalProps,
  RadioButtonCheckedEvent,
  type IYCoreRadioButtonExternalProps,
} from './models/types'

import YCoreRadioButtonScopedCSS from '~core/ui/radioButton/css/RadioButton.scoped.css?inline'
import YCoreRadioButtonVarsCSS from '~core/ui/radioButton/css/RadioButton.vars.css?inline'
import { alignmentContextCreated, groupValueContextCreated, sizeContextCreated } from '~core/ui/radioButtonGroup/providers'
import { consume } from '@lit/context'

import '~core/ui/annotation'
import '~core/ui/error'
import '~core/ui/simpleRadioButton'
import '~core/ui/label'
import { withLocator } from '~core/utils/locator'

const { size, name, checked, value, disabled, labelText, labelTooltipText, annotationText, errors, labelOverflowDebounce, alignment, required } = createCoreRadioButtonExternalProps()

@customElement(tagName)
@withLocator(tagName)
export class YCoreRadioButton extends LitElement implements Omit<IYCoreRadioButtonExternalProps, 'error'> {
  @consume({ context: sizeContextCreated, subscribe: true })
  @property({ type: String, reflect: true }) size: IYCoreRadioButtonExternalProps['size'] = size
  @property({ type: Boolean, reflect: true }) checked: IYCoreRadioButtonExternalProps['checked'] = checked
  @property({ type: String, reflect: true }) value: IYCoreRadioButtonExternalProps['value'] = value
  @property({ type: Boolean }) disabled: IYCoreRadioButtonExternalProps['disabled'] = disabled
  @property({ type: String }) name: IYCoreRadioButtonExternalProps['name'] = name
  @consume({ context: alignmentContextCreated, subscribe: true })
  @property({ type: String, reflect: true }) alignment: IYCoreRadioButtonExternalProps['alignment'] = alignment
  @property({ type: String, attribute: 'label-text' }) labelText: IYCoreRadioButtonExternalProps['labelText'] = labelText
  @property({ type: String, attribute: 'label-tooltip-text' }) labelTooltipText: IYCoreRadioButtonExternalProps['labelTooltipText'] = labelTooltipText
  @property({ type: Boolean }) required: IYCoreRadioButtonExternalProps['required'] = required
  @property({ type: String, attribute: 'annotation-text' }) annotationText: IYCoreRadioButtonExternalProps['annotationText'] = annotationText
  @property({ type: Number, attribute: 'label-overflow-debounce' }) labelOverflowDebounce: IYCoreRadioButtonExternalProps['labelOverflowDebounce'] = labelOverflowDebounce
  @property({ type: Array }) errors: IYCoreRadioButtonExternalProps['errors'] = errors

  @consume({ context: groupValueContextCreated, subscribe: true })
  @state() private groupValue: IYCoreRadioButtonExternalProps['value']

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

  private get radioButtonClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_alignment-${this.alignment}`]: Boolean(this.alignment),
      [`${this.baseClass}_size-${this.size}`]: Boolean(this.size),
      [`${this.baseClass}_tooltip`]: Boolean(this.labelTooltipText),
      [`${this.baseClass}_disabled`]: Boolean(this.disabled),
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
      ${unsafeCSS(YCoreRadioButtonVarsCSS)}
      ${unsafeCSS(YCoreRadioButtonScopedCSS)}
      `,
  ]

  private handleSlotAnnotationChange = (e: Event) => {
    const target = e.target as HTMLSlotElement

    this.hasAnnotationSlot = hasSlotContent(target)
  }

  private handleClick = (event: Event) => {
    if (this.disabled) return
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

  updated() {
    this.checked = this.computedChecked
  }


  protected render() {
    return html`
      <div
        class=${classMap(this.radioButtonClasses)}
        @click=${this.handleClick}
      >
        <div class=${`${this.baseClass}__content`}>
          <y-core-simple-radio-button
            .size=${this.size}
            .checked=${this.checked}
            .disabled=${this.disabled}
            .error=${Boolean(this.errors?.length)}
            .hovered=${this.isHovered}
            .name=${this.name}
            class=${`${this.baseClass}__radio-button`}
            @checked=${this.handleChecked}
            @mouseenter=${this.handleMouseEnter}
            @mouseleave=${this.handleMouseLeave}
          >
          </y-core-simple-radio-button>

          <div class=${`${this.baseClass}__info`}>
            <y-core-label
              .text=${this.labelText}
              .tooltipText=${this.labelTooltipText}
              .alignment=${this.alignment}
              .debounce=${this.labelOverflowDebounce}
              .wrap=${true}
              .required=${this.required}
              .tooltipActive=${!this.disabled}
              .disabled=${this.disabled}
              class=${classMap(this.computedLabelClasses)}
              @content-mouse-enter=${this.handleMouseEnter}
              @content-mouse-leave=${this.handleMouseLeave}
            >
              <slot slot="tooltip-content" name="tooltip-content"></slot>
            </y-core-label>

            <y-core-annotation
              .disabled=${this.disabled}
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
            </y-core-annotation>

          </div>
        </div>
        ${!this.disabled
          ? html`
              <y-core-error
                class=${`${this.baseClass}__error`}
                .errors=${this.errors}
              ></y-core-error>
            `
          : nothing
        }
      </div>
    `
  }
}
