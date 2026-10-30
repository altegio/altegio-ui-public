import type { PropertyValues, TemplateResult } from 'lit'
import { LitElement, html, css, unsafeCSS, nothing } from 'lit'
import { customElement, property, state, query } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { consume } from '@lit/context'
import { debounce } from 'radash'

import {
  createCoreCollapseItemProps,
  type IAltCoreCollapseItemProps,
  CollapseItemClickEvent,
  EAltCoreCollapseItemVariant,
} from '~core/ui/collapseItem/models/types'
import {
  AltCoreCollapseItemTagName as tagName,
} from '~shared/constants'

import {
  createCoreCollapseProps,
  type IAltCoreCollapseProps,
  EAltCoreCollapseType,
} from '~core/ui/collapse/models/types'

import '~core/ui/text'
import '~core/ui/icon'

import { hasSlotContent } from '~core/utils/lit-slots'
import { booleanConverter } from '~core/utils/converters'
import { altBigChevronUp, altBigChevronDown } from '~shared/icons'
import { type TDispatcher, bubblingEvent } from '~core/utils/event-decorator'

import AltCoreCollapseItemVarsCSS from '~core/ui/collapseItem/css/CollapseItem.vars.css?inline'
import AltCoreCollapseItemScopedCSS from '~core/ui/collapseItem/css/CollapseItem.scoped.css?inline'

import { valueContextCreated, typeContextCreated, variantContextCreated } from '~core/ui/collapse/providers'
import { EAltCoreTextSize } from '~core/ui/text/models/types'
import { withLocator } from '~core/utils/locator'

const { value: collapseValue, type: collapseType } = createCoreCollapseProps()
const { label, annotation, opened, value, variant, loading, shallow } = createCoreCollapseItemProps()

