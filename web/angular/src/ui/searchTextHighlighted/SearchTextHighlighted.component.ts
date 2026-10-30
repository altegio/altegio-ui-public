import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/searchTextHighlighted'
import {
  createNgSearchTextHighlightedProps,
  type IAltNgSearchTextHighlightedProps,
} from '~ng/ui/searchTextHighlighted/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { text, variant, search, ignoredSymbols, stopHighlight, size, highlightTextSize, highlightTextVariant, caseSensitive } = createNgSearchTextHighlightedProps()

@Component({
  selector: 'AltSearchTextHighlighted',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <alt-core-search-text-highlighted
      [text]="text"
      [variant]="variant"
      [search]="search"
      [ignoredSymbols]="ignoredSymbols"
      [caseSensitive]="caseSensitive"
      [stopHighlight]="stopHighlight"
      [size]="size"
      [highlightTextVariant]="highlightTextVariant"
      [highlightTextSize]="highlightTextSize"
    >
    </alt-core-search-text-highlighted>
  `,
})

export class AltSearchTextHighlighted implements IAltNgSearchTextHighlightedProps {
  @Input() @DefaultValue(text) text: IAltNgSearchTextHighlightedProps['text'] = text
  @Input() @DefaultValue(variant) variant: IAltNgSearchTextHighlightedProps['variant'] = variant
  @Input() @DefaultValue(search) search: IAltNgSearchTextHighlightedProps['search'] = search
  @Input() @DefaultValue(ignoredSymbols) ignoredSymbols: IAltNgSearchTextHighlightedProps['ignoredSymbols'] = ignoredSymbols
  @Input() @DefaultValue(stopHighlight) stopHighlight: IAltNgSearchTextHighlightedProps['stopHighlight'] = stopHighlight
  @Input() @DefaultValue(caseSensitive) caseSensitive: IAltNgSearchTextHighlightedProps['caseSensitive'] = caseSensitive
  @Input() @DefaultValue(size) size: IAltNgSearchTextHighlightedProps['size'] = size
  @Input() @DefaultValue(highlightTextSize) highlightTextSize: IAltNgSearchTextHighlightedProps['highlightTextSize'] = highlightTextSize
  @Input() @DefaultValue(highlightTextVariant) highlightTextVariant: IAltNgSearchTextHighlightedProps['highlightTextVariant'] = highlightTextVariant
}
