import { createCoreChipProps, type IYCoreChipProps } from '~core/ui/chip/models/types'

export interface IYNgChipProps extends IYCoreChipProps {}

export interface IYNgChipEmits {
  click: (value: PointerEvent) => void
}

export const createNgChipProps = (): IYNgChipProps => createCoreChipProps()
