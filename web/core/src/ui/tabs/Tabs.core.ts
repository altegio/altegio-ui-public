import type { PropertyValues } from 'lit'
import { css, html, LitElement, nothing, unsafeCSS } from 'lit'
import { repeat } from 'lit/directives/repeat.js'
import { customElement, property, query, state } from 'lit/decorators.js'

import YCoreTabsScopedCSS from '~core/ui/tabs/css/Tabs.scoped.css?inline'
import YCoreTabsVarsCSS from '~core/ui/tabs/css/Tabs.vars.css?inline'

import { YCoreTabsTagName as tagName, YCoreTabTagName as tabTagName } from '~shared/constants'
import { yChevronLeft, yChevronRight } from '~shared/icons'
import { ChangeActiveTabEvent, createCoreTabsProps, type IYCoreTabsProps } from '~core/ui/tabs/models/types'
import { classMap } from 'lit/directives/class-map.js'
import '~core/ui/iconButton'
import '~core/ui/tab'
import { bubblingEvent, type TDispatcher } from '~core/utils/event-decorator'
import type { YCoreTab } from '~core/ui/tab'
import { BreakpointsController } from '~core/utils/breakpoints'
import { withLocator } from '~core/utils/locator'

const { value, tabs } = createCoreTabsProps()

const VISIBLE_TAB_DATA_ATTRIBUTE = 'data-visible-tab'
const NAV_BUTTON_WIDTH = '32px'

@customElement(tagName)
@withLocator(tagName)
export class YCoreTabs extends LitElement implements IYCoreTabsProps {
  @property({ type: Array, attribute: 'tabs' }) tabs: IYCoreTabsProps['tabs'] = tabs
  @property({ type: Number, attribute: 'value' }) value: IYCoreTabsProps['value'] = value

  @state()
  private showLeftButton = false

  @state()
  private showRightButton = false

  @state()
  private tabElements: YCoreTab[] | NodeListOf<YCoreTab> | null = null

  @query(`.${tagName}`)
  private rootContainer?: HTMLElement

  @query(`.${tagName}__tabs-container`)
  private tabsContainer?: HTMLElement

  @bubblingEvent(ChangeActiveTabEvent, { name: 'change-active-tab' })
  _changeActiveTab!: TDispatcher<ChangeActiveTabEvent>

  private readonly breakpoints = new BreakpointsController(this)

  private readonly baseClass = tagName

  private intersectionObserver: IntersectionObserver | null = null

  private rootContainerResizeObserver: ResizeObserver | null = null

  static readonly styles = [
    css`${unsafeCSS(YCoreTabsVarsCSS)}`,
    css`${unsafeCSS(YCoreTabsScopedCSS)}`,
  ]

  connectedCallback() {
    super.connectedCallback()

    const tabElements: NodeListOf<YCoreTab> | undefined = this.tabsContainer?.querySelectorAll(tabTagName)

    if (tabElements) this.initialize(Array.from(tabElements))


    // Используется для изначальной отрисовки кнопок для скролла
    setTimeout(() => {
      this.updateScrollButtons()
    })
  }

  protected firstUpdated() {
    const tabElements: NodeListOf<YCoreTab> | undefined = this.tabsContainer?.querySelectorAll(tabTagName)

    if (tabElements) this.initialize(Array.from(tabElements))
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    this.destroy()
  }

  protected initialize(tabElements?: YCoreTab[] | NodeListOf<YCoreTab>) {
    if (!tabElements || this.value === undefined) return

    this.tabElements = tabElements

    this.setupIntersectionObserver()

    this.setupContainerResizeObserver()

    this.setupTabsContainerEventListeners()

    this.scrollToCenterHorizontal(this.tabElements[this.value], 'auto', true)
  }

  protected destroy() {
    this.intersectionObserver?.disconnect()

    this.rootContainerResizeObserver?.disconnect()

    this.removeTabsContainerEventListeners()
  }

  // Метод для ручной реинициализации снаружи(если потребуется)
  public reinitialize(tabElements?: YCoreTab[] | NodeListOf<YCoreTab>) {
    this.destroy()

    this.initialize(tabElements)
  }

  private get computedClass() {
    return { [this.baseClass]: true }
  }

  private get computedTabsContainerClass() {
    return { [`${this.baseClass}__tabs-container`]: true }
  }

  private setupTabsContainerEventListeners() {
    if (!this.tabsContainer) return

    this.tabsContainer.addEventListener('scroll', this.updateScrollButtons)
    this.tabsContainer.addEventListener('wheel', this.handleWheel)
  }

  private removeTabsContainerEventListeners() {
    if (!this.tabsContainer) return

    this.tabsContainer.removeEventListener('scroll', this.updateScrollButtons)
    this.tabsContainer.removeEventListener('wheel', this.handleWheel)
  }

