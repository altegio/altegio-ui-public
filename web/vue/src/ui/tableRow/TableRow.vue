<template>
  <alt-core-table-row
    v-bind="props"
  >
    <slot />
  </alt-core-table-row>
</template>

<script setup lang="ts">
  import '~core/ui/tableRow'
  import {
    createVueTableRowProps,
    type IAltVueTableRowProps,
    type IAltVueCoreTableRowProps,
  } from '~vue/ui/tableRow/models/types'

  defineOptions({ name: 'AltTableRow' })

  defineSlots<{
    default: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IAltVueTableRowProps>(),
    createVueTableRowProps(),
  ) satisfies IAltVueCoreTableRowProps
</script>
