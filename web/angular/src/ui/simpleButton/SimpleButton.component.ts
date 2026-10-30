import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'
import '~core/ui/simpleButton'
import { createNgSimpleButtonProps, type IAltNgSimpleButtonProps } from '~ng/ui/simpleButton/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { size, variant, disabled, loading, href, target, hostStyles, alignment, fullWidth, loaderVariant } = createNgSimpleButtonProps()

@Component({
  selector: 'AltSimpleButton',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <alt-core-simple-button
      [size]="size"
      [variant]="variant"
      [disabled]="disabled"
      [loading]="loading"
      [href]="href"
      [alignment]="alignment"
      [target]="target"
      [fullWidth]="fullWidth"
      [hostStyles]="hostStyles"
    >
      <ng-content>
      </ng-content>
    </alt-core-simple-button>
  `,
})
export class AltSimpleButton implements IAltNgSimpleButtonProps {
  @Input() @DefaultValue(size) size: IAltNgSimpleButtonProps['size'] = size
  @Input() @DefaultValue(variant) variant: IAltNgSimpleButtonProps['variant'] = variant
  @Input() @DefaultValue(disabled) disabled: IAltNgSimpleButtonProps['disabled'] = disabled
  @Input() @DefaultValue(loading) loading: IAltNgSimpleButtonProps['loading'] = loading
  @Input() @DefaultValue(href) href: IAltNgSimpleButtonProps['href'] = href
  @Input() @DefaultValue(target) target: IAltNgSimpleButtonProps['target'] = target
  @Input() @DefaultValue(alignment) alignment: IAltNgSimpleButtonProps['alignment'] = alignment
  @Input() @DefaultValue(fullWidth) fullWidth: IAltNgSimpleButtonProps['fullWidth'] = fullWidth
  @Input() @DefaultValue(hostStyles) hostStyles: IAltNgSimpleButtonProps['hostStyles'] = hostStyles
  @Input() @DefaultValue(loaderVariant) loaderVariant: IAltNgSimpleButtonProps['loaderVariant'] = loaderVariant
}
