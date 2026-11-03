<template>
  <alt-core-toggle
    v-bind="props"
    :checked="modelValue"
    @checked="$emit('update:modelValue', $event.detail.checked)"
  >
    <div
      v-if="$slots.label"
      slot="label"
    >
      <slot name="label" />
    </div>

    <div
      v-if="$slots.annotation"
      slot="annotation"
    >
      <slot name="annotation" />
    </div>

    <div
      v-if="$slots['tooltip-content']"
      slot="tooltip-content"
    >
      <slot name="tooltip-content" />
    </div>
  </alt-core-toggle>
</template>

<script setup lang="ts">
  import '~core/ui/toggle'
  import {
    createVueToggleProps,
    type IAltVueToggleProps,
    type IAltVueCoreToggleProps,
    type IAltVueToggleEmits,
  } from '~vue/ui/toggle/models/types'

  defineOptions({ name: 'AltToggle' })

  defineSlots<{
    label?: () => unknown
    annotation?: () => unknown
    'tooltip-content'?: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IAltVueToggleProps>(),
    createVueToggleProps(),
  ) satisfies IAltVueCoreToggleProps

  defineEmits<IAltVueToggleEmits>()
</script>
