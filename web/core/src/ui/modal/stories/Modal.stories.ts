import { html, nothing } from 'lit'
import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/web-components'
import { useArgs } from '@storybook/preview-api'

import '~core/ui/modal'
import '~core/ui/button'

import {
  type IYCoreModalProps,
  createCoreModalProps,
  createCoreModalExternalProps,
  EYCoreModalVariant,
} from '~core/ui/modal/models/types'
import type { TYCoreModalEvents } from '~core/ui/modal/models/types/events'

import { YCoreModalTagName as tagName } from '~shared/constants'
import { getComponentEmitsTable, getComponentStateTable, storyControlsTable } from '~shared/.storybook/tables'
import { size as sizeArgType } from '~shared/.storybook/argTypes'

import { EYSizes } from '~shared/types/global'

const { open, size, width, variant, hideOverlay, preventEscape, fullScreen } = createCoreModalProps()

export interface IYCoreModalStorySlots {
  showContentSlot: boolean
  showActivatorSlot: boolean
}

type TYCoreModalStoryMeta = Meta<
  IYCoreModalProps & TYCoreModalEvents & IYCoreModalStorySlots
>

/**
 * ## Core Modal
 *
 */
const meta: TYCoreModalStoryMeta = {
  title: '⚙️ Modal',
  id: 'modal',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: ['core', 'autodocs'],
  render: ({
    size,
    variant,
    width,
    hideOverlay,
    preventEscape,
    fullScreen,
    showContentSlot,
    showActivatorSlot,
    onClickOverlay,
    onClickCloseIcon,
    onClickActivator,
    onPressEscape,
  }) => {
    const [args, updateArgs] = useArgs<IYCoreModalProps>()

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
      <div style="min-height: 450px;">
        <y-core-modal
          .open=${open}
          .size=${size}
          .variant=${variant}
          .width=${width}
          .hideOverlay=${hideOverlay}
          .preventEscape=${preventEscape}
          .fullScreen=${fullScreen}
          @open=${onOpen}
          @close=${onClose}
          @click-overlay=${onClickOverlay}
          @click-close-icon=${onClickCloseIcon}
          @click-activator=${onClickActivator}
          @press-escape=${onPressEscape}
        >
          ${showContentSlot
            ? html`
                <div slot="content">
                  <h3>Modal heading</h3>

                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua.
                  </p>
                </div>
              `
            : nothing}

          ${showActivatorSlot
            ? html` <y-core-button
                label="Open modal"
                slot="activator"
              >
              </y-core-button>`
            : nothing}
        </y-core-modal>
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
    variant: {
      control: { type: 'select' },
      description: 'Modal style',
      options: Object.values(EYCoreModalVariant),
      ...getComponentStateTable(variant),
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
  },
  args: {
    ...createCoreModalExternalProps(),
    onOpen: action('open'),
    onClose: action('close'),
    onClickCloseIcon: action('click-close-icon'),
    onClickOverlay: action('click-overlay'),
    onClickActivator: action('click-activator'),
    onPressEscape: action('press-escape'),
    showContentSlot: true,
    showActivatorSlot: true,
  },
} satisfies TYCoreModalStoryMeta

export default meta
type Story = StoryObj<TYCoreModalStoryMeta>

export const Playground: Story = { args: {} }
