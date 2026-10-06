import type { ITablePlugin, TTablePluginComponents } from './types'
import {
  YCoreTableCellTagName,
  YCoreTableHeadCellTagName,
  YCoreTableRowTagName,
  YCoreIconTagName,
  YCoreTableTagName,
} from '~shared/constants'
import { yDragAndDrop } from '~shared/icons'
import { type YCoreTableRow } from '~core/ui/tableRow'
import { type YCoreIcon } from '~core/ui/icon'
import { type YCoreTableHeadCell } from '~core/ui/tableHeadCell'
import { type YCoreTableCell } from '~core/ui/tableCell'
import { isSupportsTouchEvents, TOUCH_DRAG_DELAY, type ITouchDragState } from '~web/shared/utils/touchEvents'
import { YCoreTable } from '~core/ui/table'
import { isYCoreTableRow } from '~core/ui/tableRow/models/types/isYCoreTableRow'
import { preventAndStopEvent } from '~web/shared/utils'

export interface IDraggingPlugin extends ITablePlugin<TTablePluginComponents> {}

declare global {
  interface HTMLElementEventMap {
    'table-row-drop': CustomEvent<{
      event: DragEvent
      rowIndex: number
      newOrder: number[]
    }>

    'table-row-drag': CustomEvent<{
      event: DragEvent
      rowIndex: number
      rowId: string
    }>
  }
}

let rowObserver: MutationObserver | null = null

const touchDragState: ITouchDragState<YCoreTableRow> = {
  active: false,
  startX: 0,
  startY: 0,
  sourceItem: null,
  targetItem: null,
  gapValue: 0,
  touchStartTimeout: null,
  sourceItemClone: null,
  dragReady: false,
}

const moveRow = (sourceRow: YCoreTableRow, targetRow: YCoreTableRow) => {
  const parent = targetRow.parentNode
  if (!parent) return

  const sourceIndex = Array.from(parent.children).indexOf(sourceRow)
  const targetIndex = Array.from(parent.children).indexOf(targetRow)

  const isAfter = sourceIndex < targetIndex
  if (isAfter) {
    targetRow.after(sourceRow)
  } else {
    targetRow.before(sourceRow)
  }

  if (touchDragState.active) {
    updateTouchDragStatePosition(isAfter, sourceRow.clientHeight)
  }
}

const setDataTableHeadRow = (row: YCoreTableRow) => {
  const firstCell = row.querySelector<YCoreTableCell>(YCoreTableHeadCellTagName)

  if (!firstCell) return

  const hasSpan = Boolean(firstCell.querySelector('span'))

  if (hasSpan) return

  const span = document.createElement('span')

  span.style.width = '24px'
  span.style.height = '20px'
  span.style.display = 'inline-flex'
  span.style.flexShrink = '0'

  span.setAttribute('slot', 'plugin')

  firstCell.appendChild(span)

  return row
}

const onTableRowDrop = (row: YCoreTableRow) => (event: DragEvent) => {
  event.preventDefault()

  const rowIndex = parseInt(row.dataset.rowIndex ?? '0')
  const newOrder = Array.from(row.parentElement?.querySelectorAll<YCoreTableRow>(`${YCoreTableRowTagName}[slot="body"]`) ?? [])
    .map((row) => row.dataset.rowId && !isNaN(parseInt(row.dataset.rowId)) ? parseInt(row.dataset.rowId) : parseInt(row.dataset.rowIndex ?? '0'))

  row.dispatchEvent(new CustomEvent(
    'table-row-drop',
    {
      detail: {
        event,
        rowIndex,
        newOrder,
      },
      bubbles: true,
      composed: true,
    },
  ))
}

const onTableRowDragEnter = (row: YCoreTableRow) => (event: DragEvent) => {
  event.preventDefault()

  const groupSelector = row.dataset.group ? `[data-group="${row.dataset.group}"]` : ''
  const sourceSelector = `${YCoreTableRowTagName}[data-dragging="true"]${groupSelector}`
  const sourceRow = document.querySelector<YCoreTableRow>(`${YCoreTableTagName} > ${sourceSelector}`)

  if (sourceRow && sourceRow !== row) {
    moveRow(sourceRow, row)
  }
}

