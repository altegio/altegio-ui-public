<template>
  <y-core-text-field
    ref="textField"
    v-bind="props"
    :value="modelValue"
    @input="$emit('update:modelValue', $event?.detail?.value)"
    @blur="$emit('blur', $event)"
    @focus="$emit('focus', $event)"
    @clear="$emit('clear', $event)"
    @keydown="$emit('keydown', $event)"
  >
    <div
      v-if="$slots.before && $slots.before()"
      slot="before"
    >
      <slot name="before" />
    </div>

    <div
      v-if="$slots.annotation && $slots.annotation()"
      slot="annotation"
    >
      <slot name="annotation" />
    </div>

    <div
      v-if="$slots['tooltip-content']"
      slot="tooltip-content"
    >
      <slot name="tooltip-content" />
    </div>

    <div
      v-if="$slots.after && $slots.after()"
      slot="after"
    >
      <slot name="after" />
    </div>
  </y-core-text-field>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import '~core/ui/textField'
  import {
    createVueTextFieldProps,
    type IYVueTextFieldProps,
    type IYVueCoreTextFieldProps,
    type IYTextFieldEmits,
  } from './models/types'
  import { YCoreTextField } from '~core/ui/textField'


  defineOptions({ name: 'YTextField' })

  defineSlots<{
    before: () => unknown
    annotation: () => unknown
    ['tooltip-content']: () => unknown
    after: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IYVueTextFieldProps>(),
    createVueTextFieldProps(),
  ) satisfies IYVueCoreTextFieldProps

  defineEmits<IYTextFieldEmits>()

  const coreTextFieldRef = ref<YCoreTextField>()

  const focus = (): void => {
    coreTextFieldRef.value?.focus()
  }

  defineExpose({ focus })
</script>
