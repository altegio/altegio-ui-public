<template>
  <alt-core-dropdown v-bind="props">
    <div
      v-if="$slots.activator"
      slot="activator"
    >
      <slot name="activator" />
    </div>

    <div
      v-if="$slots.content"
      slot="content"
    >
      <slot name="content" />
    </div>
  </alt-core-dropdown>
</template>

<script setup lang="ts">
  import '~core/ui/dropdown'
  import {
    createVueDropdownProps,
    type IAltVueDropdownProps,
    type IAltVueCoreDropdownProps,
  } from '~vue/ui/dropdown/models/types'

  defineOptions({ name: 'AltDropdown' })

  defineSlots<{
    activator?: () => unknown
    content?: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IAltVueDropdownProps>(),
    createVueDropdownProps(),
  ) satisfies IAltVueCoreDropdownProps
</script>
