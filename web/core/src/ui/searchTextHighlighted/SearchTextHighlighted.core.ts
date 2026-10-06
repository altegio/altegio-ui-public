import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { repeat } from 'lit/directives/repeat.js'

import {
  createCoreSearchTextHighlightedProps,
  type IYCoreSearchTextHighlightedProps,
} from '~core/ui/searchTextHighlighted/models/types'
import {
  YCoreSearchTextHighlightedTagName as tagName,
} from '~shared/constants'

import '~core/ui/text'

import YCoreSearchTextHighlightedVarsCss from '~core/ui/searchTextHighlighted/css/SearchTextHighlighted.vars.css?inline'
import YCoreSearchTextHighlightedScopedCss from '~core/ui/searchTextHighlighted/css/SearchTextHighlighted.scoped.css?inline'
import { withLocator } from '~core/utils/locator'

type Segment = {
  value: string
  highlighted: boolean
}

const UNICODE_NO_BREAK_SPACE = '\u00A0'
const SPACE_REGEX = / /g

const { text, variant, search, ignoredSymbols, stopHighlight, size, highlightTextSize, highlightTextVariant, caseSensitive } = createCoreSearchTextHighlightedProps()

@customElement(tagName)
@withLocator(tagName)
export class YCoreSearchTextHighlighted extends LitElement implements IYCoreSearchTextHighlightedProps {
  @property({ type: String }) text: IYCoreSearchTextHighlightedProps['text'] = text
  @property({ type: String }) search: IYCoreSearchTextHighlightedProps['search'] = search
  @property({ type: String }) size: IYCoreSearchTextHighlightedProps['size'] = size
  @property({ type: String }) variant: IYCoreSearchTextHighlightedProps['variant'] = variant
  @property({ type: Array, attribute: 'ignored-symbols' }) ignoredSymbols: IYCoreSearchTextHighlightedProps['ignoredSymbols'] = ignoredSymbols
  @property({ type: Boolean, attribute: 'stop-highlight' }) stopHighlight: IYCoreSearchTextHighlightedProps['stopHighlight'] = stopHighlight
  @property({ type: Boolean, attribute: 'case-sensitive' }) caseSensitive: IYCoreSearchTextHighlightedProps['caseSensitive'] = caseSensitive
  @property({ type: String, attribute: 'highlight-text-size' }) highlightTextSize: IYCoreSearchTextHighlightedProps['highlightTextSize'] = highlightTextSize
  @property({ type: String, attribute: 'highlight-text-variant' }) highlightTextVariant: IYCoreSearchTextHighlightedProps['highlightTextVariant'] = highlightTextVariant

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(YCoreSearchTextHighlightedVarsCss)}
      ${unsafeCSS(YCoreSearchTextHighlightedScopedCss)}
    `,
  ]

  private get computedClasses() {
    return { [this.baseClass]: true }
  }

  private get transformedText(): string {
    return this.text.replace(SPACE_REGEX, UNICODE_NO_BREAK_SPACE)
  }

  get highlighted(): Segment[] {
    if (this.stopHighlight) {
      return [
        {
          value: this.text,
          highlighted: false,
        },
      ]
    }

    return this.highlightSegments(this.text, this.search)
  }

  highlightSegments(text: string, search: string): Segment[] {
    const ignoreSet = new Set(this.ignoredSymbols ?? [])

    const validIndices: number[] = []
    for (let i = 0; i < text.length; i++) {
      if (!ignoreSet.has(text[i])) {
        validIndices.push(i)
      }
    }

    let validString = validIndices.map((i) => text[i]).join('')

    if (!this.caseSensitive) {
      validString = validString.toLowerCase()
      search = search.toLowerCase()
    }

    const pos = validString.indexOf(search)

    if (pos === -1) {
      return [{ value: text, highlighted: false }]
    }

    const matchIndices = validIndices.slice(pos, pos + search.length)
    const splitText = this.transformedText.split('')

    return this.buildSegments(splitText, matchIndices)
  }

  buildSegments(splitText: string[], matchIndices: number[]): Segment[] {
    const segments: Segment[] = []
    let segmentAccumulated: Segment = {
      value: splitText[0],
      highlighted: matchIndices.includes(0),
    }

    for (let i = 1; i < splitText.length; i++) {
      const currentTextItem = splitText[i]
      const hasMatch = matchIndices.includes(i)

      if (segmentAccumulated.highlighted === hasMatch) {
        segmentAccumulated.value += currentTextItem
      } else {
        segments.push(segmentAccumulated)
        segmentAccumulated = {
          value: currentTextItem,
          highlighted: hasMatch,
        }
      }
    }

    segments.push(segmentAccumulated)
    return segments
  }


  protected render() {
    const cssDisplay = 'display: inline-block'

    return html`
      <div class=${classMap(this.computedClasses)}>
        ${
          repeat(
            this.highlighted,
            (_, index) => index,
            (segment) => {
              const size = segment.highlighted ? this.highlightTextSize : this.size
              const variant = segment.highlighted ? this.highlightTextVariant : this.variant

              return html`<y-core-text style=${cssDisplay} .size=${size} .variant=${variant}>${segment.value}</y-core-text>`
            },
          )
        }
      </div>
    `
  }
}
