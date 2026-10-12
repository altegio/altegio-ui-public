import type { MaskitoOptions } from '@maskito/core'
import { maskitoNumberOptionsGenerator, maskitoDateOptionsGenerator } from '@maskito/kit'

export const MASK_EXAMPLES: Record<string, MaskitoOptions> = {
  phone: { mask: ['+', '7', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/] } as MaskitoOptions,
  number: maskitoNumberOptionsGenerator({ thousandSeparator: ' ', precision: 2, max: 999999 }),
  date: maskitoDateOptionsGenerator({ mode: 'dd/mm/yyyy' }),
  card: { mask: [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/] } as MaskitoOptions,
}
