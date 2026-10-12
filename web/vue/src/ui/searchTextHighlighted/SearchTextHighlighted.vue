<template>
  <y-core-search-text-highlighted v-bind="props" />
</template>

<script setup lang="ts">
  import '~core/ui/searchTextHighlighted'
  import {
    createVueSearchTextHighlightedProps,
    type IYVueSearchTextHighlightedProps,
    type IYVueCoreSearchTextHighlightedProps,
  } from '~web/vue/src/ui/searchTextHighlighted/models/types'

  defineOptions({ name: 'YSearchTextHighlighted' })

  const props = withDefaults(
    defineProps<IYVueSearchTextHighlightedProps>(),
    createVueSearchTextHighlightedProps(),
  ) satisfies IYVueCoreSearchTextHighlightedProps
</script>
