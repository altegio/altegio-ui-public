import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { AltCorePaginationTagName as tagName } from '~shared/constants'
import { AltCorePagination } from '~core/ui/pagination'
import { ChangePageEvent, createCorePaginationProps } from '~core/ui/pagination/models/types'
import { AltPagination } from '~vue/ui/pagination'
import type { IAltVuePaginationProps } from '~vue/ui/pagination/models/types'

const defaultProps = createCorePaginationProps()

describe(
  'Vue/AltPagination',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(tagName, AltCorePagination)
      }
    })

    describe(
      'Props',
      () => {
        it(
          'Should pass the default props to the core component',
          () => {
            const coreElement = mount(AltPagination).find(tagName).element as AltCorePagination

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
        ] as IAltVuePaginationProps[]) {
          const [[prop, value]] = Object.entries(props) as [[keyof typeof defaultProps, number | boolean]]

          it(
            `Prop "${prop}" should set ${prop} on the core component to ${String(value)}`,
            () => {
              const coreElement = mount(AltPagination, { props }).find(tagName).element as AltCorePagination

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
          'Should emit "change-page" with the core event and "update:page" with the page',
          () => {
            const wrapper = mount(AltPagination, { props: { page: 1, total: 30 } })
            const event = new ChangePageEvent('change-page', { detail: { page: 2, event: new Event('click') } })

            wrapper.find(tagName).element.dispatchEvent(event)

            expect(wrapper.emitted('change-page')).toEqual([[event]])
            expect(wrapper.emitted('update:page')).toEqual([[2]])
          },
        )
      },
    )
  },
)
