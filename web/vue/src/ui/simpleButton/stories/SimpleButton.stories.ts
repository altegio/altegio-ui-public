import type { Meta, StoryObj } from '@storybook/vue3'
import { AltSimpleButton } from '~vue/ui/simpleButton'
import { EAltCoreSimpleButtonVariant } from '~core/ui/simpleButton/models/types'
import { type IAltVueSimpleButtonProps } from '~vue/ui/simpleButton/models/types'

import { createSimpleButtonParameters, SIMPLE_BUTTON_STORIES_CONFIG } from '~core/ui/simpleButton/stories/SimpleButton.stories.utils'
import { EFrameworkName } from '~web/shared/.storybook/enums/frameworkName'
import altCoreSimpleButtonStoryMeta from '~core/ui/simpleButton/stories/SimpleButton.stories'

import { AltIcon } from '~vue/ui/icon'
import { altSearch } from '~shared/icons/build/alt-search.icon'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { action } from 'storybook/actions'

type TVueSimpleButtonStoryMeta = IAltVueSimpleButtonProps

const meta: Meta<TVueSimpleButtonStoryMeta> = {
  title: 'Buttons/⚙️ SimpleButton',
  id: 'simpleButton',
  parameters: createSimpleButtonParameters(EFrameworkName.VUE),
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    components: { AltSimpleButton, AltIcon },
    setup() {
      return { args, altSearch, LOREM_IPSUM, onClick: action('click') }
    },
    template: `
      <AltSimpleButton
        :variant="args.variant"
        :size="args.size"
        :disabled="args.disabled"
        :loading="args.loading"
        :fullWidth="args.fullWidth"
        :alignment="args.alignment"
        :href="args.href"
        :target="args.target"
        @click="onClick"
      >
        <template v-if="args.showDefaultSlot">
          <alt-vue-icon 
            :icon="altSearch" 
            :size="args.size === 'large' ? '24px' : '16px'"
          ></alt-vue-icon>
          
          <span>{{ args.isLongText ? LOREM_IPSUM : args.text }}</span>
        </template>
        
        <template v-else>
          {{ args.isLongText ? LOREM_IPSUM : args.text }}
        </template>
      </AltSimpleButton>
    `,
  }),
  argTypes: { ...altCoreSimpleButtonStoryMeta.argTypes },
  args: { ...altCoreSimpleButtonStoryMeta.args },
}

export default meta

type Story = StoryObj<TVueSimpleButtonStoryMeta>

export const Playground: Story = { parameters: SIMPLE_BUTTON_STORIES_CONFIG.Playground.parameters }

export const Variants: Story = {
  parameters: SIMPLE_BUTTON_STORIES_CONFIG.Variants.parameters,
  render: () => ({
    components: { AltSimpleButton },
    setup() {
      const variants = Object.values(EAltCoreSimpleButtonVariant)
      return { variants }
    },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <AltSimpleButton
          v-for="variant in variants" 
          :key="variant"
          :is="tagName"
          :variant="variant"
        >
          {{ variant }}
        </AltSimpleButton>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  parameters: SIMPLE_BUTTON_STORIES_CONFIG.Sizes.parameters,
  render: () => ({
    components: { AltSimpleButton, AltIcon },
    setup() {
      const sizes = ['small', 'medium', 'large'] as const
      return { sizes, altSearch }
    },
    template: `
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
        <AltSimpleButton
          v-for="size in sizes" 
          :key="size"
          :size="size"
        >
          <AltIcon
            :icon="altSearch" 
            :size="size === 'large' ? '24px' : '16px'"
          ></AltIcon>
          {{ size }}
        </AltSimpleButton>
      </div>
    `,
  }),
}

export const States: Story = {
  parameters: SIMPLE_BUTTON_STORIES_CONFIG.States.parameters,
  render: () => ({
    components: { AltSimpleButton },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <AltSimpleButton>Default</AltSimpleButton>
        
        <AltSimpleButton :disabled="true">Disabled</AltSimpleButton>
        
        <AltSimpleButton :loading="true">Loading</AltSimpleButton>
      </div>
    `,
  }),
}

export const PseudoStates: Story = {
  parameters: SIMPLE_BUTTON_STORIES_CONFIG.PseudoStates.parameters,
  render: () => ({
    components: { AltSimpleButton },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <AltSimpleButton>Default</AltSimpleButton>
        
        <AltSimpleButton 
          style="--alt-core-simple-button-variant-primary-background-color: var(--alt-core-simple-button-variant-primary-hover-background-color);"
        >
          Hover
        </AltSimpleButton>
        
        <AltSimpleButton 
          style="--alt-core-simple-button-variant-primary-background-color: var(--alt-core-simple-button-variant-primary-hover-background-color);"
        >
          Active
        </AltSimpleButton>
      </div>
    `,
  }),
}

export const FullWidth: Story = {
  parameters: SIMPLE_BUTTON_STORIES_CONFIG.FullWidth.parameters,
  args: SIMPLE_BUTTON_STORIES_CONFIG.FullWidth.args,
  render: () => ({
    components: { AltSimpleButton, AltIcon },
    setup() {
      return { altSearch }
    },
    template: `
      <div>
        <AltSimpleButton :fullWidth="true">
          <AltIcon :icon="altSearch" size="16px"></AltIcon>
          Full-width button
        </AltSimpleButton>
      </div>
    `,
  }),
}

export const LinkMode: Story = {
  parameters: SIMPLE_BUTTON_STORIES_CONFIG.LinkMode.parameters,
  render: () => ({
    components: { AltSimpleButton, AltIcon },
    setup() {
      return { altSearch }
    },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <AltSimpleButton href="https://example.com" target="_blank">
          <AltIcon :icon="altSearch" size="16px"></AltIcon>
          External link
        </AltSimpleButton>
        
        <AltSimpleButton href="/internal-page">
          Internal link
        </AltSimpleButton>
      </div>
    `,
  }),
}

export const ComplexDemo: Story = {
  parameters: SIMPLE_BUTTON_STORIES_CONFIG.ComplexDemo.parameters,
  render: () => ({
    components: { AltSimpleButton },
    setup() {
      const variants = Object.values(EAltCoreSimpleButtonVariant)
      const sizes = ['small', 'medium', 'large'] as const
      return { variants, sizes }
    },
    template: `
      <div style="display: grid; gap: 16px;">
        <div 
          v-for="variant in variants" 
          :key="variant"
          style="display: flex; gap: 8px; align-items: center;"
        >
          <div style="width: 80px; font-weight: 500;">{{ variant }}:</div>
          
          <AltSimpleButton
            v-for="size in sizes" 
            :key="size"
            :variant="variant" 
            :size="size"
          >
            {{ size }}
          </AltSimpleButton>
          
          <AltSimpleButton :variant="variant" size="medium" :disabled="true">Disabled</AltSimpleButton>
          
          <AltSimpleButton :variant="variant" size="medium" :loading="true">Loading</AltSimpleButton>
        </div>
      </div>
    `,
  }),
}
