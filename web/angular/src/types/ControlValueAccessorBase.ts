import type { ControlValueAccessor } from '@angular/forms'

export abstract class ControlValueAccessorBase<T> implements ControlValueAccessor {
  protected onChange: (value: T) => void = () => {
    // Заглушка. Не добавлять логику - это нарушит работу компонента
  }
  protected onTouched: () => void = () => {
    // Заглушка. Не добавлять логику - это нарушит работу компонента
  }

  abstract writeValue(value: T): void

  registerOnChange(fn: (value: T) => void) {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn
  }
}
