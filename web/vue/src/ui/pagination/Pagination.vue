<template>
  <alt-core-pagination
    v-bind="props"
    @change-page="handleChangePage"
  />
</template>

<script setup lang="ts">
  import '~core/ui/pagination'
  import {
    createVuePaginationProps,
    type IAltVueCorePaginationProps,
    type IAltVuePaginationEmits,
    type IAltVuePaginationProps,
    type TVuePaginationChangePageEvent,
  } from '~vue/ui/pagination/models/types'

  defineOptions({ name: 'AltPagination' })

  const props = withDefaults(
    defineProps<IAltVuePaginationProps>(),
    createVuePaginationProps(),
  ) satisfies IAltVueCorePaginationProps

  const emit = defineEmits<IAltVuePaginationEmits>()

  const handleChangePage = (event: TVuePaginationChangePageEvent) => {
    emit('change-page', event)
    emit('update:page', event.detail.page)
  }
</script>
