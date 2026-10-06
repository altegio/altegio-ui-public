<template>
  <y-core-radio-button
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
  </y-core-radio-button>
</template>

<script setup lang="ts">
  import '~core/ui/radioButton'
  import {
    createVueRadioButtonProps,
    type IYVueRadioButtonEmits,
    type IYVueRadioButtonProps,
    type IYVueCoreRadioButtonProps,
  } from '~vue/ui/radioButton/models/types'

  defineOptions({ name: 'YRadioButton' })

  defineSlots<{
    label?: () => unknown
    annotation?: () => unknown
    'tooltip-content'?: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IYVueRadioButtonProps>(),
    createVueRadioButtonProps(),
  ) satisfies IYVueCoreRadioButtonProps

  defineEmits<IYVueRadioButtonEmits>()
</script>
