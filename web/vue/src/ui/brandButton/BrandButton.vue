<template>
  <y-core-brand-button
    v-bind="props"
    @click="$emit('click', $event)"
  />
</template>

<script setup lang="ts">
  import '~core/ui/brandButton'
  import {
    createVueBrandButtonProps,
    type IYVueBrandButtonProps,
    type IYVueBrandButtonEmits,
  } from './models/types'
  import type { IYCoreBrandButtonProps } from '~core/ui/brandButton/models/types'

  defineOptions({ name: 'YBrandButton' })

  defineEmits<IYVueBrandButtonEmits>()

  const props = withDefaults(
    defineProps<IYVueBrandButtonProps>(),
    createVueBrandButtonProps(),
  ) satisfies IYCoreBrandButtonProps
</script>
