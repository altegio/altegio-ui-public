import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/searchTextHighlighted'
import {
  createNgSearchTextHighlightedProps,
  type IYNgSearchTextHighlightedProps,
} from '~ng/ui/searchTextHighlighted/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { text, variant, search, ignoredSymbols, stopHighlight, size, highlightTextSize, highlightTextVariant, caseSensitive } = createNgSearchTextHighlightedProps()

@Component({
  selector: 'YSearchTextHighlighted',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <y-core-search-text-highlighted
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
    </y-core-search-text-highlighted>
  `,
})

export class YSearchTextHighlighted implements IYNgSearchTextHighlightedProps {
  @Input() @DefaultValue(text) text: IYNgSearchTextHighlightedProps['text'] = text
  @Input() @DefaultValue(variant) variant: IYNgSearchTextHighlightedProps['variant'] = variant
  @Input() @DefaultValue(search) search: IYNgSearchTextHighlightedProps['search'] = search
  @Input() @DefaultValue(ignoredSymbols) ignoredSymbols: IYNgSearchTextHighlightedProps['ignoredSymbols'] = ignoredSymbols
  @Input() @DefaultValue(stopHighlight) stopHighlight: IYNgSearchTextHighlightedProps['stopHighlight'] = stopHighlight
  @Input() @DefaultValue(caseSensitive) caseSensitive: IYNgSearchTextHighlightedProps['caseSensitive'] = caseSensitive
  @Input() @DefaultValue(size) size: IYNgSearchTextHighlightedProps['size'] = size
  @Input() @DefaultValue(highlightTextSize) highlightTextSize: IYNgSearchTextHighlightedProps['highlightTextSize'] = highlightTextSize
  @Input() @DefaultValue(highlightTextVariant) highlightTextVariant: IYNgSearchTextHighlightedProps['highlightTextVariant'] = highlightTextVariant
}
