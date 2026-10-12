import { describe, expect, it, vi } from 'vitest'
import { Component, ChangeDetectionStrategy } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { YCoreCollapseTagName } from '~shared/constants'
import { YCollapse } from '~ng/ui/collapse'
import {
  type IYNgCollapseProps,
} from '~ng/ui/collapse/models/types'

import {
  slotDefaultTestCases,
} from './cases/slots'

import {
  propValueCases,
  propTypeCases,
  propVariantCases,
  propDraggableCases,
} from './cases/props'

import {
  eventCollapseChangeCases,
  eventCollapseMoveCases,
} from './cases/events'

const tagName = YCoreCollapseTagName

interface ICreateComponentArgs {
  slots?: {
    default?: string
  }
  props?: Partial<IYNgCollapseProps>
  events?: {
    collapseChangeEvent?: (event: Event) => void
    collapseMoveEvent?: (event: Event) => void
  }
}
const createComponent = async({ slots, props, events }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [YCollapse] }).compileComponents()

  @Component({
    template: `
      <YCollapse
        (collapse-change)="collapseChangeEvent($event)"
        (collapse-move)="collapseMoveEvent($event)"
        [value]="value"
        [type]="type"
        [variant]="variant"
        [draggable]="draggable"
      >{{content}}</YCollapse>`,
    imports: [YCollapse],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  class TestComponent {
    content = slots?.default || ''
    value = props?.value
    type = props?.type
    variant = props?.variant
    draggable = props?.draggable
    collapseChangeEvent = (event: Event) => {
      events?.collapseChangeEvent?.(event)
    }
    collapseMoveEvent = (event: Event) => {
      events?.collapseMoveEvent?.(event)
    }
    slots = slots
  }
  return TestComponent
}

describe(
  'Angular/YCollapse',
  () => {
    describe(
      'Unit',
      () => {
        describe(
          'Slots',
          () => {
            for (const testCase of slotDefaultTestCases) {
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

                  expect((fixture.nativeElement as HTMLElement).textContent).toBe(testCase.content)
                },
              )
            }
          },
        )

        describe(
          'Props',
          () => {
            for (const testCase of [
              ...propValueCases,
              ...propTypeCases,
              ...propVariantCases,
              ...propDraggableCases,
            ]) {
              it(
                `Prop "${testCase.prop}" должен изменить свойство ${testCase.prop} у core компонента`,
                async() => {
                  const component = await createComponent({
                    slots: {},
                    props: { [testCase.prop]: testCase.value },
                  })
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
            for (const testCase of [
              ...eventCollapseChangeCases,
              ...eventCollapseMoveCases,
            ]) {
              it(
                `Должен вызывать событие "${testCase.event}" в случае "${testCase.case}" при "${testCase.nodeEventName}"`,
                async() => {
                  const handleAction = vi.fn()
                  const component = await createComponent({ props: {} })
                  const fixture = TestBed.createComponent(component)
                  fixture.detectChanges()

                  await fixture.whenStable()
                  const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName) as HTMLElement

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
