import type { AfterViewInit, TemplateRef } from '@angular/core'
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, signal, ViewChild } from '@angular/core'

import '~core/ui/cardButton'
import {
  createNgCardButtonProps,
  type IYNgCardButtonProps,
  type YNgCardButtonFocusEvent,
  type YNgCardButtonBlurEvent,
} from '~ng/ui/cardButton/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import { cleanupInnerHTML } from '~shared/utils'
import { NgTemplateOutlet } from '@angular/common'
import { checkMultipleSlots, hasContent } from '~ng/utils/content-helpers'

const { annotation, disabled, hoverable, focusable, size, headerText, tagText, tagVariant, headerIcon } = createNgCardButtonProps()

@Component({
  selector: 'YCardButton',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgTemplateOutlet],
  template: `
    <y-core-card-button
      [annotation]="annotation"
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
      <ng-template #cardButtonBefore>
        <ng-content select="[card-button-before]" />
      </ng-template>

      @if (hasSlotContent().before) {
        <div slot="before">
            <ng-container *ngTemplateOutlet="cardButtonBefore" />
        </div>
      }

      <div hidden #cardButtonMain>
        <ng-content select="[card-button-main]" />
      </div>

      @if (cleanupHTML(cardButtonMain)) {
        <div
          slot="main"
          [innerHTML]="cleanupHTML(cardButtonMain)"
        ></div>
      }

      <div hidden #cardButtonAnnotation>
        <ng-content select="[card-button-annotation]" />
      </div>

      @if (cleanupHTML(cardButtonAnnotation)) {
        <div
          slot="annotation"
          [innerHTML]="cleanupHTML(cardButtonAnnotation)"
        ></div>
      }

      <ng-template #cardButtonAfter>
        <ng-content select="[card-button-after]" />
      </ng-template>

      @if (hasSlotContent().after) {
        <div slot="after">
          <ng-container *ngTemplateOutlet="cardButtonAfter" />
        </div>
      }
    </y-core-card-button>
  `,
})

export class YCardButton implements IYNgCardButtonProps, AfterViewInit {
  @Input() @DefaultValue(annotation) annotation: IYNgCardButtonProps['annotation'] = annotation
  @Input() @DefaultValue(disabled) disabled: IYNgCardButtonProps['disabled'] = disabled
  @Input() @DefaultValue(hoverable) hoverable: IYNgCardButtonProps['hoverable'] = hoverable
  @Input() @DefaultValue(focusable) focusable: IYNgCardButtonProps['focusable'] = focusable
  @Input() @DefaultValue(size) size: IYNgCardButtonProps['size'] = size
  @Input() @DefaultValue(headerText) headerText: IYNgCardButtonProps['headerText'] = headerText
  @Input() @DefaultValue(tagText) tagText: IYNgCardButtonProps['tagText'] = tagText
  @Input() @DefaultValue(tagVariant) tagVariant: IYNgCardButtonProps['tagVariant'] = tagVariant
  @Input() @DefaultValue(headerIcon) headerIcon: IYNgCardButtonProps['headerIcon'] = headerIcon

  @Output() click = new EventEmitter<Event>()

  handleClickEvent(event: Event) {
    this.click.emit(event)
  }

  @Output() focus = new EventEmitter<Event>()

  handleFocusEvent(event: Event) {
    const focusEvent = event as YNgCardButtonFocusEvent
    this.focus.emit(focusEvent)
  }

  @Output() blur = new EventEmitter<Event>()

  handleBlurEvent(event: Event) {
    const blurEvent = event as YNgCardButtonBlurEvent
    this.blur.emit(blurEvent)
  }

  @ViewChild('cardButtonBefore') beforeTemplate?: TemplateRef<unknown>
  @ViewChild('cardButtonAfter') afterTemplate?: TemplateRef<unknown>

  hasSlotContent = signal<Record<string, boolean>>({ before: false, after: false })

  ngAfterViewInit(): void {
    this.hasSlotContent.set(checkMultipleSlots({
      before: this.beforeTemplate,
      after: this.afterTemplate,
    }))
  }

  protected cleanupHTML = cleanupInnerHTML
  protected hasContent = hasContent
}
