import { LitElement, css, html, nothing, type PropertyValues } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import type { HslaColor } from 'colord'
import { colord } from 'colord'

import '~core/ui/textField'
import '~core/ui/table'
import '~core/ui/tableRow'
import '~core/ui/tableCell'
import '~core/ui/tableHeadCell'
import '~core/ui/tableBar'
import type { InputEvent } from '~core/ui/textField/models/types/events'
import type { TDispatcher } from '~core/utils/event-decorator'
import { bubblingEvent } from '~core/utils/event-decorator'
import type { TColorThemeRaw, TColorToken, TColorTokenTransformers, TColorTokenTransformersRaw, TColorTypeRaw } from '../context/types/color'
import { colorTokens, EColorTheme, EColorType, InputTransformersEvent, rawColorTypes } from '../context/types/color'
import { generateTransformersFromJson } from '../context/utils/color'
import { getColorType } from '../context/utils/wcag'

const tagName = 'y-color-table'

type TransformersExtension = {
  colorExpression: string
  error: string | null
}

type TColorTokenTransformersRawExtended = TColorTokenTransformersRaw<TransformersExtension>

@customElement(tagName)
export class YColorTable extends LitElement {
  @property({ type: String, attribute: 'accent-color' }) accentColor: string | null = null
  @property({ type: Boolean, attribute: 'use-dark-theme' }) useDarkTheme = false
  @property({ type: Object }) transformers: TColorTokenTransformersRaw | null = null

  @bubblingEvent(
    InputTransformersEvent,
    { name: 'transformersChanged' },
  )
  _transformersChanged!: TDispatcher<InputTransformersEvent>

  static readonly styles = [
    css`
        y-core-table-row:nth-child(even) {
          background-color: #f4f4f4;
        }
        .row {
            display: flex;
            flex: 1;
            height: 70px;
            align-items: baseline;
        }
        .color-cell {
            display: flex;

            &.background {
                border: 1px solid grey;
                width: 40px;
            }
        }
    `,
  ]

  @state() private colorTokenTransformers: TColorTokenTransformers | null = null
  @state() private colorTheme: EColorTheme | null = null
  @state() private colorType: EColorType | null = null
  @state() private hslaAccentColor: HslaColor | null = null
  @state() private extendedTransformers: TColorTokenTransformersRawExtended | null = null

  updated(changedProperties: PropertyValues): void {
    super.update(changedProperties)

    this.updateTransformers(changedProperties)
    this.updateAccentColor(changedProperties)
    this.updateTheme(changedProperties)
  }

  private updateTransformers(changedProperties: PropertyValues): void {
    if (!changedProperties.has('transformers')) return

    if (!this.transformers) {
      this.colorTokenTransformers = null
      this.extendedTransformers = null
      return
    }

    this.colorTokenTransformers = generateTransformersFromJson(this.transformers)
    this.extendedTransformers = this.convertTransformersToExtended(this.transformers)
  }

  private updateAccentColor(changedProperties: PropertyValues): void {
    if (!changedProperties.has('accentColor')) return

    if (!this.accentColor) {
      this.colorType = null
      this.hslaAccentColor = null
      return
    }

    const accentColorObj = colord(this.accentColor)
    this.colorType = getColorType(accentColorObj.toRgb())
    this.hslaAccentColor = accentColorObj.toHsl()
  }

  private updateTheme(changedProperties: PropertyValues): void {
    if (changedProperties.has('useDarkTheme')) {
      this.colorTheme = this.useDarkTheme ? EColorTheme.dark : EColorTheme.light
    }
  }

  private onInput(colorToken: TColorToken, colorThemeRaw: TColorThemeRaw, colorTypeRaw: TColorTypeRaw, inputValue: string) {
    if (this.transformers && this.extendedTransformers) {
      const splittedValues = inputValue.split(',')
      let errorMessage = ''
      // eslint-disable-next-line sonarjs/slow-regex
      if (splittedValues.length === 4 && !splittedValues.some((splittedValue) => !(/^.*[hsl\d]+.*$/).test(splittedValue))) {
        this._transformersChanged({
          detail: {
            ...this.transformers,
            [colorToken]: {
              ...this.transformers[colorToken],
              [colorThemeRaw]: {
                ...this.transformers[colorToken][colorThemeRaw],
                [colorTypeRaw]: inputValue,
              },
            },
          },
        })
      } else {
        errorMessage = 'Invalid'
      }

      console.warn('errorMessage with colorToken', colorToken, errorMessage)
      this.extendedTransformers = {
        ...this.extendedTransformers,
        [colorToken]: {
          ...this.extendedTransformers[colorToken],
          [colorThemeRaw]: {
            ...this.extendedTransformers[colorToken][colorThemeRaw],
            [colorTypeRaw]: {
              colorExpression: inputValue,
              error: errorMessage,
            },
          },
        },
      }
    }
  }

  private exportJson() {
    const json = JSON.stringify(this.transformers, null, 2) // красиво форматированный JSON
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'color_expressions.json'
    a.click()

    URL.revokeObjectURL(url)
  }

