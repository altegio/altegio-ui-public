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
 * Базовый text для полей ввода
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
      description: 'Размер текста',
      options: Object.values(EYCoreTextSize),
      ...getComponentStateTable(size),
    },
    variant: {
      control: { type: 'select' },
      description: 'Стиль текста',
      options: Object.values(EYCoreTextVariant),
      ...getComponentStateTable(variant),
    },
    ellipsis: {
      type: 'boolean',
      description: 'Ограничение длины текста',
      ...getComponentStateTable(ellipsis),
    },
    lineclamp: {
      type: 'number',
      description: 'Количество строк при ограничении длины текста',
      ...getComponentStateTable(lineclamp),
    },
    locator: {
      type: 'string',
      description: 'Вспомогательный дата-атрибут для реализации BB-тестов',
      ...getComponentStateTable(locator),
    },

    // Story Controls
    text: {
      type: 'string',
      description: 'Текст который будет отображаться в компоненте через слот',
      ...storyControlsTable,
    },
    isLongText: isLongTextArgType,
  },
  args: {
    ...createCoreTextProps(),
    text: 'Текст',
    isLongText: false,
  },
} satisfies Meta<TYCoreTextMeta>

export default meta
type Story = StoryObj<TYCoreTextMeta>

export const Playground: Story = {}
