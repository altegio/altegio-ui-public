import type { ControlValueAccessor } from '@angular/forms'

export abstract class ControlValueAccessorBase<T> implements ControlValueAccessor {
  protected onChange: (value: T) => void = () => {
    // Intentionally empty until Angular forms calls registerOnChange(). Do not add logic here.
  }
  protected onTouched: () => void = () => {
    // Intentionally empty until Angular forms calls registerOnTouched(). Do not add logic here.
  }

  abstract writeValue(value: T): void

  registerOnChange(fn: (value: T) => void) {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn
  }
}
