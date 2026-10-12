import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { YCoreDropdownListTagName } from '~shared/constants'
import { YDropdownList } from '~ng/ui/dropdownList'
import {
  type IYNgDropdownListProps,
} from '~ng/ui/dropdownList/models/types'

import {
  slotTopTestCases,
  slotBottomTestCases,
  slotListTestCases,
} from './cases/slots'
import {
  propItemsTestCases,
  propItemLabelTestCases,
  propMinWidthTestCases,
} from './cases/props'

const tagName = YCoreDropdownListTagName

interface ICreateComponentArgs {
  slots?: {
    top?: string
    list?: string
    bottom?: string
  }
  props?: Partial<IYNgDropdownListProps>
}
const createComponent = async({ slots, props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [YDropdownList] }).compileComponents()

  @Component({
    template: `
      <YDropdownList
        [items]="items"
        [itemLabel]="itemLabel"
        [minWidth]="minWidth"
        [topSlot]="topSlot"
        [listSlot]="listSlot"
        [bottomSlot]="bottomSlot"
      >
        @if (topSlot) {
          <div dropdown-list-top>
            {{ topSlot }}
          </div>
        }

        @if (listSlot) {
          <div dropdown-list-list>
            {{ listSlot }}
          </div>
        }

        @if (bottomSlot) {
          <div dropdown-list-bottom>
            {{ bottomSlot }}
          </div>
        }
      </YDropdownList>
    `,
    imports: [YDropdownList],
    standalone: true,
  })
  class TestComponent {
    items = props?.items
    itemLabel = props?.itemLabel
    minWidth = props?.minWidth
    topSlot = slots?.top
    listSlot = slots?.list
    bottomSlot = slots?.bottom
  }
  return TestComponent
}

describe(
  'Angular/YDropdownList',
  () => {
    describe(
      'Unit',
      () => {
        describe(
          'Slots',
          () => {
            for (const testCase of [
              ...slotTopTestCases,
              ...slotBottomTestCases,
              ...slotListTestCases,
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
              ...propItemsTestCases,
              ...propItemLabelTestCases,
              ...propMinWidthTestCases,
            ]) {
              it(
                `Prop "${testCase.prop}" должен быть "${testCase.case}"`,
                async() => {
                  const component = await createComponent({ props: { [testCase.prop]: testCase.value } })
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
