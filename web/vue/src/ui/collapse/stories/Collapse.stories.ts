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
 * Vue-обертка над Core Collapse
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
                <span>Родительский элемент {{ i }}</span>
                
                <YTag size="small" :variant="i % 2 ? 'accent' : 'discovery'">Уровень 1</YTag>
                
                <YIcon :icon="yInfo" size="16px" />
              </div>
            </template>

            <template #annotation>
              Описание родительского элемента {{ i }}
            </template>
            
            <template #content>
              <div style="padding: 16px 0;">
                <p style="margin: 0 0 16px 0; color: #666;">Содержимое родительского элемента {{ i }}</p>
                
                <YCollapse :model-value="[]" draggable type="multiple" :allowCrossLevelMove="true">
                  <YCollapseItem v-for="j in 3" :key="\`\${i}-\${j}\`" :value="\`\${i}-\${j}\`">
                    <template #after>
                      <YIcon :icon="yCopy" size="14px" />
                    </template>

                    <template #label>
                      <div style="display: flex; align-items: center;gap: 6px;">
                        <span>Дочерний элемент {{ i }}.{{ j }}</span>
                        
                        <YTag size="small" variant="neutral">Уровень 2</YTag>
                      </div>
                    </template>

                    <template #annotation>
                      Описание дочернего элемента {{ i }}.{{ j }}
                    </template>
                    
                    <template #content>
                      <YCollapse :model-value="[]" draggable type="multiple" :allowCrossLevelMove="true">
                        <YCollapseItem v-for="k in 3" :key="\`\${i}-\${j}-\${k}\`" :value="\`\${i}-\${j}-\${k}\`">
                          <template #after>
                            <YIcon :icon="yCopy" size="14px" />
                          </template>
      
                          <template #label>
                            <div style="display: flex; align-items: center;gap: 6px;">
                              <span>Дочерний элемент {{ i }}.{{ j }}.{{ k }}</span>
                              
                              <YTag size="small" variant="neutral">Уровень 3</YTag>
                            </div>
                          </template>
      
                          <template #annotation>
                            Описание дочернего элемента {{ i }}.{{ j }}.{{ k }}
                          </template>
                          
                          <template #content>
                            <div style="padding: 12px 0;">
                              <p style="margin: 0; font-size: 14px; color: #888;">
                                Содержимое дочернего элемента {{ i }}.{{ j }}.{{ k }} ${LOREM_IPSUM.slice(0, 100)}...
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
                  Раздел ${i} элемента ${itemIndex}
                </h3>
                
                <p style="margin: 0 0 12px 0; line-height: 1.6; color: #555;">
                  ${LOREM_IPSUM} Это дополнительный текст для увеличения объема контента в разделе ${i}.
                </p>
                
                <p style="margin: 0 0 12px 0; line-height: 1.6; color: #555;">
                  ${LOREM_IPSUM} Еще больше текста для проверки поведения скролла при открытии элементов коллапса.
                  Этот контент должен значительно превышать высоту экрана, чтобы протестировать корректность работы
                  с прокруткой страницы. Важно убедиться, что позиция скролла остается стабильной.
                </p>
                
                <ul style="margin: 0 0 12px 0; padding-left: 20px; color: #666;">
                  <li>Пункт списка 1 для раздела ${i}</li>
                  
                  <li>Пункт списка 2 для раздела ${i}</li>
                  
                  <li>Пункт списка 3 для раздела ${i}</li>
                  
                  <li>Пункт списка 4 для раздела ${i}</li>
                </ul>
                
                <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
                  <strong>Информационный блок ${i}:</strong>

<br>
                  Этот блок содержит важную информацию для раздела ${i} элемента ${itemIndex}.
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
            <h2 style="margin: 0 0 8px 0; color: #1976d2;">Тест коллапса с большим контентом</h2>
            
            <p style="margin: 0; color: #1565c0;">
              Откройте несколько элементов подряд и проверьте, что позиция скролла остается стабильной.
              Каждый элемент содержит много контента, превышающего высоту экрана.
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
                  <span style="font-weight: 500;">Элемент с большим контентом {{ i }}</span>
                  
                  <YTag size="small" :variant="i % 3 === 0 ? 'accent' : i % 3 === 1 ? 'discovery' : 'success'">
                    {{ i % 3 === 0 ? 'Высокий' : i % 3 === 1 ? 'Очень высокий' : 'Максимальный' }} контент
                  </YTag>
                  
                  <YIcon :icon="yInfo" size="16px" />
                </div>
              </template>

              <template #annotation>
                Элемент {{ i }} содержит очень много контента для проверки поведения скролла
              </template>
              
              <template #content>
                <div style="padding: 20px 0;" v-html="generateLargeContent(i)"></div>
                
                <div style="margin-top: 32px; padding: 20px; background: #fff3e0; border-radius: 8px; border-left: 4px solid #ff9800;">
                  <h4 style="margin: 0 0 12px 0; color: #f57c00;">Заключительный блок элемента {{ i }}</h4>
                  
                  <p style="margin: 0; color: #ef6c00;">
                    Это последний блок контента в элементе {{ i }}. Если вы видите этот текст,
                    значит весь контент элемента был корректно отображен. Общая высота контента 
                    этого элемента значительно превышает высоту экрана.
                  </p>
                </div>
              </template>
            </YCollapseItem>
          </YCollapse>

          <div style="margin-top: 40px; padding: 16px; background: #f3e5f5; border-radius: 8px;">
            <h3 style="margin: 0 0 8px 0; color: #7b1fa2;">Конец страницы</h3>
            
            <p style="margin: 0; color: #8e24aa;">
              Этот блок помогает понять, что вы достигли конца страницы и можете 
              протестировать поведение скролла при открытии элементов выше.
            </p>
          </div>
        </div>
      `,
    }
  },
}
