import type { Meta, StoryObj } from '@storybook/angular'
import { CommonModule } from '@angular/common'
import { action } from '@storybook/addon-actions'

import { YCollapse } from '~ng/ui/collapse'
import { YCollapseItem } from '~ng/ui/collapseItem'
import yCoreCollapseStoryMeta from '~core/ui/collapse/stories/Collapse.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { useArgs } from '@storybook/preview-api'
import type { CollapseChangeEvent } from '~ng/ui/collapse/models/types'
import { YTag } from '~ng/ui/tag'
import { YIcon } from '~ng/ui/icon'
import { yCopy, yInfo } from '~shared/icons'

/**
 * Angular-обертка над CoreCollapse
 */
const meta: Meta<YCollapse> = {
  title: 'Collapse/🔍 Collapse',
  id: 'collapse',
  parameters: { controls: { sort: 'alpha' } },
  component: YCollapse,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    const [, updateArgs] = useArgs()

    const handlers = {
      onCollapseChangeEvent: (event: CollapseChangeEvent) => {
        action('collapse-change')(event)
        updateArgs({ value: event.detail.value })
      },
      onCollapseMoveEvent: action('collapse-move'),
    }

    return {
      props: {
        ...args,
        ...handlers,
        yCopy,
        yInfo,
      },
      moduleMetadata: {
        imports: [
          CommonModule,
          YCollapseItem,
          YIcon,
          YTag,
        ],
      },
      template: `
        <YCollapse
          [value]="value"
          [type]="type"
          [variant]="variant"
          [draggable]="draggable"
          [allowCrossLevelMove]="allowCrossLevelMove"
          (collapse-change)="onCollapseChangeEvent($event)"
          (collapse-move)="onCollapseMoveEvent($event)"
        >
          @for (i of ['1', '2', '3', '4', '5']; track i) {
            <YCollapseItem [value]="i">
              <ng-template #collapseItemAfter>
                <YIcon [icon]="yCopy" size="16px" />
              </ng-template>

              <ng-template #collapseItemLabel>
                <div style="display: flex; align-items: center;gap: 8px;">
                  <span>LabelSlot{{ i }}</span>
                  
                  <YTag size="small" variant="accent">TagLabel{{ i }}</YTag>
                  
                  <YIcon [icon]="yInfo" size="16px" />
                </div>
              </ng-template>

              <ng-template #collapseItemAnnotation>
                AnnotationSlot{{ i }}
              </ng-template>
              
              <ng-template #collapseItemContent>
                ${LOREM_IPSUM} ${LOREM_IPSUM}
              </ng-template>
            </YCollapseItem>
          }


        </YCollapse>`,
    }
  },
  argTypes: { ...yCoreCollapseStoryMeta.argTypes },
  args: { ...yCoreCollapseStoryMeta.args },
} satisfies Meta<YCollapse>

export default meta
type Story = StoryObj<YCollapse>

export const Playground: Story = { args: {} }

