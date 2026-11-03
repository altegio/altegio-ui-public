import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'

import '~core/ui/tag'

import { ifDefined } from 'lit/directives/if-defined.js'
import { AltCoreTagTagName } from '~shared/constants'
import { altRocket, altLoader } from '~shared/icons'
import '../Tag.core'
import { getComponentContentTable, getComponentStateTable, storyControlsTable } from '~shared/.storybook/tables'
import type { ITextStoryProps } from '~shared/.storybook/argTypes'
import {
  disabled as disabledArgType,
  isLongText as isLongTextArgType,
} from '~shared/.storybook/argTypes'
import type { IAltCoreTagProps } from '../models/types'
import { createCoreTagProps, EAltCoreTagVariant } from '../models/types'
import { EAltSizes } from '~shared/types/global'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import type { TAltCoreTagEvents } from '../models/types/events'

const { size, variant, disabled, iconLeft, locator, locatorLabel, locatorIcon } = createCoreTagProps()

const iconOptions = {
  rocket: altRocket,
  loader: altLoader,
}

export type TAltCoreTagMeta = IAltCoreTagProps & ITextStoryProps & TAltCoreTagEvents & {
  text?: string
}

type Story = StoryObj<TAltCoreTagMeta>

const meta: Meta<TAltCoreTagMeta> = {
  title: '✅ Tag',
  id: 'tag',
  component: AltCoreTagTagName,
  tags: ['autodocs'],
  argTypes: {
    locator: {
      type: 'string',
      description: 'Data locator',
      ...getComponentStateTable(locator),
    },
    size: {
      control: 'select',
      options: [
        EAltSizes.SMALL,
        EAltSizes.MEDIUM,
        EAltSizes.LARGE,
      ],
      description: 'Tag size',
      ...getComponentStateTable(size),

    },
    variant: {
      control: 'select',
      options: Object.values(EAltCoreTagVariant),
      description: 'Tag variant',
      ...getComponentStateTable(variant),
    },
    disabled: {
      ...getComponentStateTable(disabled),
      ...disabledArgType,
    },
    iconLeft: {
      control: { type: 'select' },
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      description: 'Icon before the tag content',
      ...getComponentContentTable(iconLeft),

    },
    locatorLabel: {
      control: 'text',
      description: 'Data locator for the label',
      ...getComponentContentTable(locatorLabel),
    },
    locatorIcon: {
      control: 'text',
      description: 'Data locator for the icon',
      ...getComponentContentTable(locatorIcon),
    },
    text: {
      control: 'text',
      description: 'Slot for tag text',
      ...storyControlsTable,
    },
    isLongText: isLongTextArgType,
  },
  args: {
    size: 'medium',
    variant: 'muted',
    isLongText: false,
    text: 'Tag label',
    locator,
  },
}

export default meta

// Basic example
export const Basic: Story = {

  render: (args) => {
    const computedText = args.isLongText ? LOREM_IPSUM : args.text

    return html`
      <alt-core-tag
        size=${ifDefined(args.size)}
        variant=${ifDefined(args.variant)}
        .disabled=${args.disabled}
        .iconLeft=${args.iconLeft}
        locator-label=${ifDefined(args.locatorLabel)}
        locator-icon=${ifDefined(args.locatorIcon)}
      >
        ${computedText}
      </alt-core-tag>
    `
  },
}

// All variants
export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <alt-core-tag variant="accent">Accent</alt-core-tag>
      
      <alt-core-tag variant="muted">Muted</alt-core-tag>
      
      <alt-core-tag variant="danger">Danger</alt-core-tag>
      
      <alt-core-tag variant="success">Success</alt-core-tag>
      
      <alt-core-tag variant="warning">Warning</alt-core-tag>
      
      <alt-core-tag variant="information">Information</alt-core-tag>
      
      <alt-core-tag variant="discovery">Discovery</alt-core-tag>
    </div>
  `,
}

// Sizes
export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; align-items: center;">
      <alt-core-tag size="small">Small</alt-core-tag>

      <alt-core-tag size="medium">Medium</alt-core-tag>

      <alt-core-tag size="large">Large</alt-core-tag>
    </div>
  `,
}

// With an icon
export const WithIcon: Story = {
  args: { iconLeft: altRocket },
  render: (args) => html`
    <alt-core-tag .iconLeft=${args.iconLeft}>
      With an icon
    </alt-core-tag>
  `,
}

// Disabled state
export const Disabled: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <h3>Default disabled state:</h3>
        
        <alt-core-tag disabled>Unavailable</alt-core-tag>
      </div>

      <div>
        <h3>Disabled states for all variants:</h3>
        
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <alt-core-tag variant="accent" disabled>Accent</alt-core-tag>
          
          <alt-core-tag variant="muted" disabled>Muted</alt-core-tag>
          
          <alt-core-tag variant="danger" disabled>Danger</alt-core-tag>
          
          <alt-core-tag variant="success" disabled>Success</alt-core-tag>
          
          <alt-core-tag variant="warning" disabled>Warning</alt-core-tag>
          
          <alt-core-tag variant="information" disabled>Information</alt-core-tag>
          
          <alt-core-tag variant="discovery" disabled>Discovery</alt-core-tag>
        </div>
      </div>

      <div>
        <h3>Disabled with an icon:</h3>
        <alt-core-tag .iconLeft=${altRocket} disabled>With a left icon</alt-core-tag>
        </div>

      <div>
        <h3>Disabled at different sizes:</h3>

        <div style="display: flex; gap: 8px; align-items: center;">
          <alt-core-tag size="small" disabled>Small</alt-core-tag>

          <alt-core-tag size="medium" disabled>Medium</alt-core-tag>

          <alt-core-tag size="large" disabled>Large</alt-core-tag>
        </div>
      </div>
    </div>
  `,
}

// Usage examples
export const Examples: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <h3>Status examples:</h3>
        
        <div style="display: flex; gap: 8px;">
          <alt-core-tag variant="success">Available</alt-core-tag>
          
          <alt-core-tag variant="danger">Canceled</alt-core-tag>
          
          <alt-core-tag variant="warning">Unavailable</alt-core-tag>
        </div>
      </div>

      <div>
        <h3>Information examples:</h3>
        
        <div style="display: flex; gap: 8px;">
          <alt-core-tag variant="information">New</alt-core-tag>
          
          <alt-core-tag variant="discovery">Updated</alt-core-tag>
          
          <alt-core-tag variant="accent">What is new</alt-core-tag>
        </div>
      </div>

      <div>
        <h3>In context:</h3>
        
        <div style="display: flex; flex-direction: column; gap: 8px; padding: 16px; background: #f5f5f5; border-radius: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span>Manicure</span>
            
            <alt-core-tag variant="warning" size="small">Fully booked</alt-core-tag>
          </div>
          
          <div style="display: flex; gap: 8px; align-items: center;">
            <alt-core-tag variant="muted" size="small">1 h 30 min</alt-core-tag>
            
            <alt-core-tag variant="muted" size="small">Room 45</alt-core-tag>
          </div>
        </div>
      </div>
    </div>
  `,
}

