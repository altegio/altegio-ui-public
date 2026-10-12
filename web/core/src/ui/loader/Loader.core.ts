import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { unsafeSVG } from 'lit/directives/unsafe-svg.js'

import { YCoreLoaderTagName as tagName } from '~shared/constants'
import { yLoader } from '~shared/icons/build/y-loader.icon'

import YCoreLoaderVarsCss from '~core/ui/loader/css/Loader.vars.css?inline'
import YCoreLoaderScopedCss from '~core/ui/loader/css/Loader.scoped.css?inline'

import {
  createCoreLoaderProps,
  type IYCoreLoaderProps,
} from '~core/ui/loader/models/types'
import { defineCustomElement } from '~web/shared/utils/components'
import { withLocator } from '~core/utils/locator'

const { size, variant } = createCoreLoaderProps()

@customElement(tagName)
@withLocator(tagName)
export class YCoreLoader extends LitElement implements IYCoreLoaderProps {
  @property({ type: String, reflect: true }) size: IYCoreLoaderProps['size'] = size
  @property({ type: String, reflect: true }) variant: IYCoreLoaderProps['variant'] = variant

  private readonly baseClass = tagName

  static readonly styles = [
    css`${unsafeCSS(YCoreLoaderVarsCss)}`,
    css`${unsafeCSS(YCoreLoaderScopedCss)}`,
  ]

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_size_${this.size}`]: Boolean(this.size),
      [`${this.baseClass}_variant_${this.variant}`]: Boolean(this.variant),
    }
  }


  protected firstUpdated(): void {
    defineCustomElement(tagName, YCoreLoader)
  }

  protected render() {
    return html`
      <div class=${classMap(this.computedClasses)}>
        ${unsafeSVG(yLoader.data)}
      </div>
    `
  }
}
