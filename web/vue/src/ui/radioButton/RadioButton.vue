<template>
  <alt-core-radio-button
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
  </alt-core-radio-button>
</template>

<script setup lang="ts">
  import '~core/ui/radioButton'
  import {
    createVueRadioButtonProps,
    type IAltVueRadioButtonEmits,
    type IAltVueRadioButtonProps,
    type IAltVueCoreRadioButtonProps,
  } from '~vue/ui/radioButton/models/types'

  defineOptions({ name: 'AltRadioButton' })

  defineSlots<{
    label?: () => unknown
    annotation?: () => unknown
    'tooltip-content'?: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IAltVueRadioButtonProps>(),
    createVueRadioButtonProps(),
  ) satisfies IAltVueCoreRadioButtonProps

  defineEmits<IAltVueRadioButtonEmits>()
</script>
