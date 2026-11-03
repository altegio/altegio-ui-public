<template>
  <alt-core-virtual-scroll
    ref="coreVirtualScroll"
    v-bind="coreProps"
    @range-change="handleRangeChange"
  >
    <div
      v-for="(item, offset) in visibleItems"
      :key="getKey(item, range.start + offset)"
      role="listitem"
      :aria-posinset="range.start + offset + 1"
      :aria-setsize="items.length"
      :style="{ boxSizing: 'border-box', height: `${itemSize}px` }"
    >
      <slot
        :item="item"
        :index="range.start + offset"
      />
    </div>
  </alt-core-virtual-scroll>
</template>

<script lang="ts" setup generic="T">
  import { computed, ref, useTemplateRef } from 'vue'
  import '~core/ui/virtualScroll'
  import type { AltCoreVirtualScroll } from '~core/ui/virtualScroll'
  import type {
    IAltCoreVirtualScrollExternalProps,
    IAltCoreVirtualScrollRange,
    VirtualScrollRangeChangeEvent,
  } from '~core/ui/virtualScroll/models/types'
  import {
    createVueVirtualScrollProps,
    type IAltVueVirtualScrollEmits,
    type IAltVueVirtualScrollProps,
  } from '~vue/ui/virtualScroll/models/types'

  defineOptions({ name: 'AltVirtualScroll' })

  defineSlots<{ default?: (scope: { item: T; index: number }) => unknown }>()

  const props = withDefaults(
    defineProps<IAltVueVirtualScrollProps<T>>(),
    createVueVirtualScrollProps(),
  )

  const emit = defineEmits<IAltVueVirtualScrollEmits>()

  const coreVirtualScroll = useTemplateRef<AltCoreVirtualScroll>('coreVirtualScroll')

  const range = ref<IAltCoreVirtualScrollRange>({ start: 0, end: 0 })

  const coreProps = computed<IAltCoreVirtualScrollExternalProps>(() => ({
    itemCount: props.items.length,
    itemSize: props.itemSize,
    overscan: props.overscan,
    accessibleName: props.accessibleName,
  }))

  const visibleItems = computed(() => props.items.slice(range.value.start, range.value.end))

  const getKey = (item: T, index: number) => props.itemKey?.(item, index) ?? index

  const handleRangeChange = (event: VirtualScrollRangeChangeEvent) => {
    range.value = event.detail
    emit('range-change', event)
  }

  defineExpose({
    scrollToIndex: (index: number, behavior?: ScrollBehavior) => {
      coreVirtualScroll.value?.scrollToIndex(index, behavior)
    },
  })
</script>
