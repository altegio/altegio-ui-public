import type { TAltVueTableHeaders, TAltVueTableItems, IAltVueTableItem, TAltVueTableCellItem, IAltVueTableHeadItem } from '../models/types'

/**
 * Plain table row data
 */
export interface ISimpleTableRow {
  [key: string]: unknown
  id?: string | number
}

/**
 * Plain table header definition
 */
export interface ISimpleTableHeader {
  key: string
  label: string
  sortable?: IAltVueTableHeadItem['sortable']
  align?: IAltVueTableHeadItem['align']
  gridTemplate?: IAltVueTableHeadItem['gridTemplate']
  ellipsis?: IAltVueTableHeadItem['ellipsis']
  lineclamp?: IAltVueTableHeadItem['lineclamp']
}

/**
 * Data mapping options
 */
export interface ITableMappingOptions {

  /** Field used as the rowId. Defaults to 'id' */
  rowIdField?: string

  /** Generates the row ID when the rowIdField value is missing */
  generateRowId?: (row: ISimpleTableRow, index: number) => string

  /** Generates the cell ID */
  generateCellId?: (rowId: string, columnKey: string, value: unknown) => string

  /** Adds ellipsis to string values automatically */
  autoEllipsis?: boolean
}

/**
 * Converts plain headers into the table header format
 */
export function mapHeaders(headers: ISimpleTableHeader[]): TAltVueTableHeaders {
  const result: TAltVueTableHeaders = {}

  headers.forEach((header) => {
    result[header.key] = {
      id: header.key,
      label: header.label,
      sortable: header.sortable ?? false,
      align: header.align ?? 'left',
      gridTemplate: header.gridTemplate ?? 'auto',
      ellipsis: header.ellipsis,
      lineclamp: header.lineclamp,
    }
  })

  return result
}

/**
 * Checks whether a value is a primitive
 */
function isPrimitive(value: unknown): value is string | number | boolean | null | undefined {
  return value === null || value === undefined || typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'
}

/**
 * Creates a cell for a primitive value
 */
function createPrimitiveCell(
  value: string | number | boolean | null | undefined,
  cellId: string,
  header: TAltVueTableHeaders[string],
  autoEllipsis: boolean,
): TAltVueTableCellItem {
  const cellItem: TAltVueTableCellItem = {
    id: cellId,
    label: value?.toString() ?? '',
    head: header,
  }

  if (autoEllipsis && typeof value === 'string' && value.length > 50) {
    cellItem.ellipsis = true
  }

  return cellItem
}

/**
 * Creates a cell for an object value
 */
function createObjectCell(
  value: unknown,
  cellId: string,
  header: TAltVueTableHeaders[string],
): TAltVueTableCellItem {
  return {
    id: cellId,
    head: header,
    ...(value as Record<string, unknown>),
  }
}

/**
 * Creates a table row from plain data
 */
function createTableRow(
  row: ISimpleTableRow,
  index: number,
  headers: ISimpleTableHeader[],
  headerMap: TAltVueTableHeaders,
  options: Required<ITableMappingOptions>,
): IAltVueTableItem {
  const { rowIdField, generateRowId, generateCellId, autoEllipsis } = options
  const rowId = row[rowIdField]?.toString() ?? generateRowId(row, index)
  const tableItem: IAltVueTableItem = { rowId }

  headers.forEach((header) => {
    const value = row[header.key]
    const cellId = generateCellId(rowId, header.key, value)

    if (isPrimitive(value)) {
      tableItem[header.key] = createPrimitiveCell(value, cellId, headerMap[header.key], autoEllipsis)
    } else {
      tableItem[header.key] = createObjectCell(value, cellId, headerMap[header.key])
    }
  })

  return tableItem
}

/**
 * Converts plain data into the table format
 */
export function mapTableData(
  data: ISimpleTableRow[],
  headers: ISimpleTableHeader[],
  options: ITableMappingOptions = {},
): TAltVueTableItems {
  const defaultOptions: Required<ITableMappingOptions> = {
    rowIdField: 'id',
    generateRowId: (_, index) => `row-${index}`,
    generateCellId: (rowId, columnKey) => `${rowId}-${columnKey}`,
    autoEllipsis: false,
    ...options,
  }

  const headerMap = mapHeaders(headers)

  return data.map((row, index) => createTableRow(row, index, headers, headerMap, defaultOptions))
}

/**
 * Shortcut that builds a table from plain data
 */
export function createSimpleTable(
  data: ISimpleTableRow[],
  headers: ISimpleTableHeader[],
  options?: ITableMappingOptions,
) {
  return {
    headers: mapHeaders(headers),
    items: mapTableData(data, headers, options),
  }
}

/**
 * Creates a header from an object key
 */
function createHeaderFromKey<T extends Record<string, unknown>>(
  key: string,
  overrides: Partial<Record<keyof T, Partial<ISimpleTableHeader>>>,
): ISimpleTableHeader {
  const override = overrides[key] || {}
  const defaultLabel = key.charAt(0).toUpperCase() + key.slice(1)

  return {
    key,
    label: override.label ?? defaultLabel,
    sortable: override.sortable ?? true,
    align: override.align ?? 'left',
    gridTemplate: override.gridTemplate ?? 'auto',
    ...override,
  }
}

/**
 * Builds headers from an object's keys
 */
export function createHeadersFromObject<T extends Record<string, unknown>>(
  sample: T,
  overrides: Partial<Record<keyof T, Partial<ISimpleTableHeader>>> = {},
): ISimpleTableHeader[] {
  return Object.keys(sample).map((key) => createHeaderFromKey(key, overrides))
}