const onTableRowDragStart = (row: YCoreTableRow) => (event: DragEvent) => {
  row.style.cursor = 'grabbing'
  row.style.opacity = '0.5'
  row.dataset.dragging = 'true'

  if (!event.dataTransfer) return

  const rowIndex = parseInt(row.dataset.rowIndex ?? '0')
  const rowId = parseInt(row.dataset.rowId ?? '0')

  row.dispatchEvent(new CustomEvent(
    'table-row-drag',
    {
      detail: {
        event,
        rowIndex,
        rowId,
      },
      bubbles: true,
      composed: true,
    },
  ))

  event.dataTransfer.effectAllowed = 'move'
}

const onTableRowDragEnd = (row: YCoreTableRow) => (event: DragEvent) => {
  event.preventDefault()

  row.style.cursor = 'grab'
  row.style.opacity = '1'
  row.dataset.dragging = 'false'
}

const setDraggingIcon = (row: YCoreTableRow) => {
  const firstCell = row.querySelector<YCoreTableCell>(YCoreTableCellTagName)

  if (!firstCell) return

  const hasIcon = Boolean(firstCell.querySelector<YCoreIcon>(YCoreIconTagName))

  if (hasIcon) return

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const icon: YCoreIcon = document.createElement(YCoreIconTagName) as YCoreIcon

  icon.icon = yDragAndDrop
  icon.size = '16px'
  icon.style.padding = '2px 8px 2px 0px'
  icon.setAttribute('slot', 'plugin')

  firstCell.appendChild(icon)
}

const setRowDragable = (row: YCoreTableRow) => {
  const isDragDisabled = row.disabled

  row.draggable = !isDragDisabled
  row.style.cursor = isDragDisabled ? 'not-allowed' : 'grab'
}

const setDataTableBodyRow = (row: YCoreTableRow) => {
  if (row.draggable) return

  setRowDragable(row)

  row.ondrop = onTableRowDrop(row)
  row.ondragenter = onTableRowDragEnter(row)
  row.ondragleave = (event: DragEvent) => { event.preventDefault() }
  row.ondragstart = onTableRowDragStart(row)
  row.ondragend = onTableRowDragEnd(row)
  row.ondragover = (event: DragEvent) => { event.preventDefault() }

  setDraggingIcon(row)
  setRowObserver(row)
}

// eslint-disable-next-line sonarjs/cognitive-complexity
const clearDataTableRow = (row: YCoreTableRow) => {
  if (row.dataset.dragging === 'true') return

  row.draggable = false
  row.style.cursor = ''
  row.style.opacity = ''
  delete row.dataset.dragging

  row.ondragenter = null
  row.ondragleave = null
  row.ondragstart = null
  row.ondragend = null
  row.ondragover = null

  const firstHeadCell = row.querySelector<YCoreTableHeadCell>(YCoreTableHeadCellTagName)
  const firstBodyCell = row.querySelector<YCoreTableCell>(YCoreTableCellTagName)

  if (firstHeadCell) {
    const span = firstHeadCell.querySelector('span[slot="plugin"]')

    if (span) firstHeadCell.removeChild(span)
  }

  if (firstBodyCell) {
    const icon = firstBodyCell.querySelector<YCoreIcon>(`${YCoreIconTagName}[slot="plugin"]`)

    if (icon) firstBodyCell.removeChild(icon)
  }
}

const setRowObserver = (row: YCoreTableRow) => {
  rowObserver = new MutationObserver((mutations) => {
    mutations.forEach(() => { setRowDragable(row) })
  })

  rowObserver.observe(row, {
    attributes: true,
    attributeFilter: ['checkbox-disabled'],
  })
}

const clearRowObserver = () => {
  rowObserver?.disconnect()
  rowObserver = null
}

const handleTouchStart = (event: TouchEvent) => {
  event.stopPropagation()
  const touch = event.touches[0]
  const sourceItem = event.currentTarget

  if (!isYCoreTableRow(sourceItem) || !sourceItem.draggable) return

  touchDragState.touchStartTimeout = setTimeout(() => {
    touchDragState.touchStartTimeout = null
    touchDragState.active = true
    touchDragState.startX = touch.clientX
    touchDragState.startY = touch.clientY
    touchDragState.sourceItem = sourceItem

    sourceItem.style.pointerEvents = 'none'

    onTableRowDragStart(sourceItem)(new DragEvent('dragstart', { dataTransfer: new DataTransfer() }))
  }, TOUCH_DRAG_DELAY)
}

const handleTouchMove = (event: TouchEvent) => {
  if (event.touches.length !== 1) return

  if (touchDragState.touchStartTimeout) {
    clearTimeout(touchDragState.touchStartTimeout)
    touchDragState.touchStartTimeout = null
    return
  }

  if (!touchDragState.active) return

  preventAndStopEvent(event)

  handleTouchDragging(event)
}

