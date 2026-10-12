import type { OnInit, OnChanges, SimpleChanges, TemplateRef } from '@angular/core'
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, ContentChild, signal, computed, Optional, Self, Inject, ChangeDetectionStrategy } from '@angular/core'
import type { ValidatorFn } from '@angular/forms'
import { UntypedFormControl, Validators, NgControl } from '@angular/forms'
import { FormsModule } from '@angular/forms'
import { NgTemplateOutlet } from '@angular/common'

import '~core/ui/textarea'
import type { TYNgTextareaModel } from './models/types'
import {
  createNgTextareaProps,
  type IYNgTextareaProps,
  type InputEvent,
  type FocusEvent,
  type BlurEvent,
  type KeydownEvent,
  type ClickOutsideEvent,
  type MouseEnterEvent,
  type MouseLeaveEvent,
  type ClearEvent,
  type RenderEvent,
} from '~ng/ui/textarea/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import { preventAndStopEvent } from '~shared/utils'
import { ControlValueAccessorBase } from '~ng/types/ControlValueAccessorBase'
import { defineCustomElement } from '~web/shared/utils/components'
import { YCoreTextareaTagName } from '~web/shared/constants'
import { YCoreTextarea } from '~core/ui/textarea'

const {
  name, placeholder, required, maxlength, autofocus,
  labelText, labelTooltipText, labelDebounce,
  errors, clearable, rows, resize,
  disabled, size, readonly, error,
  locatorLabel, locatorError,
} = createNgTextareaProps()

defineCustomElement(YCoreTextareaTagName, YCoreTextarea)

