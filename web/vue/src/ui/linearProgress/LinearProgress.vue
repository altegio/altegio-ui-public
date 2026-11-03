<template>
  <alt-core-linear-progress v-bind="props" />
</template>

<script lang="ts" setup>
  import '~core/ui/linearProgress'
  import type { IAltCoreLinearProgressProps } from '~core/ui/linearProgress/models/types'
  import {
    createVueLinearProgressProps,
    type IAltVueLinearProgressProps,
  } from '~vue/ui/linearProgress/models/types'

  defineOptions({ name: 'AltLinearProgress' })

  const props = withDefaults(
    defineProps<IAltVueLinearProgressProps>(),
    createVueLinearProgressProps(),
  ) satisfies Partial<IAltCoreLinearProgressProps>
</script>
