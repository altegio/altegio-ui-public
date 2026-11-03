import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  type ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core'

import '~core/ui/scrollArea'
import type { AltCoreScrollArea } from '~core/ui/scrollArea'
import type { IAltCoreScrollAreaPosition, ScrollAreaScrollEvent, TAltCoreScrollAxis } from '~core/ui/scrollArea/models/types'
import {
  createNgScrollAreaProps,
  type IAltNgScrollAreaProps,
} from '~ng/ui/scrollArea/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { orientation, accessibleName } = createNgScrollAreaProps()

@Component({
  selector: 'AltScrollArea',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // A height or max-height on <AltScrollArea> passes to the core element
  host: { style: 'display: block;' },
  template: `
    <alt-core-scroll-area
      #coreScrollArea
      style="display: block; height: 100%; max-height: inherit;"
      [orientation]="orientation"
      [accessibleName]="accessibleName"
      (scroll-change)="handleScrollChange($any($event))"
    >
      <ng-content />
    </alt-core-scroll-area>
  `,
})
export class AltScrollArea implements IAltNgScrollAreaProps {
  @Input() @DefaultValue(orientation) orientation: IAltNgScrollAreaProps['orientation'] = orientation
  @Input() @DefaultValue(accessibleName) accessibleName: IAltNgScrollAreaProps['accessibleName'] = accessibleName

  @Output() scrollChange = new EventEmitter<IAltCoreScrollAreaPosition>()

  @ViewChild('coreScrollArea', { static: true }) private coreScrollAreaRef!: ElementRef<AltCoreScrollArea>

  getScrollPosition() {
    return this.coreScrollAreaRef.nativeElement.getScrollPosition()
  }

  setScrollPosition(axis: TAltCoreScrollAxis, offset: number, behavior?: ScrollBehavior) {
    this.coreScrollAreaRef.nativeElement.setScrollPosition(axis, offset, behavior)
  }

  setScrollPercentage(axis: TAltCoreScrollAxis, ratio: number, behavior?: ScrollBehavior) {
    this.coreScrollAreaRef.nativeElement.setScrollPercentage(axis, ratio, behavior)
  }

  handleScrollChange(event: ScrollAreaScrollEvent) {
    this.scrollChange.emit(event.detail)
  }
}
