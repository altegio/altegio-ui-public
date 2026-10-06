import type { Meta, StoryObj } from '@storybook/angular'
import { CommonModule } from '@angular/common'
import { action } from '@storybook/addon-actions'
import { useArgs } from '@storybook/preview-api'
import { YCollapseItem } from '~ng/ui/collapseItem'
import { YTag } from '~ng/ui/tag'
import { YIcon } from '~ng/ui/icon'
import { YAvatar } from '~ng/ui/avatar'
import yCoreCollapseItemStoryMeta from '~core/ui/collapseItem/stories/CollapseItem.stories'
import { yCopy, yDragAndDrop, yInfo } from '~shared/icons'
import { LOREM_IPSUM } from '~shared/.storybook/constants'

/**
 * Angular-обертка над CoreCollapseItem
 */
const meta: Meta<YCollapseItem> = {
  title: 'Collapse/🔍 CollapseItem',
  id: 'collapseItem',
  parameters: { controls: { sort: 'alpha' } },
  component: YCollapseItem,
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
        yCopy,
        yDragAndDrop,
        yInfo,
        content: LOREM_IPSUM + LOREM_IPSUM,
      },
      moduleMetadata: {
        imports: [
          CommonModule,
          YIcon,
          YTag,
          YAvatar,
        ],
      },
      template: `
        <YCollapseItem
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
              <YIcon [icon]="yDragAndDrop" size="16px" />
            </ng-template>
          }

          @if (showAvatarSlot) {
            <ng-template #collapseItemAvatar>
              <YAvatar photo="https://i.pravatar.cc/300" size="small" />
            </ng-template>
          }

          @if (showAfterSlot) {
            <ng-template #collapseItemAfter>
              <YIcon [icon]="yCopy" size="16px" />
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
                
                <YTag size="small" variant="accent">TagLabel</YTag>
                
                <YIcon [icon]="yInfo" size="16px" />
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
        </YCollapseItem>
      `,
    }
  },
  argTypes: { ...yCoreCollapseItemStoryMeta.argTypes },
  args: { ...yCoreCollapseItemStoryMeta.args },
} satisfies Meta<YCollapseItem>

export default meta
type Story = StoryObj<YCollapseItem>

export const Playground: Story = { args: {} }
