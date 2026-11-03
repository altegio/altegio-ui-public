<template>
  <alt-core-chip
    v-bind="props"
    @click="$emit('update:active', !props.active)"
  />
</template>

<script setup lang="ts">
  import '~core/ui/chip'
  import {
    createVueChipProps,
    type IAltVueChipEmits,
    type IAltVueChipProps,
    type IAltVueCoreChipProps,
  } from '~vue/ui/chip/models/types'

  defineOptions({ name: 'AltChip' })

  const props = withDefaults(
    defineProps<IAltVueChipProps>(),
    createVueChipProps(),
  ) satisfies IAltVueCoreChipProps

  defineEmits<IAltVueChipEmits>()
</script>
