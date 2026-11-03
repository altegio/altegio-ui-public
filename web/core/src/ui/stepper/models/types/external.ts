import type { TAltCoreStepName } from '~core/ui/step/models/types'

export enum EAltCoreStepperOrientation {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

export type TAltCoreStepperOrientation = `${EAltCoreStepperOrientation}`

export interface IAltCoreStepperExternalProps {
  value: TAltCoreStepName | undefined
  orientation: TAltCoreStepperOrientation | undefined
  headerNav: boolean | undefined
  accessibleName: string | undefined
}

export const createCoreStepperExternalProps = (): IAltCoreStepperExternalProps => ({
  value: undefined,
  orientation: EAltCoreStepperOrientation.HORIZONTAL,
  headerNav: false,
  accessibleName: undefined,
})
