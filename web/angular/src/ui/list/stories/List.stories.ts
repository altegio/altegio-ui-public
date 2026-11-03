import type { Meta, StoryObj } from '@storybook/angular'
import { AltList } from '~ng/ui/list'
import { AltListItem } from '~ng/ui/listItem'
import { AltIcon } from '~ng/ui/icon'
import altCoreListStoryMeta from '~core/ui/list/stories/List.stories'
import { altCopy, altEdit, altTrash } from '~shared/icons'

/**
 * Angular wrapper for Core List.
 *
 * Give section content a `slot` attribute: `slot="start"`, `slot="caption"` or `slot="end"`.
 */
const meta: Meta<AltList> = {
  title: '✅ List',
  id: 'list',
  parameters: { controls: { sort: 'alpha' } },
  component: AltList,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    moduleMetadata: { imports: [AltListItem, AltIcon] },
    props: { ...args, altCopy, altEdit, altTrash },
    template: `
      <AltList [separator]="separator" aria-label="Record actions" style="max-width: 240px;">
        <AltListItem label="Edit" [clickable]="true">
          <AltIcon slot="start" [icon]="altEdit" size="16px"></AltIcon>
        </AltListItem>

        <AltListItem label="Duplicate" [clickable]="true" [disabled]="true">
          <AltIcon slot="start" [icon]="altCopy" size="16px"></AltIcon>
        </AltListItem>

        <AltListItem [clickable]="true">
          Delete
          <span slot="caption">The record cannot be restored</span>
          
          <AltIcon slot="start" [icon]="altTrash" size="16px"></AltIcon>
        </AltListItem>
      </AltList>
    `,
  }),
  argTypes: altCoreListStoryMeta.argTypes,
  args: altCoreListStoryMeta.args,
}

export default meta
type Story = StoryObj<AltList>

export const Playground: Story = { args: {} }
