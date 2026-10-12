import type { TYVueTableHeaders, TYVueTableItems, IYVueTableItem, TYVueTableCellItem, IYVueTableHeadItem } from '../models/types'

/**
 * Простой интерфейс для данных строки таблицы
 */
export interface ISimpleTableRow {
  [key: string]: unknown
  id?: string | number
}

/**
 * Простой интерфейс для заголовков таблицы
 */
export interface ISimpleTableHeader {
  key: string
  label: string
  sortable?: IYVueTableHeadItem['sortable']
  align?: IYVueTableHeadItem['align']
  gridTemplate?: IYVueTableHeadItem['gridTemplate']
  ellipsis?: IYVueTableHeadItem['ellipsis']
  lineclamp?: IYVueTableHeadItem['lineclamp']
}

/**
 * Опции для маппинга данных
 */
export interface ITableMappingOptions {

  /** Поле для использования в качестве rowId. По умолчанию 'id' */
  rowIdField?: string

  /** Функция для генерации ID строки, если поле rowIdField отсутствует */
  generateRowId?: (row: ISimpleTableRow, index: number) => string

  /** Функция для генерации ID ячейки */
  generateCellId?: (rowId: string, columnKey: string, value: unknown) => string

  /** Автоматически добавить ellipsis для строковых значений */
  autoEllipsis?: boolean
}

/**
 * Преобразует простые заголовки в формат таблицы
 */
export function mapHeaders(headers: ISimpleTableHeader[]): TYVueTableHeaders {
  const result: TYVueTableHeaders = {}

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
 * Проверяет является ли значение примитивом
 */
function isPrimitive(value: unknown): value is string | number | boolean | null | undefined {
  return value === null || value === undefined || typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'
}

/**
 * Создает ячейку для примитивного значения
 */
function createPrimitiveCell(
  value: string | number | boolean | null | undefined,
  cellId: string,
  header: TYVueTableHeaders[string],
  autoEllipsis: boolean,
): TYVueTableCellItem {
  const cellItem: TYVueTableCellItem = {
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
 * Создает ячейку для объекта
 */
function createObjectCell(
  value: unknown,
  cellId: string,
  header: TYVueTableHeaders[string],
): TYVueTableCellItem {
  return {
    id: cellId,
    head: header,
    ...(value as Record<string, unknown>),
  }
}

/**
 * Создает строку таблицы из простых данных
 */
function createTableRow(
  row: ISimpleTableRow,
  index: number,
  headers: ISimpleTableHeader[],
  headerMap: TYVueTableHeaders,
  options: Required<ITableMappingOptions>,
): IYVueTableItem {
  const { rowIdField, generateRowId, generateCellId, autoEllipsis } = options
  const rowId = row[rowIdField]?.toString() ?? generateRowId(row, index)
  const tableItem: IYVueTableItem = { rowId }

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
 * Преобразует простые данные в формат таблицы
 */
export function mapTableData(
  data: ISimpleTableRow[],
  headers: ISimpleTableHeader[],
  options: ITableMappingOptions = {},
): TYVueTableItems {
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
 * Упрощенная функция для создания таблицы из простых данных
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
 * Создает заголовок по ключу
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
 * Утилита для быстрого создания заголовков из объекта
 */
export function createHeadersFromObject<T extends Record<string, unknown>>(
  sample: T,
  overrides: Partial<Record<keyof T, Partial<ISimpleTableHeader>>> = {},
): ISimpleTableHeader[] {
  return Object.keys(sample).map((key) => createHeaderFromKey(key, overrides))
}
