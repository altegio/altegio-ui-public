<template>
  <alt-core-avatar v-bind="props" />
</template>

<script setup lang="ts">
  import '~core/ui/avatar'
  import {
    createVueAvatarProps,
    type IAltVueAvatarProps,
    type IAltVueCoreAvatarProps,
  } from '~vue/ui/avatar/models/types'

  defineOptions({ name: 'AltAvatar' })

  const props = withDefaults(
    defineProps<IAltVueAvatarProps>(),
    createVueAvatarProps(),
  ) satisfies IAltVueCoreAvatarProps
</script>
