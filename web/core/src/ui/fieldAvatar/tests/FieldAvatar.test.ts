import { beforeAll, afterEach, afterAll, describe, expect, it } from 'vitest'
import {
  AltCoreAvatarTagName,
  AltCoreFieldAvatarTagName,
} from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import {
  createCoreFieldAvatarProps,
} from '~core/ui/fieldAvatar/models/types'
import '~core/ui/fieldAvatar'
import { getWCShadowRoot } from '~shared/tests/utils'
import {
  propDisabledTestCases,
  propIconTestCases,
  propInitialsTestCases, propPhotoTestCases,
  propSizeTestCases,
} from '~core/ui/fieldAvatar/tests/cases/props'

const tagName = AltCoreFieldAvatarTagName

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreFieldAvatarProps(),
)

type TSubComponent = typeof AltCoreAvatarTagName

const getSubWC = <T extends TSubComponent>(primaryWC: HTMLElement, secondaryWC: T) => {
  const subWC = getWCShadowRoot(primaryWC).querySelector(secondaryWC)
  if (!subWC) throw new Error(`${secondaryWC} not found`)
  return subWC
}

describe(
  'Core/AltFieldAvatar',
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
      'Unit',
      () => {
        describe(
          'Props',
          () => {
            for (const { prop, case: propCase, value, expected } of [
              ...propDisabledTestCases,
              ...propSizeTestCases,
              ...propIconTestCases,
              ...propInitialsTestCases,
              ...propPhotoTestCases,
            ]) {
              it(
                `Prop "${prop}" should be "${propCase}" and passed to avatar`,
                async() => {
                  await updateComponent({ props: { [prop]: value } })

                  const inputField = getSubWC(
                    component,
                    AltCoreAvatarTagName,
                  )

                  expect(inputField[prop]).toBe(expected)
                },
              )
            }
          },
        )
      },
    )
  },
)
