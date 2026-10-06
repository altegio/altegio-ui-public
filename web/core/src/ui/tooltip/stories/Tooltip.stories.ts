import type { Meta, StoryObj } from '@storybook/web-components'
import { html, nothing } from 'lit'

import '~core/ui/tooltip'
import '~core/ui/link'

import {
  createCoreTooltipProps,
  type IYCoreTooltipProps,
} from '../models/types'
import { YCoreTooltipTagName as tagName } from '~shared/constants'
import { getComponentContentTable, getComponentStateTable, storyControlsTable } from '~shared/.storybook/tables'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { isLongText as isLongTextArgType } from '~shared/.storybook/argTypes'
import type { ITextStoryProps } from '~shared/.storybook/argTypes'
import { EYCoreDropdownPlacement } from '~core/ui/dropdown/models/types'

type TTooltipStory = Required<NonNullable<IYCoreTooltipProps>>
type TTooltipStoryMeta = IYCoreTooltipProps & IYCoreLabelStoryProps & { isSlotExists: boolean }

export interface IYCoreLabelStoryProps extends ITextStoryProps {}

const { text } = { ...createCoreTooltipProps() }

/**
 * Тултип с текстом и ссылкой
 * [Old Ui Figma](https://www.figma.com/design/0eI55yqAEchWUmRQCIQVYu/YC-Web-%7C-Components-(IN-PROGRESS)?node-id=1844-17952&t=NW9k1HqNTmxWjtIW-4)
 * Базовый пример использования компонента
 */

const meta: Meta<TTooltipStoryMeta> = {
  title: '⚠️ Tooltip',
  id: 'tooltip',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    text,
    disabled,
    placement,
    isLongText,
    isSlotExists,
  }) => {
    const contentSlotText = () => {
      return isLongText ? LOREM_IPSUM : text
    }

    const contentSlotTemplate = () => {
      return isSlotExists
          ? html`
            <div slot="content">Контент со
              <y-core-link href="https://www.google.com" target="_blank">ссылкой</y-core-link>

              <div>${contentSlotText()}</div>
            </div>`
          : nothing
    }

    return html`
      <div style="padding:50px calc(50% - 60px); width: fit-content;">
        <y-core-tooltip
          .text=${isLongText ? LOREM_IPSUM : text}
          .disabled=${disabled ?? false}
          .placement=${placement}
        >
          <div slot="activator">Активатор</div>
          ${contentSlotTemplate()}
        </y-core-tooltip>
      </div>
    `
  },
  argTypes: {
    text: {
      type: 'string',
      description: 'Текст тултипа',
      ...getComponentContentTable(text),
    },

    disabled: {
      type: 'boolean',
      control: 'boolean',
      description: 'Управление активностью компонента',
      ...getComponentStateTable(text),
    },

    placement: {
      control: 'select',
      options: Object.values(EYCoreDropdownPlacement),
      description: 'Расположение выпадающей области',
    },

    // Story Controls
    isSlotExists: {
      type: 'boolean',
      description: 'Использовать слот?',
      control: 'boolean',
      ...storyControlsTable,
    },

    isLongText: isLongTextArgType,
  },
  args: {
    ...createCoreTooltipProps(),
    text: 'Базовый текст для тултипа',
    isLongText: false,
    isSlotExists: true,
  },
} satisfies Meta<TTooltipStoryMeta>

export default meta
type Story = StoryObj<TTooltipStory>

export const Playground: Story = { args: {} }
