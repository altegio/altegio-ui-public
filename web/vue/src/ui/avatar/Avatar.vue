<template>
  <y-core-avatar v-bind="props" />
</template>

<script setup lang="ts">
  import '~core/ui/avatar'
  import {
    createVueAvatarProps,
    type IYVueAvatarProps,
    type IYVueCoreAvatarProps,
  } from '~vue/ui/avatar/models/types'

  defineOptions({ name: 'YAvatar' })

  const props = withDefaults(
    defineProps<IYVueAvatarProps>(),
    createVueAvatarProps(),
  ) satisfies IYVueCoreAvatarProps
</script>
