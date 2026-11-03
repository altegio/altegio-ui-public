<template>
  <alt-core-field-input
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
    type IAltVueFieldInputProps,
    type IAltVueFieldInputEmits,
    type IAltVueCoreFieldInputProps,
  } from '~vue/ui/fieldInput/models/types'

  defineOptions({ name: 'AltFieldInput' })

  const props = withDefaults(
    defineProps<IAltVueFieldInputProps>(),
    createVueFieldInputProps(),
  ) satisfies IAltVueCoreFieldInputProps

  defineEmits<IAltVueFieldInputEmits>()
</script>
