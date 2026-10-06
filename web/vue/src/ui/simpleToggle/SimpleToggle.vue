<template>
  <y-core-simple-toggle
    v-bind="props"
    :checked="modelValue"
    @checked="$emit('update:modelValue', $event.detail.checked)"
  />
</template>

<script setup lang="ts">
  import '~core/ui/simpleToggle'
  import {
    createVueSimpleToggleProps,
    type IYVueSimpleToggleProps,
    type IYVueSimpleToggleEmits,
    type IYVueCoreSimpleToggleProps,
  } from '~vue/ui/simpleToggle/models/types'

  defineOptions({ name: 'YSimpleToggle' })

  const props = withDefaults(
    defineProps<IYVueSimpleToggleProps>(),
    createVueSimpleToggleProps(),
  ) satisfies IYVueCoreSimpleToggleProps

  defineEmits<IYVueSimpleToggleEmits>()
</script>
