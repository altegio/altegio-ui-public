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
 * Пропы для истории компонента SimpleButton
 */
export interface ISimpleButtonStoryProps extends IYCoreSimpleButtonProps, ITextStoryProps {

  /** Текст, отображаемый в кнопке */
  text: string
}

/**
 * События компонента SimpleButton
 */
export interface ISimpleButtonStoryEmits {

  /** Событие клика по кнопке. Срабатывает при нажатии на кнопку, если она не заблокирована */
  onClick: () => void
}

/**
 * Слоты компонента SimpleButton
 */
export interface ISimpleButtonStorySlots {

  /**
   * Показать содержимое default слота.
   * Default слот предназначен для размещения любого контента внутри кнопки:
   * текста, иконок, их комбинаций и других элементов.
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
        '**Вариант стилизации кнопки**\n\n- `primary` - основная кнопка с акцентным цветом\n- `outline` - кнопка с прозрачным фоном и обводкой\n- `outline-filled` - кнопка с белым фоном и обводкой\n- `text` - текстовая кнопка без фона и обводки',
      options: Object.values(EYCoreSimpleButtonVariant),
      ...getComponentStateTable(variant),
    },
    size: {
      ...sizeArgType(sizes),
      description:
        '**Размер кнопки**\n\n- `small` - компактная кнопка для плотных интерфейсов\n- `medium` - стандартный размер для большинства случаев\n- `large` - крупная кнопка для важных действий',
      table: {
        type: { summary: 'small | medium | large' },
        defaultValue: { summary: EYSizes.SMALL },
        category: 'Размеры',
      },
      ...getComponentStateTable(size),
    },
    disabled: {
      ...disabledArgType,
      description:
        '**Заблокированное состояние**\n\nКогда `true`, кнопка становится неактивной и не реагирует на взаимодействие. Визуально отображается с пониженной контрастностью.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Состояние',
      },
      ...getComponentStateTable(disabled),
    },
    loading: {
      ...loadingArgType,
      description:
        '**Состояние загрузки**\n\nКогда `true`, отображается индикатор загрузки и кнопка становится неактивной. Используется для асинхронных операций.',
      ...getComponentStateTable(loading),
    },
    alignment: {
      control: { type: 'select' },
      description:
        '**Вариант выравнивания контента кнопки**\n\n- `start` - по левому краю\n- `center` - по центру\n- `end` - по правому краю.',
      options: Object.values(EYCoreSimpleButtonContentAlignment),
      ...getComponentStateTable(alignment),
    },
    fullWidth: {
      type: 'boolean',
      description: '**Растянуть на всю ширину**\n\nКогда `true`, кнопка занимает всю доступную ширину родительского контейнера.',
      ...getComponentStateTable(fullWidth),
    },
    // Пропы для режима ссылки
    href: {
      ...hrefArgType,
      description:
        '**URL ссылки**\n\nКогда указан, кнопка рендерится как элемент `<a>` вместо `<button>`. Поддерживаются все стандартные URL форматы.',
      ...getComponentStateTable(href),
    },
    target: {
      ...targetArgType,
      description:
        '**Цель открытия ссылки**\n\nРаботает только когда указан `href`. Стандартные значения:\n- `_self` - в том же окне\n- `_blank` - в новом окне\n- `_parent` - в родительском фрейме\n- `_top` - в верхнем фрейме',
      ...getComponentStateTable(target),
    },
    loaderVariant: {
      description: '**Вариант индикатора загрузки**\n\n- `black` - черный\n- `white` - белый\n- `yellow` - желтый',
      control: { type: 'select' },
      options: Object.values(EYCoreLoaderVariant),
      ...getComponentStateTable(loaderVariant),
    },
    hostStyles: {
      type: 'string',
      description:
        '**Пользовательские CSS стили**\n\nСтрока с CSS стилями, которые будут применены к корневому элементу кнопки. Позволяет тонко настроить внешний вид.',
      ...getComponentStateTable(hostStyles),
    },

    // События
    onClick: {
      type: 'function',
      description:
        '**Событие клика**\n\nСрабатывает при клике на кнопку. Не срабатывает, если кнопка заблокирована (`disabled`) или в состоянии загрузки (`loading`).',
      ...getComponentEmitsTable(),
    },

    // Слоты (Story Controls)
    showDefaultSlot: {
      type: 'boolean',
      description:
        '** Показать контент в default слоте**\n\nDefault слот для размещения любого содержимого кнопки. Может содержать текст, иконки и другие элементы.',
      ...getComponentSlotsTable('default', 'nothing'),
    },

    // Дополнительные Story Controls
    text: {
      type: 'string',
      description: '** Текст кнопки**\n\nТекст, который будет отображаться в компоненте через default слот.',
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
    <y-core-simple-button> Обычная </y-core-simple-button>
    <y-core-simple-button .disabled=${true}> Заблокированная </y-core-simple-button>
    <y-core-simple-button .loading=${true}> Загрузка </y-core-simple-button>
  </div>
`,
}

export const PseudoStates: Story = {
  parameters: SIMPLE_BUTTON_STORIES_CONFIG.PseudoStates.parameters,
  render: () => html`
  <div style="display: flex; gap: 16px; flex-wrap: wrap;">
    <y-core-simple-button> Обычная </y-core-simple-button>

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
        Внешняя ссылка
      </y-core-simple-button>

      <y-core-simple-button href="/internal-page"> Внутренняя ссылка </y-core-simple-button>
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
