import {
  createCoreRatingExternalProps,
  type IAltCoreRatingExternalProps,
} from '~core/ui/rating/models/types'

export interface IAltNgRatingProps extends IAltCoreRatingExternalProps {
  name: string | undefined
}

export const createNgRatingProps = (): IAltNgRatingProps => ({
  ...createCoreRatingExternalProps(),
  name: undefined,
})
