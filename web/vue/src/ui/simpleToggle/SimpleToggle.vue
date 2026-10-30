<template>
  <alt-core-simple-toggle
    v-bind="props"
    :checked="modelValue"
    @checked="$emit('update:modelValue', $event.detail.checked)"
  />
</template>

<script setup lang="ts">
  import '~core/ui/simpleToggle'
  import {
    createVueSimpleToggleProps,
    type IAltVueSimpleToggleProps,
    type IAltVueSimpleToggleEmits,
    type IAltVueCoreSimpleToggleProps,
  } from '~vue/ui/simpleToggle/models/types'

  defineOptions({ name: 'AltSimpleToggle' })

  const props = withDefaults(
    defineProps<IAltVueSimpleToggleProps>(),
    createVueSimpleToggleProps(),
  ) satisfies IAltVueCoreSimpleToggleProps

  defineEmits<IAltVueSimpleToggleEmits>()
</script>
