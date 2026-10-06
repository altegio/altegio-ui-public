import { LitElement, unsafeCSS, css } from 'lit'
import { html } from 'lit/static-html.js'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { classMap } from 'lit/directives/class-map.js'

import { renderIcon, renderText } from '~core/renderers'

import { EYSizes } from '~shared/types/global'
import {
  createCoreButtonProps,
  EYCoreButtonContentAlignment,
  type IYCoreButtonProps,
} from '~core/ui/button/models/types'
import { YCoreButtonTagName as tagName, YCoreSimpleButtonTagName } from '~shared/constants'

import ButtonScopedCSS from '~core/ui/button/css/Button.scoped.css?inline'
import ButtonVarsCSS from '~core/ui/button/css/Button.vars.css?inline'

import '~core/ui/simpleButton'
import { interceptEvents } from '~core/utils/event-interceptor'
import { booleanConverter } from '~core/utils/converters'
import { defineCustomElement } from '~web/shared/utils/components'
import { YCoreSimpleButton } from '~core/ui/simpleButton'
import { withLocator } from '~core/utils/locator'

const { disabled, href, iconLeft, iconRight, label, loading, size, variant, target, alignment, fullWidth } = createCoreButtonProps()

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class YCoreButton extends LitElement implements IYCoreButtonProps {
  @property({ type: String }) size: IYCoreButtonProps['size'] = size
  @property({ type: String, reflect: true }) variant: IYCoreButtonProps['variant'] = variant
  @property({ type: Boolean }) disabled: IYCoreButtonProps['disabled'] = disabled
  @property({ type: Boolean, reflect: true, converter: booleanConverter }) loading: IYCoreButtonProps['loading'] = loading
  @property({ type: String }) label: IYCoreButtonProps['label'] = label
  @property({ type: String }) href: IYCoreButtonProps['href'] = href
  @property({ type: String }) target: IYCoreButtonProps['target'] = target
  @property({ type: String, reflect: true }) alignment: IYCoreButtonProps['alignment'] = alignment
  @property({ type: Object, attribute: 'icon-left' }) iconLeft: IYCoreButtonProps['iconLeft'] = iconLeft
  @property({ type: Object, attribute: 'icon-right' }) iconRight: IYCoreButtonProps['iconRight'] = iconRight
  @property({ type: Boolean, reflect: true, attribute: 'full-width', converter: booleanConverter }) fullWidth: IYCoreButtonProps['fullWidth'] = fullWidth

  private readonly baseClass = tagName

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_disabled`]: Boolean(this.disabled),
    }
  }

  private get computedTextClassName() {
    const textbaseClass = `${this.baseClass}__text`

    const classes = {
      [textbaseClass]: true,
      [`${textbaseClass}_align-start`]: this.alignment === EYCoreButtonContentAlignment.START,
    }

    return Object.keys(classes)
      .filter((key) => classes[key])
      .join(' ')
  }

  private get computedIconSize() {
    return this.size === EYSizes.LARGE
      ? '24px'
      : '16px'
  }


  protected firstUpdated(): void {
    defineCustomElement(YCoreSimpleButtonTagName, YCoreSimpleButton)
  }

  protected render() {
    return html`
      <y-core-simple-button
        class=${classMap(this.computedClasses)}
        href=${ifDefined(this.href)}
        target=${ifDefined(this.target)}
        variant=${ifDefined(this.variant)}
        size=${ifDefined(this.size)}
        alignment=${ifDefined(this.alignment)}
        .disabled=${this.disabled}
        .loading=${this.loading}
        .fullWidth=${this.fullWidth}
      >
        ${renderIcon({ icon: this.iconLeft, size: this.computedIconSize, className: `${this.baseClass}__icon-left` })}

        ${renderText({ text: this.label, className: this.computedTextClassName })}

        ${renderIcon({ icon: this.iconRight, size: this.computedIconSize, className: `${this.baseClass}__icon-right` })}
      </y-core-simple-button>
    `
  }

  static readonly styles = [css`${unsafeCSS(ButtonVarsCSS)}`, css`${unsafeCSS(ButtonScopedCSS)}`]
}
