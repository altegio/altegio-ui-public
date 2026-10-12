// Пример реального использования утилит маппинга
// Заменяет исходный код из вопроса пользователя

import { computed, type Ref } from 'vue'
import { createSimpleTable, type ISimpleTableHeader } from './mappers'

// Типы для примера (обычно импортируются из проекта)
interface TAcListItem {
  id: string
  name: string
  author: string
  lastReportUpdatedDate?: string
}

// СТАРЫЙ СПОСОБ (40+ строк кода):
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

// НОВЫЙ СПОСОБ (10 строк кода):

// 1. Определяем колонки один раз
const columns: ISimpleTableHeader[] = [
  {
    key: 'name',
    label: 'Название',
    sortable: true,
    gridTemplate: 'minmax(200px, 1fr)',
  },
  {
    key: 'author',
    label: 'Автор',
    gridTemplate: '150px',
  },
  {
    key: 'lastReportUpdatedDate',
    label: 'Дата обновления',
    gridTemplate: '180px',
  },
  {
    key: 'actions',
    label: '',
    gridTemplate: '100px',
  },
]

// 2. Преобразуем исходные данные в простой формат
export function createReportsTableData(sortedList: Ref<TAcListItem[]>) {
  const simpleData = computed(() => {
    return sortedList.value.map((item) => ({
      id: item.id,
      name: item.name,
      author: item.author,
      lastReportUpdatedDate: item.lastReportUpdatedDate ?? '',
      // Для кастомного слота сохраняем оригинальный объект
      actions: { label: '', report: item },
      report: item, // Сохраняем для слота row-inner
    }))
  })

  // 3. Автоматически генерируем headers и items
  return computed(() => {
    return createSimpleTable(simpleData.value, columns, {
      rowIdField: 'id',
      autoEllipsis: true,
    })
  })
}

// Использование в компоненте:
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
  // Обработка сортировки
}
</script>
*/
