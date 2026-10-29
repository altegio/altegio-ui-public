import { html, nothing } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'

export interface IRenderTextOptions {
  text?: string
  className?: string
}

/**
 * Options for rendering text
 * @interface IRenderTextOptions
 * @property {string} [text] - Text to render
 * @property {string} [className] - CSS class for the text
 */
export default ({ text, className }: IRenderTextOptions) => {
  if (!text) return nothing

  return html`<span class=${ifDefined(className)}>${text}</span>`
}
