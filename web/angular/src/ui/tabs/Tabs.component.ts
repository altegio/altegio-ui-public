import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  Output, type TemplateRef,
} from '@angular/core'

import '~core/ui/tabs'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import type { IYNgTabsProps } from '~ng/ui/tabs/models/types'
import { createNgTabsProps } from '~ng/ui/tabs/models/types'
import type { ChangeActiveTabEvent } from '~core/ui/tabs/models/types'
import { NgTemplateOutlet } from '@angular/common'

const { tabs, value } = createNgTabsProps()

@Component({
  selector: 'YTabs',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <y-core-tabs
      [tabs]="tabs"
      [value]="value"
      (change-active-tab)="changeActiveTabHandler($any($event))"
    >
      @if (tabsDefaultRef) {
        <ng-container *ngTemplateOutlet="tabsDefaultRef" />
      }
    </y-core-tabs>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
})
export class YTabs implements IYNgTabsProps {
  @Input() @DefaultValue(tabs) tabs: IYNgTabsProps['tabs'] = tabs

  @Input() @DefaultValue(value) value: IYNgTabsProps['value'] = value
  @Output() valueChange = new EventEmitter<IYNgTabsProps['value']>()

  @ContentChild('tabsDefault') tabsDefaultRef: TemplateRef<unknown> | undefined

  changeActiveTabHandler(event: ChangeActiveTabEvent) {
    this.valueChange.emit(event.detail.value)
  }
}
