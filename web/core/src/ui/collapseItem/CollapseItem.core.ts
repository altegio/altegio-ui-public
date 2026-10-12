import type { PropertyValues, TemplateResult } from 'lit'
import { LitElement, html, css, unsafeCSS, nothing } from 'lit'
import { customElement, property, state, query } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { consume } from '@lit/context'
import { debounce } from 'radash'

import {
  createCoreCollapseItemProps,
  type IYCoreCollapseItemProps,
  CollapseItemClickEvent,
  EYCoreCollapseItemVariant,
} from '~core/ui/collapseItem/models/types'
import {
  YCoreCollapseItemTagName as tagName,
} from '~shared/constants'

import {
  createCoreCollapseProps,
  type IYCoreCollapseProps,
  EYCoreCollapseType,
} from '~core/ui/collapse/models/types'

import '~core/ui/text'
import '~core/ui/icon'

import { hasSlotContent } from '~core/utils/lit-slots'
import { booleanConverter } from '~core/utils/converters'
import { yBigChevronUp, yBigChevronDown } from '~shared/icons'
import { type TDispatcher, bubblingEvent } from '~core/utils/event-decorator'

import YCoreCollapseItemVarsCSS from '~core/ui/collapseItem/css/CollapseItem.vars.css?inline'
import YCoreCollapseItemScopedCSS from '~core/ui/collapseItem/css/CollapseItem.scoped.css?inline'

import { valueContextCreated, typeContextCreated, variantContextCreated } from '~core/ui/collapse/providers'
import { EYCoreTextSize } from '~core/ui/text/models/types'
import { withLocator } from '~core/utils/locator'

const { value: collapseValue, type: collapseType } = createCoreCollapseProps()
const { label, annotation, opened, value, variant, loading, shallow } = createCoreCollapseItemProps()

