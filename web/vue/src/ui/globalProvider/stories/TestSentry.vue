<template>
  <div class="test-sentry">
    <YButton
      label="Synchronous error"
      @click="throwError"
    />

    <y-button @click="throwAsyncError">
      Asynchronous error
    </y-button>

    <y-button @click="throwRenderError">
      Rendering error
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
    throw new Error('Sample synchronous error from the TestSentry core component')
  }

  const throwAsyncError = async() => {
    try {
      await new Promise((_, reject) => {
        setTimeout(
          () => {
            reject(new Error('Sample asynchronous error from the TestSentry component'))
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
