import { LitElement, html, css, unsafeCSS, type PropertyValues } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { provide } from '@lit/context'
import { uid } from 'radash'

import {
  createCoreCollapseProps,
  type IYCoreCollapseProps,
  EYCoreCollapseType,
  CollapseChangeEvent,
  CollapseMoveEvent,
  type TCollapseItemValueSingle,
} from '~core/ui/collapse/models/types'
import {
  YCoreCollapseTagName as tagName,
  YCoreCollapseItemTagName,
  YCoreIconTagName,
} from '~shared/constants'
import { yDragAndDrop } from '~shared/icons'

import { type TDispatcher, bubblingEvent } from '~core/utils/event-decorator'
import { preventAndStopEvent } from '~shared/utils'

import { valueContextCreated, typeContextCreated, variantContextCreated } from './providers'

import YCoreCollapseVarsCSS from '~core/ui/collapse/css/Collapse.vars.css?inline'
import YCoreCollapseScopedCSS from '~core/ui/collapse/css/Collapse.scoped.css?inline'

import { type YCoreCollapseItem } from '~core/ui/collapseItem'
import { YCoreIcon } from '~core/ui/icon'
import { type CollapseItemClickEvent } from '~core/ui/collapseItem/models/types'
import { booleanConverter } from '~core/utils/converters'
import { isSupportsTouchEvents, TOUCH_DRAG_DELAY, type ITouchDragState } from '~web/shared/utils/touchEvents'
import { isYCoreCollapseItem } from '../collapseItem/models/types/isYCoreCollapseItem'
import { withLocator } from '~core/utils/locator'

const { value, type, variant, draggable, allowCrossLevelMove } = createCoreCollapseProps()
const CLONE_Z_INDEX = 9999
const CLONE_OPACITY = 0.8
const DRAG_THRESHOLD = 15 // Минимальное расстояние в пикселях для активации drag

