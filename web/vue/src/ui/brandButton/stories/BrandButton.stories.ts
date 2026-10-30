import type { Meta, StoryObj } from '@storybook/vue3'
import { AltBrandButton } from '~vue/ui/brandButton'
import type { IAltVueBrandButtonProps } from '~vue/ui/brandButton/models/types'

import altCoreBrandButtonStoryMeta from '~core/ui/brandButton/stories/BrandButton.stories'

import {
  createVueBrandButtonParameters,
  BRAND_BUTTON_STORIES_CONFIG,
  brandButtonSizes,
  brandButtonVariants,
} from './BrandButton.stories.utils'

const parameters = createVueBrandButtonParameters()

const meta: Meta<IAltVueBrandButtonProps> = {
  title: '🔍 BrandButton',
  id: 'brand-button',
  parameters,
  component: AltBrandButton,
  tags: ['vue', 'autodocs'],
  argTypes: { ...altCoreBrandButtonStoryMeta.argTypes },
  args: { ...altCoreBrandButtonStoryMeta.args },
}

export default meta

type Story = StoryObj<IAltVueBrandButtonProps>

export const Playground: Story = { parameters: BRAND_BUTTON_STORIES_CONFIG.Playground.parameters }

export const Sizes: Story = {
  parameters: BRAND_BUTTON_STORIES_CONFIG.Sizes.parameters,
  render: () => ({
    components: { AltBrandButton },
    setup() {
      return { brandButtonSizes }
    },
    template: `
      <div style="display: flex; gap: 16px; align-items: flex-end;">
        <AltBrandButton
          v-for="size in brandButtonSizes"
          :key="size"
          :variant="'whatsapp'"
          :size="size"
          :text="size"
        >
        </AltBrandButton>
      </div>
    `,
  }),
}

export const States: Story = {
  parameters: BRAND_BUTTON_STORIES_CONFIG.States.parameters,
  render: () => ({
    components: { AltBrandButton },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <AltBrandButton>Default</AltBrandButton>
        
        <AltBrandButton text="Disabled" :disabled="true">Disabled</AltBrandButton>
        
        <AltBrandButton text="Loading" :loading="true">Loading</AltBrandButton>
      </div>
    `,
  }),
}

export const Variants: Story = {
  parameters: BRAND_BUTTON_STORIES_CONFIG.Variants.parameters,
  render: () => ({
    components: { AltBrandButton },
    setup() {
      return { brandButtonVariants }
    },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <AltBrandButton
          v-for="variant in brandButtonVariants"
          :key="variant"
          :variant="variant"
          text="Variant"
        >
        </AltBrandButton>
      </div>
    `,
  }),
}
