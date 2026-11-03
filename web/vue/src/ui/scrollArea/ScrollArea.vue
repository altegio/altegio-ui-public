<template>
  <alt-core-scroll-area
    ref="coreScrollArea"
    v-bind="props"
    @scroll-change="$emit('scroll-change', $event)"
  >
    <slot />
  </alt-core-scroll-area>
</template>

<script lang="ts" setup>
  import { useTemplateRef } from 'vue'
  import '~core/ui/scrollArea'
  import type { AltCoreScrollArea } from '~core/ui/scrollArea'
  import type { IAltCoreScrollAreaExternalProps, TAltCoreScrollAxis } from '~core/ui/scrollArea/models/types'
  import {
    createVueScrollAreaProps,
    type IAltVueScrollAreaEmits,
    type IAltVueScrollAreaProps,
  } from '~vue/ui/scrollArea/models/types'

  defineOptions({ name: 'AltScrollArea' })

  defineSlots<{ default: () => unknown }>()

  const props = withDefaults(
    defineProps<IAltVueScrollAreaProps>(),
    createVueScrollAreaProps(),
  ) satisfies Partial<IAltCoreScrollAreaExternalProps>

  defineEmits<IAltVueScrollAreaEmits>()

  const coreScrollArea = useTemplateRef<AltCoreScrollArea>('coreScrollArea')

  defineExpose({
    getScrollPosition: () => coreScrollArea.value?.getScrollPosition(),
    setScrollPosition: (axis: TAltCoreScrollAxis, offset: number, behavior?: ScrollBehavior) => {
      coreScrollArea.value?.setScrollPosition(axis, offset, behavior)
    },
    setScrollPercentage: (axis: TAltCoreScrollAxis, ratio: number, behavior?: ScrollBehavior) => {
      coreScrollArea.value?.setScrollPercentage(axis, ratio, behavior)
    },
  })
</script>
