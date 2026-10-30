import type { Meta, StoryObj } from '@storybook/angular'
import { CommonModule } from '@angular/common'
import { action } from 'storybook/actions'

import { AltCollapse } from '~ng/ui/collapse'
import { AltCollapseItem } from '~ng/ui/collapseItem'
import altCoreCollapseStoryMeta from '~core/ui/collapse/stories/Collapse.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { useArgs } from 'storybook/preview-api'
import type { CollapseChangeEvent } from '~ng/ui/collapse/models/types'
import { AltTag } from '~ng/ui/tag'
import { AltIcon } from '~ng/ui/icon'
import { altCopy, altInfo } from '~shared/icons'

/**
 * Angular wrapper for CoreCollapse
 */
const meta: Meta<AltCollapse> = {
  title: 'Collapse/🔍 Collapse',
  id: 'collapse',
  parameters: { controls: { sort: 'alpha' } },
  component: AltCollapse,
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
        altCopy,
        altInfo,
      },
      moduleMetadata: {
        imports: [
          CommonModule,
          AltCollapseItem,
          AltIcon,
          AltTag,
        ],
      },
      template: `
        <AltCollapse
          [value]="value"
          [type]="type"
          [variant]="variant"
          [draggable]="draggable"
          [allowCrossLevelMove]="allowCrossLevelMove"
          (collapse-change)="onCollapseChangeEvent($event)"
          (collapse-move)="onCollapseMoveEvent($event)"
        >
          @for (i of ['1', '2', '3', '4', '5']; track i) {
            <AltCollapseItem [value]="i">
              <ng-template #collapseItemAfter>
                <AltIcon [icon]="altCopy" size="16px" />
              </ng-template>

              <ng-template #collapseItemLabel>
                <div style="display: flex; align-items: center;gap: 8px;">
                  <span>LabelSlot{{ i }}</span>
                  
                  <AltTag size="small" variant="accent">TagLabel{{ i }}</AltTag>
                  
                  <AltIcon [icon]="altInfo" size="16px" />
                </div>
              </ng-template>

              <ng-template #collapseItemAnnotation>
                AnnotationSlot{{ i }}
              </ng-template>
              
              <ng-template #collapseItemContent>
                ${LOREM_IPSUM} ${LOREM_IPSUM}
              </ng-template>
            </AltCollapseItem>
          }


        </AltCollapse>`,
    }
  },
  argTypes: { ...altCoreCollapseStoryMeta.argTypes },
  args: { ...altCoreCollapseStoryMeta.args },
} satisfies Meta<AltCollapse>

export default meta
type Story = StoryObj<AltCollapse>

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
      props: { ...args, ...handlers, altCopy, altInfo },
      moduleMetadata: { imports: [CommonModule, AltCollapse, AltCollapseItem, AltIcon, AltTag] },
      template: `
        <AltCollapse
          [value]="value"
          [type]="'multiple'"
          [variant]="variant"
          [draggable]="draggable"
          [allowCrossLevelMove]="true"
          (collapse-change)="onCollapseChangeEvent($event)"
          (collapse-move)="onCollapseMoveEvent($event)"
        >
          @for (i of ['1','2','3']; track i) {
            <AltCollapseItem [value]="i">
              <ng-template #collapseItemLabel>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span>Parent item {{ i }}</span>
                  
                  <AltTag size="small" variant="accent">Level 1</AltTag>
                  
                  <AltIcon [icon]="altInfo" size="16px" />
                </div>
              </ng-template>

              <ng-template #collapseItemAnnotation>
                Parent item description {{ i }}
              </ng-template>

              <ng-template #collapseItemContent>
                <div style="padding: 16px 0;">
                  <p style="margin: 0 0 16px 0; color: #666;">
                    Parent item content {{ i }}
                  </p>

                  <!-- Nested Collapse -->
                  <AltCollapse [value]="[]" type="multiple" [draggable]="true" [allowCrossLevelMove]="true">
                    @for (j of ['1','2','3']; track j) {
                      <AltCollapseItem [value]="i + '-' + j">
                        <ng-template #collapseItemLabel>
                          <div style="display: flex; align-items: center; gap: 6px;">
                            <span>Child item {{ i }}.{{ j }}</span>
                            
                            <AltTag size="small" variant="neutral">Level 2</AltTag>
                          </div>
                        </ng-template>

                        <ng-template #collapseItemAnnotation>
                          Child item description {{ i }}.{{ j }}
                        </ng-template>

                        <ng-template #collapseItemContent>
                          <div style="padding: 12px 0;">
                          <!-- Nested Collapse -->
                          <AltCollapse [value]="[]" type="multiple" [draggable]="true" [allowCrossLevelMove]="true">
                            @for (k of ['1','2','3']; track j) {
                              <AltCollapseItem [value]="i + '-' + j + '-' + k">
                                <ng-template #collapseItemLabel>
                                  <div style="display: flex; align-items: center; gap: 6px;">
                                    <span>Child item {{ i }}.{{ j }}.{{ k }}</span>
                                    
                                    <AltTag size="small" variant="neutral">Level 3</AltTag>
                                  </div>
                                </ng-template>
        
                                <ng-template #collapseItemAnnotation>
                                  Child item description {{ i }}.{{ j }}.{{ k }}
                                </ng-template>
        
                                <ng-template #collapseItemContent>
                                  <div style="padding: 12px 0;">
                                    <p style="margin: 0; font-size: 14px; color: #888;">
                                      Child item content {{ i }}.{{ j }}.{{ k }}. ${LOREM_IPSUM.slice(0, 100)}...
                                    </p>
                                  </div>
                                </ng-template>
                              </AltCollapseItem>
                            }
                          </AltCollapse>
                          </div>
                        </ng-template>
                      </AltCollapseItem>
                    }
                  </AltCollapse>
                </div>
              </ng-template>
            </AltCollapseItem>
          }
        </AltCollapse>
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
      moduleMetadata: { imports: [CommonModule, AltCollapseItem] },
      template: `
        <AltCollapse
          [value]="value"
          [type]="type"
          [variant]="variant"
          [draggable]="draggable"
          [allowCrossLevelMove]="allowCrossLevelMove"
          (collapse-change)="onCollapseChangeEvent($event)"
          (collapse-move)="onCollapseMoveEvent($event)"
        >
          @for (i of ['1','2','3','4','5']; track i) {
            <AltCollapseItem [value]="i" [shallow]="true">
            </AltCollapseItem>
          }
        </AltCollapse>
      `,
    }
  },
}
