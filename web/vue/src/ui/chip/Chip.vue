<template>
  <y-core-chip
    v-bind="props"
    @click="$emit('update:active', !props.active)"
  />
</template>

<script setup lang="ts">
  import '~core/ui/chip'
  import {
    createVueChipProps,
    type IYVueChipEmits,
    type IYVueChipProps,
    type IYVueCoreChipProps,
  } from '~vue/ui/chip/models/types'

  defineOptions({ name: 'YChip' })

  const props = withDefaults(
    defineProps<IYVueChipProps>(),
    createVueChipProps(),
  ) satisfies IYVueCoreChipProps

  defineEmits<IYVueChipEmits>()
</script>
