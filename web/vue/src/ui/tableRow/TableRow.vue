<template>
  <y-core-table-row
    v-bind="props"
  >
    <slot />
  </y-core-table-row>
</template>

<script setup lang="ts">
  import '~core/ui/tableRow'
  import {
    createVueTableRowProps,
    type IYVueTableRowProps,
    type IYVueCoreTableRowProps,
  } from '~vue/ui/tableRow/models/types'

  defineOptions({ name: 'YTableRow' })

  defineSlots<{
    default: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IYVueTableRowProps>(),
    createVueTableRowProps(),
  ) satisfies IYVueCoreTableRowProps
</script>
