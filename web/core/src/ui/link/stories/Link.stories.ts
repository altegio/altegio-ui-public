import { html, nothing } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import type { Meta, StoryObj } from '@storybook/web-components'

import '~core/ui/link'

import { AltCoreLinkTagName as tagName } from '~shared/constants'

import { createCoreLinkProps, type IAltCoreLinkProps } from '~core/ui/link/models/types'

import {
  target as targetArgType,
  href as hrefArgType,
  isLongText as isLongTextArgType,
} from '~shared/.storybook/argTypes'
import { getComponentStateTable, storyControlsTable } from '~shared/.storybook/tables'
import type { ITextStoryProps } from '~shared/.storybook/argTypes'
import { LOREM_IPSUM } from '~shared/.storybook/constants'

import { altSearch } from '~shared/icons/build/alt-search.icon'

const {
  href,
  target,
  textWrap,
} = createCoreLinkProps()

export interface IAltCoreLinkStoryProps extends ITextStoryProps {
  text: string
  showIcon: boolean
}

type IAltCoreLinkMeta = IAltCoreLinkProps & IAltCoreLinkStoryProps

/**
 * ## Link
 * Text link component
 */
const meta: Meta<IAltCoreLinkMeta> = {
  title: '⚙️ Link',
  id: 'link',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    href,
    target,
    text,
    textWrap,
    isLongText,
    showIcon,
  }) => html`
    <alt-core-link
      href=${ifDefined(href)}
      target=${ifDefined(target)}
      .textWrap=${textWrap}
    >
      ${showIcon
        ? html`
            <alt-core-icon
              .icon=${altSearch}
              size="16px"
            ></alt-core-icon>
          `
        : nothing
      }
      ${isLongText ? LOREM_IPSUM : text}
    </alt-core-link>
  `,
  argTypes: {
    target: {
      ...targetArgType,
      ...getComponentStateTable(target),
    },
    href: {
      ...hrefArgType,
      ...getComponentStateTable(href),
    },
    text: {
      type: 'string',
      description: 'Text displayed through the component slot',
      ...getComponentStateTable(target),
    },
    textWrap: {
      type: 'boolean',
      description: 'Wrap link text at word boundaries',
      ...getComponentStateTable(textWrap),
    },
    isLongText: isLongTextArgType,
    showIcon: {
      type: 'boolean',
      description: 'Show the link with an icon',
      ...storyControlsTable,
    },
  },
  args: {
    text: 'Link',
    href: '#',
    showIcon: false,
  },
}

export default meta
type Story = StoryObj<IAltCoreLinkMeta>

export const Playground: Story = { args: {} }
