import type { Meta, StoryObj } from '@storybook/angular'
import { action } from '@storybook/addon-actions'
import { useArgs } from '@storybook/preview-api'

import { YModal } from '~ng/ui/modal'
import { YButton } from '~ng/ui/button'
import yCoreModalStoryMeta from '~core/ui/modal/stories/Modal.stories'

/**
 * Angular wrapper for Core Modal
 */
const meta: Meta<YModal> = {
  title: 'Modals/🔍 Modal',
  id: 'modal',
  parameters: { controls: { sort: 'alpha' } },
  component: YModal,
  tags: ['angular', 'autodocs'],
  render: (args) => {
    const [, updateArgs] = useArgs()

    const handleOpen = (e: Event) => {
      if (!args.open) {
        updateArgs({ ...args, open: true })
      }

      action('open')(e)
    }

    const handleClose = (e: Event) => {
      if (args.open) {
        updateArgs({ ...args, open: false })
      }

      action('close')(e)
    }

    const handleClickCloseIcon = (e: Event) => {
      action('onClickCloseIcon')(e)
    }

    const handleClickOverlay = (e: Event) => {
      action('onClickOverlay')(e)
    }

    const handleClickActivator = (e: Event) => {
      action('onClickActivator')(e)
    }

    const handlePressEscape = (e: Event) => {
      action('onPressEscape')(e)
    }

    return {
      moduleMetadata: { imports: [YButton] },
      props: {
        ...args,
        handleOpen,
        handleClose,
        handleClickCloseIcon,
        handleClickOverlay,
        handleClickActivator,
        handlePressEscape,
      },
      template: `
      <div style="min-height: 450px;">
        <YModal
          [open]="open"
          [size]="size"
          [variant]="variant"
          [width]="width"
          [hideOverlay]="hideOverlay"
          [preventEscape]="preventEscape"
          [fullScreen]="fullScreen"
          (open)="handleOpen($event)"
          (close)="handleClose($event)"
          (click-close-icon)="handleClickCloseIcon($event)"
          (click-overlay)="handleClickOverlay($event)"
          (click-activator)="handleClickActivator($event)"
          (press-escape)="handlePressEscape($event)"
        >
          @if (showContentSlot) {
            <div content>
              <h3>Modal heading</h3>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </p>
            </div>
          }

          @if (showActivatorSlot) {
            <div activator>
              <YButton label="Open modal" />
            </div>
          }

          @if (showCloseSlot) {
            <div close>
              <div>Close slot</div>
            </div>
          }
        </YModal>
      </div>
      `,
    }
  },
  argTypes: { ...yCoreModalStoryMeta.argTypes },
  args: { ...yCoreModalStoryMeta.args },
} satisfies Meta<YModal>

export default meta
type Story = StoryObj<YModal>

export const Playground: Story = { args: {} }
