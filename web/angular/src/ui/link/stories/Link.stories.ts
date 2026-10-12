import type { Meta, StoryObj } from '@storybook/angular'

import { YLink } from '~ng/ui/link'
import { YIcon } from '~ng/ui/icon'
import yCoreLinkStoryMeta, { type IYCoreLinkStoryProps } from '~core/ui/link/stories/Link.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { ySearch } from '~shared/icons/build/y-search.icon'
import { storyControlsTable } from '~shared/.storybook/tables'

type IYNgLinkStoryMeta = YLink & IYCoreLinkStoryProps

/**
 * Angular wrapper for Core Link
 */
const meta: Meta<IYNgLinkStoryMeta> = {
  title: '🔍 Link',
  id: 'link',
  parameters: { controls: { sort: 'alpha' } },
  component: YLink,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    const textToRender = args.isLongText ? LOREM_IPSUM : args.text

    return {
      moduleMetadata: { imports: [YIcon] },
      props: { ...args, textToRender, ySearch },
      template: `
        <YLink [href]="href" [target]="target" [textWrap]="textWrap">
          <ng-container *ngIf="showIcon">
            <y-core-icon [icon]="ySearch" size="16px"></y-core-icon>
          </ng-container>
          {{ textToRender }}
        </YLink>
      `,
    }
  },
  argTypes: {
    ...yCoreLinkStoryMeta.argTypes,
    showIcon: {
      type: 'boolean',
      description: 'Show an icon in the link',
      ...storyControlsTable,
    },
  },
  args: {
    ...yCoreLinkStoryMeta.args,
    showIcon: false,
  },
} satisfies Meta<IYNgLinkStoryMeta>

export default meta
type Story = StoryObj<IYNgLinkStoryMeta>

export const Playground: Story = { args: {} }
