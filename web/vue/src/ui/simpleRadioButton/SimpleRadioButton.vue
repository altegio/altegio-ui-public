<template>
  <y-core-simple-radio-button
    v-bind="props"
    :checked="modelValue"
    @checked="$emit('update:modelValue', $event.detail.checked)"
  />
</template>

<script setup lang="ts">
  import '~core/ui/simpleRadioButton'
  import {
    createVueSimpleRadioButtonProps,
    type IYVueSimpleRadioButtonProps,
    type IYVueSimpleRadioButtonEmits,
  } from '~vue/ui/simpleRadioButton/models/types'

  defineOptions({ name: 'YSimpleRadioButton' })

  const props = withDefaults(
    defineProps<IYVueSimpleRadioButtonProps>(),
    createVueSimpleRadioButtonProps(),
  ) satisfies IYVueSimpleRadioButtonProps

  defineEmits<IYVueSimpleRadioButtonEmits>()
</script>
