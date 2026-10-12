<template>
  <y-core-card-radio v-bind="props" />
</template>

<script setup lang="ts">
  import '~core/ui/cardRadio'
  import {
    createVueCardRadioProps,
    type IYVueCardRadioProps,
    type IYVueCoreCardRadioProps,
  } from '~vue/ui/cardRadio/models/types'

  defineOptions({ name: 'YCardRadio' })

  const props = withDefaults(
    defineProps<IYVueCardRadioProps>(),
    createVueCardRadioProps(),
  ) satisfies IYVueCoreCardRadioProps
</script>
