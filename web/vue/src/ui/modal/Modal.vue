<template>
  <div
    v-if="$slots['activator']"
    @click="handleActivatorClick"
  >
    <slot name="activator" />
  </div>

  <teleport
    :disabled="!enableTeleport"
    :to="YCoreGlobalProviderTagName"
  >
    <y-core-modal
      v-bind="props"
      :open="modelValue"
      @open="handleOpen"
      @close="handleClose"
      @click-close-icon="emit('click-close-icon')"
      @click-overlay="emit('click-overlay')"
      @click-activator="emit('click-activator')"
      @press-escape="emit('press-escape')"
    >
      <div
        v-if="$slots['close']"
        slot="close"
      >
        <slot name="close" />
      </div>

      <div
        v-if="$slots['content']"
        slot="content"
      >
        <slot name="content" />
      </div>
    </y-core-modal>
  </teleport>
</template>

<script setup lang="ts">
  import '~core/ui/modal'
  import {
    createVueModalProps,
    type IYVueModalProps,
    type IYVueModalEmits,
    type IYVueCoreModalProps,
  } from '~vue/ui/modal/models/types'

  import {
    YCoreGlobalProviderTagName,
  } from '~shared/constants'

  defineOptions({ name: 'YModal' })

  const emit = defineEmits<IYVueModalEmits>()

  defineSlots<{
    activator: () => unknown
    close: () => unknown
    content: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IYVueModalProps>(),
    createVueModalProps(),
  ) satisfies IYVueCoreModalProps

  const handleOpen = () => {
    emit('update:modelValue', true)
    emit('open')
  }

  const handleClose = () => {
    emit('update:modelValue', false)
    emit('close')
  }

  const handleActivatorClick = () => {
    if (props.modelValue) {
      return
    }

    emit('click-activator')
    handleOpen()
  }
</script>
