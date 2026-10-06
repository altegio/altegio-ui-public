import { describe, expect, it, vi } from 'vitest'
import { YCoreTabsTagName as tagName } from '~shared/constants'
import { TestBed } from '~ng/tests/setup.ts'
import { YTabs } from '~ng/ui/tabs'
import { Component } from '@angular/core'
import {
  propsTabsTestCases,
} from '~ng/ui/tabs/tests/cases/props.ts'
import type { IYNgTabsProps } from '~ng/ui/tabs'
import { eventUpdateValue } from '~ng/ui/tabs/tests/cases/events.ts'

interface ICreateComponentArgs {
  props?: Partial<IYNgTabsProps>
}

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [YTabs] }).compileComponents()

  @Component({
    template: `
      <YTabs
        [tabs]="tabs"
        (valueChange)="changeActiveTabHandler($event)"
      >
      </YTabs>
    `,
    imports: [YTabs],
    standalone: true,
  })
  class TestComponent {
    tabs = props?.tabs

    changeActiveTabHandler = vi.fn()
  }
  return TestComponent
}

const basePropsCheck = () => {
  for (const testCase of [...propsTabsTestCases]) {
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

const baseEventsCheck = () => {
  for (const testCase of [...eventUpdateValue]) {
    it(
      `Event: должен генерировать событие ${testCase.event} ${testCase.case}`,
      async() => {
        const component = await createComponent({ props: {} })
        const fixture = TestBed.createComponent(component)
        const componentInstance = fixture.componentInstance
        fixture.detectChanges()

        await fixture.whenStable()

        const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
        const mockCoreEvent = new CustomEvent(
          testCase.coreEventName,
          {
            detail: testCase.payload,
            bubbles: true,
            cancelable: true,
          },
        )

        coreElement?.dispatchEvent(mockCoreEvent)

        expect(componentInstance[testCase.methodName]).toHaveBeenCalledWith(testCase.payload?.value)
      },
    )
  }
}

describe(
  'Angular/YTabs/Unit',
  () => {
    describe(
      'Props',
      () => {
        basePropsCheck()
      },
    )

    describe(
      'Events',
      () => {
        baseEventsCheck()
      },
    )
  },
)
