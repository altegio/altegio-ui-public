import type { Meta, StoryObj } from '@storybook/vue3'
import { action } from '@storybook/addon-actions'
import { useArgs } from '@storybook/preview-api'
import { omit } from 'radash'
import { computed } from 'vue'

import { YModal } from '~vue/ui/modal'
import { YGlobalProvider } from '~vue/ui/globalProvider'
import { type IYVueModalProps } from '~vue/ui/modal/models/types'
import { getComponentContentTable, getComponentStateTable } from '~shared/.storybook/tables'
import { YButton } from '~vue/ui/button'
import yCoreModalStoryMeta from '~core/ui/modal/stories/Modal.stories'

type TVueModalStoryMeta = IYVueModalProps

/**
 * Vue-обертка над Modal
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
      components: { YModal, YButton, YGlobalProvider },
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
      <YGlobalProvider></YGlobalProvider>
      
      <div style="min-height: 450px;">
        <YModal
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
            <h3>Заголовок модалки</h3>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          </template>

          <template v-if="args.showActivatorSlot" #activator>
            <YButton
              label="Открыть модалку"
            />
          </template>

          <template v-if="args.showCloseSlot" #close>
            <div>Слот закрытия</div>
          </template>
        </YModal>
      </div>
    `,
    }
  },
  argTypes: {
    ...omit(yCoreModalStoryMeta.argTypes ?? {}, ['open']),
    modelValue: {
      type: 'boolean',
      description: 'v-model обертка над свойством open открытия модалки',
      ...getComponentContentTable(),
    },
    enableTeleport: {
      type: 'boolean',
      description: 'переносит элемент модалки в YGlobalProvider',
      ...getComponentStateTable(),
    },
  },
  args: {
    ...omit(yCoreModalStoryMeta.args ?? {}, ['open']),
    modelValue: false,
    enableTeleport: false,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
