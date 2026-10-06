import type { ErrorHandler } from '@angular/core'
import { Injectable } from '@angular/core'
import { dsSentry } from '~core/sentry'

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {
    dsSentry.init()
  }

  handleError(error: Error): void {
    if (error instanceof Error) {
      dsSentry.captureException(
        error,
        { framework: 'angular' },
      )
    }
  }
}
