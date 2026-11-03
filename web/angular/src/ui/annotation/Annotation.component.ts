import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/annotation'
import { createNgAnnotationProps, type IAltNgAnnotationProps } from './models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import { cleanupInnerHTML } from '~shared/utils'

const { text, disabled } = createNgAnnotationProps()

@Component({
  selector: 'AltAnnotation',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <alt-core-annotation
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
    </alt-core-annotation>
  `,
})
export class AltAnnotation implements IAltNgAnnotationProps {
  @Input() @DefaultValue(text) text: IAltNgAnnotationProps['text'] = text
  @Input() @DefaultValue(disabled) disabled: IAltNgAnnotationProps['disabled'] = disabled

  protected cleanupHTML = cleanupInnerHTML
}
