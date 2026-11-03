import { customElement, property, state } from 'lit/decorators.js'
import { AltCoreEmptyStateTagName as tagName } from '~shared/constants'
import { css, html, LitElement, nothing, unsafeCSS } from 'lit'
import { renderIcon } from '~core/renderers'
import { EAltCoreTextSize, EAltCoreTextVariant } from '~core/ui/text/models/types'
import AltCoreEmptyStateScopedCSS from '~core/ui/emptyState/css/EmptyState.scoped.css?inline'
import AltCoreEmptyStateVarsCSS from '~core/ui/emptyState/css/EmptyState.vars.css?inline'
import {
  createCoreEmptyStateExternalProps,
  type IAltCoreEmptyStateExternalProps,
} from '~core/ui/emptyState/models/types/external'
import '~core/ui/text'
import { classMap } from 'lit/directives/class-map.js'
import { EAltSizes } from '~shared/types/global'
import { hasSlotContent } from '~core/utils/lit-slots'
import { withLocator } from '~core/utils/locator'

const { title, description, icon, size } = createCoreEmptyStateExternalProps()

@customElement(tagName)
@withLocator(tagName)
export class AltCoreEmptyState extends LitElement implements IAltCoreEmptyStateExternalProps {
  @property({ type: String, attribute: 'title' }) title: IAltCoreEmptyStateExternalProps['title'] = title
  @property({ type: String, attribute: 'description' }) description: IAltCoreEmptyStateExternalProps['description'] = description
  @property({ type: String, attribute: 'size' }) size: IAltCoreEmptyStateExternalProps['size'] = size
  @property({ type: Object, attribute: 'icon' }) icon: IAltCoreEmptyStateExternalProps['icon'] = icon

  @state() private hasActionsSlot = false

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreEmptyStateScopedCSS)}
      ${unsafeCSS(AltCoreEmptyStateVarsCSS)}
    `,
  ]

  private get rootClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_size-${this.size}`]: Boolean(this.size),
    }
  }

  private get actionsClasses() {
    const actionsBaseClass = `${this.baseClass}__actions`
    return {
      [actionsBaseClass]: true,
      [`${actionsBaseClass}_hidden`]: !this.hasActionsSlot,
    }
  }

  private get iconSize() {
    return {
      [EAltSizes.SMALL]: '16px',
      [EAltSizes.MEDIUM]: '24px',
    }[this.size ?? EAltSizes.MEDIUM]
  }

  private get titleSize() {
    return {
      [EAltSizes.SMALL]: EAltCoreTextSize.H4_SEMIBOLD,
      [EAltSizes.MEDIUM]: EAltCoreTextSize.H3_SEMIBOLD,
    }[this.size ?? EAltSizes.MEDIUM]
  }

  private handleSlotActionsChange = (e: Event) => {
    const target = e.target as HTMLSlotElement
    this.hasActionsSlot = hasSlotContent(target)
  }

  private renderTitle() {
    return html`
      <alt-core-text .size=${this.titleSize}>
        ${this.title}    
      </alt-core-text>
    `
  }

  private renderDescription() {
    return html`
      <alt-core-text 
        .size=${EAltCoreTextSize.P2_REGULAR}
        .variant=${EAltCoreTextVariant.SECONDARY}
      >
        ${this.description}
      </alt-core-text>
    `
  }

  private renderContent() {
    return html`
      <div class="${this.baseClass}__content">
        ${this.title ? this.renderTitle() : nothing}
        ${this.description ? this.renderDescription() : nothing}
      </div>
    `
  }


  protected render() {
    return html`
      <div class=${classMap(this.rootClasses)}>
        <div class="${this.baseClass}__icon-container">
          ${renderIcon({ icon: this.icon ?? icon, size: this.iconSize })}
        </div>

        ${this.title || this.description ? this.renderContent() : nothing}

          <div class=${classMap(this.actionsClasses)}>
            <slot
              name="actions"
              @slotchange=${this.handleSlotActionsChange}
            ></slot>
          </div>
      </div>
    `
  }
}
