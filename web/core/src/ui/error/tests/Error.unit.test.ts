import { beforeAll, afterEach, afterAll, describe, expect, it } from 'vitest'

import { text } from '~shared/tests/slotContents'
import { getWCShadowRoot } from '~shared/tests/utils'
import { useCoreTests } from '~shared/tests/core'
import { EAltCoreTextVariant, EAltCoreTextSize } from '~core/ui/text/models/types'
import { AltCoreErrorTagName, AltCoreTextTagName } from '~shared/constants'
import '~core/ui/error'
import { createCoreErrorProps } from '~core/ui/error/models/types'

const tagName = AltCoreErrorTagName

const {
  component,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreErrorProps(),
)

describe(
  'Core/AltCoreAnnotation/Unit',
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
          'Should set text size = A2_REGULAR',
          () => {
            const textElement = getWCShadowRoot(component).querySelector(AltCoreTextTagName)

            expect(textElement?.size).toContain(EAltCoreTextSize.A2_REGULAR)
          },
        )

        it(
          'Should set text variant = negative',
          () => {
            const textElement = getWCShadowRoot(component).querySelector(AltCoreTextTagName)

            expect(textElement?.variant).toContain(EAltCoreTextVariant.NEGATIVE)
          },
        )
      },
    )
    describe(
      'Unit',
      () => {
        it(
          'Should render the error as text when the array has one error',
          async() => {
            component.errors = [text]

            await component.updateComplete

            const textElement = getWCShadowRoot(component).querySelector(AltCoreTextTagName)

            expect(textElement?.textContent).toContain(text)
          },
        )

        it(
          'Should render a list of errors when the array has more than one error',
          async() => {
            const errors = [
              text,
              text,
            ]
            component.errors = errors

            await component.updateComplete

            const textElement = getWCShadowRoot(component).querySelector(AltCoreTextTagName)
            const errorList = textElement?.querySelector('ul')
            const errorItemsCount = errorList?.querySelectorAll('li').length

            expect(errorList).toBeDefined()
            expect(errorItemsCount).toBe(errors.length)
          },
        )
      },
    )
  },
)
