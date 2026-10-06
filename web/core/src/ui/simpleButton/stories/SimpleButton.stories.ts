import { html } from 'lit'
import { fn } from '@storybook/test'
import type { StoryObj } from '@storybook/web-components'
import { ifDefined } from 'lit/directives/if-defined.js'

import '~core/ui/simpleButton'
import '~core/ui/icon'

import { YCoreSimpleButtonTagName as tagName } from '~shared/constants'
import { EYSizes } from '~shared/types/global'
import {
  EYCoreSimpleButtonVariant,
  EYCoreSimpleButtonContentAlignment,
  createCoreSimpleButtonExternalProps,
  createCoreSimpleButtonInternalProps,
  type IYCoreSimpleButtonProps,
} from '~core/ui/simpleButton/models/types'

import type { TStoryMeta } from '~shared/.storybook/argTypes'
import {
  size as sizeArgType,
  disabled as disabledArgType,
  loading as loadingArgType,
  target as targetArgType,
  href as hrefArgType,
  isLongText as isLongTextArgType,
  type ITextStoryProps,
} from '~shared/.storybook/argTypes'
import {
  getComponentStateTable,
  getComponentEmitsTable,
  storyControlsTable,
  getComponentSlotsTable,
} from '~shared/.storybook/tables'

import { ySearch } from '~shared/icons/build/y-search.icon'
import { LOREM_IPSUM } from '~shared/.storybook/constants'

import { createSimpleButtonParameters, SIMPLE_BUTTON_STORIES_CONFIG } from './SimpleButton.stories.utils'
import { EFrameworkName } from '~web/shared/.storybook/enums/frameworkName'
import { action } from '@storybook/addon-actions'
import { EYCoreLoaderVariant } from '../../loader/models/types'

const sizes = [EYSizes.SMALL, EYSizes.MEDIUM, EYSizes.LARGE] as const

const { variant, hostStyles, disabled, loading, target, href, alignment, fullWidth, size, loaderVariant } = {
  ...createCoreSimpleButtonExternalProps(),
  ...createCoreSimpleButtonInternalProps(),
}

/**
 * SimpleButton story properties
 */
export interface ISimpleButtonStoryProps extends IYCoreSimpleButtonProps, ITextStoryProps {

  /** Text displayed in the button */
  text: string
}

/**
 * SimpleButton events
 */
export interface ISimpleButtonStoryEmits {

  /** Button click event. Emitted when the button is clicked unless it is disabled */
  onClick: () => void
}

/**
 * SimpleButton slots
 */
export interface ISimpleButtonStorySlots {

  /**
   * Show the default slot content.
   * The default slot accepts button content:
   * text, icons, combinations of these, and other elements.
   */
  showDefaultSlot: boolean
}

type TSimpleButtonStoryArgs = IYCoreSimpleButtonProps & ISimpleButtonStoryProps & ISimpleButtonStoryEmits & ISimpleButtonStorySlots
type TSimpleButtonStoryMeta = TStoryMeta<TSimpleButtonStoryArgs>

const parameters = createSimpleButtonParameters(EFrameworkName.LIT)

