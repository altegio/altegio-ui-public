<template>
  <div class="test-sentry">
    <YButton
      label="Синхронная ошибка"
      @click="throwError"
    />

    <y-button @click="throwAsyncError">
      Асинхронная ошибка
    </y-button>

    <y-button @click="throwRenderError">
      Ошибка рендеринга
    </y-button>

    <!-- <div v-if="shouldRenderError">
      {{ nonExistentVariable.someProperty }}
    </div> -->
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { YButton } from '~vue/ui/button'

  defineOptions({ name: 'TestSentry' })

  const shouldRenderError = ref(false)

  const throwError = () => {
    throw new Error('Тестовая синхронная ошибка из TestSentry компонента from core')
  }

  const throwAsyncError = async() => {
    try {
      await new Promise((_, reject) => {
        setTimeout(
          () => {
            reject(new Error('Тестовая асинхронная ошибка из TestSentry компонента'))
          },
          100,
        )
      })
    } catch(error) {
      if (error instanceof Error) {
        throw error
      }
    }
  }

  const throwRenderError = () => {
    shouldRenderError.value = true
  }
</script>

  <style>
  .test-sentry {
    display: flex;
    gap: 16px;
  }
  </style>
