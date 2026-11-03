export interface IAltCoreSegmentOptionInternalProps {
  hovered: boolean | undefined
}

export const createCoreSegmentOptionInternalProps = (): IAltCoreSegmentOptionInternalProps => {
  return { hovered: false }
}
