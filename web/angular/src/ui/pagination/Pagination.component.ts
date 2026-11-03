import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core'

import '~core/ui/pagination'
import {
  type ChangePageEvent,
  createNgPaginationProps,
  type IAltNgPaginationProps,
} from '~ng/ui/pagination/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { page, itemsPerPage, total, disabled } = createNgPaginationProps()

@Component({
  selector: 'AltPagination',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <alt-core-pagination
      [page]="page"
      [itemsPerPage]="itemsPerPage"
      [total]="total"
      [disabled]="disabled"
      (change-page)="handleChangePage($event)"
    />
  `,
})
export class AltPagination implements IAltNgPaginationProps {
  @Input() @DefaultValue(page) page: IAltNgPaginationProps['page'] = page
  @Input() @DefaultValue(itemsPerPage) itemsPerPage: IAltNgPaginationProps['itemsPerPage'] = itemsPerPage
  @Input() @DefaultValue(total) total: IAltNgPaginationProps['total'] = total
  @Input() @DefaultValue(disabled) disabled: IAltNgPaginationProps['disabled'] = disabled

  @Output() changePage = new EventEmitter<ChangePageEvent>()
  @Output() pageChange = new EventEmitter<number>()

  handleChangePage(event: Event) {
    const changePageEvent = event as ChangePageEvent

    this.changePage.emit(changePageEvent)
    this.pageChange.emit(changePageEvent.detail.page)
  }
}
