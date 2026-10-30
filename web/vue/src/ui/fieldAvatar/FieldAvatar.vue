<template>
  <alt-core-field-avatar v-bind="props" />
</template>

<script setup lang="ts">
  import '~core/ui/fieldAvatar'
  import {
    createVueFieldAvatarProps,
    type IAltVueFieldAvatarProps,
    type IAltVueCoreFieldAvatarProps,
  } from '~vue/ui/fieldAvatar/models/types'

  defineOptions({ name: 'AltFieldAvatar' })

  const props = withDefaults(
    defineProps<IAltVueFieldAvatarProps>(),
    createVueFieldAvatarProps(),
  ) satisfies IAltVueCoreFieldAvatarProps
</script>
