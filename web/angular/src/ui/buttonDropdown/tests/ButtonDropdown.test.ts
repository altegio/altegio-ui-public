import { describe, expect, it, vi } from 'vitest'
import { Component } from '@angular/core'

import { TestBed } from '~ng/tests/setup'

import { AltCoreButtonDropdownTagName } from '~shared/constants'

import { AltButtonDropdown } from '~ng/ui/buttonDropdown'
import type { IAltNgButtonDropdownProps } from '~ng/ui/buttonDropdown/models/types'

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

const tagName = AltCoreButtonDropdownTagName

interface ICreateComponentArgs {
  props?: Partial<IAltNgButtonDropdownProps>
  slots?: {
    activator?: string
    content?: string
  }
}

const createComponent = async({ props, slots }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltButtonDropdown] }).compileComponents()

  @Component({
    template: `
      <AltButtonDropdown
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
      </AltButtonDropdown>`,
    imports: [AltButtonDropdown],
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
                `Prop "${testCase.prop}" should set ${testCase.prop} on the core component. Case: ${testCase.case}`,
                async() => {
                  const component = await createComponent({ props: { [testCase.prop]: testCase.value } })
                  const fixture = TestBed.createComponent(component)
                  fixture.detectChanges()

                  await fixture.whenStable()

                  const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)

                  if (!coreElement) {
                    throw new Error('coreElement not found')
                  }

                  expect(coreElement[testCase.prop]).toEqual(testCase.expected)
                },
              )
            }
          },
        )
        describe('Events', () => {
          it(
            'Should emit "item-click" events',
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

              coreElement.dispatchEvent(new CustomEvent('item-click', {
                detail: { item: { id: 'example' } },
                bubbles: true,
                cancelable: true,
              }))

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
                `Slot "${testCase.slot}" should render ${testCase.case}`,
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
