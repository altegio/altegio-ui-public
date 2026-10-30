import type { PropertyValues } from 'lit'
import { css, html, nothing, unsafeCSS } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { interceptEvents } from '~core/utils/event-interceptor'
import { classMap } from 'lit/directives/class-map.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { repeat } from 'lit/directives/repeat.js'
import { provide } from '@lit/context'
import { Maskito, type MaskitoOptions, maskitoTransform } from '@maskito/core'
import { debounce } from 'radash'
import { autoPlacement as autoPlacementMiddleware } from '@floating-ui/dom'

import { LocalizedElement } from '~core/i18n/LocalizedElement'
import { AltCoreDropdownCellTagName, AltCoreFieldInputTagName, AltCorePhoneFieldTagName as tagName } from '~shared/constants'

import {
  disabledContextCreated,
  errorContextCreated,
  readonlyContextCreated,
  sizeContextCreated,
} from '~core/ui/fieldWrapper/providers'
import { bubblingEvent, type TDispatcher } from '~core/utils/event-decorator'
import {
  BlurEvent,
  PhoneFieldChangeEvent,
  createCorePhoneFieldExternalProps,
  FocusEvent,
  SelectOptionEvent,
  type IAltCorePhoneFieldExternalProps,
  type TAltCorePhoneFieldAutocompleteOption,
  type TAltCorePhoneFieldInfoWithMeta,
} from '~core/ui/phoneField/models/types'
import AltCorePhoneFieldVarsCSS from '~core/ui/phoneField/css/PhoneField.vars.css?inline'
import AltCorePhoneFieldScopedCSS from '~core/ui/phoneField/css/PhoneField.scoped.css?inline'

import { type AltCoreFieldInput } from '~core/ui/fieldInput'

import '~core/ui/fieldWrapper'
import '~core/ui/fieldInput'
import '~core/ui/fieldIcon'
import '~core/ui/dropdown'
import '~core/ui/dropdownCellText'
import '~core/ui/dropdownList'
import '~core/ui/emptyState'
import '~core/ui/loader'
import '~core/ui/phoneCode'
import '~core/ui/text'
import '~core/ui/searchTextHighlighted'

import { defaultCountriesData } from '~shared/utils/countries'
import { preventAndStopEvent } from '~shared/utils/helpers'
import { EAltCoreDropdownPlacement, EAltCoreDropdownTrigger } from '~core/ui/dropdown/models/types'
import type { VisibleEvent } from '~core/ui/dropdown/models/types/events'
import type { InputEvent } from '~core/ui/fieldInput/models/types'
import { hasSlotContent } from '~core/utils/lit-slots'
import { booleanConverter } from '~core/utils/converters'
import classMapToString from '~core/utils/classMapToString'
import { renderAnnotation, renderError, renderLabel, renderIcon } from '~core/renderers'
import type { TAltInputAutocomplete } from '~shared/types/global'
import { EAltInputAutocomplete, EAltSizes } from '~shared/types/global'
import { EAltCoreLoaderVariant } from '~core/ui/loader/models/types'
import type { TAltCountry, TAltCountryNameMappedById } from '~shared/types/country'
import { styleMap } from 'lit/directives/style-map.js'
import { getMaskitoMaskByCountry, matchCountry } from '~shared/utils/countryHeplers'
import { EAltCoreTextSize, EAltCoreTextVariant } from '~core/ui/text/models/types'

