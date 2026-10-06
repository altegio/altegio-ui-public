<template>
  <y-core-autocomplete-field
    v-bind="props"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
    @select-option="$emit('selectOption', $event)"
    @change="handleChange"
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
  </y-core-autocomplete-field>
</template>

<script setup lang="ts">
  import '~core/ui/autocompleteField'

  import {
    createVueAutocompleteFieldProps,
    type IYVueAutocompleteFieldProps,
    type IYVueAutocompleteFieldEmits,
  } from '~vue/ui/autocompleteField/models/types'
  import type { ChangeEvent } from '~core/ui/autocompleteField/models/types/events'

  defineOptions({ name: 'YAutocompleteField' })

  defineSlots<{
    annotation: () => unknown
    list: () => unknown
    'empty-state-actions': () => unknown
    [key: `custom-option-${string | number}`]: () => unknown
  }>()

  const emit = defineEmits<IYVueAutocompleteFieldEmits>()

  const props = withDefaults(
    defineProps<IYVueAutocompleteFieldProps>(),
    createVueAutocompleteFieldProps(),
  ) satisfies IYVueAutocompleteFieldProps

  const handleChange = (event: ChangeEvent) => {
    emit('change', event)
  }
</script>
