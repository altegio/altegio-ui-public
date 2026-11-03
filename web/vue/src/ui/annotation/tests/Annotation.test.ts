import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { text } from '~shared/tests/slotContents'
import { AltCoreAnnotationTagName } from '~shared/constants'
import type { TPropTestCase } from '~shared/types/tests'
import { AltCoreAnnotation } from '~core/ui/annotation'

import {
  createVueAnnotationProps,
  type IAltVueAnnotationProps,
} from '~vue/ui/annotation/models/types'
import { AltAnnotation } from '~vue/ui/annotation'

const { text: defaultText, disabled: defaultDisabled } = createVueAnnotationProps()
const tagName = AltCoreAnnotationTagName

// Unit test cases:
const propTextTestCases: TPropTestCase<IAltVueAnnotationProps, 'text'>[] = [
  {
    prop: 'text',
    case: 'test text',
    value: text,
    expected: text,
  },
  {
    prop: 'text',
    case: 'default value',
    value: undefined,
    expected: defaultText,
  },
]
const propDisabledTestCases: TPropTestCase<IAltVueAnnotationProps, 'disabled'>[] = [
  {
    prop: 'disabled',
    case: 'true',
    value: true,
    expected: true,
  },
  {
    prop: 'disabled',
    case: 'default value',
    value: undefined,
    expected: defaultDisabled,
  },
]

describe(
  'Vue/AltAnnotation',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          AltCoreAnnotation,
        )
      }
    })

    describe(
      'Props',
      () => {
        for (const testCase of [
          ...propTextTestCases,
          ...propDisabledTestCases,
        ]) {
          it(
            `Prop "${testCase.prop}" should set ${testCase.prop} on the core component to "${testCase.case}"`,
            () => {
              const wrapper = mount(
                AltAnnotation,
                { props: { [testCase.prop]: testCase.value } },
              )

              const coreElement = wrapper.find(tagName)

              expect(coreElement.element[testCase.prop]).toBe(testCase.expected)
            },
          )
        }
      },
    )
  },
)
