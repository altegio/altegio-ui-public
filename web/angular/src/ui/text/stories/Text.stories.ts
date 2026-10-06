import type { Meta, StoryObj } from '@storybook/angular'

import { YText } from '~ng/ui/text'
import yCoreTextStoryMeta, { type IYCoreTextStoryProps } from '~core/ui/text/stories/Text.stories'

import { LOREM_IPSUM } from '~shared/.storybook/constants'

type TYCoreTextMeta = YText & IYCoreTextStoryProps

/**
 * Angular-обертка над Text
 */
const meta: Meta<TYCoreTextMeta> = {
  title: '🔍 Text',
  id: 'text',
  parameters: { controls: { sort: 'alpha' } },
  component: YText,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    props: { ...args, LOREM_IPSUM },
    template: `
      <YText
        [size]="size"
        [variant]="variant"
        [ellipsis]="ellipsis"
        [lineclamp]="lineclamp"
      >
       {{ isLongText ? LOREM_IPSUM : text }}
      </YText>`,
  }),
  argTypes: { ...yCoreTextStoryMeta.argTypes },
  args: { ...yCoreTextStoryMeta.args },
} satisfies Meta<TYCoreTextMeta>

export default meta
type Story = StoryObj<TYCoreTextMeta>

export const Playground: Story = { args: {} }

