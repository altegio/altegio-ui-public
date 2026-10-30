<template>
  <alt-core-field-wrapper
    v-bind="props"
    @click="$emit('click', $event)"
    @click-outside="$emit('click-outside', $event)"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
    @mouse-enter="$emit('mouse-enter', $event)"
    @mouse-leave="$emit('mouse-leave', $event)"
  >
    <slot />
  </alt-core-field-wrapper>
</template>

<script setup lang="ts">
  import '~core/ui/fieldWrapper'
  import {
    createVueFieldWrapperProps,
    type IAltVueFieldWrapperProps,
    type IAltVueFieldWrapperEmits,
    type IAltVueCoreFieldWrapperProps,
  } from '~vue/ui/fieldWrapper/models/types'

  defineOptions({ name: 'AltFieldWrapper' })

  defineSlots<{
    default: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IAltVueFieldWrapperProps>(),
    createVueFieldWrapperProps(),
  ) satisfies IAltVueCoreFieldWrapperProps

  defineEmits<IAltVueFieldWrapperEmits>()
</script>