import { altClose, altCheck } from '~shared/icons'
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
  withoutCodeSelection,
  disabledAutocomplete,
  countries,
  defaultCountryId,
  searchFunction,
  emptyStateTitle,
  emptyStateDescription,
  emptyStateIcon,
  optionPhonePrivacyEnabled,
} = createCorePhoneFieldExternalProps()

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class AltCorePhoneField extends LocalizedElement implements IAltCorePhoneFieldExternalProps {
  @provide({ context: disabledContextCreated })
  @property({ type: Boolean }) disabled: IAltCorePhoneFieldExternalProps['disabled'] = disabled
  @provide({ context: readonlyContextCreated })
  @property({ type: Boolean }) readonly: IAltCorePhoneFieldExternalProps['readonly'] = readonly
  @provide({ context: errorContextCreated })
  @property({ type: Boolean, reflect: true, converter: booleanConverter }) error: IAltCorePhoneFieldExternalProps['error'] = error
  @provide({ context: sizeContextCreated })
  @property({ type: String, reflect: true }) size: IAltCorePhoneFieldExternalProps['size'] = size
  @property({ type: String }) value: IAltCorePhoneFieldExternalProps['value'] = value
  @property({ type: String }) name: IAltCorePhoneFieldExternalProps['name'] = name
  @property({ type: String }) placeholder: IAltCorePhoneFieldExternalProps['placeholder'] = placeholder
  @property({
    type: Boolean,
    reflect: true,
  }) autofocus: NonNullable<IAltCorePhoneFieldExternalProps['autofocus']> = Boolean(autofocus)
  @property({ type: Boolean, reflect: true }) required: IAltCorePhoneFieldExternalProps['required'] = required
  @property({ type: Array }) errors: IAltCorePhoneFieldExternalProps['errors'] = errors
  @property({ type: String, attribute: 'label-text' }) labelText: IAltCorePhoneFieldExternalProps['labelText'] = labelText
  @property({ type: Number, attribute: 'label-debounce' }) labelDebounce: IAltCorePhoneFieldExternalProps['labelDebounce'] = labelDebounce
  @property({ type: String, attribute: 'label-tooltip-text' }) labelTooltipText: IAltCorePhoneFieldExternalProps['labelTooltipText'] = labelTooltipText
  @property({ type: String, attribute: 'annotation-text' }) annotationText: IAltCorePhoneFieldExternalProps['annotationText'] = annotationText
  @property({ type: Number, attribute: 'min-search-length' }) minSearchLength: IAltCorePhoneFieldExternalProps['minSearchLength'] = minSearchLength
  @property({ type: Boolean, attribute: 'without-code-selection' }) withoutCodeSelection: IAltCorePhoneFieldExternalProps['withoutCodeSelection'] = withoutCodeSelection
  @property({ type: Boolean, attribute: 'disabled-autocomplete' }) disabledAutocomplete: IAltCorePhoneFieldExternalProps['disabledAutocomplete'] = disabledAutocomplete
  @property({ type: Boolean, attribute: 'option-phone-privacy-enabled' }) optionPhonePrivacyEnabled: IAltCorePhoneFieldExternalProps['optionPhonePrivacyEnabled'] = optionPhonePrivacyEnabled
  @property({ type: Array }) countries: IAltCorePhoneFieldExternalProps['countries'] = countries
  @property({ type: Number, attribute: 'default-country-id' }) defaultCountryId: IAltCorePhoneFieldExternalProps['defaultCountryId'] = defaultCountryId
  @property({ type: String, attribute: 'empty-state-title' }) emptyStateTitle: IAltCorePhoneFieldExternalProps['emptyStateTitle'] = emptyStateTitle
  @property({ type: String, attribute: 'empty-state-description' }) emptyStateDescription: IAltCorePhoneFieldExternalProps['emptyStateDescription'] = emptyStateDescription
  @property({ type: Object, attribute: 'empty-state-icon' }) emptyStateIcon: IAltCorePhoneFieldExternalProps['emptyStateIcon'] = emptyStateIcon
  @property({
    type: Function,
    attribute: 'search-function',
    converter: {
      fromAttribute: () => ({}),
      toAttribute: () => null,
    },
  }) searchFunction: IAltCorePhoneFieldExternalProps['searchFunction'] = searchFunction

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
    PhoneFieldChangeEvent,
    { name: 'change' },
  )
  _change!: TDispatcher<PhoneFieldChangeEvent>

  @query(AltCoreFieldInputTagName) public readonly fieldInput?: AltCoreFieldInput

  @state() private isOpened = false
  @state() private isCountriesOpened = false
  @state() private autocompleteOptions: TAltCorePhoneFieldAutocompleteOption[] = []
  @state() private loadingAutocompleteOptions = false
  @state() private countryId = this.defaultCountryId || this.firstCountryIdInList
  @state() private ignoreAutoCountryDetection = false
  @state() private currentSearchRequestId = 0
  @state() private hasAnnotationSlot = false
  @state() private countryNames: TAltCountryNameMappedById | undefined

  private maskInstance?: Maskito

  private readonly baseClass = tagName
  private readonly baseDropdownActivatorClass = `${tagName}__activator`
  private readonly baseDropdownContentClass = `${tagName}__content`
  private readonly baseDropdownListItemClass = `${tagName}__list-item`
  private readonly baseDropdownListItemsClass = `${tagName}__list-items`
  private readonly baseDropdownListItemLoader = `${tagName}__list-loader`
  private readonly baseDropdownListItemAppendClass = `${tagName}__list-item-append`
  static readonly styles = [
    css`
      ${unsafeCSS(AltCorePhoneFieldVarsCSS)}
      ${unsafeCSS(AltCorePhoneFieldScopedCSS)}
    `,
  ]

  private get computedDropdownListStyles() {
    const minHeight = this.autocompleteOptions.length === 0 ? '125px' : 'auto'
    return { minHeight }
  }

  private get computedDisabledOrReadonly() {
    return this.disabled || this.readonly
  }

  private get refinedPhone(): string {
    if (!this.value) return ''

    return this.unmaskPhone(this.value)
  }

  private get phoneQuery() {
    return this.refinedPhone.replace(this.country.code, '')
  }

  private get country() {
    return this.getCountry(this.countryId)
  }

  private get countryList(): TAltCountry[] {
    if (this.countries) {
      return Object.values(this.countries)
    }

    return Object.keys(defaultCountriesData).map((id) => this.getDefaultCountry(parseInt(id, 10)))
  }

  private get firstCountryIdInList() {
    return this.countryList[0].id
  }

  private get maskOptions(): MaskitoOptions | undefined {
    return { mask: getMaskitoMaskByCountry(this.country, !this.withoutCodeSelection) }
  }

  private get isDropdownOpened() {
    if (this.disabled || this.readonly) return false

    return this.isOpened
  }

  private get isCountriesDropdownOpened() {
    if (this.disabled || this.readonly) return false

    return this.isCountriesOpened
  }

  private get dropdownMiddlewares() {
    const allowedPlacements = [EAltCoreDropdownPlacement.BOTTOM, EAltCoreDropdownPlacement.TOP]

    return [autoPlacementMiddleware({ allowedPlacements })]
  }

  private get maskedValue() {
    if (!this.maskOptions) return this.phoneQuery

    return maskitoTransform(this.phoneQuery, this.maskOptions)
  }

  private applyMask() {
    const { inputElement } = this.fieldInput ?? {}
    if (!inputElement) return

    this.destroyMask()

    if (!this.maskOptions) return

    this.maskInstance = new Maskito(
      inputElement,
      this.maskOptions,
    )
  }

  private destroyMask() {
    if (!this.maskInstance) return

    this.maskInstance.destroy()
  }

  private getDefaultCountry(countryId: TAltCountry['id']): TAltCountry {
    const countryName = this.countryNames?.[countryId]
    return {
      ...defaultCountriesData[countryId],
      title: countryName?.title ?? '',
      fullTitle: countryName?.fullTitle ?? '',
    }
  }

  private getCountry(countryId: TAltCountry['id']): TAltCountry {
    if (this.countries) {
      return this.countries[countryId]
    }

    return this.getDefaultCountry(countryId)
  }

  private unmaskPhone = (phone: string) => {
    return phone.replace(/\D+/g, '')
  }

  private getPhoneData = (phoneBody: string, country: TAltCountry): TAltCorePhoneFieldInfoWithMeta => {
    let fullPhone = ''

    if (phoneBody) {
      fullPhone = country.code + phoneBody
    }

    return { phone: fullPhone, meta: { country, phoneBody } }
  }

  private handleClickOutside = (event: VisibleEvent) => {
    event.stopPropagation()

    if (this.disabled || this.readonly) return

    this.isOpened = event.detail.value
    this.isCountriesOpened = event.detail.value
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

  private get phonePlaceHolder() {
    if (this.placeholder) return this.placeholder

    const phoneTemplateWithoutPlusAndCode = this.country.mask.replace(/[\d,+?]/g, '')
    return phoneTemplateWithoutPlusAndCode.replace(/x/g, '0').trim()
  }

  private get inputAutocomplete(): TAltInputAutocomplete {
    return this.withoutCodeSelection ? EAltInputAutocomplete.TEL : EAltInputAutocomplete.TEL_NATIONAL
  }

  private get isClearButtonVisible() {
    return Boolean(this.value) && !this.disabled && !this.readonly
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

  private loadAutocompleteOptions = debounce({ delay: 500 }, async(detail: TAltCorePhoneFieldInfoWithMeta, minSearchLength: number) => {
    if (!this.searchFunction || detail.meta.phoneBody.length < minSearchLength) {
      this.autocompleteOptions = []
      this.changeDropdownVisible(false)
      return
    }

    const requestId = ++this.currentSearchRequestId

    this.changeDropdownVisible(true)
    this.loadingAutocompleteOptions = true

    try {
      const options = await this.searchFunction(detail)

      if (requestId === this.currentSearchRequestId) {
        this.autocompleteOptions = options
      }
    } finally {
      this.handleSearchComplete(requestId)
    }
  })

  private makeSearch = (unmaskedPhone: string, detail: TAltCorePhoneFieldInfoWithMeta) => {
    const minSearchLength = this.minSearchLength ?? 0
    if (unmaskedPhone.length >= minSearchLength) {
      this.loadAutocompleteOptions(detail, minSearchLength)
    } else {
      this.changeDropdownVisible(false)
      this.autocompleteOptions = []
    }
  }

  private handleInput = (event: InputEvent) => {
    event.stopPropagation()

    if (this.computedDisabledOrReadonly) return

    this.isCountriesOpened = false
    let unmaskedPhone = this.unmaskPhone(event.detail.value)

    if (this.withoutCodeSelection) {
      unmaskedPhone = unmaskedPhone.replace(this.country.code, '')
    }

    const detail = this.getPhoneData(unmaskedPhone, this.country)
    this._change({ detail })

    if (this.disabledAutocomplete) return

    this.makeSearch(unmaskedPhone, detail)
  }

  changeDropdownVisible = (value: boolean) => {
    if (this.disabled || this.readonly) return

    this.isOpened = value
  }

  private handleSelectAutocompleteOption = (item: TAltCorePhoneFieldAutocompleteOption) => (event: Event) => {
    if (this.computedDisabledOrReadonly || !event.currentTarget) return
    event.stopPropagation()

    this._selectOption({ detail: item })
    this.changeDropdownVisible(false)
    this.fieldInput?.inputElement?.blur()
  }

  private handleCodeClick = (event: Event) => {
    if (this.computedDisabledOrReadonly || !event.currentTarget) return

    event.stopPropagation()
    this.fieldInput?.inputElement?.focus()

    this.isOpened = false
    this.isCountriesOpened = !this.isCountriesOpened
  }

  private handleCountryPick = (country: TAltCountry) => (event: Event) => {
    if (this.computedDisabledOrReadonly) return

    event.stopPropagation()

    const detail = this.getPhoneData(this.phoneQuery, country)
    this.countryId = country.id
    this.ignoreAutoCountryDetection = true

    this._change({ detail })
    this.isCountriesOpened = false
    this.applyMask()
  }

  private maskPhone = (phoneDigits: string, mask: TAltCountry['mask']) => {
    let result = ''
    let digitIndex = 0

    for (const char of mask) {
      if (digitIndex >= phoneDigits.length) break

      if (char === 'x') {
        result += phoneDigits[digitIndex++]
      } else if (char !== '?') {
        result += char
      }
    }

    return result
  }

  private formatPhoneByCountryMask = (phone?: string): string | null => {
    if (!phone) return null
    const phoneWithPlus = phone.startsWith('+') ? phone : `+${phone}`
    const countryId = matchCountry(phoneWithPlus, this.countryList)

    if (!countryId) return null

    const country = this.getDefaultCountry(countryId)
    const digits = this.unmaskPhone(phone)

    if (!digits.startsWith(country.code)) return null

    const phoneDigits = digits.slice(country.code.length)

    return this.maskPhone(phoneDigits, country.mask)
  }

  private getHiddenPhone = (phone: string): string => {
    if (!phone) return phone

    const phonePattern = /^(.+?)(\d[^\d]*\d[^\d]*\d[^\d]*\d[^\d]*\d[^\d]*)(\d[^\d]*\d[^\d]*)$/
    const match = phonePattern.exec(phone)

    if (!match) return phone

    const [, start, middle, end] = match
    const maskedMiddle = middle.replace(/\d/g, 'X')

    return start + maskedMiddle + end
  }

  updated(_changedProperties: PropertyValues<this>) {
    super.updated(_changedProperties)

    if (_changedProperties.has('value')) return

    if (!this.ignoreAutoCountryDetection) {
      this.countryId = matchCountry(`+${this.refinedPhone}`, this.countryList) || this.defaultCountryId || this.firstCountryIdInList
    }

    if (_changedProperties.has('withoutCodeSelection')) {
      this.applyMask()
    }
  }

  private handleClear = () => {
    const detail = this.getPhoneData('', this.country)
    this.autocompleteOptions = []
    this.fieldInput?.inputElement?.focus()
    this.isOpened = false

    this._change({ detail })
  }

  private handleSlotAnnotationChange = (event: Event) => {
    preventAndStopEvent(event)

    const target = event.target as HTMLSlotElement

    this.hasAnnotationSlot = hasSlotContent(target)
  }

  private handleLabelClick = () => {
    this.fieldInput?.inputElement?.focus()
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.destroyMask()
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
        ${!this.withoutCodeSelection
            ? html`
              <alt-core-phone-code
                .code=${this.country.code}
                @click=${this.handleCodeClick}
              ></alt-core-phone-code>
            `
            : nothing
        }
        <alt-core-field-input
          .value=${this.maskedValue}
          .name=${this.name}
          .placeholder=${this.phonePlaceHolder}
          .required=${this.required}
          .autofocus=${this.autofocus}
          .hideSpaceLeft=${!this.withoutCodeSelection}
          .hideSpaceRight=${Boolean(this.value)}
          .autocomplete=${this.inputAutocomplete}
          type="tel"
          @input=${this.handleInput}
          @render=${() => { this.applyMask() }}
        ></alt-core-field-input>
        ${this.isClearButtonVisible
          ? html`
            <alt-core-field-icon
              .icon=${altClose}
              hoverable
              @mousedown=${() => { this.autocompleteOptions = [] }}
              @click=${this.handleClear}
            ></alt-core-field-icon>
          `
          : nothing
        }
      </alt-core-field-wrapper>
    `
  }

  protected renderDropdownListExtraSubtitles(option: TAltCorePhoneFieldAutocompleteOption) {
    const extraSubtitles = [option.additionalPhone, option.email]

    return extraSubtitles.map((subtitle) => subtitle ? html`<div>${subtitle}</div>` : nothing)
  }

  get formattedAutocompleteOptions(): TAltCorePhoneFieldAutocompleteOption[] {
    return this.autocompleteOptions.map((option) => {
      if (!option.phone && !option.additionalPhone) return option

      const processPhone = (phone?: string) => {
        if (!phone) return undefined
        const formatted = this.formatPhoneByCountryMask(phone) ?? ''
        return this.optionPhonePrivacyEnabled ? this.getHiddenPhone(formatted) : formatted
      }

      return {
        ...option,
        ...option.phone && { phone: processPhone(option.phone) },
        ...option.additionalPhone && { additionalPhone: processPhone(option.additionalPhone) },
      }
    })
  }

  protected renderDropdownList() {
    return repeat(
      this.formattedAutocompleteOptions,
      (option) => option.id,
      (option) => html`
          <alt-core-dropdown-cell
            locator=${`${AltCoreDropdownCellTagName}_${option.id}`}
            @click=${this.handleSelectAutocompleteOption(option)}
          >
            <div class=${this.baseDropdownListItemClass} slot="content">
              <alt-core-dropdown-cell-text label=${ifDefined(option.title)}>
                <div slot="subtitle">
                  <alt-core-search-text-highlighted
                    text=${ifDefined(option.phone)}
                    .search=${this.phoneQuery}
                    .ignoredSymbols=${['(', ')', ' ', '-']}
                    .size=${EAltCoreTextSize.A2_REGULAR}
                    .variant=${EAltCoreTextVariant.SECONDARY}
                    .highlightTextSize=${EAltCoreTextSize.A2_REGULAR}
                    .highlightTextVariant=${EAltCoreTextVariant.PRIMARY}
                  ></alt-core-search-text-highlighted>
                  
                  ${this.renderDropdownListExtraSubtitles(option)}
                </div>
              </alt-core-dropdown-cell-text>
            </div>
          </alt-core-dropdown-cell>
        `,
    )
  }

  protected renderDropdownCountriesContent() {
    const getCountryCellTitle = (country: TAltCountry) => {
      return `+${country.code} (${country.title.trim()})`
    }

    return html`
      <alt-core-dropdown-list>
        <div 
          class=${this.baseDropdownListItemsClass} 
          slot="list"
        >
          ${
            repeat(
              this.countryList,
              (country) => country.id,
              (country) => html`
                <alt-core-dropdown-cell
                  locator=${`${AltCoreDropdownCellTagName}_${country.id}`}
                  @click=${this.handleCountryPick(country)}
                >
                  <div class=${this.baseDropdownListItemClass} slot="content">
                    <alt-core-dropdown-cell-text .label=${getCountryCellTitle(country)}></alt-core-dropdown-cell-text>
                  </div>
                  ${this.countryId === country.id
                    ? html`
                      <div class=${this.baseDropdownListItemAppendClass} slot="append">
                        ${renderIcon({ icon: altCheck, size: '16px' })}
                      </div>
                    `
                    : nothing
                  }
                </alt-core-dropdown-cell>
              `,
            )
          }
        </div>
      </alt-core-dropdown-list>`
  }

  private get isEmptyStateAvailable() {
    return Boolean(this.emptyStateTitle || this.emptyStateDescription)
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
          style=${styleMap(this.computedDropdownListStyles)} 
          slot="list"
        >
          ${this.autocompleteOptions.length === 0 && !this.loadingAutocompleteOptions && this.phoneQuery.length >= (this.minSearchLength ?? 0)
            ? this.renderEmptyState()
            : html`
              <slot name="list">
                ${this.renderDropdownList()}
              </slot>
            `
          }

          ${this.renderLoader()}
        </div>
      </alt-core-dropdown-list>`
  }

  connectedCallback() {
    super.connectedCallback()


    this.countryId = this.defaultCountryId || this.firstCountryIdInList

    const localeService = this.getLocaleService()

    if (localeService) {
      localeService.getCountries(this.getLanguage()).then((countries) => {
        this.countryNames = countries
      })
    }
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
          .isOpen=${this.isDropdownOpened || this.isCountriesDropdownOpened}
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
              this.isCountriesDropdownOpened
                ? this.renderDropdownCountriesContent()
                : nothing
            }

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
