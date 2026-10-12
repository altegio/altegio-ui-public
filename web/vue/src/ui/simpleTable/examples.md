# Vue table mapping utilities

## Manual mapping

Mapping plain application data to the table’s cell structure manually can require repetitive code:

```typescript
// Build table rows and cells manually
const sortedListNew = computed((): IYVueTableItem[] => {
  return sortedList.value.map(item => {
    const result: IYVueTableItem = {
      rowId: item.id,
    }

    result.name = {
      id: `report-name-${item.id}`,
      label: item.name,
      head: reportListTableColumnsNew.value.name,
      report: item,
    }

    result.author = {
      id: `report-author-${item.id}`,
      label: item.author,
      head: reportListTableColumnsNew.value.author,
    }

    result.lastReportUpdatedDate = {
      id: `report-lastReportUpdatedDate-${item.id}`,
      label: item.lastReportUpdatedDate ?? '',
      head: reportListTableColumnsNew.value.lastReportUpdatedDate,
      report: item,
    }

    result.actions = {
      id: `report-actions-${item.id}`,
      label: '',
      head: reportListTableColumnsNew.value.actions,
      report: item,
    }

    return result
  })
})
```

## Use the mapping utilities

The `~vue` alias in these examples is configured inside this repository. For other projects, use an import path supported by your build setup. The snippets assume your application provides `sortedList` and the report event handlers.

### Basic example

```vue
<template>
  <y-table
    :headers="tableHeaders"
    :items="tableItems"
    @sort="onSort"
  >
    <template #row-inner="{ row }">
      <reports-list-row-new
        v-if="row.actions?.report"
        :report="row.actions.report"
        @open:report="openReportAction"
        @delete:report="tryDeleteReport"
        @duplicate:report="tryDuplicateReport"
      />
    </template>
  </y-table>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createSimpleTable, type ISimpleTableHeader } from '~vue/ui/table/utils/mappers'

// Define the columns
const columns: ISimpleTableHeader[] = [
  { key: 'name', label: 'Name', sortable: true, gridTemplate: 'minmax(200px, 1fr)' },
  { key: 'author', label: 'Author', gridTemplate: '150px' },
  { key: 'lastReportUpdatedDate', label: 'Last updated', gridTemplate: '180px' },
  { key: 'actions', label: '', gridTemplate: '100px' }
]

// Map your application data to plain rows
const simpleData = computed(() => {
  return sortedList.value.map(item => ({
    id: item.id,
    name: item.name,
    author: item.author,
    lastReportUpdatedDate: item.lastReportUpdatedDate ?? '',
    // Add cell properties for custom content
    actions: { label: '', report: item },
  }))
})

// Convert the rows to the table format
const table = computed(() => createSimpleTable(simpleData.value, columns, {
  rowIdField: 'id',
  autoEllipsis: true
}))
const tableHeaders = computed(() => table.value.headers)
const tableItems = computed(() => table.value.items)
</script>
```

### Generate columns automatically

```typescript
import { createHeadersFromObject } from '~vue/ui/table/utils/mappers'

// Generate columns from the first data object
const columns = computed(() => {
  if (simpleData.value.length === 0) return []

  const { id, ...cellData } = simpleData.value[0]
  return createHeadersFromObject(cellData, {
    // Override the properties you need
    name: { label: 'Report name', sortable: true, gridTemplate: 'minmax(200px, 1fr)' },
    author: { label: 'Report author', gridTemplate: '150px' },
    lastReportUpdatedDate: { label: 'Last updated', gridTemplate: '180px' },
    actions: { label: 'Actions', sortable: false, gridTemplate: '100px' }
  })
})
```

### Mapping options

```typescript
import type { ITableMappingOptions } from '~vue/ui/table/utils/mappers'

const mappingOptions: ITableMappingOptions = {
  // Field used for rowId (defaults to 'id')
  rowIdField: 'id',

  // Generate row IDs when the ID field is absent
  generateRowId: (_, index) => `report-${index}`,

  // Generate cell IDs
  generateCellId: (rowId, columnKey, value) => `${rowId}-${columnKey}`,

  // Enable ellipsis for string values longer than 50 characters
  autoEllipsis: true
}

const table = computed(() => createSimpleTable(
  simpleData.value,
  columns.value,
  mappingOptions
))
const headers = computed(() => table.value.headers)
const items = computed(() => table.value.items)
```

### Object-valued cells

Pass an object as a cell value to provide a label and additional rendering properties:

```typescript
const simpleData = computed(() => {
  return sortedList.value.map(item => ({
    id: item.id,
    name: item.name,
    author: item.author,
    // A cell with additional data
    status: {
      label: item.status,
      status: item.isActive,
      ellipsis: false,
      // Additional properties for custom rendering
      customData: item
    },
    actions: { 
      label: '',
      report: item,
      align: 'center'
    }
  }))
})
```

### Use the mapping functions directly

Map headers and rows separately when you need more control:

```typescript
import { mapHeaders, mapTableData } from '~vue/ui/table/utils/mappers'

const tableHeaders = computed(() => mapHeaders(columns.value))

const tableItems = computed(() => mapTableData(
  simpleData.value,
  columns.value,
  { autoEllipsis: true }
))
```

## Utility API

### `createSimpleTable(data, columns, options?)`
Returns `{ headers, items }` in the table’s expected format.

### `mapHeaders(columns)`
Converts column definitions into table headers.

### `mapTableData(data, columns, options?)`
Converts plain rows into table items.

### `createHeadersFromObject(sample, overrides?)`
Creates a column for each key in a sample object, with optional property overrides.

## Types

- `ISimpleTableRow` - plain data row
- `ISimpleTableHeader` - column definition
- `ITableMappingOptions` - mapping options

## Code size

**Manual mapping**: about 40 lines to map the example data
**Mapping utilities**: about 10 lines for the equivalent mapping

## Integration notes

- Row IDs use `rowIdField` when present; otherwise they are generated. Cell IDs are generated automatically.
- The mapped data uses the existing table structure, including headers and cell objects.
- Row selection uses `rowId`.
- Use the table’s existing slots and events to render and interact with mapped cells.
- The utilities can be used alongside manual table data mapping.
- No changes to the `YTable` component are required.
