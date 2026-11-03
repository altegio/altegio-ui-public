import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { AltCoreListTagName as tagName } from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import { createCoreListProps } from '~core/ui/list/models/types'

import '~core/ui/list'
import '~core/ui/listItem'

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreListProps(),
)

describe(
  'Core/AltCoreList/Unit',
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
      'Should have the "list" role',
      () => {
        expect(component.getAttribute('role')).toBe('list')
      },
    )

    it(
      'Should keep a role set by the consumer',
      () => {
        const list = document.createElement(tagName)
        list.setAttribute('role', 'menu')
        document.body.appendChild(list)

        expect(list.getAttribute('role')).toBe('menu')

        list.remove()
      },
    )

    it(
      'Prop "separator" should reflect to the attribute',
      async() => {
        await updateComponent({ props: { separator: true } })

        expect(component.hasAttribute('separator')).toBe(true)
      },
    )

    it(
      'Prop "separator" should draw a line under every item but the last',
      async() => {
        component.innerHTML = '<alt-core-list-item label="1"></alt-core-list-item><alt-core-list-item label="2"></alt-core-list-item>'
        await updateComponent({ props: { separator: true } })

        const [first, last] = Array.from(component.children)

        expect(getComputedStyle(first).borderBottomStyle).toBe('solid')
        expect(getComputedStyle(last).borderBottomStyle).toBe('none')
      },
    )
  },
)
