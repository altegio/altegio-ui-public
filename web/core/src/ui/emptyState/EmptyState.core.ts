import { customElement, property, state } from 'lit/decorators.js'
import { YCoreEmptyStateTagName as tagName } from '~shared/constants'
import { css, html, LitElement, nothing, unsafeCSS } from 'lit'
import { renderIcon } from '~core/renderers'
import { EYCoreTextSize, EYCoreTextVariant } from '~core/ui/text/models/types'
import YCoreEmptyStateScopedCSS from '~core/ui/emptyState/css/EmptyState.scoped.css?inline'
import YCoreEmptyStateVarsCSS from '~core/ui/emptyState/css/EmptyState.vars.css?inline'
import {
  createCoreEmptyStateExternalProps,
  type IYCoreEmptyStateExternalProps,
} from '~core/ui/emptyState/models/types/external'
import '~core/ui/text'
import { classMap } from 'lit/directives/class-map.js'
import { EYSizes } from '~shared/types/global'
import { hasSlotContent } from '~core/utils/lit-slots'
import { withLocator } from '~core/utils/locator'

const { title, description, icon, size } = createCoreEmptyStateExternalProps()

@customElement(tagName)
@withLocator(tagName)
export class YCoreEmptyState extends LitElement implements IYCoreEmptyStateExternalProps {
  @property({ type: String, attribute: 'title' }) title: IYCoreEmptyStateExternalProps['title'] = title
  @property({ type: String, attribute: 'description' }) description: IYCoreEmptyStateExternalProps['description'] = description
  @property({ type: String, attribute: 'size' }) size: IYCoreEmptyStateExternalProps['size'] = size
  @property({ type: Object, attribute: 'icon' }) icon: IYCoreEmptyStateExternalProps['icon'] = icon

  @state() private hasActionsSlot = false

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(YCoreEmptyStateScopedCSS)}
      ${unsafeCSS(YCoreEmptyStateVarsCSS)}
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
      [EYSizes.SMALL]: '16px',
      [EYSizes.MEDIUM]: '24px',
    }[this.size ?? EYSizes.MEDIUM]
  }

  private get titleSize() {
    return {
      [EYSizes.SMALL]: EYCoreTextSize.H4_SEMIBOLD,
      [EYSizes.MEDIUM]: EYCoreTextSize.H3_SEMIBOLD,
    }[this.size ?? EYSizes.MEDIUM]
  }

  private handleSlotActionsChange = (e: Event) => {
    const target = e.target as HTMLSlotElement
    this.hasActionsSlot = hasSlotContent(target)
  }

  private renderTitle() {
    return html`
      <y-core-text .size=${this.titleSize}>
        ${this.title}    
      </y-core-text>
    `
  }

  private renderDescription() {
    return html`
      <y-core-text 
        .size=${EYCoreTextSize.P2_REGULAR}
        .variant=${EYCoreTextVariant.SECONDARY}
      >
        ${this.description}
      </y-core-text>
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
