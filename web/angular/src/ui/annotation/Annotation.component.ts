import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/annotation'
import { createNgAnnotationProps, type IYNgAnnotationProps } from './models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import { cleanupInnerHTML } from '~shared/utils'

const { text, disabled } = createNgAnnotationProps()

@Component({
  selector: 'YAnnotation',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <y-core-annotation
      [text]="text"
      [disabled]="disabled"
    >
      <div hidden #annotation>
        <ng-content select="[annotation-default]">

        </ng-content>
      </div>

      @if (cleanupHTML(annotation)) {
        <div
          slot="annotation"
          [innerHTML]="cleanupHTML(annotation)"
        ></div>
      }
    </y-core-annotation>
  `,
})
export class YAnnotation implements IYNgAnnotationProps {
  @Input() @DefaultValue(text) text: IYNgAnnotationProps['text'] = text
  @Input() @DefaultValue(disabled) disabled: IYNgAnnotationProps['disabled'] = disabled

  protected cleanupHTML = cleanupInnerHTML
}
