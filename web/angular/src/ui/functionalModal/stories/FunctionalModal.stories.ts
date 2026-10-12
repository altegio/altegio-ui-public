import type { Meta, StoryObj } from '@storybook/angular'
import { action } from '@storybook/addon-actions'
import { useArgs } from '@storybook/preview-api'

import { YFunctionalModal } from '~ng/ui/functionalModal'

import { YButton } from '~ng/ui/button'
import { YText } from '~ng/ui/text'
import yCoreFunctionalModalStoryMeta from '~core/ui/functionalModal/stories/FunctionalModal.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants/text'

/**
 * Angular wrapper for Core FunctionalModal
 */
const meta: Meta<YFunctionalModal> = {
  title: 'Modals/⚠️ FunctionalModal',
  id: 'functionalModal',
  parameters: { controls: { sort: 'alpha' } },
  component: YFunctionalModal,
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

    const handleCancel = (e: Event) => {
      action('cancel')(e)
    }

    const handleSubmit = (e: Event) => {
      action('submit')(e)
    }

    return {
      moduleMetadata: { imports: [YButton, YText] },
      props: {
        ...args,
        LOREM_IPSUM,
        handleOpen,
        handleClose,
        handleClickCloseIcon,
        handleClickOverlay,
        handleClickActivator,
        handlePressEscape,
        handleCancel,
        handleSubmit,
      },
      template: `
      <div style="min-height: 450px;">
        <YFunctionalModal
          [open]="open"
          [size]="size"
          [width]="width"
          [hideOverlay]="hideOverlay"
          [preventEscape]="preventEscape"
          [fullScreen]="fullScreen"
          [heading]="heading"
          [subHeading]="subHeading"
          [locale]="locale"
          (open)="handleOpen($event)"
          (close)="handleClose($event)"
          (click-close-icon)="handleClickCloseIcon($event)"
          (click-overlay)="handleClickOverlay($event)"
          (click-activator)="handleClickActivator($event)"
          (press-escape)="handlePressEscape($event)"
          (cancel)="handleCancel($event)"
          (submit)="handleSubmit($event)"
        >
          @if (showHeaderMediaSlot) {
            <img style="width: 100%" src="https://cs13.pikabu.ru/post_img/big/2020/01/17/5/1579242654187294635.jpg" />
          }

          @if (showHeaderSlot) {
            <span header>Header slot content</span>
          }

          @if (showContentSlot) {
            <span content>
              <YText size="p2-regular">
                {{ contentText }}
              </YText>
            </span>
          }

          @if (showActivatorSlot) {
            <div activator>
              <YButton label="Open modal" />
            </div>
          }

          @if (showActionsSlot) {
            <span actions>
              Actions slot content
            </span>
          }

          @if (showBeforeActionsSlot) {
            <span before-actions>
              Before-actions slot content
            </span>
          }

          @if (showFooterSlot) {
            <span footer>
              Footer slot content
            </span>
          }
        </YFunctionalModal>
      </div>
      `,
    }
  },
  argTypes: { ...yCoreFunctionalModalStoryMeta.argTypes },
  args: { ...yCoreFunctionalModalStoryMeta.args },
} satisfies Meta<YFunctionalModal>

export default meta
type Story = StoryObj<YFunctionalModal>

export const Playground: Story = { args: {} }
