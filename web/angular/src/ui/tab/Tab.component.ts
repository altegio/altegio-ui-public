import type { TemplateRef } from '@angular/core'
import { Component, ContentChild, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/tab'
import { createNgTabProps, type IYNgTabProps } from '~ng/ui/tab/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import { cleanupInnerHTML } from '~shared/utils'
import { NgTemplateOutlet } from '@angular/common'

const {
  tagVariant,
  counterValue,
  leftIcon,
  leftIconSize,
  text,
  active,
  disabled,
  isTagVisible,
  tagText,
  isCounterVisible,
  locator,
  locatorTag,
  locatorCounter,
} = createNgTabProps()

@Component({
  selector: 'YTab',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgTemplateOutlet],
  template: `
    <y-core-tab
      [tagVariant]="tagVariant"
      [counterValue]="counterValue"
      [leftIcon]="leftIcon"
      [leftIconSize]="leftIconSize"
      [text]="text"
      [active]="active"
      [disabled]="disabled"
      [isTagVisible]="isTagVisible"
      [tagText]="tagText"
      [isCounterVisible]="isCounterVisible"
      [locator]="locator"
      [locatorTag]="locatorTag"
      [locatorCounter]="locatorCounter"
    >
      @if (tabBeforeRef) {
        <div slot="before">
          <ng-container *ngTemplateOutlet="tabBeforeRef"/>
        </div>
      }

      @if (tabAfterRef) {
        <div slot="after">
          <ng-container *ngTemplateOutlet="tabAfterRef"/>
        </div>
      }
    </y-core-tab>
  `,
})
export class YTab implements IYNgTabProps {
  @Input() @DefaultValue(tagVariant) tagVariant: IYNgTabProps['tagVariant'] = tagVariant
  @Input() @DefaultValue(counterValue) counterValue: IYNgTabProps['counterValue'] = counterValue
  @Input() @DefaultValue(leftIcon) leftIcon: IYNgTabProps['leftIcon'] = leftIcon
  @Input() @DefaultValue(leftIconSize) leftIconSize: IYNgTabProps['leftIconSize'] = leftIconSize
  @Input() @DefaultValue(text) text: IYNgTabProps['text'] = text
  @Input() @DefaultValue(active) active: IYNgTabProps['active'] = active
  @Input() @DefaultValue(disabled) disabled: IYNgTabProps['disabled'] = disabled
  @Input() @DefaultValue(isTagVisible) isTagVisible: IYNgTabProps['isTagVisible'] = isTagVisible
  @Input() @DefaultValue(tagText) tagText: IYNgTabProps['tagText'] = tagText
  @Input() @DefaultValue(locator) locator: IYNgTabProps['locator'] = locator
  @Input() @DefaultValue(locatorTag) locatorTag: IYNgTabProps['locatorTag'] = locatorTag
  @Input() @DefaultValue(locatorCounter) locatorCounter: IYNgTabProps['locatorCounter'] = locatorCounter
  @Input() @DefaultValue(isCounterVisible) isCounterVisible: IYNgTabProps['isCounterVisible'] = isCounterVisible

  @ContentChild('tabBefore') tabBeforeRef: TemplateRef<unknown> | undefined
  @ContentChild('tabAfter') tabAfterRef: TemplateRef<unknown> | undefined

  protected readonly cleanupHTML = cleanupInnerHTML
}
