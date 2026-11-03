import type { TPropTestCase } from '~shared/types/tests'
import { EAltSizes } from '~shared/types/global'
import { AltCoreButtonTagName } from '~shared/constants'
import { EAltCoreButtonGroupVariant, type IAltCoreButtonGroupProps } from '~core/ui/buttonGroup/models/types'

export const buttonsHtml = `
  <${AltCoreButtonTagName} label="Button 1"></${AltCoreButtonTagName}>
  <${AltCoreButtonTagName} label="Button 2"></${AltCoreButtonTagName}>
`

export const buttonsHtmlThree = `
  <${AltCoreButtonTagName} label="Button 1"></${AltCoreButtonTagName}>
  <${AltCoreButtonTagName} label="Button 2"></${AltCoreButtonTagName}>
  <${AltCoreButtonTagName} label="Button 3"></${AltCoreButtonTagName}>
`

export const emptyButtonsHtml = ''

export const propsTestCases: TPropTestCase<IAltCoreButtonGroupProps, 'size' | 'variant'>[] = [
  { prop: 'size', case: 'small', value: EAltSizes.SMALL },
  { prop: 'size', case: 'medium', value: EAltSizes.MEDIUM },
  { prop: 'size', case: 'large', value: EAltSizes.LARGE },
  { prop: 'variant', case: 'primary', value: EAltCoreButtonGroupVariant.PRIMARY },
  { prop: 'variant', case: 'outline', value: EAltCoreButtonGroupVariant.OUTLINE },
  { prop: 'variant', case: 'outline-filled', value: EAltCoreButtonGroupVariant.OUTLINE_FILLED },
]

export const propsChangeTestCases = [
  { prop: 'size', case: 'from small to medium', value: EAltSizes.SMALL, changedValue: EAltSizes.MEDIUM },
  { prop: 'size', case: 'from medium to large', value: EAltSizes.MEDIUM, changedValue: EAltSizes.LARGE },
  { prop: 'variant', case: 'from primary to outline', value: EAltCoreButtonGroupVariant.PRIMARY, changedValue: EAltCoreButtonGroupVariant.OUTLINE },
  { prop: 'variant', case: 'from outline to outline-filled', value: EAltCoreButtonGroupVariant.OUTLINE, changedValue: EAltCoreButtonGroupVariant.OUTLINE_FILLED },
]

export const slotsTestCases = [
  { case: 'with the passed buttons', slot: 'default', content: buttonsHtml, expected: 2 },
  { case: 'with an empty value', slot: 'default', content: emptyButtonsHtml, expected: 0 },
  { case: 'when a button is removed and added', slot: 'default', content: buttonsHtmlThree, updatedContent: buttonsHtml, expected: 2 },
]

export const buttonRadiusTestCases = [
  {
    case: 'radius of the first button',
    index: 0,
    expectedTopRightRadius: '0',
    expectedBottomRightRadius: '0',
  },
  {
    case: 'radius of the last button',
    index: 2,
    expectedTopLeftRadius: '0',
    expectedBottomLeftRadius: '0',
  },
  {
    case: 'radius of the middle button',
    index: 1,
    expectedTopLeftRadius: '0',
    expectedBottomLeftRadius: '0',
    expectedTopRightRadius: '0',
    expectedBottomRightRadius: '0',
  },
]
