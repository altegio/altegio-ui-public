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

  /** Text displayed in the content area */
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

          ${showHeaderSlot ? html` <span slot="header"> Header slot content </span> ` : nothing}

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
                  label="Open modal"
                  slot="activator"
                >
                </y-core-button>
              `
            : nothing}
          ${showActionsSlot ? html` <span slot="actions"> Actions slot content </span> ` : nothing}
          ${showBeforeActionsSlot ? html` <span slot="before-actions"> Before-actions slot content </span> ` : nothing}
          ${showFooterSlot ? html` <span slot="footer"> Footer slot content </span> ` : nothing}
        </y-core-functional-modal>
      </div>
    `
  },
  argTypes: {
    open: {
      type: 'boolean',
      description: 'Open state',
      ...getComponentStateTable(open),
    },
    size: {
      ...sizeArgType([EYSizes.SMALL, EYSizes.LARGE]),
      ...getComponentStateTable(size),
    },
    width: {
      type: 'string',
      description: 'Custom modal width',
      ...getComponentStateTable(width),
    },
    hideOverlay: {
      type: 'boolean',
      description: 'Hide the backdrop',
      ...getComponentStateTable(hideOverlay),
    },
    hideFooter: {
      type: 'boolean',
      description: 'Hide the footer',
      ...getComponentStateTable(hideFooter),
    },
    preventEscape: {
      type: 'boolean',
      description: 'Prevent the Escape key from closing the modal',
      ...getComponentStateTable(preventEscape),
    },
    fullScreen: {
      type: 'boolean',
      description: 'Full screen',
      ...getComponentStateTable(fullScreen),
    },
    heading: {
      type: 'string',
      description: 'Modal heading',
      ...getComponentStateTable(heading),
    },
    subHeading: {
      type: 'string',
      description: 'Modal subheading',
      ...getComponentStateTable(subHeading),
    },
    locale: {
      control: { type: 'select' },
      options: Object.keys(locales),
      mapping: locales,
      description: 'Calendar locale',
      ...getComponentStateTable(locale),
    },
    onOpen: {
      type: 'function',
      description: 'Modal open event',
      ...getComponentEmitsTable(),
    },
    onClose: {
      type: 'function',
      description: 'Modal close event',
      ...getComponentEmitsTable(),
    },
    onClickCloseIcon: {
      type: 'function',
      description: 'Close icon click event',
      ...getComponentEmitsTable(),
    },
    onClickOverlay: {
      type: 'function',
      description: 'Backdrop click event',
      ...getComponentEmitsTable(),
    },
    onClickActivator: {
      type: 'function',
      description: 'Activator click event',
      ...getComponentEmitsTable(),
    },
    onPressEscape: {
      type: 'function',
      description: 'Escape key press event',
      ...getComponentEmitsTable(),
    },
    onCancel: {
      type: 'function',
      description: 'Cancel button click event',
      ...getComponentEmitsTable(),
    },
    onSubmit: {
      type: 'function',
      description: 'Confirm button click event',
      ...getComponentEmitsTable(),
    },
    showHeaderMediaSlot: {
      type: 'boolean',
      description: 'Show the "header-media" slot - media inside the modal',
      ...storyControlsTable,
    },
    showHeaderSlot: {
      type: 'boolean',
      description: 'Show the "header" slot - heading inside the modal',
      ...storyControlsTable,
    },
    showContentSlot: {
      type: 'boolean',
      description: 'Show the "content" slot - content inside the modal',
      ...storyControlsTable,
    },
    showActivatorSlot: {
      type: 'boolean',
      description: 'Show the "activator" slot - activator that opens the modal',
      ...storyControlsTable,
    },
    showActionsSlot: {
      type: 'boolean',
      description: 'Show the "actions" slot - modal actions',
      ...storyControlsTable,
    },
    showBeforeActionsSlot: {
      type: 'boolean',
      description: 'Show the "before-actions" slot - modal actions',
      ...storyControlsTable,
    },
    showFooterSlot: {
      type: 'boolean',
      description: 'Show the "footer" slot - slot containing "before-actions" and "actions"',
      ...storyControlsTable,
    },
    contentText: {
      type: 'string',
      description: '**Content text**\n\nText displayed through the content slot.',
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
    heading: 'Leave this page?',
    subHeading: 'You have not finished the setup',
    contentText: LOREM_IPSUM,
    showHeaderMediaSlot: false,
    showHeaderSlot: false,
    showContentSlot: true,
    showActivatorSlot: true,
    showActionsSlot: false,
    showBeforeActionsSlot: false,
    showFooterSlot: false,
    locale: locales['en-US'],
  },
} satisfies TYCoreFunctionalModalStoryMeta

export default meta
type Story = StoryObj<TYCoreFunctionalModalStoryMeta>

export const Playground: Story = { args: {} }
