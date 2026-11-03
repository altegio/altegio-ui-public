import { afterEach, describe, expect, it } from 'vitest'
import { page } from 'vitest/browser'
import { AltCoreButtonTagName } from '~shared/constants'
import type { AltCoreButton } from '~core/ui/button/Button.core'
import '~core/ui/button'

let button: AltCoreButton | undefined

afterEach(() => {
  button?.remove()
  button = undefined
})

describe('Core/AltCoreButton/Visual', () => {
  it('keeps the primary button appearance', async() => {
    button = document.createElement(AltCoreButtonTagName) as AltCoreButton
    button.label = 'Continue'
    document.body.append(button)
    await button.updateComplete
    await document.fonts.ready

    await expect.element(page.getByRole('button', { name: 'Continue' })).toMatchScreenshot('primary-button')
  })
})
