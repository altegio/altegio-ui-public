<template>
  <y-core-global-provider
    v-bind="props"
    @ready="handleReady"
  >
    <slot />
  </y-core-global-provider>
</template>

<script setup lang="ts">
  import { provide, ref, onMounted } from 'vue'
  import '~core/ui/globalProvider'
  import {
    createVueGlobalProviderProps,
    type IYVueGlobalProviderProps,
    type IYVueGlobalProviderEmits,
    type IYVueCoreGlobalProviderProps,
  } from '~vue/ui/globalProvider/models/types'
  import {
    type GlobalProviderReadyEvent,
  } from '~core/ui/globalProvider/models/types'
  import {
    type IGlobalContext,
  } from '~core/ui/globalProvider/context'

  /* import { SentryPlugin } from '~vue/plugins/sentry' */

  defineOptions({ name: 'YGlobalProvider' })

  defineSlots<{
    default: () => unknown
  }>()

  const globalContext = ref<IGlobalContext>()

  const emit = defineEmits<IYVueGlobalProviderEmits>()

  const props = withDefaults(
    defineProps<IYVueGlobalProviderProps>(),
    createVueGlobalProviderProps(),
  ) satisfies IYVueCoreGlobalProviderProps

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
