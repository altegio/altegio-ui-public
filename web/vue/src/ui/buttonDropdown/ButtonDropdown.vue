<template>
  <alt-core-button-dropdown
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
  </alt-core-button-dropdown>
</template>

<script setup lang="ts">
  import '~core/ui/buttonDropdown'
  import {
    createVueButtonDropdownProps,
    type IAltVueButtonDropdownProps,
    type IAltVueButtonDropdownEmits,
    type IAltVueCoreButtonDropdownProps,
  } from '~vue/ui/buttonDropdown/models/types'

  defineOptions({ name: 'AltButtonDropdown' })

  defineSlots<{
    activator?: () => unknown
    content?: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IAltVueButtonDropdownProps>(),
    createVueButtonDropdownProps(),
  ) satisfies IAltVueCoreButtonDropdownProps

  defineEmits<IAltVueButtonDropdownEmits>()
</script>
