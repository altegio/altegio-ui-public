<template>
  <y-core-field-input
    v-bind="props"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.detail.value)"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
    @keydown="$emit('keydown', $event)"
    @render="$emit('render')"
  />
</template>

<script setup lang="ts">
  import '~core/ui/fieldInput'
  import {
    createVueFieldInputProps,
    type IYVueFieldInputProps,
    type IYVueFieldInputEmits,
    type IYVueCoreFieldInputProps,
  } from '~vue/ui/fieldInput/models/types'

  defineOptions({ name: 'YFieldInput' })

  const props = withDefaults(
    defineProps<IYVueFieldInputProps>(),
    createVueFieldInputProps(),
  ) satisfies IYVueCoreFieldInputProps

  defineEmits<IYVueFieldInputEmits>()
</script>
