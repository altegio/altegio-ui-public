import { type IAltIcon } from '~shared/icons'

export interface IAltCoreIconExternalProps {
  icon: IAltIcon
  size: string | undefined
}

export const createCoreIconExternalProps = (): IAltCoreIconExternalProps => {
  return {
    icon: {
      name: 'none' as IAltIcon['name'],
      data: 'none',
    },
    size: '24px',
  }
}

