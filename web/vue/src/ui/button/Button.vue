<template>
  <y-core-button
    v-bind="props"
    @click="$emit('click', $event)"
  />
</template>

<script setup lang="ts">
  import '~core/ui/button'
  import {
    createVueButtonProps,
    type IYVueButtonProps,
    type IYVueButtonEmits,
    type IYVueCoreButtonProps,
  } from '~vue/ui/button/models/types'

  defineOptions({ name: 'YButton' })

  const props = withDefaults(
    defineProps<IYVueButtonProps>(),
    createVueButtonProps(),
  ) satisfies IYVueCoreButtonProps

  defineEmits<IYVueButtonEmits>()
</script>
