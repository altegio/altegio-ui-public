<template>
  <alt-core-tab-panels :value="props.modelValue">
    <slot />
  </alt-core-tab-panels>
</template>

<script lang="ts" setup>
  import { computed, provide } from 'vue'
  import '~core/ui/tabPanels'
  import {
    createVueTabPanelsProps,
    tabPanelsInjectionKey,
    type IAltVueTabPanelsProps,
  } from '~vue/ui/tabPanels/models/types'

  defineOptions({ name: 'AltTabPanels' })

  defineSlots<{
    default?: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IAltVueTabPanelsProps>(),
    createVueTabPanelsProps(),
  )

  provide(tabPanelsInjectionKey, {
    value: computed(() => props.modelValue),
    keepAlive: computed(() => Boolean(props.keepAlive)),
  })
</script>