  private convertTransformersToExtended(transformers: TColorTokenTransformersRaw): TColorTokenTransformersRawExtended {
    const modifiedTransformers: TColorTokenTransformersRawExtended = {} as TColorTokenTransformersRawExtended
    for (const [token, themeMap] of Object.entries(transformers)) {
      const newThemeMap: Record<TColorThemeRaw, Record<TColorTypeRaw, TransformersExtension>> = {} as Record<TColorThemeRaw, Record<TColorTypeRaw, TransformersExtension>>

      for (const [theme, typeMap] of Object.entries(themeMap)) {
        const newTypeMap: Record<TColorTypeRaw, TransformersExtension> = {} as Record<TColorTypeRaw, TransformersExtension>
        // eslint-disable-next-line max-depth
        for (const [type, value] of Object.entries(typeMap)) {
          newTypeMap[type as TColorTypeRaw] = {
            colorExpression: value,
            error: null,
          }
        }
        newThemeMap[theme as TColorThemeRaw] = newTypeMap
      }
      modifiedTransformers[token as TColorToken] = newThemeMap
    }

    return modifiedTransformers
  }

  private getColorTypeLabel(colorType: EColorType) {
    switch (colorType) {
      case EColorType.light:
        return 'Light'
      case EColorType.lighter:
        return 'Pale'
      case EColorType.bright:
        return 'Bright'
      case EColorType.dark:
        return 'Dark'
    }
  }

  private getRawColorTypeLabel(colorType: TColorTypeRaw) {
    switch (colorType) {
      case 'light':
        return 'Light'
      case 'lighter':
        return 'Pale'
      case 'bright':
        return 'Bright'
      case 'dark':
        return 'Dark'
    }
  }

  private getTransformedColor(colorToken: string): string {
    if (this.colorTokenTransformers !== null && this.colorTheme !== null && this.colorType !== null && this.hslaAccentColor !== null) {
      const color = this.colorTokenTransformers[`--y-core-color-${colorToken}`][this.colorTheme][this.colorType](this.hslaAccentColor)
      return colord(color).toRgbString()
    }
    return ''
  }

  get tableHeaders() {
    return rawColorTypes.map((rawColorType) => {
      return html`
            <y-core-table-head-cell>
                <div slot="cell">
                    ${this.getRawColorTypeLabel(rawColorType)}
                </div>
            </y-core-table-head-cell>
        `
    })
  }

  getTableColorColumns(colorToken: TColorToken, colorTheme: TColorThemeRaw) {
    return rawColorTypes.map((rawColorType) => {
      return html`
            <y-core-table-cell>
                <div slot="cell" class="color-cell">
                    ${this.extendedTransformers
                        ? html`
                            <y-core-text-field
                                .value=${this.extendedTransformers[colorToken][colorTheme][rawColorType].colorExpression}
                                .errors=${this.extendedTransformers[colorToken][colorTheme][rawColorType].error ? [this.extendedTransformers[colorToken][colorTheme][rawColorType].error] : []}
                                @input=${(e: InputEvent) => { this.onInput(colorToken, colorTheme, rawColorType, e.detail.value) }}
                            ></y-core-text-field>
                        `
                    : ''}
                </div>
            </y-core-table-cell>
        `
    })
  }

  get tableRows() {
    return colorTokens.map((colorToken) => {
      return html`
            <y-core-table-row>
                <div class="row">
                    <y-core-table-cell>
                        <div slot="cell" class="color-cell background" style="background-color: ${this.getTransformedColor(colorToken)};">
                        </div>
                    </y-core-table-cell>

                    <y-core-table-cell>
                        <div slot="cell">
                            ${colorToken}
                        </div>
                    </y-core-table-cell>

                    <y-core-table-cell>
                        <div slot="cell">
                            Light
                        </div>
                    </y-core-table-cell>
                    ${this.getTableColorColumns(colorToken, 'lightMode')}
                </div>
            </y-core-table-row>

            <y-core-table-row>
                <div class="row">
                    <y-core-table-cell></y-core-table-cell>
                    
                    <y-core-table-cell></y-core-table-cell>

                    <y-core-table-cell>
                        <div slot="cell">
                            Dark
                        </div>
                    </y-core-table-cell>
                    ${this.getTableColorColumns(colorToken, 'darkMode')}
                </div>
            </y-core-table-row>
        `
    })
  }

  protected render() {
    if (!this.extendedTransformers) {
      return nothing
    }
    return html`
            ${this.colorType ? html`<div>Current color theme: ${this.getColorTypeLabel(this.colorType)}</div>` : ''}
            <div>
                <button @click=${() => { this.exportJson() }}>Export</button>
            </div>
            
            <y-core-table>
                <div slot="head">
                    <y-core-table-row>
                        <div class="row">
                            <y-core-table-head-cell>
                                <div slot="cell">
                                    Current
                                </div>
                            </y-core-table-head-cell>
                            
                            <y-core-table-head-cell>
                                <div slot="cell">
                                    Token
                                </div>
                            </y-core-table-head-cell>

                            <y-core-table-head-cell>
                                <div slot="cell">
                                    Theme
                                </div>
                            </y-core-table-head-cell>
                            
                            ${this.tableHeaders}
                        </div>
                    </y-core-table-row>
                </div>
                
                <div slot="bar">
                    <y-core-table-bar></y-core-table-bar>
                </div>
                
                <div slot="body">
                    ${this.tableRows}
                </div>
            </y-core-table>
        `
  }
}
