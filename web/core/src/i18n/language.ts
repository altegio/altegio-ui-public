import type { ILocale } from './types'
import { en, ru } from './locale'

/**
 * Content language of an element: the nearest `lang` attribute, then the page and browser language
 * @param element Element whose language is resolved
 */
export const resolveLanguage = (element: Element): string => {
  const language = element.closest('[lang]')?.getAttribute('lang') || document.documentElement.lang || navigator.language

  return language.trim().replace('_', '-') || en.code
}

/**
 * Base language subtag, e.g. `hu` for `hu-HU`
 * @param language BCP 47 language tag
 */
export const getLanguageShortCode = (language: string): string => language.split('-')[0].toLowerCase()

/**
 * Built-in locale for a language: Russian for `ru`, English for any other language
 * @param language BCP 47 language tag
 */
export const resolveLocale = (language: string): ILocale => {
  return getLanguageShortCode(language) === ru.shortCode ? ru : en
}
