import { describe, expect, it, vi } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { AltCoreChipTagName as tagName } from '~shared/constants'
import { type IAltNgChipProps } from '~ng/ui/chip/models/types'
import { AltChip } from '~ng/ui/chip'
import { propActiveTestCases, propDisabledTestCases, propIconLeftTestCases, propLabelTestCases, propSizeTestCases } from './cases/props'
import { dispatchEvent } from '~shared/tests/utils'

interface ICreateComponentArgs {
  props?: Partial<IAltNgChipProps>
}

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltChip] }).compileComponents()

  @Component({
    template: `
      <AltChip
        [labelText]="labelText"
        [iconLeft]="iconLeft"
        [size]="size"
        [active]="active"
        [disabled]="disabled"
      />`,
    imports: [AltChip],
    standalone: true,
  })
  class TestComponent {
    labelText = props?.labelText
    iconLeft = props?.iconLeft
    size = props?.size
    active = props?.active
    disabled = props?.disabled
  }
  return TestComponent
}

describe(
  'Angular/AltChip',
  () => {
    describe(
      'Props',
      () => {
        for (const testCase of propLabelTestCases) {
          it(
            `Prop "${testCase.prop}" (${testCase.case}) should set ${testCase.prop} on the core component`,
            async() => {
              const component = await createComponent({ props: { [testCase.prop]: testCase.value } })
              const fixture = TestBed.createComponent(component)
              fixture.detectChanges()

              await fixture.whenStable()

              const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)

              expect(coreElement?.[testCase.prop]).toBe(testCase.value)
            },
          )
        }

        for (const testCase of propIconLeftTestCases) {
          it(
            `Prop "${testCase.prop}" (${testCase.case}) should set ${testCase.prop} on the core component`,
            async() => {
              const component = await createComponent({ props: { [testCase.prop]: testCase.value } })
              const fixture = TestBed.createComponent(component)
              fixture.detectChanges()

              await fixture.whenStable()

              const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)

              expect(coreElement?.[testCase.prop]).toStrictEqual(testCase.value)
            },
          )
        }

        for (const testCase of [
          ...propSizeTestCases,
          ...propActiveTestCases,
          ...propDisabledTestCases,
        ]) {
          it(
            `Prop "${testCase.prop}" (${testCase.case}) should set ${testCase.prop} on the core component`,
            async() => {
              const component = await createComponent({ props: { [testCase.prop]: testCase.value } })
              const fixture = TestBed.createComponent(component)
              fixture.detectChanges()

              await fixture.whenStable()

              const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)

              expect(coreElement?.[testCase.prop]).toBe(testCase.value)
            },
          )
        }
      },
    )

    describe('Events', () => {
      it(
        'Should emit click on the core Chip component',
        async() => {
          const handleAction = vi.fn()
          const component = await createComponent({ props: {} })
          const fixture = TestBed.createComponent(component)
          fixture.detectChanges()

          await fixture.whenStable()
          const coreChip = (fixture.nativeElement as HTMLElement).querySelector(tagName) as HTMLElement

          coreChip.addEventListener(
            'click',
            handleAction,
          )

          dispatchEvent(
            coreChip,
            'click',
            {
              bubbles: true,
              cancelable: true,
            },
          )

          expect(handleAction).toHaveBeenCalledTimes(1)
        },
      )
    })
  },
)
