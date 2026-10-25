import { afterEach, describe, expect, it } from 'vitest'
import { page } from 'vitest/browser'
import { YCoreButtonTagName } from '~shared/constants'
import type { YCoreButton } from '~core/ui/button/Button.core'
import '~core/ui/button'

let button: YCoreButton | undefined

afterEach(() => {
  button?.remove()
  button = undefined
})

describe('Core/YCoreButton/Visual', () => {
  it('keeps the primary button appearance', async() => {
    button = document.createElement(YCoreButtonTagName) as YCoreButton
    button.label = 'Continue'
    document.body.append(button)
    await button.updateComplete
    await document.fonts.ready

    await expect.element(page.getByRole('button', { name: 'Continue' })).toMatchScreenshot('primary-button')
  })
})
