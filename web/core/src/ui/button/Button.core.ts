import { LitElement, unsafeCSS, css } from 'lit'
import { html } from 'lit/static-html.js'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { classMap } from 'lit/directives/class-map.js'

import { renderIcon, renderText } from '~core/renderers'

import { EAltSizes } from '~shared/types/global'
import {
  createCoreButtonProps,
  EAltCoreButtonContentAlignment,
  type IAltCoreButtonProps,
} from '~core/ui/button/models/types'
import { AltCoreButtonTagName as tagName, AltCoreSimpleButtonTagName } from '~shared/constants'

import ButtonScopedCSS from '~core/ui/button/css/Button.scoped.css?inline'
import ButtonVarsCSS from '~core/ui/button/css/Button.vars.css?inline'

import '~core/ui/simpleButton'
import { interceptEvents } from '~core/utils/event-interceptor'
import { booleanConverter } from '~core/utils/converters'
import { defineCustomElement } from '~web/shared/utils/components'
import { AltCoreSimpleButton } from '~core/ui/simpleButton'
import { withLocator } from '~core/utils/locator'
import { activateFormButton } from '~core/utils/form-button'

const { disabled, href, iconLeft, iconRight, label, loading, size, variant, target, alignment, fullWidth, type, accessibleName } = createCoreButtonProps()

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class AltCoreButton extends LitElement implements IAltCoreButtonProps {
  @property({ type: String }) size: IAltCoreButtonProps['size'] = size
  @property({ type: String, reflect: true }) variant: IAltCoreButtonProps['variant'] = variant
  @property({ type: Boolean }) disabled: IAltCoreButtonProps['disabled'] = disabled
  @property({ type: Boolean, reflect: true, converter: booleanConverter }) loading: IAltCoreButtonProps['loading'] = loading
  @property({ type: String }) label: IAltCoreButtonProps['label'] = label
  @property({ type: String }) href: IAltCoreButtonProps['href'] = href
  @property({ type: String }) target: IAltCoreButtonProps['target'] = target
  @property({ type: String, reflect: true }) alignment: IAltCoreButtonProps['alignment'] = alignment
  @property({ type: String }) type: IAltCoreButtonProps['type'] = type
  @property({ type: Object, attribute: 'icon-left' }) iconLeft: IAltCoreButtonProps['iconLeft'] = iconLeft
  @property({ type: Object, attribute: 'icon-right' }) iconRight: IAltCoreButtonProps['iconRight'] = iconRight
  @property({ type: Boolean, reflect: true, attribute: 'full-width', converter: booleanConverter }) fullWidth: IAltCoreButtonProps['fullWidth'] = fullWidth
  @property({ type: String, attribute: 'accessible-name' }) accessibleName: IAltCoreButtonProps['accessibleName'] = accessibleName

  static readonly shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  }

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
      [`${textbaseClass}_align-start`]: this.alignment === EAltCoreButtonContentAlignment.START,
    }

    return Object.keys(classes)
      .filter((key) => classes[key])
      .join(' ')
  }

  private get computedIconSize() {
    return this.size === EAltSizes.LARGE
      ? '24px'
      : '16px'
  }


  // The inner button is in shadow DOM, so the button acts on the form around it itself
  private readonly handleClick = () => {
    activateFormButton(this)
  }

  protected firstUpdated(): void {
    defineCustomElement(AltCoreSimpleButtonTagName, AltCoreSimpleButton)
  }

  protected render() {
    return html`
      <alt-core-simple-button
        class=${classMap(this.computedClasses)}
        href=${ifDefined(this.href)}
        target=${ifDefined(this.target)}
        variant=${ifDefined(this.variant)}
        size=${ifDefined(this.size)}
        alignment=${ifDefined(this.alignment)}
        .disabled=${this.disabled}
        .loading=${this.loading}
        .fullWidth=${this.fullWidth}
        .accessibleName=${this.accessibleName}
        @click=${this.handleClick}
      >
        ${renderIcon({ icon: this.iconLeft, size: this.computedIconSize, className: `${this.baseClass}__icon-left` })}

        ${renderText({ text: this.label, className: this.computedTextClassName })}

        ${renderIcon({ icon: this.iconRight, size: this.computedIconSize, className: `${this.baseClass}__icon-right` })}
      </alt-core-simple-button>
    `
  }

  static readonly styles = [css`${unsafeCSS(ButtonVarsCSS)}`, css`${unsafeCSS(ButtonScopedCSS)}`]
}
