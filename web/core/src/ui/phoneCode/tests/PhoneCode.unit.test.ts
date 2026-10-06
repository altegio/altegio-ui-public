import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { YCorePhoneCodeTagName } from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import { createCorePhoneCodeProps } from '~core/ui/phoneCode/models/types'
import '~core/ui/phoneCode'
import {
  propCodeTestCases,
  propDisabledTestCases,
  propReadonlyTestCases,
  propSizeTestCases,
} from './cases/props'

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  YCorePhoneCodeTagName,
  createCorePhoneCodeProps(),
)

describe('Core/YPhoneCode', () => {
  beforeAll(() => {
    injectComponentToBody()
  })

  afterEach(async() => {
    await resetComponent()
  })

  afterAll(() => {
    removeComponent()
  })

  describe('Props', () => {
    for (const testCase of [
      ...propCodeTestCases,
      ...propDisabledTestCases,
      ...propReadonlyTestCases,
      ...propSizeTestCases,
    ]) {
      it(`Prop "${testCase.prop}" должен быть ${testCase.case}`, async() => {
        await updateComponent({ props: { [testCase.prop]: testCase.value } })

        expect(component[testCase.prop]).toBe(testCase.value)
      })
    }
  })
})