  private updateScrollButtons = () => {
    if (!this.tabsContainer) return
    const { scrollLeft, scrollWidth, clientWidth } = this.tabsContainer
    const canScrollLeft = scrollLeft > 0
    const canScrollRight = scrollLeft < scrollWidth - clientWidth

    // Обновляем состояния только при реальных изменениях
    if (this.showLeftButton !== canScrollLeft || this.showRightButton !== canScrollRight) {
      this.showLeftButton = canScrollLeft
      this.showRightButton = canScrollRight
    }
  }

  private handleWheel = (ev: WheelEvent) => {
    ev.preventDefault()

    if (!this.tabsContainer) return

    const { deltaY, deltaX } = ev

    // Для работы горизонтального скролла при скролле по горизонтали и вертикали
    const offset = Math.abs(deltaY) > Math.abs(deltaX) ? deltaY : deltaX

    this.tabsContainer.scrollLeft += offset
  }

  private handleItemClick(event: Event, index: number) {
    if (!event.currentTarget) return

    // Делаем новый элемент активным (появляется его полоса)
    const detail = { value: index }

    this._changeActiveTab({ detail })
  }

  private async moveHighlightBar(prevActiveIndex: number, index: number) {
    // Клик на текущий активный — ничего не делаем
    if (prevActiveIndex === index) return

    const newActiveTab = this.tabElements?.[index]
    if (!newActiveTab || !this.tabElements?.[prevActiveIndex]) return

    await this.animateHighlightBar(newActiveTab, this.tabElements[prevActiveIndex])
  }

  private async animateHighlightBar(newActiveTab: HTMLElement, prevActiveTab: HTMLElement) {
    const nextHighlightBar = newActiveTab.shadowRoot?.querySelector<HTMLElement>(`.${tabTagName}__activator`)
    if (!nextHighlightBar) return

    const newActiveTabRect = newActiveTab.getBoundingClientRect()
    const prevActiveRect = prevActiveTab.getBoundingClientRect()
    const offsetX = prevActiveRect.left - newActiveTabRect.left

    // Смещаем подсветку на место предыдущего активного Tab для последующей анимации
    nextHighlightBar.style.transform = `translateX(${offsetX}px)`

    // Ждем перерисовки
    await new Promise((resolve) => setTimeout(resolve))

    // Возвращаем плавно элемент подсветки на место
    nextHighlightBar.style.transition = 'transform 0.3s ease, width 0.3s ease'
    nextHighlightBar.style.transform = 'translateX(0px)'

    // Ждём окончания анимации
    await new Promise((resolve) => {
      nextHighlightBar.addEventListener('transitionend', resolve, { once: true })
    })

    // Возвращаем полосу в исходное состояние
    nextHighlightBar.style.transition = 'none'
    nextHighlightBar.style.transform = 'none'
  }

  protected updated(_changedProperties: PropertyValues<this>) {
    if (_changedProperties.has('value')) {
      const oldValue = _changedProperties.get('value')

      if (oldValue === undefined || !this.tabElements || this.value === undefined) return

      this.scrollToCenterHorizontal(this.tabElements[this.value])

      this.moveHighlightBar(oldValue, this.value)
    }
  }

  private slotChangeHandler = (event: Event) => {
    const slot = event.target as HTMLSlotElement

    const slotElements = slot.assignedElements({ flatten: true })

    if (!slotElements.length) return

    const nodeList: YCoreTab[] = []

    const tabTagNameUpperCase = tabTagName.toUpperCase()

    // Ищем элементы <y-core-tab> даже в тех случаях,
    // где есть обертки, например, YTab в Ng/Tab
    slotElements.forEach((el) => {
      if (el.tagName === tabTagNameUpperCase) return nodeList.push(el as YCoreTab)

      const tabEl = el.querySelector(tabTagName)

      if (tabEl) nodeList.push(tabEl)
    })

    this.initialize(nodeList)
  }

  private async scrollToCenterHorizontal(element?: HTMLElement, behavior: ScrollBehavior = 'smooth', needNextTick = false) {
    const parent = this.tabsContainer
    if (!parent || !element) return

    // Требуется для корректного проскролливания при первичной отрисовке
    if (needNextTick) await new Promise((resolve) => setTimeout(resolve, 50))

    const parentWidth = parent.clientWidth
    const elementWidth = element.offsetWidth
    const elementLeft = element.offsetLeft - parent.offsetLeft

    const targetScroll = elementLeft - parentWidth / 2 + elementWidth / 2

    const maxScroll = parent.scrollWidth - parentWidth
    const clampedScroll = Math.max(0, Math.min(targetScroll, maxScroll))

    parent.scrollTo({
      left: clampedScroll,
      behavior,
    })
  }

