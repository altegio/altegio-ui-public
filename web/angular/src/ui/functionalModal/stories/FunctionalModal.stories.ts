import type { Meta, StoryObj } from '@storybook/angular'
import { action } from 'storybook/actions'
import { useArgs } from 'storybook/preview-api'

import { AltFunctionalModal } from '~ng/ui/functionalModal'

import { AltButton } from '~ng/ui/button'
import { AltText } from '~ng/ui/text'
import altCoreFunctionalModalStoryMeta from '~core/ui/functionalModal/stories/FunctionalModal.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants/text'

/**
 * Angular wrapper for Core FunctionalModal
 */
const meta: Meta<AltFunctionalModal> = {
  title: 'Modals/⚠️ FunctionalModal',
  id: 'functionalModal',
  parameters: { controls: { sort: 'alpha' } },
  component: AltFunctionalModal,
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
      moduleMetadata: { imports: [AltButton, AltText] },
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
        <AltFunctionalModal
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
              <AltText size="p2-regular">
                {{ contentText }}
              </AltText>
            </span>
          }

          @if (showActivatorSlot) {
            <div activator>
              <AltButton label="Open modal" />
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
        </AltFunctionalModal>
      </div>
      `,
    }
  },
  argTypes: { ...altCoreFunctionalModalStoryMeta.argTypes },
  args: { ...altCoreFunctionalModalStoryMeta.args },
} satisfies Meta<AltFunctionalModal>

export default meta
type Story = StoryObj<AltFunctionalModal>

export const Playground: Story = { args: {} }
