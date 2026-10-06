# Упрощенный API для таблицы через утилиты маппинга

## Проблема

Текущее использование таблицы требует много шаблонного кода для преобразования простых данных:

```typescript
// Старый способ - много кода
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

## Решение: Утилиты маппинга

### Базовый пример

```vue
<template>
  <y-table
    :headers="tableHeaders"
    :items="tableItems"
    @sort="onSort"
  >
    <template #row-inner="{ row }">
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

<script setup lang="ts">
import { computed } from 'vue'
import { createSimpleTable, type ISimpleTableHeader } from '~vue/ui/table/utils/mappers'

// Простое определение колонок
const columns: ISimpleTableHeader[] = [
  { key: 'name', label: 'Название', sortable: true, gridTemplate: 'minmax(200px, 1fr)' },
  { key: 'author', label: 'Автор', gridTemplate: '150px' },
  { key: 'lastReportUpdatedDate', label: 'Дата обновления', gridTemplate: '180px' },
  { key: 'actions', label: '', gridTemplate: '100px' }
]

// Простые данные (ваши исходные объекты)
const simpleData = computed(() => {
  return sortedList.value.map(item => ({
    id: item.id,
    name: item.name,
    author: item.author,
    lastReportUpdatedDate: item.lastReportUpdatedDate ?? '',
    // Для кастомного контента можно добавить дополнительные поля
    actions: { label: '', report: item },
    // Сохраняем оригинальный объект для слота
    report: item
  }))
})

// Автоматическое преобразование в формат таблицы
const { headers: tableHeaders, items: tableItems } = computed(() => {
  return createSimpleTable(simpleData.value, columns, {
    rowIdField: 'id',
    autoEllipsis: true
  })
})
</script>
```

### Автоматическое создание колонок

```typescript
import { createHeadersFromObject } from '~vue/ui/table/utils/mappers'

// Автоматически создает колонки из первого объекта данных
const columns = computed(() => {
  if (simpleData.value.length === 0) return []
  
  return createHeadersFromObject(simpleData.value[0], {
    // Переопределяем только нужные свойства
    name: { label: 'Название отчета', sortable: true, gridTemplate: 'minmax(200px, 1fr)' },
    author: { label: 'Автор отчета', gridTemplate: '150px' },
    lastReportUpdatedDate: { label: 'Дата обновления', gridTemplate: '180px' },
    actions: { label: 'Действия', sortable: false, gridTemplate: '100px' }
  })
})
```

### Расширенные опции маппинга

```typescript
const mappingOptions = {
  // Поле для rowId (по умолчанию 'id')
  rowIdField: 'id',
  
  // Кастомная генерация ID для строк
  generateRowId: (row, index) => `report-${row.id}`,
  
  // Кастомная генерация ID для ячеек
  generateCellId: (rowId, columnKey, value) => `${rowId}-${columnKey}`,
  
  // Автоматически добавлять ellipsis для длинных строк
  autoEllipsis: true
}

const { headers, items } = computed(() => {
  return createSimpleTable(simpleData.value, columns.value, mappingOptions)
})
```

### Пример для сложных данных

Если у вас есть сложные данные в ячейках, вы можете передать объекты:

```typescript
const simpleData = computed(() => {
  return sortedList.value.map(item => ({
    id: item.id,
    name: item.name,
    author: item.author,
    // Сложная ячейка с дополнительными данными
    status: {
      label: item.status,
      status: item.isActive,
      ellipsis: false,
      // Любые дополнительные поля для кастомного рендеринга
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

### Прямое использование функций маппинга

Если нужен больший контроль, можно использовать функции напрямую:

```typescript
import { mapHeaders, mapTableData } from '~vue/ui/table/utils/mappers'

const tableHeaders = computed(() => mapHeaders(columns.value))

const tableItems = computed(() => mapTableData(
  simpleData.value,
  columns.value,
  { autoEllipsis: true }
))
```

## API утилит

### `createSimpleTable(data, columns, options?)`
Основная функция для преобразования простых данных в формат таблицы.

### `mapHeaders(columns)`
Преобразует простые заголовки в формат таблицы.

### `mapTableData(data, columns, options?)`
Преобразует данные в формат таблицы.

### `createHeadersFromObject(sample, overrides?)`
Автоматически создает заголовки из объекта-примера.

## Типы

- `ISimpleTableRow` - интерфейс для строки простых данных
- `ISimpleTableHeader` - интерфейс для заголовка
- `ITableMappingOptions` - опции маппинга

## Сравнение объема кода

**Старый способ**: ~40 строк кода для маппинга данных
**Новый способ**: ~10 строк кода

## Совместимость

- Все ID поля генерируются автоматически
- Плагины работают как раньше (Dragging и т.д.)
- Селекция строк работает через rowId
- Все слоты и события полностью поддерживаются
- Полная обратная совместимость с существующим API
- Никаких изменений в компоненте YTable 