  protected renderTabList() {
    if (!this.tabs) return null

    return repeat(
      this.tabs,
      (_, index) => index,
      (item, index) => html`
        <y-core-tab
          .active=${index === this.value}
          .disabled=${item.disabled}
          .isTagVisible=${item.isTagVisible}
          .tagText=${item.tagText}
          .isCounterVisible=${item.isCounterVisible}
          .text=${item.text}
          .counterValue=${item.counterValue}
          .tagVariant=${item.tagVariant}
          .leftIcon=${item.leftIcon}
          .leftIconSize=${item.leftIconSize}
          .locator=${item.locator}
          .locatorTag=${item.locatorTag}
          .locatorCounter=${item.locatorCounter}
          @click=${(event: Event) => {
            this.handleItemClick(event, index)
          }}
        ></y-core-tab>
      `,
    )
  }

  protected renderLeftNavButton() {
    if (!this.showLeftButton || this.breakpoints.smallerOrEqual('XS')) return nothing

    return html`
        <div class=${`${this.baseClass}__scroll-left-btn`}>
          <y-core-icon-button
            .icon=${yChevronLeft}
            variant="text"
            @click=${() => { this.scrollToLeft() }}
          >
          </y-core-icon-button>
        </div>
    `
  }

  protected renderRightNavButton() {
    if (!this.showRightButton || this.breakpoints.smallerOrEqual('XS')) return nothing

    return html`
        <div class=${`${this.baseClass}__scroll-right-btn`}>
            <y-core-icon-button
                    .icon=${yChevronRight}
                    variant="text"
                    @click=${() => { this.scrollToRight() }}
            ></y-core-icon-button>
        </div>
    `
  }

  private setupIntersectionObserver() {
    if (!this.tabElements) return

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement
          target.toggleAttribute(VISIBLE_TAB_DATA_ATTRIBUTE, entry.isIntersecting)
        })
      },
      {
        root: this.tabsContainer, // Контейнер со скроллом
        threshold: 0.99, // Считается видимым, если 99% элемента в зоне видимости
      },
    )

    // Наблюдаем за всеми табами контейнера
    Array.from(this.tabElements).forEach((child) => {
      this.intersectionObserver?.observe(child)
    })
  }

  private setupContainerResizeObserver() {
    if (!this.rootContainer) return

    this.rootContainerResizeObserver = new ResizeObserver(() => {
      this.updateScrollButtons()
    })

    this.rootContainerResizeObserver.observe(this.rootContainer)
  }

  protected scrollToLeft() {
    this.scrollByDirection(-1) // -1 = на один элемент влево
  }

  protected scrollToRight() {
    this.scrollByDirection(1) // 1 = на один элемент вправо
  }

  protected scrollByDirection(direction: number) {
    if (!this.tabsContainer || !this.tabElements) return

    const isToLeft = direction < 0
    const edgeElementIdx = this.getEdgeElementIndex(isToLeft)

    if (edgeElementIdx === null) return

    const tabToScrollIdx = isToLeft ? edgeElementIdx - 1 : edgeElementIdx + 1
    this.scrollToTab(tabToScrollIdx)
  }

  private getEdgeElementIndex(isToLeft: boolean): number | null {
    const visibleTabsIndexes: number[] = []

    this.tabElements?.forEach((tabEl, index) => {
      if (tabEl.hasAttribute(VISIBLE_TAB_DATA_ATTRIBUTE)) {
        visibleTabsIndexes.push(index)
      }
    })

    if (visibleTabsIndexes.length === 0) return null

    // Получаем индекс следующего элемента, который хотим отобразить
    return isToLeft
      ? visibleTabsIndexes[0]
      : visibleTabsIndexes[visibleTabsIndexes.length - 1]
  }

  private scrollToTab(tabIndex: number): void {
    if (!this.tabElements || tabIndex < 0 || tabIndex > this.tabElements.length - 1) return

    const tabElement = this.tabElements[tabIndex]

    // Смещение скролла для табов на ширину кнопки навигации
    tabElement.style.scrollMarginRight = NAV_BUTTON_WIDTH
    tabElement.style.scrollMarginLeft = NAV_BUTTON_WIDTH

    tabElement.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    })
  }

  protected render() {
    return html`
      <div class=${classMap(this.computedClass)}>
        ${this.renderLeftNavButton()}
        
        <div class=${classMap(this.computedTabsContainerClass)}>
          <slot @slotchange=${this.slotChangeHandler}>
              ${this.renderTabList()}
          </slot>
        </div>

        ${this.renderRightNavButton()}
      </div>
    `
  }
}
