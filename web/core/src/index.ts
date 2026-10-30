import './assets/css/index.css'

export * from './ui/text'
export * from './ui/icon'
export * from './ui/dropdown'
export * from './ui/globalProvider'
export * from './ui/loader'
export * from './ui/dropdownCell'
export * from './ui/segmentOption'
export * from './ui/table'
export * from './ui/tableRow'
export * from './ui/tableCell'
export * from './ui/tableHeadCell'
export * from './ui/tableBar'
export * from './ui/skeletonTable'
export * from './ui/tablePagination'
export * from './ui/fieldWrapper'
export * from './ui/dropdownCellText'
export * from './ui/fieldIcon'
export * from './ui/fieldAvatar'
export * from './ui/fieldInput'
export * from './ui/simpleChip'
export * from './ui/datePicker'
export * from './ui/textField'
export * from './ui/phoneCode'
export * from './ui/fieldTextarea'
export * from './ui/textarea'
export * from './ui/searchTextHighlighted'
export * from './ui/cardWrapper'
export * from './ui/cardMain'
export * from './ui/cardHeader'
export * from './ui/colorIcon'
export * from './ui/buttonDropdown'
export * from './ui/cardIcon'
export * from './ui/cardCheckbox'
export * from './ui/cardRadio'
export * from './ui/cardButton'
export * from './ui/cardSelect'
export * from './ui/collapse'
export * from './ui/collapseItem'
export * from './ui/annotation'
export * from './ui/simpleButton'
export * from './ui/simpleCheckbox'
export * from './ui/simpleRadioButton'
export * from './ui/simpleToggle'
export * from './ui/error'
export * from './ui/tooltip'
export * from './ui/link'
export * from './ui/dropdownList'
export * from './ui/tip'
export * from './ui/popover'
export * from './ui/tag'
export * from './ui/counter'
export * from './ui/avatar'
export * from './ui/button'
export * from './ui/iconButton'
export * from './ui/label'
export * from './ui/segmentControl'
export * from './ui/chip'
export * from './ui/radioButtonGroup'
export * from './ui/checkbox'
export * from './ui/radioButton'
export * from './ui/buttonGroup'
export * from './ui/toggle'
export * from './ui/calendar'
export * from './ui/pagination'
export * from './ui/selectField'
export * from './ui/multipleSelectField'
export * from './ui/phoneField'
export * from './ui/autocompleteField'
export * from './ui/emptyState'
export * from './ui/countField'
export * from './ui/modal'
export * from './ui/functionalModal'
export * from './ui/tab'
export * from './ui/tabs'
export * from './ui/brandButton'

export * from '../../shared/icons'
export * from '../../shared/constants/breakpoints'
export * from '../../shared/utils/maskito'

export * from './i18n/locales'

import type {
  AltCoreTextTagName,
  AltCoreIconTagName,
  AltCoreButtonTagName,
  AltCoreIconButtonTagName,
  AltCoreSimpleButtonTagName,
  AltCoreButtonGroupTagName,
  AltCoreLabelTagName,
  AltCoreAnnotationTagName,
  AltCoreErrorTagName,
  AltCoreSimpleToggleTagName,
  AltCoreSimpleCheckboxTagName,
  AltCoreSimpleRadioButtonTagName,
  AltCoreToggleTagName,
  AltCoreCheckboxTagName,
  AltCoreRadioButtonTagName,
  AltCoreRadioButtonGroupTagName,
  AltCoreTooltipTagName,
  AltCoreDropdownTagName,
  AltCoreLinkTagName,
  AltCoreGlobalProviderTagName,
  AltCoreLoaderTagName,
  AltCoreDropdownCellTagName,
  AltCoreDropdownListTagName,
  AltCoreTipTagName,
  AltCorePopoverTagName,
  AltCoreTagTagName,
  AltCoreSegmentOptionTagName,
  AltCoreSegmentControlTagName,
  AltCoreTableTagName,
  AltCoreTableBarTagName,
  AltCoreTableRowTagName,
  AltCoreTableCellTagName,
  AltCoreTableHeadCellTagName,
  AltCoreTablePaginationTagName,
  AltCoreCounterTagName,
  AltCoreCalendarTagName,
  AltCoreSkeletonTableTagName,
  AltCoreAvatarTagName,
  AltCorePaginationTagName,
  AltCoreSelectFieldTagName,
  AltCoreMultipleSelectFieldTagName,
  AltCoreFieldWrapperTagName,
  AltCoreDropdownCellTextTagName,
  AltCoreFieldIconTagName,
  AltCoreFieldAvatarTagName,
  AltCoreFieldInputTagName,
  AltCorePhoneFieldTagName,
  AltCoreEmptyStateTagName,
  AltCorePhoneCodeTagName,
  AltCoreSimpleChipTagName,
  AltCoreDatePickerTagName,
  AltCoreTextFieldTagName,
  AltCoreFieldTextareaTagName,
  AltCoreTextareaTagName,
  AltCoreChipTagName,
  AltCoreSearchTextHighlightedTagName,
  AltCoreCardWrapperTagName,
  AltCoreCardMainTagName,
  AltCoreCardHeaderTagName,
  AltCoreCardIconTagName,
  AltCoreColorIconTagName,
  AltCoreCardCheckboxTagName,
  AltCoreCardRadioTagName,
  AltCoreCardButtonTagName,
  AltCoreCardSelectTagName,
  AltCoreButtonDropdownTagName,
  AltCoreCollapseItemTagName,
  AltCoreCollapseTagName,
  AltCoreCountFieldTagName,
  AltCoreAutocompleteFieldTagName,
  AltCoreModalTagName,
  AltCoreFunctionalModalTagName,
  AltCoreTabTagName,
  AltCoreTabsTagName,
  AltCoreBrandButtonTagName,
} from '../../shared/constants'

