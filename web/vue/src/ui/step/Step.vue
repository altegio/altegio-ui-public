<template>
  <alt-core-step v-bind="props">
    <slot />
  </alt-core-step>
</template>

<script lang="ts" setup>
  import '~core/ui/step'
  import type { IAltCoreStepExternalProps } from '~core/ui/step/models/types'
  import {
    createVueStepProps,
    type IAltVueStepProps,
  } from '~vue/ui/step/models/types'

  defineOptions({ name: 'AltStep' })

  defineSlots<{
    default?: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IAltVueStepProps>(),
    createVueStepProps(),
  ) satisfies Partial<IAltCoreStepExternalProps>
</script>
