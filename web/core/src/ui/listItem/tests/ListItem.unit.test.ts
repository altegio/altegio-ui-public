import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import { AltCoreListItemTagName as tagName } from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import {
  classWithModifier,
  getElementClasses,
  getShadowElement,
  getShadowRootElement,
  trimTextContent,
} from '~shared/tests/utils'
import { text } from '~shared/tests/slotContents'

import '~core/ui/listItem'

import { createCoreListItemProps, EAltCoreListItemAlign } from '~core/ui/listItem/models/types'

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreListItemProps(),
)

const getControl = () => getShadowElement(component, `.${tagName}__control`) as HTMLElement | null

const getSection = (section: string) => getShadowElement(component, `.${tagName}__${section}`)

const isSectionHidden = (section: string) => getElementClasses(getSection(section)).includes(classWithModifier(`${tagName}__${section}`, 'hidden'))

describe(
  'Core/AltCoreListItem/Unit',
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

    it(
      'Should have the "listitem" role',
      () => {
        expect(component.getAttribute('role')).toBe('listitem')
      },
    )

    describe(
      'Props',
      () => {
        it(
          'Props "label" and "caption" should render the text',
          async() => {
            await updateComponent({ props: { label: 'Label', caption: 'Caption' } })

            expect(trimTextContent(getSection('label')?.textContent)).toBe('Label')
            expect(trimTextContent(getSection('caption')?.textContent)).toBe('Caption')
            expect(isSectionHidden('caption')).toBe(false)
          },
        )

        it(
          'Prop "caption" should hide the caption section when empty',
          async() => {
            await updateComponent({ props: { caption: '' } })

            expect(isSectionHidden('caption')).toBe(true)
          },
        )

        it(
          'A static item should render a plain element',
          async() => {
            await updateComponent({ props: { clickable: false, href: undefined } })

            expect(getControl()?.tagName).toBe('DIV')
            expect(getElementClasses(getShadowRootElement(component, tagName))).not.toContain(classWithModifier(tagName, 'interactive'))
          },
        )

        it(
          'Prop "clickable" should render a button',
          async() => {
            await updateComponent({ props: { clickable: true } })

            const control = getControl()

            expect(control?.tagName).toBe('BUTTON')
            expect(control?.getAttribute('type')).toBe('button')
          },
        )

        it(
          'Prop "href" should render a link',
          async() => {
            await updateComponent({ props: { href: '#target', target: '_blank' } })

            const control = getControl()

            expect(control?.tagName).toBe('A')
            expect(control?.getAttribute('href')).toBe('#target')
            expect(control?.getAttribute('rel')).toBe('noopener noreferrer')
          },
        )

        it(
          'Prop "disabled" should disable the button',
          async() => {
            await updateComponent({ props: { clickable: true, disabled: true } })

            expect((getControl() as HTMLButtonElement | null)?.disabled).toBe(true)
            expect(getElementClasses(getShadowRootElement(component, tagName))).not.toContain(classWithModifier(tagName, 'interactive'))
          },
        )

        it(
          'Prop "disabled" should remove the link target',
          async() => {
            await updateComponent({ props: { href: '#target', disabled: true } })

            const control = getControl()

            expect(control?.hasAttribute('href')).toBe(false)
            expect(control?.getAttribute('aria-disabled')).toBe('true')
          },
        )

        it(
          'Prop "active" should set aria-current',
          async() => {
            await updateComponent({ props: { clickable: true, active: true } })

            expect(getControl()?.getAttribute('aria-current')).toBe('true')
            expect(getElementClasses(getShadowRootElement(component, tagName))).toContain(classWithModifier(tagName, 'active'))
          },
        )

        it(
          'Prop "align" should add the alignment class',
          async() => {
            await updateComponent({ props: { align: EAltCoreListItemAlign.START } })

            expect(getElementClasses(getShadowRootElement(component, tagName))).toContain(classWithModifier(tagName, 'align-start'))
          },
        )
      },
    )

    describe(
      'Slots',
      () => {
        it(
          'The default slot should replace the label',
          async() => {
            await updateComponent({ props: { label: 'Label' }, slots: { default: text } })

            expect(trimTextContent(getSection('label')?.textContent)).toBe('')
            expect(component.textContent).toContain(text)
          },
        )

        for (const section of ['start', 'end', 'caption']) {
          it(
            `The "${section}" slot should show its section when filled`,
            async() => {
              await updateComponent({ slots: { [section]: text } })

              expect(isSectionHidden(section)).toBe(false)
            },
          )
        }

        it(
          'The "start" and "end" sections should be hidden while empty',
          async() => {
            await updateComponent({})

            expect(isSectionHidden('start')).toBe(true)
            expect(isSectionHidden('end')).toBe(true)
          },
        )
      },
    )

    describe(
      'Events',
      () => {
        it(
          'Should let the click through when enabled',
          async() => {
            await updateComponent({ props: { clickable: true } })

            const handleClick = vi.fn()
            const control = getControl()
            component.addEventListener('click', handleClick)

            control?.click()

            component.removeEventListener('click', handleClick)

            expect(handleClick).toHaveBeenCalledTimes(1)
          },
        )

        it(
          'Should stop clicks on slotted content when disabled',
          async() => {
            await updateComponent({ props: { clickable: true, disabled: true }, slots: { start: text } })

            const handleClick = vi.fn()
            const slotted = component.querySelector('[slot="start"]') as HTMLElement | null
            component.addEventListener('click', handleClick)

            slotted?.click()

            component.removeEventListener('click', handleClick)

            expect(handleClick).not.toHaveBeenCalled()
          },
        )
      },
    )
  },
)
