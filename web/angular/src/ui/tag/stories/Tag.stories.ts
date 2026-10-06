import type { Meta, StoryObj } from '@storybook/angular'

import { YTag } from '~ng/ui/tag'
import yCoreTagStoryMeta, { type TYCoreTagMeta } from '~core/ui/tag/stories/Tag.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'

/**
 * Angular-обертка над Core Tag
 */
const meta: Meta<TYCoreTagMeta> = {
  title: '🔍 Tag',
  id: 'tag',
  parameters: { controls: { sort: 'alpha' } },
  component: YTag,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    const computedText = args.isLongText ? LOREM_IPSUM : args.text

    return {
      props: { ...args, computedText },
      template: `
      <YTag
        [size]="size"
        [variant]="variant"
        [iconLeft]="iconLeft"
        [disabled]="disabled"
        [locator]="locator"
        [locatorLabel]="locatorLabel"
        [locatorIcon]="locatorIcon"
      >
        {{ computedText }}
      </YTag>
    `,
    }
  },
  argTypes: { ...yCoreTagStoryMeta.argTypes },
  args: { ...yCoreTagStoryMeta.args },
}

export default meta
type Story = StoryObj<TYCoreTagMeta>

export const Playground: Story = {}
