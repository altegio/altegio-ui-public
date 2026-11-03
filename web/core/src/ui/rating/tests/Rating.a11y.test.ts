import { afterEach, describe, expect, it, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import { AltCoreRatingTagName as tagName } from '~shared/constants'
import { expectNoAxeViolations, getDeepActiveElement, PATTERN_AXE_OPTIONS, waitForLitTree } from '~shared/tests/a11y'
import type { AltCoreRating } from '~core/ui/rating'
import type { RatingChangeEvent } from '~core/ui/rating/models/types'
import '~core/ui/rating'

const mountRating = async(props: Partial<AltCoreRating> = {}, parent: HTMLElement = document.body) => {
  const rating = document.createElement(tagName)
  Object.assign(rating, { accessibleName: 'Service rating', ...props })
  parent.append(rating)
  await waitForLitTree(rating)

  return rating
}

const getRadios = (rating: AltCoreRating) => Array.from(rating.shadowRoot?.querySelectorAll<HTMLElement>('[role="radio"]') ?? [])

const getChecked = (rating: AltCoreRating) => getRadios(rating).map((radio) => radio.getAttribute('aria-checked'))

afterEach(() => {
  document.body.replaceChildren()
})

describe('Core/AltCoreRating/Accessibility', () => {
  it('is a named radio group with one named radio per star and the checked star in the tab order', async() => {
    const rating = await mountRating({ value: 3 })
    const group = rating.shadowRoot?.querySelector('[role="radiogroup"]')

    expect(group?.getAttribute('aria-label')).toBe('Service rating')
    expect(getRadios(rating).map((radio) => radio.getAttribute('aria-label'))).toEqual(['1 of 5', '2 of 5', '3 of 5', '4 of 5', '5 of 5'])
    expect(getChecked(rating)).toEqual(['false', 'false', 'true', 'false', 'false'])
    expect(getRadios(rating).map((radio) => radio.tabIndex)).toEqual([-1, -1, 0, -1, -1])

    await userEvent.tab()
    expect(getDeepActiveElement()).toBe(getRadios(rating)[2])
    await expectNoAxeViolations(rating, PATTERN_AXE_OPTIONS)
  })

  it('puts the first star in the tab order when nothing is picked and names the group "Rating" by default', async() => {
    const rating = await mountRating({ accessibleName: undefined })

    expect(rating.shadowRoot?.querySelector('[role="radiogroup"]')?.getAttribute('aria-label')).toBe('Rating')
    expect(getRadios(rating).map((radio) => radio.tabIndex)).toEqual([0, -1, -1, -1, -1])
  })

  it('picks stars with the arrow keys, wrapping around, with Home, End and Space, and fires change', async() => {
    const rating = await mountRating({ value: 2 })
    const onChange = vi.fn()
    rating.addEventListener('change', onChange)

    getRadios(rating)[1].focus()
    await userEvent.keyboard('{ArrowRight}')
    await waitForLitTree(rating)
    expect(rating.value).toBe(3)
    expect(getDeepActiveElement()).toBe(getRadios(rating)[2])
    expect((onChange.mock.lastCall?.[0] as RatingChangeEvent).detail.value).toBe(3)

    await userEvent.keyboard('{ArrowLeft}{ArrowUp}{ArrowUp}')
    await waitForLitTree(rating)
    expect(rating.value).toBe(5)

    await userEvent.keyboard('{ArrowDown}')
    expect(rating.value).toBe(1)

    await userEvent.keyboard('{End}')
    expect(rating.value).toBe(5)

    await userEvent.keyboard('{Home}')
    await waitForLitTree(rating)
    expect(rating.value).toBe(1)
    expect(getChecked(rating)[0]).toBe('true')
    expect(onChange).toHaveBeenCalledTimes(7)
  })

  it('reverses ArrowLeft and ArrowRight in a right-to-left layout', async() => {
    const container = document.createElement('div')
    container.dir = 'rtl'
    document.body.append(container)
    const rating = await mountRating({ value: 2 }, container)

    getRadios(rating)[1].focus()
    await userEvent.keyboard('{ArrowLeft}')

    expect(rating.value).toBe(3)
  })

  it('picks the clicked star', async() => {
    const rating = await mountRating()
    const onChange = vi.fn()
    rating.addEventListener('change', onChange)

    await userEvent.click(getRadios(rating)[3])

    expect(rating.value).toBe(4)
    expect(onChange).toHaveBeenCalledOnce()
  })

  it('takes no input and leaves the tab order when disabled', async() => {
    const rating = await mountRating({ value: 2, disabled: true })
    const onChange = vi.fn()
    rating.addEventListener('change', onChange)

    expect(rating.shadowRoot?.querySelector('[role="radiogroup"]')?.getAttribute('aria-disabled')).toBe('true')
    expect(getRadios(rating).every((radio) => radio.tabIndex === -1)).toBe(true)

    getRadios(rating)[3].click()
    expect(rating.value).toBe(2)
    expect(onChange).not.toHaveBeenCalled()
  })

  it('shows a read-only score as an image named with the value, including fractions', async() => {
    const rating = await mountRating({ value: 4.5, readonly: true })
    const image = rating.shadowRoot?.querySelector('[role="img"]')
    const fills = Array.from(rating.shadowRoot?.querySelectorAll<HTMLElement>(`.${tagName}__fill`) ?? []).map((fill) => fill.style.width)

    expect(image?.getAttribute('aria-label')).toBe('Service rating: 4.5 of 5')
    expect(getRadios(rating)).toEqual([])
    expect(fills).toEqual(['100%', '100%', '100%', '100%', '50%'])
    await expectNoAxeViolations(rating, PATTERN_AXE_OPTIONS)
  })

  it('submits its value with a form, blocks a required form without a value and restores the value on reset', async() => {
    const form = document.createElement('form')
    document.body.append(form)
    const rating = await mountRating({ name: 'score', value: 4, required: true }, form)

    expect(new FormData(form).get('score')).toBe('4')

    getRadios(rating)[1].click()
    await waitForLitTree(rating)
    expect(new FormData(form).get('score')).toBe('2')

    rating.value = 0
    await waitForLitTree(rating)
    expect(new FormData(form).get('score')).toBeNull()
    expect(form.checkValidity()).toBe(false)

    form.reset()
    await waitForLitTree(rating)
    expect(rating.value).toBe(4)
    expect(form.checkValidity()).toBe(true)
  })

  it('names the read-only image with the value alone when there is no accessible name', async() => {
    const rating = await mountRating({ value: 3, readonly: true, accessibleName: undefined, max: 10 })

    expect(rating.shadowRoot?.querySelector('[role="img"]')?.getAttribute('aria-label')).toBe('3 of 10')
  })
})
