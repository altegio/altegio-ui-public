<template>
  <alt-core-tooltip
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
  </alt-core-tooltip>
</template>

<script setup lang="ts">
  import '~core/ui/tooltip'
  import {
    createVueTooltipProps,
    type IAltVueTooltipProps,
    type IAltVueCoreTooltipProps,
  } from '~vue/ui/tooltip/models/types'

  defineOptions({ name: 'AltTooltip' })

  defineSlots<{
    activator: () => unknown
    content?: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IAltVueTooltipProps>(),
    createVueTooltipProps(),
  ) satisfies IAltVueCoreTooltipProps
</script>
