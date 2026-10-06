import { ru } from './locale/ru'
import { en } from './locale/en'
import type { ILocale } from './types'

type TLocale = 'ru-RU' | 'en-US'

/**
 * Объект со всеми доступными локализациями
 */
export const locales: Record<TLocale, ILocale> = {
  'ru-RU': ru,
  'en-US': en,
}
