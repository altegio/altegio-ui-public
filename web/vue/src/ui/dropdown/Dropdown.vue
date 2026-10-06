<template>
  <y-core-dropdown v-bind="props">
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
  </y-core-dropdown>
</template>

<script setup lang="ts">
  import '~core/ui/dropdown'
  import {
    createVueDropdownProps,
    type IYVueDropdownProps,
    type IYVueCoreDropdownProps,
  } from '~vue/ui/dropdown/models/types'

  defineOptions({ name: 'YDropdown' })

  defineSlots<{
    activator?: () => unknown
    content?: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IYVueDropdownProps>(),
    createVueDropdownProps(),
  ) satisfies IYVueCoreDropdownProps
</script>
