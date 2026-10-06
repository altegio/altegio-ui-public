<template>
  <y-core-tip v-bind="props">
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
  </y-core-tip>
</template>

<script setup lang="ts">
  import '~core/ui/tip'
  import {
    createVueTipProps,
    type IYVueTipProps,
    type IYVueCoreTipProps,
  } from '~vue/ui/tip/models/types'

  defineOptions({ name: 'YTip' })

  defineSlots<{
    activator?: () => unknown
    content?: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IYVueTipProps>(),
    createVueTipProps(),
  ) satisfies IYVueCoreTipProps
</script>
