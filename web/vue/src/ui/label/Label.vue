<template>
  <alt-core-label v-bind="props">
    <div
      v-if="$slots['tooltip-content']"
      slot="tooltip-content"
    >
      <slot name="tooltip-content" />
    </div>
  </alt-core-label>
</template>

<script setup lang="ts">
  import '~core/ui/label'
  import {
    createVueLabelProps,
    type IAltVueLabelProps,
    type IAltVueCoreLabelProps,
  } from '~vue/ui/label/models/types'

  defineOptions({ name: 'AltLabel' })

  defineSlots<{
    'tooltip-content'?: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IAltVueLabelProps>(),
    createVueLabelProps(),
  ) satisfies IAltVueCoreLabelProps
</script>
