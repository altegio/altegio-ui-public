import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'
import '~core/ui/simpleButton'
import { createNgSimpleButtonProps, type IYNgSimpleButtonProps } from '~ng/ui/simpleButton/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { size, variant, disabled, loading, href, target, hostStyles, alignment, fullWidth, loaderVariant } = createNgSimpleButtonProps()

@Component({
  selector: 'YSimpleButton',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <y-core-simple-button
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
    </y-core-simple-button>
  `,
})
export class YSimpleButton implements IYNgSimpleButtonProps {
  @Input() @DefaultValue(size) size: IYNgSimpleButtonProps['size'] = size
  @Input() @DefaultValue(variant) variant: IYNgSimpleButtonProps['variant'] = variant
  @Input() @DefaultValue(disabled) disabled: IYNgSimpleButtonProps['disabled'] = disabled
  @Input() @DefaultValue(loading) loading: IYNgSimpleButtonProps['loading'] = loading
  @Input() @DefaultValue(href) href: IYNgSimpleButtonProps['href'] = href
  @Input() @DefaultValue(target) target: IYNgSimpleButtonProps['target'] = target
  @Input() @DefaultValue(alignment) alignment: IYNgSimpleButtonProps['alignment'] = alignment
  @Input() @DefaultValue(fullWidth) fullWidth: IYNgSimpleButtonProps['fullWidth'] = fullWidth
  @Input() @DefaultValue(hostStyles) hostStyles: IYNgSimpleButtonProps['hostStyles'] = hostStyles
  @Input() @DefaultValue(loaderVariant) loaderVariant: IYNgSimpleButtonProps['loaderVariant'] = loaderVariant
}
