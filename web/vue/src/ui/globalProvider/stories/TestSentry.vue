<template>
  <div class="test-sentry">
    <AltButton
      label="Synchronous error"
      @click="throwError"
    />

    <alt-button @click="throwAsyncError">
      Asynchronous error
    </alt-button>

    <alt-button @click="throwRenderError">
      Rendering error
    </alt-button>

    <!-- <div v-if="shouldRenderError">
      {{ nonExistentVariable.someProperty }}
    </div> -->
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { AltButton } from '~vue/ui/button'

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
