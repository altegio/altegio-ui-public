<template>
  <y-core-pagination
    v-bind="props"
    @change-page="emit('change-page', $event)"
  />
</template>

<script setup lang="ts">
  import '~core/ui/pagination'
  import type { TVuePaginationChangePageEvent, IYVueCorePaginationProps } from '~vue/ui/pagination/models/types'
  import { createVuePaginationProps } from '~vue/ui/pagination/models/types'

  defineOptions({ name: 'YPagination' })

  const props = withDefaults(
    defineProps<IYVueCorePaginationProps>(),
    createVuePaginationProps(),
  ) satisfies IYVueCorePaginationProps

  interface Emits {
    (e: 'change-page', page: TVuePaginationChangePageEvent): void
  }

  const emit = defineEmits<Emits>()
</script>