@customElement(tagName)
@withLocator(tagName)
export class YCoreCollapseItem
  extends LitElement
  implements IYCoreCollapseItemProps {
  @property({ type: String }) label: IYCoreCollapseItemProps['label'] = label
  @property({ type: String }) annotation: IYCoreCollapseItemProps['annotation'] = annotation
  @property({ type: Boolean }) opened: IYCoreCollapseItemProps['opened'] = opened
  @property({ type: Boolean }) loading: IYCoreCollapseItemProps['loading'] = loading
  @property({ type: Boolean, converter: booleanConverter }) shallow: IYCoreCollapseItemProps['shallow'] = shallow
  @property({ type: String, reflect: true }) value: IYCoreCollapseItemProps['value'] = value
  @consume({ context: variantContextCreated, subscribe: true })
  @property({ type: String }) variant: IYCoreCollapseItemProps['variant'] = variant

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(YCoreCollapseItemVarsCSS)}
      ${unsafeCSS(YCoreCollapseItemScopedCSS)}
    `,
  ]

  @state() hasBeforeSlot = false
  @state() hasAvatarSlot = false
  @state() hasAfterSlot = false
  @state() contentHeight = 0
  @state() contentHeightAuto = false

  @consume({ context: valueContextCreated, subscribe: true })
  @state() collapseValue: IYCoreCollapseProps['value'] = collapseValue
  @consume({ context: typeContextCreated, subscribe: true })
  @state() collapseType: IYCoreCollapseProps['type'] = collapseType

  @query('[data-activator]') public readonly activatorElement?: HTMLDivElement
  @query('[data-content]') public readonly contentElement?: HTMLDivElement
  @query('slot[name="content"]') public readonly contentSlotElement?: HTMLSlotElement

  @bubblingEvent(
    CollapseItemClickEvent,
    { name: 'collapse-item-click' },
  )
  _collapseItemClick!: TDispatcher<CollapseItemClickEvent>

  private resizeObserver?: ResizeObserver
  private observedTargets = new Set<Element>()
  private hasTransitionListener = false
  private transitionToAutoTimeout: number | null = null

  private get computedClasses(): Record<string, boolean> {
    return { [this.baseClass]: true }
  }
  private get computedActivatorClasses(): Record<string, boolean> {
    return {
      [`${this.baseClass}__activator`]: true,
      [`${this.baseClass}__activator_variant_${this.variant}`]: true,
      [`${this.baseClass}__activator_shallow`]: Boolean(this.shallow),
    }
  }
  private get computedContentClasses(): Record<string, boolean> {
    return {
      [`${this.baseClass}__content`]: true,
      [`${this.baseClass}__content_variant_${this.variant}`]: true,
      [`${this.baseClass}__content_opened`]: Boolean(this.computedOpened),
      [`${this.baseClass}__content_loading`]: Boolean(this.loading),
    }
  }
  private get computedBeforeClasses(): Record<string, boolean> {
    return {
      [`${this.baseClass}__before`]: true,
      [`${this.baseClass}__before_visible`]: this.hasBeforeSlot,
    }
  }
  private get computedAvatarClasses(): Record<string, boolean> {
    return {
      [`${this.baseClass}__avatar`]: true,
      [`${this.baseClass}__avatar_visible`]: this.hasAvatarSlot,
    }
  }
  private get computedMainClasses(): Record<string, boolean> {
    return { [`${this.baseClass}__main`]: true }
  }
  private get computedMainWrapperClasses(): Record<string, boolean> {
    return { [`${this.baseClass}__main-wrapper`]: true }
  }
  private get computedAfterClasses(): Record<string, boolean> {
    return {
      [`${this.baseClass}__after`]: true,
      [`${this.baseClass}__after_variant_${this.variant}`]: true,
      [`${this.baseClass}__after_visible`]: this.hasAfterSlot,
    }
  }
  private get computedIconClasses(): Record<string, boolean> {
    return { [`${this.baseClass}__icon`]: true }
  }

  private get hasHeightRestriction(): boolean {
    return this.variant === EYCoreCollapseItemVariant.PRIMARY || this.variant === EYCoreCollapseItemVariant.SECONDARY
  }

  private get textFontSize(): EYCoreTextSize {
    switch (this.variant) {
      case EYCoreCollapseItemVariant.PRIMARY:
        return EYCoreTextSize.P1_MEDIUM
      case EYCoreCollapseItemVariant.SECONDARY:
        return EYCoreTextSize.P2_MEDIUM
      case EYCoreCollapseItemVariant.GHOST:
        return EYCoreTextSize.H3_SEMIBOLD
      default:
        throw new Error(`Unknown variant: ${this.variant}`)
    }
  }

  private handleBeforeSlotChange: (event: Event) => void = (event: Event) => {
    event.stopPropagation()

    const target = event.target as HTMLSlotElement
    this.hasBeforeSlot = hasSlotContent(target)
  }

  private handleAvatarSlotChange: (event: Event) => void = (event: Event) => {
    event.stopPropagation()

    const target = event.target as HTMLSlotElement
    this.hasAvatarSlot = hasSlotContent(target)
  }

  private handleAfterSlotChange: (event: Event) => void = (event: Event) => {
    event.stopPropagation()

    const target = event.target as HTMLSlotElement
    this.hasAfterSlot = hasSlotContent(target)
  }

  public get computedOpened(): boolean {
    if (this.shallow) {
      return false
    }

    if (this.opened) {
      return true
    }

    if (this.collapseType === EYCoreCollapseType.SINGLE) {
      return this.collapseValue === this.value
    }

    return Array.isArray(this.collapseValue) && this.collapseValue.includes(this.value)
  }

  private handleActivatorClick: (event: Event) => void = (event: Event) => {
    this._collapseItemClick({
      detail: {
        event,
        value: this.value,
        opened: this.computedOpened,
      },
    })
  }

  private updateContentHeight: (() => void) & { cancel: () => void } = debounce({ delay: 10 }, (): void => {
    const content = this.contentElement

    if (!content) return

    if (!this.computedOpened) {
      // Если было auto, переведём в текущую высоту, чтобы анимация закрытия сработала
      if (this.contentHeightAuto) {
        content.style.height = `${content.scrollHeight}px`
      }

      this.contentHeightAuto = false

      requestAnimationFrame(() => {
        this.contentHeight = 0
      })

      return
    }

    requestAnimationFrame(() => {
      if (this.computedOpened) {
        this.contentHeightAuto = false

        this.contentHeight = content.scrollHeight
        // После завершения анимации переведём высоту в auto, чтобы динамический контент не обрезался
        this.scheduleTransitionToAuto()
      } else {
        this.contentHeight = 0
      }
    })
  })

  private handleTransitionEnd: (event: TransitionEvent) => void = (event: TransitionEvent) => {
    if (event.propertyName !== 'height') return
    if (!this.contentElement) return

    // Если элемент открыт и не в состоянии загрузки, фиксируем auto
    if (this.computedOpened && !this.loading) {
      this.contentHeightAuto = true
    }
  }

  private scheduleTransitionToAuto: () => void = () => {
    // На всякий случай сбросим предыдущий таймер
    if (this.transitionToAutoTimeout) {
      clearTimeout(this.transitionToAutoTimeout)
      this.transitionToAutoTimeout = null
    }

    // Сеттим height: auto по окончании анимации, чтобы контент растягивался
    this.transitionToAutoTimeout = window.setTimeout(() => {
      this.contentHeightAuto = this.computedOpened
      this.transitionToAutoTimeout = null
    }, 350)
  }

  private observeContent: () => void = () => {
    if (!this.contentElement || this.resizeObserver) return

    this.resizeObserver = new ResizeObserver(() => {
      // При ресайзе контента обновляем высоту, только если элемент открыт
      requestAnimationFrame(() => {
        if (this.computedOpened && !this.contentHeightAuto && this.contentElement) {
          this.contentHeight = this.contentElement.scrollHeight
        }
      })
    })

    this.resizeObserver.observe(this.contentElement)
    this.observeAssignedElements()

    if (!this.hasTransitionListener) {
      // отслеживаем окончание анимации, чтобы установить height: auto
      this.contentElement.addEventListener('transitionend', this.handleTransitionEnd)
      this.hasTransitionListener = true
    }
  }

  private unobserveContent: () => void = () => {
    // отключаем обсерверы при размантировании
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
      this.resizeObserver = undefined
    }

    this.observedTargets.clear()

    if (this.hasTransitionListener) {
      this.contentElement?.removeEventListener('transitionend', this.handleTransitionEnd)
      this.hasTransitionListener = false
    }
  }

  private observeAssignedElements: () => void = () => {
    if (!this.resizeObserver || !this.contentSlotElement) return

    // Получаем элементы слота в DOM
    const assigned = this.contentSlotElement.assignedElements({ flatten: true })

    // Навешиваем обзерверы на элементы слота
    assigned.forEach((el) => {
      if (!this.observedTargets.has(el) && this.resizeObserver) {
        this.resizeObserver.observe(el)
        this.observedTargets.add(el)
      }
    })
  }

  private changeSlotContent: () => void = () => {
    this.observeAssignedElements()
    this.updateContentHeight()
  }

  private hasOpenStateChanged(changedProperties: PropertyValues<this>): boolean {
    return changedProperties.has('opened') ||
      changedProperties.has('loading') ||
      changedProperties.has('collapseValue') ||
      changedProperties.has('value') ||
      changedProperties.has('shallow')
  }

  updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('shallow') && this.shallow) {
      this.unobserveContent()
      this.contentHeight = 0
      this.contentHeightAuto = false
      return
    }

    // Пересчитываем высоту только если изменились свойства,
    // которые влияют на состояние открытия/закрытия
    if (this.hasOpenStateChanged(changedProperties)) {
      this.updateContentHeight()
    }

    // Гарантируем подключение ResizeObserver после инициализации DOM
    this.observeContent()
  }


  disconnectedCallback(): void {
    super.disconnectedCallback()

    // Отменяем отложенные вызовы debounce при отключении компонента
    this.updateContentHeight.cancel()

    // Отвязываем ResizeObserver
    this.unobserveContent()
  }

  private renderActivatorBody() {
    if (this.shallow) return nothing

    return html`
      <y-core-text
        variant="primary"
        class=${classMap(this.computedMainWrapperClasses)}
        .size=${this.textFontSize}
        .ellipsis=${this.hasHeightRestriction}
        .lineclamp=${this.hasHeightRestriction ? 1 : undefined}
      >
        <slot name="main">
          <div class=${classMap(this.computedMainClasses)}>
            <y-core-text
              variant="primary"
              .size=${this.textFontSize}
              .ellipsis=${this.hasHeightRestriction}
              .lineclamp=${this.hasHeightRestriction ? 1 : undefined}
            >
              <slot name="label">${this.label}</slot>
            </y-core-text>

            <y-core-text
              variant="secondary"
              size="a2-regular"
              .ellipsis=${this.hasHeightRestriction}
              .lineclamp=${this.hasHeightRestriction ? 1 : undefined}
            >
              <slot name="annotation">${this.annotation}</slot>
            </y-core-text>
          </div>
        </slot>
      </y-core-text>
      <div class=${classMap(this.computedAfterClasses)}>
        <slot name="after" @slotchange=${this.handleAfterSlotChange}></slot>
      </div>
      <div class=${classMap(this.computedIconClasses)}>
        <y-core-icon
          .icon=${this.computedOpened ? yBigChevronUp : yBigChevronDown}
          size="16px"
        ></y-core-icon>
      </div>
    `
  }

  private renderContent() {
    if (this.shallow) return nothing

    return html`
      <div
        data-content
        class=${classMap(this.computedContentClasses)}
        style=${this.contentHeightAuto ? 'height: auto' : `height: ${this.contentHeight}px`}
      >
        <slot name="content" @slotchange=${this.changeSlotContent}></slot>
      </div>
    `
  }

  protected render(): TemplateResult {
    return html`
      <div class=${classMap(this.computedClasses)}>
        <div
          data-activator
          class=${classMap(this.computedActivatorClasses)}
          @click=${this.handleActivatorClick}
        >
          <div class=${classMap(this.computedBeforeClasses)}>
            <slot name="before" @slotchange=${this.handleBeforeSlotChange}></slot>
          </div>
          <div class=${classMap(this.computedAvatarClasses)}>
            <slot name="avatar" @slotchange=${this.handleAvatarSlotChange}></slot>
          </div>
          ${this.renderActivatorBody()}
        </div>
        ${this.renderContent()}
      </div>
    `
  }
}
