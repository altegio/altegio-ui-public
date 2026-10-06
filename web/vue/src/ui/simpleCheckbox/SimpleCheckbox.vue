<template>
  <y-core-simple-checkbox
    v-bind="props"
    :checked="modelValue"
    @checked="$emit('update:modelValue', $event.detail.checked)"
  />
</template>

<script setup lang="ts">
  import '~core/ui/simpleCheckbox'
  import {
    createVueSimpleCheckboxProps,
    type IYVueSimpleCheckboxProps,
    type IYVueSimpleCheckboxEmits,
    type IYVueCoreSimpleCheckboxProps,
  } from '~vue/ui/simpleCheckbox/models/types'

  defineOptions({ name: 'YSimpleCheckbox' })

  const props = withDefaults(
    defineProps<IYVueSimpleCheckboxProps>(),
    createVueSimpleCheckboxProps(),
  ) satisfies IYVueCoreSimpleCheckboxProps

  defineEmits<IYVueSimpleCheckboxEmits>()
</script>
