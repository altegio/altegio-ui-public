import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import { AltCoreBannerTagName as tagName, AltCoreIconTagName } from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import {
  classWithModifier,
  getElementClasses,
  getShadowElement,
  getShadowRootElement,
  getWCShadowRoot,
  trimTextContent,
} from '~shared/tests/utils'
import { text } from '~shared/tests/slotContents'
import type { TPropTestCase } from '~shared/types/tests'
import { altInfo, altRocket, altWarningAlert } from '~shared/icons'

import '~core/ui/banner'

import {
  createCoreBannerProps,
  EAltCoreBannerLayout,
  EAltCoreBannerVariant,
  type IAltCoreBannerProps,
} from '~core/ui/banner/models/types'

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreBannerProps(),
)

const getRootElement = () => getShadowRootElement(component, tagName)

const propVariantTestCases: TPropTestCase<IAltCoreBannerProps, 'variant', string>[] = Object.values(EAltCoreBannerVariant)
  .map((variant) => ({ prop: 'variant', case: variant, value: variant, expected: classWithModifier(tagName, `variant-${variant}`) }))

const propLayoutTestCases: TPropTestCase<IAltCoreBannerProps, 'layout', string>[] = Object.values(EAltCoreBannerLayout)
  .map((layout) => ({ prop: 'layout', case: layout, value: layout, expected: classWithModifier(tagName, `layout-${layout}`) }))

const propRoleTestCases: TPropTestCase<IAltCoreBannerProps, 'variant', string>[] = [
  { prop: 'variant', case: 'information', value: EAltCoreBannerVariant.INFORMATION, expected: 'status' },
  { prop: 'variant', case: 'success', value: EAltCoreBannerVariant.SUCCESS, expected: 'status' },
  { prop: 'variant', case: 'warning', value: EAltCoreBannerVariant.WARNING, expected: 'alert' },
  { prop: 'variant', case: 'danger', value: EAltCoreBannerVariant.DANGER, expected: 'alert' },
]

const propIconTestCases: TPropTestCase<IAltCoreBannerProps, 'icon', string>[] = [
  { prop: 'icon', case: 'the given icon', value: altRocket, expected: altRocket.name, additionalProps: { variant: EAltCoreBannerVariant.INFORMATION } },
  { prop: 'icon', case: 'the information icon by default', value: undefined, expected: altInfo.name, additionalProps: { variant: EAltCoreBannerVariant.INFORMATION } },
  { prop: 'icon', case: 'the danger icon by default', value: undefined, expected: altWarningAlert.name, additionalProps: { variant: EAltCoreBannerVariant.DANGER } },
]

describe(
  'Core/AltCoreBanner/Unit',
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
        for (const testCase of [...propVariantTestCases, ...propLayoutTestCases]) {
          it(
            `Prop "${testCase.prop}" with value "${testCase.case}" should add the "${testCase.expected}" class`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              expect(getElementClasses(getRootElement())).toContain(testCase.expected)
            },
          )
        }

        for (const testCase of propRoleTestCases) {
          it(
            `Prop "variant" with value "${testCase.case}" should give the message role "${testCase.expected}"`,
            async() => {
              await updateComponent({ props: { variant: testCase.value } })

              const message = getShadowElement(component, `.${tagName}__message`)

              expect(message?.getAttribute('role')).toBe(testCase.expected)
            },
          )
        }

        it(
          'Props "title" and "description" should render the text',
          async() => {
            await updateComponent({ props: { title: 'Title', description: 'Description' } })

            expect(trimTextContent(getShadowElement(component, `.${tagName}__title`)?.textContent)).toBe('Title')
            expect(trimTextContent(getShadowElement(component, `.${tagName}__description`)?.textContent)).toBe('Description')
          },
        )

        it(
          'Prop "title" should not render the title element when empty',
          async() => {
            await updateComponent({ props: { title: '' } })

            expect(getShadowElement(component, `.${tagName}__title`)).toBeNull()
          },
        )

        for (const testCase of propIconTestCases) {
          it(
            `Prop "icon" should render ${testCase.case}`,
            async() => {
              await updateComponent({ props: { ...testCase.additionalProps, icon: testCase.value } })

              const iconElement = getWCShadowRoot(component).querySelector(AltCoreIconTagName)

              expect(iconElement?.icon.name).toBe(testCase.expected)
              expect(iconElement?.closest('[aria-hidden="true"]')).not.toBeNull()
            },
          )
        }

        it(
          'Prop "hideIcon" should remove the icon',
          async() => {
            await updateComponent({ props: { hideIcon: true } })

            expect(getShadowElement(component, `.${tagName}__icon`)).toBeNull()
            expect(getElementClasses(getRootElement())).not.toContain(classWithModifier(tagName, 'with-icon'))
          },
        )

        it(
          'Prop "closable" should render a labelled close button',
          async() => {
            await updateComponent({ props: { closable: true, closeLabel: 'Dismiss' } })

            const closeButton = getShadowElement(component, `.${tagName}__close`)

            expect(closeButton?.tagName).toBe('BUTTON')
            expect(closeButton?.getAttribute('type')).toBe('button')
            expect(closeButton?.getAttribute('aria-label')).toBe('Dismiss')
          },
        )

        it(
          'Prop "closable" set to false should not render the close button',
          async() => {
            await updateComponent({ props: { closable: false } })

            expect(getShadowElement(component, `.${tagName}__close`)).toBeNull()
          },
        )
      },
    )

    describe(
      'Slots',
      () => {
        it(
          'The default slot should replace the description',
          async() => {
            await updateComponent({ props: { description: 'Description' }, slots: { default: text } })

            const description = getShadowElement(component, `.${tagName}__description`)

            expect(trimTextContent(description?.textContent)).toBe('')
            expect(component.textContent).toContain(text)
          },
        )

        it(
          'The "actions" slot should be hidden while empty',
          async() => {
            await updateComponent({})

            const actions = getShadowElement(component, `.${tagName}__actions`)

            expect(getElementClasses(actions)).toContain(classWithModifier(`${tagName}__actions`, 'hidden'))
          },
        )

        it(
          'The "actions" slot should be shown when filled',
          async() => {
            await updateComponent({ slots: { actions: text } })

            const actions = getShadowElement(component, `.${tagName}__actions`)

            expect(getElementClasses(actions)).not.toContain(classWithModifier(`${tagName}__actions`, 'hidden'))
          },
        )
      },
    )

    describe(
      'Events',
      () => {
        it(
          'Should emit "close" when the close button is clicked',
          async() => {
            await updateComponent({ props: { closable: true } })

            const handleClose = vi.fn()
            const closeButton = getShadowElement(component, `.${tagName}__close`) as HTMLButtonElement | null
            component.addEventListener('close', handleClose)

            closeButton?.click()

            component.removeEventListener('close', handleClose)

            expect(handleClose).toHaveBeenCalledTimes(1)
          },
        )
      },
    )
  },
)
