import { beforeAll, afterEach, afterAll, describe, expect, it } from 'vitest'

import type { TPropTestCase } from '~shared/types/tests'
import { getWCShadowRoot } from '~shared/tests/utils'
import { useCoreTests } from '~shared/tests/core'
import { EYCoreTextVariant, EYCoreTextSize } from '~core/ui/text/models/types'
import { text } from '~shared/tests/slotContents'
import { YCoreAnnotationTagName, YCoreTextTagName } from '~shared/constants'
import '~core/ui/annotation'
import {
  createCoreAnnotationExternalProps,
  type IYCoreAnnotationExternalProps,
} from '~core/ui/annotation/models/types'

// Unit test cases:
const propDisabledTestCases: TPropTestCase<IYCoreAnnotationExternalProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'false', value: false, expected: EYCoreTextVariant.SECONDARY },
  { prop: 'disabled', case: 'true', value: true, expected: EYCoreTextVariant.TERTIARY },
]

const tagName = YCoreAnnotationTagName

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreAnnotationExternalProps(),
)

describe(
  'Core/YCoreAnnotation',
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
            const textComponent = getWCShadowRoot(component).querySelector(YCoreTextTagName)

            expect(textComponent?.size).toContain(EYCoreTextSize.A2_REGULAR)
          },
        )
      },
    )
    describe(
      'Unit',
      () => {
        describe(
          'Props',
          () => {
            it(
              'Should render the text prop in the text slot',
              async() => {
                await updateComponent({ props: { text } })

                const textComponent = getWCShadowRoot(component).querySelector(YCoreTextTagName)
                const textContent = textComponent?.textContent

                expect(textContent).toContain(text)
              },
            )

            for (const testCase of propDisabledTestCases) {
              it(
                `Should set text variant = ${String(testCase.expected)} when the disabled prop = ${String(testCase.value)}`,
                async() => {
                  await updateComponent({ props: { disabled: testCase.value } })

                  const textComponent = getWCShadowRoot(component).querySelector(YCoreTextTagName)

                  expect(textComponent?.variant).toContain(testCase.expected)
                },
              )
            }
          },
        )
      },
    )
  },
)
