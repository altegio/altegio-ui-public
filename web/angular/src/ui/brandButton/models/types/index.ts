import {
  createCoreBrandButtonProps,
  type IAltCoreBrandButtonProps,
} from '~core/ui/brandButton/models/types'

import { type ClickEvent } from '~core/ui/brandButton/models/types/events'

export type TAltNgBrandButtonClickEvent = ClickEvent

export interface IAltNgBrandButtonProps extends IAltCoreBrandButtonProps {}

export const createNgBrandButtonProps = (): IAltNgBrandButtonProps => createCoreBrandButtonProps()
