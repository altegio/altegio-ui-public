<template>
  <alt-core-textarea
    v-bind="props"
    :value="modelValue"
    @input="$emit('update:modelValue', $event?.detail?.value)"
    @blur="$emit('blur', $event)"
    @focus="$emit('focus', $event)"
    @keydown="$emit('keydown', $event)"
    @mouse-enter="$emit('mouse-enter', $event)"
    @mouse-leave="$emit('mouse-leave', $event)"
    @click="$emit('click', $event)"
    @click-outside="$emit('click-outside', $event)"
    @clear="$emit('clear', $event)"
    @render-textarea="$emit('render-textarea', $event)"
  >
    <div
      v-if="$slots.before && $slots.before()"
      slot="before"
    >
      <slot
        name="before"
      />
    </div>

    <div
      v-if="$slots.after && $slots.after()"
      slot="after"
    >
      <slot
        name="after"
      />
    </div>
  </alt-core-textarea>
</template>

<script setup lang="ts">
  import '~core/ui/textarea'
  import {
    createVueTextareaProps,
    type IAltVueTextareaProps,
    type IAltVueTextareaEmits,
    type IAltVueCoreTextareaProps,
  } from './models/types'

  defineOptions({ name: 'AltTextarea' })

  defineSlots<{
    before: () => unknown
    after: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IAltVueTextareaProps>(),
    createVueTextareaProps(),
  ) satisfies IAltVueCoreTextareaProps

  defineEmits<IAltVueTextareaEmits>()
</script>
