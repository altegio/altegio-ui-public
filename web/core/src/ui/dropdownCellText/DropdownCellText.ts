import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { YCoreTextTagName } from '~shared/constants'

import '~core/ui/text'

import {
  createCoreDropdownCellTextProps,
  type IYCoreDropdownCellTextProps,
} from '~core/ui/dropdownCellText/models/types'
import { YCoreDropdownCellTextTagName as tagName } from '~shared/constants'

import YCoreDropdownCellTextVarsCSS from '~core/ui/dropdownCellText/css/DropdownCellText.vars.css?inline'
import YCoreDropdownCellTextScopedCSS from '~core/ui/dropdownCellText/css/DropdownCellText.scoped.css?inline'
import { withLocator } from '~core/utils/locator'

const { label, subtitle, subhead } = createCoreDropdownCellTextProps()

@customElement(tagName)
@withLocator(tagName)
export class YCoreDropdownCellText extends LitElement implements IYCoreDropdownCellTextProps {
  @property({ type: String }) label: IYCoreDropdownCellTextProps['label'] = label
  @property({ type: String }) subtitle: IYCoreDropdownCellTextProps['subtitle'] = subtitle
  @property({ type: String }) subhead: IYCoreDropdownCellTextProps['subhead'] = subhead

  private readonly baseClass = tagName
  private readonly baseClassSubtitle = `${tagName}__subtitle`

  static readonly styles = [
    css`
      ${unsafeCSS(YCoreDropdownCellTextVarsCSS)}
      ${unsafeCSS(YCoreDropdownCellTextScopedCSS)}
    `,
  ]


  protected render() {
    return html`
      <div class=${this.baseClass}>
        <y-core-text size="a2-medium" variant="secondary" locator="${YCoreTextTagName}_subhead">
          <slot name="subhead">${this.subhead}</slot>
        </y-core-text>

        <y-core-text size="p2-regular" variant="primary" locator="${YCoreTextTagName}_label">
          <slot name="label">${this.label}</slot>
        </y-core-text>

        <y-core-text size="a2-medium" variant="secondary" locator="${YCoreTextTagName}_subtitle">
          <div class=${this.baseClassSubtitle}>
            <slot name="subtitle">${this.subtitle}</slot>
          </div>
        </y-core-text>
      </div>
    `
  }
}
