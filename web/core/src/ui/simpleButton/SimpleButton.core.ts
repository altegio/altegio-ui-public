/* eslint-disable lit/prefer-static-styles */

import { LitElement, css, nothing, unsafeCSS } from 'lit'
import { html } from 'lit/static-html.js'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { classMap } from 'lit/directives/class-map.js'

import '~core/ui/loader'
import { YCoreLoader } from '~core/ui/loader'

import {
  createCoreSimpleButtonProps,
  type IYCoreSimpleButtonProps,
} from '~core/ui/simpleButton/models/types'

import { EYSizes } from '~shared/types/global'
import { YCoreSimpleButtonTagName as tagName, YCoreLoaderTagName } from '~shared/constants'

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
export class YCoreSimpleButton extends LitElement implements IYCoreSimpleButtonProps {
  @property({ type: String }) size: IYCoreSimpleButtonProps['size'] = size
  @property({ type: String }) variant: IYCoreSimpleButtonProps['variant'] = variant
  @property({ type: Boolean }) disabled: IYCoreSimpleButtonProps['disabled'] = disabled
  @property({ type: Boolean, reflect: true, converter: booleanConverter }) loading: IYCoreSimpleButtonProps['loading'] = loading
  @property({ type: String }) href: IYCoreSimpleButtonProps['href'] = href
  @property({ type: String }) target: IYCoreSimpleButtonProps['target'] = target
  @property({ type: String }) alignment: IYCoreSimpleButtonProps['alignment'] = alignment
  @property({ type: Boolean, attribute: 'full-width' }) fullWidth: IYCoreSimpleButtonProps['fullWidth'] = fullWidth
  @property({ type: String, attribute: 'host-styles' }) hostStyles: IYCoreSimpleButtonProps['hostStyles'] = hostStyles
  @property({ type: String, attribute: 'loader-variant' }) loaderVariant: IYCoreSimpleButtonProps['loaderVariant'] = loaderVariant

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
    return this.size === EYSizes.LARGE
      ? EYSizes.MEDIUM
      : EYSizes.EXTRA_SMALL
  }

  private renderButtonContent() {
    return html`
        ${this.isLoading
            ? html`
            <div class="${this.baseClass}__loader">
              <y-core-loader
                variant=${ifDefined(this.loaderVariant)}
                size=${this.computedLoaderSize}
              >
              </y-core-loader>
            </div>`
            : nothing
        }

        <div class=${classMap(this.computedContentClasses)}>
          <slot></slot>
        </div>
    `
  }


  protected firstUpdated(): void {
    defineCustomElement(YCoreLoaderTagName, YCoreLoader)
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
