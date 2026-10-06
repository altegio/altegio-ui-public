import { html, nothing } from 'lit'
import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/web-components'
import { useArgs } from '@storybook/preview-api'

import '~core/ui/functionalModal'
import '~core/ui/button'
import '~core/ui/text'

import {
  type IYCoreFunctionalModalProps,
  createCoreFunctionalModalProps,
  createCoreFunctionalModalExternalProps,
} from '~core/ui/functionalModal/models/types'
import type { TYCoreFunctionalModalEvents } from '~core/ui/functionalModal/models/types/events'

import { YCoreFunctionalModalTagName as tagName } from '~shared/constants'
import { getComponentEmitsTable, getComponentStateTable, storyControlsTable } from '~shared/.storybook/tables'
import { size as sizeArgType } from '~shared/.storybook/argTypes'
import { LOREM_IPSUM } from '~shared/.storybook/constants'

import { EYSizes } from '~shared/types/global'
import { locales } from '~core/i18n/locales'

const { open, size, width, hideOverlay, hideFooter, preventEscape, fullScreen, heading, subHeading, locale } = createCoreFunctionalModalProps()

export interface IYCoreFunctionalModalStoryProps extends IYCoreFunctionalModalProps {

  /** Текст, отображаемый в блоке content */
  contentText: string
}

export interface IYCoreFunctionalModalStorySlots {
  showHeaderSlot: boolean
  showContentSlot: boolean
  showActivatorSlot: boolean
  showActionsSlot: boolean
  showBeforeActionsSlot: boolean
  showFooterSlot: boolean
  showHeaderMediaSlot: boolean
}

type TYCoreFunctionalModalStoryMeta = Meta<
  IYCoreFunctionalModalProps & TYCoreFunctionalModalEvents & IYCoreFunctionalModalStoryProps & IYCoreFunctionalModalStorySlots
>

/**
 * ## Core Functional Modal
 *
 * Ссылка на [Figma](https://www.figma.com/design/0eI55yqAEchWUmRQCIQVYu/YC-Web-%7C-Components--IN-PROGRESS-?node-id=5662-17791&t=pmL5ndRgd30cWCR1-4)
 */
