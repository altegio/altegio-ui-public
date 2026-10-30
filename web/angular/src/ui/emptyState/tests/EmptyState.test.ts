import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { AltCoreEmptyStateTagName as tagName } from '~shared/constants'
import type { IAltNgEmptyStateProps } from '~ng/ui/emptyState/models/types'
import { AltEmptyState } from '~ng/ui/emptyState'
import {
  propDescriptionTestCases,
  propIconTestCases,
  propSizeTestCases,
  propTitleTestCases,
} from './cases/props'
import { slotActionsTestCases } from './cases/slots'

interface ICreateComponentArgs {
  slots?: {
    actions?: string
  }
  props?: Partial<IAltNgEmptyStateProps>
}

const createComponent = async({ props, slots }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltEmptyState] }).compileComponents()

  @Component({
    template: `
      <AltEmptyState
        [title]="title"
        [description]="description"
        [icon]="icon"
        [size]="size"
      >
        @if (actionsSlot) {
          <div actions>
            {{ actionsSlot }}
          </div>
        }
      </AltEmptyState>`,
    imports: [AltEmptyState],
    standalone: true,
  })
  class TestComponent {
    title = props?.title
    description = props?.description
    icon = props?.icon
    size = props?.size
    actionsSlot = slots?.actions
  }
  return TestComponent
}

describe(
  'Angular/AltEmptyState',
  () => {
    describe(
      'Props',
      () => {
        for (const testCase of [...propSizeTestCases]) {
          it(
            `Prop "${testCase.prop}" (${testCase.case}) should set ${testCase.prop} on the core component to "${String(testCase.expected)}"`,
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

        for (const testCase of [
          ...propTitleTestCases,
          ...propDescriptionTestCases,
        ]) {
          it(
            `Prop "${testCase.prop}" ${testCase.case} should set ${testCase.prop} on the core component to "${String(testCase.expected)}"`,
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

        for (const testCase of [...propIconTestCases]) {
          it(
            `Prop "${testCase.prop}" ${testCase.case} should set ${testCase.prop} on the core component to "${String(testCase.expected)}"`,
            async() => {
              const component = await createComponent({ props: { [testCase.prop]: testCase.value } })
              const fixture = TestBed.createComponent(component)
              fixture.detectChanges()

              await fixture.whenStable()

              const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)

              expect(coreElement?.[testCase.prop]?.name).toBe(testCase.expected)
            },
          )
        }
      },
    )

    describe(
      'Slots',
      () => {
        for (const testCase of [...slotActionsTestCases]) {
          it(
            `Slot "${testCase.slot}" should render ${testCase.case}`,
            async() => {
              const component = await createComponent({
                slots: testCase.content ? { [testCase.slot]: testCase.content } : {},
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
