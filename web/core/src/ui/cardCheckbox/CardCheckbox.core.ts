import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { consume } from '@lit/context'
import { classMap } from 'lit/directives/class-map.js'

import {
  createCoreCardCheckboxProps,
  type IYCoreCardCheckboxProps,
  CoreCardCheckboxCheckedEvent,
} from '~core/ui/cardCheckbox/models/types'
import { YCoreCardCheckboxTagName as tagName } from '~shared/constants'
import { preventAndStopEvent } from '~shared/utils/helpers'
import { EYSizes } from '~shared/types/global'
import { bubblingEvent, type TDispatcher } from '~core/utils/event-decorator'

import {
  disabledContextCreated,
  sizeContextCreated,
  checkedContextCreated,
  hoveredContextCreated,
} from '~core/ui/cardWrapper/providers'

import type { IYCoreSimpleCheckboxProps } from '~core/ui/simpleCheckbox/models/types'

import YCardCheckboxVarsCss from '~core/ui/cardCheckbox/css/CardCheckbox.vars.css?inline'
import YCardCheckboxScopedCss from '~core/ui/cardCheckbox/css/CardCheckbox.scoped.css?inline'

import '~core/ui/simpleCheckbox'
import { withLocator } from '~core/utils/locator'

const { disabled, size, checked } = createCoreCardCheckboxProps()

const mapSizeToCheckboxSize: Record<NonNullable<IYCoreCardCheckboxProps['size']>, NonNullable<IYCoreSimpleCheckboxProps['size']>> = {
  [EYSizes.SMALL]: EYSizes.SMALL,
  [EYSizes.MEDIUM]: EYSizes.MEDIUM,
  [EYSizes.LARGE]: EYSizes.MEDIUM,
}

@customElement(tagName)
@withLocator(tagName)
export class YCoreCardCheckbox
  extends LitElement
  implements IYCoreCardCheckboxProps {
  @consume({ context: disabledContextCreated, subscribe: true })
  @property({ type: Boolean }) disabled: IYCoreCardCheckboxProps['disabled'] = disabled
  @consume({ context: sizeContextCreated, subscribe: true })
  @property({ type: String, reflect: true }) size: IYCoreCardCheckboxProps['size'] = size
  @consume({ context: checkedContextCreated, subscribe: true })
  @property({ type: Boolean }) checked: IYCoreCardCheckboxProps['checked'] = checked

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
      ${unsafeCSS(YCardCheckboxVarsCss)}
      ${unsafeCSS(YCardCheckboxScopedCss)}
    `,
  ]

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_size_${this.size}`]: true,
    }
  }

  private get computedSize() {
    return this.size ?? EYSizes.MEDIUM
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
        <y-core-simple-checkbox
          .size=${this.computedCheckboxSize}
          .checked=${this.checked}
          .disabled=${this.disabled}
          .hovered=${this.hovered}
          @checked=${this.handleChecked}
        ></y-core-simple-checkbox>
      </div>
    `
  }
}
