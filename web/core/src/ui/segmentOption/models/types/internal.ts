export interface IYCoreSegmentOptionInternalProps {
  hovered: boolean | undefined
}

export const createCoreSegmentOptionInternalProps = (): IYCoreSegmentOptionInternalProps => {
  return { hovered: false }
}
