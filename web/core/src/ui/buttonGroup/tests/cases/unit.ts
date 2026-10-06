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
  { prop: 'size', case: 'из small в medium', value: EYSizes.SMALL, changedValue: EYSizes.MEDIUM },
  { prop: 'size', case: 'из medium в large', value: EYSizes.MEDIUM, changedValue: EYSizes.LARGE },
  { prop: 'variant', case: 'из primary в outline', value: EYCoreButtonGroupVariant.PRIMARY, changedValue: EYCoreButtonGroupVariant.OUTLINE },
  { prop: 'variant', case: 'из outline в outline-filled', value: EYCoreButtonGroupVariant.OUTLINE, changedValue: EYCoreButtonGroupVariant.OUTLINE_FILLED },
]

export const slotsTestCases = [
  { case: 'с переданными кнопками', slot: 'default', content: buttonsHtml, expected: 2 },
  { case: 'с пустым значением', slot: 'default', content: emptyButtonsHtml, expected: 0 },
  { case: 'при удалении и добавлении кнопки', slot: 'default', content: buttonsHtmlThree, updatedContent: buttonsHtml, expected: 2 },
]

export const buttonRadiusTestCases = [
  {
    case: 'радиус для первой кнопки',
    index: 0,
    expectedTopRightRadius: '0',
    expectedBottomRightRadius: '0',
  },
  {
    case: 'радиус для последней кнопки',
    index: 2,
    expectedTopLeftRadius: '0',
    expectedBottomLeftRadius: '0',
  },
  {
    case: 'радиус для средней кнопки',
    index: 1,
    expectedTopLeftRadius: '0',
    expectedBottomLeftRadius: '0',
    expectedTopRightRadius: '0',
    expectedBottomRightRadius: '0',
  },
]
