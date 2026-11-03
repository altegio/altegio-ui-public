import { describe, expect, it, vi } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { AltCorePaginationTagName as tagName } from '~shared/constants'
import type { AltCorePagination } from '~core/ui/pagination'
import { ChangePageEvent, createCorePaginationProps } from '~core/ui/pagination/models/types'
import { AltPagination, type IAltNgPaginationProps } from '~ng/ui/pagination'

const defaultProps = createCorePaginationProps()

const createFixture = async(props: Partial<IAltNgPaginationProps> = {}) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltPagination] }).compileComponents()

  @Component({
    template: `
      <AltPagination
        [page]="page"
        [itemsPerPage]="itemsPerPage"
        [total]="total"
        [disabled]="disabled"
        (changePage)="handleChangePage($event)"
        (pageChange)="handlePageChange($event)"
      />
    `,
    imports: [AltPagination],
    standalone: true,
  })
  class TestComponent {
    page = props.page
    itemsPerPage = props.itemsPerPage
    total = props.total
    disabled = props.disabled

    handleChangePage = vi.fn()
    handlePageChange = vi.fn()
  }

  const fixture = TestBed.createComponent(TestComponent)
  fixture.detectChanges()
  await fixture.whenStable()

  const coreElement = (fixture.nativeElement as HTMLElement).querySelector<AltCorePagination>(tagName)
  if (!coreElement) throw new Error('Core element not found')

  return { fixture, coreElement }
}

describe(
  'Angular/AltPagination',
  () => {
    describe(
      'Props',
      () => {
        it(
          'Should pass the default props to the core component',
          async() => {
            const { coreElement } = await createFixture()

            expect({
              page: coreElement.page,
              itemsPerPage: coreElement.itemsPerPage,
              total: coreElement.total,
              disabled: coreElement.disabled,
            }).toEqual(defaultProps)
          },
        )

        for (const props of [
          { page: 3 },
          { itemsPerPage: 25 },
          { total: 120 },
          { disabled: true },
        ]) {
          const [[prop, value]] = Object.entries(props) as [[keyof IAltNgPaginationProps, number | boolean]]

          it(
            `Prop "${prop}" should set ${prop} on the core component to ${String(value)}`,
            async() => {
              const { coreElement } = await createFixture(props)

              expect(coreElement[prop]).toBe(value)
            },
          )
        }
      },
    )

    describe(
      'Events',
      () => {
        it(
          'Should emit "changePage" with the core event and "pageChange" with the page',
          async() => {
            const { fixture, coreElement } = await createFixture({ page: 1, total: 30 })
            const event = new ChangePageEvent('change-page', { detail: { page: 2, event: new Event('click') } })

            coreElement.dispatchEvent(event)

            expect(fixture.componentInstance.handleChangePage).toHaveBeenCalledWith(event)
            expect(fixture.componentInstance.handlePageChange).toHaveBeenCalledWith(2)
          },
        )
      },
    )
  },
)
