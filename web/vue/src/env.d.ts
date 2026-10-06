/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SENTRY_DSN: string
  readonly VITE_SENTRY_ENABLED: string
  readonly VITE_SENTRY_ORG: string
  readonly VITE_SENTRY_PROJECT: string
  readonly VITE_SENTRY_AUTH_TOKEN: string
  readonly VITE_SENTRY_URL: string
  readonly VITE_SENTRY_TRACES_SAMPLE_RATE: string
  readonly MODE: string
  readonly PROD: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
