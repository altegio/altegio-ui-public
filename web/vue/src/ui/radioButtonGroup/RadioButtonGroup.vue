<template>
  <alt-core-radio-button-group
    v-bind="props"
    :value="modelValue"
    @change="$emit('update:modelValue', $event.detail.value)"
  >
    <slot />
  </alt-core-radio-button-group>
</template>

<script setup lang="ts">
  import '~core/ui/radioButtonGroup'
  import {
    createVueRadioButtonGroupProps,
    type IAltVueRadioButtonGroupProps,
    type IAltVueRadioButtonGroupEmits,
    type IAltVueCoreRadioButtonGroupProps,
  } from '~vue/ui/radioButtonGroup/models/types'

  defineOptions({ name: 'AltRadioButtonGroup' })

  const props = withDefaults(
    defineProps<IAltVueRadioButtonGroupProps>(),
    createVueRadioButtonGroupProps(),
  ) satisfies IAltVueCoreRadioButtonGroupProps

  defineEmits<IAltVueRadioButtonGroupEmits>()
</script>
