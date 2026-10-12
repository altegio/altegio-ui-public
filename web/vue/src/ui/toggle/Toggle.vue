<template>
  <y-core-toggle
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
  </y-core-toggle>
</template>

<script setup lang="ts">
  import '~core/ui/toggle'
  import {
    createVueToggleProps,
    type IYVueToggleProps,
    type IYVueCoreToggleProps,
    type IYVueToggleEmits,
  } from '~vue/ui/toggle/models/types'

  defineOptions({ name: 'YToggle' })

  defineSlots<{
    label?: () => unknown
    annotation?: () => unknown
    'tooltip-content'?: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IYVueToggleProps>(),
    createVueToggleProps(),
  ) satisfies IYVueCoreToggleProps

  defineEmits<IYVueToggleEmits>()
</script>
