import { beforeAll, afterEach, describe, expect, it, afterAll } from 'vitest'
import { getShadowRootElement, getWCShadowRoot } from '~shared/tests/utils'
import { href } from '~shared/tests/mockData'
import { useCoreTests } from '~shared/tests/core'
import { YCoreLinkTagName } from '~shared/constants'
import '~core/ui/link'

import { createCoreLinkProps } from '~core/ui/link/models/types'
import { propTextWrapCases } from '~core/ui/link/tests/cases/unit'

const tagName = YCoreLinkTagName

const {
  component,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreLinkProps(),
)

describe(
  'Core/YCoreLink/Unit',
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
      'Integration',
      () => {
        it(
          'Должен рендерить элемент <a> с корректным href',
          async() => {
            component.href = href

            await component.updateComplete

            const anchorElement = getWCShadowRoot(component).querySelector('a')
            expect(anchorElement?.href).toBe(href)
          },
        )

        it(
          'Должен рендерить элемент <a> с корректным target',
          async() => {
            const target = '_blank'

            component.target = target

            await component.updateComplete

            const anchorElement = getWCShadowRoot(component).querySelector('a')
            expect(anchorElement).not.toBeNull()
            expect(anchorElement?.target).toBe(target)
          },
        )
      },
    )

    describe(
      'Unit',
      () => {
        it(
          'Должен отображать содержимое <slot> внутри элемента <a>',
          async() => {
            const slotContent = 'Click here'
            component.innerHTML = slotContent

            await component.updateComplete

            const slotElement = getRootElement()?.querySelector('slot')
            const slotAssignedNodes = slotElement?.assignedNodes({ flatten: true })

            const displayedContent = slotAssignedNodes
              ?.map((node) => node.nodeType === Node.TEXT_NODE ? node.textContent : '')
              .join('')
              .trim()

            expect(displayedContent).toBe(slotContent)
          },
        )

        for (const { textWrap, shouldHaveClass, description } of propTextWrapCases) {
          it(
            description,
            async() => {
              component.textWrap = textWrap

              await component.updateComplete

              const anchorElement = getWCShadowRoot(component).querySelector('a')
              expect(anchorElement).not.toBeNull()
              expect(anchorElement?.classList.contains(`${tagName}_text-wrap`)).toBe(shouldHaveClass)
            },
          )
        }
      },
    )
  },
)

const getRootElement = () => {
  return getShadowRootElement(
    component,
    tagName,
  )
}
