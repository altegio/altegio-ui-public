import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'

import '~core/ui/tag'

import { ifDefined } from 'lit/directives/if-defined.js'
import { YCoreTagTagName } from '~shared/constants'
import { yRocket, yLoader } from '~shared/icons'
import '../Tag.core'
import { getComponentContentTable, getComponentStateTable, storyControlsTable } from '~shared/.storybook/tables'
import type { ITextStoryProps } from '~shared/.storybook/argTypes'
import {
  disabled as disabledArgType,
  isLongText as isLongTextArgType,
} from '~shared/.storybook/argTypes'
import type { IYCoreTagProps } from '../models/types'
import { createCoreTagProps, EYCoreTagVariant } from '../models/types'
import { EYSizes } from '~shared/types/global'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import type { TYCoreTagEvents } from '../models/types/events'

const { size, variant, disabled, iconLeft, locator, locatorLabel, locatorIcon } = createCoreTagProps()

const iconOptions = {
  rocket: yRocket,
  loader: yLoader,
}

export type TYCoreTagMeta = IYCoreTagProps & ITextStoryProps & TYCoreTagEvents & {
  text?: string
}

type Story = StoryObj<TYCoreTagMeta>

const meta: Meta<TYCoreTagMeta> = {
  title: '✅ Tag',
  id: 'tag',
  component: YCoreTagTagName,
  tags: ['autodocs'],
  argTypes: {
    locator: {
      type: 'string',
      description: 'Локатор',
      ...getComponentStateTable(locator),
    },
    size: {
      control: 'select',
      options: [
        EYSizes.SMALL,
        EYSizes.MEDIUM,
        EYSizes.LARGE,
      ],
      description: 'Размер тега',
      ...getComponentStateTable(size),

    },
    variant: {
      control: 'select',
      options: Object.values(EYCoreTagVariant),
      description: 'Вариант тега',
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
      description: 'Иконка перед контентом тега',
      ...getComponentContentTable(iconLeft),

    },
    locatorLabel: {
      control: 'text',
      description: 'Дата-локатор для лейбла',
      ...getComponentContentTable(locatorLabel),
    },
    locatorIcon: {
      control: 'text',
      description: 'Дата-локатор для иконки',
      ...getComponentContentTable(locatorIcon),
    },
    text: {
      control: 'text',
      description: 'Слот с текстом тега',
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

// Базовый пример
export const Basic: Story = {

  render: (args) => {
    const computedText = args.isLongText ? LOREM_IPSUM : args.text

    return html`
      <y-core-tag
        size=${ifDefined(args.size)}
        variant=${ifDefined(args.variant)}
        .disabled=${args.disabled}
        .iconLeft=${args.iconLeft}
        locator-label=${ifDefined(args.locatorLabel)}
        locator-icon=${ifDefined(args.locatorIcon)}
      >
        ${computedText}
      </y-core-tag>
    `
  },
}

// Все варианты
export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <y-core-tag variant="accent">Accent</y-core-tag>
      
      <y-core-tag variant="muted">Muted</y-core-tag>
      
      <y-core-tag variant="danger">Danger</y-core-tag>
      
      <y-core-tag variant="success">Success</y-core-tag>
      
      <y-core-tag variant="warning">Warning</y-core-tag>
      
      <y-core-tag variant="information">Information</y-core-tag>
      
      <y-core-tag variant="discovery">Discovery</y-core-tag>
    </div>
  `,
}

// Размеры
export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; align-items: center;">
      <y-core-tag size="small">Small</y-core-tag>

      <y-core-tag size="medium">Medium</y-core-tag>

      <y-core-tag size="large">Large</y-core-tag>
    </div>
  `,
}

// С иконкой
export const WithIcon: Story = {
  args: { iconLeft: yRocket },
  render: (args) => html`
    <y-core-tag .iconLeft=${args.iconLeft}>
      С иконкой
    </y-core-tag>
  `,
}

// Отключенное состояние
export const Disabled: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <h3>Базовое disabled состояние:</h3>
        
        <y-core-tag disabled>Недоступно</y-core-tag>
      </div>

      <div>
        <h3>Disabled состояния для всех вариантов:</h3>
        
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <y-core-tag variant="accent" disabled>Accent</y-core-tag>
          
          <y-core-tag variant="muted" disabled>Muted</y-core-tag>
          
          <y-core-tag variant="danger" disabled>Danger</y-core-tag>
          
          <y-core-tag variant="success" disabled>Success</y-core-tag>
          
          <y-core-tag variant="warning" disabled>Warning</y-core-tag>
          
          <y-core-tag variant="information" disabled>Information</y-core-tag>
          
          <y-core-tag variant="discovery" disabled>Discovery</y-core-tag>
        </div>
      </div>

      <div>
        <h3>Disabled с иконкой:</h3>
        <y-core-tag .iconLeft=${yRocket} disabled>С иконкой слева</y-core-tag>
        </div>

      <div>
        <h3>Disabled для разных размеров:</h3>

        <div style="display: flex; gap: 8px; align-items: center;">
          <y-core-tag size="small" disabled>Small</y-core-tag>

          <y-core-tag size="medium" disabled>Medium</y-core-tag>

          <y-core-tag size="large" disabled>Large</y-core-tag>
        </div>
      </div>
    </div>
  `,
}

// Примеры использования
export const Examples: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <h3>Статусы:</h3>
        
        <div style="display: flex; gap: 8px;">
          <y-core-tag variant="success">Доступно</y-core-tag>
          
          <y-core-tag variant="danger">Отменено</y-core-tag>
          
          <y-core-tag variant="warning">Отсутствует</y-core-tag>
        </div>
      </div>

      <div>
        <h3>Информационные:</h3>
        
        <div style="display: flex; gap: 8px;">
          <y-core-tag variant="information">Новый</y-core-tag>
          
          <y-core-tag variant="discovery">Обновлено</y-core-tag>
          
          <y-core-tag variant="accent">Что нового</y-core-tag>
        </div>
      </div>

      <div>
        <h3>В контексте:</h3>
        
        <div style="display: flex; flex-direction: column; gap: 8px; padding: 16px; background: #f5f5f5; border-radius: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span>Ноготочки</span>
            
            <y-core-tag variant="warning" size="small">Нет мест</y-core-tag>
          </div>
          
          <div style="display: flex; gap: 8px; align-items: center;">
            <y-core-tag variant="muted" size="small">1 ч 30 мин</y-core-tag>
            
            <y-core-tag variant="muted" size="small">Кабинет 45</y-core-tag>
          </div>
        </div>
      </div>
    </div>
  `,
}

