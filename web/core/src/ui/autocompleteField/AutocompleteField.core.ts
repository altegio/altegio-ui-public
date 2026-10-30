import { css, html, LitElement, nothing, unsafeCSS } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { interceptEvents } from '~core/utils/event-interceptor'
import { classMap } from 'lit/directives/class-map.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { repeat } from 'lit/directives/repeat.js'
import { provide } from '@lit/context'
import { debounce } from 'radash'
import { autoPlacement as autoPlacementMiddleware } from '@floating-ui/dom'

import { AltCoreDropdownCellTagName, AltCoreFieldInputTagName, AltCoreAutocompleteFieldTagName as tagName } from '~shared/constants'

import {
  disabledContextCreated,
  errorContextCreated,
  readonlyContextCreated,
  sizeContextCreated,
} from '~core/ui/fieldWrapper/providers'
import { bubblingEvent, type TDispatcher } from '~core/utils/event-decorator'
import type {
  IAltCoreAutocompleteFieldExternalProps,
  TAltCoreAutocompleteFieldAutocompleteOption,
  TAltCoreAutocompleteFieldInfo,
} from './models/types'
import {
  BlurEvent,
  ChangeEvent,
  createCoreAutocompleteFieldExternalProps,
  FocusEvent,
  SelectOptionEvent,
} from './models/types'
import CoreAutocompleteFieldVarsCSS from './css/AutocompleteField.vars.css?inline'
import CoreAutocompleteFieldScopedCSS from './css/AutocompleteField.scoped.css?inline'

import { type AltCoreFieldInput } from '~core/ui/fieldInput'

import '~core/ui/fieldWrapper'
import '~core/ui/fieldInput'
import '~core/ui/fieldIcon'
import '~core/ui/dropdown'
import '~core/ui/dropdownCellText'
import '~core/ui/dropdownList'
import '~core/ui/emptyState'
import '~core/ui/loader'
import '~core/ui/searchTextHighlighted'

import { preventAndStopEvent } from '~shared/utils/helpers'
import { EAltCoreDropdownPlacement, EAltCoreDropdownTrigger } from '~core/ui/dropdown/models/types'
import type { VisibleEvent } from '~core/ui/dropdown/models/types/events'
import type { InputEvent } from '~core/ui/fieldInput/models/types'
import { hasSlotContent } from '~core/utils/lit-slots'
import { booleanConverter } from '~core/utils/converters'
import classMapToString from '~core/utils/classMapToString'
import { renderAnnotation, renderError, renderLabel } from '~core/renderers'
import { EAltSizes } from '~shared/types/global'
import { EAltCoreLoaderVariant } from '~core/ui/loader/models/types'

import { altClose } from '~shared/icons'
import { EAltCoreTextSize, EAltCoreTextVariant } from '../text/models/types'
import { withLocator } from '~core/utils/locator'

const {
  value,
  name,
  placeholder,
  autofocus,
  disabled,
  readonly,
  error,
  errors,
  size,
  required,
  labelText,
  labelDebounce,
  labelTooltipText,
  annotationText,
  minSearchLength,
  disabledAutocomplete,
  searchFunction,
  emptyStateTitle,
  emptyStateDescription,
  emptyStateIcon,
} = createCoreAutocompleteFieldExternalProps()

