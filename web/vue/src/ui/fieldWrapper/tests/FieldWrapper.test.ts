import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { YCoreFieldWrapperTagName } from '~shared/constants'
import type { TPropTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'

import { YFieldWrapper } from '~vue/ui/fieldWrapper'
import {
  type IYVueFieldWrapperProps,
} from '~vue/ui/fieldWrapper/models/types'
import { YCoreFieldWrapper } from '~core/ui/fieldWrapper'

const tagName = YCoreFieldWrapperTagName

const slotDefaultTestCases = [
  { case: 'с контентом', content: text },
  { case: 'без контента', content: empty },
]


const propTestCases: TPropTestCase<IYVueFieldWrapperProps, keyof IYVueFieldWrapperProps>[] = [
  { prop: 'disabled', case: 'true', value: true },
  { prop: 'disabled', case: 'false', value: false },
  { prop: 'readonly', case: 'true', value: true },
  { prop: 'readonly', case: 'false', value: false },
  { prop: 'error', case: 'true', value: true },
  { prop: 'error', case: 'false', value: false },
  { prop: 'size', case: 'small', value: 'small' },
  { prop: 'size', case: 'medium', value: 'medium' },
  { prop: 'size', case: 'large', value: 'large' },
  { prop: 'clickable', case: 'true', value: true },
  { prop: 'clickable', case: 'false', value: false },
]

describe(
  'Vue/YFieldWrapper',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCoreFieldWrapper,
        )
      }
    })

    describe(
      'Unit',
      () => {
        describe(
          'Slots',
          () => {
            for (const testCase of slotDefaultTestCases) {
              it(
                `Slot должен быть ${testCase.case}`,
                () => {
                  const wrapper = mount(
                    YFieldWrapper,
                    { slots: { default: testCase.content } },
                  )

                  const renderedContent = wrapper.text()
                  expect(renderedContent).toBe(testCase.content)
                },
              )
            }
          },
        )

        describe(
          'Props',
          () => {
            for (const testCase of propTestCases) {
              it(
                `Prop "${testCase.prop}" должен изменить свойство ${testCase.prop} у core компонента`,
                () => {
                  const wrapper = mount(
                    YFieldWrapper,
                    { props: { [testCase.prop]: testCase.value } },
                  )

                  const coreElement = wrapper.find(tagName).element as YCoreFieldWrapper

                  const propValue = coreElement[testCase.prop as keyof YCoreFieldWrapper]
                  expect(propValue).toBe(testCase.value)
                },
              )
            }
          },
        )
      },
    )
  },
)
