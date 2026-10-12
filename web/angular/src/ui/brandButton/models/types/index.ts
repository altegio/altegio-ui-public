import {
  createCoreBrandButtonProps,
  type IYCoreBrandButtonProps,
} from '~core/ui/brandButton/models/types'

import { type ClickEvent } from '~core/ui/brandButton/models/types/events'

export type TYNgBrandButtonClickEvent = ClickEvent

export interface IYNgBrandButtonProps extends IYCoreBrandButtonProps {}

export const createNgBrandButtonProps = (): IYNgBrandButtonProps => createCoreBrandButtonProps()