const meta: TSimpleButtonStoryMeta = {
  title: 'Buttons/⚙️ SimpleButton',
  id: 'simpleButton',
  parameters,
  component: tagName,
  tags: ['core', 'autodocs'],
  render: ({ href, target, variant, size, disabled, loading, alignment, fullWidth, loaderVariant, showDefaultSlot, text, isLongText }) => {
    const handlers = { onClick: () => { action('onClick')() } }

    return html`
    <y-core-simple-button
      href=${ifDefined(href)}
      target=${ifDefined(target)}
      variant=${ifDefined(variant)}
      size=${ifDefined(size)}
      alignment=${ifDefined(alignment)}
      .disabled=${disabled}
      .loading=${loading}
      .fullWidth=${fullWidth}
      host-styles=${ifDefined(hostStyles)}
      loader-variant=${ifDefined(loaderVariant)}
      @click=${handlers.onClick}
    >
      ${showDefaultSlot
        ? html`
            <y-core-icon .icon=${ySearch} size=${size === 'large' ? '24px' : '16px'}></y-core-icon>

            <span>${isLongText ? LOREM_IPSUM : text}</span>
          `
        : isLongText
          ? LOREM_IPSUM
          : text}
    </y-core-simple-button>
  `
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      description:
        '**Button style**\n\n- `primary`: accent-colored button\n- `outline`: transparent background with a border\n- `outline-filled`: white background with a border\n- `text`: no background or border',
      options: Object.values(EYCoreSimpleButtonVariant),
      ...getComponentStateTable(variant),
    },
    size: {
      ...sizeArgType(sizes),
      description:
        '**Button size**\n\n- `small`: compact button for dense interfaces\n- `medium`: standard size for most uses\n- `large`: larger button for prominent actions',
      table: {
        type: { summary: 'small | medium | large' },
        defaultValue: { summary: EYSizes.SMALL },
        category: 'Sizes',
      },
      ...getComponentStateTable(size),
    },
    disabled: {
      ...disabledArgType,
      description:
        '**Disabled state**\n\nWhen `true`, the button does not respond to interaction and appears with reduced contrast.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'State',
      },
      ...getComponentStateTable(disabled),
    },
    loading: {
      ...loadingArgType,
      description:
        '**Loading state**\n\nWhen `true`, a loading indicator appears and the button becomes inactive. Use during asynchronous operations.',
      ...getComponentStateTable(loading),
    },
    alignment: {
      control: { type: 'select' },
      description:
        '**Button content alignment**\n\n- `start`: left aligned\n- `center`: centered\n- `end`: right aligned',
      options: Object.values(EYCoreSimpleButtonContentAlignment),
      ...getComponentStateTable(alignment),
    },
    fullWidth: {
      type: 'boolean',
      description: '**Full width**\n\nWhen `true`, the button fills the available width of its parent container.',
      ...getComponentStateTable(fullWidth),
    },
    // Пропы для режима ссылки
    href: {
      ...hrefArgType,
      description:
        '**Link URL**\n\nWhen set, the button renders as an `<a>` rather than a `<button>`. Standard URL formats are supported.',
      ...getComponentStateTable(href),
    },
    target: {
      ...targetArgType,
      description:
        '**Link target**\n\nRequires `href`. Standard values:\n- `_self`: current browsing context\n- `_blank`: new browsing context\n- `_parent`: parent frame\n- `_top`: top-level frame',
      ...getComponentStateTable(target),
    },
    loaderVariant: {
      description: '**Loading indicator color**\n\n- `black`\n- `white`\n- `yellow`',
      control: { type: 'select' },
      options: Object.values(EYCoreLoaderVariant),
      ...getComponentStateTable(loaderVariant),
    },
    hostStyles: {
      type: 'string',
      description:
        '**Custom CSS styles**\n\nCSS declarations applied to the root button element to customize its appearance.',
      ...getComponentStateTable(hostStyles),
    },

    // События
    onClick: {
      type: 'function',
      description:
        '**Click event**\n\nEmitted when the button is clicked. Not emitted while `disabled` or `loading` is true.',
      ...getComponentEmitsTable(),
    },

    // Слоты (Story Controls)
    showDefaultSlot: {
      type: 'boolean',
      description:
        '**Show default slot content**\n\nThe default slot accepts text, icons, and other button content.',
      ...getComponentSlotsTable('default', 'nothing'),
    },

    // Дополнительные Story Controls
    text: {
      type: 'string',
      description: '**Button text**\n\nText displayed through the default slot.',
      ...storyControlsTable,
    },
    isLongText: isLongTextArgType,
  },
  args: {
    ...createCoreSimpleButtonExternalProps(),
    onClick: fn(),
    showDefaultSlot: true,
    text: 'Button',
    isLongText: false,
  },
} satisfies TSimpleButtonStoryMeta

export default meta

type Story = StoryObj<TSimpleButtonStoryArgs>