const handleTouchDragging = (event: TouchEvent) => {
  const touchInfo = event.touches[0]

  const targetItem = findTargetCollapseItem(touchInfo)
  const state = touchDragState

  if (targetItem && rowsCanBeMoved(targetItem, state.sourceItem)) {
    state.targetItem = targetItem

    onTableRowDragEnter(targetItem)(new DragEvent('dragenter'))
  }

  updateTouchDragPosition(touchInfo)
}

const findTargetCollapseItem = (touchInfo: Touch): YCoreTableRow | null => {
  let targetElement = document.elementFromPoint(touchInfo.clientX, touchInfo.clientY)

  const { sourceItem } = touchDragState

  while (targetElement && !(targetElement instanceof YCoreTable)) {
    if (isYCoreTableRow(targetElement) && targetElement !== sourceItem) {
      return targetElement
    }

    targetElement = targetElement.parentElement
  }

  return null
}

const rowsCanBeMoved = (targetItem: YCoreTableRow | null, sourceItem: YCoreTableRow | null) => {
  if (!targetItem || !sourceItem || targetItem === sourceItem) return false

  return targetItem.draggable && targetItem.dataset.group === sourceItem.dataset.group
}

const handleTouchEnd = (event: TouchEvent) => {
  if (touchDragState.touchStartTimeout) {
    clearTimeout(touchDragState.touchStartTimeout)
    touchDragState.touchStartTimeout = null
    return
  }

  if (!touchDragState.active) return

  preventAndStopEvent(event)

  const { sourceItem } = touchDragState

  if (sourceItem?.dataset.dragging === 'true') {
    onTableRowDragEnd(sourceItem)(new DragEvent('dragend'))
    onTableRowDrop(sourceItem)(new DragEvent('drop'))
    resetDragPosition(sourceItem)
    sourceItem.parentElement?.dispatchEvent(new DragEvent('dragend'))
  }

  resetTouchDragState()
}

const updateTouchDragPosition = (touch: Touch) => {
  const { sourceItem, startX, startY } = touchDragState

  if (sourceItem?.dataset.dragging === 'true') {
    sourceItem.style.transform = `translate(${touch.clientX - startX}px, ${touch.clientY - startY}px)`
  }
}

const updateTouchDragStatePosition = (isAfter: boolean, offset: number) => {
  const offsetHeight = offset + touchDragState.gapValue
  if (isAfter) {
    touchDragState.startY += offsetHeight
  } else {
    touchDragState.startY -= offsetHeight
  }
}

const resetDragPosition = (item: YCoreTableRow) => {
  item.style.pointerEvents = 'all'
  item.style.transform = ''
}

const resetTouchDragState = () => {
  touchDragState.active = false
  touchDragState.sourceItem = null
  touchDragState.targetItem = null
}

const setTableRowTouchEvents = (row: YCoreTableRow) => {
  row.addEventListener('touchstart', handleTouchStart)
  row.addEventListener('touchmove', handleTouchMove)
  row.addEventListener('touchend', handleTouchEnd)
  row.addEventListener('touchcancel', handleTouchEnd)
}

const clearTableRowTouchEvents = (row: YCoreTableRow) => {
  row.removeEventListener('touchstart', handleTouchStart)
  row.removeEventListener('touchmove', handleTouchMove)
  row.removeEventListener('touchend', handleTouchEnd)
  row.removeEventListener('touchcancel', handleTouchEnd)
}

export class Dragging implements IDraggingPlugin {
  id: IDraggingPlugin['id'] = 'dragging'
  supportsTouchEvents: boolean = isSupportsTouchEvents()

  install: IDraggingPlugin['install'] = (component) => {
    if (component.tagName.toLocaleLowerCase() !== YCoreTableRowTagName) return

    const row = component as YCoreTableRow
    const isHeadRow = row.getAttribute('slot') === 'head'

    if (isHeadRow) {
      return setDataTableHeadRow(row)
    }

    setDataTableBodyRow(row)

    if (this.supportsTouchEvents) {
      setTableRowTouchEvents(row)
    }
  }

  uninstall: IDraggingPlugin['uninstall'] = (component) => {
    if (component.tagName.toLocaleLowerCase() !== YCoreTableRowTagName) return

    const row = component as YCoreTableRow

    clearDataTableRow(row)
    clearRowObserver()

    if (this.supportsTouchEvents) {
      clearTableRowTouchEvents(row)
    }
  }
}
