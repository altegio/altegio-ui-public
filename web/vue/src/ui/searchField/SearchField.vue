<template>
  <alt-core-text-field
    ref="textField"
    v-bind="props"
    :value="modelValue"
    clearable="true"
    @input="$emit('update:modelValue', $event?.detail?.value)"
    @blur="$emit('blur', $event)"
    @focus="$emit('focus', $event)"
    @clear="$emit('clear', $event)"
  >
    <alt-core-field-icon
      slot="before"
      clickable
      :icon="SEARCH_FIELD_ICON"
      @click="handleClickSearchIcon"
    />

    <div
      v-if="$slots.annotation && $slots.annotation()"
      slot="annotation"
    >
      <slot name="annotation" />
    </div>

    <div
      v-if="$slots.after && $slots.after()"
      slot="after"
    >
      <slot name="after" />
    </div>
  </alt-core-text-field>
</template>

<script setup lang="ts">
  import '~core/ui/textField'
  import '~core/ui/fieldIcon'
  import {
    type IAltVueSearchFieldProps,
    type IAltVueCoreSearchFieldProps,
    type IAltSearchFieldEmits,
    createVueSearchFieldProps,
    SEARCH_FIELD_ICON,
  } from './models/types'
  import { type AltCoreTextField } from '~core/ui/textField'
  import { ref } from 'vue'

  const textField = ref<AltCoreTextField>()

  defineOptions({ name: 'AltSearchField' })

  defineSlots<{
    annotation: () => unknown
    after: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IAltVueSearchFieldProps>(),
    createVueSearchFieldProps(),
  ) satisfies IAltVueCoreSearchFieldProps

  const emit = defineEmits<IAltSearchFieldEmits>()

  const handleClickSearchIcon = (event: Event) => {
    textField.value?.fieldInput?.inputElement?.focus()
    emit('click-search-icon', event)
  }
</script>