export const Playground: Story = { parameters: SIMPLE_BUTTON_STORIES_CONFIG.Playground.parameters }

export const Variants: Story = {
  parameters: SIMPLE_BUTTON_STORIES_CONFIG.Variants.parameters,
  render: () => html`
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
      <y-core-simple-button variant="primary"> Primary </y-core-simple-button>

      <y-core-simple-button variant="outline"> Outline </y-core-simple-button>

      <y-core-simple-button variant="outline-filled"> Outline-filled </y-core-simple-button>

      <y-core-simple-button variant="text"> Text </y-core-simple-button>
    </div>
  `,
}

export const Sizes: Story = {
  parameters: SIMPLE_BUTTON_STORIES_CONFIG.Sizes.parameters,
  render: () => {
    const sizeRows = sizes.map((size) => html`
    <div style="display: flex; gap: 8px; align-items: center;">
      <div style="width: 80px; font-weight: 500;">${size}:</div>
      <y-core-simple-button size=${size}>${size}</y-core-simple-button>    </div>
  `)

    return html` <div style="display: grid; gap: 16px;">${sizeRows}</div> `
  },
}

export const States: Story = {
  parameters: SIMPLE_BUTTON_STORIES_CONFIG.States.parameters,
  render: () => html`
  <div style="display: flex; gap: 16px; flex-wrap: wrap;">
    <y-core-simple-button> Default </y-core-simple-button>
    <y-core-simple-button .disabled=${true}> Disabled </y-core-simple-button>
    <y-core-simple-button .loading=${true}> Loading </y-core-simple-button>
  </div>
`,
}

export const PseudoStates: Story = {
  parameters: SIMPLE_BUTTON_STORIES_CONFIG.PseudoStates.parameters,
  render: () => html`
  <div style="display: flex; gap: 16px; flex-wrap: wrap;">
    <y-core-simple-button> Default </y-core-simple-button>

    <y-core-simple-button
      style="
      --y-core-simple-button-variant-primary-background-color: var(--y-core-simple-button-variant-primary-hover-background-color);
    "
    >
      Hover
    </y-core-simple-button>

    <y-core-simple-button
      style="
      --y-core-simple-button-variant-primary-background-color: var(--y-core-simple-button-variant-primary-hover-background-color);
    "
    >
      Active
    </y-core-simple-button>
  </div>
`,
}

export const FullWidth: Story = {
  parameters: SIMPLE_BUTTON_STORIES_CONFIG.FullWidth.parameters,
  args: SIMPLE_BUTTON_STORIES_CONFIG.FullWidth.args,
}

export const LinkMode: Story = {
  parameters: SIMPLE_BUTTON_STORIES_CONFIG.LinkMode.parameters,
  render: () => html`
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
      <y-core-simple-button href="https://example.com" target="_blank">
        <y-core-icon .icon=${ySearch} size="16px"></y-core-icon>
        External link
      </y-core-simple-button>

      <y-core-simple-button href="/internal-page"> Internal link </y-core-simple-button>
    </div>
  `,
}

export const ComplexDemo: Story = {
  parameters: SIMPLE_BUTTON_STORIES_CONFIG.ComplexDemo.parameters,
  render: () => {
    const variantRows = Object.values(EYCoreSimpleButtonVariant).map((variant) => html`
    <div style="display: flex; gap: 8px; align-items: center;">
      <div style="width: 80px; font-weight: 500;">${variant}:</div>
      <y-core-simple-button variant=${variant} size="small">Small</y-core-simple-button>
      <y-core-simple-button variant=${variant} size="medium">Medium</y-core-simple-button>
      <y-core-simple-button variant=${variant} size="large">Large</y-core-simple-button>
      <y-core-simple-button variant=${variant} size="medium" .disabled=${true}>Disabled</y-core-simple-button>
      <y-core-simple-button variant=${variant} size="medium" .loading=${true}>Loading</y-core-simple-button>
    </div>
  `)

    return html` <div style="display: grid; gap: 16px;">${variantRows}</div> `
  },
}
