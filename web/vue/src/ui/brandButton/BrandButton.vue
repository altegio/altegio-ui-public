<template>
  <alt-core-brand-button
    v-bind="props"
    @click="$emit('click', $event)"
  />
</template>

<script setup lang="ts">
  import '~core/ui/brandButton'
  import {
    createVueBrandButtonProps,
    type IAltVueBrandButtonProps,
    type IAltVueBrandButtonEmits,
  } from './models/types'
  import type { IAltCoreBrandButtonProps } from '~core/ui/brandButton/models/types'

  defineOptions({ name: 'AltBrandButton' })

  defineEmits<IAltVueBrandButtonEmits>()

  const props = withDefaults(
    defineProps<IAltVueBrandButtonProps>(),
    createVueBrandButtonProps(),
  ) satisfies IAltCoreBrandButtonProps
</script>
