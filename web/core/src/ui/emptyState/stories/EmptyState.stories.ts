import { html, nothing } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'
import { YCoreEmptyStateTagName as tagName } from '~shared/constants'

import '~core/ui/emptyState'
import '~core/ui/button'

import {
  createCoreEmptyStateExternalProps,
  type IYCoreEmptyStateExternalProps,
} from '~core/ui/emptyState/models/types/external'
import { getComponentContentTable, getComponentStateTable, storyControlsTable } from '~shared/.storybook/tables'
import { EYSizes } from '~shared/types/global'
import { size as sizeArgType } from '~shared/.storybook/argTypes'
import { yMagic, yRocket, ySearch } from '~shared/icons'

export interface IYCoreEmptyStateStoryProps extends IYCoreEmptyStateExternalProps {
  isActionsSlotExists: boolean
}

type TYCoreEmptyStateStoryMeta = IYCoreEmptyStateStoryProps

const { title, description, icon, size } = createCoreEmptyStateExternalProps()

const iconOptions = {
  search: ySearch,
  rocket: yRocket,
  magic: yMagic,
}

/**
 * ## Core Empty State
 * Предоставляет информацию пользователю, что произошло и как действовать в случаях, когда контент страницы или блока отсутствует или недоступен.
 *
 * Ссылка на [Figma](https://www.figma.com/design/0eI55yqAEchWUmRQCIQVYu/YC-Web-|-Components--IN-PROGRESS-?node-id=3732-7852&p=f&m=dev)
 */
const meta: Meta<TYCoreEmptyStateStoryMeta> = {
  title: '✅ Empty State',
  id: 'state',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    title,
    description,
    isActionsSlotExists,
    icon,
    size,
  }) => {
    const renderActionsSlot = () => {
      return html`
        <div slot="actions">
          <y-core-button
            label="Основная кнопка"
            variant="primary"
          ></y-core-button>

          <y-core-button
            label="Второстепенная кнопка"
            variant="outline"
          ></y-core-button>
        </div>
      `
    }

    return html`
      <div style="display: flex; justify-content: center;">
        <y-core-empty-state
          .title=${title}
          .description=${description}
          .icon=${icon}
          .size=${size}
          style="max-width: 400px;"
        >
          ${isActionsSlotExists ? renderActionsSlot() : nothing}
        </y-core-empty-state>
      </div>
    `
  },
  argTypes: {
    title: {
      type: 'string',
      ...getComponentContentTable(title),
    },
    description: {
      type: 'string',
      ...getComponentContentTable(description),
    },
    size: {
      ...sizeArgType([
        EYSizes.SMALL,
        EYSizes.MEDIUM,
      ]),
      ...getComponentStateTable(size),
    },
    icon: {
      control: { type: 'select' },
      description: 'Управляет отображаемой иконкой',
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      ...getComponentContentTable(icon?.name),
    },
    isActionsSlotExists: {
      control: { type: 'boolean' },
      description: 'Отрисовать слот с кнопками?',
      ...storyControlsTable,
    },
  },
  args: {
    title: 'По вашему запросу ничего не найдено',
    description: 'Попробуйте ввести другое название или создать новый тип абонемента',
    isActionsSlotExists: false,
    icon,
    size,
  },
} satisfies Meta<TYCoreEmptyStateStoryMeta>

export default meta
type Story = StoryObj<TYCoreEmptyStateStoryMeta>

export const Playground: Story = {}
