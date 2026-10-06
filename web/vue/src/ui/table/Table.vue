<template>
  <y-core-table
    :disabled="disabled"
    :loading="loading"
    :plugins="plugins"
    :hide-head="hideHeader"
    :hide-bar="hideHeader"
    :style="computedStyles"
  >
    <y-core-skeleton-table
      slot="placeholder"
      :columns="skeletonColumns"
      :rows="itemsPerPage"
      :has-pagination="showPagination"
      :stripe="stripe"
      :hide-head="hideHeader"
      :hide-bar="hideHeader"
    />

    <y-core-table-row
      slot="head"
      :selectable="selectable"
      :sticky="sticky"
      :disabled="disabled"
    >
      <y-core-table-head-cell
        v-if="selectable"
        :sticky="sticky"
      >
        <y-core-simple-checkbox
          slot="cell"
          :checked="checkedAll"
          :indeterminate="indeterminateAll"
          :disabled="disabled"
          @checked="toggleAll"
        />
      </y-core-table-head-cell>

      <y-core-table-head-cell
        v-for="(headCell, headCellKey, headCellIndex) in headers"
        :key="`headCell-${headCellKey}`"
        :header="headCell"
        :header-label="headCell.headerLabel"
        :disabled="disabled || headCell.disabled"
        :align="headCell.align"
        :sticky="sticky && headCellIndex === 0"
        :bordered="sticky && headCellIndex === 0"
        :sortable="headCell.sortable"
        :sort-direction="headCell.sortDirection"
        :ellipsis="headCell.ellipsis"
        :lineclamp="headCell.lineclamp"
        .style="`${headCell.style}`"
        :has-hint="!!(headCell.hint || $slots[`head-hint-${headCellKey}`])"
        @sort="onSort(headCellKey, $event)"
      >
        <div
          v-if="headCell.hint || $slots[`head-hint-${headCellKey}`]"
          slot="hint"
        >
          <slot
            :name="`head-hint-${headCellKey}`"
            :hint="headCell.hint"
          >
            {{ headCell.hint }}
          </slot>
        </div>

        <div
          v-if="$slots[`head-cell-${headCellKey}`] || $slots['head-cell']"
          slot="cell"
        >
          <slot
            :name="`head-cell-${headCellKey}`"
            :item="headCell"
          >
            <slot
              name="head-cell"
              :item="headCell"
            />
          </slot>
        </div>
      </y-core-table-head-cell>
    </y-core-table-row>

    <y-core-table-bar slot="bar" />

    <template
      v-for="(row, rowIndex) in items"
      :key="row.rowKey ?? `row-${rowIndex}`"
    >
      <slot
        :name="`row-outer-${row.rowId}`"
        :row="row"
      >
        <slot
          name="row-outer"
          :row="row"
          :index="rowIndex"
        >
          <y-core-table-row
            slot="body"
            :data-group="row.group"
            :data-row-index="rowIndex"
            :data-row-id="row.rowId"
            :selectable="selectable"
            :stripe="stripe"
            :sticky="sticky"
            :disabled="disabled"
          >
            <slot
              :name="`row-inner-${row.rowId}`"
              :row="row"
            >
              <slot
                name="row-inner"
                :row="row"
                :index="rowIndex"
              >
                <y-core-table-cell
                  v-if="selectable"
                  :disabled="disabled"
                  :sticky="sticky"
                >
                  <y-core-simple-checkbox
                    slot="cell"
                    :checked="selected.includes(row.rowId)"
                    :disabled="disabled"
                    @checked="toggleRow(row)"
                  />
                </y-core-table-cell>

                <template
                  v-for="(headCell, headCellKey, headCellIndex) in headers"
                  :key="`row-${rowIndex}-cell-${headCellIndex}`"
                >
                  <slot
                    :name="`cell-outer-col-${headCellKey}`"
                    :cell="row[headCellKey]"
                    :row="row"
                  >
                    <slot
                      name="cell-outer"
                      :cell="row[headCellKey]"
                      :row="row"
                    >
                      <y-core-table-cell
                        :disabled="disabled"
                        :item="row[headCellKey]"
                        :align="headCell.align"
                        .style="`${headCell.style}`"
                        :ellipsis="row[headCellKey] instanceof Object ? row[headCellKey].ellipsis : headCell.ellipsis"
                        :lineclamp="row[headCellKey] instanceof Object ? row[headCellKey].lineclamp : headCell.lineclamp"
                        :sticky="sticky && headCellIndex === 0"
                        :bordered="sticky && headCellIndex === 0"
                      >
                        <div
                          v-if="$slots[`cell-col-${headCellKey}`] || $slots.cell"
                          slot="cell"
                        >
                          <slot
                            :name="`cell-col-${headCellKey}`"
                            :cell="row[headCellKey]"
                            :row="row"
                          >
                            <slot
                              name="cell"
                              :cell="row[headCellKey]"
                              :row="row"
                            />
                          </slot>
                        </div>
                      </y-core-table-cell>
                    </slot>
                  </slot>
                </template>
              </slot>
            </slot>
          </y-core-table-row>
        </slot>
      </slot>
    </template>

    <y-core-table-pagination
      v-if="showPagination"
      slot="pagination"
      :disabled="disabled"
      :page="page"
      :items-per-page="itemsPerPage"
      :total="total"
      :item-value="itemValue"
      :item-label="itemLabel"
      :options-items-per-page="optionsItemsPerPage"
      :counter-text="counterText"
      @change-page="$emit('update:page', $event.detail.page)"
      @change-items-per-page="$emit('update:itemsPerPage', $event.detail.itemsPerPage)"
    />
  </y-core-table>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { inRange } from 'radash'

  import '~core/ui/table'
  import '~core/ui/tableBar'
  import '~core/ui/tableRow'
  import '~core/ui/tableCell'
  import '~core/ui/tableHeadCell'
  import '~core/ui/skeletonTable'
  import '~core/ui/tablePagination'
  import '~core/ui/simpleCheckbox/SimpleCheckbox.core'

  import {
    createVueTableProps,
    type IYVueTableProps,
    type IYVueTableEmits,
    type ISkeletonTableColumn,
    type IYVueCoreTableProps,
    type IYVueTableSlots,
    type TYVueTableItems,
  } from './models/types'
  import type { TableHeadCellSortEvent, TableHeadCellCheckedEvent } from '~core/ui/tableHeadCell/models/types'

  defineOptions({ name: 'YTable' })

  const emit = defineEmits<IYVueTableEmits>()

  defineSlots<Partial<IYVueTableSlots>>()

  const props = withDefaults(
    defineProps<IYVueTableProps>(),
    createVueTableProps(),
  ) satisfies IYVueCoreTableProps

  const checkedAll = computed(() => props.selected.length === props.items.length)
  const indeterminateAll = computed(() => inRange(
    props.selected.length - 1,
    props.items.length - 1,
  ))
  const computedStyles = computed(() => {
    const gridTemplateColumnsValue = Object.values(props.headers).map((header) => header.gridTemplate).join(' ')

    return { gridTemplateColumns: `${props.selectable ? 'min-content ' : ''}${gridTemplateColumnsValue}` }
  })

  const headersSkeletonColumns = computed<ISkeletonTableColumn[]>(() => Object.values(props.headers)
    .map(({ align, gridTemplate }) => ({ align, gridTemplate })))
  const skeletonColumns = computed<ISkeletonTableColumn[]>(() => {
    return props.selectable ? [{ align: 'center', gridTemplate: 'min-content' }, ...headersSkeletonColumns.value] : headersSkeletonColumns.value
  })

  const toggleRow = (row: TYVueTableItems[number]) => {
    const { rowId } = row

    if (props.selected.includes(rowId)) {
      emit(
        'update:selected',
        props.selected.filter((selectedId) => rowId !== selectedId),
      )
    } else {
      emit(
        'update:selected',
        [
          ...props.selected,
          rowId,
        ],
      )
    }
  }

  const toggleAll = (event: TableHeadCellCheckedEvent) => {
    if (event.detail.checked) {
      emit(
        'update:selected',
        props.items.map((item) => item.rowId),
      )
    } else {
      emit(
        'update:selected',
        [],
      )
    }
  }

  const onSort = (headId: string, event: TableHeadCellSortEvent) => {
    emit(
      'sort',
      { headId, event },
    )
  }
</script>
