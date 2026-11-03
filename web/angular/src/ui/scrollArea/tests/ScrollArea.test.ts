import { describe, expect, it, vi } from 'vitest'
import { Component, ViewChild } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { AltCoreScrollAreaTagName as tagName } from '~shared/constants'
import { AltScrollArea } from '~ng/ui/scrollArea'
import type { IAltNgScrollAreaProps } from '~ng/ui/scrollArea/models/types'
import type { AltCoreScrollArea } from '~core/ui/scrollArea'
import type { IAltCoreScrollAreaPosition } from '~core/ui/scrollArea/models/types'
import type { TPropTestCase } from '~shared/types/tests'

interface ICreateFixtureArgs {
  props?: Partial<IAltNgScrollAreaProps>
  onScrollChange?: (position: IAltCoreScrollAreaPosition) => void
}

const createFixture = async({ props, onScrollChange }: ICreateFixtureArgs = {}) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltScrollArea] }).compileComponents()

  @Component({
    template: `
      <AltScrollArea
        [orientation]="orientation"
        [accessibleName]="accessibleName"
        style="height: 100px;"
        (scrollChange)="handleScrollChange($event)"
      >
        <div style="height: 1000px;">Content</div>
      </AltScrollArea>
    `,
    imports: [AltScrollArea],
    standalone: true,
  })
  class TestComponent {
    @ViewChild(AltScrollArea) scrollArea!: AltScrollArea
    orientation = props?.orientation
    accessibleName = props?.accessibleName
    handleScrollChange = (position: IAltCoreScrollAreaPosition) => onScrollChange?.(position)
  }

  const fixture = TestBed.createComponent(TestComponent)
  document.body.append(fixture.nativeElement as HTMLElement)
  fixture.detectChanges()
  await fixture.whenStable()

  return fixture
}

const getCoreElement = (fixture: { nativeElement: HTMLElement }) => fixture.nativeElement.querySelector(tagName)!

const propTestCases: TPropTestCase<Required<IAltNgScrollAreaProps>, keyof IAltNgScrollAreaProps>[] = [
  { prop: 'orientation', case: 'both', value: 'both' },
  { prop: 'accessibleName', case: 'with text', value: 'Terms' },
]

describe(
  'Angular/AltScrollArea',
  () => {
    for (const testCase of propTestCases) {
      it(
        `Input "${testCase.prop}" (${testCase.case}) should be set on the core component`,
        async() => {
          const fixture = await createFixture({ props: { [testCase.prop]: testCase.value } })

          expect(getCoreElement(fixture)[testCase.prop]).toBe(testCase.value)
        },
      )
    }

    it(
      'Should project the content and pass the host height to the core component',
      async() => {
        const fixture = await createFixture()
        const coreElement = getCoreElement(fixture) as AltCoreScrollArea

        expect(coreElement.textContent.trim()).toBe('Content')
        expect(coreElement.getBoundingClientRect().height).toBe(100)
        fixture.destroy()
      },
    )

    it(
      'Should scroll through its methods and emit "scrollChange"',
      async() => {
        const onScrollChange = vi.fn()
        const fixture = await createFixture({ onScrollChange })
        const { scrollArea } = fixture.componentInstance
        await (getCoreElement(fixture) as AltCoreScrollArea).updateComplete

        scrollArea.setScrollPosition('vertical', 450)

        await vi.waitFor(() => { expect(onScrollChange).toHaveBeenCalled() })
        expect(onScrollChange.mock.lastCall?.[0]).toMatchObject({ top: 450, topRatio: 0.5 })
        expect(scrollArea.getScrollPosition().top).toBe(450)

        scrollArea.setScrollPercentage('vertical', 1)
        await vi.waitFor(() => { expect(scrollArea.getScrollPosition().topRatio).toBe(1) })
        fixture.destroy()
      },
    )
  },
)
