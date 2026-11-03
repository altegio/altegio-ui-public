import type { Meta, StoryObj } from '@storybook/angular'
import { AltList } from '~ng/ui/list'
import { AltListItem } from '~ng/ui/listItem'
import { AltIcon } from '~ng/ui/icon'
import altCoreListItemStoryMeta, { type IAltCoreListItemStoryProps } from '~core/ui/listItem/stories/ListItem.stories'
import { altChevronRight, altProfile } from '~shared/icons'

type TNgListItemStoryMeta = AltListItem & Pick<IAltCoreListItemStoryProps, 'isStartSlotExists' | 'isEndSlotExists'>

/**
 * Angular wrapper for Core List Item
 */
const meta: Meta<TNgListItemStoryMeta> = {
  title: '✅ List/ListItem',
  id: 'listItem',
  parameters: { controls: { sort: 'alpha' } },
  component: AltListItem,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    moduleMetadata: { imports: [AltList, AltIcon] },
    props: { ...args, altChevronRight, altProfile },
    template: `
      <AltList style="max-width: 360px;">
        <AltListItem
          [label]="label"
          [caption]="caption"
          [clickable]="clickable"
          [href]="href"
          [target]="target"
          [disabled]="disabled"
          [active]="active"
          [align]="align"
        >
          @if (isStartSlotExists) {
            <AltIcon slot="start" [icon]="altProfile" size="20px"></AltIcon>
          }

          @if (isEndSlotExists) {
            <AltIcon slot="end" [icon]="altChevronRight" size="16px"></AltIcon>
          }
        </AltListItem>
      </AltList>
    `,
  }),
  argTypes: altCoreListItemStoryMeta.argTypes,
  args: altCoreListItemStoryMeta.args,
}

export default meta
type Story = StoryObj<TNgListItemStoryMeta>

export const Playground: Story = { args: {} }
