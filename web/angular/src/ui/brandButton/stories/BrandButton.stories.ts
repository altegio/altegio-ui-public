import type { Meta, StoryObj } from '@storybook/angular'
import { action } from 'storybook/actions'
import altCoreBrandButtonStoryMeta from '~core/ui/brandButton/stories/BrandButton.stories'

import { AltBrandButton } from '~ng/ui/brandButton'
import { EAltCoreBrandButtonVariant } from '~core/ui/brandButton/models/types/external'

import {
  createAngularBrandButtonParameters,
  BRAND_BUTTON_STORIES_CONFIG,
  brandButtonSizes,
  brandButtonVariants,
} from './BrandButton.stories.utils'

const parameters = createAngularBrandButtonParameters()

const meta: Meta<AltBrandButton> = {
  title: '⚙️️ BrandButton',
  id: 'brandButton',
  parameters,
  component: AltBrandButton,
  tags: ['angular', 'autodocs'],
  render: (args) => ({
    props: {
      ...args,
      onClick: action('click'),
    },
    template: `
      <AltBrandButton
        [variant]="variant"
        [text]="text"
        [disabled]="disabled"
        [loading]="loading"
        [size]="size"
        (click)="onClick($event)"
      />
    `,
  }),
  argTypes: { ...altCoreBrandButtonStoryMeta.argTypes },
  args: { ...altCoreBrandButtonStoryMeta.args },
}

export default meta

type Story = StoryObj<AltBrandButton>

export const Playground: Story = { parameters: BRAND_BUTTON_STORIES_CONFIG.Playground.parameters }

export const Sizes: Story = {
  parameters: BRAND_BUTTON_STORIES_CONFIG.Sizes.parameters,
  render: () => ({
    props: { brandButtonSizes },
    template: `
      <div style="display: flex; gap: 16px; align-items: flex-end;">
        <AltBrandButton
          *ngFor="let size of brandButtonSizes"
          [size]="size"
          variant="${EAltCoreBrandButtonVariant.WhatsApp}"
          [text]="size"
        />
      </div>
    `,
  }),
}

export const States: Story = {
  parameters: BRAND_BUTTON_STORIES_CONFIG.States.parameters,
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <AltBrandButton variant="${EAltCoreBrandButtonVariant.WhatsApp}" text="Default"></AltBrandButton>
        <AltBrandButton variant="${EAltCoreBrandButtonVariant.WhatsApp}" [disabled]="true" text="Disabled"></AltBrandButton>
        <AltBrandButton variant="${EAltCoreBrandButtonVariant.WhatsApp}" [loading]="true" text="Loading"></AltBrandButton>
      </div>
    `,
  }),
}

export const Variants: Story = {
  parameters: BRAND_BUTTON_STORIES_CONFIG.Variants.parameters,
  render: () => ({
    props: { brandButtonVariants },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <AltBrandButton
          *ngFor="let variant of brandButtonVariants"
          [variant]="variant"
          [text]="'Sign in with ' + variant"
        />
      </div>
    `,
  }),
}
