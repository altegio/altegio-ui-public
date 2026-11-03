import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { unsafeSVG } from 'lit/directives/unsafe-svg.js'

import { AltCoreLoaderTagName as tagName } from '~shared/constants'
import { altLoader } from '~shared/icons/build/alt-loader.icon'

import AltCoreLoaderVarsCss from '~core/ui/loader/css/Loader.vars.css?inline'
import AltCoreLoaderScopedCss from '~core/ui/loader/css/Loader.scoped.css?inline'

import {
  createCoreLoaderProps,
  type IAltCoreLoaderProps,
} from '~core/ui/loader/models/types'
import { defineCustomElement } from '~web/shared/utils/components'
import { withLocator } from '~core/utils/locator'

const { size, variant } = createCoreLoaderProps()

@customElement(tagName)
@withLocator(tagName)
export class AltCoreLoader extends LitElement implements IAltCoreLoaderProps {
  @property({ type: String, reflect: true }) size: IAltCoreLoaderProps['size'] = size
  @property({ type: String, reflect: true }) variant: IAltCoreLoaderProps['variant'] = variant

  private readonly baseClass = tagName

  static readonly styles = [
    css`${unsafeCSS(AltCoreLoaderVarsCss)}`,
    css`${unsafeCSS(AltCoreLoaderScopedCss)}`,
  ]

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_size_${this.size}`]: Boolean(this.size),
      [`${this.baseClass}_variant_${this.variant}`]: Boolean(this.variant),
    }
  }


  protected firstUpdated(): void {
    defineCustomElement(tagName, AltCoreLoader)
  }

  protected render() {
    return html`
      <div class=${classMap(this.computedClasses)}>
        ${unsafeSVG(altLoader.data)}
      </div>
    `
  }
}
