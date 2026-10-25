import axe from 'axe-core'
import { afterEach, describe, expect, it } from 'vitest'
import { YCoreModalTagName } from '~shared/constants'
import type { YCoreModal } from '~core/ui/modal/Modal.core'
import '~core/ui/modal'

let modal: YCoreModal | undefined

afterEach(() => {
  modal?.remove()
  modal = undefined
})

describe('Core/YCoreModal/Accessibility', () => {
  it('exposes an accessible dialog when open', async() => {
    modal = document.createElement(YCoreModalTagName) as YCoreModal
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
