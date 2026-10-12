import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { text } from '~shared/tests/slotContents'
import { YCoreAnnotationTagName } from '~shared/constants'
import type { TPropTestCase } from '~shared/types/tests'
import { YCoreAnnotation } from '~core/ui/annotation'

import {
  createVueAnnotationProps,
  type IYVueAnnotationProps,
} from '~vue/ui/annotation/models/types'
import { YAnnotation } from '~vue/ui/annotation'

const { text: defaultText, disabled: defaultDisabled } = createVueAnnotationProps()
const tagName = YCoreAnnotationTagName

// Unit test cases:
const propTextTestCases: TPropTestCase<IYVueAnnotationProps, 'text'>[] = [
  {
    prop: 'text',
    case: 'тестовый текст',
    value: text,
    expected: text,
  },
  {
    prop: 'text',
    case: 'значение по умолчанию',
    value: undefined,
    expected: defaultText,
  },
]
const propDisabledTestCases: TPropTestCase<IYVueAnnotationProps, 'disabled'>[] = [
  {
    prop: 'disabled',
    case: 'true',
    value: true,
    expected: true,
  },
  {
    prop: 'disabled',
    case: 'значение по умолчанию',
    value: undefined,
    expected: defaultDisabled,
  },
]

describe(
  'Vue/YAnnotation',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCoreAnnotation,
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
            `Prop "${testCase.prop}" должен изменить свойство ${testCase.prop} у core компонента на "${testCase.case}"`,
            () => {
              const wrapper = mount(
                YAnnotation,
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
