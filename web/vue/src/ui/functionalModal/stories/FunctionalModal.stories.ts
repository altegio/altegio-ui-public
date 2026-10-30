import type { Meta, StoryObj } from '@storybook/vue3'
import { action } from 'storybook/actions'
import { useArgs } from 'storybook/preview-api'
import { computed } from 'vue'
import { omit } from 'radash'

import { AltFunctionalModal } from '~vue/ui/functionalModal'
import { AltGlobalProvider } from '~vue/ui/globalProvider'
import { type IAltVueFunctionalModalProps } from '~vue/ui/functionalModal/models/types'
import { getComponentContentTable, getComponentStateTable } from '~shared/.storybook/tables'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { AltButton } from '~vue/ui/button'
import { AltText } from '~vue/ui/text'
import altFunctionalModalStoryMeta from '~core/ui/functionalModal/stories/FunctionalModal.stories'

type TVueFunctionalModalStoryMeta = IAltVueFunctionalModalProps

/**
 * Vue wrapper for FunctionalModal
 */
const meta: Meta<TVueFunctionalModalStoryMeta> = {
  title: '✅ FunctionalModal',
  id: 'functionalModal',
  parameters: { controls: { sort: 'alpha' } },
  tags: ['vue', 'autodocs'],
  render: (args) => {
    const [updatedArgs, updateArgs] = useArgs<TVueFunctionalModalStoryMeta>()

    const handleOpen = (e: Event) => {
      if (!updatedArgs.modelValue) {
        updateArgs({ ...updatedArgs, modelValue: true })
      }

      action('open')(e)
    }

    const handleClose = (e: Event) => {
      if (updatedArgs.modelValue) {
        updateArgs({ ...updatedArgs, modelValue: false })
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

    const setModelValue = (modelValue: boolean) => {
      updateArgs({ ...updatedArgs, modelValue })
      action('update:modelValue')(modelValue)
    }

    return {
      components: { AltFunctionalModal, AltButton, AltText, AltGlobalProvider },
      setup() {
        const vModelValue = computed({
          get: () => !!args.modelValue,
          set: setModelValue,
        })

        return {
          args,
          vModelValue,
          LOREM_IPSUM,
          handleOpen,
          handleClose,
          handleClickCloseIcon,
          handleClickOverlay,
          handleClickActivator,
          handlePressEscape,
          handleCancel,
          handleSubmit,
        }
      },
      template: `
      <AltGlobalProvider></AltGlobalProvider>

      <div style="min-height: 450px;">
        <AltFunctionalModal
          v-bind="args"
          v-model="vModelValue"
          :size="args.size"
          :variant="args.variant"
          :width="args.width"
          :hide-overlay="args.hideOverlay"
          :prevent-escape="args.preventEscape"
          :full-screen="args.fullScreen"
          :heading="args.heading"
          :sub-heading="args.subHeading"
          :locale="args.locale"
          :enable-teleport="args.enableTeleport"
          @open="handleOpen"
          @close="handleClose"
          @click-close-icon="handleClickCloseIcon"
          @click-overlay="handleClickOverlay"
          @click-activator="handleClickActivator"
          @press-escape="handlePressEscape"
          @cancel="handleCancel"
          @submit="handleSubmit"
        >
          <template v-if="args.showHeaderSlot" #header>
            Header slot content
          </template>

          <template v-if="args.showContentSlot" #content>
            <AltText size="p2-regular">
              {{ args.contentText }}
            </AltText>
          </template>

          <template v-if="args.showActivatorSlot" #activator>
            <AltButton
              label="Open modal"
            />
          </template>

          <template v-if="args.showActionsSlot" #actions>
            <span>Actions slot content</span>
          </template>

          <template v-if="args.showBeforeActionsSlot" #before-actions>
            Before-actions slot content
          </template>

          <template v-if="args.showFooterSlot" #footer>
            Footer slot content
          </template>
        </AltFunctionalModal>
      </div>
    `,
    }
  },
  argTypes: {
    ...omit(altFunctionalModalStoryMeta.argTypes ?? {}, ['open']),
    modelValue: {
      type: 'boolean',
      description: 'v-model for the modal open property',
      ...getComponentContentTable(),
    },
    enableTeleport: {
      type: 'boolean',
      description: 'Moves the modal element into AltGlobalProvider',
      ...getComponentStateTable(),
    },
  },
  args: {
    ...omit(altFunctionalModalStoryMeta.args ?? {}, ['open']),
    modelValue: false,
    enableTeleport: false,
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
