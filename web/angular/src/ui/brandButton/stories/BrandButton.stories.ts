import type { Meta, StoryObj } from '@storybook/angular'
import { action } from '@storybook/addon-actions'
import yCoreBrandButtonStoryMeta from '~core/ui/brandButton/stories/BrandButton.stories'

import { YBrandButton } from '~ng/ui/brandButton'
import { EYCoreBrandButtonVariant } from '~core/ui/brandButton/models/types/external'

import {
  createAngularBrandButtonParameters,
  BRAND_BUTTON_STORIES_CONFIG,
  brandButtonSizes,
  brandButtonVariants,
} from './BrandButton.stories.utils'

const parameters = createAngularBrandButtonParameters()

const meta: Meta<YBrandButton> = {
  title: '⚙️️ BrandButton',
  id: 'brandButton',
  parameters,
  component: YBrandButton,
  tags: ['angular', 'autodocs'],
  render: (args) => ({
    props: {
      ...args,
      onClick: action('click'),
    },
    template: `
      <YBrandButton
        [variant]="variant"
        [text]="text"
        [disabled]="disabled"
        [loading]="loading"
        [size]="size"
        (click)="onClick($event)"
      />
    `,
  }),
  argTypes: { ...yCoreBrandButtonStoryMeta.argTypes },
  args: { ...yCoreBrandButtonStoryMeta.args },
}

export default meta

type Story = StoryObj<YBrandButton>

export const Playground: Story = { parameters: BRAND_BUTTON_STORIES_CONFIG.Playground.parameters }

export const Sizes: Story = {
  parameters: BRAND_BUTTON_STORIES_CONFIG.Sizes.parameters,
  render: () => ({
    props: { brandButtonSizes },
    template: `
      <div style="display: flex; gap: 16px; align-items: flex-end;">
        <YBrandButton
          *ngFor="let size of brandButtonSizes"
          [size]="size"
          variant="${EYCoreBrandButtonVariant.WhatsApp}"
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
        <YBrandButton variant="${EYCoreBrandButtonVariant.WhatsApp}" text="Default"></YBrandButton>
        <YBrandButton variant="${EYCoreBrandButtonVariant.WhatsApp}" [disabled]="true" text="Disabled"></YBrandButton>
        <YBrandButton variant="${EYCoreBrandButtonVariant.WhatsApp}" [loading]="true" text="Loading"></YBrandButton>
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
        <YBrandButton
          *ngFor="let variant of brandButtonVariants"
          [variant]="variant"
          [text]="'Sign in with ' + variant"
        />
      </div>
    `,
  }),
}
