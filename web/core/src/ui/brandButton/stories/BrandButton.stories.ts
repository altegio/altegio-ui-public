import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'

import { EYCoreBrandButtonVariant } from '../models/types/external'
import { EYSizes } from '~shared/types/global'
import { YCoreBrandButtonTagName as tagName } from '~shared/constants'
import '~core/ui/brandButton'

import {
  getComponentStateTable,
  getComponentEmitsTable,
  getComponentContentTable,
} from '~shared/.storybook/tables'

import {
  createBrandButtonParameters,
  BRAND_BUTTON_STORIES_CONFIG,
  brandButtonSizes,
  brandButtonVariants,
} from './BrandButton.stories.utils'
import { EFrameworkName } from '~web/shared/.storybook/enums/frameworkName'

import simpleButtonStoryMeta from '~core/ui/simpleButton/stories/SimpleButton.stories'

const parameters = createBrandButtonParameters(EFrameworkName.LIT)

const meta: Meta = {
  title: '⚙️️ BrandButton',
  id: 'brand-button',
  parameters,
  component: tagName,
  tags: ['core', 'autodocs'],
  render: (args) => {
    return html`
      <y-core-brand-button
        .variant=${args.variant}
        .size=${args.size}
        .disabled=${args.disabled}
        .loading=${args.loading}
        .text=${args.text}
        @click=${args.onClick}
      >
      </y-core-brand-button>
    `
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      description:
        '**Brand**\n\nSelects the button style and icon. Each brand has its own colors and SVG icon.',
      options: brandButtonVariants,
      table: {
        type: { summary: 'EYCoreBrandButtonVariant' },
        defaultValue: { summary: EYCoreBrandButtonVariant.WhatsApp },
        category: 'Appearance',
      },
      ...getComponentStateTable(EYCoreBrandButtonVariant.WhatsApp),
    },
    size: {
      ...simpleButtonStoryMeta.argTypes.size,
      options: brandButtonSizes,
      description:
        '**Button size**\n\n- `small`: compact button (18px icon)\n- `medium`: standard button (20px icon)\n- `large`: larger button (22px icon)',
    },
    disabled: { ...simpleButtonStoryMeta.argTypes.disabled },
    loading: { ...simpleButtonStoryMeta.argTypes.loading },
    text: {
      type: 'string',
      description: '**Button text**\n\nText displayed in the component.',
      ...getComponentContentTable('Sign in with WhatsApp'),
    },

    click: {
      type: 'function',
      description:
        '**Click event**\n\nEmitted when the button is clicked. Not emitted while `disabled` or `loading` is true.',
      ...getComponentEmitsTable(),
    },
  },
  args: {
    variant: EYCoreBrandButtonVariant.WhatsApp,
    size: simpleButtonStoryMeta.args.size || EYSizes.SMALL,
    disabled: simpleButtonStoryMeta.args.disabled || false,
    loading: simpleButtonStoryMeta.args.loading || false,
    text: 'Sign in with WhatsApp',
  },
}

export default meta

type Story = StoryObj

export const Playground: Story = { parameters: BRAND_BUTTON_STORIES_CONFIG.Playground.parameters }

export const Sizes: Story = {
  parameters: BRAND_BUTTON_STORIES_CONFIG.Sizes.parameters,
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: flex-end;">
      <y-core-brand-button variant=${EYCoreBrandButtonVariant.WhatsApp} size="small" text="Small"></y-core-brand-button>
      <y-core-brand-button variant=${EYCoreBrandButtonVariant.WhatsApp} size="medium" text="Medium"></y-core-brand-button>
      <y-core-brand-button variant=${EYCoreBrandButtonVariant.WhatsApp} size="large" text="Large"></y-core-brand-button>
    </div>
  `,
}

export const States: Story = {
  parameters: BRAND_BUTTON_STORIES_CONFIG.States.parameters,
  render: () => html`
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
      <y-core-brand-button variant=${EYCoreBrandButtonVariant.WhatsApp} text="Default">Default</y-core-brand-button>
      <y-core-brand-button variant=${EYCoreBrandButtonVariant.WhatsApp} text="Disabled" .disabled=${true}></y-core-brand-button>
      <y-core-brand-button variant=${EYCoreBrandButtonVariant.WhatsApp} .loading=${true}></y-core-brand-button>
    </div>
  `,
}

export const Variants: Story = {
  parameters: BRAND_BUTTON_STORIES_CONFIG.Variants.parameters,
  render: () => html`
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
      <y-core-brand-button variant=${EYCoreBrandButtonVariant.WhatsApp} text="Variant"></y-core-brand-button>
    </div>
  `,
}
