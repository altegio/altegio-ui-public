<template>
  <alt-core-banner
    v-bind="props"
    @close="handleClose"
  >
    <slot />

    <div
      v-if="$slots.actions"
      slot="actions"
      style="display: contents;"
    >
      <slot name="actions" />
    </div>
  </alt-core-banner>
</template>

<script lang="ts" setup>
  import '~core/ui/banner'
  import type { IAltCoreBannerProps } from '~core/ui/banner/models/types'
  import {
    createVueBannerProps,
    type IAltVueBannerEmits,
    type IAltVueBannerProps,
  } from '~vue/ui/banner/models/types'

  defineOptions({ name: 'AltBanner' })

  defineSlots<{
    default?: () => unknown
    actions?: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IAltVueBannerProps>(),
    createVueBannerProps(),
  ) satisfies Partial<IAltCoreBannerProps>

  const emit = defineEmits<IAltVueBannerEmits>()

  const handleClose = (event: Event) => {
    // The component event replaces the native one, which would otherwise also reach ancestor `close` listeners such as <dialog>
    event.stopPropagation()
    emit('close')
  }
</script>
