import { computed } from 'vue'
import { omit } from 'radash'
import type { Meta, StoryObj } from '@storybook/vue3'
import { action } from 'storybook/actions'
import { useArgs } from 'storybook/preview-api'

import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { getComponentContentTable } from '~shared/.storybook/tables'
import { EFrameworkName } from '~shared/.storybook/enums/frameworkName'

import {
  createButtonDropdownParameters,
  BUTTON_DROPDOWN_STORIES_CONFIG,
} from '~core/ui/buttonDropdown/stories/ButtonDropdown.stories.utils'
import altCoreButtonDropdownStoryMeta from '~core/ui/buttonDropdown/stories/ButtonDropdown.stories'
import type { VisibleEvent } from '~core/ui/buttonDropdown/models/types'
import { EAltCoreButtonDropdownIconTypes } from '~core/ui/buttonDropdown/models/types/internal'
import { EAltCoreSimpleButtonVariant } from '~core/ui/simpleButton/models/types'

import { AltButtonDropdown } from '~vue/ui/buttonDropdown'
import type { IAltVueButtonDropdownProps } from '~vue/ui/buttonDropdown/models/types'

type TVueButtonDropdownStoryMeta = IAltVueButtonDropdownProps

/**
 * Vue wrapper for Core ButtonDropdown
 */
const meta: Meta<TVueButtonDropdownStoryMeta> = {
  title: 'Buttons/✅ ButtonDropdown',
  id: 'buttonDropdown',
  parameters: createButtonDropdownParameters(EFrameworkName.VUE),
  tags: ['vue', 'autodocs'],
  render: (args) => {
    const [, updateArgs] = useArgs<IAltVueButtonDropdownProps>()

    const handleSetModelValue = (modelValue: VisibleEvent['detail']['value']) => {
      updateArgs({ modelValue })
      action('update:modelValue')(modelValue)
    }

    return {
      components: { AltButtonDropdown },
      setup() {
        const vModelValue = computed({
          get: () => Boolean(args.modelValue),
          set: handleSetModelValue,
        })

        return { args, LOREM_IPSUM, vModelValue }
      },
      template: `
        <div style="padding: 50px 50px 350px; margin: 20px; border: 1px dashed black; border-radius: 8px; overflow: auto">        
        <AltButtonDropdown
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
          </AltButtonDropdown>
        </div>
      `,
    }
  },
  argTypes: {
    ...omit(altCoreButtonDropdownStoryMeta.argTypes ?? {}, ['isOpen']),
    modelValue: {
      type: 'boolean',
      description: 'Default v-model for the is-open value',
      ...getComponentContentTable(),
    },
  },
  args: {
    ...omit(altCoreButtonDropdownStoryMeta.args ?? {}, ['isOpen']),
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
    components: { AltButtonDropdown },
    setup() {
      const variants = Object.values(EAltCoreSimpleButtonVariant)
      return { variants, items: args.items }
    },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <AltButtonDropdown
          v-for="variant in variants" 
          :key="variant"
          :items="items"
          :variant="variant"
          :label="variant"
        >
        </AltButtonDropdown>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  parameters: BUTTON_DROPDOWN_STORIES_CONFIG.Sizes.parameters,
  args: BUTTON_DROPDOWN_STORIES_CONFIG.Variants.args,
  render: (args) => ({
    components: { AltButtonDropdown },
    setup() {
      const sizes = ['small', 'medium', 'large'] as const
      return {
        sizes,
        items: args.items,
      }
    },
    template: `
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
        <AltButtonDropdown
          v-for="size in sizes" 
          :key="size"
          :size="size"
          :items="items"
          :label="size"
        >
        </AltButtonDropdown>
      </div>
    `,
  }),
}

export const States: Story = {
  parameters: BUTTON_DROPDOWN_STORIES_CONFIG.States.parameters,
  args: BUTTON_DROPDOWN_STORIES_CONFIG.Variants.args,
  render: (args) => ({
    components: { AltButtonDropdown },
    setup() {
      return { items: args.items }
    },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <AltButtonDropdown :items="items" label="Default"></AltButtonDropdown>
        
        <AltButtonDropdown :items="items" label="Disabled" :disabled="true"></AltButtonDropdown>
        
        <AltButtonDropdown :items="items" label="Loading" :loading="true"></AltButtonDropdown>

        <AltButtonDropdown :items="items" label="Open" :is-open="true"></AltButtonDropdown>
      </div>
    `,
  }),
}

export const IconType: Story = {
  parameters: BUTTON_DROPDOWN_STORIES_CONFIG.IconType.parameters,
  args: BUTTON_DROPDOWN_STORIES_CONFIG.IconType.args,
  render: (args) => ({
    components: { AltButtonDropdown },
    setup() {
      return { items: args.items, label: args.label, EAltCoreButtonDropdownIconTypes }
    },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <AltButtonDropdown
          :items="items"
          :label="label"
          :iconType="EAltCoreButtonDropdownIconTypes.LEFT"
        ></AltButtonDropdown>

        <AltButtonDropdown
          :items="items"
          :label="label"
          :iconType="EAltCoreButtonDropdownIconTypes.RIGHT"
        ></AltButtonDropdown>
      </div>
    `,
  }),
}

export const FullWidth: Story = {
  parameters: BUTTON_DROPDOWN_STORIES_CONFIG.FullWidth.parameters,
  args: BUTTON_DROPDOWN_STORIES_CONFIG.FullWidth.args,
  render: (args) => ({
    components: { AltButtonDropdown },
    setup() {
      return { items: args.items }
    },
    template: `
      <div style="min-height: 100px;">
        <AltButtonDropdown
          label="Full-width button"
          :fullWidth="true"
          :items="items"
        ></AltButtonDropdown>
      </div>
    `,
  }),
}


