import type { TPropTestCase } from '~shared/types/tests'
import { EYSizes } from '~shared/types/global'
import { YCoreButtonTagName } from '~shared/constants'
import { EYCoreButtonGroupVariant, type IYCoreButtonGroupProps } from '~core/ui/buttonGroup/models/types'

export const buttonsHtml = `
  <${YCoreButtonTagName} label="Button 1"></${YCoreButtonTagName}>
  <${YCoreButtonTagName} label="Button 2"></${YCoreButtonTagName}>
`

export const buttonsHtmlThree = `
  <${YCoreButtonTagName} label="Button 1"></${YCoreButtonTagName}>
  <${YCoreButtonTagName} label="Button 2"></${YCoreButtonTagName}>
  <${YCoreButtonTagName} label="Button 3"></${YCoreButtonTagName}>
`

export const emptyButtonsHtml = ''

export const propsTestCases: TPropTestCase<IYCoreButtonGroupProps, 'size' | 'variant'>[] = [
  { prop: 'size', case: 'small', value: EYSizes.SMALL },
  { prop: 'size', case: 'medium', value: EYSizes.MEDIUM },
  { prop: 'size', case: 'large', value: EYSizes.LARGE },
  { prop: 'variant', case: 'primary', value: EYCoreButtonGroupVariant.PRIMARY },
  { prop: 'variant', case: 'outline', value: EYCoreButtonGroupVariant.OUTLINE },
  { prop: 'variant', case: 'outline-filled', value: EYCoreButtonGroupVariant.OUTLINE_FILLED },
]

export const propsChangeTestCases = [
  { prop: 'size', case: 'from small to medium', value: EYSizes.SMALL, changedValue: EYSizes.MEDIUM },
  { prop: 'size', case: 'from medium to large', value: EYSizes.MEDIUM, changedValue: EYSizes.LARGE },
  { prop: 'variant', case: 'from primary to outline', value: EYCoreButtonGroupVariant.PRIMARY, changedValue: EYCoreButtonGroupVariant.OUTLINE },
  { prop: 'variant', case: 'from outline to outline-filled', value: EYCoreButtonGroupVariant.OUTLINE, changedValue: EYCoreButtonGroupVariant.OUTLINE_FILLED },
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
