import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { consume } from '@lit/context'
import { bubblingEvent, type TDispatcher } from '~core/utils/event-decorator'
import { createCoreCardRadioProps, type IYCoreCardRadioProps, CoreCardRadioCheckedEvent } from '~core/ui/cardRadio/models/types'
import { type IYCoreSimpleRadioButtonProps } from '~core/ui/simpleRadioButton/models/types'

import { EYSizes } from '~shared/types/global'
import { YCoreCardRadioTagName as tagName } from '~shared/constants'
import { preventAndStopEvent } from '~shared/utils/helpers'

import { disabledContextCreated, sizeContextCreated, checkedContextCreated, hoveredContextCreated } from '~core/ui/cardWrapper/providers'

import YCardRadioVarsCss from '~core/ui/cardRadio/css/CardRadio.vars.css?inline'
import YCardRadioScopedCss from '~core/ui/cardRadio/css/CardRadio.scoped.css?inline'

import '~core/ui/simpleRadioButton'
import { withLocator } from '~core/utils/locator'

const { disabled, size, checked } = createCoreCardRadioProps()

const mapSizeToRadioSize: Record<NonNullable<IYCoreCardRadioProps['size']>, NonNullable<IYCoreSimpleRadioButtonProps['size']>> = {
  [EYSizes.SMALL]: EYSizes.SMALL,
  [EYSizes.MEDIUM]: EYSizes.MEDIUM,
  [EYSizes.LARGE]: EYSizes.MEDIUM,
}

@customElement(tagName)
@withLocator(tagName)
export class YCoreCardRadio
  extends LitElement
  implements IYCoreCardRadioProps {
  @consume({ context: disabledContextCreated, subscribe: true })
  @property({ type: Boolean }) disabled: IYCoreCardRadioProps['disabled'] = disabled
  @consume({ context: sizeContextCreated, subscribe: true })
  @property({ type: String, reflect: true }) size: IYCoreCardRadioProps['size'] = size
  @consume({ context: checkedContextCreated, subscribe: true })
  @property({ type: Boolean }) checked: IYCoreCardRadioProps['checked'] = checked

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
      ${unsafeCSS(YCardRadioVarsCss)}
      ${unsafeCSS(YCardRadioScopedCss)}
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
        <y-core-simple-radio-button
          .size=${this.computedRadioSize}
          .checked=${this.checked}
          .disabled=${this.disabled}
          .hovered=${this.hovered}
          @checked=${this.handleChecked}
        ></y-core-simple-radio-button>
      </div>
    `
  }
}