import type {
  AltCoreText,
  AltCoreIcon,
  AltCoreButton,
  AltCoreIconButton,
  AltCoreSimpleButton,
  AltCoreButtonGroup,
  AltCoreLabel,
  AltCoreAnnotation,
  AltCoreError,
  AltCoreSimpleToggle,
  AltCoreSimpleCheckbox,
  AltCoreSimpleRadioButton,
  AltCoreToggle,
  AltCoreCheckbox,
  AltCoreRadioButton,
  AltCoreRadioButtonGroup,
  AltCoreTooltip,
  AltCoreDropdown,
  AltCoreLink,
  AltCoreGlobalProvider,
  AltCoreLoader,
  AltCoreDropdownCell,
  AltCoreDropdownList,
  AltCoreTip,
  AltCorePopover,
  AltCoreTag,
  AltCoreSegmentOption,
  AltCoreSegmentControl,
  AltCoreTable,
  AltCoreTableBar,
  AltCoreTableRow,
  AltCoreTableCell,
  AltCoreTableHeadCell,
  AltCoreTablePagination,
  AltCoreCounter,
  AltCoreCalendar,
  AltCoreSkeletonTable,
  AltCoreAvatar,
  AltCorePagination,
  AltCoreSelectField,
  AltCoreMultipleSelectField,
  AltCoreFieldWrapper,
  AltCoreDropdownCellText,
  AltCoreFieldIcon,
  AltCoreFieldAvatar,
  AltCoreFieldInput,
  AltCorePhoneField,
  AltCoreSimpleChip,
  AltCoreChip,
  AltCoreEmptyState,
  AltCorePhoneCode,
  AltCoreDatePicker,
  AltCoreTextField,
  AltCoreFieldTextarea,
  AltCoreTextarea,
  AltCoreSearchTextHighlighted,
  AltCoreCardWrapper,
  AltCoreCardMain,
  AltCoreCardHeader,
  AltCoreCardIcon,
  AltCoreColorIcon,
  AltCoreCardCheckbox,
  AltCoreCardRadio,
  AltCoreCardButton,
  AltCoreCardSelect,
  AltCoreButtonDropdown,
  AltCoreCollapseItem,
  AltCoreCollapse,
  AltCoreCountField,
  AltCoreAutocompleteField,
  AltCoreModal,
  AltCoreFunctionalModal,
  AltCoreTab,
  AltCoreTabs,
  AltCoreBrandButton,
} from '../../core/src/'

