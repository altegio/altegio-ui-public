<template>
  <alt-core-simple-button
    v-bind="props"
    @click="$emit('click', $event)"
  >
    <slot />
  </alt-core-simple-button>
</template>

<script setup lang="ts">
  import '~core/ui/simpleButton'
  import {
    createVueSimpleButtonProps,
    type IAltVueSimpleButtonProps,
    type IAltVueSimpleButtonEmits,
    type IAltVueCoreSimpleButtonProps,
  } from '~vue/ui/simpleButton/models/types'

  defineOptions({ name: 'AltSimpleButton' })

  defineEmits<IAltVueSimpleButtonEmits>()

  defineSlots<{
    default: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IAltVueSimpleButtonProps>(),
    createVueSimpleButtonProps(),
  ) satisfies IAltVueCoreSimpleButtonProps
</script>
