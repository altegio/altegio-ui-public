<template>
  <y-core-radio-button-group
    v-bind="props"
    :value="modelValue"
    @change="$emit('update:modelValue', $event.detail.value)"
  >
    <slot />
  </y-core-radio-button-group>
</template>

<script setup lang="ts">
  import '~core/ui/radioButtonGroup'
  import {
    createVueRadioButtonGroupProps,
    type IYVueRadioButtonGroupProps,
    type IYVueRadioButtonGroupEmits,
    type IYVueCoreRadioButtonGroupProps,
  } from '~vue/ui/radioButtonGroup/models/types'

  defineOptions({ name: 'YRadioButtonGroup' })

  const props = withDefaults(
    defineProps<IYVueRadioButtonGroupProps>(),
    createVueRadioButtonGroupProps(),
  ) satisfies IYVueCoreRadioButtonGroupProps

  defineEmits<IYVueRadioButtonGroupEmits>()
</script>
