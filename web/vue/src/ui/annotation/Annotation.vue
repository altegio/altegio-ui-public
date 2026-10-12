<template>
  <y-core-annotation v-bind="props">
    <div
      v-if="$slots.default && $slots.default()"
      slot="annotation"
    >
      <slot />
    </div>
  </y-core-annotation>
</template>

<script setup lang="ts">
  import '~core/ui/annotation'
  import {
    createVueAnnotationProps,
    type IYVueAnnotationProps,
    type IYVueCoreAnnotationProps,
  } from '~vue/ui/annotation/models/types'

  defineOptions({ name: 'YAnnotation' })

  defineSlots<{
    default: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IYVueAnnotationProps>(),
    createVueAnnotationProps(),
  ) satisfies IYVueCoreAnnotationProps
</script>
