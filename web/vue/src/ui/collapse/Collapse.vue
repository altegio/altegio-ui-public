<template>
  <alt-core-collapse
    v-bind="props"
    :value="modelValue"
    @collapse-change="$emit('update:modelValue', $event.detail.value)"
    @collapse-move="$emit('collapse-move', $event)"
  >
    <slot />
  </alt-core-collapse>
</template>

<script setup lang="ts">
  import '~core/ui/collapse'
  import {
    createVueCollapseProps,
    type IAltVueCollapseProps,
    type IAltVueCoreCollapseProps,
    type IAltVueCollapseEmits,
  } from '~vue/ui/collapse/models/types'

  defineOptions({ name: 'AltCollapse' })

  defineSlots<{
    default?: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IAltVueCollapseProps>(),
    createVueCollapseProps(),
  ) satisfies IAltVueCoreCollapseProps

  defineEmits<IAltVueCollapseEmits>()
</script>
