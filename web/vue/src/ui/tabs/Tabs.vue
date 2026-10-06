<template>
  <y-core-tabs
    :value="modelValue"
    :tabs
    @change-active-tab="handleTabClick"
  >
    <slot
      v-if="$slots['default']"
      name="default"
    />
  </y-core-tabs>
</template>

<script setup lang="ts">
  import '~core/ui/tabs'
  import '~core/ui/tab'

  import type { IYTabsEmits, IYVueTabsProps } from '~vue/ui/tabs/models/types.ts'
  import { createVueTabsProps } from '~vue/ui/tabs/models/types.ts'
  import { YCoreTabs } from '~core/ui/tabs'
  import type { ChangeActiveTabEvent } from '~core/ui/tabs/models/types'

  defineOptions({ name: 'YTabs' })

  defineSlots<{
    default: () => unknown
  }>()

  withDefaults(
    defineProps<IYVueTabsProps>(),
    createVueTabsProps(),
  )

  const emit = defineEmits<IYTabsEmits>()

  const handleTabClick = (ev: ChangeActiveTabEvent) => {
    const idx = ev.detail.value

    emit('update:modelValue', idx)
  }
</script>

