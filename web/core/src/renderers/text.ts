import { html, nothing } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'

export interface IRenderTextOptions {
  text?: string
  className?: string
}

/**
 * Опции для рендеринга текста
 * @interface IRenderTextOptions
 * @property {string} [text] - Текст для отображения
 * @property {string} [className] - CSS класс для текста
 */
export default ({ text, className }: IRenderTextOptions) => {
  if (!text) return nothing

  return html`<span class=${ifDefined(className)}>${text}</span>`
}
