import type { Meta, StoryObj } from '@storybook/angular'

import { AltLink } from '~ng/ui/link'
import { AltIcon } from '~ng/ui/icon'
import altCoreLinkStoryMeta, { type IAltCoreLinkStoryProps } from '~core/ui/link/stories/Link.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { altSearch } from '~shared/icons/build/alt-search.icon'
import { storyControlsTable } from '~shared/.storybook/tables'

type IAltNgLinkStoryMeta = AltLink & IAltCoreLinkStoryProps

/**
 * Angular wrapper for Core Link
 */
const meta: Meta<IAltNgLinkStoryMeta> = {
  title: '🔍 Link',
  id: 'link',
  parameters: { controls: { sort: 'alpha' } },
  component: AltLink,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    const textToRender = args.isLongText ? LOREM_IPSUM : args.text

    return {
      moduleMetadata: { imports: [AltIcon] },
      props: { ...args, textToRender, altSearch },
      template: `
        <AltLink [href]="href" [target]="target" [textWrap]="textWrap">
          <ng-container *ngIf="showIcon">
            <alt-core-icon [icon]="altSearch" size="16px"></alt-core-icon>
          </ng-container>
          {{ textToRender }}
        </AltLink>
      `,
    }
  },
  argTypes: {
    ...altCoreLinkStoryMeta.argTypes,
    showIcon: {
      type: 'boolean',
      description: 'Show an icon in the link',
      ...storyControlsTable,
    },
  },
  args: {
    ...altCoreLinkStoryMeta.args,
    showIcon: false,
  },
} satisfies Meta<IAltNgLinkStoryMeta>

export default meta
type Story = StoryObj<IAltNgLinkStoryMeta>

export const Playground: Story = { args: {} }
