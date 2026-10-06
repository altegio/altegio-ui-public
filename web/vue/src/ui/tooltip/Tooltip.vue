<template>
  <y-core-tooltip
    v-bind="props"
    :disabled="props.disabled || !$slots.content && !props.text"
  >
    <div slot="activator">
      <slot name="activator" />
    </div>


    <div
      v-if="$slots.content && $slots.content()"
      slot="content"
    >
      <slot name="content" />
    </div>
  </y-core-tooltip>
</template>

<script setup lang="ts">
  import '~core/ui/tooltip'
  import {
    createVueTooltipProps,
    type IYVueTooltipProps,
    type IYVueCoreTooltipProps,
  } from '~vue/ui/tooltip/models/types'

  defineOptions({ name: 'YTooltip' })

  defineSlots<{
    activator: () => unknown
    content?: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IYVueTooltipProps>(),
    createVueTooltipProps(),
  ) satisfies IYVueCoreTooltipProps
</script>
