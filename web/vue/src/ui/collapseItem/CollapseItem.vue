<template>
  <y-core-collapse-item
    v-bind="props"
    @collapse-item-click="$emit('collapse-item-click', $event)"
  >
    <div
      v-if="$slots.before && $slots.before()"
      slot="before"
    >
      <slot name="before" />
    </div>

    <div
      v-if="$slots.avatar && $slots.avatar()"
      slot="avatar"
    >
      <slot name="avatar" />
    </div>

    <div
      v-if="$slots.main && $slots.main()"
      slot="main"
    >
      <slot name="main" />
    </div>

    <div
      v-if="$slots.label && $slots.label()"
      slot="label"
    >
      <slot name="label" />
    </div>

    <div
      v-if="$slots.annotation && $slots.annotation()"
      slot="annotation"
    >
      <slot name="annotation" />
    </div>

    <div
      v-if="$slots.content && $slots.content()"
      slot="content"
    >
      <slot name="content" />
    </div>

    <div
      v-if="$slots.after && $slots.after()"
      slot="after"
    >
      <slot name="after" />
    </div>
  </y-core-collapse-item>
</template>

<script setup lang="ts">
  import '~core/ui/collapseItem'
  import {
    createVueCollapseItemProps,
    type IYVueCollapseItemProps,
    type IYVueCollapseItemEmits,
    type IYVueCoreCollapseItemProps,
  } from '~vue/ui/collapseItem/models/types'

  defineOptions({ name: 'YCollapseItem' })

  defineSlots<{
    before?: () => unknown
    avatar?: () => unknown
    main?: () => unknown
    label?: () => unknown
    annotation?: () => unknown
    content?: () => unknown
    after?: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IYVueCollapseItemProps>(),
    createVueCollapseItemProps(),
  ) satisfies IYVueCoreCollapseItemProps

  defineEmits<IYVueCollapseItemEmits>()
</script>
