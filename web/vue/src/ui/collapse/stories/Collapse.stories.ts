import type { Meta, StoryObj } from '@storybook/vue3'
import { computed } from 'vue'
import { omit } from 'radash'
import { action } from '@storybook/addon-actions'
import { useArgs } from '@storybook/preview-api'

import type { CollapseChangeEvent, CollapseMoveEvent } from '~core/ui/collapse/models/types'
import { YCollapse } from '~vue/ui/collapse'
import { type IYVueCollapseProps } from '~vue/ui/collapse/models/types'
import { YIcon } from '~vue/ui/icon'
import { YTag } from '~vue/ui/tag'
import { YCollapseItem } from '~vue/ui/collapseItem'

import yCoreCollapseStoryMeta, { type TYCoreCollapseMeta } from '~core/ui/collapse/stories/Collapse.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { yCopy, yInfo } from '~shared/icons'

type TVueCollapseStoryMeta = IYVueCollapseProps & TYCoreCollapseMeta & {
  modelValue: TYCoreCollapseMeta['value']
  onUpdateModelValue: TYCoreCollapseMeta['onCollapseChange']
}

/**
 * Vue wrapper for Core Collapse
 */
const meta: Meta<TVueCollapseStoryMeta> = {
  title: '✅ Collapse',
  id: 'collapse',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => {
    const [, updateArgs] = useArgs()

    return {
      components: { YCollapse, YCollapseItem, YIcon, YTag },
      setup() {
        const handleUpdateModelValue = (modelValue: CollapseChangeEvent['detail']['value']) => {
          updateArgs({ modelValue })
          action('update:modelValue')(modelValue)
        }

        const handleCollapseMove = (event: CollapseMoveEvent) => {
          action('collapse-move')(event)
        }

        const vModelValue = computed({
          get: () => args.modelValue,
          set: handleUpdateModelValue,
        })

        return { args, handleUpdateModelValue, handleCollapseMove, vModelValue, yCopy, yInfo }
      },
      template: `
        <YCollapse
          v-bind="args"
          v-model="vModelValue"
          @collapse-move="handleCollapseMove"
        >
          <YCollapseItem v-for="i in 5" :key="i" :value="i.toString()">
            <template #after>
              <YIcon :icon="yCopy" size="16px" />
            </template>

            <template #label>
              <div style="display: flex; align-items: center;gap: 8px;">
                <span>LabelSlot{{ i }}</span>

                <YTag size="small" :variant="i % 2 ? 'accent' : 'discovery'">TagLabel</YTag>

                <YIcon :icon="yInfo" size="16px" />
              </div>
            </template>

            <template #annotation>
              AnnotationSlot{{ i }}
            </template>

            <template #content>${LOREM_IPSUM} ${LOREM_IPSUM}</template>
          </YCollapseItem>
        </YCollapse>
      `,
    }
  },
  argTypes: {
    ...omit(yCoreCollapseStoryMeta.argTypes ?? {}, ['value', 'onCollapseChange']),
    modelValue: yCoreCollapseStoryMeta.argTypes?.value,
    onUpdateModelValue: yCoreCollapseStoryMeta.argTypes?.onCollapseChange,
  },
  args: {
    ...omit(yCoreCollapseStoryMeta.args ?? {}, ['value', 'onCollapseChange']),
    modelValue: yCoreCollapseStoryMeta.args?.value,
    onUpdateModelValue: yCoreCollapseStoryMeta.args?.onCollapseChange,
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithNestedItems: Story = {
  render: (args) => {
    const [, updateArgs] = useArgs()

    return {
      components: { YCollapse, YCollapseItem, YIcon, YTag },
      setup() {
        const handleUpdateModelValue = (modelValue: CollapseChangeEvent['detail']['value']) => {
          updateArgs({ modelValue })
          action('update:modelValue')(modelValue)
        }

        const handleCollapseMove = (event: CollapseMoveEvent) => {
          action('collapse-move')(event)
        }

        const vModelValue = computed({
          get: () => args.modelValue,
          set: handleUpdateModelValue,
        })

        return { args, handleUpdateModelValue, handleCollapseMove, vModelValue, yCopy, yInfo }
      },
      template: `
        <YCollapse
          v-bind="args"
          v-model="vModelValue"
          type="multiple"
          :allowCrossLevelMove="true"
          @collapse-move="handleCollapseMove"
        >
          <YCollapseItem v-for="i in 3" :key="i" :value="i">
            <template #after>
              <YIcon :icon="yCopy" size="16px" />
            </template>

            <template #label>
              <div style="display: flex; align-items: center;gap: 8px;">
                <span>Parent item {{ i }}</span>

                <YTag size="small" :variant="i % 2 ? 'accent' : 'discovery'">Level 1</YTag>

                <YIcon :icon="yInfo" size="16px" />
              </div>
            </template>

            <template #annotation>
              Parent item description {{ i }}
            </template>

            <template #content>
              <div style="padding: 16px 0;">
                <p style="margin: 0 0 16px 0; color: #666;">Parent item content {{ i }}</p>

                <YCollapse :model-value="[]" draggable type="multiple" :allowCrossLevelMove="true">
                  <YCollapseItem v-for="j in 3" :key="\`\${i}-\${j}\`" :value="\`\${i}-\${j}\`">
                    <template #after>
                      <YIcon :icon="yCopy" size="14px" />
                    </template>

                    <template #label>
                      <div style="display: flex; align-items: center;gap: 6px;">
                        <span>Child item {{ i }}.{{ j }}</span>

                        <YTag size="small" variant="neutral">Level 2</YTag>
                      </div>
                    </template>

                    <template #annotation>
                      Child item description {{ i }}.{{ j }}
                    </template>

                    <template #content>
                      <YCollapse :model-value="[]" draggable type="multiple" :allowCrossLevelMove="true">
                        <YCollapseItem v-for="k in 3" :key="\`\${i}-\${j}-\${k}\`" :value="\`\${i}-\${j}-\${k}\`">
                          <template #after>
                            <YIcon :icon="yCopy" size="14px" />
                          </template>

                          <template #label>
                            <div style="display: flex; align-items: center;gap: 6px;">
                              <span>Child item {{ i }}.{{ j }}.{{ k }}</span>

                              <YTag size="small" variant="neutral">Level 3</YTag>
                            </div>
                          </template>

                          <template #annotation>
                            Child item description {{ i }}.{{ j }}.{{ k }}
                          </template>

                          <template #content>
                            <div style="padding: 12px 0;">
                              <p style="margin: 0; font-size: 14px; color: #888;">
                                Child item content {{ i }}.{{ j }}.{{ k }} ${LOREM_IPSUM.slice(0, 100)}...
                              </p>
                            </div>
                          </template>
                        </YCollapseItem>
                      </YCollapse>
                    </template>
                  </YCollapseItem>
                </YCollapse>
              </div>
            </template>
          </YCollapseItem>
        </YCollapse>
      `,
    }
  },
}

export const ShallowItems: Story = {
  args: { draggable: true },
  render: (args) => {
    const [, updateArgs] = useArgs()

    return {
      components: { YCollapse, YCollapseItem },
      setup() {
        const handleUpdateModelValue = (modelValue: CollapseChangeEvent['detail']['value']) => {
          updateArgs({ modelValue })
          action('update:modelValue')(modelValue)
        }

        const handleCollapseMove = (event: CollapseMoveEvent) => {
          action('collapse-move')(event)
        }

        const vModelValue = computed({
          get: () => args.modelValue,
          set: handleUpdateModelValue,
        })

        return { args, handleCollapseMove, vModelValue }
      },
      template: `
        <YCollapse
          v-bind="args"
          v-model="vModelValue"
          @collapse-move="handleCollapseMove"
        >
          <YCollapseItem v-for="i in 5" :key="i" :value="i.toString()" :shallow="true">
          </YCollapseItem>
        </YCollapse>
      `,
    }
  },
}

export const WithLargeContent: Story = {
  args: {
    ...meta.args,
    modelValue: [],
    type: 'single', // Используем single режим для демонстрации автоскролла
  },
  render: (args) => {
    const [, updateArgs] = useArgs()

    return {
      components: { YCollapse, YCollapseItem, YIcon, YTag },
      setup() {
        const handleUpdateModelValue = (modelValue: CollapseChangeEvent['detail']['value']) => {
          updateArgs({ modelValue })
          action('update:modelValue')(modelValue)
        }

        const handleCollapseMove = (event: CollapseMoveEvent) => {
          action('collapse-move')(event)
        }

        const vModelValue = computed({
          get: () => args.modelValue,
          set: handleUpdateModelValue,
        })

        // Генерируем большое количество контента
        const generateLargeContent = (itemIndex: number) => {
          const contentBlocks = []

          // Добавляем заголовки и параграфы
          for (let i = 1; i <= 15; i++) {
            contentBlocks.push(`
              <div style="margin-bottom: 24px;">
                <h3 style="margin: 0 0 12px 0; color: #333; font-size: 18px; font-weight: 600;">
                  Section ${i} of item ${itemIndex}
                </h3>

                <p style="margin: 0 0 12px 0; line-height: 1.6; color: #555;">
                  ${LOREM_IPSUM} This sample text adds more content to section ${i}.
                </p>

                <p style="margin: 0 0 12px 0; line-height: 1.6; color: #555;">
                  ${LOREM_IPSUM} Additional text demonstrates scrolling when accordion items expand.
                  This content extends well beyond the viewport to demonstrate
                  page scrolling. Check that the scroll position remains stable.
                </p>

                <ul style="margin: 0 0 12px 0; padding-left: 20px; color: #666;">
                  <li>List item 1 for section ${i}</li>

                  <li>List item 2 for section ${i}</li>

                  <li>List item 3 for section ${i}</li>

                  <li>List item 4 for section ${i}</li>
                </ul>

                <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
                  <strong>Information panel ${i}:</strong>

<br>
                  This panel contains information for section ${i} of item ${itemIndex}.
                  ${LOREM_IPSUM.slice(0, 200)}
                </div>
              </div>
            `)
          }

          return contentBlocks.join('')
        }

        return {
          args,
          handleUpdateModelValue,
          handleCollapseMove,
          vModelValue,
          yCopy,
          yInfo,
          generateLargeContent,
        }
      },
      template: `
        <div>
          <div style="margin-bottom: 24px; padding: 16px; background: #e3f2fd; border-radius: 8px;">
            <h2 style="margin: 0 0 8px 0; color: #1976d2;">Accordion with long content</h2>

            <p style="margin: 0; color: #1565c0;">
              Expand several items in sequence and check that the scroll position stays stable.
              Each item contains more content than fits in the viewport.
            </p>
          </div>

          <YCollapse
            v-bind="args"
            v-model="vModelValue"
            @collapse-move="handleCollapseMove"
          >
            <YCollapseItem v-for="i in 8" :key="i" :value="i">
              <template #after>
                <YIcon :icon="yCopy" size="16px" />
              </template>

              <template #label>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-weight: 500;">Item with long content {{ i }}</span>

                  <YTag size="small" :variant="i % 3 === 0 ? 'accent' : i % 3 === 1 ? 'discovery' : 'success'">
                    {{ i % 3 === 0 ? 'Tall' : i % 3 === 1 ? 'Very tall' : 'Maximum height' }} content
                  </YTag>

                  <YIcon :icon="yInfo" size="16px" />
                </div>
              </template>

              <template #annotation>
                Item {{ i }} contains long content to demonstrate scrolling
              </template>

              <template #content>
                <div style="padding: 20px 0;" v-html="generateLargeContent(i)"></div>

                <div style="margin-top: 32px; padding: 20px; background: #fff3e0; border-radius: 8px; border-left: 4px solid #ff9800;">
                  <h4 style="margin: 0 0 12px 0; color: #f57c00;">Final panel of item {{ i }}</h4>

                  <p style="margin: 0; color: #ef6c00;">
                    This is the final content panel in item {{ i }}. If you can see this text,
                    the entire item has rendered. Its total content height
                    is much greater than the viewport height.
                  </p>
                </div>
              </template>
            </YCollapseItem>
          </YCollapse>

          <div style="margin-top: 40px; padding: 16px; background: #f3e5f5; border-radius: 8px;">
            <h3 style="margin: 0 0 8px 0; color: #7b1fa2;">End of page</h3>

            <p style="margin: 0; color: #8e24aa;">
              This panel marks the end of the page. You can now
              check the scroll position when expanding items above.
            </p>
          </div>
        </div>
      `,
    }
  },
}
