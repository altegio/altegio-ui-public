import type { OnInit, OnChanges, SimpleChanges, TemplateRef } from '@angular/core'
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, ContentChild, signal, computed, Optional, Self, Inject, ChangeDetectionStrategy } from '@angular/core'
import type { ValidatorFn } from '@angular/forms'
import { UntypedFormControl, Validators, NgControl } from '@angular/forms'
import { FormsModule } from '@angular/forms'
import { NgTemplateOutlet } from '@angular/common'

import '~core/ui/textField'
import type { TYNgTextFieldModel } from './models/types'
import {
  type IYNgTextFieldProps,
  type InputEvent,
  type FocusEvent,
  type ClearEvent,
  type BlurEvent,
  createNgTextFieldProps,
} from './models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import { preventAndStopEvent } from '~shared/utils'
import { ControlValueAccessorBase } from '~ng/types/ControlValueAccessorBase'
import { defineCustomElement } from '~web/shared/utils/components'
import { YCoreTextFieldTagName } from '~web/shared/constants'
import { YCoreTextField } from '~core/ui/textField'

const { name, placeholder, autofocus, type, disabled, readonly, maxlength, errors, error, clearable, maskOptions, size, required, labelText, labelTooltipText, annotationText, labelDebounce, locator, locatorLabel, locatorError } = createNgTextFieldProps()

defineCustomElement(YCoreTextFieldTagName, YCoreTextField)

