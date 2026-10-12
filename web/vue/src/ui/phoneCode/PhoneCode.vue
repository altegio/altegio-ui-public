<template>
  <y-core-phone-code
    v-bind="props"
    @click="$emit('click', $event)"
  />
</template>

<script setup lang="ts">
  import '~core/ui/phoneCode'
  import {
    createVuePhoneCodeProps,
    type IYVuePhoneCodeProps,
    type IYVuePhoneCodeEmits,
    type IYVueCorePhoneCodeProps,
  } from '~vue/ui/phoneCode/models/types'

  defineOptions({ name: 'YPhoneCode' })

  const props = withDefaults(
    defineProps<IYVuePhoneCodeProps>(),
    createVuePhoneCodeProps(),
  ) satisfies IYVueCorePhoneCodeProps

  defineEmits<IYVuePhoneCodeEmits>()
</script>
