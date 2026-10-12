import {
  type IYCoreFieldWrapperProps,
  createCoreFieldWrapperProps,
} from '~core/ui/fieldWrapper/models/types'
import {
  type IYCoreIconProps,
  createCoreIconProps,
} from '~core/ui/icon/models/types'

export interface IYCoreFieldIconExternalProps extends
  Pick<IYCoreFieldWrapperProps, 'disabled' | 'size' | 'readonly'>,
  Pick<IYCoreIconProps, 'icon'> {
  hoverable: boolean | undefined
  clickable: boolean | undefined
  locator?: string
}

export const createCoreFieldIconExternalProps = (): IYCoreFieldIconExternalProps => {
  const { disabled, size, readonly } = createCoreFieldWrapperProps()
  const { icon } = createCoreIconProps()

  return {
    disabled,
    readonly,
    size,
    icon,
    hoverable: false,
    clickable: false,
  }
}
