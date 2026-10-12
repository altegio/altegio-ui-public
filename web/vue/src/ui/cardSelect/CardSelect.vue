<template>
  <y-core-card-select
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
  </y-core-card-select>
</template>

<script setup lang="ts">
  import '~core/ui/cardSelect'
  import {
    createVueCardSelectProps,
    type IYVueCardSelectProps,
    type IYVueCardSelectEmits,
    type IYVueCoreCardSelectProps,
  } from '~vue/ui/cardSelect/models/types'

  defineOptions({ name: 'YCardSelect' })

  defineSlots<{
    before?: () => unknown
    annotation?: () => unknown
    after?: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IYVueCardSelectProps>(),
    createVueCardSelectProps(),
  ) satisfies IYVueCoreCardSelectProps

  defineEmits<IYVueCardSelectEmits>()
</script>
