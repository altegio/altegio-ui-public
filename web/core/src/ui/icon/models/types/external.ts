import { type IAltIcon } from '~shared/icons'

export interface IAltCoreIconExternalProps {
  icon: IAltIcon
  size: string | undefined

  /** Accessible name of a meaningful icon; icons without one are decorative and hidden from assistive technologies */
  accessibleName: string | undefined
}

export const createCoreIconExternalProps = (): IAltCoreIconExternalProps => {
  return {
    icon: {
      name: 'none' as IAltIcon['name'],
      data: 'none',
    },
    size: '24px',
    accessibleName: undefined,
  }
}

