<template>
  <alt-core-tab v-bind="props">
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
  </alt-core-tab>
</template>

<script setup lang="ts">
  import '~core/ui/tab'
  import type { IAltVueTabProps } from '~vue/ui/tab/models/types.ts'
  import { createVueTabProps } from '~vue/ui/tab/models/types.ts'

  defineOptions({ name: 'AltTab' })

  defineSlots<{
    before: () => unknown
    default: () => unknown
    after: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IAltVueTabProps>(),
    createVueTabProps(),
  ) satisfies IAltVueTabProps
</script>

