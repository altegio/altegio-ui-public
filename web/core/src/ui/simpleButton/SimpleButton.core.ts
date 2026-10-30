/* eslint-disable lit/prefer-static-styles */

import { LitElement, css, nothing, unsafeCSS } from 'lit'
import { html } from 'lit/static-html.js'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { classMap } from 'lit/directives/class-map.js'

import '~core/ui/loader'
import { AltCoreLoader } from '~core/ui/loader'

import {
  createCoreSimpleButtonProps,
  type IAltCoreSimpleButtonProps,
} from '~core/ui/simpleButton/models/types'

import { EAltSizes } from '~shared/types/global'
import { AltCoreSimpleButtonTagName as tagName, AltCoreLoaderTagName } from '~shared/constants'

import SimpleButtonVarsCSS from '~core/ui/simpleButton/css/SimpleButton.vars.css?inline'
import SimpleButtonScopedCSS from '~core/ui/simpleButton/css/SimpleButton.scoped.css?inline'

import { interceptEvents } from '~core/utils/event-interceptor'
import { booleanConverter } from '~core/utils/converters'
import { defineCustomElement } from '~web/shared/utils/components'
import { withLocator } from '~core/utils/locator'

const { disabled, href, loading, size, variant, target, alignment, hostStyles, fullWidth, loaderVariant } = createCoreSimpleButtonProps()

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class AltCoreSimpleButton extends LitElement implements IAltCoreSimpleButtonProps {
  @property({ type: String }) size: IAltCoreSimpleButtonProps['size'] = size
  @property({ type: String }) variant: IAltCoreSimpleButtonProps['variant'] = variant
  @property({ type: Boolean }) disabled: IAltCoreSimpleButtonProps['disabled'] = disabled
  @property({ type: Boolean, reflect: true, converter: booleanConverter }) loading: IAltCoreSimpleButtonProps['loading'] = loading
  @property({ type: String }) href: IAltCoreSimpleButtonProps['href'] = href
  @property({ type: String }) target: IAltCoreSimpleButtonProps['target'] = target
  @property({ type: String }) alignment: IAltCoreSimpleButtonProps['alignment'] = alignment
  @property({ type: Boolean, attribute: 'full-width' }) fullWidth: IAltCoreSimpleButtonProps['fullWidth'] = fullWidth
  @property({ type: String, attribute: 'host-styles' }) hostStyles: IAltCoreSimpleButtonProps['hostStyles'] = hostStyles
  @property({ type: String, attribute: 'loader-variant' }) loaderVariant: IAltCoreSimpleButtonProps['loaderVariant'] = loaderVariant

  private get isLoading() {
    return Boolean(this.loading && !this.disabled)
  }

  private readonly baseClass = tagName
  private readonly baseContentClass = `${tagName}__content`

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_size_${this.size}`]: true,
      [`${this.baseClass}_variant_${this.variant}`]: true,
      [`${this.baseClass}_disabled`]: Boolean(this.disabled),
      [`${this.baseClass}_loading`]: this.isLoading,
      [`${this.baseClass}_full-width`]: Boolean(this.fullWidth),
    }
  }

  private get computedContentClasses() {
    return {
      [this.baseContentClass]: true,
      [`${this.baseContentClass}_align-${this.alignment}`]: this.alignment !== undefined,
    }
  }

  private get computedLoaderSize() {
    return this.size === EAltSizes.LARGE
      ? EAltSizes.MEDIUM
      : EAltSizes.EXTRA_SMALL
  }

  private renderButtonContent() {
    return html`
        ${this.isLoading
            ? html`
            <div class="${this.baseClass}__loader">
              <alt-core-loader
                variant=${ifDefined(this.loaderVariant)}
                size=${this.computedLoaderSize}
              >
              </alt-core-loader>
            </div>`
            : nothing
        }

        <div class=${classMap(this.computedContentClasses)}>
          <slot></slot>
        </div>
    `
  }


  protected firstUpdated(): void {
    defineCustomElement(AltCoreLoaderTagName, AltCoreLoader)
  }

  protected render() {
    return html`
      <style>${unsafeCSS(this.hostStyles)}</style>
      ${this.href
        ? html`
          <a
            href=${ifDefined(this.href)}
            target=${ifDefined(this.target)}
            class=${classMap(this.computedClasses)}
            style=${ifDefined(this.hostStyles)}
          >
            ${this.renderButtonContent()}
          </a>`
        : html`
          <button
            class=${classMap(this.computedClasses)}
            style=${ifDefined(this.hostStyles)}
            ?disabled=${this.disabled}
          >
            ${this.renderButtonContent()}
          </button>`
      }
    `
  }


  static readonly styles = [
    css`${unsafeCSS(SimpleButtonVarsCSS)}`,
    css`${unsafeCSS(SimpleButtonScopedCSS)}`,
  ]
}
