import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import { useCoreTests } from '~shared/tests/core'
import { getShadowRootElement } from '~shared/tests/utils'

import {
  AltCoreIconButtonTagName,
  AltCorePaginationTagName,
  AltCoreSimpleButtonTagName,
} from '~shared/constants'
import { createCorePaginationProps, type ChangePageEvent } from '~core/ui/pagination/models/types'
import type { AltCoreIconButton } from '~core/ui/iconButton'
import type { AltCoreSimpleButton } from '~core/ui/simpleButton'
import '~core/ui/pagination'

const tagName = AltCorePaginationTagName

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCorePaginationProps(),
)

const getPageButtons = () => [
  ...getShadowRootElement(component, tagName)
    ?.querySelectorAll<AltCoreSimpleButton>(AltCoreSimpleButtonTagName) ?? [],
]

const getArrowButtons = () => {
  const buttons = getShadowRootElement(component, tagName)
    ?.querySelectorAll<AltCoreIconButton>(AltCoreIconButtonTagName)
  if (buttons?.length !== 2) throw new Error('Arrow buttons not found')

  return { previous: buttons[0], next: buttons[1] }
}

const listenToChangePage = () => {
  const handler = vi.fn()
  component.addEventListener('change-page', handler)

  return handler
}

const getChangedPage = (handler: ReturnType<typeof listenToChangePage>) => (handler.mock.calls[0][0] as ChangePageEvent).detail.page

describe(
  'Core/AltCorePagination/Unit',
  () => {
    beforeAll(() => {
      injectComponentToBody()
    })

    afterEach(async() => {
      await resetComponent()
    })

    afterAll(() => {
      removeComponent()
    })

    describe(
      'Props',
      () => {
        for (const { total, itemsPerPage, pages } of [
          { total: 0, itemsPerPage: 10, pages: 1 },
          { total: 10, itemsPerPage: 10, pages: 1 },
          { total: 11, itemsPerPage: 10, pages: 2 },
          { total: 95, itemsPerPage: 20, pages: 5 },
        ]) {
          it(
            `Should render ${pages} page buttons for ${total} items with ${itemsPerPage} items per page`,
            async() => {
              await updateComponent({ props: { total, itemsPerPage } })

              expect(getPageButtons().map((button) => button.textContent.trim())).toEqual(Array.from({ length: pages }, (_, index) => String(index + 1)))
            },
          )
        }

        it(
          'Should highlight and disable the current page button',
          async() => {
            await updateComponent({ props: { total: 30, itemsPerPage: 10, page: 2 } })

            expect(getPageButtons().map((button) => [button.variant, button.disabled])).toEqual([
              ['text', false],
              ['primary', true],
              ['text', false],
            ])
          },
        )

        for (const { page, previousDisabled, nextDisabled } of [
          { page: 1, previousDisabled: true, nextDisabled: false },
          { page: 2, previousDisabled: false, nextDisabled: false },
          { page: 3, previousDisabled: false, nextDisabled: true },
        ]) {
          it(
            `Should ${previousDisabled ? 'disable' : 'enable'} the previous and ${nextDisabled ? 'disable' : 'enable'} the next button on page ${page}`,
            async() => {
              await updateComponent({ props: { total: 30, itemsPerPage: 10, page } })

              const { previous, next } = getArrowButtons()

              expect(previous.disabled).toBe(previousDisabled)
              expect(next.disabled).toBe(nextDisabled)
            },
          )
        }

        it(
          'Should disable every button when disabled',
          async() => {
            await updateComponent({ props: { total: 30, itemsPerPage: 10, page: 2, disabled: true } })

            const { previous, next } = getArrowButtons()

            expect([previous, ...getPageButtons(), next].every((button) => button.disabled)).toBe(true)
          },
        )
      },
    )

    describe(
      'Events',
      () => {
        it(
          'Should emit "change-page" with the clicked page',
          async() => {
            await updateComponent({ props: { total: 30, itemsPerPage: 10, page: 1 } })
            const handler = listenToChangePage()

            getPageButtons()[2].click()

            expect(handler).toHaveBeenCalledTimes(1)
            expect(getChangedPage(handler)).toBe(3)
          },
        )

        for (const { arrow, page } of [
          { arrow: 'previous', page: 1 },
          { arrow: 'next', page: 3 },
        ] as const) {
          it(
            `Should emit "change-page" with page ${page} on the ${arrow} button click from page 2`,
            async() => {
              await updateComponent({ props: { total: 30, itemsPerPage: 10, page: 2 } })
              const handler = listenToChangePage()

              getArrowButtons()[arrow].click()

              expect(handler).toHaveBeenCalledTimes(1)
              expect(getChangedPage(handler)).toBe(page)
            },
          )
        }
      },
    )
  },
)
