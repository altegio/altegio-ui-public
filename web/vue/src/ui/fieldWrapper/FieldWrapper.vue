<template>
  <y-core-field-wrapper
    v-bind="props"
    @click="$emit('click', $event)"
    @click-outside="$emit('click-outside', $event)"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
    @mouse-enter="$emit('mouse-enter', $event)"
    @mouse-leave="$emit('mouse-leave', $event)"
  >
    <slot />
  </y-core-field-wrapper>
</template>

<script setup lang="ts">
  import '~core/ui/fieldWrapper'
  import {
    createVueFieldWrapperProps,
    type IYVueFieldWrapperProps,
    type IYVueFieldWrapperEmits,
    type IYVueCoreFieldWrapperProps,
  } from '~vue/ui/fieldWrapper/models/types'

  defineOptions({ name: 'YFieldWrapper' })

  defineSlots<{
    default: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IYVueFieldWrapperProps>(),
    createVueFieldWrapperProps(),
  ) satisfies IYVueCoreFieldWrapperProps

  defineEmits<IYVueFieldWrapperEmits>()
</script>
