import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { text } from '~shared/tests/slotContents'
import { YCoreAnnotationTagName } from '~shared/constants'
import type { TPropTestCase } from '~shared/types/tests'
import { YAnnotation } from '~ng/ui/annotation/Annotation.component'

import {
  createNgAnnotationProps,
  type IYNgAnnotationProps,
} from '~ng/ui/annotation/models/types'

interface ICreateComponentArgs {
  props?: Partial<IYNgAnnotationProps>
}

const createComponent = async({ props }: ICreateComponentArgs = {}) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [YAnnotation] }).compileComponents()

  @Component({
    template: '<YAnnotation [text]="text" [disabled]="disabled" />',
    imports: [YAnnotation],
    standalone: true,
  })
  class TestComponent {
    text = props?.text
    disabled = props?.disabled
  }
  return TestComponent
}

const { text: defaultText, disabled: defaultDisabled } = createNgAnnotationProps()
const tagName = YCoreAnnotationTagName


// Unit test cases:
const propTextTestCases: TPropTestCase<IYNgAnnotationProps, 'text'>[] = [
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
const propDisabledTestCases: TPropTestCase<IYNgAnnotationProps, 'disabled'>[] = [
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
  'Angular/YAnnotation',
  () => {
    describe(
      'Props',
      () => {
        for (const testCase of [
          ...propTextTestCases,
          ...propDisabledTestCases,
        ]) {
          it(
            `Prop "${testCase.prop}" должен изменить свойство ${testCase.prop} у core компонента на "${testCase.case}"`,
            async() => {
              const component = await createComponent({ props: { [testCase.prop]: testCase.value } })
              const fixture = TestBed.createComponent(component)
              fixture.detectChanges()

              await fixture.whenStable()

              const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
              expect(coreElement?.[testCase.prop]).toBe(testCase.expected)
            },
          )
        }
      },
    )
  },
)