@Component({
  selector: 'YTextField',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, NgTemplateOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <y-core-text-field
      (input)="handleInputEvent($event)"
      (focus)="handleFocusEvent($event)"
      (blur)="handleBlurEvent($event)"
      (clear)="handleClearEvent($event)"
      [value]="textFieldValue()"
      [name]="name"
      [placeholder]="placeholder"
      [autofocus]="autofocus"
      [type]="type"
      [disabled]="disabled"
      [readonly]="readonly"
      [maxlength]="maxlength"
      [errors]="computedErrors()"
      [error]="hasFormErrors()"
      [clearable]="clearable"
      [maskOptions]="maskOptions"
      [size]="size"
      [required]="computedRequired()"
      [labelText]="labelText"
      [labelTooltipText]="labelTooltipText"
      [labelDebounce]="labelDebounce"
      [annotationText]="annotationText"
      [locator]="locator"
      [locatorLabel]="locatorLabel"
      [locatorError]="locatorError"
    >
      @if (textFieldBeforeRef) {
        <div slot="before">
          <ng-container *ngTemplateOutlet="textFieldBeforeRef" />
        </div>
      }

      @if (textFieldAnnotationRef) {
        <div slot="annotation">
          <ng-container *ngTemplateOutlet="textFieldAnnotationRef" />
        </div>
      }

      @if (textFieldAfterRef) {
        <div slot="after">
          <ng-container *ngTemplateOutlet="textFieldAfterRef" />
        </div>
      }
    </y-core-text-field>
  `,
})

/**
 * Angular-обертка TextField
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
 * Позволяет явно переопределить `required` и ошибки через инпуты
 * Явное определение имеет приоритет над автоматическим
 *
 * @example
 * // С formControl
 * <YTextField [formControl]="nameControl" />
 *
 * @example
 * // С ngModel
 * <YTextField [(ngModel)]="name" [required]="true" [errors]="['Обязательное поле']" />
 */
export class YTextField extends ControlValueAccessorBase<TYNgTextFieldModel> implements IYNgTextFieldProps, OnInit, OnChanges {
  @Input() @DefaultValue(name) name: IYNgTextFieldProps['name'] = name
  @Input() @DefaultValue(placeholder) placeholder: IYNgTextFieldProps['placeholder'] = placeholder
  @Input() @DefaultValue(autofocus) autofocus: IYNgTextFieldProps['autofocus'] = autofocus
  @Input() @DefaultValue(type) type: IYNgTextFieldProps['type'] = type
  @Input() @DefaultValue(disabled) disabled: IYNgTextFieldProps['disabled'] = disabled
  @Input() @DefaultValue(readonly) readonly: IYNgTextFieldProps['readonly'] = readonly
  @Input() @DefaultValue(required) required: IYNgTextFieldProps['required'] = required
  @Input() @DefaultValue(maxlength) maxlength: IYNgTextFieldProps['maxlength'] = maxlength
  @Input() @DefaultValue(errors) errors: IYNgTextFieldProps['errors'] = errors
  @Input() @DefaultValue(error) error: IYNgTextFieldProps['error'] = error
  @Input() @DefaultValue(clearable) clearable: IYNgTextFieldProps['clearable'] = clearable
  @Input() @DefaultValue(maskOptions) maskOptions: IYNgTextFieldProps['maskOptions'] = maskOptions
  @Input() @DefaultValue(size) size: IYNgTextFieldProps['size'] = size
  @Input() @DefaultValue(labelText) labelText: IYNgTextFieldProps['labelText'] = labelText
  @Input() @DefaultValue(labelTooltipText) labelTooltipText: IYNgTextFieldProps['labelTooltipText'] = labelTooltipText
  @Input() @DefaultValue(labelDebounce) labelDebounce: IYNgTextFieldProps['labelDebounce'] = labelDebounce
  @Input() @DefaultValue(annotationText) annotationText: IYNgTextFieldProps['annotationText'] = annotationText
  @Input() @DefaultValue(locator) locator: IYNgTextFieldProps['locator'] = locator
  @Input() @DefaultValue(locatorLabel) locatorLabel: IYNgTextFieldProps['locatorLabel'] = locatorLabel
  @Input() @DefaultValue(locatorError) locatorError: IYNgTextFieldProps['locatorError'] = locatorError

  @Output() focus = new EventEmitter<FocusEvent>()
  @Output() blur = new EventEmitter<BlurEvent>()
  @Output() clear = new EventEmitter<ClearEvent>()

  @ContentChild('textFieldBefore') textFieldBeforeRef: TemplateRef<unknown> | undefined
  @ContentChild('textFieldAnnotation') textFieldAnnotationRef: TemplateRef<unknown> | undefined
  @ContentChild('textFieldAfter') textFieldAfterRef: TemplateRef<unknown> | undefined

  textFieldValue = signal<TYNgTextFieldModel>('')

  private formControl = signal<UntypedFormControl>(new UntypedFormControl(''))
  private isTouched = signal(false)
  private isInvalid = signal(false)
  private errorsSignal = signal<IYNgTextFieldProps['errors']>(undefined)
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
 * Явно переданное свойство `[required]`
 * Наличие `Validators.required` или кастомного валидатора с ключом `'required'` в `FormControl`
 * По умолчанию — `false`
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
    return !!this.computedErrors() || !!this.error
  })

  /**
   * Вычисляет массив ошибок для отображения с учетом статуса валидации.
   *
   * Ошибки отображаются только если:
   * - Поле touched и invalid
   * - ИЛИ явно передан инпут [error]="true" для принудительного отображения
   *
   */
  computedErrors = computed<string[] | null>(() => {
    const errors = this.resolveErrors()
    const shouldShowErrors = this.shouldShowErrors()

    if (!shouldShowErrors || !errors?.length) return null

    return errors
  })

  private resolveErrors(): string[] | undefined {
    const explicitErrors = this.errorsSignal()
    const autoErrors = this.extractErrorsFromControl()
    return explicitErrors ?? autoErrors
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

  writeValue(value: TYNgTextFieldModel) {
    this.textFieldValue.set(value)
    this.formControl().setValue(value, { emitEvent: false })
  }

  handleInputEvent(event: Event): void {
    preventAndStopEvent(event)
    const { value } = (event as InputEvent).detail

    this.textFieldValue.set(value)
    this.formControl().setValue(value, { emitEvent: false })
    this.onChange(value)
    this.onTouched()

    const control = this.ngControl?.control || this.formControl()
    this.isInvalid.set(control.invalid)
  }
}
