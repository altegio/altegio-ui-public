import { beforeAll, afterEach, afterAll, describe, expect, it } from 'vitest'
import {
  AltCoreEmptyStateTagName as tagName, AltCoreIconTagName,
} from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import {
  classWithModifier,
  getElementClasses,
  getShadowRootElement,
  getWCShadowRoot,
  trimTextContent,
} from '~shared/tests/utils'
import { EAltSizes } from '~shared/types/global'
import type { TPropTestCase, TSlotTestCase } from '~shared/types/tests'

import '~core/ui/emptyState'
import '~core/ui/icon'

import {
  createCoreEmptyStateExternalProps,
  type IAltCoreEmptyStateExternalProps,
} from '~core/ui/emptyState/models/types/external'
import { empty, text } from '~shared/tests/slotContents'
import { altMagic, altRocket } from '~shared/icons'
import type { IAltCoreTooltipProps } from '~core/ui/tooltip/models/types'

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreEmptyStateExternalProps(),
)

const getLocalRootElement = () => {
  return getShadowRootElement(
    component,
    tagName,
  )
}

const localClassWithModifier = (modifier: string) => classWithModifier(
  tagName,
  modifier,
)

const propSizeTestCases: TPropTestCase<IAltCoreEmptyStateExternalProps, 'size'>[] = [
  { prop: 'size', case: EAltSizes.SMALL, value: EAltSizes.SMALL, expected: EAltSizes.SMALL },
  { prop: 'size', case: EAltSizes.MEDIUM, value: EAltSizes.MEDIUM, expected: EAltSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: undefined },
]

const propTitleTestCases: TPropTestCase<IAltCoreEmptyStateExternalProps, 'title'>[] = [
  { prop: 'title', case: 'with content', value: text, expected: text },
  { prop: 'title', case: 'without content', value: empty, expected: empty },
]

const propDescriptionTestCases: TPropTestCase<IAltCoreEmptyStateExternalProps, 'description'>[] = [
  { prop: 'description', case: 'with content', value: text, expected: text },
  { prop: 'description', case: 'without content', value: empty, expected: empty },
]

const propIconTestCases: TPropTestCase<IAltCoreEmptyStateExternalProps, 'icon'>[] = [
  { prop: 'icon', case: 'with the given icon', value: altRocket, expected: altRocket.name },
  { prop: 'icon', case: 'with the default icon', value: undefined, expected: altMagic.name },
]

export const slotActionsTestCases: TSlotTestCase<string, IAltCoreTooltipProps>[] = [
  { slot: 'actions', case: 'the "actions" slot is provided', content: 'Content' },
  { slot: 'actions', case: 'the "actions" slot is not provided', content: empty },
]

describe(
  'Core/AltCoreEmptyState/Unit',
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
        for (const testCase of propSizeTestCases) {
          const expectedCssClass = localClassWithModifier(`${testCase.prop}-${testCase.case}`)

          it(
            `Prop "${testCase.prop}" with value "${testCase.value}" should ${testCase.value ? '' : 'not'} change the rootElement class to "${expectedCssClass}"`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const rootElement = getLocalRootElement()
              const rootElementClasses = getElementClasses(rootElement)

              if (testCase.value) {
                expect(rootElementClasses).toContain(expectedCssClass)
              } else {
                expect(rootElementClasses).not.toContain(expectedCssClass)
              }
            },
          )
        }


        for (const testCase of [
          ...propTitleTestCases,
          ...propDescriptionTestCases,
        ]) {
          it(
            `Prop "${testCase.prop}" with value "${testCase.value}" should set the EmptyState text to "${String(testCase.expected)}"`,
            async() => {
              await updateComponent({ props: { title: testCase.value } })

              const rootElement = getLocalRootElement()
              expect(trimTextContent(rootElement?.textContent)).toBe(testCase.expected)
            },
          )
        }

        for (const testCase of propIconTestCases) {
          it(
            `Prop "${testCase.prop}" with value "${testCase.value?.name ?? 'undefined'}" should render Icon "${testCase.case}"`,
            async() => {
              await updateComponent({ props: { icon: testCase.value } })

              const iconElement = getWCShadowRoot(component).querySelector(AltCoreIconTagName)
              const icon = iconElement?.icon.name

              expect(icon).toBe(testCase.expected)
            },
          )
        }
      },
    )

    describe(
      'Slots',
      () => {
        for (const testCase of [...slotActionsTestCases]) {
          it(
            `Slot "${testCase.slot}" should ${testCase.content ? '' : 'not'} render when ${testCase.case}`,
            async() => {
              await updateComponent({
                slots: testCase.content
                    ? { [testCase.slot]: testCase.content }
                    : {},
              })

              expect(component.textContent).toContain(testCase.content)
            },
          )
        }
      },
    )
  },
)
