import { LitElement, html, css, unsafeCSS, type PropertyValues } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import {
  createCoreSkeletonProps,
  type IAltCoreSkeletonProps,
} from '~core/ui/skeleton/models/types'
import { AltCoreSkeletonTagName as tagName } from '~shared/constants'
import { withLocator } from '~core/utils/locator'

import AltCoreSkeletonVarsCss from '~core/ui/skeleton/css/Skeleton.vars.css?inline'
import AltCoreSkeletonScopedCss from '~core/ui/skeleton/css/Skeleton.scoped.css?inline'

const { size, shape, width, height } = createCoreSkeletonProps()

const toCssLength = (value: IAltCoreSkeletonProps['width']) => {
  if (value === undefined || value === '') return ''

  return typeof value === 'number' ? `${value}px` : value
}

/**
 * A placeholder for content that is still loading.
 *
 * The skeleton is hidden from assistive technologies: mark the loading region with `aria-busy="true"` instead.
 */
@customElement(tagName)
@withLocator(tagName)
export class AltCoreSkeleton
  extends LitElement
  implements IAltCoreSkeletonProps {
  @property({ type: String, reflect: true }) size: IAltCoreSkeletonProps['size'] = size
  @property({ type: String, reflect: true }) shape: IAltCoreSkeletonProps['shape'] = shape
  @property() width: IAltCoreSkeletonProps['width'] = width
  @property() height: IAltCoreSkeletonProps['height'] = height

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreSkeletonVarsCss)}
      ${unsafeCSS(AltCoreSkeletonScopedCss)}
    `,
  ]

  connectedCallback() {
    super.connectedCallback()

    if (!this.hasAttribute('aria-hidden')) this.setAttribute('aria-hidden', 'true')
  }

  protected willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('width')) {
      this.style.setProperty('--alt-core-skeleton-width', toCssLength(this.width) || null)
    }

    if (changedProperties.has('height')) {
      this.style.setProperty('--alt-core-skeleton-height', toCssLength(this.height) || null)
    }
  }

  protected render() {
    return html`<div class=${this.baseClass}></div>`
  }
}
