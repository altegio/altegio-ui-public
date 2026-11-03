import type { Meta, StoryObj } from '@storybook/angular'
import { AltScrollArea } from '~ng/ui/scrollArea'
import altCoreScrollAreaStoryMeta from '~core/ui/scrollArea/stories/ScrollArea.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'

/**
 * Angular wrapper for Core ScrollArea.
 *
 * `<AltScrollArea>` is a block: give it a `height` or `max-height`. It emits `scrollChange` and has
 * `getScrollPosition`, `setScrollPosition` and `setScrollPercentage` for a `@ViewChild`.
 */
const meta: Meta<AltScrollArea> = {
  title: '✅ ScrollArea',
  id: 'scrollarea',
  parameters: { controls: { sort: 'alpha' } },
  component: AltScrollArea,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    props: { ...args, paragraphs: [1, 2, 3, 4], text: LOREM_IPSUM },
    template: `
      <AltScrollArea
        [orientation]="orientation"
        [accessibleName]="accessibleName"
        style="height: 200px; max-width: 360px;"
      >
        @for (paragraph of paragraphs; track paragraph) {
          <p style="margin: 0 0 12px;">{{ text }}</p>
        }
      </AltScrollArea>
    `,
  }),
  argTypes: altCoreScrollAreaStoryMeta.argTypes,
  args: altCoreScrollAreaStoryMeta.args,
}

export default meta
type Story = StoryObj<AltScrollArea>

export const Playground: Story = { args: {} }
