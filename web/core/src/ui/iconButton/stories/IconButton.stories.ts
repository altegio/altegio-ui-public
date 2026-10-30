import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'
import { ifDefined } from 'lit/directives/if-defined.js'

import '~core/ui/iconButton'

import { AltCoreIconButtonTagName as tagName } from '~shared/constants'
import type { IAltCoreIconButtonProps } from '~core/ui/iconButton/models/types'
import {
  createCoreIconButtonExternalProps,
} from '~core/ui/iconButton/models/types'
import { EAltCoreSimpleButtonVariant } from '~core/ui/simpleButton/models/types'
import { getComponentContentTable } from '~shared/.storybook/tables'

import { omit } from 'radash'
import altCoreSimpleButtonStoryMeta, { type ISimpleButtonStoryEmits } from '~core/ui/simpleButton/stories/SimpleButton.stories'


import { createIconButtonParameters, ICON_BUTTON_STORIES_CONFIG, iconButtonSizes, iconButtonIcons } from './IconButton.stories.utils'
import { EFrameworkName } from '~web/shared/.storybook/enums/frameworkName'
import { action } from 'storybook/actions'


const { icon } = { ...createCoreIconButtonExternalProps() }

type TIconButtonStoryArgs = IAltCoreIconButtonProps & ISimpleButtonStoryEmits
type TIconButtonStoryMeta = Meta<TIconButtonStoryArgs>

const parameters = createIconButtonParameters(EFrameworkName.LIT)

const meta: TIconButtonStoryMeta = {
  title: 'Buttons/🔍 IconButton',
  id: 'iconButton',
  parameters,
  component: tagName,
  tags: ['core', 'autodocs'],
  render: ({ href, target, variant, size, disabled, loading, fullWidth, icon }) => {
    const handlers = { onClick: () => { action('onClick')() } }

    return html`
    <alt-core-icon-button
      href=${ifDefined(href)}
      target=${ifDefined(target)}
      variant=${ifDefined(variant)}
      size=${ifDefined(size)}
      .disabled=${disabled}
      .loading=${loading}
      .fullWidth=${fullWidth}
      .icon=${icon}
      @click=${handlers.onClick}
    ></alt-core-icon-button>
  `
  },
  argTypes: {
    ...omit(
      altCoreSimpleButtonStoryMeta.argTypes,
      ['text', 'showDefaultSlot', 'isLongText', 'alignment'],
    ),

    // Main content
    icon: {
      control: { type: 'select' },
      description: '**Button icon**\n\nRequired. The icon size adjusts to the button size.',
      options: Object.keys(iconButtonIcons),
      mapping: iconButtonIcons,
      ...getComponentContentTable(icon),
    },
  },
  args: {
    ...omit(
      altCoreSimpleButtonStoryMeta.args,
      ['text', 'showDefaultSlot', 'isLongText', 'alignment'],
    ),
    ...createCoreIconButtonExternalProps(),
    icon: iconButtonIcons.search,
  },
} satisfies TIconButtonStoryMeta

export default meta

type Story = StoryObj<TIconButtonStoryArgs>


export const Playground: Story = { parameters: ICON_BUTTON_STORIES_CONFIG.Playground.parameters }

export const Variants: Story = {
  parameters: ICON_BUTTON_STORIES_CONFIG.Variants.parameters,
  render: () => html`
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
      <alt-core-icon-button variant="primary" .icon=${iconButtonIcons.search}></alt-core-icon-button>

      <alt-core-icon-button variant="outline" .icon=${iconButtonIcons.search}></alt-core-icon-button>

      <alt-core-icon-button variant="outline-filled" .icon=${iconButtonIcons.search}></alt-core-icon-button>

      <alt-core-icon-button variant="text" .icon=${iconButtonIcons.search}></alt-core-icon-button>
    </div>
  `,
}

export const Sizes: Story = {
  parameters: ICON_BUTTON_STORIES_CONFIG.Sizes.parameters,
  render: () => {
    const sizeRows = iconButtonSizes.map((size) => html`
    <div style="display: flex; gap: 8px; align-items: center;">
      <div style="width: 80px; font-weight: 500;">${size}:</div>
      <alt-core-icon-button size=${size} .icon=${iconButtonIcons.search}></alt-core-icon-button>
    </div>
  `)

    return html` <div style="display: grid; gap: 16px;">${sizeRows}</div> `
  },
}

export const States: Story = {
  parameters: ICON_BUTTON_STORIES_CONFIG.States.parameters,
  render: () => html`
  <div style="display: flex; gap: 16px; flex-wrap: wrap;">
    <alt-core-icon-button .icon=${iconButtonIcons.search}></alt-core-icon-button>
    <alt-core-icon-button .disabled=${true} .icon=${iconButtonIcons.search}></alt-core-icon-button>
    <alt-core-icon-button .loading=${true} .icon=${iconButtonIcons.search}></alt-core-icon-button>
  </div>
`,
}

export const PseudoStates: Story = {
  parameters: ICON_BUTTON_STORIES_CONFIG.PseudoStates.parameters,
  render: () => html`
  <div style="display: flex; gap: 16px; flex-wrap: wrap;">
    <alt-core-icon-button .icon=${iconButtonIcons.search}></alt-core-icon-button>

    <alt-core-icon-button
      .icon=${iconButtonIcons.search}
      style="
      --alt-core-simple-button-variant-primary-background-color: var(--alt-core-simple-button-variant-primary-hover-background-color);
    "
    >
    </alt-core-icon-button>

    <alt-core-icon-button
      .icon=${iconButtonIcons.search}
      style="
      --alt-core-simple-button-variant-primary-background-color: var(--alt-core-simple-button-variant-primary-hover-background-color);
    "
    >
    </alt-core-icon-button>
  </div>
`,
}

export const FullWidth: Story = {
  parameters: ICON_BUTTON_STORIES_CONFIG.FullWidth.parameters,
  args: ICON_BUTTON_STORIES_CONFIG.FullWidth.args,
}

export const LinkMode: Story = {
  parameters: ICON_BUTTON_STORIES_CONFIG.LinkMode.parameters,
  render: () => html`
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
      <alt-core-icon-button
        href="https://example.com"
        target="_blank"
        .icon=${iconButtonIcons.search}
      ></alt-core-icon-button>

      <alt-core-icon-button
        href="/internal-page"
        .icon=${iconButtonIcons.rocket}
      ></alt-core-icon-button>
    </div>
  `,
}

export const ComplexDemo: Story = {
  parameters: ICON_BUTTON_STORIES_CONFIG.ComplexDemo.parameters,
  render: () => {
    const variantRows = Object.values(EAltCoreSimpleButtonVariant).map((variant) => html`
    <div style="display: flex; gap: 8px; align-items: center;">
      <div style="width: 80px; font-weight: 500;">${variant}:</div>
      <alt-core-icon-button .variant=${variant} size="small" .icon=${iconButtonIcons.search}></alt-core-icon-button>
      <alt-core-icon-button .variant=${variant} size="medium" .icon=${iconButtonIcons.rocket}></alt-core-icon-button>
      <alt-core-icon-button .variant=${variant} size="large" .icon=${iconButtonIcons.magic}></alt-core-icon-button>
      <alt-core-icon-button .variant=${variant} size="medium" .disabled=${true} .icon=${iconButtonIcons.info}></alt-core-icon-button>
      <alt-core-icon-button .variant=${variant} size="medium" .loading=${true} .icon=${iconButtonIcons.copy}></alt-core-icon-button>
    </div>
  `)

    return html` <div style="display: grid; gap: 16px;">${variantRows}</div> `
  },
}
