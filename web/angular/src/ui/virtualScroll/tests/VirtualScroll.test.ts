import { describe, expect, it, vi } from 'vitest'
import { Component, ViewChild } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { AltCoreVirtualScrollTagName as tagName } from '~shared/constants'
import { AltVirtualScroll } from '~ng/ui/virtualScroll'
import type { AltCoreVirtualScroll } from '~core/ui/virtualScroll'
import type { IAltCoreVirtualScrollRange } from '~core/ui/virtualScroll/models/types'

const items = Array.from({ length: 1000 }, (_, index) => `Client ${index + 1}`)

const createFixture = async(onRangeChange?: (range: IAltCoreVirtualScrollRange) => void) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltVirtualScroll] }).compileComponents()

  @Component({
    template: `
      <AltVirtualScroll
        [items]="items"
        [itemSize]="40"
        [overscan]="2"
        accessibleName="Clients"
        style="height: 200px;"
        (rangeChange)="handleRangeChange($event)"
      >
        <ng-template let-item let-index="index"><span>{{ index }}: {{ item }}</span></ng-template>
      </AltVirtualScroll>
    `,
    imports: [AltVirtualScroll],
    standalone: true,
  })
  class TestComponent {
    @ViewChild(AltVirtualScroll) virtualScroll!: AltVirtualScroll<string>
    items = items
    handleRangeChange = (range: IAltCoreVirtualScrollRange) => onRangeChange?.(range)
  }

  const fixture = TestBed.createComponent(TestComponent)
  document.body.append(fixture.nativeElement as HTMLElement)
  fixture.detectChanges()
  await fixture.whenStable()

  const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)!
  await vi.waitFor(() => {
    fixture.detectChanges()
    expect(coreElement.children.length).toBeGreaterThan(0)
  })

  return { fixture, coreElement }
}

const getRows = (coreElement: AltCoreVirtualScroll) => Array.from(coreElement.children) as HTMLElement[]

describe(
  'Angular/AltVirtualScroll',
  () => {
    it(
      'Should pass the inputs and the item count to the core component',
      async() => {
        const { fixture, coreElement } = await createFixture()

        expect(coreElement.itemCount).toBe(1000)
        expect(coreElement.itemSize).toBe(40)
        expect(coreElement.overscan).toBe(2)
        expect(coreElement.accessibleName).toBe('Clients')
        fixture.destroy()
      },
    )

    it(
      'Should render only the rows in range as list items of a fixed height',
      async() => {
        const onRangeChange = vi.fn()
        const { fixture, coreElement } = await createFixture(onRangeChange)
        const rows = getRows(coreElement)

        expect(onRangeChange).toHaveBeenCalledWith({ start: 0, end: 7 })
        expect(rows).toHaveLength(7)
        expect(rows[0].getAttribute('role')).toBe('listitem')
        expect(rows[0].getAttribute('aria-posinset')).toBe('1')
        expect(rows[0].getAttribute('aria-setsize')).toBe('1000')
        expect(rows[0].style.height).toBe('40px')
        expect(rows[0].textContent.trim()).toBe('0: Client 1')
        fixture.destroy()
      },
    )

    it(
      'Should render the next rows after "scrollToIndex"',
      async() => {
        const { fixture, coreElement } = await createFixture()

        fixture.componentInstance.virtualScroll.scrollToIndex(500)

        await vi.waitFor(() => {
          fixture.detectChanges()
          expect(getRows(coreElement)[0]?.getAttribute('aria-posinset')).toBe('499')
        })
        expect(getRows(coreElement)[0].textContent.trim()).toBe('498: Client 499')
        fixture.destroy()
      },
    )
  },
)
