<template>
  <y-core-field-textarea
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
    type IYVueFieldTextareaProps,
    type IYVueFieldTextareaEmits,
    type IYVueCoreFieldTextareaProps,
  } from '~vue/ui/fieldTextarea/models/types'

  defineOptions({ name: 'YFieldTextarea' })

  const props = withDefaults(
    defineProps<IYVueFieldTextareaProps>(),
    createVueFieldTextareaProps(),
  ) satisfies IYVueCoreFieldTextareaProps

  defineEmits<IYVueFieldTextareaEmits>()
</script>
