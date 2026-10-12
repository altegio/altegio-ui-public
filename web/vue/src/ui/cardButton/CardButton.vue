<template>
  <y-core-card-button
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
      v-if="$slots.main && $slots.main()"
      slot="main"
    >
      <slot name="main" />
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
  </y-core-card-button>
</template>

<script setup lang="ts">
  import '~core/ui/cardButton'
  import {
    createVueCardButtonProps,
    type IYVueCardButtonProps,
    type IYVueCardButtonEmits,
    type IYVueCoreCardButtonProps,
  } from '~vue/ui/cardButton/models/types'

  defineOptions({ name: 'YCardButton' })

  defineSlots<{
    before?: () => unknown
    main?: () => unknown
    annotation?: () => unknown
    after?: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IYVueCardButtonProps>(),
    createVueCardButtonProps(),
  ) satisfies IYVueCoreCardButtonProps

  defineEmits<IYVueCardButtonEmits>()
</script>
