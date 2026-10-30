<template>
  <alt-core-popover
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
  </alt-core-popover>
</template>

<script setup lang="ts">
  import '~core/ui/popover'
  import {
    createVuePopoverProps,
    type IAltVuePopoverEmits,
    type IAltVuePopoverProps,
    type IAltVueCorePopoverProps,
  } from '~vue/ui/popover/models/types'

  defineOptions({ name: 'AltPopover' })

  defineSlots<{
    activator?: () => unknown
    content?: () => unknown
    actions?: () => unknown
  }>()

  defineEmits<IAltVuePopoverEmits>()

  const props = withDefaults(
    defineProps<IAltVuePopoverProps>(),
    createVuePopoverProps(),
  ) satisfies IAltVueCorePopoverProps
</script>
