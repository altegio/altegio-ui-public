<template>
  <alt-core-rating
    v-bind="coreProps"
    :value="props.modelValue"
    @change="handleChange"
  />
</template>

<script lang="ts" setup>
  import { omit } from 'radash'
  import { computed } from 'vue'
  import '~core/ui/rating'
  import type { RatingChangeEvent } from '~core/ui/rating/models/types'
  import {
    createVueRatingProps,
    type IAltVueRatingEmits,
    type IAltVueRatingProps,
  } from '~vue/ui/rating/models/types'

  defineOptions({ name: 'AltRating' })

  const props = withDefaults(
    defineProps<IAltVueRatingProps>(),
    createVueRatingProps(),
  )

  const emit = defineEmits<IAltVueRatingEmits>()

  const coreProps = computed(() => omit(props, ['modelValue']))

  const handleChange = (event: Event) => {
    // The component event replaces the native one, which would otherwise also reach ancestor `change` listeners
    event.stopPropagation()
    emit('update:modelValue', (event as RatingChangeEvent).detail.value)
  }
</script>
