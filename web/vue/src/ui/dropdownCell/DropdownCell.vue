<template>
  <y-core-dropdown-cell v-bind="props">
    <div
      v-if="$slots.cell && $slots.cell()"
      slot="cell"
    >
      <slot
        name="cell"
      />
    </div>

    <div
      v-if="$slots.prepend && $slots.prepend()"
      slot="prepend"
    >
      <slot
        name="prepend"
      />
    </div>

    <div
      v-if="$slots.content && $slots.content()"
      slot="content"
    >
      <slot
        name="content"
      />
    </div>

    <div
      v-if="$slots.label && $slots.label()"
      slot="label"
    >
      <slot
        name="label"
      />
    </div>

    <div
      v-if="$slots.append && $slots.append()"
      slot="append"
    >
      <slot
        name="append"
      />
    </div>
  </y-core-dropdown-cell>
</template>

<script setup lang="ts">
  import '~core/ui/dropdownCell'
  import {
    createVueDropdownCellProps,
    type IYVueDropdownCellProps,
    type IYVueCoreDropdownCellProps,
  } from '~vue/ui/dropdownCell/models/types'

  defineOptions({ name: 'YDropdownCell' })

  defineSlots<{
    cell?: () => unknown
    prepend?: () => unknown
    append?: () => unknown
    content?: () => unknown
    label?: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IYVueDropdownCellProps>(),
    createVueDropdownCellProps(),
  ) satisfies IYVueCoreDropdownCellProps
</script>
