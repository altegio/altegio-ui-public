<template>
  <alt-core-form
    ref="coreForm"
    v-bind="props"
    @form-submit="$emit('submit', $event)"
    @form-invalid="$emit('validation-error', $event)"
    @form-reset="$emit('reset', $event)"
  >
    <form>
      <slot />
    </form>
  </alt-core-form>
</template>

<script lang="ts" setup>
  import { useTemplateRef } from 'vue'
  import '~core/ui/form'
  import type { AltCoreForm } from '~core/ui/form'
  import type { IAltCoreFormExternalProps } from '~core/ui/form/models/types'
  import {
    createVueFormProps,
    type IAltVueFormEmits,
    type IAltVueFormProps,
  } from '~vue/ui/form/models/types'

  defineOptions({ name: 'AltForm' })

  defineSlots<{ default?: () => unknown }>()

  const props = withDefaults(
    defineProps<IAltVueFormProps>(),
    createVueFormProps(),
  ) satisfies Partial<IAltCoreFormExternalProps>

  defineEmits<IAltVueFormEmits>()

  const coreForm = useTemplateRef<AltCoreForm>('coreForm')

  defineExpose({
    validate: async() => await coreForm.value?.validate() ?? false,
    resetValidation: () => { coreForm.value?.resetValidation() },
    submit: () => { coreForm.value?.submit() },
    reset: () => { coreForm.value?.reset() },
  })
</script>
