import { describe, expect, it, vi } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { AltCoreListItemTagName as tagName } from '~shared/constants'
import { AltListItem } from '~ng/ui/listItem'
import type { IAltNgListItemProps } from '~ng/ui/listItem/models/types'
import { EAltCoreListItemAlign } from '~core/ui/listItem/models/types'
import type { TPropTestCase } from '~shared/types/tests'

interface ICreateFixtureArgs {
  props?: Partial<IAltNgListItemProps>
  onClick?: () => void
}

const createFixture = async({ props, onClick }: ICreateFixtureArgs = {}) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltListItem] }).compileComponents()

  @Component({
    template: `
      <AltListItem
        [label]="label"
        [caption]="caption"
        [clickable]="clickable"
        [href]="href"
        [target]="target"
        [disabled]="disabled"
        [active]="active"
        [align]="align"
        (click)="handleClick()"
      >
        <span slot="start">Start</span>
        
        <span slot="end">End</span>
      </AltListItem>
    `,
    imports: [AltListItem],
    standalone: true,
  })
  class TestComponent {
    label = props?.label
    caption = props?.caption
    clickable = props?.clickable
    href = props?.href
    target = props?.target
    disabled = props?.disabled
    active = props?.active
    align = props?.align
    handleClick = () => onClick?.()
  }

  const fixture = TestBed.createComponent(TestComponent)
  fixture.detectChanges()
  await fixture.whenStable()

  return fixture
}

const getCoreElement = (fixture: Awaited<ReturnType<typeof createFixture>>) => {
  return (fixture.nativeElement as HTMLElement).querySelector(tagName) as HTMLElement & IAltNgListItemProps
}

const propTestCases: TPropTestCase<Required<IAltNgListItemProps>, keyof IAltNgListItemProps>[] = [
  { prop: 'label', case: 'with text', value: 'Label' },
  { prop: 'caption', case: 'with text', value: 'Caption' },
  { prop: 'clickable', case: 'true', value: true },
  { prop: 'href', case: 'with a URL', value: '#target' },
  { prop: 'target', case: '_blank', value: '_blank' },
  { prop: 'disabled', case: 'true', value: true },
  { prop: 'active', case: 'true', value: true },
  { prop: 'align', case: 'start', value: EAltCoreListItemAlign.START },
]

describe(
  'Angular/AltListItem',
  () => {
    describe(
      'Props',
      () => {
        for (const testCase of propTestCases) {
          it(
            `Prop "${testCase.prop}" (${testCase.case}) should be set on the core component`,
            async() => {
              const fixture = await createFixture({ props: { [testCase.prop]: testCase.value } })

              expect(getCoreElement(fixture)[testCase.prop]).toBe(testCase.value)
            },
          )
        }
      },
    )

    it(
      'Elements with a slot attribute should reach the named slots',
      async() => {
        const fixture = await createFixture()
        const coreElement = getCoreElement(fixture)

        expect(coreElement.querySelector('[slot="start"]')?.textContent).toBe('Start')
        expect(coreElement.querySelector('[slot="end"]')?.textContent).toBe('End')
      },
    )

    describe(
      'Events',
      () => {
        it(
          'The native click should reach the (click) listener',
          async() => {
            const onClick = vi.fn()
            const fixture = await createFixture({ props: { clickable: true }, onClick })

            getCoreElement(fixture).click()

            expect(onClick).toHaveBeenCalledTimes(1)
          },
        )

        it(
          'The native click should not reach the (click) listener while disabled',
          async() => {
            const onClick = vi.fn()
            const fixture = await createFixture({ props: { clickable: true, disabled: true }, onClick })

            getCoreElement(fixture).click()

            expect(onClick).not.toHaveBeenCalled()
          },
        )
      },
    )
  },
)
