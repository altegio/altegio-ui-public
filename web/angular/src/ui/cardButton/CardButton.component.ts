import type { AfterViewInit, TemplateRef } from '@angular/core'
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, signal, ViewChild } from '@angular/core'

import '~core/ui/cardButton'
import {
  createNgCardButtonProps,
  type IAltNgCardButtonProps,
  type AltNgCardButtonFocusEvent,
  type AltNgCardButtonBlurEvent,
} from '~ng/ui/cardButton/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import { cleanupInnerHTML } from '~shared/utils'
import { NgTemplateOutlet } from '@angular/common'
import { checkMultipleSlots, hasContent } from '~ng/utils/content-helpers'

const { annotation, disabled, hoverable, focusable, size, headerText, tagText, tagVariant, headerIcon } = createNgCardButtonProps()

@Component({
  selector: 'AltCardButton',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgTemplateOutlet],
  template: `
    <alt-core-card-button
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
    </alt-core-card-button>
  `,
})

export class AltCardButton implements IAltNgCardButtonProps, AfterViewInit {
  @Input() @DefaultValue(annotation) annotation: IAltNgCardButtonProps['annotation'] = annotation
  @Input() @DefaultValue(disabled) disabled: IAltNgCardButtonProps['disabled'] = disabled
  @Input() @DefaultValue(hoverable) hoverable: IAltNgCardButtonProps['hoverable'] = hoverable
  @Input() @DefaultValue(focusable) focusable: IAltNgCardButtonProps['focusable'] = focusable
  @Input() @DefaultValue(size) size: IAltNgCardButtonProps['size'] = size
  @Input() @DefaultValue(headerText) headerText: IAltNgCardButtonProps['headerText'] = headerText
  @Input() @DefaultValue(tagText) tagText: IAltNgCardButtonProps['tagText'] = tagText
  @Input() @DefaultValue(tagVariant) tagVariant: IAltNgCardButtonProps['tagVariant'] = tagVariant
  @Input() @DefaultValue(headerIcon) headerIcon: IAltNgCardButtonProps['headerIcon'] = headerIcon

  @Output() click = new EventEmitter<Event>()

  handleClickEvent(event: Event) {
    this.click.emit(event)
  }

  @Output() focus = new EventEmitter<Event>()

  handleFocusEvent(event: Event) {
    const focusEvent = event as AltNgCardButtonFocusEvent
    this.focus.emit(focusEvent)
  }

  @Output() blur = new EventEmitter<Event>()

  handleBlurEvent(event: Event) {
    const blurEvent = event as AltNgCardButtonBlurEvent
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