const meta: TYCoreFunctionalModalStoryMeta = {
  title: '✅ Functional Modal',
  id: 'functionalModal',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: ['core', 'autodocs'],
  render: ({
    size,
    width,
    hideOverlay,
    hideFooter,
    preventEscape,
    fullScreen,
    heading,
    subHeading,
    locale,
    contentText,
    showHeaderSlot,
    showContentSlot,
    showActivatorSlot,
    showActionsSlot,
    showBeforeActionsSlot,
    showFooterSlot,
    showHeaderMediaSlot,
    onClickOverlay,
    onClickCloseIcon,
    onClickActivator,
    onPressEscape,
    onCancel,
    onSubmit,
  }) => {
    const [args, updateArgs] = useArgs<IYCoreFunctionalModalProps>()

    const { open } = args
    const changeStoryOpenProp = (value: boolean) => {
      if (open === value) return

      updateArgs({ ...args, open: value })
    }

    const onOpen = () => {
      changeStoryOpenProp(true)
    }

    const onClose = () => {
      changeStoryOpenProp(false)
    }

    return html`
      <div style="min-height: 600px;">
        <y-core-functional-modal
          .open=${open}
          .size=${size}
          .width=${width}
          .hideOverlay=${hideOverlay}
          .hideFooter=${hideFooter}
          .preventEscape=${preventEscape}
          .fullScreen=${fullScreen}
          .heading=${heading}
          .subHeading=${subHeading}
          .locale=${locale}
          @open=${onOpen}
          @close=${onClose}
          @click-overlay=${onClickOverlay}
          @click-close-icon=${onClickCloseIcon}
          @click-activator=${onClickActivator}
          @press-escape=${onPressEscape}
          @cancel=${onCancel}
          @submit=${onSubmit}
        >
          ${showHeaderMediaSlot ? html` <img style="width: 100%" slot="header-media" src="https://cs13.pikabu.ru/post_img/big/2020/01/17/5/1579242654187294635.jpg" /> ` : nothing}

          ${showHeaderSlot ? html` <span slot="header"> Это слот header </span> ` : nothing}

          ${showContentSlot
            ? html` <y-core-text
                size="p2-regular"
                slot="content"
              >
                ${contentText + LOREM_IPSUM}
              </y-core-text>`
            : nothing}

          ${showActivatorSlot
            ? html`
                <y-core-button
                  label="Открыть модалку"
                  slot="activator"
                >
                </y-core-button>
              `
            : nothing}
          ${showActionsSlot ? html` <span slot="actions"> Это слот actions </span> ` : nothing}
          ${showBeforeActionsSlot ? html` <span slot="before-actions"> Это слот before-actions </span> ` : nothing}
          ${showFooterSlot ? html` <span slot="footer"> Это слот footer </span> ` : nothing}
        </y-core-functional-modal>
      </div>
    `
  },
  argTypes: {
    open: {
      type: 'boolean',
      description: 'Открытое состояние',
      ...getComponentStateTable(open),
    },
    size: {
      ...sizeArgType([EYSizes.SMALL, EYSizes.LARGE]),
      ...getComponentStateTable(size),
    },
    width: {
      type: 'string',
      description: 'Кастомная ширина модалки',
      ...getComponentStateTable(width),
    },
    hideOverlay: {
      type: 'boolean',
      description: 'Скрыть подложку',
      ...getComponentStateTable(hideOverlay),
    },
    hideFooter: {
      type: 'boolean',
      description: 'Скрыть футер',
      ...getComponentStateTable(hideFooter),
    },
    preventEscape: {
      type: 'boolean',
      description: 'Игнорировать закрытие модалки по клавише Escape',
      ...getComponentStateTable(preventEscape),
    },
    fullScreen: {
      type: 'boolean',
      description: 'На весь экран',
      ...getComponentStateTable(fullScreen),
    },
    heading: {
      type: 'string',
      description: 'Заголовок модалки',
      ...getComponentStateTable(heading),
    },
    subHeading: {
      type: 'string',
      description: 'Подзаголовок модалки',
      ...getComponentStateTable(subHeading),
    },
    locale: {
      control: { type: 'select' },
      options: Object.keys(locales),
      mapping: locales,
      description: 'Локализация календаря',
      ...getComponentStateTable(locale),
    },
    onOpen: {
      type: 'function',
      description: 'Событие открытия модалки',
      ...getComponentEmitsTable(),
    },
    onClose: {
      type: 'function',
      description: 'Событие закрытия модалки',
      ...getComponentEmitsTable(),
    },
    onClickCloseIcon: {
      type: 'function',
      description: 'Событие клика на иконку закрытия',
      ...getComponentEmitsTable(),
    },
    onClickOverlay: {
      type: 'function',
      description: 'Событие клика на подложку',
      ...getComponentEmitsTable(),
    },
    onClickActivator: {
      type: 'function',
      description: 'Событие клика на элемент-активатор',
      ...getComponentEmitsTable(),
    },
    onPressEscape: {
      type: 'function',
      description: 'Событие нажатия клавиши Escape',
      ...getComponentEmitsTable(),
    },
    onCancel: {
      type: 'function',
      description: 'Событие нажатия кнопки "Отменить"',
      ...getComponentEmitsTable(),
    },
    onSubmit: {
      type: 'function',
      description: 'Событие нажатия кнопки "Хорошо"',
      ...getComponentEmitsTable(),
    },
    showHeaderMediaSlot: {
      type: 'boolean',
      description: 'Показать слот "header-media" - слот для медиа внутри модалки',
      ...storyControlsTable,
    },
    showHeaderSlot: {
      type: 'boolean',
      description: 'Показать слот "header" - слот заголовка внутри модалки',
      ...storyControlsTable,
    },
    showContentSlot: {
      type: 'boolean',
      description: 'Показать слот "content" - слот контента внутри модалки',
      ...storyControlsTable,
    },
    showActivatorSlot: {
      type: 'boolean',
      description: 'Показать слот "activator" - слот активатора открытия модалки',
      ...storyControlsTable,
    },
    showActionsSlot: {
      type: 'boolean',
      description: 'Показать слот "actions" - слот действий модалки',
      ...storyControlsTable,
    },
    showBeforeActionsSlot: {
      type: 'boolean',
      description: 'Показать слот "before-actions" - слот действий модалки',
      ...storyControlsTable,
    },
    showFooterSlot: {
      type: 'boolean',
      description: 'Показать слот "footer" - слот включающий в себя "before-actions" и "actions"',
      ...storyControlsTable,
    },
    contentText: {
      type: 'string',
      description: '** Текст контент**\n\nТекст, который будет отображаться в компоненте через content слот.',
      ...storyControlsTable,
    },
  },
  args: {
    ...createCoreFunctionalModalExternalProps(),
    onOpen: action('open'),
    onClose: action('close'),
    onClickCloseIcon: action('click-close-icon'),
    onClickOverlay: action('click-overlay'),
    onClickActivator: action('click-activator'),
    onPressEscape: action('press-escape'),
    onCancel: action('cancel'),
    onSubmit: action('submit'),
    heading: 'Хотите покинуть страницу?',
    subHeading: 'Вы не завершили подключение',
    contentText: LOREM_IPSUM,
    showHeaderMediaSlot: false,
    showHeaderSlot: false,
    showContentSlot: true,
    showActivatorSlot: true,
    showActionsSlot: false,
    showBeforeActionsSlot: false,
    showFooterSlot: false,
    locale: locales['ru-RU'],
  },
} satisfies TYCoreFunctionalModalStoryMeta

export default meta
type Story = StoryObj<TYCoreFunctionalModalStoryMeta>

export const Playground: Story = { args: {} }
