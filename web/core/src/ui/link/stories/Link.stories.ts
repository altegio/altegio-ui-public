import { html, nothing } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import type { Meta, StoryObj } from '@storybook/web-components'

import '~core/ui/link'

import { YCoreLinkTagName as tagName } from '~shared/constants'

import { createCoreLinkProps, type IYCoreLinkProps } from '~core/ui/link/models/types'

import {
  target as targetArgType,
  href as hrefArgType,
  isLongText as isLongTextArgType,
} from '~shared/.storybook/argTypes'
import { getComponentStateTable, storyControlsTable } from '~shared/.storybook/tables'
import type { ITextStoryProps } from '~shared/.storybook/argTypes'
import { LOREM_IPSUM } from '~shared/.storybook/constants'

import { ySearch } from '~shared/icons/build/y-search.icon'

const {
  href,
  target,
  textWrap,
} = createCoreLinkProps()

export interface IYCoreLinkStoryProps extends ITextStoryProps {
  text: string
  showIcon: boolean
}

type IYCoreLinkMeta = IYCoreLinkProps & IYCoreLinkStoryProps

/**
 * ## Link
 * Базовый link для текста
 */
const meta: Meta<IYCoreLinkMeta> = {
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
    <y-core-link
      href=${ifDefined(href)}
      target=${ifDefined(target)}
      .textWrap=${textWrap}
    >
      ${showIcon
        ? html`
            <y-core-icon
              .icon=${ySearch}
              size="16px"
            ></y-core-icon>
          `
        : nothing
      }
      ${isLongText ? LOREM_IPSUM : text}
    </y-core-link>
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
      description: 'Текст который будет отображаться в компоненте через слот',
      ...getComponentStateTable(target),
    },
    textWrap: {
      type: 'boolean',
      description: 'Текст ссылки будет переноситься по словам',
      ...getComponentStateTable(textWrap),
    },
    isLongText: isLongTextArgType,
    showIcon: {
      type: 'boolean',
      description: 'Для просмотра варианта ссылки с иконкой',
      ...storyControlsTable,
    },
  },
  args: {
    text: 'Ссылка',
    href: '#',
    showIcon: false,
  },
}

export default meta
type Story = StoryObj<IYCoreLinkMeta>

export const Playground: Story = { args: {} }
