<template>
  <y-core-tab v-bind="props">
    <div
      v-if="$slots['before']"
      slot="before"
    >
      <slot name="before" />
    </div>

    <div
      v-if="$slots['after']"
      slot="after"
    >
      <slot
        name="after"
      />
    </div>
  </y-core-tab>
</template>

<script setup lang="ts">
  import '~core/ui/tab'
  import type { IYVueTabProps } from '~vue/ui/tab/models/types.ts'
  import { createVueTabProps } from '~vue/ui/tab/models/types.ts'

  defineOptions({ name: 'YTab' })

  defineSlots<{
    before: () => unknown
    default: () => unknown
    after: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IYVueTabProps>(),
    createVueTabProps(),
  ) satisfies IYVueTabProps
</script>