declare global {
  interface HTMLElementTagNameMap {
    [AltCoreTextTagName]: AltCoreText
    [AltCoreIconTagName]: AltCoreIcon
    [AltCoreDropdownTagName]: AltCoreDropdown
    [AltCoreSimpleButtonTagName]: AltCoreSimpleButton
    [AltCoreButtonGroupTagName]: AltCoreButtonGroup
    [AltCoreLabelTagName]: AltCoreLabel
    [AltCoreAnnotationTagName]: AltCoreAnnotation
    [AltCoreErrorTagName]: AltCoreError
    [AltCoreSimpleToggleTagName]: AltCoreSimpleToggle
    [AltCoreSimpleCheckboxTagName]: AltCoreSimpleCheckbox
    [AltCoreSimpleRadioButtonTagName]: AltCoreSimpleRadioButton
    [AltCoreTooltipTagName]: AltCoreTooltip
    [AltCoreGlobalProviderTagName]: AltCoreGlobalProvider
    [AltCoreSegmentOptionTagName]: AltCoreSegmentOption
    [AltCoreCounterTagName]: AltCoreCounter

    // Product components
    [AltCoreTagTagName]: AltCoreTag
    [AltCoreToggleTagName]: AltCoreToggle
    [AltCoreCheckboxTagName]: AltCoreCheckbox
    [AltCoreRadioButtonTagName]: AltCoreRadioButton
    [AltCoreRadioButtonGroupTagName]: AltCoreRadioButtonGroup
    [AltCoreButtonTagName]: AltCoreButton
    [AltCoreIconButtonTagName]: AltCoreIconButton
    [AltCoreLinkTagName]: AltCoreLink
    [AltCoreLoaderTagName]: AltCoreLoader
    [AltCoreDropdownCellTagName]: AltCoreDropdownCell
    [AltCoreDropdownListTagName]: AltCoreDropdownList
    [AltCoreTipTagName]: AltCoreTip
    [AltCorePopoverTagName]: AltCorePopover
    [AltCoreSegmentControlTagName]: AltCoreSegmentControl
    [AltCoreTableTagName]: AltCoreTable
    [AltCoreTableBarTagName]: AltCoreTableBar
    [AltCoreTableRowTagName]: AltCoreTableRow
    [AltCoreTableHeadCellTagName]: AltCoreTableHeadCell
    [AltCoreTableCellTagName]: AltCoreTableCell
    [AltCoreCalendarTagName]: AltCoreCalendar
    [AltCoreTablePaginationTagName]: AltCoreTablePagination
    [AltCoreSkeletonTableTagName]: AltCoreSkeletonTable
    [AltCoreAvatarTagName]: AltCoreAvatar
    [AltCorePaginationTagName]: AltCorePagination
    [AltCoreSelectFieldTagName]: AltCoreSelectField
    [AltCoreMultipleSelectFieldTagName]: AltCoreMultipleSelectField
    [AltCoreFieldWrapperTagName]: AltCoreFieldWrapper
    [AltCoreDropdownCellTextTagName]: AltCoreDropdownCellText
    [AltCoreFieldIconTagName]: AltCoreFieldIcon
    [AltCoreFieldAvatarTagName]: AltCoreFieldAvatar
    [AltCoreFieldInputTagName]: AltCoreFieldInput
    [AltCorePhoneFieldTagName]: AltCorePhoneField
    [AltCoreSimpleChipTagName]: AltCoreSimpleChip
    [AltCoreEmptyStateTagName]: AltCoreEmptyState
    [AltCorePhoneCodeTagName]: AltCorePhoneCode
    [AltCoreDatePickerTagName]: AltCoreDatePicker
    [AltCoreTextFieldTagName]: AltCoreTextField
    [AltCoreFieldTextareaTagName]: AltCoreFieldTextarea
    [AltCoreTextareaTagName]: AltCoreTextarea
    [AltCoreTextareaTagName]: AltCoreTextarea
    [AltCoreChipTagName]: AltCoreChip
    [AltCoreSearchTextHighlightedTagName]: AltCoreSearchTextHighlighted
    [AltCoreCardWrapperTagName]: AltCoreCardWrapper
    [AltCoreCardMainTagName]: AltCoreCardMain
    [AltCoreCardHeaderTagName]: AltCoreCardHeader
    [AltCoreCardIconTagName]: AltCoreCardIcon
    [AltCoreColorIconTagName]: AltCoreColorIcon
    [AltCoreCardCheckboxTagName]: AltCoreCardCheckbox
    [AltCoreCardRadioTagName]: AltCoreCardRadio
    [AltCoreCardButtonTagName]: AltCoreCardButton
    [AltCoreCardSelectTagName]: AltCoreCardSelect
    [AltCoreButtonDropdownTagName]: AltCoreButtonDropdown
    [AltCoreCollapseItemTagName]: AltCoreCollapseItem
    [AltCoreCollapseTagName]: AltCoreCollapse
    [AltCoreCountFieldTagName]: AltCoreCountField
    [AltCoreAutocompleteFieldTagName]: AltCoreAutocompleteField
    [AltCoreModalTagName]: AltCoreModal
    [AltCoreFunctionalModalTagName]: AltCoreFunctionalModal
    [AltCoreTabTagName]: AltCoreTab
    [AltCoreTabsTagName]: AltCoreTabs
    [AltCoreBrandButtonTagName]: AltCoreBrandButton
  }
}
