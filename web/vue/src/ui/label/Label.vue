<template>
  <y-core-label v-bind="props">
    <div
      v-if="$slots['tooltip-content']"
      slot="tooltip-content"
    >
      <slot name="tooltip-content" />
    </div>
  </y-core-label>
</template>

<script setup lang="ts">
  import '~core/ui/label'
  import {
    createVueLabelProps,
    type IYVueLabelProps,
    type IYVueCoreLabelProps,
  } from '~vue/ui/label/models/types'

  defineOptions({ name: 'YLabel' })

  defineSlots<{
    'tooltip-content'?: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IYVueLabelProps>(),
    createVueLabelProps(),
  ) satisfies IYVueCoreLabelProps
</script>
