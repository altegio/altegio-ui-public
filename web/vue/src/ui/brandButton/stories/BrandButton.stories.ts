import type { Meta, StoryObj } from '@storybook/vue3'
import { YBrandButton } from '~vue/ui/brandButton'
import type { IYVueBrandButtonProps } from '~vue/ui/brandButton/models/types'

import yCoreBrandButtonStoryMeta from '~core/ui/brandButton/stories/BrandButton.stories'

import {
  createVueBrandButtonParameters,
  BRAND_BUTTON_STORIES_CONFIG,
  brandButtonSizes,
  brandButtonVariants,
} from './BrandButton.stories.utils'

const parameters = createVueBrandButtonParameters()

const meta: Meta<IYVueBrandButtonProps> = {
  title: '🔍 BrandButton',
  id: 'brand-button',
  parameters,
  component: YBrandButton,
  tags: ['vue', 'autodocs'],
  argTypes: { ...yCoreBrandButtonStoryMeta.argTypes },
  args: { ...yCoreBrandButtonStoryMeta.args },
}

export default meta

type Story = StoryObj<IYVueBrandButtonProps>

export const Playground: Story = { parameters: BRAND_BUTTON_STORIES_CONFIG.Playground.parameters }

export const Sizes: Story = {
  parameters: BRAND_BUTTON_STORIES_CONFIG.Sizes.parameters,
  render: () => ({
    components: { YBrandButton },
    setup() {
      return { brandButtonSizes }
    },
    template: `
      <div style="display: flex; gap: 16px; align-items: flex-end;">
        <YBrandButton
          v-for="size in brandButtonSizes"
          :key="size"
          :variant="'whatsapp'"
          :size="size"
          :text="size"
        >
        </YBrandButton>
      </div>
    `,
  }),
}

export const States: Story = {
  parameters: BRAND_BUTTON_STORIES_CONFIG.States.parameters,
  render: () => ({
    components: { YBrandButton },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <YBrandButton>Default</YBrandButton>
        
        <YBrandButton text="Disabled" :disabled="true">Disabled</YBrandButton>
        
        <YBrandButton text="Loading" :loading="true">Loading</YBrandButton>
      </div>
    `,
  }),
}

export const Variants: Story = {
  parameters: BRAND_BUTTON_STORIES_CONFIG.Variants.parameters,
  render: () => ({
    components: { YBrandButton },
    setup() {
      return { brandButtonVariants }
    },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <YBrandButton
          v-for="variant in brandButtonVariants"
          :key="variant"
          :variant="variant"
          text="Variant"
        >
        </YBrandButton>
      </div>
    `,
  }),
}
