import type { Meta, StoryObj } from '@storybook/vue3'

import { AltIconButton } from '~vue/ui/iconButton'
import { type IAltVueIconButtonProps } from '~vue/ui/iconButton/models/types'
import altCoreIconButtonStoryMeta from '~core/ui/iconButton/stories/IconButton.stories'
import { EAltCoreSimpleButtonVariant } from '~core/ui/simpleButton/models/types'


import { createVueIconButtonParameters, ICON_BUTTON_STORIES_CONFIG, iconButtonIcons, iconButtonSizes } from './IconButton.stories.utils'


type TVueIconButtonStoryMeta = IAltVueIconButtonProps

const parameters = createVueIconButtonParameters()

const meta: Meta<TVueIconButtonStoryMeta> = {
  title: 'Buttons/🔍 IconButton',
  id: 'iconButton',
  parameters,
  tags: [
    'vue',
    'autodocs',
  ],
  component: AltIconButton,
  argTypes: { ...altCoreIconButtonStoryMeta.argTypes },
  args: { ...altCoreIconButtonStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = { parameters: ICON_BUTTON_STORIES_CONFIG.Playground.parameters }

export const Variants: Story = {
  parameters: ICON_BUTTON_STORIES_CONFIG.Variants.parameters,
  render: () => ({
    components: { AltIconButton },
    setup() {
      return { iconButtonIcons }
    },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <AltIconButton variant="primary" :icon="iconButtonIcons.search" />
        
        <AltIconButton variant="secondary" :icon="iconButtonIcons.search" />
        
        <AltIconButton variant="outline" :icon="iconButtonIcons.search" />
        
        <AltIconButton variant="text" :icon="iconButtonIcons.search" />
      </div>
    `,
  }),
}

export const Sizes: Story = {
  parameters: ICON_BUTTON_STORIES_CONFIG.Sizes.parameters,
  render: () => ({
    components: { AltIconButton },
    setup() {
      return { iconButtonSizes, iconButtonIcons }
    },
    template: `
      <div style="display: grid; gap: 16px;">
        <div v-for="size in iconButtonSizes" :key="size" style="display: flex; gap: 8px; align-items: center;">
          <div style="width: 80px; font-weight: 500;">{{ size }}:</div>
          
          <AltIconButton :size="size" :icon="iconButtonIcons.search" />
        </div>
      </div>
    `,
  }),
}

export const States: Story = {
  parameters: ICON_BUTTON_STORIES_CONFIG.States.parameters,
  render: () => ({
    components: { AltIconButton },
    setup() {
      return { iconButtonIcons }
    },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <AltIconButton :icon="iconButtonIcons.search" />
        
        <AltIconButton :disabled="true" :icon="iconButtonIcons.search" />
        
        <AltIconButton :loading="true" :icon="iconButtonIcons.search" />
      </div>
    `,
  }),
}

export const PseudoStates: Story = {
  parameters: ICON_BUTTON_STORIES_CONFIG.PseudoStates.parameters,
  render: () => ({
    components: { AltIconButton },
    setup() {
      return { iconButtonIcons }
    },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <AltIconButton :icon="iconButtonIcons.search" />
        
        <AltIconButton 
          :icon="iconButtonIcons.search"
          style="--alt-core-simple-button-variant-primary-background-color: var(--alt-core-simple-button-variant-primary-hover-background-color);"
        />
        
        <AltIconButton 
          :icon="iconButtonIcons.search"
          style="--alt-core-simple-button-variant-primary-background-color: var(--alt-core-simple-button-variant-primary-hover-background-color);"
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
    components: { AltIconButton },
    setup() {
      return { iconButtonIcons }
    },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <AltIconButton 
          href="https://example.com" 
          target="_blank"
          :icon="iconButtonIcons.search"
        />
        
        <AltIconButton 
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
    components: { AltIconButton },
    setup() {
      const variants = Object.values(EAltCoreSimpleButtonVariant)
      return { variants, iconButtonIcons }
    },
    template: `
      <div style="display: grid; gap: 16px;">
        <div v-for="variant in variants" :key="variant" style="display: flex; gap: 8px; align-items: center;">
          <div style="width: 80px; font-weight: 500;">{{ variant }}:</div>
          
          <AltIconButton :variant="variant" size="small" :icon="iconButtonIcons.search" />
          
          <AltIconButton :variant="variant" size="medium" :icon="iconButtonIcons.rocket" />
          
          <AltIconButton :variant="variant" size="large" :icon="iconButtonIcons.magic" />
          
          <AltIconButton :variant="variant" size="medium" :disabled="true" :icon="iconButtonIcons.info" />
          
          <AltIconButton :variant="variant" size="medium" :loading="true" :icon="iconButtonIcons.copy" />
        </div>
      </div>
    `,
  }),
}
