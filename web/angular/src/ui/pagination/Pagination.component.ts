import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core'

import '~core/ui/pagination'
import {
  createNgPaginationProps,
  type IAltNgPaginationProps,
} from '~ng/ui/pagination/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import type { ChangePageEvent } from './models/events'

const { page, itemsPerPage, total, disabled } = createNgPaginationProps()

@Component({
  selector: 'AltPagination',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <alt-core-pagination
      [page]="page"
      [itemsPerPage]="itemsPerPage"
      [total]="total"
      [disabled]="disabled"
      (changePage)="handleChangePage($event)"
    >
    </alt-core-pagination>
  `,
})

export class AltPagination implements IAltNgPaginationProps {
  @Input() @DefaultValue(page) page: IAltNgPaginationProps['page'] = page
  @Input() @DefaultValue(itemsPerPage) itemsPerPage: IAltNgPaginationProps['itemsPerPage'] = itemsPerPage
  @Input() @DefaultValue(total) total: IAltNgPaginationProps['total'] = total
  @Input() @DefaultValue(disabled) disabled: IAltNgPaginationProps['disabled'] = disabled

  @Output() changePage = new EventEmitter<ChangePageEvent>()
  handleFocusEvent(event: Event) {
    this.changePage.emit(event as ChangePageEvent)
  }
}
