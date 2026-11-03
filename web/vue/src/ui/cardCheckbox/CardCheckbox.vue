<template>
  <alt-core-card-checkbox v-bind="props" />
</template>

<script setup lang="ts">
  import '~core/ui/cardCheckbox'
  import {
    createVueCardCheckboxProps,
    type IAltVueCardCheckboxProps,
    type IAltVueCoreCardCheckboxProps,
  } from '~vue/ui/cardCheckbox/models/types'

  defineOptions({ name: 'AltCardCheckbox' })

  const props = withDefaults(
    defineProps<IAltVueCardCheckboxProps>(),
    createVueCardCheckboxProps(),
  ) satisfies IAltVueCoreCardCheckboxProps
</script>
