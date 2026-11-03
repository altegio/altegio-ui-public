<template>
  <alt-core-button
    v-bind="props"
    @click="$emit('click', $event)"
  />
</template>

<script setup lang="ts">
  import '~core/ui/button'
  import {
    createVueButtonProps,
    type IAltVueButtonProps,
    type IAltVueButtonEmits,
    type IAltVueCoreButtonProps,
  } from '~vue/ui/button/models/types'

  defineOptions({ name: 'AltButton' })

  const props = withDefaults(
    defineProps<IAltVueButtonProps>(),
    createVueButtonProps(),
  ) satisfies IAltVueCoreButtonProps

  defineEmits<IAltVueButtonEmits>()
</script>
