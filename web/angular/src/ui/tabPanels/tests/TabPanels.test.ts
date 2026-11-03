import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { AltCoreTabPanelTagName, AltCoreTabPanelsTagName } from '~shared/constants'
import { AltTabPanels } from '~ng/ui/tabPanels'
import { AltTabPanel } from '~ng/ui/tabPanel'
import type { AltCoreTabPanel } from '~core/ui/tabPanel'
import type { AltCoreTabPanels } from '~core/ui/tabPanels'

const createFixture = async(value: string) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltTabPanels, AltTabPanel] }).compileComponents()

  @Component({
    template: `
      <AltTabPanels [value]="value">
        <AltTabPanel name="first" label="First">First</AltTabPanel>
        
        <AltTabPanel name="second" labelledby="second-tab">Second</AltTabPanel>
      </AltTabPanels>
    `,
    imports: [AltTabPanels, AltTabPanel],
    standalone: true,
  })
  class TestComponent {
    value = value
  }

  const fixture = TestBed.createComponent(TestComponent)
  fixture.detectChanges()
  await fixture.whenStable()

  const element = fixture.nativeElement as HTMLElement
  const panels = Array.from(element.querySelectorAll<AltCoreTabPanel>(AltCoreTabPanelTagName))
  await Promise.all(panels.map((panel) => panel.updateComplete))

  return { fixture, element, panels }
}

describe(
  'Angular/AltTabPanels',
  () => {
    it(
      'Should pass the value to the core component',
      async() => {
        const { element } = await createFixture('second')

        expect(element.querySelector<AltCoreTabPanels>(AltCoreTabPanelsTagName)?.value).toBe('second')
      },
    )

    it(
      'Should pass the panel props to the core panels',
      async() => {
        const { panels: [first, second] } = await createFixture('first')

        expect(first.name).toBe('first')
        expect(first.label).toBe('First')
        expect(second.labelledby).toBe('second-tab')
      },
    )

    it(
      'Should show the panel whose name equals the value',
      async() => {
        const { panels } = await createFixture('second')

        expect(panels.map((panel) => panel.active)).toStrictEqual([false, true])
      },
    )
  },
)
