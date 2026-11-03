import { setProjectAnnotations } from '@storybook/web-components'
import { composeStories } from 'storybook/preview-api'
import type { ComposedStoryFn, Store_CSFExports } from 'storybook/internal/types'
import { afterEach, describe, expect, it } from 'vitest'

import * as previewAnnotations from '../../.storybook/preview'
import { getAxeViolations, waitForLitTree } from '~shared/tests/a11y'
import { knownViolations } from './knownViolations'

/**
 * Renders every core story and checks it with axe-core.
 * A story may only fail the rules listed for it in knownViolations.ts, and a listed rule must still fail:
 * fixing a violation means removing it from the list.
 */
const projectAnnotations = setProjectAnnotations([previewAnnotations])

const storyModules = import.meta.glob<Store_CSFExports>(
  '../ui/**/*.stories.ts',
  { eager: true },
)

afterEach(() => {
  document.body.replaceChildren()
})

for (const [
  path,
  storyModule,
] of Object.entries(storyModules)) {
  const stories = composeStories(
    storyModule,
    projectAnnotations,
  ) as Record<string, ComposedStoryFn>

  describe(path.replace('../ui/', ''), () => {
    for (const story of Object.values(stories)) {
      it(story.id, async() => {
        const canvasElement = document.createElement('div')
        document.body.append(canvasElement)

        await story.run({ canvasElement })
        await waitForLitTree(canvasElement)

        const violations = await getAxeViolations(canvasElement)
        const known = knownViolations[story.id] ?? []

        expect(
          violations.filter(({ id }) => !known.includes(id)),
          'new axe violations',
        ).toEqual([])
        expect(
          known.filter((id) => !violations.some((violation) => violation.id === id)),
          'fixed violations that knownViolations.ts still lists',
        ).toEqual([])
      })
    }
  })
}
