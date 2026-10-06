<template>
  <y-core-field-avatar v-bind="props" />
</template>

<script setup lang="ts">
  import '~core/ui/fieldAvatar'
  import {
    createVueFieldAvatarProps,
    type IYVueFieldAvatarProps,
    type IYVueCoreFieldAvatarProps,
  } from '~vue/ui/fieldAvatar/models/types'

  defineOptions({ name: 'YFieldAvatar' })

  const props = withDefaults(
    defineProps<IYVueFieldAvatarProps>(),
    createVueFieldAvatarProps(),
  ) satisfies IYVueCoreFieldAvatarProps
</script>
