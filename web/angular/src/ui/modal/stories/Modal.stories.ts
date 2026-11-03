import type { Meta, StoryObj } from '@storybook/angular'
import { action } from 'storybook/actions'
import { useArgs } from 'storybook/preview-api'

import { AltModal } from '~ng/ui/modal'
import { AltButton } from '~ng/ui/button'
import altCoreModalStoryMeta from '~core/ui/modal/stories/Modal.stories'

/**
 * Angular wrapper for Core Modal
 */
const meta: Meta<AltModal> = {
  title: 'Modals/🔍 Modal',
  id: 'modal',
  parameters: { controls: { sort: 'alpha' } },
  component: AltModal,
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
      moduleMetadata: { imports: [AltButton] },
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
        <AltModal
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
              <AltButton label="Open modal" />
            </div>
          }

          @if (showCloseSlot) {
            <div close>
              <div>Close slot</div>
            </div>
          }
        </AltModal>
      </div>
      `,
    }
  },
  argTypes: { ...altCoreModalStoryMeta.argTypes },
  args: { ...altCoreModalStoryMeta.args },
} satisfies Meta<AltModal>

export default meta
type Story = StoryObj<AltModal>

export const Playground: Story = { args: {} }
