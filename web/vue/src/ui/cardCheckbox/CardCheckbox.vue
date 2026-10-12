<template>
  <y-core-card-checkbox v-bind="props" />
</template>

<script setup lang="ts">
  import '~core/ui/cardCheckbox'
  import {
    createVueCardCheckboxProps,
    type IYVueCardCheckboxProps,
    type IYVueCoreCardCheckboxProps,
  } from '~vue/ui/cardCheckbox/models/types'

  defineOptions({ name: 'YCardCheckbox' })

  const props = withDefaults(
    defineProps<IYVueCardCheckboxProps>(),
    createVueCardCheckboxProps(),
  ) satisfies IYVueCoreCardCheckboxProps
</script>
