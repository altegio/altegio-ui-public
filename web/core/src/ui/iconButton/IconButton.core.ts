import { css, LitElement, unsafeCSS } from 'lit'
import { html } from 'lit/static-html.js'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { renderIcon } from '~core/renderers'

import {
  createCoreIconButtonProps,
  type IAltCoreIconButtonProps,
} from '~core/ui/iconButton/models/types'
import { EAltSizes } from '~shared/types/global'
import { AltCoreIconButtonTagName as tagName } from '~shared/constants'

import AltCoreIconButtonScopedCSS from '~core/ui/iconButton/css/IconButton.scoped.css?inline'
import AltCoreIconButtonVarsCSS from '~core/ui/iconButton/css/IconButton.vars.css?inline'

import '~core/ui/simpleButton'

import { interceptEvents } from '~core/utils/event-interceptor'
import { booleanConverter } from '~core/utils/converters'
import { withLocator } from '~core/utils/locator'
import { activateFormButton } from '~core/utils/form-button'

const { disabled, href, icon, loading, size, variant, target, fullWidth, type, accessibleName } = createCoreIconButtonProps()

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class AltCoreIconButton extends LitElement implements IAltCoreIconButtonProps {
  @property({ type: String }) size: IAltCoreIconButtonProps['size'] = size
  @property({ type: String }) variant: IAltCoreIconButtonProps['variant'] = variant
  @property({ type: Boolean }) disabled: IAltCoreIconButtonProps['disabled'] = disabled
  @property({ type: Boolean, reflect: true, converter: booleanConverter }) loading: IAltCoreIconButtonProps['loading'] = loading
  @property({ type: String }) href: IAltCoreIconButtonProps['href'] = href
  @property({ type: String }) target: IAltCoreIconButtonProps['target'] = target
  @property({ type: String }) type: IAltCoreIconButtonProps['type'] = type
  @property({ type: Object }) icon: IAltCoreIconButtonProps['icon'] = icon
  @property({ type: Boolean, attribute: 'full-width' }) fullWidth: IAltCoreIconButtonProps['fullWidth'] = fullWidth
  @property({ type: String, attribute: 'accessible-name' }) accessibleName: IAltCoreIconButtonProps['accessibleName'] = accessibleName

  static readonly shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  }

  private readonly baseClass = tagName

  static readonly styles = [
    css`${unsafeCSS(AltCoreIconButtonVarsCSS)}`,
    css`${unsafeCSS(AltCoreIconButtonScopedCSS)}`,
  ]

  private get computedIconSize() {
    return this.size === EAltSizes.LARGE
      ? '24px'
      : '16px'
  }

  // The inner button is in shadow DOM, so the button acts on the form around it itself
  private readonly handleClick = () => {
    activateFormButton(this)
  }

  protected render() {
    return html`
      <alt-core-simple-button
        href=${ifDefined(this.href)}
        target=${ifDefined(this.target)}
        variant=${ifDefined(this.variant)}
        size=${ifDefined(this.size)}
        .disabled=${this.disabled}
        .loading=${this.loading}
        .fullWidth=${this.fullWidth}
        .accessibleName=${this.accessibleName}
        .hostStyles=${AltCoreIconButtonVarsCSS}
        class=${this.baseClass}
        @click=${this.handleClick}
      >
        ${renderIcon({ icon: this.icon, size: this.computedIconSize })}
      </alt-core-simple-button>
    `
  }
}
