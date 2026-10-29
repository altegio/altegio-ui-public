import { ru } from './locale/ru'
import { en } from './locale/en'
import type { ILocale } from './types'

type TLocale = 'ru-RU' | 'en-US'

/**
 * All available locales
 */
export const locales: Record<TLocale, ILocale> = {
  'ru-RU': ru,
  'en-US': en,
}
