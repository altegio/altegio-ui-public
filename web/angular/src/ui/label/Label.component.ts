import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, ContentChild, type TemplateRef } from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'

import '~core/ui/label'
import { type IYNgLabelProps, createNgLabelProps } from '~ng/ui/label/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { disabled, required, text, tooltipText, debounce, tooltipActive, wrap, alignment, size, variant, tooltipPlacement } = createNgLabelProps()

@Component({
  selector: 'YLabel',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgTemplateOutlet],
  template: `
  <y-core-label
    [disabled]="disabled"
    [required]="required"
    [text]="text"
    [tooltipText]="tooltipText"
    [debounce]="debounce"
    [tooltipActive]="tooltipActive"
    [wrap]="wrap"
    [alignment]="alignment"
    [size]="size"
    [variant]="variant"
    [tooltipPlacement]="tooltipPlacement"
  >
    @if (tooltipContentRef) {
      <div slot="tooltip-content">
        <ng-container *ngTemplateOutlet="tooltipContentRef" />
      </div>
    }
  </y-core-label> `,
})
export class YLabel implements IYNgLabelProps {
  @Input() @DefaultValue(disabled) disabled: IYNgLabelProps['disabled'] = disabled
  @Input() @DefaultValue(required) required: IYNgLabelProps['required'] = required
  @Input() @DefaultValue(text) text: IYNgLabelProps['text'] = text
  @Input() @DefaultValue(tooltipText) tooltipText: IYNgLabelProps['tooltipText'] = tooltipText
  @Input() @DefaultValue(debounce) debounce: IYNgLabelProps['debounce'] = debounce
  @Input() @DefaultValue(tooltipActive) tooltipActive: IYNgLabelProps['tooltipActive'] = tooltipActive
  @Input() @DefaultValue(wrap) wrap: IYNgLabelProps['wrap'] = wrap
  @Input() @DefaultValue(alignment) alignment: IYNgLabelProps['alignment'] = alignment
  @Input() @DefaultValue(size) size: IYNgLabelProps['size'] = size
  @Input() @DefaultValue(variant) variant: IYNgLabelProps['variant'] = variant
  @Input() @DefaultValue(tooltipPlacement) tooltipPlacement: IYNgLabelProps['tooltipPlacement'] = tooltipPlacement

  @ContentChild('tooltipContent') tooltipContentRef: TemplateRef<unknown> | undefined
}
