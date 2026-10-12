import { type IYIcon } from '~shared/icons'

export interface IYCoreIconExternalProps {
  icon: IYIcon
  size: string | undefined
}

export const createCoreIconExternalProps = (): IYCoreIconExternalProps => {
  return {
    icon: {
      name: 'none' as IYIcon['name'],
      data: 'none',
    },
    size: '24px',
  }
}

