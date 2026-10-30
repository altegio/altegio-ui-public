import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { AltCoreFieldWrapperTagName } from '~shared/constants'
import type { TPropTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'

import { AltFieldWrapper } from '~vue/ui/fieldWrapper'
import {
  type IAltVueFieldWrapperProps,
} from '~vue/ui/fieldWrapper/models/types'
import { AltCoreFieldWrapper } from '~core/ui/fieldWrapper'

const tagName = AltCoreFieldWrapperTagName

const slotDefaultTestCases = [
  { case: 'with content', content: text },
  { case: 'without content', content: empty },
]


const propTestCases: TPropTestCase<IAltVueFieldWrapperProps, keyof IAltVueFieldWrapperProps>[] = [
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
  'Vue/AltFieldWrapper',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          AltCoreFieldWrapper,
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
                `Slot should render ${testCase.case}`,
                () => {
                  const wrapper = mount(
                    AltFieldWrapper,
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
                `Prop "${testCase.prop}" should set ${testCase.prop} on the core component`,
                () => {
                  const wrapper = mount(
                    AltFieldWrapper,
                    { props: { [testCase.prop]: testCase.value } },
                  )

                  const coreElement = wrapper.find(tagName).element as AltCoreFieldWrapper

                  const propValue = coreElement[testCase.prop as keyof AltCoreFieldWrapper]
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
