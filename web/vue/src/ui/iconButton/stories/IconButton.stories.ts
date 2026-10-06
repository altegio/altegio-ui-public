import type { Meta, StoryObj } from '@storybook/vue3'

import { YIconButton } from '~vue/ui/iconButton'
import { type IYVueIconButtonProps } from '~vue/ui/iconButton/models/types'
import yCoreIconButtonStoryMeta from '~core/ui/iconButton/stories/IconButton.stories'
import { EYCoreSimpleButtonVariant } from '~core/ui/simpleButton/models/types'


import { createVueIconButtonParameters, ICON_BUTTON_STORIES_CONFIG, iconButtonIcons, iconButtonSizes } from './IconButton.stories.utils'


type TVueIconButtonStoryMeta = IYVueIconButtonProps

const parameters = createVueIconButtonParameters()

const meta: Meta<TVueIconButtonStoryMeta> = {
  title: 'Buttons/🔍 IconButton',
  id: 'iconButton',
  parameters,
  tags: [
    'vue',
    'autodocs',
  ],
  component: YIconButton,
  argTypes: { ...yCoreIconButtonStoryMeta.argTypes },
  args: { ...yCoreIconButtonStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = { parameters: ICON_BUTTON_STORIES_CONFIG.Playground.parameters }

export const Variants: Story = {
  parameters: ICON_BUTTON_STORIES_CONFIG.Variants.parameters,
  render: () => ({
    components: { YIconButton },
    setup() {
      return { iconButtonIcons }
    },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <YIconButton variant="primary" :icon="iconButtonIcons.search" />
        
        <YIconButton variant="secondary" :icon="iconButtonIcons.search" />
        
        <YIconButton variant="outline" :icon="iconButtonIcons.search" />
        
        <YIconButton variant="text" :icon="iconButtonIcons.search" />
      </div>
    `,
  }),
}

export const Sizes: Story = {
  parameters: ICON_BUTTON_STORIES_CONFIG.Sizes.parameters,
  render: () => ({
    components: { YIconButton },
    setup() {
      return { iconButtonSizes, iconButtonIcons }
    },
    template: `
      <div style="display: grid; gap: 16px;">
        <div v-for="size in iconButtonSizes" :key="size" style="display: flex; gap: 8px; align-items: center;">
          <div style="width: 80px; font-weight: 500;">{{ size }}:</div>
          
          <YIconButton :size="size" :icon="iconButtonIcons.search" />
        </div>
      </div>
    `,
  }),
}

export const States: Story = {
  parameters: ICON_BUTTON_STORIES_CONFIG.States.parameters,
  render: () => ({
    components: { YIconButton },
    setup() {
      return { iconButtonIcons }
    },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <YIconButton :icon="iconButtonIcons.search" />
        
        <YIconButton :disabled="true" :icon="iconButtonIcons.search" />
        
        <YIconButton :loading="true" :icon="iconButtonIcons.search" />
      </div>
    `,
  }),
}

export const PseudoStates: Story = {
  parameters: ICON_BUTTON_STORIES_CONFIG.PseudoStates.parameters,
  render: () => ({
    components: { YIconButton },
    setup() {
      return { iconButtonIcons }
    },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <YIconButton :icon="iconButtonIcons.search" />
        
        <YIconButton 
          :icon="iconButtonIcons.search"
          style="--y-core-simple-button-variant-primary-background-color: var(--y-core-simple-button-variant-primary-hover-background-color);"
        />
        
        <YIconButton 
          :icon="iconButtonIcons.search"
          style="--y-core-simple-button-variant-primary-background-color: var(--y-core-simple-button-variant-primary-hover-background-color);"
        />
      </div>
    `,
  }),
}

export const FullWidth: Story = {
  parameters: ICON_BUTTON_STORIES_CONFIG.FullWidth.parameters,
  args: ICON_BUTTON_STORIES_CONFIG.FullWidth.args,
}

export const LinkMode: Story = {
  parameters: ICON_BUTTON_STORIES_CONFIG.LinkMode.parameters,
  render: () => ({
    components: { YIconButton },
    setup() {
      return { iconButtonIcons }
    },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <YIconButton 
          href="https://example.com" 
          target="_blank"
          :icon="iconButtonIcons.search"
        />
        
        <YIconButton 
          href="/internal-page" 
          :icon="iconButtonIcons.rocket"
        />
      </div>
    `,
  }),
}

export const ComplexDemo: Story = {
  parameters: ICON_BUTTON_STORIES_CONFIG.ComplexDemo.parameters,
  render: () => ({
    components: { YIconButton },
    setup() {
      const variants = Object.values(EYCoreSimpleButtonVariant)
      return { variants, iconButtonIcons }
    },
    template: `
      <div style="display: grid; gap: 16px;">
        <div v-for="variant in variants" :key="variant" style="display: flex; gap: 8px; align-items: center;">
          <div style="width: 80px; font-weight: 500;">{{ variant }}:</div>
          
          <YIconButton :variant="variant" size="small" :icon="iconButtonIcons.search" />
          
          <YIconButton :variant="variant" size="medium" :icon="iconButtonIcons.rocket" />
          
          <YIconButton :variant="variant" size="large" :icon="iconButtonIcons.magic" />
          
          <YIconButton :variant="variant" size="medium" :disabled="true" :icon="iconButtonIcons.info" />
          
          <YIconButton :variant="variant" size="medium" :loading="true" :icon="iconButtonIcons.copy" />
        </div>
      </div>
    `,
  }),
}
