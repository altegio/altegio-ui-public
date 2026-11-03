<template>
  <alt-core-checkbox
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
  </alt-core-checkbox>
</template>

<script setup lang="ts">
  import '~core/ui/checkbox'
  import {
    createVueCheckboxProps,
    type IAltVueCheckboxEmits,
    type IAltVueCheckboxProps,
    type IAltVueCoreCheckboxProps,
  } from '~vue/ui/checkbox/models/types'

  defineOptions({ name: 'AltCheckbox' })

  defineSlots<{
    label?: () => unknown
    annotation?: () => unknown
    'tooltip-content'?: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IAltVueCheckboxProps>(),
    createVueCheckboxProps(),
  ) satisfies IAltVueCoreCheckboxProps

  defineEmits<IAltVueCheckboxEmits>()
</script>
