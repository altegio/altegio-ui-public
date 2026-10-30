<template>
  <alt-core-card-select
    v-bind="props"
    @click="$emit('click', $event)"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
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
      v-if="$slots.after && $slots.after()"
      slot="after"
    >
      <slot name="after" />
    </div>
  </alt-core-card-select>
</template>

<script setup lang="ts">
  import '~core/ui/cardSelect'
  import {
    createVueCardSelectProps,
    type IAltVueCardSelectProps,
    type IAltVueCardSelectEmits,
    type IAltVueCoreCardSelectProps,
  } from '~vue/ui/cardSelect/models/types'

  defineOptions({ name: 'AltCardSelect' })

  defineSlots<{
    before?: () => unknown
    annotation?: () => unknown
    after?: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IAltVueCardSelectProps>(),
    createVueCardSelectProps(),
  ) satisfies IAltVueCoreCardSelectProps

  defineEmits<IAltVueCardSelectEmits>()
</script>
