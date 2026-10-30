<template>
  <alt-core-phone-code
    v-bind="props"
    @click="$emit('click', $event)"
  />
</template>

<script setup lang="ts">
  import '~core/ui/phoneCode'
  import {
    createVuePhoneCodeProps,
    type IAltVuePhoneCodeProps,
    type IAltVuePhoneCodeEmits,
    type IAltVueCorePhoneCodeProps,
  } from '~vue/ui/phoneCode/models/types'

  defineOptions({ name: 'AltPhoneCode' })

  const props = withDefaults(
    defineProps<IAltVuePhoneCodeProps>(),
    createVuePhoneCodeProps(),
  ) satisfies IAltVueCorePhoneCodeProps

  defineEmits<IAltVuePhoneCodeEmits>()
</script>
