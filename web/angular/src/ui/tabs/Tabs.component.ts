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
import type { IAltNgTabsProps } from '~ng/ui/tabs/models/types'
import { createNgTabsProps } from '~ng/ui/tabs/models/types'
import type { ChangeActiveTabEvent } from '~core/ui/tabs/models/types'
import { NgTemplateOutlet } from '@angular/common'

const { tabs, value } = createNgTabsProps()

@Component({
  selector: 'AltTabs',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <alt-core-tabs
      [tabs]="tabs"
      [value]="value"
      (change-active-tab)="changeActiveTabHandler($any($event))"
    >
      @if (tabsDefaultRef) {
        <ng-container *ngTemplateOutlet="tabsDefaultRef" />
      }
    </alt-core-tabs>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
})
export class AltTabs implements IAltNgTabsProps {
  @Input() @DefaultValue(tabs) tabs: IAltNgTabsProps['tabs'] = tabs

  @Input() @DefaultValue(value) value: IAltNgTabsProps['value'] = value
  @Output() valueChange = new EventEmitter<IAltNgTabsProps['value']>()

  @ContentChild('tabsDefault') tabsDefaultRef: TemplateRef<unknown> | undefined

  changeActiveTabHandler(event: ChangeActiveTabEvent) {
    this.valueChange.emit(event.detail.value)
  }
}
