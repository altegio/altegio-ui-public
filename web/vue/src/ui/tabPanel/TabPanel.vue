<template>
  <alt-core-tab-panel v-bind="props">
    <slot v-if="isContentRendered" />
  </alt-core-tab-panel>
</template>

<script lang="ts" setup>
  import { computed, inject, ref, watch } from 'vue'
  import '~core/ui/tabPanel'
  import { tabPanelsInjectionKey } from '~vue/ui/tabPanels/models/types'
  import {
    createVueTabPanelProps,
    type IAltVueTabPanelProps,
  } from '~vue/ui/tabPanel/models/types'

  defineOptions({ name: 'AltTabPanel' })

  defineSlots<{
    default?: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IAltVueTabPanelProps>(),
    createVueTabPanelProps(),
  )

  const tabPanels = inject(tabPanelsInjectionKey, undefined)

  const isActive = computed(() => {
    const value = tabPanels?.value.value

    return value !== undefined && String(value) === String(props.name)
  })

  const wasActive = ref(isActive.value)

  watch(isActive, (active) => {
    if (active) wasActive.value = true
  })

  // Without AltTabPanels the content is always rendered; with it, only the active panel
  // (and, with keep-alive, every panel that has been active) renders its content
  const isContentRendered = computed(() => {
    if (!tabPanels) return true

    return isActive.value || tabPanels.keepAlive.value && wasActive.value
  })
</script>
