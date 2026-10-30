<template>
  <alt-core-global-provider
    v-bind="props"
    @ready="handleReady"
  >
    <slot />
  </alt-core-global-provider>
</template>

<script setup lang="ts">
  import { provide, ref, onMounted } from 'vue'
  import '~core/ui/globalProvider'
  import {
    createVueGlobalProviderProps,
    type IAltVueGlobalProviderProps,
    type IAltVueGlobalProviderEmits,
    type IAltVueCoreGlobalProviderProps,
  } from '~vue/ui/globalProvider/models/types'
  import {
    type GlobalProviderReadyEvent,
  } from '~core/ui/globalProvider/models/types'
  import {
    type IGlobalContext,
  } from '~core/ui/globalProvider/context'

  /* import { SentryPlugin } from '~vue/plugins/sentry' */

  defineOptions({ name: 'AltGlobalProvider' })

  defineSlots<{
    default: () => unknown
  }>()

  const globalContext = ref<IGlobalContext>()

  const emit = defineEmits<IAltVueGlobalProviderEmits>()

  const props = withDefaults(
    defineProps<IAltVueGlobalProviderProps>(),
    createVueGlobalProviderProps(),
  ) satisfies IAltVueCoreGlobalProviderProps

  provide(
    'globalContext',
    globalContext,
  )

  const handleReady = (event: GlobalProviderReadyEvent) => {
    globalContext.value = event.detail.value

    emit(
      'ready',
      event,
    )
  }

  onMounted(() => {

    /* const app = getCurrentInstance()?.appContext.app */
    /* if (app) { */
    /*  SentryPlugin.install(app) */
    /* } */
  })
</script>
