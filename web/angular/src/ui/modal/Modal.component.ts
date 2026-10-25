import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core'

import '~core/ui/modal'
import {
  createNgModalProps,
  type IYNgModalProps,
} from '~ng/ui/modal/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import { cleanupInnerHTML } from '~shared/utils'

const { open, size, variant, width, hideOverlay, preventEscape, fullScreen, dialogLabel } = createNgModalProps()

@Component({
  selector: 'YModal',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <y-core-modal
      [open]="open"
      [size]="size"
      [variant]="variant"
      [width]="width"
      [hideOverlay]="hideOverlay"
      [preventEscape]="preventEscape"
      [fullScreen]="fullScreen"
      [attr.dialog-label]="dialogLabel"
      (open)="handleOpen($event)"
      (close)="handleClose($event)"
      (click-close-icon)="handleClickCloseIcon($event)"
      (click-overlay)="handleClickOverlay($event)"
      (click-activator)="handleClickActivator($event)"
      (press-escape)="handlePressEscape($event)"
    >
      <div slot="activator">
        <ng-content select="[activator]" />
      </div>

      <div #content>
        <ng-content select="[content]" />
      </div>

      @if (cleanupHTML(content)) {
        <div slot="content" [innerHTML]="cleanupHTML(content)"></div>
      }

      <div #close>
        <ng-content select="[close]" />
      </div>

      @if (cleanupHTML(close)) {
        <div slot="close" [innerHTML]="cleanupHTML(close)"></div>
      }
    </y-core-modal>
  `,
})
export class YModal implements IYNgModalProps {
  @Input() @DefaultValue(open) open: IYNgModalProps['open'] = open
  @Input() @DefaultValue(size) size: IYNgModalProps['size'] = size
  @Input() @DefaultValue(variant) variant: IYNgModalProps['variant'] = variant
  @Input() @DefaultValue(width) width: IYNgModalProps['width'] = width
  @Input() @DefaultValue(hideOverlay) hideOverlay: IYNgModalProps['hideOverlay'] = hideOverlay
  @Input() @DefaultValue(preventEscape) preventEscape: IYNgModalProps['preventEscape'] = preventEscape
  @Input() @DefaultValue(fullScreen) fullScreen: IYNgModalProps['fullScreen'] = fullScreen
  @Input() @DefaultValue(dialogLabel) dialogLabel: IYNgModalProps['dialogLabel'] = dialogLabel

  @Output() openEvent = new EventEmitter()
  handleOpen(event: Event) {
    this.openEvent.emit(event)
  }

  @Output() closeEvent = new EventEmitter()
  handleClose(event: Event) {
    this.closeEvent.emit(event)
  }

  @Output() clickCloseIconEvent = new EventEmitter()
  handleClickCloseIcon(event: Event) {
    this.clickCloseIconEvent.emit(event)
  }

  @Output() clickOverlayEvent = new EventEmitter()
  handleClickOverlay(event: Event) {
    this.clickOverlayEvent.emit(event)
  }

  @Output() clickActivatorEvent = new EventEmitter()
  handleClickActivator(event: Event) {
    this.clickActivatorEvent.emit(event)
  }

  @Output() pressEscapeEvent = new EventEmitter()
  handlePressEscape(event: Event) {
    this.pressEscapeEvent.emit(event)
  }

  protected cleanupHTML = cleanupInnerHTML
}
