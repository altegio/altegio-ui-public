<template>
  <alt-core-card-radio v-bind="props" />
</template>

<script setup lang="ts">
  import '~core/ui/cardRadio'
  import {
    createVueCardRadioProps,
    type IAltVueCardRadioProps,
    type IAltVueCoreCardRadioProps,
  } from '~vue/ui/cardRadio/models/types'

  defineOptions({ name: 'AltCardRadio' })

  const props = withDefaults(
    defineProps<IAltVueCardRadioProps>(),
    createVueCardRadioProps(),
  ) satisfies IAltVueCoreCardRadioProps
</script>