@Component({
  selector: 'YTextarea',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, NgTemplateOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <y-core-textarea
      (input)="handleInputEvent($event)"
      (focus)="handleFocusEvent($event)"
      (blur)="handleBlurEvent($event)"
      (keydown)="handleKeydownEvent($event)"
      (click)="handleClickEvent($event)"
      (click-outside)="handleClickOutsideEvent($event)"
      (mouse-enter)="handleMouseEnterEvent($event)"
      (mouse-leave)="handleMouseLeaveEvent($event)"
      (clear)="handleClearEvent($event)"
      (render-textarea)="handleRenderEvent($event)"
      [value]="textareaValue()"
      [name]="name"
      [placeholder]="placeholder"
      [required]="computedRequired()"
      [maxlength]="maxlength"
      [autofocus]="autofocus"
      [labelText]="labelText"
      [labelTooltipText]="labelTooltipText"
      [labelDebounce]="labelDebounce"
      [errors]="computedErrors()"
      [clearable]="clearable"
      [rows]="rows"
      [resize]="resize"
      [disabled]="disabled"
      [size]="size"
      [readonly]="readonly"
      [error]="hasFormErrors()"
      [locatorLabel]="locatorLabel"
      [locatorError]="locatorError"
    >
      @if (textareaBeforeRef) {
        <div slot="before">
          <ng-container *ngTemplateOutlet="textareaBeforeRef" />
        </div>
      }

      @if (textareaAfterRef) {
        <div slot="after">
          <ng-container *ngTemplateOutlet="textareaAfterRef" />
        </div>
      }
    </y-core-textarea>
  `,
})

/**
 * Angular-обертка Textarea
 *
 * Поддерживает работу с `FormControl` и `ngModel`
 *
 * Автоматическое определение `required`:
 * - Из `Validators.required` в FormControl
 * - Из кастомных валидаторов с ключом 'required'
 *
 * Автоматическое извлечение ошибок из FormControl:
 * - Только кастомные валидаторы с форматом: `{ errorKey: { message: 'текст ошибки' } }`
 * - Стандартные Angular валидаторы (`Validators.required`, `Validators.minLength` и т.д.)
 *   не содержат текст ошибки и требуют явной передачи через `[errors]`
 *
 * Позволяет явно определить `required` и ошибки через инпуты.
 * Явное определение имеет приоритет над автоматическим
 *
 * @example
 * // С formControl
 * <YTextarea [formControl]="descriptionControl" />
 *
 * @example
 * // С ngModel
 * <YTextarea [(ngModel)]="description" [required]="true" [errors]="['Обязательное поле']" />
 */
export class YTextarea extends ControlValueAccessorBase<TYNgTextareaModel> implements IYNgTextareaProps, OnInit, OnChanges {
  @Input() @DefaultValue(name) name: IYNgTextareaProps['name'] = name
  @Input() @DefaultValue(placeholder) placeholder: IYNgTextareaProps['placeholder'] = placeholder
  @Input() @DefaultValue(required) required: IYNgTextareaProps['required'] = required
  @Input() @DefaultValue(maxlength) maxlength: IYNgTextareaProps['maxlength'] = maxlength
  @Input() @DefaultValue(autofocus) autofocus: IYNgTextareaProps['autofocus'] = autofocus
  @Input() @DefaultValue(labelText) labelText: IYNgTextareaProps['labelText'] = labelText
  @Input() @DefaultValue(labelTooltipText) labelTooltipText: IYNgTextareaProps['labelTooltipText'] = labelTooltipText
  @Input() @DefaultValue(labelDebounce) labelDebounce: IYNgTextareaProps['labelDebounce'] = labelDebounce
  @Input() @DefaultValue(errors) errors: IYNgTextareaProps['errors'] = errors
  @Input() @DefaultValue(clearable) clearable: IYNgTextareaProps['clearable'] = clearable
  @Input() @DefaultValue(rows) rows: IYNgTextareaProps['rows'] = rows
  @Input() @DefaultValue(resize) resize: IYNgTextareaProps['resize'] = resize
  @Input() @DefaultValue(disabled) disabled: IYNgTextareaProps['disabled'] = disabled
  @Input() @DefaultValue(size) size: IYNgTextareaProps['size'] = size
  @Input() @DefaultValue(readonly) readonly: IYNgTextareaProps['readonly'] = readonly
  @Input() @DefaultValue(error) error: IYNgTextareaProps['error'] = error
  @Input() @DefaultValue(locatorLabel) locatorLabel: IYNgTextareaProps['locatorLabel'] = locatorLabel
  @Input() @DefaultValue(locatorError) locatorError: IYNgTextareaProps['locatorError'] = locatorError

  @Output() focus = new EventEmitter<FocusEvent>()
  @Output() blur = new EventEmitter<BlurEvent>()
  @Output() clear = new EventEmitter<ClearEvent>()
  @Output() keydown = new EventEmitter<KeydownEvent>()
  @Output() click = new EventEmitter<Event>()
  @Output() clickOutside = new EventEmitter<ClickOutsideEvent>()
  @Output() mouseEnter = new EventEmitter<MouseEnterEvent>()
  @Output() mouseLeave = new EventEmitter<MouseLeaveEvent>()
  @Output() renderTextarea = new EventEmitter<RenderEvent>()

  @ContentChild('textareaBefore') textareaBeforeRef: TemplateRef<unknown> | undefined
  @ContentChild('textareaAfter') textareaAfterRef: TemplateRef<unknown> | undefined

  textareaValue = signal<TYNgTextareaModel>('')

  private formControl = signal<UntypedFormControl>(new UntypedFormControl(''))
  private isTouched = signal(false)
  private isInvalid = signal(false)
  private errorsSignal = signal<IYNgTextareaProps['errors']>(undefined)
  private requiredExplicitlySet = signal(false)
  private controlStatusChanged = signal(0)

  private hasCustomRequiredValidator(control: NonNullable<typeof this.ngControl>['control']): boolean {
    if (!control?.validator) return false

    const emptyControl = new UntypedFormControl('')
    const errors = control.validator(emptyControl)
    return !!errors && 'required' in errors
  }

  /**
   * Извлекает ошибки из formControl.
   * Поддерживает только кастомные валидаторы формата: { errorKey: { message: 'текст' } }
   */
  private extractErrorsFromControl = computed<string[] | undefined>(() => {
    this.controlStatusChanged()

    const control = this.ngControl?.control
    if (!control?.errors) return undefined

    type ErrorWithMessage = { message: string }
    const isErrorWithMessage = (error: unknown): error is ErrorWithMessage => {
      return !!error && typeof error === 'object' && 'message' in error && typeof (error as ErrorWithMessage).message === 'string'
    }

    const errorsWithMessages = Object.values(control.errors)
      .filter(isErrorWithMessage)
      .map((error) => error.message)

    return errorsWithMessages.length > 0 ? errorsWithMessages : undefined
  })

  /**
 * Приоритет определения `required`
 * 1. Явно переданное свойство `[required]`
 * 2. Наличие `Validators.required` или кастомного валидатора с ключом `'required'` в `FormControl`
 * 3. По умолчанию — `false`
  */
  computedRequired = computed<boolean>(() => {
    if (this.requiredExplicitlySet()) {
      return this.required ?? false
    }

    const control = this.ngControl?.control
    if (!control) return false

    // Проверяем стандартный Validators.required
    // eslint-disable-next-line @typescript-eslint/unbound-method
    if (control.hasValidator(Validators.required)) {
      return true
    }

    // Проверяем кастомный валидатор, который возвращает ошибку с ключом 'required'
    return this.hasCustomRequiredValidator(control)
  })

  constructor(@Optional() @Self() @Inject(NgControl) public ngControl?: NgControl) {
    super()
    if (this.ngControl) {
      this.ngControl.valueAccessor = this as never
    }
  }

  hasFormErrors = computed<boolean>(() => {
    return Boolean(this.computedErrors() || this.error)
  })

  computedErrors = computed<string[] | null>(() => {
    const errors = this.resolveErrors()
    const shouldShowErrors = this.shouldShowErrors()

    if (!shouldShowErrors || !errors?.length) return null

    return errors
  })

  private resolveErrors(): string[] | null {
    const explicitErrors = this.errorsSignal()
    const autoErrors = this.extractErrorsFromControl()
    return explicitErrors ?? autoErrors ?? null
  }

  private shouldShowErrors(): boolean {
    if (this.error) return true
    return this.isControlInvalid()
  }

  private isControlInvalid = computed<boolean>(() => {
    this.controlStatusChanged()

    const isTouched = this.resolveTouched()
    const isInvalid = this.resolveInvalid()
    return isTouched && isInvalid
  })

  private resolveTouched(): boolean {
    return this.ngControl?.control?.touched ?? this.isTouched()
  }

  private resolveInvalid(): boolean {
    return this.ngControl?.control?.invalid ?? this.isInvalid()
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('errors' in changes) {
      this.errorsSignal.set(this.errors)
    }
    if ('required' in changes && changes.required.currentValue !== undefined) {
      this.requiredExplicitlySet.set(true)
    }
  }

  ngOnInit() {
    this.setFormControlValidators()
    this.errorsSignal.set(this.errors)

    // Подписка на изменения статуса внешнего FormControl
    if (this.ngControl?.control) {
      this.ngControl.control.statusChanges.subscribe(() => {
        this.controlStatusChanged.update((v) => v + 1)
      })
    }
  }

  private setFormControlValidators() {
    // Если используется внешний formControl, не нужно настраивать валидаторы
    if (this.ngControl?.control) {
      return
    }

    // Настраиваем валидаторы для внутреннего formControl (для ngModel)
    const control = this.formControl()
    const validators: ValidatorFn[] = []

    if (this.computedRequired()) {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      validators.push(Validators.required)
    }

    control.setValidators(validators.length > 0 ? validators : null)
    control.updateValueAndValidity()
    this.isInvalid.set(control.invalid)
  }

  handleFocusEvent(event: Event) {
    preventAndStopEvent(event)
    this.focus.emit(event as FocusEvent)
  }

  handleBlurEvent(event: Event) {
    preventAndStopEvent(event)
    this.blur.emit(event as BlurEvent)

    this.onTouched()

    const control = this.ngControl?.control || this.formControl()
    control.markAsTouched()
    this.isTouched.set(true)
    this.isInvalid.set(control.invalid)

    this.controlStatusChanged.update((v) => v + 1)
  }

  handleClearEvent(event: Event) {
    preventAndStopEvent(event)
    this.clear.emit(event as ClearEvent)
  }

  handleKeydownEvent(event: Event) {
    this.keydown.emit(event as KeydownEvent)
  }

  handleClickEvent(event: Event) {
    preventAndStopEvent(event)
    this.click.emit(event)
  }

  handleClickOutsideEvent(event: Event) {
    this.clickOutside.emit(event as ClickOutsideEvent)
  }

  handleMouseEnterEvent(event: Event) {
    this.mouseEnter.emit(event as MouseEnterEvent)
  }

  handleMouseLeaveEvent(event: Event) {
    this.mouseLeave.emit(event as MouseLeaveEvent)
  }

  handleRenderEvent(event: Event) {
    this.renderTextarea.emit(event as RenderEvent)
  }

  writeValue(value: TYNgTextareaModel) {
    this.textareaValue.set(value)
    this.formControl().setValue(value, { emitEvent: false })
  }

  handleInputEvent(event: Event): void {
    preventAndStopEvent(event)
    const { value } = (event as InputEvent).detail

    this.textareaValue.set(value)
    this.formControl().setValue(value, { emitEvent: false })
    this.onChange(value)
    this.onTouched()

    const control = this.ngControl?.control || this.formControl()
    this.isInvalid.set(control.invalid)
  }
}
