// Example: building a reports table with the mapping helpers

import { computed, type Ref } from 'vue'
import { createSimpleTable, type ISimpleTableHeader } from './mappers'

// Example types (normally imported from the application)
interface TAcListItem {
  id: string
  name: string
  author: string
  lastReportUpdatedDate?: string
}

// Before: mapping every row by hand (40+ lines):
/*
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

    result.report = {label: 'report', ...item}

    result.actions = {
      id: `report-actions-${item.id}`,
      label: '',
      head: reportListTableColumnsNew.value.actions,
      report: item,
    }

    return result
  })
})
*/

// After: the mapping helpers (about 10 lines):

// 1. Define the columns once
const columns: ISimpleTableHeader[] = [
  {
    key: 'name',
    label: 'Name',
    sortable: true,
    gridTemplate: 'minmax(200px, 1fr)',
  },
  {
    key: 'author',
    label: 'Author',
    gridTemplate: '150px',
  },
  {
    key: 'lastReportUpdatedDate',
    label: 'Updated',
    gridTemplate: '180px',
  },
  {
    key: 'actions',
    label: '',
    gridTemplate: '100px',
  },
]

// 2. Convert the source data into plain rows
export function createReportsTableData(sortedList: Ref<TAcListItem[]>) {
  const simpleData = computed(() => {
    return sortedList.value.map((item) => ({
      id: item.id,
      name: item.name,
      author: item.author,
      lastReportUpdatedDate: item.lastReportUpdatedDate ?? '',
      // Keep the original object for the custom slot
      actions: { label: '', report: item },
      report: item, // kept for the row-inner slot
    }))
  })

  // 3. Generate the headers and items
  return computed(() => {
    return createSimpleTable(simpleData.value, columns, {
      rowIdField: 'id',
      autoEllipsis: true,
    })
  })
}

// Usage in a component:
/*
<template>
  <y-table
    :headers="tableData.headers"
    :items="tableData.items"
    class="reports-list__table-new"
    @sort="onSort"
  >
    <template #row-inner="{row}">
      <reports-list-row-new
        v-if="row.report"
        :report="row.report"
        @open:report="openReportAction"
        @delete:report="tryDeleteReport"
        @duplicate:report="tryDuplicateReport"
      />
    </template>
  </y-table>
</template>

<script setup>
import type { TableHeadCellSortEvent } from '~core/ui/tableHeadCell/models/types'

const tableData = createReportsTableData(sortedList)

const onSort = (payload: { headId: string; event: TableHeadCellSortEvent }) => {
  // Handle sorting
}
</script>
*/
