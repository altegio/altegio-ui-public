<template>
  <alt-core-phone-field
    v-bind="props"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
    @select-option="$emit('selectOption', $event)"
    @change="$emit('change', $event)"
  >
    <div
      v-if="$slots['annotation'] && $slots['annotation']()"
      slot="annotation"
    >
      <slot
        name="annotation"
      />
    </div>

    <div
      v-if="$slots['list'] && $slots['list']()"
      slot="list"
    >
      <slot
        name="list"
      />
    </div>

    <div
      v-if="$slots['empty-state-actions'] && $slots['empty-state-actions']()"
      slot="empty-state-actions"
    >
      <slot
        name="empty-state-actions"
      />
    </div>
  </alt-core-phone-field>
</template>

<script setup lang="ts">
  import '~core/ui/phoneField'

  import {
    createVuePhoneFieldProps,
    type IAltVuePhoneFieldProps,
    type IAltVuePhoneFieldEmits,
  } from '~vue/ui/phoneField/models/types'

  defineOptions({ name: 'AltPhoneField' })

  defineSlots<{
    annotation: () => unknown
    list: () => unknown
    'empty-state-actions': () => unknown
  }>()

  defineEmits<IAltVuePhoneFieldEmits>()

  const props = withDefaults(
    defineProps<IAltVuePhoneFieldProps>(),
    createVuePhoneFieldProps(),
  ) satisfies IAltVuePhoneFieldProps
</script>
