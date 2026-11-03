import type { Meta, StoryObj } from '@storybook/angular'

import { AltTag } from '~ng/ui/tag'
import altCoreTagStoryMeta, { type TAltCoreTagMeta } from '~core/ui/tag/stories/Tag.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'

/**
 * Angular wrapper for Core Tag
 */
const meta: Meta<TAltCoreTagMeta> = {
  title: '🔍 Tag',
  id: 'tag',
  parameters: { controls: { sort: 'alpha' } },
  component: AltTag,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    const computedText = args.isLongText ? LOREM_IPSUM : args.text

    return {
      props: { ...args, computedText },
      template: `
      <AltTag
        [size]="size"
        [variant]="variant"
        [iconLeft]="iconLeft"
        [disabled]="disabled"
        [locator]="locator"
        [locatorLabel]="locatorLabel"
        [locatorIcon]="locatorIcon"
      >
        {{ computedText }}
      </AltTag>
    `,
    }
  },
  argTypes: { ...altCoreTagStoryMeta.argTypes },
  args: { ...altCoreTagStoryMeta.args },
}

export default meta
type Story = StoryObj<TAltCoreTagMeta>

export const Playground: Story = {}
