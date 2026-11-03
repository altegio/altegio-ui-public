import type { TAltCountry } from '~shared/types/country'
import type { MaskitoMask, MaskitoMaskExpression } from '@maskito/core'

const COUNTRY_MASK_DIGIT_SYMBOL = 'x'
const COUNTRY_MASK_SEPARATE_SYMBOL = '?'
const RUSSIAN_COUNTRY_ID = 1
const RUSSIAN_PHONE_CODE_REG_EXP = /^(\+?7|8)/
const RUSSIAN_PHONE_FULL_REG_EXP = /^\+?\s*[78]\d\d\d\d\d\d\d\d\d\d$/

/**
 * Converts a country mask such as 'xxx xx-xx-xx' into an array like [/\d/, '-', ...]
 * @param countryMask {TAltCountry['mask']} - Country mask
 * @returns The mask as an array
 */
const transformCountryMaskToMaskitoMask = (countryMask: TAltCountry['mask']): (RegExp | string)[] => {
  return countryMask.split('').map((item) => item === COUNTRY_MASK_DIGIT_SYMBOL ? /\d/ : item)
}

/**
 * Converts the country mask into a Maskito mask
 * @param country {TAltCountry} - Country
 * @param withoutCode {boolean} - Whether to build the mask without the country code
 * @returns Dynamic Maskito mask
 */
export const getMaskitoMaskByCountry = (country: TAltCountry, withoutCode = false): MaskitoMask => {
  let countryMask: TAltCountry['mask'] = country.mask

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
 * @param country {TAltCountry} - Country
 * @returns RegExp for the country code
 */
const getPhoneCodeRegExp = (country: TAltCountry): RegExp => {
  if (country.id === RUSSIAN_COUNTRY_ID) return RUSSIAN_PHONE_CODE_REG_EXP

  return new RegExp('^\\+?' + country.code + '\\s*')
}

/**
 * @param country {TAltCountry} - Country
 * @returns RegExp for the number without the country code
 */
const getPhoneFullRegExp = (country: TAltCountry): RegExp => {
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
 * @param phoneWithPlus {string} - Phone number with a leading plus
 * @returns ID of the country matched by the phone code
 */
const matchCountryByCode = (phoneWithPlus: string, countries: TAltCountry[]): TAltCountry['id'] | null => {
  const countriesMatched = countries.filter((country) => getPhoneCodeRegExp(country).test(phoneWithPlus))

  return countriesMatched[0]?.id || null
}

/**
 * @param phoneWithPlus {string} - Phone number with a leading plus
 * @returns ID of the country matched by the number pattern without the code
 */
const matchCountryByTemplate = (phoneWithPlus: string, countries: TAltCountry[]): TAltCountry['id'] | null => {
  const countriesMatched = countries.filter((country) => getPhoneFullRegExp(country).test(phoneWithPlus))

  return countriesMatched[0]?.id || null
}

/**
 * Detects the country ID from a phone number
 * @param phoneWithPlus {string} - Phone number with a leading plus
 * @returns ID of the country matched by the phone code or by the number pattern without the code
 */
export const matchCountry = (phoneWithPlus: string, countries: TAltCountry[]): TAltCountry['id'] | null => {
  return matchCountryByTemplate(phoneWithPlus, countries) || matchCountryByCode(phoneWithPlus, countries)
}
