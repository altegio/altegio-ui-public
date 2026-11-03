<template>
  <alt-core-annotation v-bind="props">
    <div
      v-if="$slots.default && $slots.default()"
      slot="annotation"
    >
      <slot />
    </div>
  </alt-core-annotation>
</template>

<script setup lang="ts">
  import '~core/ui/annotation'
  import {
    createVueAnnotationProps,
    type IAltVueAnnotationProps,
    type IAltVueCoreAnnotationProps,
  } from '~vue/ui/annotation/models/types'

  defineOptions({ name: 'AltAnnotation' })

  defineSlots<{
    default: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IAltVueAnnotationProps>(),
    createVueAnnotationProps(),
  ) satisfies IAltVueCoreAnnotationProps
</script>
