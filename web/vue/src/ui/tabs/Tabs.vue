<template>
  <alt-core-tabs
    :value="modelValue"
    :tabs
    @change-active-tab="handleTabClick"
  >
    <slot
      v-if="$slots['default']"
      name="default"
    />
  </alt-core-tabs>
</template>

<script setup lang="ts">
  import '~core/ui/tabs'
  import '~core/ui/tab'

  import type { IAltTabsEmits, IAltVueTabsProps } from '~vue/ui/tabs/models/types.ts'
  import { createVueTabsProps } from '~vue/ui/tabs/models/types.ts'
  import { AltCoreTabs } from '~core/ui/tabs'
  import type { ChangeActiveTabEvent } from '~core/ui/tabs/models/types'

  defineOptions({ name: 'AltTabs' })

  defineSlots<{
    default: () => unknown
  }>()

  withDefaults(
    defineProps<IAltVueTabsProps>(),
    createVueTabsProps(),
  )

  const emit = defineEmits<IAltTabsEmits>()

  const handleTabClick = (ev: ChangeActiveTabEvent) => {
    const idx = ev.detail.value

    emit('update:modelValue', idx)
  }
</script>

