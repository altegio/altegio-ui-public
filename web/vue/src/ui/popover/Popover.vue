<template>
  <y-core-popover
    v-bind="props"
    @submit="$emit('submit')"
    @cancel="$emit('cancel')"
  >
    <div
      v-if="$slots.activator && $slots.activator()"
      slot="activator"
    >
      <slot name="activator" />
    </div>

    <div
      v-if="$slots.content && $slots.content()"
      slot="content"
    >
      <slot name="content" />
    </div>

    <div
      v-if="$slots.actions && $slots.actions()"
      slot="actions"
    >
      <slot name="actions" />
    </div>
  </y-core-popover>
</template>

<script setup lang="ts">
  import '~core/ui/popover'
  import {
    createVuePopoverProps,
    type IYVuePopoverEmits,
    type IYVuePopoverProps,
    type IYVueCorePopoverProps,
  } from '~vue/ui/popover/models/types'

  defineOptions({ name: 'YPopover' })

  defineSlots<{
    activator?: () => unknown
    content?: () => unknown
    actions?: () => unknown
  }>()

  defineEmits<IYVuePopoverEmits>()

  const props = withDefaults(
    defineProps<IYVuePopoverProps>(),
    createVuePopoverProps(),
  ) satisfies IYVueCorePopoverProps
</script>
