import { computed } from 'vue'
import { omit } from 'radash'
import type { Meta, StoryObj } from '@storybook/vue3'
import { action } from '@storybook/addon-actions'
import { useArgs } from '@storybook/preview-api'

import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { getComponentContentTable } from '~shared/.storybook/tables'
import { EFrameworkName } from '~shared/.storybook/enums/frameworkName'

import {
  createButtonDropdownParameters,
  BUTTON_DROPDOWN_STORIES_CONFIG,
} from '~core/ui/buttonDropdown/stories/ButtonDropdown.stories.utils'
import yCoreButtonDropdownStoryMeta from '~core/ui/buttonDropdown/stories/ButtonDropdown.stories'
import type { VisibleEvent } from '~core/ui/buttonDropdown/models/types'
import { EYCoreButtonDropdownIconTypes } from '~core/ui/buttonDropdown/models/types/internal'
import { EYCoreSimpleButtonVariant } from '~core/ui/simpleButton/models/types'

import { YButtonDropdown } from '~vue/ui/buttonDropdown'
import type { IYVueButtonDropdownProps } from '~vue/ui/buttonDropdown/models/types'

type TVueButtonDropdownStoryMeta = IYVueButtonDropdownProps

/**
 * Vue-обертка над Core ButtonDropdown
 */
const meta: Meta<TVueButtonDropdownStoryMeta> = {
  title: 'Buttons/✅ ButtonDropdown',
  id: 'buttonDropdown',
  parameters: createButtonDropdownParameters(EFrameworkName.VUE),
  tags: ['vue', 'autodocs'],
  render: (args) => {
    const [, updateArgs] = useArgs<IYVueButtonDropdownProps>()

    const handleSetModelValue = (modelValue: VisibleEvent['detail']['value']) => {
      updateArgs({ modelValue })
      action('update:modelValue')(modelValue)
    }

    return {
      components: { YButtonDropdown },
      setup() {
        const vModelValue = computed({
          get: () => Boolean(args.modelValue),
          set: handleSetModelValue,
        })

        return { args, LOREM_IPSUM, vModelValue }
      },
      template: `
        <div style="padding: 50px 50px 350px; margin: 20px; border: 1px dashed black; border-radius: 8px; overflow: auto">        
        <YButtonDropdown
            v-bind="args"
            v-model="vModelValue"
            :label="args.isLongText ? LOREM_IPSUM : args.label"
            @item-click="args.onItemClick"
          >
            <template v-if="args.showActivatorSlot" #activator>
                <p>ActivatorSlot</p>
            </template>
            
            <template v-if="args.showContentSlot" #content>
                <p>ContentSlot</p>
            </template>
          </YButtonDropdown>
        </div>
      `,
    }
  },
  argTypes: {
    ...omit(yCoreButtonDropdownStoryMeta.argTypes ?? {}, ['isOpen']),
    modelValue: {
      type: 'boolean',
      description: 'Дефолтный v-model над базовым is-open value',
      ...getComponentContentTable(),
    },
  },
  args: {
    ...omit(yCoreButtonDropdownStoryMeta.args ?? {}, ['isOpen']),
    modelValue: false,
  },
}

export default meta

type Story = StoryObj<TVueButtonDropdownStoryMeta>

export const Playground: Story = {
  parameters: BUTTON_DROPDOWN_STORIES_CONFIG.Playground.parameters,
  args: BUTTON_DROPDOWN_STORIES_CONFIG.Playground.args,
}

export const Variants: Story = {
  parameters: BUTTON_DROPDOWN_STORIES_CONFIG.Variants.parameters,
  args: BUTTON_DROPDOWN_STORIES_CONFIG.Variants.args,
  render: (args) => ({
    components: { YButtonDropdown },
    setup() {
      const variants = Object.values(EYCoreSimpleButtonVariant)
      return { variants, items: args.items }
    },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <YButtonDropdown
          v-for="variant in variants" 
          :key="variant"
          :items="items"
          :variant="variant"
          :label="variant"
        >
        </YButtonDropdown>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  parameters: BUTTON_DROPDOWN_STORIES_CONFIG.Sizes.parameters,
  args: BUTTON_DROPDOWN_STORIES_CONFIG.Variants.args,
  render: (args) => ({
    components: { YButtonDropdown },
    setup() {
      const sizes = ['small', 'medium', 'large'] as const
      return {
        sizes,
        items: args.items,
      }
    },
    template: `
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
        <YButtonDropdown
          v-for="size in sizes" 
          :key="size"
          :size="size"
          :items="items"
          :label="size"
        >
        </YButtonDropdown>
      </div>
    `,
  }),
}

export const States: Story = {
  parameters: BUTTON_DROPDOWN_STORIES_CONFIG.States.parameters,
  args: BUTTON_DROPDOWN_STORIES_CONFIG.Variants.args,
  render: (args) => ({
    components: { YButtonDropdown },
    setup() {
      return { items: args.items }
    },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <YButtonDropdown :items="items" label="Обычная"></YButtonDropdown>
        
        <YButtonDropdown :items="items" label="Заблокированная" :disabled="true"></YButtonDropdown>
        
        <YButtonDropdown :items="items" label="Загрузка" :loading="true"></YButtonDropdown>

        <YButtonDropdown :items="items" label="Открытое" :is-open="true"></YButtonDropdown>
      </div>
    `,
  }),
}

export const IconType: Story = {
  parameters: BUTTON_DROPDOWN_STORIES_CONFIG.IconType.parameters,
  args: BUTTON_DROPDOWN_STORIES_CONFIG.IconType.args,
  render: (args) => ({
    components: { YButtonDropdown },
    setup() {
      return { items: args.items, label: args.label, EYCoreButtonDropdownIconTypes }
    },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <YButtonDropdown
          :items="items"
          :label="label"
          :iconType="EYCoreButtonDropdownIconTypes.LEFT"
        ></YButtonDropdown>

        <YButtonDropdown
          :items="items"
          :label="label"
          :iconType="EYCoreButtonDropdownIconTypes.RIGHT"
        ></YButtonDropdown>
      </div>
    `,
  }),
}

export const FullWidth: Story = {
  parameters: BUTTON_DROPDOWN_STORIES_CONFIG.FullWidth.parameters,
  args: BUTTON_DROPDOWN_STORIES_CONFIG.FullWidth.args,
  render: (args) => ({
    components: { YButtonDropdown },
    setup() {
      return { items: args.items }
    },
    template: `
      <div style="min-height: 100px;">
        <YButtonDropdown
          label="Растянутая кнопка"
          :fullWidth="true"
          :items="items"
        ></YButtonDropdown>
      </div>
    `,
  }),
}


