<template>
  <y-core-collapse
    v-bind="props"
    :value="modelValue"
    @collapse-change="$emit('update:modelValue', $event.detail.value)"
    @collapse-move="$emit('collapse-move', $event)"
  >
    <slot />
  </y-core-collapse>
</template>

<script setup lang="ts">
  import '~core/ui/collapse'
  import {
    createVueCollapseProps,
    type IYVueCollapseProps,
    type IYVueCoreCollapseProps,
    type IYVueCollapseEmits,
  } from '~vue/ui/collapse/models/types'

  defineOptions({ name: 'YCollapse' })

  defineSlots<{
    default?: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IYVueCollapseProps>(),
    createVueCollapseProps(),
  ) satisfies IYVueCoreCollapseProps

  defineEmits<IYVueCollapseEmits>()
</script>
