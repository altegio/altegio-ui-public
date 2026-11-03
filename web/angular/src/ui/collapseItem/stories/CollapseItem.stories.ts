import type { Meta, StoryObj } from '@storybook/angular'
import { CommonModule } from '@angular/common'
import { action } from 'storybook/actions'
import { useArgs } from 'storybook/preview-api'
import { AltCollapseItem } from '~ng/ui/collapseItem'
import { AltTag } from '~ng/ui/tag'
import { AltIcon } from '~ng/ui/icon'
import { AltAvatar } from '~ng/ui/avatar'
import altCoreCollapseItemStoryMeta from '~core/ui/collapseItem/stories/CollapseItem.stories'
import { altCopy, altDragAndDrop, altInfo } from '~shared/icons'
import { LOREM_IPSUM } from '~shared/.storybook/constants'

/**
 * Angular wrapper for CoreCollapseItem
 */
const meta: Meta<AltCollapseItem> = {
  title: 'Collapse/🔍 CollapseItem',
  id: 'collapseItem',
  parameters: { controls: { sort: 'alpha' } },
  component: AltCollapseItem,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    const [, updateArgs] = useArgs()

    const handlers = {
      onCollapseItemClick: (event: Event) => {
        action('collapse-item-click')(event)
        updateArgs({ opened: !args.opened })
      },
    }

    return {
      props: {
        ...args,
        ...handlers,
        altCopy,
        altDragAndDrop,
        altInfo,
        content: LOREM_IPSUM + LOREM_IPSUM,
      },
      moduleMetadata: {
        imports: [
          CommonModule,
          AltIcon,
          AltTag,
          AltAvatar,
        ],
      },
      template: `
        <AltCollapseItem
          [label]="label"
          [annotation]="annotation"
          [opened]="opened"
          [shallow]="shallow"
          [value]="value"
          [variant]="variant"
          (collapse-item-click)="onCollapseItemClick($event)"
        >
          @if (showBeforeSlot) {
            <ng-template #collapseItemBefore>
              <AltIcon [icon]="altDragAndDrop" size="16px" />
            </ng-template>
          }

          @if (showAvatarSlot) {
            <ng-template #collapseItemAvatar>
              <AltAvatar photo="https://i.pravatar.cc/300" size="small" />
            </ng-template>
          }

          @if (showAfterSlot) {
            <ng-template #collapseItemAfter>
              <AltIcon [icon]="altCopy" size="16px" />
            </ng-template>
          }

          @if (showMainSlot) {
            <ng-template #collapseItemMain>
              MainSlot
            </ng-template>
          }

          @if (showLabelSlot) {
            <ng-template #collapseItemLabel>
              <div style="display: flex; align-items: center;gap: 8px;">
                <span>LabelSlot</span>
                
                <AltTag size="small" variant="accent">TagLabel</AltTag>
                
                <AltIcon [icon]="altInfo" size="16px" />
              </div>
            </ng-template>
          }

          @if (showAnnotationSlot) {
            <ng-template #collapseItemAnnotation>
              AnnotationSlot
            </ng-template>
          }

          @if (showContentSlot) {
            <ng-template #collapseItemContent>
              {{ loading ? 'CONTENT IS LOADING' : content }}
            </ng-template>
          }
        </AltCollapseItem>
      `,
    }
  },
  argTypes: { ...altCoreCollapseItemStoryMeta.argTypes },
  args: { ...altCoreCollapseItemStoryMeta.args },
} satisfies Meta<AltCollapseItem>

export default meta
type Story = StoryObj<AltCollapseItem>

export const Playground: Story = { args: {} }
