import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import type { Meta, StoryObj } from '@storybook/web-components'

import '~core/ui/avatar'

import {
  type IYCoreAvatarExternalProps,
  createCoreAvatarProps,
} from '../models/types'
import {
  YCoreAvatarTagName as tagName,
} from '~shared/constants'
import { EYSizes } from '~shared/types/global'
import { getComponentContentTable } from '~shared/.storybook/tables'
import { ySearch, yRocket } from '~shared/icons'

const { size, initials, photo, icon, disabled } = createCoreAvatarProps()

const iconOptions = {
  search: ySearch,
  rocket: yRocket,
}

/**
 * ## Аватар
 * Ссылка на [Figma](https://www.figma.com/design/0eI55yqAEchWUmRQCIQVYu/YC-Web-%7C-Components-(IN-PROGRESS)?node-id=2152-8128&t=UHE9iX3bdxjp7Vvd-0)
 *
 * Компонент для отображения аватара пользователя.
 *
 * ### Варианты использования
 * - Отображение фотографии пользователя
 * - Отображение инициалов при отсутствии фото
 * - Разные размеры для разных контекстов
 *
 * ### Примечание
 * Для тестирования компонента можно использовать сервис https://i.pravatar.cc
 * Поддерживает различные разрешения, например:
 * - https://i.pravatar.cc/150
 * - https://i.pravatar.cc/300
 * - https://i.pravatar.cc/500
 */
const meta: Meta<IYCoreAvatarExternalProps> = {
  title: 'Avatar',
  id: 'avatar',
  component: tagName,
  tags: ['core', 'autodocs'],
  render: ({
    size,
    initials,
    photo,
    icon,
    disabled,
  }) => {
    return html`
      <y-core-avatar
        size=${ifDefined(size)} 
        initials=${ifDefined(initials)}
        photo=${ifDefined(photo)}
        .icon=${icon}
        .disabled=${disabled}
      ></y-core-avatar>
    `
  },
  argTypes: {
    size: {
      control: 'select',
      options: [EYSizes.LARGE, EYSizes.MEDIUM, EYSizes.SMALL, EYSizes.EXTRA_SMALL],
      description: 'Размер аватара',
      ...getComponentContentTable(size),
    },
    initials: {
      control: 'text',
      description: 'Инициалы пользователя',
      ...getComponentContentTable(initials),
    },
    photo: {
      control: 'text',
      description: 'URL фотографии',
      ...getComponentContentTable(photo),
    },
    icon: {
      control: { type: 'select' },
      description: 'Управляет отображаемой в кнопке иконкой',
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      ...getComponentContentTable(icon),
    },
    disabled: {
      control: 'boolean',
      description: 'Управляет состоянием "disabled" аватара',
      ...getComponentContentTable(disabled),
    },
  },
  args: {
    size: EYSizes.MEDIUM,
    initials: 'Altegio Clients',
    disabled: false,
  },
} satisfies Meta<IYCoreAvatarExternalProps>

export default meta
type Story = StoryObj<IYCoreAvatarExternalProps>

// Базовый пример
export const Playground: Story = { args: { photo: '' } }

// Все размеры
export const AllSizes: Story = {
  render: ({ disabled }) => html`
    <div style="display: flex; align-items: center; gap: 10px;">
      <y-core-avatar size="extra-small" initials="Altegio Clients" .disabled=${disabled}></y-core-avatar>
      
      <y-core-avatar size="small" initials="Altegio Clients" .disabled=${disabled}></y-core-avatar>
      
      <y-core-avatar size="medium" initials="Altegio Clients" .disabled=${disabled}></y-core-avatar>
      
      <y-core-avatar size="large" initials="Altegio Clients" .disabled=${disabled}></y-core-avatar>
    </div>
  `,
}

// С фотографией
export const WithPhotoAllSizes: Story = {
  render: ({ disabled }) => html`
    <div style="display: flex; align-items: center; gap: 10px;">
      <y-core-avatar size="extra-small" photo="https://i.pravatar.cc/300" .disabled=${disabled}></y-core-avatar>
      
      <y-core-avatar size="small" photo="https://i.pravatar.cc/300" .disabled=${disabled}></y-core-avatar>
      
      <y-core-avatar size="medium" photo="https://i.pravatar.cc/300" .disabled=${disabled}></y-core-avatar>
      
      <y-core-avatar size="large" photo="https://i.pravatar.cc/300" .disabled=${disabled}></y-core-avatar>
    </div>
  `,
}

// С ошибкой загрузки фото
export const WithPhotoErrorAllSizes: Story = {
  render: ({ disabled }) => html`
    <div style="display: flex; align-items: center; gap: 10px;">
      <y-core-avatar size="extra-small" photo="invalid-url" initials="Altegio Clients" .disabled=${disabled}></y-core-avatar>
      
      <y-core-avatar size="small" photo="invalid-url" initials="Altegio Clients" .disabled=${disabled}></y-core-avatar>
      
      <y-core-avatar size="medium" photo="invalid-url" initials="Altegio Clients" .disabled=${disabled}></y-core-avatar>
      
      <y-core-avatar size="large" photo="invalid-url" initials="Altegio Clients" .disabled=${disabled}></y-core-avatar>
    </div>
  `,
}

// С иконкой
export const WithIconAllSizes: Story = {
  render: ({ disabled }) => html`
    <div style="display: flex; align-items: center; gap: 10px;">
      <y-core-avatar size="extra-small" .icon=${ySearch} .disabled=${disabled}></y-core-avatar>

      <y-core-avatar size="small" .icon=${ySearch} .disabled=${disabled}></y-core-avatar>

      <y-core-avatar size="medium" .icon=${ySearch} .disabled=${disabled}></y-core-avatar>

      <y-core-avatar size="large" .icon=${ySearch} .disabled=${disabled}></y-core-avatar>
    </div>
  `,
}
