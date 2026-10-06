<template>
  <y-core-simple-button
    v-bind="props"
    @click="$emit('click', $event)"
  >
    <slot />
  </y-core-simple-button>
</template>

<script setup lang="ts">
  import '~core/ui/simpleButton'
  import {
    createVueSimpleButtonProps,
    type IYVueSimpleButtonProps,
    type IYVueSimpleButtonEmits,
    type IYVueCoreSimpleButtonProps,
  } from '~vue/ui/simpleButton/models/types'

  defineOptions({ name: 'YSimpleButton' })

  defineEmits<IYVueSimpleButtonEmits>()

  defineSlots<{
    default: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IYVueSimpleButtonProps>(),
    createVueSimpleButtonProps(),
  ) satisfies IYVueCoreSimpleButtonProps
</script>
