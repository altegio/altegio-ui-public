import type { MaskitoOptions } from '@maskito/core'
import { maskitoNumber, maskitoDate } from '@maskito/kit'

export const MASK_EXAMPLES: Record<string, MaskitoOptions> = {
  phone: { mask: ['+', '7', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/] },
  number: maskitoNumber({ thousandSeparator: ' ', maximumFractionDigits: 2, max: 999999 }),
  date: maskitoDate({ mode: 'dd/mm/yyyy' }),
  card: { mask: [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/] },
}
