export interface IAltCorePaginationExternalProps {
  page: number | undefined
  itemsPerPage: number | undefined
  total: number | undefined
  disabled: boolean | undefined
}

export const createCorePaginationExternalProps = (): IAltCorePaginationExternalProps => ({
  page: 1,
  itemsPerPage: 10,
  total: 0,
  disabled: false,
})
