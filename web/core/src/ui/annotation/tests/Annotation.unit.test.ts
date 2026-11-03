import { beforeAll, afterEach, afterAll, describe, expect, it } from 'vitest'

import type { TPropTestCase } from '~shared/types/tests'
import { getWCShadowRoot } from '~shared/tests/utils'
import { useCoreTests } from '~shared/tests/core'
import { EAltCoreTextVariant, EAltCoreTextSize } from '~core/ui/text/models/types'
import { text } from '~shared/tests/slotContents'
import { AltCoreAnnotationTagName, AltCoreTextTagName } from '~shared/constants'
import '~core/ui/annotation'
import {
  createCoreAnnotationExternalProps,
  type IAltCoreAnnotationExternalProps,
} from '~core/ui/annotation/models/types'

// Unit test cases:
const propDisabledTestCases: TPropTestCase<IAltCoreAnnotationExternalProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'false', value: false, expected: EAltCoreTextVariant.SECONDARY },
  { prop: 'disabled', case: 'true', value: true, expected: EAltCoreTextVariant.TERTIARY },
]

const tagName = AltCoreAnnotationTagName

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
  'Core/AltCoreAnnotation',
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
            const textComponent = getWCShadowRoot(component).querySelector(AltCoreTextTagName)

            expect(textComponent?.size).toContain(EAltCoreTextSize.A2_REGULAR)
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

                const textComponent = getWCShadowRoot(component).querySelector(AltCoreTextTagName)
                const textContent = textComponent?.textContent

                expect(textContent).toContain(text)
              },
            )

            for (const testCase of propDisabledTestCases) {
              it(
                `Should set text variant = ${String(testCase.expected)} when the disabled prop = ${String(testCase.value)}`,
                async() => {
                  await updateComponent({ props: { disabled: testCase.value } })

                  const textComponent = getWCShadowRoot(component).querySelector(AltCoreTextTagName)

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
