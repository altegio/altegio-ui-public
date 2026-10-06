import { describe, expect, it, beforeAll, afterEach, afterAll } from 'vitest'

import { useVueTests } from '~shared/tests/vue'
import { YColorIcon } from '~vue/ui/colorIcon'
import { YCoreColorIcon } from '~core/ui/colorIcon'
import { YCoreColorIconTagName } from '~shared/constants'

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
} = useVueTests(YColorIcon)

describe(
  'Vue/YColorIcon',
  () => {
    beforeAll(() => {
      initCoreComponent(YCoreColorIconTagName, YCoreColorIcon)
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
                `Prop "${testCase.prop}" должен изменить свойство ${testCase.prop} у core компонента на "${testCase.case}"`,
                async() => {
                  await updateComponent({ props: { ...requiredTestProps, [testCase.prop]: testCase.value } })
                  const coreElement = wrapper.find(YCoreColorIconTagName)

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

