import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core'

import '~core/ui/pagination'
import {
  createNgPaginationProps,
  type IYNgPaginationProps,
} from '~ng/ui/pagination/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import type { ChangePageEvent } from './models/events'

const { page, itemsPerPage, total, disabled } = createNgPaginationProps()

@Component({
  selector: 'YPagination',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <y-core-pagination
      [page]="page"
      [itemsPerPage]="itemsPerPage"
      [total]="total"
      [disabled]="disabled"
      (changePage)="handleChangePage($event)"
    >
    </y-core-pagination>
  `,
})

export class YPagination implements IYNgPaginationProps {
  @Input() @DefaultValue(page) page: IYNgPaginationProps['page'] = page
  @Input() @DefaultValue(itemsPerPage) itemsPerPage: IYNgPaginationProps['itemsPerPage'] = itemsPerPage
  @Input() @DefaultValue(total) total: IYNgPaginationProps['total'] = total
  @Input() @DefaultValue(disabled) disabled: IYNgPaginationProps['disabled'] = disabled

  @Output() changePage = new EventEmitter<ChangePageEvent>()
  handleFocusEvent(event: Event) {
    this.changePage.emit(event as ChangePageEvent)
  }
}
