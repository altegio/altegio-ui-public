import type { App, ComponentPublicInstance } from 'vue'
import { dsSentry } from '~core/sentry'

type ErrorHandlerInstance = ComponentPublicInstance | null

export const SentryPlugin = {
  install(app: App) {
    console.info('[SentryPlugin] install')
    dsSentry.init()

    app.config.errorHandler = (error: unknown, instance: ErrorHandlerInstance, info: string) => {
      if (error instanceof Error) {
        dsSentry.captureException(
          error,
          {
            componentName: instance?.$options.name,
            errorInfo: info,
            framework: 'vue',
          },
        )

        throw error
      }
    }
  },
}
