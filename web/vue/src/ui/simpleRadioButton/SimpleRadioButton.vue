<template>
  <alt-core-simple-radio-button
    v-bind="props"
    :checked="modelValue"
    @checked="$emit('update:modelValue', $event.detail.checked)"
  />
</template>

<script setup lang="ts">
  import '~core/ui/simpleRadioButton'
  import {
    createVueSimpleRadioButtonProps,
    type IAltVueSimpleRadioButtonProps,
    type IAltVueSimpleRadioButtonEmits,
  } from '~vue/ui/simpleRadioButton/models/types'

  defineOptions({ name: 'AltSimpleRadioButton' })

  const props = withDefaults(
    defineProps<IAltVueSimpleRadioButtonProps>(),
    createVueSimpleRadioButtonProps(),
  ) satisfies IAltVueSimpleRadioButtonProps

  defineEmits<IAltVueSimpleRadioButtonEmits>()
</script>
