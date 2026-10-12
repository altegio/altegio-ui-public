import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/dropdownCell'
import {
  createNgDropdownCellProps,
  type IYNgDropdownCellProps,
} from '~ng/ui/dropdownCell/models/types'
import { cleanupInnerHTML } from '~shared/utils/helpers'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { locator } = createNgDropdownCellProps()

@Component({
  selector: 'YDropdownCell',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <y-core-dropdown-cell>
      <div #cell>
        <ng-content select="[cell]" />
      </div>

      @if (cleanupHTML(cell)) {
        <div slot="cell" [innerHTML]="cleanupHTML(cell)"></div>
      }

      <div #append>
        <ng-content select="[append]" />
      </div>

      @if (cleanupHTML(append)) {
        <div slot="append" [innerHTML]="cleanupHTML(append)"></div>
      }

      <div #label>
        <ng-content select="[label]" />
      </div>

      @if (cleanupHTML(label)) {
        <div slot="label" [innerHTML]="cleanupHTML(label)"></div>
      }

      <div #content>
        <ng-content select="[content]" />
      </div>

      @if (cleanupHTML(content)) {
        <div slot="content" [innerHTML]="cleanupHTML(content)"></div>
      }

      <div #prepend>
        <ng-content select="[prepend]" />
      </div>

      @if (cleanupHTML(prepend)) {
        <div slot="prepend" [innerHTML]="cleanupHTML(prepend)"></div>
      }
    </y-core-dropdown-cell>
  `,
})

export class YDropdownCell implements IYNgDropdownCellProps {
  @Input() @DefaultValue(locator) locator: IYNgDropdownCellProps['locator'] = locator

  protected cleanupHTML = cleanupInnerHTML
}
