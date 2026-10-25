import { Component, CUSTOM_ELEMENTS_SCHEMA, type ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core'

import { type YCoreFunctionalModal } from '~core/ui/functionalModal'
import '~core/ui/functionalModal'
import {
  createNgFunctionalModalProps,
  type IYNgFunctionalModalProps,
} from './models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import { cleanupInnerHTML } from '~shared/utils'

const { open, size, width, hideOverlay, hideFooter, preventEscape, fullScreen, heading, subHeading, dialogLabel, locale } = createNgFunctionalModalProps()

@Component({
  selector: 'YFunctionalModal',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <y-core-functional-modal
      #functionalModal
      [open]="open"
      [size]="size"
      [width]="width"
      [hideOverlay]="hideOverlay"
      [hideFooter]="hideFooter"
      [preventEscape]="preventEscape"
      [fullScreen]="fullScreen"
      [heading]="heading"
      [subHeading]="subHeading"
      [attr.dialog-label]="dialogLabel"
      [locale]="locale"
      (open)="handleOpen($event)"
      (close)="handleClose($event)"
      (click-close-icon)="handleClickCloseIcon($event)"
      (click-overlay)="handleClickOverlay($event)"
      (click-activator)="handleClickActivator($event)"
      (press-escape)="handlePressEscape($event)"
      (cancel)="handleCancel($event)"
      (submit)="handleSubmit($event)"
    >
      <div #headerMedia>
        <ng-content select="[header-media]" />
      </div>

      @if (cleanupHTML(headerMedia)) {
        <div
          slot="header-media"
          [innerHTML]="cleanupHTML(headerMedia)"
        ></div>
      }

      <div #header>
        <ng-content select="[header]" />
      </div>

      @if (cleanupHTML(header)) {
        <div
          slot="header"
          [innerHTML]="cleanupHTML(header)"
        ></div>
      }

      <div #content>
        <ng-content select="[content]" />
      </div>

      @if (cleanupHTML(content)) {
        <div
          slot="content"
          [innerHTML]="cleanupHTML(content)"
        ></div>
      }

      <div slot="activator">
        <ng-content select="[activator]" />
      </div>

      <div #actions>
        <ng-content select="[actions]" />
      </div>

      @if (cleanupHTML(actions)) {
        <div
          slot="actions"
          [innerHTML]="cleanupHTML(actions)"
        ></div>
      }

      <div #beforeActions>
        <ng-content select="[before-actions]" />
      </div>

      @if (cleanupHTML(beforeActions)) {
        <div
          slot="before-actions"
          [innerHTML]="cleanupHTML(beforeActions)"
        ></div>
      }

      <div #footer>
        <ng-content select="[footer]" />
      </div>

      @if (cleanupHTML(footer)) {
        <div
          slot="footer"
          [innerHTML]="cleanupHTML(footer)"
        ></div>
      }
    </y-core-functional-modal>
  `,
})
export class YFunctionalModal implements IYNgFunctionalModalProps {
  @Input() @DefaultValue(open) open: IYNgFunctionalModalProps['open'] = open
  @Input() @DefaultValue(size) size: IYNgFunctionalModalProps['size'] = size
  @Input() @DefaultValue(width) width: IYNgFunctionalModalProps['width'] = width
  @Input() @DefaultValue(hideOverlay) hideOverlay: IYNgFunctionalModalProps['hideOverlay'] = hideOverlay
  @Input() @DefaultValue(hideFooter) hideFooter: IYNgFunctionalModalProps['hideFooter'] = hideFooter
  @Input() @DefaultValue(preventEscape) preventEscape: IYNgFunctionalModalProps['preventEscape'] = preventEscape
  @Input() @DefaultValue(fullScreen) fullScreen: IYNgFunctionalModalProps['fullScreen'] = fullScreen
  @Input() @DefaultValue(heading) heading: IYNgFunctionalModalProps['heading'] = heading
  @Input() @DefaultValue(subHeading) subHeading: IYNgFunctionalModalProps['subHeading'] = subHeading
  @Input() @DefaultValue(dialogLabel) dialogLabel: IYNgFunctionalModalProps['dialogLabel'] = dialogLabel
  @Input() @DefaultValue(locale) locale: IYNgFunctionalModalProps['locale'] = locale

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

  @Output() cancelEvent = new EventEmitter()
  handleCancel(event: Event) {
    this.cancelEvent.emit(event)
  }

  @Output() submitEvent = new EventEmitter()
  handleSubmit(event: Event) {
    this.submitEvent.emit(event)
  }

  @ViewChild('functionalModal', { static: true })
  private functionalModalRef?: ElementRef<YCoreFunctionalModal>

  scrollToTop(): void {
    this.functionalModalRef?.nativeElement.scrollToTop()
  }

  protected cleanupHTML = cleanupInnerHTML
}
