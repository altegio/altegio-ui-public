import { en } from './locale'
import { resolveLanguage, resolveLocale } from './language'
import type { ILocale } from './types'

/**
 * Localized message of a built-in locale, falling back to English
 * @param key Message key
 * @param locale Locale to read the message from
 * @returns {string} The message
 */
export const getLocaleMessage = (key: string, locale: ILocale): string => {
  const messages: Partial<ILocale['messages']> = locale.messages
  const fallbackMessages: Partial<ILocale['messages']> = en.messages

  return messages[key] ?? fallbackMessages[key] ?? key
}

/**
 * Localized message for an element that does not take its locale from the GlobalProvider:
 * the language comes from the nearest `lang` attribute, then the page and browser language
 * @param key Message key
 * @param element Element the message is shown in
 * @returns {string} The message
 */
export const getElementMessage = (key: string, element: Element): string => getLocaleMessage(
  key,
  resolveLocale(resolveLanguage(element)),
)
