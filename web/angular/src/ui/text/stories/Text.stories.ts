import type { Meta, StoryObj } from '@storybook/angular'

import { AltText } from '~ng/ui/text'
import altCoreTextStoryMeta, { type IAltCoreTextStoryProps } from '~core/ui/text/stories/Text.stories'

import { LOREM_IPSUM } from '~shared/.storybook/constants'

type TAltCoreTextMeta = AltText & IAltCoreTextStoryProps

/**
 * Angular wrapper for Text
 */
const meta: Meta<TAltCoreTextMeta> = {
  title: '🔍 Text',
  id: 'text',
  parameters: { controls: { sort: 'alpha' } },
  component: AltText,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    props: { ...args, LOREM_IPSUM },
    template: `
      <AltText
        [size]="size"
        [variant]="variant"
        [ellipsis]="ellipsis"
        [lineclamp]="lineclamp"
      >
       {{ isLongText ? LOREM_IPSUM : text }}
      </AltText>`,
  }),
  argTypes: { ...altCoreTextStoryMeta.argTypes },
  args: { ...altCoreTextStoryMeta.args },
} satisfies Meta<TAltCoreTextMeta>

export default meta
type Story = StoryObj<TAltCoreTextMeta>

export const Playground: Story = { args: {} }

