import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, ContentChild, type TemplateRef } from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'

import '~core/ui/label'
import { type IAltNgLabelProps, createNgLabelProps } from '~ng/ui/label/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { disabled, required, text, tooltipText, debounce, tooltipActive, wrap, alignment, size, variant, tooltipPlacement } = createNgLabelProps()

@Component({
  selector: 'AltLabel',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgTemplateOutlet],
  template: `
  <alt-core-label
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
  </alt-core-label> `,
})
export class AltLabel implements IAltNgLabelProps {
  @Input() @DefaultValue(disabled) disabled: IAltNgLabelProps['disabled'] = disabled
  @Input() @DefaultValue(required) required: IAltNgLabelProps['required'] = required
  @Input() @DefaultValue(text) text: IAltNgLabelProps['text'] = text
  @Input() @DefaultValue(tooltipText) tooltipText: IAltNgLabelProps['tooltipText'] = tooltipText
  @Input() @DefaultValue(debounce) debounce: IAltNgLabelProps['debounce'] = debounce
  @Input() @DefaultValue(tooltipActive) tooltipActive: IAltNgLabelProps['tooltipActive'] = tooltipActive
  @Input() @DefaultValue(wrap) wrap: IAltNgLabelProps['wrap'] = wrap
  @Input() @DefaultValue(alignment) alignment: IAltNgLabelProps['alignment'] = alignment
  @Input() @DefaultValue(size) size: IAltNgLabelProps['size'] = size
  @Input() @DefaultValue(variant) variant: IAltNgLabelProps['variant'] = variant
  @Input() @DefaultValue(tooltipPlacement) tooltipPlacement: IAltNgLabelProps['tooltipPlacement'] = tooltipPlacement

  @ContentChild('tooltipContent') tooltipContentRef: TemplateRef<unknown> | undefined
}
