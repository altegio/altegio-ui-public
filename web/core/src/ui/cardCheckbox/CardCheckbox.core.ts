import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { consume } from '@lit/context'
import { classMap } from 'lit/directives/class-map.js'

import {
  createCoreCardCheckboxProps,
  type IAltCoreCardCheckboxProps,
  CoreCardCheckboxCheckedEvent,
} from '~core/ui/cardCheckbox/models/types'
import { AltCoreCardCheckboxTagName as tagName } from '~shared/constants'
import { preventAndStopEvent } from '~shared/utils/helpers'
import { EAltSizes } from '~shared/types/global'
import { bubblingEvent, type TDispatcher } from '~core/utils/event-decorator'

import {
  disabledContextCreated,
  sizeContextCreated,
  checkedContextCreated,
  hoveredContextCreated,
} from '~core/ui/cardWrapper/providers'

import type { IAltCoreSimpleCheckboxProps } from '~core/ui/simpleCheckbox/models/types'

import AltCardCheckboxVarsCss from '~core/ui/cardCheckbox/css/CardCheckbox.vars.css?inline'
import AltCardCheckboxScopedCss from '~core/ui/cardCheckbox/css/CardCheckbox.scoped.css?inline'

import '~core/ui/simpleCheckbox'
import { withLocator } from '~core/utils/locator'

const { disabled, size, checked } = createCoreCardCheckboxProps()

const mapSizeToCheckboxSize: Record<NonNullable<IAltCoreCardCheckboxProps['size']>, NonNullable<IAltCoreSimpleCheckboxProps['size']>> = {
  [EAltSizes.SMALL]: EAltSizes.SMALL,
  [EAltSizes.MEDIUM]: EAltSizes.MEDIUM,
  [EAltSizes.LARGE]: EAltSizes.MEDIUM,
}

@customElement(tagName)
@withLocator(tagName)
export class AltCoreCardCheckbox
  extends LitElement
  implements IAltCoreCardCheckboxProps {
  @consume({ context: disabledContextCreated, subscribe: true })
  @property({ type: Boolean }) disabled: IAltCoreCardCheckboxProps['disabled'] = disabled
  @consume({ context: sizeContextCreated, subscribe: true })
  @property({ type: String, reflect: true }) size: IAltCoreCardCheckboxProps['size'] = size
  @consume({ context: checkedContextCreated, subscribe: true })
  @property({ type: Boolean }) checked: IAltCoreCardCheckboxProps['checked'] = checked

  @consume({ context: hoveredContextCreated, subscribe: true })
  @state() private hovered = false


  @bubblingEvent(
    CoreCardCheckboxCheckedEvent,
    { name: 'checked' },
  )
  private _checked!: TDispatcher<CoreCardCheckboxCheckedEvent>

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(AltCardCheckboxVarsCss)}
      ${unsafeCSS(AltCardCheckboxScopedCss)}
    `,
  ]

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_size_${this.size}`]: true,
    }
  }

  private get computedSize() {
    return this.size ?? EAltSizes.MEDIUM
  }

  private get computedCheckboxSize() {
    return mapSizeToCheckboxSize[this.computedSize]
  }

  private handleChecked = (event: Event) => {
    preventAndStopEvent(event)

    if (this.disabled) return

    this._checked({ detail: { checked: !this.checked } })
  }


  protected render() {
    return html`
      <div class=${classMap(this.computedClasses)}>
        <alt-core-simple-checkbox
          .size=${this.computedCheckboxSize}
          .checked=${this.checked}
          .disabled=${this.disabled}
          .hovered=${this.hovered}
          @checked=${this.handleChecked}
        ></alt-core-simple-checkbox>
      </div>
    `
  }
}
