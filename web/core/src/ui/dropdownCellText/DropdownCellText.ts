import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { AltCoreTextTagName } from '~shared/constants'

import '~core/ui/text'

import {
  createCoreDropdownCellTextProps,
  type IAltCoreDropdownCellTextProps,
} from '~core/ui/dropdownCellText/models/types'
import { AltCoreDropdownCellTextTagName as tagName } from '~shared/constants'

import AltCoreDropdownCellTextVarsCSS from '~core/ui/dropdownCellText/css/DropdownCellText.vars.css?inline'
import AltCoreDropdownCellTextScopedCSS from '~core/ui/dropdownCellText/css/DropdownCellText.scoped.css?inline'
import { withLocator } from '~core/utils/locator'

const { label, subtitle, subhead } = createCoreDropdownCellTextProps()

@customElement(tagName)
@withLocator(tagName)
export class AltCoreDropdownCellText extends LitElement implements IAltCoreDropdownCellTextProps {
  @property({ type: String }) label: IAltCoreDropdownCellTextProps['label'] = label
  @property({ type: String }) subtitle: IAltCoreDropdownCellTextProps['subtitle'] = subtitle
  @property({ type: String }) subhead: IAltCoreDropdownCellTextProps['subhead'] = subhead

  private readonly baseClass = tagName
  private readonly baseClassSubtitle = `${tagName}__subtitle`

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreDropdownCellTextVarsCSS)}
      ${unsafeCSS(AltCoreDropdownCellTextScopedCSS)}
    `,
  ]


  protected render() {
    return html`
      <div class=${this.baseClass}>
        <alt-core-text size="a2-medium" variant="secondary" locator="${AltCoreTextTagName}_subhead">
          <slot name="subhead">${this.subhead}</slot>
        </alt-core-text>

        <alt-core-text size="p2-regular" variant="primary" locator="${AltCoreTextTagName}_label">
          <slot name="label">${this.label}</slot>
        </alt-core-text>

        <alt-core-text size="a2-medium" variant="secondary" locator="${AltCoreTextTagName}_subtitle">
          <div class=${this.baseClassSubtitle}>
            <slot name="subtitle">${this.subtitle}</slot>
          </div>
        </alt-core-text>
      </div>
    `
  }
}
