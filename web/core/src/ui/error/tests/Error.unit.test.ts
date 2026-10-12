import { beforeAll, afterEach, afterAll, describe, expect, it } from 'vitest'

import { text } from '~shared/tests/slotContents'
import { getWCShadowRoot } from '~shared/tests/utils'
import { useCoreTests } from '~shared/tests/core'
import { EYCoreTextVariant, EYCoreTextSize } from '~core/ui/text/models/types'
import { YCoreErrorTagName, YCoreTextTagName } from '~shared/constants'
import '~core/ui/error'
import { createCoreErrorProps } from '~core/ui/error/models/types'

const tagName = YCoreErrorTagName

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
  'Core/YCoreAnnotation/Unit',
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
          'Должен иметь у text size = A2_REGULAR',
          () => {
            const textElement = getWCShadowRoot(component).querySelector(YCoreTextTagName)

            expect(textElement?.size).toContain(EYCoreTextSize.A2_REGULAR)
          },
        )

        it(
          'Должен иметь у text variant = negative',
          () => {
            const textElement = getWCShadowRoot(component).querySelector(YCoreTextTagName)

            expect(textElement?.variant).toContain(EYCoreTextVariant.NEGATIVE)
          },
        )
      },
    )
    describe(
      'Unit',
      () => {
        it(
          'Должен отрендерить ошибку в текст если в переданном массиве одна ошибка',
          async() => {
            component.errors = [text]

            await component.updateComplete

            const textElement = getWCShadowRoot(component).querySelector(YCoreTextTagName)

            expect(textElement?.textContent).toContain(text)
          },
        )

        it(
          'Должен отрендерить список ошибок если в переданном массиве больше одной ошибки',
          async() => {
            const errors = [
              text,
              text,
            ]
            component.errors = errors

            await component.updateComplete

            const textElement = getWCShadowRoot(component).querySelector(YCoreTextTagName)
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
