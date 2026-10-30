<template>
  <alt-core-tip v-bind="props">
    <div
      v-if="$slots.activator && $slots.activator()"
      slot="activator"
    >
      <slot name="activator" />
    </div>

    <div
      v-if="$slots.content && $slots.content()"
      slot="content"
    >
      <slot name="content" />
    </div>
  </alt-core-tip>
</template>

<script setup lang="ts">
  import '~core/ui/tip'
  import {
    createVueTipProps,
    type IAltVueTipProps,
    type IAltVueCoreTipProps,
  } from '~vue/ui/tip/models/types'

  defineOptions({ name: 'AltTip' })

  defineSlots<{
    activator?: () => unknown
    content?: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IAltVueTipProps>(),
    createVueTipProps(),
  ) satisfies IAltVueCoreTipProps
</script>
