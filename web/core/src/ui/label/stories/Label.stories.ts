import { html } from 'lit/static-html.js'
import type { Meta, StoryObj } from '@storybook/web-components'

import {
  createCoreLabelExternalProps,
  createCoreLabelInternalProps,
  EYCoreLabelAlignment,
  type IYCoreLabelInternalProps,
  type IYCoreLabelExternalProps,
} from '~core/ui/label/models/types'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { YCoreLabelTagName as tagName } from '~shared/constants'
import { EYCoreTextSize, EYCoreTextVariant } from '~core/ui/text/models/types/external'
import type { ITextStoryProps } from '~shared/.storybook/argTypes'
import {
  disabled as disabledArgType,
  required as requiredArgType,
  isLongText as isLongTextArgType,
} from '~shared/.storybook/argTypes'
import {
  getComponentContentTable,
  getComponentStateTable,
  getComponentSlotsTable,
} from '~shared/.storybook/tables'
import yCoreDropdownStoryMeta from '~core/ui/dropdown/stories/Dropdown.stories'

import '~core/ui/label'

export interface IYCoreLabelStoryProps extends ITextStoryProps {}

export interface IYCoreLabelStorySlots {
  tooltipContentSlot: string
}

type IYCoreLabelStoryMeta = IYCoreLabelExternalProps &
  IYCoreLabelInternalProps &
  IYCoreLabelStoryProps &
  IYCoreLabelStorySlots

const { debounce, alignment, wrap, required, text, tooltipText, tooltipActive, size, variant, tooltipPlacement } = {
  ...createCoreLabelExternalProps(),
  ...createCoreLabelInternalProps(),
}

/**
 * ## Label
 * Базовый label для полей ввода
 */
const meta: Meta<IYCoreLabelStoryMeta> = {
  title: '⚙️️ Label',
  id: 'label',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    disabled,
    required,
    text,
    tooltipText,
    isLongText,
    wrap,
    alignment,
    tooltipActive,
    size,
    variant,
    tooltipPlacement,
    tooltipContentSlot,
  }) => html`
    <y-core-label
      .text=${isLongText ? LOREM_IPSUM : text}
      .tooltipText=${isLongText ? LOREM_IPSUM : tooltipText}
      .alignment=${alignment}
      .tooltipActive=${tooltipActive}
      .size=${size}
      .variant=${variant}
      .wrap=${wrap}
      .disabled=${disabled}
      .required=${required}
      .tooltipPlacement=${tooltipPlacement}
    >
      <span slot="tooltip-content">${tooltipContentSlot}</span> 
    </y-core-label>
  `,
  argTypes: {
    disabled: disabledArgType,
    required: requiredArgType,
    debounce: {
      type: 'number',
      description: 'Задержка перед появлением / исчезновением троеточия в label, при нехватке места. Необходимо для минимального количества вычислений / перерисовок“)',
      ...getComponentContentTable(debounce),
    },
    text: {
      type: 'string',
      description: 'Текст лейбла',
      ...getComponentContentTable(text),
    },
    tooltipText: {
      type: 'string',
      description: 'Текст подсказки',
      ...getComponentContentTable(tooltipText),
    },
    wrap: {
      type: 'boolean',
      description: 'Перенос текста лейбла',
      ...getComponentContentTable(wrap),
    },
    alignment: {
      control: 'select',
      description: 'Выравнивание контента',
      options: Object.values(EYCoreLabelAlignment),
      ...getComponentContentTable(alignment),
    },
    tooltipActive: {
      type: 'boolean',
      description: 'Состояние активности тултипа',
      ...getComponentStateTable(tooltipActive),
    },
    size: {
      control: 'select',
      description: 'Размер лейбла',
      options: Object.values([
        EYCoreTextSize.A2_REGULAR,
        EYCoreTextSize.P2_REGULAR,
      ]),
      ...getComponentContentTable(size),
    },
    variant: {
      control: 'select',
      description: 'Вариант лейбла',
      options: Object.values([
        EYCoreTextVariant.PRIMARY,
        EYCoreTextVariant.SECONDARY,
      ]),
      ...getComponentContentTable(variant),
    },
    tooltipContentSlot: {
      type: 'string',
      description:
        '**Наполнение слота "tooltip-content"**.\n\nСлот отображается при отсутствии текста в tooltipText',
      ...getComponentSlotsTable('tooltip-content', 'nothing'),
    },

    // Story Controls
    isLongText: isLongTextArgType,
    tooltipPlacement: yCoreDropdownStoryMeta.argTypes?.placement,
  },
  args: {
    ...createCoreLabelExternalProps(),
    text: 'Label',
    tooltipText: 'Tooltip',
    isLongText: false,
    debounce,
    alignment,
    wrap,
    required,
    size,
    variant,
    tooltipActive,
    tooltipPlacement,
    tooltipContentSlot: 'Контент в слоте tooltip-content',
  },
} satisfies Meta<IYCoreLabelStoryMeta>

export default meta
type Story = StoryObj<IYCoreLabelStoryMeta>

export const Playground: Story = { args: { tooltipActive: true } }
