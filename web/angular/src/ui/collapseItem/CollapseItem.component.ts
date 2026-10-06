import type { TemplateRef } from '@angular/core'
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'

import '~core/ui/collapseItem'
import {
  createNgCollapseItemProps,
  type IYNgCollapseItemProps,
  type CollapseItemClickEvent,
} from '~ng/ui/collapseItem/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { label, annotation, opened, value, variant, loading, shallow } = createNgCollapseItemProps()

@Component({
  selector: 'YCollapseItem',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgTemplateOutlet],
  template: `
    <y-core-collapse-item
      (collapse-item-click)="handleCollapseItemClickEvent($event)"
      [label]="label"
      [annotation]="annotation"
      [opened]="opened"
      [shallow]="shallow"
      [value]="value"
      [variant]="variant"
    >
      @if (collapseItemBeforeRef) {
        <div slot="before">
          <ng-container *ngTemplateOutlet="collapseItemBeforeRef" />
        </div>
      }

      @if (collapseItemAvatarRef) {
        <div slot="avatar">
          <ng-container *ngTemplateOutlet="collapseItemAvatarRef" />
        </div>
      }

      @if (collapseItemMainRef) {
        <div slot="main">
          <ng-container *ngTemplateOutlet="collapseItemMainRef" />
        </div>
      }

      @if (collapseItemLabelRef) {
        <div slot="label">
          <ng-container *ngTemplateOutlet="collapseItemLabelRef" />
        </div>
      }

      @if (collapseItemAnnotationRef) {
        <div slot="annotation">
          <ng-container *ngTemplateOutlet="collapseItemAnnotationRef" />
        </div>
      }

      @if (collapseItemContentRef) {
        <div slot="content">
          <ng-container *ngTemplateOutlet="collapseItemContentRef" />
        </div>
      }

      @if (collapseItemAfterRef) {
        <div slot="after">
          <ng-container *ngTemplateOutlet="collapseItemAfterRef" />
        </div>
      }
    </y-core-collapse-item>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class YCollapseItem implements IYNgCollapseItemProps {
  @Input() @DefaultValue(label) label: IYNgCollapseItemProps['label'] = label
  @Input() @DefaultValue(annotation) annotation: IYNgCollapseItemProps['annotation'] = annotation
  @Input() @DefaultValue(opened) opened: IYNgCollapseItemProps['opened'] = opened
  @Input() @DefaultValue(loading) loading: IYNgCollapseItemProps['loading'] = loading
  @Input() @DefaultValue(shallow) shallow: IYNgCollapseItemProps['shallow'] = shallow
  @Input() @DefaultValue(value) value: IYNgCollapseItemProps['value'] = value
  @Input() @DefaultValue(variant) variant: IYNgCollapseItemProps['variant'] = variant

  @Output('collapse-item-click') collapseItemClick = new EventEmitter<CollapseItemClickEvent>()

  @ContentChild('collapseItemBefore') collapseItemBeforeRef: TemplateRef<unknown> | undefined
  @ContentChild('collapseItemAvatar') collapseItemAvatarRef: TemplateRef<unknown> | undefined
  @ContentChild('collapseItemAfter') collapseItemAfterRef: TemplateRef<unknown> | undefined
  @ContentChild('collapseItemMain') collapseItemMainRef: TemplateRef<unknown> | undefined
  @ContentChild('collapseItemLabel') collapseItemLabelRef: TemplateRef<unknown> | undefined
  @ContentChild('collapseItemAnnotation') collapseItemAnnotationRef: TemplateRef<unknown> | undefined
  @ContentChild('collapseItemContent') collapseItemContentRef: TemplateRef<unknown> | undefined

  handleCollapseItemClickEvent(event: Event) {
    this.collapseItemClick.emit(event as CollapseItemClickEvent)
  }
}
