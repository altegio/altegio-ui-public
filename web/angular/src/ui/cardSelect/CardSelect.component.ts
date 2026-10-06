import type { AfterViewInit, TemplateRef } from '@angular/core'
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, signal, ViewChild } from '@angular/core'

import '~core/ui/cardSelect'
import {
  createNgCardSelectProps,
  type IYNgCardSelectProps,
  type YNgCardSelectFocusEvent,
  type YNgCardSelectBlurEvent,
} from '~ng/ui/cardSelect/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import { cleanupInnerHTML } from '~shared/utils'
import { NgTemplateOutlet } from '@angular/common'
import { checkMultipleSlots, hasContent } from '~ng/utils/content-helpers'

const { annotation, checked, disabled, hoverable, focusable, size, headerText, tagText, tagVariant, headerIcon } = createNgCardSelectProps()

@Component({
  selector: 'YCardSelect',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgTemplateOutlet],
  template: `
    <y-core-card-select
      [annotation]="annotation"
      [checked]="checked"
      [disabled]="disabled"
      [hoverable]="hoverable"
      [focusable]="focusable"
      [size]="size"
      [headerText]="headerText"
      [tagText]="tagText"
      [tagVariant]="tagVariant"
      [headerIcon]="headerIcon"
      (click)="handleClickEvent($event)"
      (focus)="handleFocusEvent($event)"
      (blur)="handleBlurEvent($event)"
    >
      <ng-template #cardSelectBefore>
        <ng-content select="[card-select-before]" />
      </ng-template>

      @if (hasSlotContent().before) {
        <div slot="before">
            <ng-container *ngTemplateOutlet="cardSelectBefore" />
        </div>
      }

      <div hidden #cardSelectAnnotation>
        <ng-content select="[card-select-annotation]" />
      </div>

      @if (cleanupHTML(cardSelectAnnotation)) {
        <div
          slot="annotation"
          [innerHTML]="cleanupHTML(cardSelectAnnotation)"
        ></div>
      }

      <ng-template #cardSelectAfter>
        <ng-content select="[card-select-after]" />
      </ng-template>

      @if (hasSlotContent().after) {
        <div slot="after">
          <ng-container *ngTemplateOutlet="cardSelectAfter" />
        </div>
      }
    </y-core-card-select>
  `,
})

export class YCardSelect implements IYNgCardSelectProps, AfterViewInit {
  @Input() @DefaultValue(annotation) annotation: IYNgCardSelectProps['annotation'] = annotation
  @Input() @DefaultValue(checked) checked: IYNgCardSelectProps['checked'] = checked
  @Input() @DefaultValue(disabled) disabled: IYNgCardSelectProps['disabled'] = disabled
  @Input() @DefaultValue(hoverable) hoverable: IYNgCardSelectProps['hoverable'] = hoverable
  @Input() @DefaultValue(focusable) focusable: IYNgCardSelectProps['focusable'] = focusable
  @Input() @DefaultValue(size) size: IYNgCardSelectProps['size'] = size
  @Input() @DefaultValue(headerText) headerText: IYNgCardSelectProps['headerText'] = headerText
  @Input() @DefaultValue(tagText) tagText: IYNgCardSelectProps['tagText'] = tagText
  @Input() @DefaultValue(tagVariant) tagVariant: IYNgCardSelectProps['tagVariant'] = tagVariant
  @Input() @DefaultValue(headerIcon) headerIcon: IYNgCardSelectProps['headerIcon'] = headerIcon

  @Output() click = new EventEmitter<Event>()
  handleClickEvent(event: Event) {
    this.click.emit(event)
  }

  @Output() focus = new EventEmitter<Event>()

  handleFocusEvent(event: Event) {
    const focusEvent = event as YNgCardSelectFocusEvent
    this.focus.emit(focusEvent)
  }

  @Output() blur = new EventEmitter<Event>()

  handleBlurEvent(event: Event) {
    const blurEvent = event as YNgCardSelectBlurEvent
    this.blur.emit(blurEvent)
  }

  @ViewChild('cardSelectBefore') beforeTemplate?: TemplateRef<unknown>
  @ViewChild('cardSelectAfter') afterTemplate?: TemplateRef<unknown>

  hasSlotContent = signal<Record<string, boolean>>({})

  ngAfterViewInit(): void {
    this.hasSlotContent.set(checkMultipleSlots({
      before: this.beforeTemplate,
      after: this.afterTemplate,
    }))
  }

  protected cleanupHTML = cleanupInnerHTML
  protected hasContent = hasContent
}