@customElement(tagName)
@withLocator(tagName)
export class AltCoreCollapseItem
  extends LitElement
  implements IAltCoreCollapseItemProps {
  @property({ type: String }) label: IAltCoreCollapseItemProps['label'] = label
  @property({ type: String }) annotation: IAltCoreCollapseItemProps['annotation'] = annotation
  @property({ type: Boolean }) opened: IAltCoreCollapseItemProps['opened'] = opened
  @property({ type: Boolean }) loading: IAltCoreCollapseItemProps['loading'] = loading
  @property({ type: Boolean, converter: booleanConverter }) shallow: IAltCoreCollapseItemProps['shallow'] = shallow
  @property({ type: String, reflect: true }) value: IAltCoreCollapseItemProps['value'] = value
  @consume({ context: variantContextCreated, subscribe: true })
  @property({ type: String }) variant: IAltCoreCollapseItemProps['variant'] = variant

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreCollapseItemVarsCSS)}
      ${unsafeCSS(AltCoreCollapseItemScopedCSS)}
    `,
  ]

  @state() hasBeforeSlot = false
  @state() hasAvatarSlot = false
  @state() hasAfterSlot = false
  @state() contentHeight = 0
  @state() contentHeightAuto = false

  @consume({ context: valueContextCreated, subscribe: true })
  @state() collapseValue: IAltCoreCollapseProps['value'] = collapseValue
  @consume({ context: typeContextCreated, subscribe: true })
  @state() collapseType: IAltCoreCollapseProps['type'] = collapseType

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
    return this.variant === EAltCoreCollapseItemVariant.PRIMARY || this.variant === EAltCoreCollapseItemVariant.SECONDARY
  }

  private get textFontSize(): EAltCoreTextSize {
    switch (this.variant) {
      case EAltCoreCollapseItemVariant.PRIMARY:
        return EAltCoreTextSize.P1_MEDIUM
      case EAltCoreCollapseItemVariant.SECONDARY:
        return EAltCoreTextSize.P2_MEDIUM
      case EAltCoreCollapseItemVariant.GHOST:
        return EAltCoreTextSize.H3_SEMIBOLD
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

    if (this.collapseType === EAltCoreCollapseType.SINGLE) {
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
      // Switch from auto to a fixed height first, otherwise the collapse transition has nothing to animate from
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
        // Switch to height: auto after the transition so dynamic content is not clipped
        this.scheduleTransitionToAuto()
      } else {
        this.contentHeight = 0
      }
    })
  })

  private handleTransitionEnd: (event: TransitionEvent) => void = (event: TransitionEvent) => {
    if (event.propertyName !== 'height') return
    if (!this.contentElement) return

    // An open item that is not loading keeps height: auto
    if (this.computedOpened && !this.loading) {
      this.contentHeightAuto = true
    }
  }

  private scheduleTransitionToAuto: () => void = () => {
    // Clear any pending timer first
    if (this.transitionToAutoTimeout) {
      clearTimeout(this.transitionToAutoTimeout)
      this.transitionToAutoTimeout = null
    }

    // Set height: auto once the transition ends so the content can grow
    this.transitionToAutoTimeout = window.setTimeout(() => {
      this.contentHeightAuto = this.computedOpened
      this.transitionToAutoTimeout = null
    }, 350)
  }

  private observeContent: () => void = () => {
    if (!this.contentElement || this.resizeObserver) return

    this.resizeObserver = new ResizeObserver(() => {
      // Update the height on content resize, but only while the item is open
      requestAnimationFrame(() => {
        if (this.computedOpened && !this.contentHeightAuto && this.contentElement) {
          this.contentHeight = this.contentElement.scrollHeight
        }
      })
    })

    this.resizeObserver.observe(this.contentElement)
    this.observeAssignedElements()

    if (!this.hasTransitionListener) {
      // Switch to height: auto when the transition ends
      this.contentElement.addEventListener('transitionend', this.handleTransitionEnd)
      this.hasTransitionListener = true
    }
  }

  private unobserveContent: () => void = () => {
    // Disconnect the observers on unmount
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

    // Elements assigned to the content slot
    const assigned = this.contentSlotElement.assignedElements({ flatten: true })

    // Observe each slotted element
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

    // Recalculate the height only when a property that affects
    // the open/closed state has changed
    if (this.hasOpenStateChanged(changedProperties)) {
      this.updateContentHeight()
    }

    // Make sure the ResizeObserver is connected once the DOM is ready
    this.observeContent()
  }


  disconnectedCallback(): void {
    super.disconnectedCallback()

    // Cancel pending debounced calls when the component is disconnected
    this.updateContentHeight.cancel()

    // Disconnect the ResizeObserver
    this.unobserveContent()
  }

  private renderActivatorBody() {
    if (this.shallow) return nothing

    return html`
      <alt-core-text
        variant="primary"
        class=${classMap(this.computedMainWrapperClasses)}
        .size=${this.textFontSize}
        .ellipsis=${this.hasHeightRestriction}
        .lineclamp=${this.hasHeightRestriction ? 1 : undefined}
      >
        <slot name="main">
          <div class=${classMap(this.computedMainClasses)}>
            <alt-core-text
              variant="primary"
              .size=${this.textFontSize}
              .ellipsis=${this.hasHeightRestriction}
              .lineclamp=${this.hasHeightRestriction ? 1 : undefined}
            >
              <slot name="label">${this.label}</slot>
            </alt-core-text>

            <alt-core-text
              variant="secondary"
              size="a2-regular"
              .ellipsis=${this.hasHeightRestriction}
              .lineclamp=${this.hasHeightRestriction ? 1 : undefined}
            >
              <slot name="annotation">${this.annotation}</slot>
            </alt-core-text>
          </div>
        </slot>
      </alt-core-text>
      <div class=${classMap(this.computedAfterClasses)}>
        <slot name="after" @slotchange=${this.handleAfterSlotChange}></slot>
      </div>
      <div class=${classMap(this.computedIconClasses)}>
        <alt-core-icon
          .icon=${this.computedOpened ? altBigChevronUp : altBigChevronDown}
          size="16px"
        ></alt-core-icon>
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
