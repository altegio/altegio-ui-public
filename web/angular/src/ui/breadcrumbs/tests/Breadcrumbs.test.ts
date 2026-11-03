import { describe, expect, it, vi } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { AltCoreBreadcrumbsItemTagName, AltCoreBreadcrumbsTagName } from '~shared/constants'
import { AltBreadcrumbs } from '~ng/ui/breadcrumbs'
import { AltBreadcrumbsItem } from '~ng/ui/breadcrumbsItem'

describe(
  'Angular/AltBreadcrumbs',
  () => {
    it(
      'Should pass inputs and items to the core components and mark the last item current',
      async() => {
        const onClick = vi.fn()
        TestBed.resetTestingModule()
        await TestBed.configureTestingModule({ imports: [AltBreadcrumbs, AltBreadcrumbsItem] }).compileComponents()

        @Component({
          template: `
            <AltBreadcrumbs accessibleName="You are here">
              <AltBreadcrumbsItem href="#a" target="_self" (click)="handleClick($event)">A</AltBreadcrumbsItem>
              
              <AltBreadcrumbsItem>B</AltBreadcrumbsItem>
            </AltBreadcrumbs>
          `,
          imports: [AltBreadcrumbs, AltBreadcrumbsItem],
          standalone: true,
        })
        class TestComponent {
          handleClick(event: Event) {
            event.preventDefault()
            onClick()
          }
        }

        const fixture = TestBed.createComponent(TestComponent)
        fixture.detectChanges()
        await fixture.whenStable()

        const element = fixture.nativeElement as HTMLElement
        const breadcrumbs = element.querySelector(AltCoreBreadcrumbsTagName)!
        const items = Array.from(element.querySelectorAll(AltCoreBreadcrumbsItemTagName))
        await Promise.all(items.map((item) => item.updateComplete))

        expect(breadcrumbs.accessibleName).toBe('You are here')
        expect(items.map((item) => [item.href, item.target])).toEqual([['#a', '_self'], [undefined, undefined]])
        expect(items.map((item) => item.shadowRoot?.querySelector('[aria-current]')?.textContent.trim() ?? null)).toEqual([null, ''])
        expect(items[1].shadowRoot?.querySelector('[aria-current="page"]')).not.toBeNull()
        expect(items[0].shadowRoot?.querySelector('.alt-core-breadcrumbs-item__separator')).toBeNull()

        items[0].click()
        expect(onClick).toHaveBeenCalledOnce()
      },
    )
  },
)
