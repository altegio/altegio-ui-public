<template>
  <y-core-button-group v-bind="props">
    <slot />
  </y-core-button-group>
</template>

<script setup lang="ts">
  import { createVueButtonGroupProps, type IYVueButtonGroupProps } from '~vue/ui/buttonGroup/models/types'
  import type { IYCoreButtonGroupExternalProps } from '~core/ui/buttonGroup/models/types'

  defineOptions({ name: 'YButtonGroup' })

  const props = withDefaults(
    defineProps<IYVueButtonGroupProps>(),
    createVueButtonGroupProps(),
  ) satisfies IYCoreButtonGroupExternalProps

</script>
