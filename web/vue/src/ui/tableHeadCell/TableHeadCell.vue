<template>
  <alt-core-table-head-cell
    v-bind="props"
    @sort="$emit('sort', $event)"
  >
    <div
      v-if="Boolean($slots.cell && $slots.cell())"
      slot="cell"
    >
      <slot name="cell" />
    </div>

    <div
      v-if="Boolean($slots.hint && $slots.hint())"
      slot="hint"
    >
      <slot name="hint" />
    </div>
  </alt-core-table-head-cell>
</template>

<script setup lang="ts">
  import '~core/ui/tableHeadCell'
  import {
    createVueTableHeadCellProps,
    type IAltVueTableHeadCellProps,
    type IAltVueTableHeadCellEmits,
    type IAltVueCoreTableHeadCellProps,
  } from '~vue/ui/tableHeadCell/models/types'

  defineOptions({ name: 'AltTableHeadCell' })

  defineSlots<{
    cell: () => unknown
    hint: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IAltVueTableHeadCellProps>(),
    createVueTableHeadCellProps(),
  ) satisfies IAltVueCoreTableHeadCellProps

  defineEmits<IAltVueTableHeadCellEmits>()
</script>