const DROPDOWN_DELAY = 300

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class AltCoreAutocompleteField extends LitElement implements IAltCoreAutocompleteFieldExternalProps {
  @provide({ context: disabledContextCreated })
  @property({ type: Boolean }) disabled: IAltCoreAutocompleteFieldExternalProps['disabled'] = disabled
  @provide({ context: readonlyContextCreated })
  @property({ type: Boolean }) readonly: IAltCoreAutocompleteFieldExternalProps['readonly'] = readonly
  @provide({ context: errorContextCreated })
  @property({ type: Boolean, reflect: true, converter: booleanConverter }) error: IAltCoreAutocompleteFieldExternalProps['error'] = error
  @provide({ context: sizeContextCreated })
  @property({ type: String, reflect: true }) size: IAltCoreAutocompleteFieldExternalProps['size'] = size
  @property({ type: String }) value: IAltCoreAutocompleteFieldExternalProps['value'] = value
  @property({ type: String }) name: IAltCoreAutocompleteFieldExternalProps['name'] = name
  @property({ type: String }) placeholder: IAltCoreAutocompleteFieldExternalProps['placeholder'] = placeholder
  @property({
    type: Boolean,
    reflect: true,
  }) autofocus: NonNullable<IAltCoreAutocompleteFieldExternalProps['autofocus']> = Boolean(autofocus)
  @property({ type: Boolean, reflect: true }) required: IAltCoreAutocompleteFieldExternalProps['required'] = required
  @property({ type: Array }) errors: IAltCoreAutocompleteFieldExternalProps['errors'] = errors
  @property({ type: String, attribute: 'label-text' }) labelText: IAltCoreAutocompleteFieldExternalProps['labelText'] = labelText
  @property({ type: Number, attribute: 'label-debounce' }) labelDebounce: IAltCoreAutocompleteFieldExternalProps['labelDebounce'] = labelDebounce
  @property({ type: String, attribute: 'label-tooltip-text' }) labelTooltipText: IAltCoreAutocompleteFieldExternalProps['labelTooltipText'] = labelTooltipText
  @property({ type: String, attribute: 'annotation-text' }) annotationText: IAltCoreAutocompleteFieldExternalProps['annotationText'] = annotationText
  @property({ type: Number, attribute: 'min-search-length' }) minSearchLength: IAltCoreAutocompleteFieldExternalProps['minSearchLength'] = minSearchLength
  @property({ type: Boolean, attribute: 'disabled-autocomplete' }) disabledAutocomplete: IAltCoreAutocompleteFieldExternalProps['disabledAutocomplete'] = disabledAutocomplete
  @property({ type: String, attribute: 'empty-state-title' }) emptyStateTitle: IAltCoreAutocompleteFieldExternalProps['emptyStateTitle'] = emptyStateTitle
  @property({ type: String, attribute: 'empty-state-description' }) emptyStateDescription: IAltCoreAutocompleteFieldExternalProps['emptyStateDescription'] = emptyStateDescription
  @property({ type: Object, attribute: 'empty-state-icon' }) emptyStateIcon: IAltCoreAutocompleteFieldExternalProps['emptyStateIcon'] = emptyStateIcon
  @property({
    type: Function,
    attribute: 'search-function',
    converter: {
      fromAttribute: () => ({}),
      toAttribute: () => null,
    },
  }) searchFunction: IAltCoreAutocompleteFieldExternalProps['searchFunction'] = searchFunction

  @bubblingEvent(
    FocusEvent,
    { name: 'focus' },
  )
  _focus!: TDispatcher<FocusEvent>

  @bubblingEvent(
    BlurEvent,
    { name: 'blur' },
  )
  _blur!: TDispatcher<BlurEvent>

  @bubblingEvent(
    SelectOptionEvent,
    { name: 'select-option' },
  )
  _selectOption!: TDispatcher<SelectOptionEvent>

  @bubblingEvent(
    ChangeEvent,
    { name: 'change' },
  )
  _change!: TDispatcher<ChangeEvent>

  @query(AltCoreFieldInputTagName) public readonly fieldInput?: AltCoreFieldInput

  @state() private isOpened = false
  @state() private autocompleteOptions: TAltCoreAutocompleteFieldAutocompleteOption[] = []
  @state() private loadingAutocompleteOptions = false
  @state() private currentSearchRequestId = 0
  @state() private hasAnnotationSlot = false
  @state() private hasIconSlot = false

  private readonly baseClass = tagName
  private readonly baseDropdownActivatorClass = `${tagName}__activator`
  private readonly baseDropdownContentClass = `${tagName}__content`
  private readonly baseDropdownListItemClass = `${tagName}__list-item`
  private readonly baseDropdownListItemsClass = `${tagName}__list-items`
  private readonly baseDropdownListItemLoader = `${tagName}__list-loader`
  static readonly styles = [
    css`
      ${unsafeCSS(CoreAutocompleteFieldVarsCSS)}
      ${unsafeCSS(CoreAutocompleteFieldScopedCSS)}
    `,
  ]

  private get computedDisabledOrReadonly() {
    return this.disabled || this.readonly
  }


  private get isDropdownOpened() {
    if (this.disabled || this.readonly) return false

    return this.isOpened
  }


  private get dropdownMiddlewares() {
    const allowedPlacements = [EAltCoreDropdownPlacement.BOTTOM, EAltCoreDropdownPlacement.TOP]

    return [autoPlacementMiddleware({ allowedPlacements })]
  }


  private handleClickOutside = (event: VisibleEvent) => {
    event.stopPropagation()

    if (this.disabled || this.readonly) return

    this.isOpened = event.detail.value
  }

  private get computedClasses() {
    return { [this.baseClass]: true }
  }
  private get computedLabelClasses() {
    return { [`${this.baseClass}__label`]: true }
  }
  private get computedAnnotationClasses() {
    return {
      [`${this.baseClass}__annotation`]: true,
      [`${this.baseClass}__annotation_hide`]: !this.hasAnnotation,
    }
  }
  private get computedFieldWrapperClasses() {
    return { [`${this.baseClass}__field-wrapper`]: true }
  }

  private get hasAnnotation() {
    return this.annotationText || this.hasAnnotationSlot
  }

  private get isClearButtonVisible() {
    return Boolean(this.value) && !this.disabled && !this.readonly
  }

  private get isEmptyStateAvailable() {
    return Boolean(this.emptyStateTitle || this.emptyStateDescription)
  }

  private handleFocus = (event: FocusEvent) => {
    event.stopPropagation()

    if (this.disabled || this.readonly) return

    if (this.autocompleteOptions.length) {
      this.changeDropdownVisible(true)
    }

    this._focus()
  }

  private handleBlur = (event: BlurEvent) => {
    event.stopPropagation()

    if (this.disabled || this.readonly) return

    this._blur()
  }

  private handleSearchComplete(requestId: number) {
    if (requestId === this.currentSearchRequestId) {
      this.loadingAutocompleteOptions = false
      if (!this.autocompleteOptions.length && !this.isEmptyStateAvailable) {
        this.changeDropdownVisible(false)
      }
    }
  }

  private loadAutocompleteOptions = debounce({ delay: DROPDOWN_DELAY }, async(query: TAltCoreAutocompleteFieldInfo, minSearchLength: number) => {
    if (!this.searchFunction || query.value.length < minSearchLength) {
      this.autocompleteOptions = []

      this.changeDropdownVisible(false)
      return
    }

    const requestId = ++this.currentSearchRequestId

    this.changeDropdownVisible(true)
    this.loadingAutocompleteOptions = true

    try {
      const options = await this.searchFunction(query)

      if (requestId === this.currentSearchRequestId) {
        this.autocompleteOptions = options
      }
    } finally {
      this.handleSearchComplete(requestId)
    }
  })

  private makeSearch = (query: TAltCoreAutocompleteFieldInfo) => {
    const minSearchLength = this.minSearchLength ?? 0

    if (query.value.length < minSearchLength) {
      this.changeDropdownVisible(false)
      this.autocompleteOptions = []


      return
    }

    this.loadAutocompleteOptions(query, minSearchLength)
  }

  private handleInput = (event: InputEvent) => {
    event.stopPropagation()

    if (this.computedDisabledOrReadonly) return

    const detail = event.detail
    this._change({ detail })
    if (this.value !== detail.value) {
      this.value = detail.value

      if (this.disabledAutocomplete) return

      this.makeSearch(detail)
    }
  }

  changeDropdownVisible = (value: boolean) => {
    if (this.disabled || this.readonly) return

    this.isOpened = value
  }

  private handleSelectAutocompleteOption = (item: TAltCoreAutocompleteFieldAutocompleteOption) => (event: Event) => {
    if (this.computedDisabledOrReadonly || !event.currentTarget) return
    event.stopPropagation()

    this._selectOption({ detail: item })
    this.changeDropdownVisible(false)
    this.fieldInput?.inputElement?.blur()
  }

  private handleClear = () => {
    const detail = { value: '' }
    this.fieldInput?.inputElement?.focus()
    this.isOpened = false
    this.autocompleteOptions = []

    this.value = detail.value

    this._change({ detail })
  }

  private handleSlotAnnotationChange = (event: Event) => {
    preventAndStopEvent(event)

    const target = event.target as HTMLSlotElement

    this.hasAnnotationSlot = hasSlotContent(target)
  }

  private handleSlotIconChange = (event: Event) => {
    preventAndStopEvent(event)

    const target = event.target as HTMLSlotElement

    this.hasIconSlot = hasSlotContent(target)
  }

  private handleLabelClick = () => {
    this.fieldInput?.inputElement?.focus()
  }

  protected renderDropdownActivator() {
    return html`
      <alt-core-field-wrapper
        .disabled=${this.disabled}
        .readonly=${this.readonly}
        .error=${Boolean(this.errors?.length) || this.error}
        .size=${this.size}
        class=${classMap(this.computedFieldWrapperClasses)}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
      >
        <slot name="icon" 
        @slotchange=${this.handleSlotIconChange}></slot>
        <alt-core-field-input
          .value=${this.value}
          .name=${this.name}
          .placeholder=${this.placeholder}
          .required=${this.required}
          .autofocus=${this.autofocus}
          .hideSpaceRight=${Boolean(this.value)}
          .hideSpaceLeft=${this.hasIconSlot}
          type="text"
          @input=${this.handleInput}
        ></alt-core-field-input>
        ${this.isClearButtonVisible
          ? html`
            <alt-core-field-icon
              .icon=${altClose}
              hoverable
              @click=${this.handleClear}
            ></alt-core-field-icon>
          `
          : nothing
        }
      </alt-core-field-wrapper>
    `
  }

  protected renderDropdownListExtraSubtitles(option: TAltCoreAutocompleteFieldAutocompleteOption) {
    const extraSubtitles = option.additionalInfo ?? []

    return extraSubtitles.map((subtitle) => subtitle
      ? html`
        <alt-core-search-text-highlighted
          text=${ifDefined(subtitle)}
          .search=${this.value}
          .size=${EAltCoreTextSize.A2_REGULAR}
          .variant=${EAltCoreTextVariant.SECONDARY}
          .highlightTextSize=${EAltCoreTextSize.A2_REGULAR}
          .highlightTextVariant=${EAltCoreTextVariant.PRIMARY}
        ></alt-core-search-text-highlighted>`
      : nothing)
  }


  protected renderDropdownList() {
    return repeat(
      this.autocompleteOptions,
      (option) => option.id,
      (option) => html`
          <alt-core-dropdown-cell
            locator=${`${AltCoreDropdownCellTagName}_${option.id}`}
            @click=${this.handleSelectAutocompleteOption(option)}
          >
            <div class=${this.baseDropdownListItemClass} slot="content">
            <alt-core-dropdown-cell-text label=${ifDefined(option.value)}>
                <div slot="subtitle">
                  ${this.renderDropdownListExtraSubtitles(option)}
                </div>
              </alt-core-dropdown-cell-text>
            </div>
          </alt-core-dropdown-cell>
        `,
    )
  }

  private renderEmptyState() {
    if (!this.isEmptyStateAvailable) {
      return nothing
    }

    return html`
      <alt-core-empty-state 
        .title=${this.emptyStateTitle ?? ''}
        .description=${this.emptyStateDescription ?? ''}
        .icon=${this.emptyStateIcon}
      >
        <slot name="empty-state-actions" slot="actions"></slot>
      </alt-core-empty-state>
    `
  }

  private renderLoader() {
    if (!this.loadingAutocompleteOptions) {
      return nothing
    }

    return html`
      <div class=${this.baseDropdownListItemLoader}>
        <alt-core-loader
          .size=${EAltSizes.MEDIUM}
          .variant=${EAltCoreLoaderVariant.YELLOW}
        ></alt-core-loader>
      </div>
    `
  }

  protected renderDropdownContent() {
    return html`
      <alt-core-dropdown-list>
        <div 
          class=${this.baseDropdownListItemsClass}
          slot="list"
        >
          ${this.loadingAutocompleteOptions
            ? this.renderLoader()
            : this.autocompleteOptions.length === 0
              ? this.renderEmptyState()
              : html`
                <slot name="list">
                  ${this.renderDropdownList()}
                </slot>
              `
          }
        </div>
      </alt-core-dropdown-list>`
  }

  protected render() {
    return html`
      <div class=${classMap(this.computedClasses)}>
        ${renderLabel({
          text: this.labelText,
          tooltipText: this.labelTooltipText,
          debounce: this.labelDebounce,
          tooltipActive: !this.disabled,
          required: this.required,
          disabled: this.computedDisabledOrReadonly,
          handleClick: this.handleLabelClick,
          className: classMapToString(this.computedLabelClasses),
        })}
        <alt-core-dropdown
          .isOpen=${this.isDropdownOpened}
          .placement=${EAltCoreDropdownPlacement.BOTTOM}
          .trigger=${EAltCoreDropdownTrigger.MANUAL}
          .middlewares=${this.dropdownMiddlewares}
          strict-width
          @click-outside=${this.handleClickOutside}
        >
          <div slot="activator" class=${this.baseDropdownActivatorClass}>
              ${this.renderDropdownActivator()}
          </div>

          <div slot="content" class=${this.baseDropdownContentClass}>
            ${
              this.isDropdownOpened
                ? this.renderDropdownContent()
                : nothing
            }
          </div>
        </alt-core-dropdown>
        ${renderAnnotation({
          text: this.annotationText,
          disabled: this.computedDisabledOrReadonly,
          className: classMapToString(this.computedAnnotationClasses),
          handleSlotAnnotationChange: this.handleSlotAnnotationChange,
        })}
        ${renderError({ errors: this.errors })}
      </div>
    `
  }
}
