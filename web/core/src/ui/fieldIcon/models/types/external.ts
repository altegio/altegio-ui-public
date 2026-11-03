import {
  type IAltCoreFieldWrapperProps,
  createCoreFieldWrapperProps,
} from '~core/ui/fieldWrapper/models/types'
import {
  type IAltCoreIconProps,
  createCoreIconProps,
} from '~core/ui/icon/models/types'

export interface IAltCoreFieldIconExternalProps extends
  Pick<IAltCoreFieldWrapperProps, 'disabled' | 'size' | 'readonly'>,
  Pick<IAltCoreIconProps, 'icon'> {
  hoverable: boolean | undefined
  clickable: boolean | undefined
  locator?: string

  /** Name of the action the icon performs; makes it a button for assistive technology, outside the tab order */
  accessibleName: string | undefined
}

export const createCoreFieldIconExternalProps = (): IAltCoreFieldIconExternalProps => {
  const { disabled, size, readonly } = createCoreFieldWrapperProps()
  const { icon } = createCoreIconProps()

  return {
    disabled,
    readonly,
    size,
    icon,
    hoverable: false,
    clickable: false,
    accessibleName: undefined,
  }
}
