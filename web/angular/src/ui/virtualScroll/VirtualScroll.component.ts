import {
  Component,
  ContentChild,
  CUSTOM_ELEMENTS_SCHEMA,
  type ElementRef,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'

import '~core/ui/virtualScroll'
import type { AltCoreVirtualScroll } from '~core/ui/virtualScroll'
import type { IAltCoreVirtualScrollRange, VirtualScrollRangeChangeEvent } from '~core/ui/virtualScroll/models/types'
import {
  createNgVirtualScrollProps,
  type IAltNgVirtualScrollProps,
  type IAltNgVirtualScrollRowContext,
} from '~ng/ui/virtualScroll/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { items, itemSize, overscan, accessibleName, itemKey } = createNgVirtualScrollProps()

@Component({
  selector: 'AltVirtualScroll',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgTemplateOutlet],
  // A height or max-height on <AltVirtualScroll> passes to the core element
  host: { style: 'display: block;' },
  template: `
    <alt-core-virtual-scroll
      #coreVirtualScroll
      style="display: block; height: 100%; max-height: inherit;"
      [itemCount]="items.length"
      [itemSize]="itemSize"
      [overscan]="overscan"
      [accessibleName]="accessibleName"
      (range-change)="handleRangeChange($any($event))"
    >
      @for (item of visibleItems; track trackRow($index, item); let offset = $index) {
        <div
          role="listitem"
          style="box-sizing: border-box;"
          [style.height.px]="itemSize"
          [attr.aria-posinset]="range.start + offset + 1"
          [attr.aria-setsize]="items.length"
        >
          @if (rowTemplate) {
            <ng-container *ngTemplateOutlet="rowTemplate; context: { $implicit: item, index: range.start + offset }" />
          }
        </div>
      }
    </alt-core-virtual-scroll>
  `,
})
export class AltVirtualScroll<T = unknown> implements IAltNgVirtualScrollProps<T> {
  @Input() @DefaultValue(items) items: T[] = []
  @Input() @DefaultValue(itemSize) itemSize: IAltNgVirtualScrollProps['itemSize'] = itemSize
  @Input() @DefaultValue(overscan) overscan: IAltNgVirtualScrollProps['overscan'] = overscan
  @Input() @DefaultValue(accessibleName) accessibleName: IAltNgVirtualScrollProps['accessibleName'] = accessibleName
  @Input() @DefaultValue(itemKey) itemKey: IAltNgVirtualScrollProps<T>['itemKey'] = itemKey

  @Output() rangeChange = new EventEmitter<IAltCoreVirtualScrollRange>()

  @ContentChild(TemplateRef) rowTemplate: TemplateRef<IAltNgVirtualScrollRowContext<T>> | undefined

  @ViewChild('coreVirtualScroll', { static: true }) private coreVirtualScrollRef!: ElementRef<AltCoreVirtualScroll>

  range: IAltCoreVirtualScrollRange = { start: 0, end: 0 }

  get visibleItems() {
    return this.items.slice(this.range.start, this.range.end)
  }

  trackRow(offset: number, item: T) {
    const index = this.range.start + offset

    return this.itemKey ? this.itemKey(item, index) : index
  }

  scrollToIndex(index: number, behavior?: ScrollBehavior) {
    this.coreVirtualScrollRef.nativeElement.scrollToIndex(index, behavior)
  }

  handleRangeChange(event: VirtualScrollRangeChangeEvent) {
    this.range = event.detail
    this.rangeChange.emit(event.detail)
  }
}
