import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import type { Meta, StoryObj } from '@storybook/web-components'

import '~core/ui/text'

import {
  type IYCoreTextProps,
  createCoreTextProps,
  EYCoreTextSize,
  EYCoreTextVariant,
} from '~core/ui/text/models/types'

import { YCoreTextTagName as tagName } from '~shared/constants'

import {
  isLongText as isLongTextArgType,
  type ITextStoryProps,
} from '~shared/.storybook/argTypes'
import { getComponentStateTable, storyControlsTable } from '~shared/.storybook/tables'
import { LOREM_IPSUM } from '~shared/.storybook/constants'

const { size, variant, ellipsis, lineclamp, locator } = createCoreTextProps()

export interface IYCoreTextStoryProps extends ITextStoryProps {
  text: string
}

type TYCoreTextMeta = IYCoreTextProps & IYCoreTextStoryProps

/**
 * ## Core Text
 * Text component for input fields
 */
const meta: Meta<TYCoreTextMeta> = {
  title: '✅ Text',
  id: 'text',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    text,
    size,
    variant,
    ellipsis,
    lineclamp,
    isLongText,
  }) => {
    return html`
      <div style="width: 250px;">
        <y-core-text
          data-testid=${tagName}
          size=${ifDefined(size)}
          variant=${ifDefined(variant)}
          .ellipsis=${ellipsis}
          .lineclamp=${lineclamp}
        >
          ${isLongText ? LOREM_IPSUM : text}
        </y-core-text>
      </div>
    `
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      description: 'Text size',
      options: Object.values(EYCoreTextSize),
      ...getComponentStateTable(size),
    },
    variant: {
      control: { type: 'select' },
      description: 'Text style',
      options: Object.values(EYCoreTextVariant),
      ...getComponentStateTable(variant),
    },
    ellipsis: {
      type: 'boolean',
      description: 'Truncate text',
      ...getComponentStateTable(ellipsis),
    },
    lineclamp: {
      type: 'number',
      description: 'Maximum number of lines when truncating text',
      ...getComponentStateTable(lineclamp),
    },
    locator: {
      type: 'string',
      description: 'Data attribute for browser-based tests',
      ...getComponentStateTable(locator),
    },

    // Story Controls
    text: {
      type: 'string',
      description: 'Text displayed through the component slot',
      ...storyControlsTable,
    },
    isLongText: isLongTextArgType,
  },
  args: {
    ...createCoreTextProps(),
    text: 'Text',
    isLongText: false,
  },
} satisfies Meta<TYCoreTextMeta>

export default meta
type Story = StoryObj<TYCoreTextMeta>

export const Playground: Story = {}
