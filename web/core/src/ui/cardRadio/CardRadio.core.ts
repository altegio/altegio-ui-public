import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { consume } from '@lit/context'
import { bubblingEvent, type TDispatcher } from '~core/utils/event-decorator'
import { createCoreCardRadioProps, type IAltCoreCardRadioProps, CoreCardRadioCheckedEvent } from '~core/ui/cardRadio/models/types'
import { type IAltCoreSimpleRadioButtonProps } from '~core/ui/simpleRadioButton/models/types'

import { EAltSizes } from '~shared/types/global'
import { AltCoreCardRadioTagName as tagName } from '~shared/constants'
import { preventAndStopEvent } from '~shared/utils/helpers'

import { disabledContextCreated, sizeContextCreated, checkedContextCreated, hoveredContextCreated } from '~core/ui/cardWrapper/providers'

import AltCardRadioVarsCss from '~core/ui/cardRadio/css/CardRadio.vars.css?inline'
import AltCardRadioScopedCss from '~core/ui/cardRadio/css/CardRadio.scoped.css?inline'

import '~core/ui/simpleRadioButton'
import { withLocator } from '~core/utils/locator'

const { disabled, size, checked } = createCoreCardRadioProps()

const mapSizeToRadioSize: Record<NonNullable<IAltCoreCardRadioProps['size']>, NonNullable<IAltCoreSimpleRadioButtonProps['size']>> = {
  [EAltSizes.SMALL]: EAltSizes.SMALL,
  [EAltSizes.MEDIUM]: EAltSizes.MEDIUM,
  [EAltSizes.LARGE]: EAltSizes.MEDIUM,
}

@customElement(tagName)
@withLocator(tagName)
export class AltCoreCardRadio
  extends LitElement
  implements IAltCoreCardRadioProps {
  @consume({ context: disabledContextCreated, subscribe: true })
  @property({ type: Boolean }) disabled: IAltCoreCardRadioProps['disabled'] = disabled
  @consume({ context: sizeContextCreated, subscribe: true })
  @property({ type: String, reflect: true }) size: IAltCoreCardRadioProps['size'] = size
  @consume({ context: checkedContextCreated, subscribe: true })
  @property({ type: Boolean }) checked: IAltCoreCardRadioProps['checked'] = checked

  @consume({ context: hoveredContextCreated, subscribe: true })
  @state() private hovered = false

  @bubblingEvent(
    CoreCardRadioCheckedEvent,
    { name: 'checked' },
  )
  private _checked!: TDispatcher<CoreCardRadioCheckedEvent>

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(AltCardRadioVarsCss)}
      ${unsafeCSS(AltCardRadioScopedCss)}
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

  private get computedRadioSize() {
    return mapSizeToRadioSize[this.computedSize]
  }

  private handleChecked = (event: Event) => {
    preventAndStopEvent(event)

    if (this.disabled) return

    this._checked({ detail: { checked: !this.checked } })
  }


  protected render() {
    return html`
      <div class=${classMap(this.computedClasses)}>
        <alt-core-simple-radio-button
          .size=${this.computedRadioSize}
          .checked=${this.checked}
          .disabled=${this.disabled}
          .hovered=${this.hovered}
          @checked=${this.handleChecked}
        ></alt-core-simple-radio-button>
      </div>
    `
  }
}
