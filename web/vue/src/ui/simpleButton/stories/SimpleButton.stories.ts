import type { Meta, StoryObj } from '@storybook/vue3'
import { YSimpleButton } from '~vue/ui/simpleButton'
import { EYCoreSimpleButtonVariant } from '~core/ui/simpleButton/models/types'
import { type IYVueSimpleButtonProps } from '~vue/ui/simpleButton/models/types'

import { createSimpleButtonParameters, SIMPLE_BUTTON_STORIES_CONFIG } from '~core/ui/simpleButton/stories/SimpleButton.stories.utils'
import { EFrameworkName } from '~web/shared/.storybook/enums/frameworkName'
import yCoreSimpleButtonStoryMeta from '~core/ui/simpleButton/stories/SimpleButton.stories'

import { YIcon } from '~vue/ui/icon'
import { ySearch } from '~shared/icons/build/y-search.icon'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { action } from '@storybook/addon-actions'

type TVueSimpleButtonStoryMeta = IYVueSimpleButtonProps

const meta: Meta<TVueSimpleButtonStoryMeta> = {
  title: 'Buttons/⚙️ SimpleButton',
  id: 'simpleButton',
  parameters: createSimpleButtonParameters(EFrameworkName.VUE),
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    components: { YSimpleButton, YIcon },
    setup() {
      return { args, ySearch, LOREM_IPSUM, onClick: action('click') }
    },
    template: `
      <YSimpleButton
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
          <y-vue-icon 
            :icon="ySearch" 
            :size="args.size === 'large' ? '24px' : '16px'"
          ></y-vue-icon>
          
          <span>{{ args.isLongText ? LOREM_IPSUM : args.text }}</span>
        </template>
        
        <template v-else>
          {{ args.isLongText ? LOREM_IPSUM : args.text }}
        </template>
      </YSimpleButton>
    `,
  }),
  argTypes: { ...yCoreSimpleButtonStoryMeta.argTypes },
  args: { ...yCoreSimpleButtonStoryMeta.args },
}

export default meta

type Story = StoryObj<TVueSimpleButtonStoryMeta>

export const Playground: Story = { parameters: SIMPLE_BUTTON_STORIES_CONFIG.Playground.parameters }

export const Variants: Story = {
  parameters: SIMPLE_BUTTON_STORIES_CONFIG.Variants.parameters,
  render: () => ({
    components: { YSimpleButton },
    setup() {
      const variants = Object.values(EYCoreSimpleButtonVariant)
      return { variants }
    },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <YSimpleButton
          v-for="variant in variants" 
          :key="variant"
          :is="tagName"
          :variant="variant"
        >
          {{ variant }}
        </YSimpleButton>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  parameters: SIMPLE_BUTTON_STORIES_CONFIG.Sizes.parameters,
  render: () => ({
    components: { YSimpleButton, YIcon },
    setup() {
      const sizes = ['small', 'medium', 'large'] as const
      return { sizes, ySearch }
    },
    template: `
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
        <YSimpleButton
          v-for="size in sizes" 
          :key="size"
          :size="size"
        >
          <YIcon
            :icon="ySearch" 
            :size="size === 'large' ? '24px' : '16px'"
          ></YIcon>
          {{ size }}
        </YSimpleButton>
      </div>
    `,
  }),
}

export const States: Story = {
  parameters: SIMPLE_BUTTON_STORIES_CONFIG.States.parameters,
  render: () => ({
    components: { YSimpleButton },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <YSimpleButton>Обычная</YSimpleButton>
        
        <YSimpleButton :disabled="true">Заблокированная</YSimpleButton>
        
        <YSimpleButton :loading="true">Загрузка</YSimpleButton>
      </div>
    `,
  }),
}

export const PseudoStates: Story = {
  parameters: SIMPLE_BUTTON_STORIES_CONFIG.PseudoStates.parameters,
  render: () => ({
    components: { YSimpleButton },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <YSimpleButton>Обычная</YSimpleButton>
        
        <YSimpleButton 
          style="--y-core-simple-button-variant-primary-background-color: var(--y-core-simple-button-variant-primary-hover-background-color);"
        >
          Hover
        </YSimpleButton>
        
        <YSimpleButton 
          style="--y-core-simple-button-variant-primary-background-color: var(--y-core-simple-button-variant-primary-hover-background-color);"
        >
          Active
        </YSimpleButton>
      </div>
    `,
  }),
}

export const FullWidth: Story = {
  parameters: SIMPLE_BUTTON_STORIES_CONFIG.FullWidth.parameters,
  args: SIMPLE_BUTTON_STORIES_CONFIG.FullWidth.args,
  render: () => ({
    components: { YSimpleButton, YIcon },
    setup() {
      return { ySearch }
    },
    template: `
      <div>
        <YSimpleButton :fullWidth="true">
          <YIcon :icon="ySearch" size="16px"></YIcon>
          Кнопка на всю ширину
        </YSimpleButton>
      </div>
    `,
  }),
}

export const LinkMode: Story = {
  parameters: SIMPLE_BUTTON_STORIES_CONFIG.LinkMode.parameters,
  render: () => ({
    components: { YSimpleButton, YIcon },
    setup() {
      return { ySearch }
    },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <YSimpleButton href="https://example.com" target="_blank">
          <YIcon :icon="ySearch" size="16px"></YIcon>
          Внешняя ссылка
        </YSimpleButton>
        
        <YSimpleButton href="/internal-page">
          Внутренняя ссылка
        </YSimpleButton>
      </div>
    `,
  }),
}

export const ComplexDemo: Story = {
  parameters: SIMPLE_BUTTON_STORIES_CONFIG.ComplexDemo.parameters,
  render: () => ({
    components: { YSimpleButton },
    setup() {
      const variants = Object.values(EYCoreSimpleButtonVariant)
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
          
          <YSimpleButton
            v-for="size in sizes" 
            :key="size"
            :variant="variant" 
            :size="size"
          >
            {{ size }}
          </YSimpleButton>
          
          <YSimpleButton :variant="variant" size="medium" :disabled="true">Disabled</YSimpleButton>
          
          <YSimpleButton :variant="variant" size="medium" :loading="true">Loading</YSimpleButton>
        </div>
      </div>
    `,
  }),
}
