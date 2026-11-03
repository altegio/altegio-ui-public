<template>
  <alt-core-multiple-select-field
    v-bind="props"
    :value="modelValue"
    @select="$emit('update:modelValue', $event.detail.value)"
    @focus="$emit('focus', $event)"
    @input="$emit('input', $event)"
    @blur="$emit('blur', $event)"
  >
    <div
      v-if="$slots.annotation && $slots.annotation()"
      slot="annotation"
    >
      <slot
        name="annotation"
      />
    </div>


    <div
      v-if="$slots['dropdown-list-top'] && $slots['dropdown-list-top']()"
      slot="dropdown-list-top"
    >
      <slot name="dropdown-list-top" />
    </div>

    <div
      v-if="$slots['list'] && $slots['list']()"
      slot="list"
    >
      <slot name="list" />
    </div>

    <div
      v-if="$slots['dropdown-list-bottom'] && $slots['dropdown-list-bottom']()"
      slot="dropdown-list-bottom"
    >
      <slot name="dropdown-list-bottom" />
    </div>
  </alt-core-multiple-select-field>
</template>

<script setup lang="ts">
  import '~core/ui/multipleSelectField'
  import {
    createVueMultipleSelectFieldProps,
    type IAltVueMultipleSelectFieldProps,
    type IAltVueMultipleSelectFieldEmits,
  } from '~vue/ui/multipleSelectField/models/types'

  defineOptions({ name: 'AltMultipleSelectField' })

  defineSlots<{
    annotation: () => unknown
    'dropdown-list-top': () => unknown
    list: () => unknown
    'dropdown-list-bottom': () => unknown
  }>()

  const props = withDefaults(
    defineProps<IAltVueMultipleSelectFieldProps>(),
    createVueMultipleSelectFieldProps(),
  )

  defineEmits<IAltVueMultipleSelectFieldEmits>()
</script>
