import { describe, expect, it, vi } from 'vitest'
import { Component } from '@angular/core'

import { TestBed } from '~ng/tests/setup'
import { dispatchEvent } from '~shared/tests/utils'

import { YCoreButtonDropdownTagName } from '~shared/constants'

import { YButtonDropdown } from '~ng/ui/buttonDropdown'
import type { IYNgButtonDropdownProps } from '~ng/ui/buttonDropdown/models/types'

import {
  propItemsTestCases,
  propVariantTestCases,
  propDisabledTestCases,
  propSizeCases,
  propLoadingTestCases,
  propLabelTestCases,
  propFullWidthTestCases,
  propAutoCloseTestCases,
} from './cases/props'
import {
  slotActivatorTestCases,
  slotContentTestCases,
} from './cases/slots'

const tagName = YCoreButtonDropdownTagName

interface ICreateComponentArgs {
  props?: Partial<IYNgButtonDropdownProps>
  slots?: {
    activator?: string
    content?: string
  }
}

const createComponent = async({ props, slots }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [YButtonDropdown] }).compileComponents()

  @Component({
    template: `
      <YButtonDropdown
        [label]="label"
        [variant]="variant"
        [size]="size"
        [disabled]="disabled"
        [loading]="loading"
        [fullWidth]="fullWidth"
        [autoClose]="autoClose"
        [items]="items"
        [iconType]="iconType"
        [activatorSlot]="activatorSlot"
        [contentSlot]="contentSlot"
      >
        @if (activatorSlot) {
          <div activator>
            {{ activatorSlot }}
          </div>
        }
        @if (contentSlot) {
          <div content>
            {{ contentSlot }}
          </div>
        }
      </YButtonDropdown>`,
    imports: [YButtonDropdown],
    standalone: true,
  })
  class TestComponent {
    label = props?.label
    disabled = props?.disabled
    variant = props?.variant
    size = props?.size
    loading = props?.loading
    fullWidth = props?.fullWidth
    autoClose = props?.autoClose
    items = props?.items
    iconType = props?.iconType
    activatorSlot = slots?.activator
    contentSlot = slots?.content
  }
  return TestComponent
}

describe(
  'Angular/ButtonDropdown',
  () => {
    describe(
      'Unit',
      () => {
        describe(
          'Props',
          () => {
            for (const testCase of [
              ...propItemsTestCases,
              ...propVariantTestCases,
              ...propDisabledTestCases,
              ...propSizeCases,
              ...propLoadingTestCases,
              ...propLabelTestCases,
              ...propFullWidthTestCases,
              ...propAutoCloseTestCases,
            ]) {
              it(
                `Prop "${testCase.prop}" должен изменить свойство ${testCase.prop} у core компонента. Case: ${testCase.case}`,
                async() => {
                  const component = await createComponent({ props: { [testCase.prop]: testCase.value } })
                  const fixture = TestBed.createComponent(component)
                  fixture.detectChanges()

                  await fixture.whenStable()

                  const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)

                  if (!coreElement) {
                    throw new Error('coreElement не найден')
                  }

                  expect(coreElement[testCase.prop]).toEqual(testCase.expected)
                },
              )
            }
          },
        )
        describe('Events', () => {
          it(
            'Должен испускать события "item-click"',
            async() => {
              const handleAction = vi.fn()
              const component = await createComponent({ props: {} })
              const fixture = TestBed.createComponent(component)
              fixture.detectChanges()

              await fixture.whenStable()
              const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName) as HTMLElement

              coreElement.addEventListener(
                'item-click',
                handleAction,
              )

              dispatchEvent(
                coreElement,
                'item-click',
                {
                  bubbles: true,
                  cancelable: true,
                },
              )

              expect(handleAction).toHaveBeenCalledTimes(1)
            },
          )
        })
        describe(
          'Slots',
          () => {
            for (const testCase of [
              ...slotActivatorTestCases,
              ...slotContentTestCases,
            ]) {
              it(
                `Slot "${testCase.slot}" должен быть ${testCase.case}`,
                async() => {
                  const component = await createComponent({
                    slots: { [testCase.slot]: testCase.content },
                    props: {},
                  })
                  const fixture = TestBed.createComponent(component)
                  fixture.detectChanges()

                  await fixture.whenStable()

                  expect((fixture.nativeElement as HTMLElement).textContent).toContain(testCase.content)
                },
              )
            }
          },
        )
      },
    )
  },
)
