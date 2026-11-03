import type { Meta, StoryObj } from '@storybook/vue3'
import { action } from 'storybook/actions'
import { useArgs } from 'storybook/preview-api'
import { omit } from 'radash'
import { computed } from 'vue'

import { AltModal } from '~vue/ui/modal'
import { AltGlobalProvider } from '~vue/ui/globalProvider'
import { type IAltVueModalProps } from '~vue/ui/modal/models/types'
import { getComponentContentTable, getComponentStateTable } from '~shared/.storybook/tables'
import { AltButton } from '~vue/ui/button'
import altCoreModalStoryMeta from '~core/ui/modal/stories/Modal.stories'

type TVueModalStoryMeta = IAltVueModalProps

/**
 * Vue wrapper for Modal
 */
const meta: Meta<TVueModalStoryMeta> = {
  title: '⚙️ Modal',
  id: 'modal',
  parameters: { controls: { sort: 'alpha' } },
  tags: ['vue', 'autodocs'],
  render: (args) => {
    const [updatedArgs, updateArgs] = useArgs<TVueModalStoryMeta>()

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

    const setModelValue = (modelValue: boolean) => {
      updateArgs({ ...updatedArgs, modelValue })
      action('update:modelValue')(modelValue)
    }

    return {
      components: { AltModal, AltButton, AltGlobalProvider },
      setup() {
        const vModelValue = computed({
          get: () => !!args.modelValue,
          set: setModelValue,
        })

        return {
          args,
          vModelValue,
          handleOpen,
          handleClose,
          handleClickCloseIcon,
          handleClickOverlay,
          handleClickActivator,
          handlePressEscape,
        }
      },
      template: `
      <AltGlobalProvider></AltGlobalProvider>
      
      <div style="min-height: 450px;">
        <AltModal
          v-bind="args"
          v-model="vModelValue"
          :size="args.size"
          :variant="args.variant"
          :width="args.width"
          :hide-overlay="args.hideOverlay"
          :prevent-escape="args.preventEscape"
          :full-screen="args.fullScreen"
          @open="handleOpen"
          @close="handleClose"
          @click-close-icon="handleClickCloseIcon"
          @click-overlay="handleClickOverlay"
          @click-activator="handleClickActivator"
          @press-escape="handlePressEscape"
        >
          <template v-if="args.showContentSlot" #content>
            <h3>Modal heading</h3>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          </template>

          <template v-if="args.showActivatorSlot" #activator>
            <AltButton
              label="Open modal"
            />
          </template>

          <template v-if="args.showCloseSlot" #close>
            <div>Close slot</div>
          </template>
        </AltModal>
      </div>
    `,
    }
  },
  argTypes: {
    ...omit(altCoreModalStoryMeta.argTypes ?? {}, ['open']),
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
    ...omit(altCoreModalStoryMeta.args ?? {}, ['open']),
    modelValue: false,
    enableTeleport: false,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
