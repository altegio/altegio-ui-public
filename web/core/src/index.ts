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
  YCoreTextTagName,
  YCoreIconTagName,
  YCoreButtonTagName,
  YCoreIconButtonTagName,
  YCoreSimpleButtonTagName,
  YCoreButtonGroupTagName,
  YCoreLabelTagName,
  YCoreAnnotationTagName,
  YCoreErrorTagName,
  YCoreSimpleToggleTagName,
  YCoreSimpleCheckboxTagName,
  YCoreSimpleRadioButtonTagName,
  YCoreToggleTagName,
  YCoreCheckboxTagName,
  YCoreRadioButtonTagName,
  YCoreRadioButtonGroupTagName,
  YCoreTooltipTagName,
  YCoreDropdownTagName,
  YCoreLinkTagName,
  YCoreGlobalProviderTagName,
  YCoreLoaderTagName,
  YCoreDropdownCellTagName,
  YCoreDropdownListTagName,
  YCoreTipTagName,
  YCorePopoverTagName,
  YCoreTagTagName,
  YCoreSegmentOptionTagName,
  YCoreSegmentControlTagName,
  YCoreTableTagName,
  YCoreTableBarTagName,
  YCoreTableRowTagName,
  YCoreTableCellTagName,
  YCoreTableHeadCellTagName,
  YCoreTablePaginationTagName,
  YCoreCounterTagName,
  YCoreCalendarTagName,
  YCoreSkeletonTableTagName,
  YCoreAvatarTagName,
  YCorePaginationTagName,
  YCoreSelectFieldTagName,
  YCoreMultipleSelectFieldTagName,
  YCoreFieldWrapperTagName,
  YCoreDropdownCellTextTagName,
  YCoreFieldIconTagName,
  YCoreFieldAvatarTagName,
  YCoreFieldInputTagName,
  YCorePhoneFieldTagName,
  YCoreEmptyStateTagName,
  YCorePhoneCodeTagName,
  YCoreSimpleChipTagName,
  YCoreDatePickerTagName,
  YCoreTextFieldTagName,
  YCoreFieldTextareaTagName,
  YCoreTextareaTagName,
  YCoreChipTagName,
  YCoreSearchTextHighlightedTagName,
  YCoreCardWrapperTagName,
  YCoreCardMainTagName,
  YCoreCardHeaderTagName,
  YCoreCardIconTagName,
  YCoreColorIconTagName,
  YCoreCardCheckboxTagName,
  YCoreCardRadioTagName,
  YCoreCardButtonTagName,
  YCoreCardSelectTagName,
  YCoreButtonDropdownTagName,
  YCoreCollapseItemTagName,
  YCoreCollapseTagName,
  YCoreCountFieldTagName,
  YCoreAutocompleteFieldTagName,
  YCoreModalTagName,
  YCoreFunctionalModalTagName,
  YCoreTabTagName,
  YCoreTabsTagName,
  YCoreBrandButtonTagName,
} from '../../shared/constants'

import type {
  YCoreText,
  YCoreIcon,
  YCoreButton,
  YCoreIconButton,
  YCoreSimpleButton,
  YCoreButtonGroup,
  YCoreLabel,
  YCoreAnnotation,
  YCoreError,
  YCoreSimpleToggle,
  YCoreSimpleCheckbox,
  YCoreSimpleRadioButton,
  YCoreToggle,
  YCoreCheckbox,
  YCoreRadioButton,
  YCoreRadioButtonGroup,
  YCoreTooltip,
  YCoreDropdown,
  YCoreLink,
  YCoreGlobalProvider,
  YCoreLoader,
  YCoreDropdownCell,
  YCoreDropdownList,
  YCoreTip,
  YCorePopover,
  YCoreTag,
  YCoreSegmentOption,
  YCoreSegmentControl,
  YCoreTable,
  YCoreTableBar,
  YCoreTableRow,
  YCoreTableCell,
  YCoreTableHeadCell,
  YCoreTablePagination,
  YCoreCounter,
  YCoreCalendar,
  YCoreSkeletonTable,
  YCoreAvatar,
  YCorePagination,
  YCoreSelectField,
  YCoreMultipleSelectField,
  YCoreFieldWrapper,
  YCoreDropdownCellText,
  YCoreFieldIcon,
  YCoreFieldAvatar,
  YCoreFieldInput,
  YCorePhoneField,
  YCoreSimpleChip,
  YCoreChip,
  YCoreEmptyState,
  YCorePhoneCode,
  YCoreDatePicker,
  YCoreTextField,
  YCoreFieldTextarea,
  YCoreTextarea,
  YCoreSearchTextHighlighted,
  YCoreCardWrapper,
  YCoreCardMain,
  YCoreCardHeader,
  YCoreCardIcon,
  YCoreColorIcon,
  YCoreCardCheckbox,
  YCoreCardRadio,
  YCoreCardButton,
  YCoreCardSelect,
  YCoreButtonDropdown,
  YCoreCollapseItem,
  YCoreCollapse,
  YCoreCountField,
  YCoreAutocompleteField,
  YCoreModal,
  YCoreFunctionalModal,
  YCoreTab,
  YCoreTabs,
  YCoreBrandButton,
} from '../../core/src/'

