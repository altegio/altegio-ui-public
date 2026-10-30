<template>
  <alt-core-button-group v-bind="props">
    <slot />
  </alt-core-button-group>
</template>

<script setup lang="ts">
  import { createVueButtonGroupProps, type IAltVueButtonGroupProps } from '~vue/ui/buttonGroup/models/types'
  import type { IAltCoreButtonGroupExternalProps } from '~core/ui/buttonGroup/models/types'

  defineOptions({ name: 'AltButtonGroup' })

  const props = withDefaults(
    defineProps<IAltVueButtonGroupProps>(),
    createVueButtonGroupProps(),
  ) satisfies IAltCoreButtonGroupExternalProps

</script>
