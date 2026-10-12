import type { TYCountry } from '~shared/types/country'
import type { MaskitoMask, MaskitoMaskExpression } from '@maskito/core/src/lib/types/mask'

const COUNTRY_MASK_DIGIT_SYMBOL = 'x'
const COUNTRY_MASK_SEPARATE_SYMBOL = '?'
const RUSSIAN_COUNTRY_ID = 1
const RUSSIAN_PHONE_CODE_REG_EXP = /^(\+?7|8)/
const RUSSIAN_PHONE_FULL_REG_EXP = /^\+?\s*[78]\d\d\d\d\d\d\d\d\d\d$/

/**
 * Преобразует маску переданной страны 'xxx xx-xx-xx' в массив формата [/\d/, '-',....]
 * @param countryMask {TYCountry['mask']} - Маска страны
 * @returns Преобразованная в массив маска
 */
const transformCountryMaskToMaskitoMask = (countryMask: TYCountry['mask']): (RegExp | string)[] => {
  return countryMask.split('').map((item) => item === COUNTRY_MASK_DIGIT_SYMBOL ? /\d/ : item)
}

/**
 * Преобразует маску переданной страны в формат для maskito
 * @param country {TYCountry} - Объект страны
 * @param withoutCode {boolean} - Флаг, который определяет, в каком виде отдавать маску - с кодом или без
 * @returns Динамическая маска для maskito
 */
export const getMaskitoMaskByCountry = (country: TYCountry, withoutCode = false): MaskitoMask => {
  let countryMask: TYCountry['mask'] = country.mask

  if (withoutCode) {
    const firstDigitIndex = countryMask.indexOf(COUNTRY_MASK_DIGIT_SYMBOL)
    countryMask = countryMask.slice(firstDigitIndex, countryMask.length)
  }

  const [mainMask = '', optionalMask = ''] = countryMask.split(COUNTRY_MASK_SEPARATE_SYMBOL)
  const maskitoMask = transformCountryMaskToMaskitoMask(mainMask)
  const optionalMaskitoMask = transformCountryMaskToMaskitoMask(optionalMask)

  return (elementState): MaskitoMaskExpression => {
    const digits = elementState.value.replace(/\D/g, '')
    const digitRegexElementsCount = maskitoMask.filter((item) => typeof item !== 'string').length

    if (digits.length > digitRegexElementsCount && optionalMaskitoMask.length) {
      return [...maskitoMask, ...optionalMaskitoMask]
    }

    return maskitoMask
  }
}

/**
 * @param country {TYCountry} - Объект страны
 * @returns RegExp для кода страны
 */
const getPhoneCodeRegExp = (country: TYCountry): RegExp => {
  if (country.id === RUSSIAN_COUNTRY_ID) return RUSSIAN_PHONE_CODE_REG_EXP

  return new RegExp('^\\+?' + country.code + '\\s*')
}

/**
 * @param country {TYCountry} - Объект страны
 * @returns RegExp для телефона без кода
 */
const getPhoneFullRegExp = (country: TYCountry): RegExp => {
  if (country.id === RUSSIAN_COUNTRY_ID) return RUSSIAN_PHONE_FULL_REG_EXP

  const toRegExpTemplate = (str: string): string => {
    let temp: string = str.replace(/[^x\d?]/ig, '')
    temp = temp.replace(/\?(x+)/, (_, found: string): string => {
      return '?' + found.split('').map(() => '\\d?')
        .join('')
    })
    temp = temp.replace(/x/ig, '\\d')
    temp = temp.replace(/\?|^\+/, '')
    temp = '^\\+?[\\s]*' + temp + '$'

    return temp
  }

  return new RegExp(toRegExpTemplate(country.mask))
}

/**
 * @param phoneWithPlus {string} - Номер телефона с плюсом
 * @returns ID страны, которая попала под условия фильтрации по коду
 */
const matchCountryByCode = (phoneWithPlus: string, countries: TYCountry[]): TYCountry['id'] | null => {
  const countriesMatched = countries.filter((country) => getPhoneCodeRegExp(country).test(phoneWithPlus))

  return countriesMatched[0]?.id || null
}

/**
 * @param phoneWithPlus {string} - Номер телефона с плюсом
 * @returns ID страны, которая попала под условия фильтрации по номеру телефона без кода
 */
const matchCountryByTemplate = (phoneWithPlus: string, countries: TYCountry[]): TYCountry['id'] | null => {
  const countriesMatched = countries.filter((country) => getPhoneFullRegExp(country).test(phoneWithPlus))

  return countriesMatched[0]?.id || null
}

/**
 * Метод, который по номеру телефона определяет ID страны
 * @param phoneWithPlus {string} - Номер телефона с плюсом
 * @returns ID страны, которая попала под условия фильтрации по коду или по номеру телефона без кода
 */
export const matchCountry = (phoneWithPlus: string, countries: TYCountry[]): TYCountry['id'] | null => {
  return matchCountryByTemplate(phoneWithPlus, countries) || matchCountryByCode(phoneWithPlus, countries)
}
