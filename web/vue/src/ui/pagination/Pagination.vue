<template>
  <alt-core-pagination
    v-bind="props"
    @change-page="emit('change-page', $event)"
  />
</template>

<script setup lang="ts">
  import '~core/ui/pagination'
  import type { TVuePaginationChangePageEvent, IAltVueCorePaginationProps } from '~vue/ui/pagination/models/types'
  import { createVuePaginationProps } from '~vue/ui/pagination/models/types'

  defineOptions({ name: 'AltPagination' })

  const props = withDefaults(
    defineProps<IAltVueCorePaginationProps>(),
    createVuePaginationProps(),
  ) satisfies IAltVueCorePaginationProps

  interface Emits {
    (e: 'change-page', page: TVuePaginationChangePageEvent): void
  }

  const emit = defineEmits<Emits>()
</script>
