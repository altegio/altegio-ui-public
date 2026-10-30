import { describe, expect, it, beforeAll, afterEach, afterAll } from 'vitest'

import { useVueTests } from '~shared/tests/vue'
import { AltColorIcon } from '~vue/ui/colorIcon'
import { AltCoreColorIcon } from '~core/ui/colorIcon'
import { AltCoreColorIconTagName } from '~shared/constants'

import {
  propSizeCases,
  propVariantCases,
  propDisabledCases,
  requiredTestProps,
} from './cases/props'

const {
  wrapper,
  updateComponent,
  resetComponent,
  removeComponent,
  initCoreComponent,
} = useVueTests(AltColorIcon)

describe(
  'Vue/AltColorIcon',
  () => {
    beforeAll(() => {
      initCoreComponent(AltCoreColorIconTagName, AltCoreColorIcon)
    })

    afterEach(async() => {
      await resetComponent()
    })

    afterAll(() => {
      removeComponent()
    })

    describe(
      'Unit',
      () => {
        describe(
          'Props',
          () => {
            for (const testCase of [
              ...propSizeCases,
              ...propVariantCases,
              ...propDisabledCases,
            ]) {
              it(
                `Prop "${testCase.prop}" should set ${testCase.prop} on the core component to "${testCase.case}"`,
                async() => {
                  await updateComponent({ props: { ...requiredTestProps, [testCase.prop]: testCase.value } })
                  const coreElement = wrapper.find(AltCoreColorIconTagName)

                  expect(coreElement.element[testCase.prop]).toBe(testCase.expected)
                },
              )
            }
          },
        )
      },
    )
  },
)

