import { describe, expect, it, vi } from 'vitest'
import { AltCoreTabsTagName as tagName } from '~shared/constants'
import { TestBed } from '~ng/tests/setup.ts'
import { AltTabs } from '~ng/ui/tabs'
import { Component } from '@angular/core'
import {
  propsTabsTestCases,
} from '~ng/ui/tabs/tests/cases/props.ts'
import type { IAltNgTabsProps } from '~ng/ui/tabs'
import { eventUpdateValue } from '~ng/ui/tabs/tests/cases/events.ts'

interface ICreateComponentArgs {
  props?: Partial<IAltNgTabsProps>
}

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltTabs] }).compileComponents()

  @Component({
    template: `
      <AltTabs
        [tabs]="tabs"
        (valueChange)="changeActiveTabHandler($event)"
      >
      </AltTabs>
    `,
    imports: [AltTabs],
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
      `Prop: "${testCase.prop}" ${typeof testCase.value === 'object' ? JSON.stringify(testCase.value) : testCase.value} should ${testCase.value === undefined ? 'not' : ''} set ${testCase.prop} on the core component`,
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
      `Event: should emit ${testCase.event} ${testCase.case}`,
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
  'Angular/AltTabs/Unit',
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
