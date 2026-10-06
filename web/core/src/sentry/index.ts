/* import * as Sentry from '@sentry/browser' */
import { DEFAULT_SENTRY_CONFIG } from './config'
import type { BrowserOptions } from '@sentry/browser'

/* import { name } from '../../../../package.json' */
/* const packageName = name.replace(/\//g, '_') */

/* import { name } from '../../../../package.json' */
/* const packageName = name.replace(/\//g, '_') */

interface IErrorContext {
  componentName?: string
  errorInfo?: string
  framework: string
  [key: string]: unknown
}

/**
 * Проверяет, исходит ли ошибка от дизайн-системы
 * Смотрим только на первую строку стека, чтобы понять, где именно возникла ошибка, а не весь путь до нее
 */
// const isErrorFromDesignSystem = (stack?: string): boolean => {
//   if (!stack) return false
//
//   // Берем первую строку источника ошибки
//   const stackLines = stack.split('\n').slice(0, 3)
//   const topStackLines = stackLines.join('\n')
//
//   return topStackLines.includes(packageName)
// }

class DesignSystemSentry {
  private static instance: DesignSystemSentry | null = null
  private initialized = false

  static getInstance(): DesignSystemSentry {
    if (!DesignSystemSentry.instance) {
      DesignSystemSentry.instance = new DesignSystemSentry()
    }
    return DesignSystemSentry.instance
  }

  init(config: BrowserOptions = DEFAULT_SENTRY_CONFIG): void {
    if (this.initialized || !config.enabled) {
      return
    }

    // Sentry.init({
    //   ...config,
    //   beforeSend: (event, hint) => {
    //     const isFromDesignSystem = hint.originalException instanceof Error &&
    //       isErrorFromDesignSystem(hint.originalException.stack)
    //
    //     console.warn(
    //       `beforeSend by ${packageName}!`,
    //       'event',
    //       event,
    //       'hint',
    //       hint,
    //       'isFromDesignSystem',
    //       isFromDesignSystem,
    //     )
    //
    //     // Возвращаем событие только если ошибка исходит от дизайн-системы
    //     return isFromDesignSystem ? event : null
    //   },
    // })

    this.initialized = true
  }

  captureException(error: Error, context?: IErrorContext): void {
    console.warn(
      'captureException',
      error,
      context,
      this.initialized,
    )
    if (!this.initialized) return

    /* Sentry.withScope((scope) => { */
    /*  scope.setTag( */
    /*     'source',  */
    /*    'design-system',  */
    /*   ) */
    /*   if (context) { */
    /*     Object.entries(context).forEach(([ */
    /*       key, */
    /*       value, */
    /*     ]) => { */
    /*       scope.setExtra( */
    /*         key, */
    /*         value, */
    /*       ) */
    /*     }) */
    /*   } */
    /*   Sentry.captureException(error) */
    /* }) */
  }

  captureMessage(message: string, level = 'info'): void {
    console.warn(
      'captureMessage',
      message,
      level,
      this.initialized,
    )
    if (!this.initialized) return

    /* Sentry.captureMessage( */
    /*   message, */
    /* level, */
    /* ) */
  }
}

export const dsSentry = DesignSystemSentry.getInstance()