@customElement(tagName)
@withLocator(tagName)
export class YCoreCollapse
  extends LitElement
  implements IYCoreCollapseProps {
  @provide({ context: valueContextCreated })
  @property({ type: String }) value: IYCoreCollapseProps['value'] = value
  @provide({ context: typeContextCreated })
  @property({ type: String }) type: IYCoreCollapseProps['type'] = type
  @provide({ context: variantContextCreated })
  @property({ type: String }) variant: IYCoreCollapseProps['variant'] = variant
  @property({ type: Boolean, reflect: true, converter: booleanConverter }) draggable: IYCoreCollapseProps['draggable'] = draggable
  @property({ type: Boolean, reflect: true, converter: booleanConverter, attribute: 'allow-cross-level-move' }) allowCrossLevelMove: IYCoreCollapseProps['allowCrossLevelMove'] = allowCrossLevelMove

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(YCoreCollapseVarsCSS)}
      ${unsafeCSS(YCoreCollapseScopedCSS)}
    `,
  ]

  private touchDragState: ITouchDragState<YCoreCollapseItem> = {
    active: false,
    startX: 0,
    startY: 0,
    sourceItem: null,
    targetItem: null,
    gapValue: 8,
    touchStartTimeout: null,
    sourceItemClone: null,
    dragReady: false, // Готовность к drag после истечения таймера
  }

  @bubblingEvent(
    CollapseChangeEvent,
    { name: 'collapse-change' },
  )
  _collapseChange!: TDispatcher<CollapseChangeEvent>

  @bubblingEvent(
    CollapseMoveEvent,
    { name: 'collapse-move' },
  )
  _collapseMove!: TDispatcher<CollapseMoveEvent>

  private get computedClasses() {
    return { [this.baseClass]: true }
  }

  private get supportsTouchEvents() {
    return isSupportsTouchEvents()
  }

  private setSingleValue = (newValue: TCollapseItemValueSingle) => {
    this.value = this.value === newValue ? '' : newValue
  }

  private setMultipleValue = (newValue: TCollapseItemValueSingle) => {
    if (!Array.isArray(this.value)) {
      this.value = []
    }

    this.value = this.value.includes(newValue)
      ? this.value.filter((item) => item !== newValue)
      : [...this.value, newValue]
  }

  private scrollToActiveItem = (itemValue: TCollapseItemValueSingle) => {
    setTimeout(() => {
      // Ищем активный элемент только среди прямых дочерних элементов текущего collapse
      const activeItem = this.querySelector<YCoreCollapseItem>(`${this.tagName.toLowerCase()}[data-uid="${this.dataset.uid}"] > ${YCoreCollapseItemTagName}[value="${itemValue}"]`)

      if (activeItem && this.value === itemValue) {
        // Прокручиваем плавно к активному элементу
        activeItem.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        })
      }
    }, 350) // 300 ms время css анимации + 50 ms запас
  }

  private handleCollapseChange = (event: Event) => {
    // Не блокируем всплытие события полностью, чтобы v-click-outside мог работать
    event.stopPropagation()

    const itemValue = (event as CollapseItemClickEvent).detail.value

    if (this.type === EYCoreCollapseType.SINGLE) {
      this.setSingleValue(itemValue)
      // Прокручиваем к активному элементу после анимации
      this.scrollToActiveItem(itemValue)
    } else {
      this.setMultipleValue(itemValue)
    }

    this._collapseChange({
      detail: {
        event,
        value: this.value,
      },
    })
  }

  private getItemLevel = (item: YCoreCollapseItem): number => {
    const parentItem = item.parentElement?.closest(YCoreCollapseItemTagName)
    return parentItem ? 1 + this.getItemLevel(parentItem) : 0
  }

  private canMove = (sourceItem: YCoreCollapseItem, targetItem: YCoreCollapseItem): boolean => {
    const sourceLevel = this.getItemLevel(sourceItem)
    const targetLevel = this.getItemLevel(targetItem)
    return sourceLevel === targetLevel || sourceLevel === targetLevel + 1
  }

  private insertItem = (sourceItem: YCoreCollapseItem, targetItem: YCoreCollapseItem, isAfter: boolean): void => {
    const sourceLevel = this.getItemLevel(sourceItem)
    const targetLevel = this.getItemLevel(targetItem)
    if (sourceLevel === targetLevel) {
      if (isAfter) {
        targetItem.after(sourceItem)
      } else {
        targetItem.before(sourceItem)
      }
    } else {
      this.insertIntoInnerCollapse(sourceItem, targetItem)
    }
  }


  private insertIntoInnerCollapse = (sourceItem: YCoreCollapseItem, targetItem: YCoreCollapseItem) => {
    const innerCollapse = targetItem.querySelector<YCoreCollapse>(this.tagName)
    if (!innerCollapse) return
    innerCollapse.insertBefore(sourceItem, innerCollapse.firstChild)
  }

  private moveDraggableItem = (sourceItem: YCoreCollapseItem, targetItem: YCoreCollapseItem, dragEvent: DragEvent) => {
    if (!this.canMove(sourceItem, targetItem)) return


    let parent = targetItem.parentNode
    if (!(parent instanceof YCoreCollapse)) {
      parent = parent?.parentNode as (YCoreCollapse | null)
      sourceItem = sourceItem.parentNode as YCoreCollapseItem
      targetItem = targetItem.parentNode as YCoreCollapseItem
    }
    if (!parent) return

    const rect = targetItem.getBoundingClientRect()
    const isAfter = dragEvent.clientY > rect.top + rect.height / 2
    this.insertItem(sourceItem, targetItem, isAfter)
  }

  private handleDragStart = (dragEvent: DragEvent) => {
    const targetItem = dragEvent.target || this.touchDragState.sourceItem

    if (!isYCoreCollapseItem(targetItem)) return

    targetItem.style.cursor = 'grabbing'
    targetItem.style.opacity = '0.5'
    targetItem.dataset.dragging = 'true'

    if (!dragEvent.dataTransfer) return

    dragEvent.dataTransfer.effectAllowed = 'move'
  }

  private handleDragEnd = (dragEvent: DragEvent) => {
    dragEvent.preventDefault()

    const targetItem = dragEvent.target || this.touchDragState.sourceItem

    if (!isYCoreCollapseItem(targetItem)) return

    targetItem.style.cursor = 'grab'
    targetItem.style.opacity = '1'
    targetItem.dataset.dragging = 'false'
  }

  private handleDragEnter = (dragEvent: DragEvent) => {
    dragEvent.preventDefault()

    const targetItem = this.getTargetItem(dragEvent) || this.touchDragState.targetItem
    if (!isYCoreCollapseItem(targetItem)) return

    const sourceItem = this.findSourceItem()
    if (sourceItem && sourceItem !== targetItem) {
      this.moveDraggableItem(sourceItem, targetItem, dragEvent)
    }
  }

  private getTargetItem(dragEvent: DragEvent): EventTarget | null {
    return this.allowCrossLevelMove ? dragEvent.target : dragEvent.currentTarget
  }

  private findSourceItem(): YCoreCollapseItem | null {
    const sourceSelector = `${YCoreCollapseItemTagName}[draggable="true"][data-dragging="true"]`

    if (this.allowCrossLevelMove) {
      return document.querySelector<YCoreCollapseItem>(sourceSelector)
    }

    return (
      this.querySelector<YCoreCollapseItem>(`:scope > ${sourceSelector}`) ||
      this.querySelector<YCoreCollapseItem>(`:scope > * > ${sourceSelector}`)
    )
  }

  private handleDragLeave = (dragEvent: DragEvent) => {
    dragEvent.preventDefault()
  }

  private handleDragOver = (dragEvent: DragEvent) => {
    dragEvent.preventDefault()
  }

  private handleDrop = (dragEvent: DragEvent) => {
    dragEvent.preventDefault()
    dragEvent.stopPropagation()

    const sourceItem = this.findSourceItem() || this.touchDragState.sourceItem
    if (!sourceItem) return

    // Находим родительский Collapse для sourceItem
    const parentCollapse = sourceItem.closest(tagName)
    if (!parentCollapse) return

    let draggableItems = parentCollapse.querySelectorAll<YCoreCollapseItem>(`:scope > ${YCoreCollapseItemTagName}[draggable="true"]`)
    if (!draggableItems.length) {
      draggableItems = parentCollapse.querySelectorAll<YCoreCollapseItem>(`:scope > * > ${YCoreCollapseItemTagName}[draggable="true"]`)
    }
    this._collapseMove({
      detail: {
        event: dragEvent,
        order: Array.from(draggableItems).map((item) => item.value),
      },
    })
  }

  private clearDraggingItem = (draggableItem: YCoreCollapseItem) => {
    delete draggableItem.dataset.dragging
    delete draggableItem.dataset.hasListeners
    draggableItem.removeAttribute('draggable')
    draggableItem.removeEventListener('dragstart', this.handleDragStart)
    draggableItem.removeEventListener('dragend', this.handleDragEnd)
    draggableItem.removeEventListener('dragenter', this.handleDragEnter)
    draggableItem.removeEventListener('dragleave', this.handleDragLeave)
    draggableItem.removeEventListener('dragover', this.handleDragOver)
    draggableItem.removeEventListener('drop', this.handleDrop)

    const icon = draggableItem.querySelector(`:scope > ${YCoreIconTagName}[slot="before"]`)

    if (icon) {
      draggableItem.removeChild(icon)
    }

    if (this.supportsTouchEvents) {
      this.clearTouchDraggindEvents(draggableItem)
    }
  }

  private createDraggableClone = (sourceItem: YCoreCollapseItem): YCoreCollapseItem => {
    const clone = sourceItem.cloneNode(true) as YCoreCollapseItem
    clone.style.position = 'fixed'
    const rect = sourceItem.getBoundingClientRect()

    clone.style.top = `${rect.top}px`
    clone.style.left = `${rect.left}px`
    clone.style.width = `${rect.width}px`

    clone.style.zIndex = `${CLONE_Z_INDEX}`
    clone.style.opacity = `${CLONE_OPACITY}`
    clone.style.pointerEvents = 'none'
    clone.dataset.dragClone = 'true'
    return clone
  }

  private handleTouchStart = (event: TouchEvent) => {
    event.stopPropagation()
    const touch = event.touches[0]
    const sourceItem = event.currentTarget

    if (!isYCoreCollapseItem(sourceItem) || sourceItem.computedOpened || event.touches.length !== 1) return

    const touchDragState = this.touchDragState

    touchDragState.startX = touch.clientX
    touchDragState.startY = touch.clientY
    touchDragState.sourceItem = sourceItem

    touchDragState.touchStartTimeout = setTimeout(() => {
      touchDragState.touchStartTimeout = null
      touchDragState.dragReady = true // Отмечаем готовность к drag, но не активируем его
    }, TOUCH_DRAG_DELAY)
  }

  private handleTouchMove = (event: TouchEvent) => {
    if (event.touches.length !== 1) return

    const state = this.touchDragState

    if (state.touchStartTimeout) {
      this.clearTouchTimeout()
      return
    }

    if (this.shouldBlockEvent(state)) {
      this.blockTouchEvent(event)
    }

    if (state.active) {
      this.handleTouchDragging(event)
      return
    }

    this.tryActivateDrag(event, state)
  }


  private shouldBlockEvent(state: ITouchDragState<YCoreCollapseItem>) {
    return (state.dragReady || state.active) && state.sourceItem
  }

  private blockTouchEvent(event: TouchEvent) {
    event.preventDefault()
    event.stopPropagation()
  }

  private clearTouchTimeout() {
    if (!this.touchDragState.touchStartTimeout) return
    clearTimeout(this.touchDragState.touchStartTimeout)
    this.touchDragState.touchStartTimeout = null
  }

  private tryActivateDrag(event: TouchEvent, state: ITouchDragState<YCoreCollapseItem>) {
    const touch = event.touches[0]
    const deltaX = Math.abs(touch.clientX - state.startX)
    const deltaY = Math.abs(touch.clientY - state.startY)
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

    if (distance >= DRAG_THRESHOLD && state.sourceItem) {
      state.active = true
      const clone = this.createDraggableClone(state.sourceItem)
      document.body.appendChild(clone)
      state.sourceItemClone = clone
      const dragEvent = new DragEvent('dragstart')
      this.handleDragStart(dragEvent)
      state.sourceItem.dispatchEvent(dragEvent)

      this.handleTouchDragging(event)
    }
  }


  private handleTouchDragging = (event: TouchEvent) => {
    const touchInfo = event.touches[0]

    const targetItem = this.findTargetCollapseItem(touchInfo)
    const state = this.touchDragState

    if (this.allowCrossLevelMove || this.itemsAreSiblings(targetItem, state.sourceItem)) {
      state.targetItem = targetItem
      if (targetItem) {
        this.handleDragEnter(new DragEvent('dragenter'))
        this.handleDragLeave(new DragEvent('dragleave'))
      }
    }

    this.updateTouchDragPosition(touchInfo)
  }

  private findTargetCollapseItem(touchInfo: Touch): YCoreCollapseItem | null {
    let targetElement = document.elementFromPoint(touchInfo.clientX, touchInfo.clientY)

    const { sourceItem } = this.touchDragState

    while (targetElement && targetElement !== this) {
      if (isYCoreCollapseItem(targetElement) && targetElement !== sourceItem) {
        return targetElement
      }

      targetElement = targetElement.parentElement
    }

    return null
  }

  private itemsAreSiblings = (targetItem: YCoreCollapseItem | null, sourceItem: YCoreCollapseItem | null) => {
    if (!targetItem || !sourceItem || targetItem === sourceItem) return false

    const sourceParent = sourceItem.closest(this.tagName.toLowerCase())
    const targetParent = targetItem.closest(this.tagName.toLowerCase())

    return sourceParent === targetParent
  }

  private handleTouchEnd = (event: TouchEvent) => {
    const { active, touchStartTimeout, sourceItem, sourceItemClone } = this.touchDragState

    if (touchStartTimeout) {
      clearTimeout(touchStartTimeout)
      this.touchDragState.touchStartTimeout = null
      this.resetTouchDragState()
      return
    }

    // Если drag был активен, обрабатываем как перетаскивание
    if (active) {
      preventAndStopEvent(event)

      if (sourceItemClone) {
        document.body.removeChild(sourceItemClone)
      }

      if (sourceItem?.dataset.dragging === 'true') {
        sourceItem.style.pointerEvents = 'all'
        this.handleDragEnd(new DragEvent('dragend'))
        this.handleDrop(new DragEvent('drop'))
        this.resetDragPosition(sourceItem)
      }
    }

    // Если drag не был активен, не блокируем событие - позволяем сработать клику
    this.resetTouchDragState()
  }

  private updateTouchDragPosition(touch: Touch) {
    const { sourceItem, sourceItemClone } = this.touchDragState

    if (sourceItem?.dataset.dragging === 'true' && sourceItemClone) {
      sourceItemClone.style.transform = `translate(${touch.clientX - this.touchDragState.startX}px, ${touch.clientY - this.touchDragState.startY}px)`
    }
  }


  private resetDragPosition(item: YCoreCollapseItem) {
    item.style.transform = ''
  }

  private resetTouchDragState = () => {
    const state = this.touchDragState

    state.active = false
    state.dragReady = false
    state.sourceItem = null
    state.targetItem = null
  }

  private setTouchDraggindEvents = (draggableItem: YCoreCollapseItem) => {
    draggableItem.addEventListener('touchstart', this.handleTouchStart)
    draggableItem.addEventListener('touchmove', this.handleTouchMove, { passive: false })
    draggableItem.addEventListener('touchend', this.handleTouchEnd)
    draggableItem.addEventListener('touchcancel', this.handleTouchEnd)
  }

  private clearTouchDraggindEvents = (draggableItem: YCoreCollapseItem) => {
    draggableItem.removeEventListener('touchstart', this.handleTouchStart)
    draggableItem.removeEventListener('touchmove', this.handleTouchMove)
    draggableItem.removeEventListener('touchend', this.handleTouchEnd)
    draggableItem.removeEventListener('touchcancel', this.handleTouchEnd)

    this.resetDragPosition(draggableItem)
  }

  private disableDragging = (draggableItem: YCoreCollapseItem) => {
    draggableItem.setAttribute('draggable', 'false')

    const draggableIcon = draggableItem.querySelector(`:scope > ${YCoreIconTagName}[slot="before"]`)

    if (draggableIcon instanceof YCoreIcon) {
      draggableIcon.style.cursor = 'not-allowed'
    }
  }

  private clearDragging = () => {
    let draggableItems = this.querySelectorAll<YCoreCollapseItem>(`:scope > ${YCoreCollapseItemTagName}[draggable]`)
    if (!draggableItems.length) {
      draggableItems = this.querySelectorAll<YCoreCollapseItem>(`:scope > * > ${YCoreCollapseItemTagName}[draggable]`)
    }
    draggableItems.forEach(this.clearDraggingItem)
  }

  private setDraggingItem = (draggableItem: YCoreCollapseItem) => {
    if (!draggableItem.dataset.hasListeners) {
      draggableItem.setAttribute('draggable', 'true')
      draggableItem.dataset.hasListeners = ''

      const slotBeforeItems = draggableItem.querySelectorAll<YCoreIcon>(`:scope > ${YCoreIconTagName}[slot="before"]`)

      slotBeforeItems.forEach((icon) => {
        draggableItem.removeChild(icon)
      })

      const icon = document.createElement(YCoreIconTagName)
      icon.icon = yDragAndDrop
      icon.size = '16px'
      icon.setAttribute('slot', 'before')
      icon.style.cursor = 'grab'
      draggableItem.appendChild(icon)

      draggableItem.addEventListener('dragstart', this.handleDragStart)
      draggableItem.addEventListener('dragend', this.handleDragEnd)
      draggableItem.addEventListener('dragenter', this.handleDragEnter)
      draggableItem.addEventListener('dragleave', this.handleDragLeave)
      draggableItem.addEventListener('dragover', this.handleDragOver)
      draggableItem.addEventListener('drop', this.handleDrop)

      if (this.supportsTouchEvents) {
        this.setTouchDraggindEvents(draggableItem)
      }
    }
    if (draggableItem.computedOpened) {
      this.disableDragging(draggableItem)
    }
  }

  private setDragging = () => {
    if (!this.draggable) {
      this.clearDragging()
      return
    }

    let draggableItems = this.querySelectorAll<YCoreCollapseItem>(`:scope > ${YCoreCollapseItemTagName}`)
    if (!draggableItems.length) {
      draggableItems = this.querySelectorAll<YCoreCollapseItem>(`:scope > * > ${YCoreCollapseItemTagName}`)
    }
    draggableItems.forEach(this.setDraggingItem)
  }

  connectedCallback() {
    super.connectedCallback()

    this.dataset.uid = uid(20)
    this.addEventListener('collapse-item-click', this.handleCollapseChange)
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    this.clearDragging()
    this.removeEventListener('collapse-item-click', this.handleCollapseChange)
  }

  updated(_changedProperties: PropertyValues<typeof this>): void {
    if (_changedProperties.has('draggable') || _changedProperties.has('value')) {
      this.setDragging()
    }
  }

  protected render() {
    return html`
      <div class=${classMap(this.computedClasses)}>
        <slot></slot>
      </div>
    `
  }
}
