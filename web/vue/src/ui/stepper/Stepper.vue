<template>
  <alt-core-stepper
    ref="coreStepperRef"
    v-bind="coreProps"
    :value="props.modelValue"
    @change="handleChange"
  >
    <slot />
  </alt-core-stepper>
</template>

<script lang="ts" setup>
  import { omit } from 'radash'
  import { computed, ref } from 'vue'
  import '~core/ui/stepper'
  import type { AltCoreStepper } from '~core/ui/stepper'
  import type { StepperChangeEvent } from '~core/ui/stepper/models/types'
  import {
    createVueStepperProps,
    type IAltVueStepperEmits,
    type IAltVueStepperProps,
  } from '~vue/ui/stepper/models/types'

  defineOptions({ name: 'AltStepper' })

  defineSlots<{
    default?: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IAltVueStepperProps>(),
    createVueStepperProps(),
  )

  const emit = defineEmits<IAltVueStepperEmits>()

  const coreStepperRef = ref<AltCoreStepper>()

  const coreProps = computed(() => omit(props, ['modelValue']))

  const handleChange = (event: Event) => {
    // The component event replaces the native one, which would otherwise also reach ancestor `change` listeners
    event.stopPropagation()
    emit('update:modelValue', (event as StepperChangeEvent).detail.value)
  }

  /** Opens the next step that is not disabled */
  const next = () => {
    coreStepperRef.value?.next()
  }

  /** Opens the previous step that is not disabled */
  const previous = () => {
    coreStepperRef.value?.previous()
  }

  defineExpose({ next, previous })
</script>
