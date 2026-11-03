import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AltCoreRatingTagName as tagName } from '~shared/constants'
import { AltRating } from '~vue/ui/rating'
import type { IAltVueRatingProps } from '~vue/ui/rating/models/types'
import type { AltCoreRating } from '~core/ui/rating'
import { EAltSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'

type TPropKey = Exclude<keyof IAltVueRatingProps, 'modelValue'>

const propTestCases: TPropTestCase<Required<IAltVueRatingProps>, TPropKey>[] = [
  { prop: 'max', case: 'a number', value: 10 },
  { prop: 'name', case: 'with text', value: 'score' },
  { prop: 'readonly', case: 'true', value: true },
  { prop: 'disabled', case: 'true', value: true },
  { prop: 'required', case: 'true', value: true },
  { prop: 'size', case: 'large', value: EAltSizes.LARGE },
  { prop: 'accessibleName', case: 'with text', value: 'Service rating' },
]

describe(
  'Vue/AltRating',
  () => {
    for (const testCase of propTestCases) {
      it(
        `Prop "${testCase.prop}" (${testCase.case}) should be set on the core component`,
        () => {
          const wrapper = mount(AltRating, { props: { [testCase.prop]: testCase.value } })

          const coreElement = wrapper.find(tagName).element as AltCoreRating

          expect(coreElement[testCase.prop]).toBe(testCase.value)
        },
      )
    }

    it(
      'Prop "modelValue" should set the value',
      () => {
        const wrapper = mount(AltRating, { props: { modelValue: 4 } })

        expect((wrapper.find(tagName).element as AltCoreRating).value).toBe(4)
      },
    )

    it(
      'The core "change" event should emit "update:modelValue" once',
      () => {
        const wrapper = mount(AltRating)

        wrapper.find(tagName).element.dispatchEvent(new CustomEvent('change', { detail: { value: 3 }, bubbles: true, composed: true }))

        expect(wrapper.emitted('update:modelValue')).toEqual([[3]])
      },
    )
  },
)
