import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { text } from '~shared/tests/slotContents'
import { AltCoreAnnotationTagName } from '~shared/constants'
import type { TPropTestCase } from '~shared/types/tests'
import { AltAnnotation } from '~ng/ui/annotation/Annotation.component'

import {
  createNgAnnotationProps,
  type IAltNgAnnotationProps,
} from '~ng/ui/annotation/models/types'

interface ICreateComponentArgs {
  props?: Partial<IAltNgAnnotationProps>
}

const createComponent = async({ props }: ICreateComponentArgs = {}) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltAnnotation] }).compileComponents()

  @Component({
    template: '<AltAnnotation [text]="text" [disabled]="disabled" />',
    imports: [AltAnnotation],
    standalone: true,
  })
  class TestComponent {
    text = props?.text
    disabled = props?.disabled
  }
  return TestComponent
}

const { text: defaultText, disabled: defaultDisabled } = createNgAnnotationProps()
const tagName = AltCoreAnnotationTagName


// Unit test cases:
const propTextTestCases: TPropTestCase<IAltNgAnnotationProps, 'text'>[] = [
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
const propDisabledTestCases: TPropTestCase<IAltNgAnnotationProps, 'disabled'>[] = [
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
  'Angular/AltAnnotation',
  () => {
    describe(
      'Props',
      () => {
        for (const testCase of [
          ...propTextTestCases,
          ...propDisabledTestCases,
        ]) {
          it(
            `Prop "${testCase.prop}" should set ${testCase.prop} on the core component to "${testCase.case}"`,
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