declare global {
  interface HTMLElementTagNameMap {
    [YCoreTextTagName]: YCoreText
    [YCoreIconTagName]: YCoreIcon
    [YCoreDropdownTagName]: YCoreDropdown
    [YCoreSimpleButtonTagName]: YCoreSimpleButton
    [YCoreButtonGroupTagName]: YCoreButtonGroup
    [YCoreLabelTagName]: YCoreLabel
    [YCoreAnnotationTagName]: YCoreAnnotation
    [YCoreErrorTagName]: YCoreError
    [YCoreSimpleToggleTagName]: YCoreSimpleToggle
    [YCoreSimpleCheckboxTagName]: YCoreSimpleCheckbox
    [YCoreSimpleRadioButtonTagName]: YCoreSimpleRadioButton
    [YCoreTooltipTagName]: YCoreTooltip
    [YCoreGlobalProviderTagName]: YCoreGlobalProvider
    [YCoreSegmentOptionTagName]: YCoreSegmentOption
    [YCoreCounterTagName]: YCoreCounter

    // Продуктовые компоненты
    [YCoreTagTagName]: YCoreTag
    [YCoreToggleTagName]: YCoreToggle
    [YCoreCheckboxTagName]: YCoreCheckbox
    [YCoreRadioButtonTagName]: YCoreRadioButton
    [YCoreRadioButtonGroupTagName]: YCoreRadioButtonGroup
    [YCoreButtonTagName]: YCoreButton
    [YCoreIconButtonTagName]: YCoreIconButton
    [YCoreLinkTagName]: YCoreLink
    [YCoreLoaderTagName]: YCoreLoader
    [YCoreDropdownCellTagName]: YCoreDropdownCell
    [YCoreDropdownListTagName]: YCoreDropdownList
    [YCoreTipTagName]: YCoreTip
    [YCorePopoverTagName]: YCorePopover
    [YCoreSegmentControlTagName]: YCoreSegmentControl
    [YCoreTableTagName]: YCoreTable
    [YCoreTableBarTagName]: YCoreTableBar
    [YCoreTableRowTagName]: YCoreTableRow
    [YCoreTableHeadCellTagName]: YCoreTableHeadCell
    [YCoreTableCellTagName]: YCoreTableCell
    [YCoreCalendarTagName]: YCoreCalendar
    [YCoreTablePaginationTagName]: YCoreTablePagination
    [YCoreSkeletonTableTagName]: YCoreSkeletonTable
    [YCoreAvatarTagName]: YCoreAvatar
    [YCorePaginationTagName]: YCorePagination
    [YCoreSelectFieldTagName]: YCoreSelectField
    [YCoreMultipleSelectFieldTagName]: YCoreMultipleSelectField
    [YCoreFieldWrapperTagName]: YCoreFieldWrapper
    [YCoreDropdownCellTextTagName]: YCoreDropdownCellText
    [YCoreFieldIconTagName]: YCoreFieldIcon
    [YCoreFieldAvatarTagName]: YCoreFieldAvatar
    [YCoreFieldInputTagName]: YCoreFieldInput
    [YCorePhoneFieldTagName]: YCorePhoneField
    [YCoreSimpleChipTagName]: YCoreSimpleChip
    [YCoreEmptyStateTagName]: YCoreEmptyState
    [YCorePhoneCodeTagName]: YCorePhoneCode
    [YCoreDatePickerTagName]: YCoreDatePicker
    [YCoreTextFieldTagName]: YCoreTextField
    [YCoreFieldTextareaTagName]: YCoreFieldTextarea
    [YCoreTextareaTagName]: YCoreTextarea
    [YCoreTextareaTagName]: YCoreTextarea
    [YCoreChipTagName]: YCoreChip
    [YCoreSearchTextHighlightedTagName]: YCoreSearchTextHighlighted
    [YCoreCardWrapperTagName]: YCoreCardWrapper
    [YCoreCardMainTagName]: YCoreCardMain
    [YCoreCardHeaderTagName]: YCoreCardHeader
    [YCoreCardIconTagName]: YCoreCardIcon
    [YCoreColorIconTagName]: YCoreColorIcon
    [YCoreCardCheckboxTagName]: YCoreCardCheckbox
    [YCoreCardRadioTagName]: YCoreCardRadio
    [YCoreCardButtonTagName]: YCoreCardButton
    [YCoreCardSelectTagName]: YCoreCardSelect
    [YCoreButtonDropdownTagName]: YCoreButtonDropdown
    [YCoreCollapseItemTagName]: YCoreCollapseItem
    [YCoreCollapseTagName]: YCoreCollapse
    [YCoreCountFieldTagName]: YCoreCountField
    [YCoreAutocompleteFieldTagName]: YCoreAutocompleteField
    [YCoreModalTagName]: YCoreModal
    [YCoreFunctionalModalTagName]: YCoreFunctionalModal
    [YCoreTabTagName]: YCoreTab
    [YCoreTabsTagName]: YCoreTabs
    [YCoreBrandButtonTagName]: YCoreBrandButton
  }
}
