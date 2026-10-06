import { slotDefaultTestCases } from '~ng/ui/tab/tests/cases/slots.ts'
import { describe, expect, it } from 'vitest'
import { YCoreTabTagName as tagName } from '~shared/constants'
import { TestBed } from '~ng/tests/setup.ts'
import { YTab } from '~ng/ui/tab'
import { Component } from '@angular/core'
import {
  propsActiveTestCases,
  propsCounterValueTestCases,
  propsDisabledTestCases,
  propsIsCounterVisibleTestCases,
  propsIsTagVisibleTestCases,
  propsLeftIconSizeTestCases,
  propsTagTextTestCases,
  propsTagVariantTestCases,
  propsTextTestCases,
  propsLeftIconTestCases,
  propsLocatorTestCases,
  propsLocatorTagTestCases,
  propsLocatorCounterTestCases,
} from '~ng/ui/tab/tests/cases/props.ts'
import type { IYNgTabProps } from '~ng/ui/tab'

interface ICreateComponentArgs {
  slots?: {
    before?: string
    after?: string
    default?: string
  }
  props?: Partial<IYNgTabProps>
}

const createComponent = async({ slots, props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [YTab] }).compileComponents()

  @Component({
    template: `
      <YTab
        [tagVariant]="tagVariant"
        [counterValue]="counterValue"
        [leftIcon]="leftIcon"
        [leftIconSize]="leftIconSize"
        [text]="text"
        [active]="active"
        [disabled]="disabled"
        [isTagVisible]="isTagVisible"
        [tagText]="tagText"
        [isCounterVisible]="isCounterVisible"
        [locator]="locator"
        [locatorTag]="locatorTag"
        [locatorCounter]="locatorCounter"
      >
        @if (beforeSlot) {
          <ng-template #tabBefore>
            <div>
              {{ beforeSlot }}
            </div>
          </ng-template>
        }
        @if (afterSlot) {
          <ng-template #tabBefore>
            <div>
              {{ afterSlot }}
            </div>
          </ng-template>
        }
      </YTab>
    `,
    imports: [YTab],
    standalone: true,
  })
  class TestComponent {
    tagVariant = props?.tagVariant
    counterValue = props?.counterValue
    leftIcon = props?.leftIcon
    leftIconSize = props?.leftIconSize
    text = props?.text
    active = props?.active
    disabled = props?.disabled
    isTagVisible = props?.isTagVisible
    tagText = props?.tagText
    isCounterVisible = props?.isCounterVisible
    locator = props?.locator
    locatorTag = props?.locatorTag
    locatorCounter = props?.locatorCounter

    beforeSlot = slots?.before
    afterSlot = slots?.after
  }
  return TestComponent
}


const baseSlotsCheck = () => {
  for (const testCase of slotDefaultTestCases) {
    it(
      `Slot: "${testCase.slot}" должен быть ${testCase.case}`,
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
}

const basePropsCheck = () => {
  for (const testCase of [
    ...propsDisabledTestCases,
    ...propsActiveTestCases,
    ...propsIsTagVisibleTestCases,
    ...propsTagTextTestCases,
    ...propsIsCounterVisibleTestCases,
    ...propsTextTestCases,
    ...propsCounterValueTestCases,
    ...propsTagVariantTestCases,
    ...propsLeftIconSizeTestCases,
    ...propsLeftIconTestCases,
    ...propsLocatorTestCases,
    ...propsLocatorTagTestCases,
    ...propsLocatorCounterTestCases,
  ]) {
    it(
      `Prop: "${testCase.prop}" ${typeof testCase.value === 'object' ? JSON.stringify(testCase.value) : testCase.value} ${testCase.value === undefined ? 'не' : ''} должен изменить свойство ${testCase.prop} у core компонента`,
      async() => {
        const component = await createComponent({ props: { [testCase.prop]: testCase.value } })
        const fixture = TestBed.createComponent(component)
        fixture.detectChanges()

        await fixture.whenStable()

        const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)

        expect(coreElement?.[testCase.prop]).toEqual(testCase.expected)
      },
    )
  }
}

describe(
  'Angular/YTab/Unit',
  () => {
    describe(
      'Slots',
      () => {
        baseSlotsCheck()
      },
    )

    describe(
      'Props',
      () => {
        basePropsCheck()
      },
    )
  },
)
