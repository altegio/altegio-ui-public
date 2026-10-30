import { createCoreChipProps, type IAltCoreChipProps } from '~core/ui/chip/models/types'

export interface IAltNgChipProps extends IAltCoreChipProps {}

export interface IAltNgChipEmits {
  click: (value: PointerEvent) => void
}

export const createNgChipProps = (): IAltNgChipProps => createCoreChipProps()
