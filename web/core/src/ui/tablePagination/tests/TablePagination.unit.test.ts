import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { useCoreTests } from '~shared/tests/core'
import { getShadowRootElement } from '~shared/tests/utils'

import { AltCoreTablePaginationTagName } from '~shared/constants'
import { createCoreTablePaginationProps } from '~core/ui/tablePagination/models/types'
import { defineLocale } from '~core/i18n/locale/defineLocale'
import { en } from '~core/i18n/locale/en'
import { ru } from '~core/i18n/locale/ru'
import '~core/ui/tablePagination'

const tagName = AltCoreTablePaginationTagName

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreTablePaginationProps(),
)

const getRangeText = () => getShadowRootElement(component, tagName)
  ?.querySelector(':scope > alt-core-text')
  ?.textContent
  .trim()

const range = { page: 2, itemsPerPage: 10, total: 25 }

describe(
  'Core/AltCoreTablePagination/Unit',
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

    it(
      'Should render the item range with the English separator',
      async() => {
        await updateComponent({ props: { ...range, locale: en } })

        expect(getRangeText()).toBe('11-20 of 25')
      },
    )

    it(
      'Should render the item range with the separator of the current locale',
      async() => {
        await updateComponent({ props: { ...range, locale: ru } })

        expect(getRangeText()).toBe(`11-20 ${ru.messages.of} 25`)
      },
    )

    it(
      'Should fall back to the English separator when a custom locale has no "of" message',
      async() => {
        const custom = defineLocale({ ...en, messages: { cancel: 'Cancel', good: 'Good' } })
        await updateComponent({ props: { ...range, locale: custom } })

        expect(getRangeText()).toBe('11-20 of 25')
      },
    )
  },
)
