<template>
  <alt-core-simple-checkbox
    v-bind="props"
    :checked="modelValue"
    @checked="$emit('update:modelValue', $event.detail.checked)"
  />
</template>

<script setup lang="ts">
  import '~core/ui/simpleCheckbox'
  import {
    createVueSimpleCheckboxProps,
    type IAltVueSimpleCheckboxProps,
    type IAltVueSimpleCheckboxEmits,
    type IAltVueCoreSimpleCheckboxProps,
  } from '~vue/ui/simpleCheckbox/models/types'

  defineOptions({ name: 'AltSimpleCheckbox' })

  const props = withDefaults(
    defineProps<IAltVueSimpleCheckboxProps>(),
    createVueSimpleCheckboxProps(),
  ) satisfies IAltVueCoreSimpleCheckboxProps

  defineEmits<IAltVueSimpleCheckboxEmits>()
</script>
