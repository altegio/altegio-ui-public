export interface IYCorePaginationExternalProps {
  page: number | undefined
  itemsPerPage: number | undefined
  total: number | undefined
  disabled: boolean | undefined
}

export const createCorePaginationExternalProps = (): IYCorePaginationExternalProps => ({
  page: 1,
  itemsPerPage: 10,
  total: 0,
  disabled: false,
})
