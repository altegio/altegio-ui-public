<template>
  <y-core-test-consumer />
</template>

<script setup lang="ts">
  import { inject } from 'vue'
  import '~core/ui/globalProvider/stories/TestConsumer.core'

  const globalContext = inject('globalContext')

  // eslint-disable-next-line no-console
  console.log(
    '[TestConsumer][inject]:',
    globalContext,
  )
</script>
