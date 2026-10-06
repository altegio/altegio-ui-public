import { describe, expect, it, vi } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { YCoreCollapseItemTagName } from '~shared/constants'
import { YCollapseItem } from '~ng/ui/collapseItem'
import {
  type IYNgCollapseItemProps,
} from '~ng/ui/collapseItem/models/types'

import {
  slotBeforeTestCases,
  slotLabelTestCases,
  slotAnnotationTestCases,
  slotMainTestCases,
  slotContentTestCases,
  slotAfterTestCases,
} from './cases/slots'

import {
  propLabelCases,
  propAnnotationCases,
  propOpenedCases,
  propValueCases,
  propVariantCases,
} from './cases/props'

import {
  eventCollapseItemClickCases,
} from './cases/events'

const tagName = YCoreCollapseItemTagName

interface ICreateComponentArgs {
  slots?: {
    before?: string
    main?: string
    label?: string
    annotation?: string
    content?: string
    after?: string
  }
  props?: Partial<IYNgCollapseItemProps>
  events?: {
    collapseItemClickEvent?: (event: Event) => void
  }
}
const createComponent = async({ slots, props, events }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [YCollapseItem] }).compileComponents()

  @Component({
    template: `
      <YCollapseItem
        [label]="label"
        [annotation]="annotation"
        [opened]="opened"
        [value]="value"
        [variant]="variant"
        (collapse-item-click)="collapseItemClickEvent($event)"
      >
        @if (slots?.before) {
          <ng-template #collapseItemBefore><div>{{ slots.before }}</div></ng-template>
        }

        @if (slots?.after) {
          <ng-template #collapseItemAfter><div>{{ slots.after }}</div></ng-template>
        }

        @if (slots?.main) {
          <ng-template #collapseItemMain><div>{{ slots.main }}</div></ng-template>
        }

        @if (slots?.label) {
          <ng-template #collapseItemLabel><div>{{ slots.label }}</div></ng-template>
        }

        @if (slots?.annotation) {
          <ng-template #collapseItemAnnotation><div>{{ slots.annotation }}</div></ng-template>
        }

        @if (slots?.content) {
          <ng-template #collapseItemContent><div>{{ slots.content }}</div></ng-template>
        }
      </YCollapseItem>`,
    imports: [YCollapseItem],
    standalone: true,
  })
  class TestComponent {
    label = props?.label
    annotation = props?.annotation
    opened = props?.opened
    value = props?.value
    variant = props?.variant
    collapseItemClickEvent = (event: Event) => {
      events?.collapseItemClickEvent?.(event)
    }
    slots = slots
  }
  return TestComponent
}

describe(
  'Angular/YCollapseItem',
  () => {
    describe(
      'Unit',
      () => {
        describe(
          'Slots',
          () => {
            for (const testCase of [
              ...slotBeforeTestCases,
              ...slotLabelTestCases,
              ...slotAnnotationTestCases,
              ...slotMainTestCases,
              ...slotContentTestCases,
              ...slotAfterTestCases,
            ]) {
              it(
                `Slot "${testCase.slot}" должен быть ${testCase.case}`,
                async() => {
                  const component = await createComponent({ slots: { [testCase.slot]: testCase.content } })
                  const fixture = TestBed.createComponent(component)
                  fixture.detectChanges()

                  await fixture.whenStable()

                  const slotElement = (fixture.nativeElement as HTMLElement).querySelector(`[slot="${testCase.slot}"]`)

                  expect(slotElement?.textContent).toBe(testCase.content)
                },
              )
            }
          },
        )

        describe(
          'Props',
          () => {
            for (const testCase of [
              ...propLabelCases,
              ...propAnnotationCases,
              ...propOpenedCases,
              ...propValueCases,
              ...propVariantCases,
            ]) {
              it(
                `Prop "${testCase.prop}" должен быть "${JSON.stringify(testCase.expected)}" получая в случае "${testCase.case}" - "${JSON.stringify(testCase.value)}" в core "${testCase.prop}"`,
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

        describe(
          'Events',
          () => {
            for (const testCase of eventCollapseItemClickCases) {
              it(
                `Должен вызывать событие "${testCase.event}" в случае "${testCase.case}" при "${testCase.nodeEventName}"`,
                async() => {
                  const handleAction = vi.fn()
                  const component = await createComponent({ props: {} })
                  const fixture = TestBed.createComponent(component)
                  fixture.detectChanges()

                  await fixture.whenStable()
                  const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)

                  if (!coreElement) {
                    throw new Error('coreElement is not defined')
                  }

                  coreElement.addEventListener(
                    testCase.nodeEventName,
                    handleAction,
                  )

                  coreElement.dispatchEvent(new Event(testCase.nodeEventName))

                  expect(handleAction).toHaveBeenCalled()
                },
              )
            }
          },
        )
      },
    )
  },
)
