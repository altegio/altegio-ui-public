import axe from 'axe-core'
import { afterEach, describe, expect, it } from 'vitest'
import { AltCoreModalTagName } from '~shared/constants'
import type { AltCoreModal } from '~core/ui/modal/Modal.core'
import '~core/ui/modal'

let modal: AltCoreModal | undefined

afterEach(() => {
  modal?.remove()
  modal = undefined
})

describe('Core/AltCoreModal/Accessibility', () => {
  it('exposes an accessible dialog when open', async() => {
    modal = document.createElement(AltCoreModalTagName) as AltCoreModal
    modal.dialogLabel = 'Example dialog'
    modal.open = true
    document.body.append(modal)
    await modal.updateComplete
    await modal.updateComplete

    const results = await axe.run(modal)
    expect(results.violations.map(({ id, nodes }) => ({
      id,
      targets: nodes.map(({ target }) => target),
    }))).toEqual([])
  })
})
