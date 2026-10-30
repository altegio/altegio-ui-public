import type { TemplateRef } from '@angular/core'
import { Component, ContentChild, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/tab'
import { createNgTabProps, type IAltNgTabProps } from '~ng/ui/tab/models/types'
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
  selector: 'AltTab',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgTemplateOutlet],
  template: `
    <alt-core-tab
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
    </alt-core-tab>
  `,
})
export class AltTab implements IAltNgTabProps {
  @Input() @DefaultValue(tagVariant) tagVariant: IAltNgTabProps['tagVariant'] = tagVariant
  @Input() @DefaultValue(counterValue) counterValue: IAltNgTabProps['counterValue'] = counterValue
  @Input() @DefaultValue(leftIcon) leftIcon: IAltNgTabProps['leftIcon'] = leftIcon
  @Input() @DefaultValue(leftIconSize) leftIconSize: IAltNgTabProps['leftIconSize'] = leftIconSize
  @Input() @DefaultValue(text) text: IAltNgTabProps['text'] = text
  @Input() @DefaultValue(active) active: IAltNgTabProps['active'] = active
  @Input() @DefaultValue(disabled) disabled: IAltNgTabProps['disabled'] = disabled
  @Input() @DefaultValue(isTagVisible) isTagVisible: IAltNgTabProps['isTagVisible'] = isTagVisible
  @Input() @DefaultValue(tagText) tagText: IAltNgTabProps['tagText'] = tagText
  @Input() @DefaultValue(locator) locator: IAltNgTabProps['locator'] = locator
  @Input() @DefaultValue(locatorTag) locatorTag: IAltNgTabProps['locatorTag'] = locatorTag
  @Input() @DefaultValue(locatorCounter) locatorCounter: IAltNgTabProps['locatorCounter'] = locatorCounter
  @Input() @DefaultValue(isCounterVisible) isCounterVisible: IAltNgTabProps['isCounterVisible'] = isCounterVisible

  @ContentChild('tabBefore') tabBeforeRef: TemplateRef<unknown> | undefined
  @ContentChild('tabAfter') tabAfterRef: TemplateRef<unknown> | undefined

  protected readonly cleanupHTML = cleanupInnerHTML
}
