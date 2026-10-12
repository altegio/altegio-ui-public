import { LitElement, css, unsafeCSS } from 'lit'
import { html } from 'lit/static-html.js'
import { customElement, property, query, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

import '~core/ui/loader'

import {
  createCoreButtonGroupProps,
  type IYCoreButtonGroupProps,
} from '~core/ui/buttonGroup/models/types'

import { YCoreButtonGroupTagName as tagName } from '~shared/constants'

import ButtonGroupVarsCSS from '~core/ui/buttonGroup/css/ButtonGroup.vars.css?inline'
import ButtonGroupScopedCSS from '~core/ui/buttonGroup/css/ButtonGroup.scoped.css?inline'
import { withLocator } from '~core/utils/locator'

const { size, variant } = { ...createCoreButtonGroupProps() }

@customElement(tagName)
@withLocator(tagName)
export class YCoreButtonGroup extends LitElement implements IYCoreButtonGroupProps {
  @state() private slotNodes: Element[] = []
  @property({ type: String }) size: IYCoreButtonGroupProps['size'] = size
  @property({ type: String }) variant: IYCoreButtonGroupProps['variant'] = variant

  private _buttons: HTMLSlotElement | null = null

  @query('slot')
  get buttons(): HTMLSlotElement | null {
    return this._buttons || null
  }

  set buttons(value: HTMLSlotElement | null) {
    this._buttons = value
  }

  private readonly baseClass = tagName

  private get computedClasses() {
    return { [this.baseClass]: true }
  }

  connectedCallback() {
    super.connectedCallback()


    this.updateSlotNodes()
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties)
    if (changedProperties.has('size') || changedProperties.has('variant')) {
      this.updateSlotNodes()
    }
  }

  private updateSlotNodes() {
    if (!this.buttons) {
      return
    }
    this.slotNodes = this.buttons.assignedElements({ flatten: true })
    this.updateSlotProps()
  }

  private updateSlotProps() {
    this.slotNodes.forEach((node) => {
      if (node instanceof HTMLElement) {
        if ('size' in node) node.size = this.size
        if ('variant' in node) node.variant = this.variant
      }
    })
  }

  protected render() {
    return html`
      <div class=${classMap(this.computedClasses)}>
        <slot></slot>
      </div>
    `
  }

  static readonly styles = [
    css`${unsafeCSS(ButtonGroupVarsCSS)}`,
    css`${unsafeCSS(ButtonGroupScopedCSS)}`,
  ]
}
