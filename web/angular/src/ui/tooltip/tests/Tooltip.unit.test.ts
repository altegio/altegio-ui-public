import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { AltCoreTooltipTagName } from '~shared/constants'
import { AltTooltip } from '~ng/ui/tooltip'
import type { IAltNgTooltipProps } from '~ng/ui/tooltip/models/types'
import { slotContentTestCases, slotActivatorTestCases } from './cases/slots'
import { propDisabledTestCases, propPlacementTestCases, propTextTestCases } from './cases/props'

const tagName = AltCoreTooltipTagName

interface ICreateComponentArgs {
  slots?: {
    activator?: string
    content?: string
  }
  props?: Partial<IAltNgTooltipProps>
}
const createComponent = async({ slots, props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltTooltip] }).compileComponents()

  @Component({
    template: `
      <AltTooltip
        [text]="text"
        [disabled]="disabled"
        [placement]="placement"
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
      </AltTooltip>
    `,
    imports: [AltTooltip],
    standalone: true,
  })
  class TestComponent {
    text = props?.text
    disabled = props?.disabled
    placement = props?.placement
    activatorSlot = slots?.activator
    contentSlot = slots?.content
  }
  return TestComponent
}

describe(
  'Angular/AltTooltip',
  () => {
    describe(
      'Unit',
      () => {
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


        describe(
          'Props',
          () => {
            for (const testCase of [
              ...propTextTestCases,
              ...propDisabledTestCases,
              ...propPlacementTestCases,
            ]) {
              it(
                `Prop "${testCase.prop}" should be "${testCase.case}"`,
                async() => {
                  const component = await createComponent({ props: { [testCase.prop]: testCase.value, ...testCase.additionalProps } })
                  const fixture = TestBed.createComponent(component)
                  fixture.detectChanges()

                  await fixture.whenStable()

                  const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)

                  expect(JSON.stringify(coreElement?.[testCase.prop])).toBe(JSON.stringify(testCase.expected))
                },
              )
            }
          },
        )
      },
    )
  },
)
