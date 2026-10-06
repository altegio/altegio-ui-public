import { css, html, LitElement, nothing, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import YCoreTabScopedCSS from '~core/ui/tab/css/Tab.scoped.css?inline'
import YCoreTabVarsCSS from '~core/ui/tab/css/Tab.vars.css?inline'

import { YCoreTabTagName as tagName } from '~shared/constants'
import { createCoreTabProps, type IYCoreTabProps } from '~core/ui/tab/models/types'
import { classMap } from 'lit/directives/class-map.js'

import '~core/ui/icon'
import '~core/ui/counter'
import '~core/ui/tag'
import { EYCoreCounterVariant } from '~core/ui/counter/models/types'
import { EYCoreTextSize, EYCoreTextVariant } from '~core/ui/text/models/types'
import { interceptEvents } from '~core/utils/event-interceptor'
import { EYSizes } from '~shared/types/global'
import { withLocator } from '~core/utils/locator'

const { active, isCounterVisible, isTagVisible, disabled, text, counterValue, tagVariant, leftIcon, leftIconSize, tagText, locator, locatorTag, locatorCounter } = createCoreTabProps()

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class YCoreTab extends LitElement implements IYCoreTabProps {
  @property({ type: Boolean, attribute: 'active' }) active: IYCoreTabProps['active'] = active
  @property({ type: Boolean, attribute: 'disabled' }) disabled: IYCoreTabProps['disabled'] = disabled
  @property({ type: Boolean, attribute: 'is-tag-visible' }) isTagVisible: IYCoreTabProps['isTagVisible'] = isTagVisible
  @property({ type: String, attribute: 'tag-text' }) tagText: IYCoreTabProps['tagText'] = tagText
  @property({ type: String, attribute: 'locator' }) locator: IYCoreTabProps['locator'] = locator
  @property({ type: String, attribute: 'locator-tag' }) locatorTag: IYCoreTabProps['locatorTag'] = locatorTag
  @property({ type: String, attribute: 'locator-counter' }) locatorCounter: IYCoreTabProps['locatorCounter'] = locatorCounter
  @property({ type: Boolean, attribute: 'is-counter-visible' }) isCounterVisible: IYCoreTabProps['isCounterVisible'] = isCounterVisible
  @property({ type: String, attribute: 'text' }) text: IYCoreTabProps['text'] = text
  @property({ type: Number, attribute: 'counter-value' }) counterValue: IYCoreTabProps['counterValue'] = counterValue
  @property({ type: String, attribute: 'tag-variant' }) tagVariant: IYCoreTabProps['tagVariant'] = tagVariant
  @property({ type: Object, attribute: 'left-icon' }) leftIcon: IYCoreTabProps['leftIcon'] = leftIcon
  @property({ type: String, attribute: 'left-icon-size' }) leftIconSize: IYCoreTabProps['leftIconSize'] = leftIconSize

  private readonly baseClass = tagName

  static readonly styles = [
    css`${unsafeCSS(YCoreTabVarsCSS)}`,
    css`${unsafeCSS(YCoreTabScopedCSS)}`,
  ]

  private get computedClass() {
    return { [this.baseClass]: true }
  }

  private get computedTextVariant() {
    if (this.active) {
      return this.disabled ? EYCoreTextVariant.TERTIARY : EYCoreTextVariant.PRIMARY
    }
    return this.disabled ? EYCoreTextVariant.TERTIARY : EYCoreTextVariant.SECONDARY
  }

  private get computedCounterVariant() {
    return this.active ? EYCoreCounterVariant.OTHER_INVERT : EYCoreCounterVariant.SECONDARY
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
                  <y-core-icon
                    class=${classMap(this.computedIconClass)}
                    .icon=${this.leftIcon}
                    .size=${this.leftIconSize}
                  ></y-core-icon>`
              : nothing
          }
        </slot>

        <y-core-text
          class=${`${this.baseClass}__text`}
          .variant=${this.computedTextVariant}
          .size=${EYCoreTextSize.P2_MEDIUM}
          ellipsis
        >
            ${this.text}
        </y-core-text>
        
        <slot name="after">
          ${
            this.isCounterVisible
              ? html`
                  <y-core-counter
                    .value=${this.counterValue}
                    .variant=${this.computedCounterVariant}
                    .disabled=${this.disabled}
                    .locator=${this.locatorCounter}
                  ></y-core-counter>`
              : nothing
          }
          
          ${
            this.isTagVisible && this.tagText
              ? html`
                  <y-core-tag
                    .variant=${this.tagVariant}
                    .disabled=${this.disabled}
                    .size=${EYSizes.SMALL}
                    .locator=${this.locatorTag}
                  >${this.tagText}</y-core-tag>`
              : nothing
          }
        </slot>
        
        <div class=${classMap(this.computedActivatorClass)}></div>
      </div>
    `
  }
}
