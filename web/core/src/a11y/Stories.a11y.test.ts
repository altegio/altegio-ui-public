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

const nextFrame = () => new Promise((resolve) => requestAnimationFrame(resolve))

const hasFiniteAnimations = () => document.getAnimations()
  .some((animation) => animation.playState === 'running' && Number.isFinite(animation.effect?.getComputedTiming().endTime))

/**
 * Lets entrance transitions, such as a dropdown fading in, finish before axe measures colors:
 * mid-fade text has a lower contrast, which made the check depend on timing. A transition may start a few
 * frames after the story renders, so this waits for three frames in a row without one (at most 30 frames).
 * Endless animations are not awaited.
 */
const waitForTransitions = async() => {
  let quietFrames = 0

  for (let frame = 0; frame < 30 && quietFrames < 3; frame++) {
    await nextFrame()
    quietFrames = hasFiniteAnimations() ? 0 : quietFrames + 1
  }
}

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
        await waitForTransitions()

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
