import { css, html, LitElement, nothing, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import AltCoreTabScopedCSS from '~core/ui/tab/css/Tab.scoped.css?inline'
import AltCoreTabVarsCSS from '~core/ui/tab/css/Tab.vars.css?inline'

import { AltCoreTabTagName as tagName } from '~shared/constants'
import { createCoreTabProps, type IAltCoreTabProps } from '~core/ui/tab/models/types'
import { classMap } from 'lit/directives/class-map.js'

import '~core/ui/icon'
import '~core/ui/counter'
import '~core/ui/tag'
import { EAltCoreCounterVariant } from '~core/ui/counter/models/types'
import { EAltCoreTextSize, EAltCoreTextVariant } from '~core/ui/text/models/types'
import { interceptEvents } from '~core/utils/event-interceptor'
import { EAltSizes } from '~shared/types/global'
import { withLocator } from '~core/utils/locator'

const { active, isCounterVisible, isTagVisible, disabled, text, counterValue, tagVariant, leftIcon, leftIconSize, tagText, locator, locatorTag, locatorCounter } = createCoreTabProps()

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class AltCoreTab extends LitElement implements IAltCoreTabProps {
  @property({ type: Boolean, attribute: 'active' }) active: IAltCoreTabProps['active'] = active
  @property({ type: Boolean, attribute: 'disabled' }) disabled: IAltCoreTabProps['disabled'] = disabled
  @property({ type: Boolean, attribute: 'is-tag-visible' }) isTagVisible: IAltCoreTabProps['isTagVisible'] = isTagVisible
  @property({ type: String, attribute: 'tag-text' }) tagText: IAltCoreTabProps['tagText'] = tagText
  @property({ type: String, attribute: 'locator' }) locator: IAltCoreTabProps['locator'] = locator
  @property({ type: String, attribute: 'locator-tag' }) locatorTag: IAltCoreTabProps['locatorTag'] = locatorTag
  @property({ type: String, attribute: 'locator-counter' }) locatorCounter: IAltCoreTabProps['locatorCounter'] = locatorCounter
  @property({ type: Boolean, attribute: 'is-counter-visible' }) isCounterVisible: IAltCoreTabProps['isCounterVisible'] = isCounterVisible
  @property({ type: String, attribute: 'text' }) text: IAltCoreTabProps['text'] = text
  @property({ type: Number, attribute: 'counter-value' }) counterValue: IAltCoreTabProps['counterValue'] = counterValue
  @property({ type: String, attribute: 'tag-variant' }) tagVariant: IAltCoreTabProps['tagVariant'] = tagVariant
  @property({ type: Object, attribute: 'left-icon' }) leftIcon: IAltCoreTabProps['leftIcon'] = leftIcon
  @property({ type: String, attribute: 'left-icon-size' }) leftIconSize: IAltCoreTabProps['leftIconSize'] = leftIconSize

  private readonly baseClass = tagName

  static readonly styles = [
    css`${unsafeCSS(AltCoreTabVarsCSS)}`,
    css`${unsafeCSS(AltCoreTabScopedCSS)}`,
  ]

  private get computedClass() {
    return { [this.baseClass]: true }
  }

  private get computedTextVariant() {
    if (this.active) {
      return this.disabled ? EAltCoreTextVariant.TERTIARY : EAltCoreTextVariant.PRIMARY
    }
    return this.disabled ? EAltCoreTextVariant.TERTIARY : EAltCoreTextVariant.SECONDARY
  }

  private get computedCounterVariant() {
    return this.active ? EAltCoreCounterVariant.OTHER_INVERT : EAltCoreCounterVariant.SECONDARY
  }

  private get computedIconClass() {
    return {
      [`${this.baseClass}__left-icon`]: true,
      [`${this.baseClass}__left-icon_active`]: Boolean(this.active),
      [`${this.baseClass}__left-icon_disabled`]: Boolean(this.disabled),
    }
  }

  private get computedActivatorClass() {
    return {
      [`${this.baseClass}__activator`]: true,
      [`${this.baseClass}__activator_active`]: Boolean(this.active),
      [`${this.baseClass}__activator_disabled`]: Boolean(this.disabled),
    }
  }

  protected render() {
    return html`
      <div class=${classMap(this.computedClass)}>
        <slot name="before">
          ${
            this.leftIcon
              ? html`
                  <alt-core-icon
                    class=${classMap(this.computedIconClass)}
                    .icon=${this.leftIcon}
                    .size=${this.leftIconSize}
                  ></alt-core-icon>`
              : nothing
          }
        </slot>

        <alt-core-text
          class=${`${this.baseClass}__text`}
          .variant=${this.computedTextVariant}
          .size=${EAltCoreTextSize.P2_MEDIUM}
          ellipsis
        >
            ${this.text}
        </alt-core-text>
        
        <slot name="after">
          ${
            this.isCounterVisible
              ? html`
                  <alt-core-counter
                    .value=${this.counterValue}
                    .variant=${this.computedCounterVariant}
                    .disabled=${this.disabled}
                    .locator=${this.locatorCounter}
                  ></alt-core-counter>`
              : nothing
          }
          
          ${
            this.isTagVisible && this.tagText
              ? html`
                  <alt-core-tag
                    .variant=${this.tagVariant}
                    .disabled=${this.disabled}
                    .size=${EAltSizes.SMALL}
                    .locator=${this.locatorTag}
                  >${this.tagText}</alt-core-tag>`
              : nothing
          }
        </slot>
        
        <div class=${classMap(this.computedActivatorClass)}></div>
      </div>
    `
  }
}
