<template>
  <div
    v-if="$slots['activator']"
    @click="handleActivatorClick"
  >
    <slot name="activator" />
  </div>

  <teleport
    :disabled="!enableTeleport"
    :to="AltCoreGlobalProviderTagName"
  >
    <alt-core-functional-modal
      v-bind="props"
      ref="functionalModalRef"
      :class="$attrs.class"
      :open="modelValue"
      @open="handleOpen"
      @close="handleClose"
      @click-close-icon="emit('click-close-icon')"
      @click-overlay="emit('click-overlay')"
      @press-escape="emit('press-escape')"
      @cancel="handleCancel"
      @submit="emit('submit')"
    >
      <div
        v-if="$slots['header-media']"
        slot="header-media"
      >
        <slot name="header-media" />
      </div>

      <div
        v-if="$slots['header']"
        slot="header"
      >
        <slot name="header" />
      </div>

      <div
        v-if="$slots['content']"
        slot="content"
      >
        <slot name="content" />
      </div>

      <div
        v-if="$slots['actions']"
        slot="actions"
      >
        <slot name="actions" />
      </div>

      <div
        v-if="$slots['before-actions']"
        slot="before-actions"
      >
        <slot name="before-actions" />
      </div>

      <div
        v-if="$slots['footer']"
        slot="footer"
      >
        <slot name="footer" />
      </div>
    </alt-core-functional-modal>
  </teleport>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import '~core/ui/functionalModal'
  import { type AltCoreFunctionalModal } from '~core/ui/functionalModal'
  import {
    createVueFunctionalModalProps,
    type IAltVueFunctionalModalProps,
    type IAltVueFunctionalModalEmits,
    type IAltVueCoreFunctionalModalProps,
  } from '~vue/ui/functionalModal/models/types'

  import {
    AltCoreGlobalProviderTagName,
  } from '~shared/constants'

  defineOptions({ name: 'AltFunctionalModal' })

  const emit = defineEmits<IAltVueFunctionalModalEmits>()

  defineSlots<{
    header: () => unknown
    content: () => unknown
    activator: () => unknown
    actions: () => unknown
    ['before-actions']: () => unknown
    ['header-media']: () => unknown
    footer: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IAltVueFunctionalModalProps>(),
    createVueFunctionalModalProps(),
  ) satisfies IAltVueCoreFunctionalModalProps

  const functionalModalRef = ref<AltCoreFunctionalModal>()

  const handleOpen = () => {
    emit('update:modelValue', true)
    emit('open')
  }

  const handleClose = () => {
    emit('update:modelValue', false)
    emit('close')
  }

  const handleCancel = () => {
    emit('cancel')
    handleClose()
  }

  const handleActivatorClick = () => {
    if (props.modelValue) {
      return
    }

    emit('click-activator')
    handleOpen()
  }

  const scrollToTop = () => {
    functionalModalRef.value?.scrollToTop()
  }

  defineExpose({ scrollToTop })
</script>
