<template>
  <alt-core-field-textarea
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
  import '~core/ui/fieldTextarea'
  import {
    createVueFieldTextareaProps,
    type IAltVueFieldTextareaProps,
    type IAltVueFieldTextareaEmits,
    type IAltVueCoreFieldTextareaProps,
  } from '~vue/ui/fieldTextarea/models/types'

  defineOptions({ name: 'AltFieldTextarea' })

  const props = withDefaults(
    defineProps<IAltVueFieldTextareaProps>(),
    createVueFieldTextareaProps(),
  ) satisfies IAltVueCoreFieldTextareaProps

  defineEmits<IAltVueFieldTextareaEmits>()
</script>
