import { LitElement, html, css, nothing, unsafeCSS } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import {
  createCoreListItemProps,
  type IAltCoreListItemProps,
} from '~core/ui/listItem/models/types'
import { AltCoreListItemTagName as tagName } from '~shared/constants'
import { booleanConverter } from '~core/utils/converters'
import { hasSlotContent } from '~core/utils/lit-slots'
import { withLocator } from '~core/utils/locator'

import AltCoreListItemVarsCss from '~core/ui/listItem/css/ListItem.vars.css?inline'
import AltCoreListItemScopedCss from '~core/ui/listItem/css/ListItem.scoped.css?inline'

const {
  label,
  caption,
  clickable,
  href,
  target,
  disabled,
  active,
  align,
} = createCoreListItemProps()

const hasMeaningfulNodes = (slot: HTMLSlotElement) => slot.assignedNodes({ flatten: true }).some((node) => {
  return node.nodeType === Node.ELEMENT_NODE || Boolean(node.textContent?.trim())
})

/**
 * A row of `alt-core-list`.
 *
 * A clickable item renders a native button and an item with `href` renders a link.
 * Both let the native `click` event through and stop it while the item is disabled.
 */
@customElement(tagName)
@withLocator(tagName)
export class AltCoreListItem
  extends LitElement
  implements IAltCoreListItemProps {
  @property({ type: String }) label: IAltCoreListItemProps['label'] = label
  @property({ type: String }) caption: IAltCoreListItemProps['caption'] = caption
  @property({ type: Boolean, converter: booleanConverter }) clickable: IAltCoreListItemProps['clickable'] = clickable
  @property({ type: String }) href: IAltCoreListItemProps['href'] = href
  @property({ type: String }) target: IAltCoreListItemProps['target'] = target
  @property({ type: Boolean, reflect: true, converter: booleanConverter }) disabled: IAltCoreListItemProps['disabled'] = disabled
  @property({ type: Boolean, reflect: true, converter: booleanConverter }) active: IAltCoreListItemProps['active'] = active
  @property({ type: String }) align: IAltCoreListItemProps['align'] = align

  @state() private hasDefaultSlot = false
  @state() private hasCaptionSlot = false
  @state() private hasStartSlot = false
  @state() private hasEndSlot = false

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreListItemVarsCss)}
      ${unsafeCSS(AltCoreListItemScopedCss)}
    `,
  ]

  connectedCallback() {
    super.connectedCallback()

    if (!this.hasAttribute('role')) this.setAttribute('role', 'listitem')

    this.addEventListener('click', this.handleHostClick, { capture: true })
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    this.removeEventListener('click', this.handleHostClick, { capture: true })
  }

  private get isLink() {
    return Boolean(this.href)
  }

  private get isInteractive() {
    return Boolean(this.clickable) || this.isLink
  }

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_interactive`]: this.isInteractive && !this.disabled,
      [`${this.baseClass}_active`]: Boolean(this.active),
      [`${this.baseClass}_disabled`]: Boolean(this.disabled),
      [`${this.baseClass}_align-${this.align}`]: Boolean(this.align),
    }
  }

  private get computedAriaCurrent() {
    return this.active ? 'true' : undefined
  }

  private sectionClasses(section: string, isVisible: boolean) {
    return {
      [`${this.baseClass}__${section}`]: true,
      [`${this.baseClass}__${section}_hidden`]: !isVisible,
    }
  }

  // A click on slotted content is not blocked by the disabled button, so it is stopped before any listener runs
  private handleHostClick = (event: Event) => {
    if (!this.disabled) return

    event.preventDefault()
    event.stopImmediatePropagation()
  }

  private handleDefaultSlotChange = (event: Event) => {
    this.hasDefaultSlot = hasMeaningfulNodes(event.target as HTMLSlotElement)
  }

  private handleCaptionSlotChange = (event: Event) => {
    this.hasCaptionSlot = hasSlotContent(event.target as HTMLSlotElement)
  }

  private handleStartSlotChange = (event: Event) => {
    this.hasStartSlot = hasSlotContent(event.target as HTMLSlotElement)
  }

  private handleEndSlotChange = (event: Event) => {
    this.hasEndSlot = hasSlotContent(event.target as HTMLSlotElement)
  }

  private renderContent() {
    const hasCaption = Boolean(this.caption) || this.hasCaptionSlot

    return html`
      <span class=${classMap(this.sectionClasses('start', this.hasStartSlot))}>
        <slot name="start" @slotchange=${this.handleStartSlotChange}></slot>
      </span>

      <span class="${this.baseClass}__main">
        <span class="${this.baseClass}__label">
          <slot @slotchange=${this.handleDefaultSlotChange}></slot>
          ${this.hasDefaultSlot ? nothing : this.label}
        </span>

        <span class=${classMap(this.sectionClasses('caption', hasCaption))}>
          <slot name="caption" @slotchange=${this.handleCaptionSlotChange}></slot>
          ${this.hasCaptionSlot ? nothing : this.caption}
        </span>
      </span>

      <span class=${classMap(this.sectionClasses('end', this.hasEndSlot))}>
        <slot name="end" @slotchange=${this.handleEndSlotChange}></slot>
      </span>
    `
  }

  private renderControl() {
    const controlClass = `${this.baseClass}__control`

    if (this.isLink && this.disabled) {
      return html`
        <a class=${controlClass} role="link" aria-disabled="true">${this.renderContent()}</a>
      `
    }

    if (this.isLink) {
      return html`
        <a
          class=${controlClass}
          href=${ifDefined(this.href)}
          target=${ifDefined(this.target)}
          rel=${ifDefined(this.target === '_blank' ? 'noopener noreferrer' : undefined)}
          aria-current=${ifDefined(this.computedAriaCurrent)}
        >${this.renderContent()}</a>
      `
    }

    if (this.clickable) {
      return html`
        <button
          type="button"
          class=${controlClass}
          ?disabled=${this.disabled}
          aria-current=${ifDefined(this.computedAriaCurrent)}
        >${this.renderContent()}</button>
      `
    }

    return html`<div class=${controlClass}>${this.renderContent()}</div>`
  }

  protected render() {
    return html`
      <div class=${classMap(this.computedClasses)}>
        ${this.renderControl()}
      </div>
    `
  }
}
