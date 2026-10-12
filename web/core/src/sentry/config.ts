import { version } from '../../../../package.json'
import type { BrowserOptions } from '@sentry/browser'

export const DEFAULT_SENTRY_CONFIG: BrowserOptions = {
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  enabled: import.meta.env.VITE_SENTRY_ENABLED === 'true',
  release: `${import.meta.env.VITE_SENTRY_PROJECT}@${version}`,
  tracesSampleRate: Number(import.meta.env.VITE_SENTRY_TRACES_SAMPLE_RATE),
}
