<template>
  <y-core-button-dropdown
    v-bind="props"
    :is-open="modelValue"
    @change-visible="$emit('update:modelValue', $event.detail.value)"
    @item-click="$emit('item-click', $event.detail.item)"
  >
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
  </y-core-button-dropdown>
</template>

<script setup lang="ts">
  import '~core/ui/buttonDropdown'
  import {
    createVueButtonDropdownProps,
    type IYVueButtonDropdownProps,
    type IYVueButtonDropdownEmits,
    type IYVueCoreButtonDropdownProps,
  } from '~vue/ui/buttonDropdown/models/types'

  defineOptions({ name: 'YButtonDropdown' })

  defineSlots<{
    activator?: () => unknown
    content?: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IYVueButtonDropdownProps>(),
    createVueButtonDropdownProps(),
  ) satisfies IYVueCoreButtonDropdownProps

  defineEmits<IYVueButtonDropdownEmits>()
</script>
