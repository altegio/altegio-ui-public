import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { YCoreTooltipTagName } from '~shared/constants'
import { YTooltip } from '~ng/ui/tooltip'
import type { IYNgTooltipProps } from '~ng/ui/tooltip/models/types'
import { slotContentTestCases, slotActivatorTestCases } from './cases/slots'
import { propDisabledTestCases, propPlacementTestCases, propTextTestCases } from './cases/props'

const tagName = YCoreTooltipTagName

interface ICreateComponentArgs {
  slots?: {
    activator?: string
    content?: string
  }
  props?: Partial<IYNgTooltipProps>
}
const createComponent = async({ slots, props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [YTooltip] }).compileComponents()

  @Component({
    template: `
      <YTooltip
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
      </YTooltip>
    `,
    imports: [YTooltip],
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
  'Angular/YTooltip',
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


        describe(
          'Props',
          () => {
            for (const testCase of [
              ...propTextTestCases,
              ...propDisabledTestCases,
              ...propPlacementTestCases,
            ]) {
              it(
                `Prop "${testCase.prop}" должен быть "${testCase.case}"`,
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
