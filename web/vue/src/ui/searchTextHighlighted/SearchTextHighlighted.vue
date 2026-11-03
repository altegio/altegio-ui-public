<template>
  <alt-core-search-text-highlighted v-bind="props" />
</template>

<script setup lang="ts">
  import '~core/ui/searchTextHighlighted'
  import {
    createVueSearchTextHighlightedProps,
    type IAltVueSearchTextHighlightedProps,
    type IAltVueCoreSearchTextHighlightedProps,
  } from '~web/vue/src/ui/searchTextHighlighted/models/types'

  defineOptions({ name: 'AltSearchTextHighlighted' })

  const props = withDefaults(
    defineProps<IAltVueSearchTextHighlightedProps>(),
    createVueSearchTextHighlightedProps(),
  ) satisfies IAltVueCoreSearchTextHighlightedProps
</script>