export const WithNestedItems: Story = {
  args: { allowCrossLevelMove: false },

  render: (args) => {
    const [, updateArgs] = useArgs()
    const handlers = {
      onCollapseChangeEvent: (event: CollapseChangeEvent) => {
        action('collapse-change')(event)
        updateArgs({ value: event.detail.value })
      },
      onCollapseMoveEvent: action('collapse-move'),
    }

    return {
      props: { ...args, ...handlers, yCopy, yInfo },
      moduleMetadata: { imports: [CommonModule, YCollapse, YCollapseItem, YIcon, YTag] },
      template: `
        <YCollapse
          [value]="value"
          [type]="'multiple'"
          [variant]="variant"
          [draggable]="draggable"
          [allowCrossLevelMove]="true"
          (collapse-change)="onCollapseChangeEvent($event)"
          (collapse-move)="onCollapseMoveEvent($event)"
        >
          @for (i of ['1','2','3']; track i) {
            <YCollapseItem [value]="i">
              <ng-template #collapseItemLabel>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span>Родительский элемент {{ i }}</span>
                  
                  <YTag size="small" variant="accent">Уровень 1</YTag>
                  
                  <YIcon [icon]="yInfo" size="16px" />
                </div>
              </ng-template>

              <ng-template #collapseItemAnnotation>
                Описание родительского элемента {{ i }}
              </ng-template>

              <ng-template #collapseItemContent>
                <div style="padding: 16px 0;">
                  <p style="margin: 0 0 16px 0; color: #666;">
                    Содержимое родительского элемента {{ i }}
                  </p>

                  <!-- Вложенный Collapse -->
                  <YCollapse [value]="[]" type="multiple" [draggable]="true" [allowCrossLevelMove]="true">
                    @for (j of ['1','2','3']; track j) {
                      <YCollapseItem [value]="i + '-' + j">
                        <ng-template #collapseItemLabel>
                          <div style="display: flex; align-items: center; gap: 6px;">
                            <span>Дочерний элемент {{ i }}.{{ j }}</span>
                            
                            <YTag size="small" variant="neutral">Уровень 2</YTag>
                          </div>
                        </ng-template>

                        <ng-template #collapseItemAnnotation>
                          Описание дочернего элемента {{ i }}.{{ j }}
                        </ng-template>

                        <ng-template #collapseItemContent>
                          <div style="padding: 12px 0;">
                          <!-- Вложенный Collapse -->
                          <YCollapse [value]="[]" type="multiple" [draggable]="true" [allowCrossLevelMove]="true">
                            @for (k of ['1','2','3']; track j) {
                              <YCollapseItem [value]="i + '-' + j + '-' + k">
                                <ng-template #collapseItemLabel>
                                  <div style="display: flex; align-items: center; gap: 6px;">
                                    <span>Дочерний элемент {{ i }}.{{ j }}.{{ k }}</span>
                                    
                                    <YTag size="small" variant="neutral">Уровень 3</YTag>
                                  </div>
                                </ng-template>
        
                                <ng-template #collapseItemAnnotation>
                                  Описание дочернего элемента {{ i }}.{{ j }}.{{ k }}
                                </ng-template>
        
                                <ng-template #collapseItemContent>
                                  <div style="padding: 12px 0;">
                                    <p style="margin: 0; font-size: 14px; color: #888;">
                                      Содержимое дочернего элемента {{ i }}.{{ j }}.{{ k }}. ${LOREM_IPSUM.slice(0, 100)}...
                                    </p>
                                  </div>
                                </ng-template>
                              </YCollapseItem>
                            }
                          </YCollapse>
                          </div>
                        </ng-template>
                      </YCollapseItem>
                    }
                  </YCollapse>
                </div>
              </ng-template>
            </YCollapseItem>
          }
        </YCollapse>
      `,
    }
  },
}

export const ShallowItems: Story = {
  args: { draggable: true },
  render: (args) => {
    const [, updateArgs] = useArgs()
    const handlers = {
      onCollapseChangeEvent: (event: CollapseChangeEvent) => {
        action('collapse-change')(event)
        updateArgs({ value: event.detail.value })
      },
      onCollapseMoveEvent: action('collapse-move'),
    }

    return {
      props: { ...args, ...handlers },
      moduleMetadata: { imports: [CommonModule, YCollapseItem] },
      template: `
        <YCollapse
          [value]="value"
          [type]="type"
          [variant]="variant"
          [draggable]="draggable"
          [allowCrossLevelMove]="allowCrossLevelMove"
          (collapse-change)="onCollapseChangeEvent($event)"
          (collapse-move)="onCollapseMoveEvent($event)"
        >
          @for (i of ['1','2','3','4','5']; track i) {
            <YCollapseItem [value]="i" [shallow]="true">
            </YCollapseItem>
          }
        </YCollapse>
      `,
    }
  },
}
