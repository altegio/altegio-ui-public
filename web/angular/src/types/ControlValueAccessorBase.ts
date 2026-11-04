import type { ControlValueAccessor } from '@angular/forms'
import { ControlContainer, NgControl } from '@angular/forms'
import type { AfterViewInit } from '@angular/core'
import { ChangeDetectorRef, DestroyRef, Directive, ElementRef, HostListener, Injector, inject, signal } from '@angular/core'
import { registerControlReset } from '~ng/utils/control-events'

@Directive()
export abstract class ControlValueAccessorBase<T> implements ControlValueAccessor, AfterViewInit {
  abstract disabled: boolean | undefined
  protected readonly controlDisabled = signal(false)
  protected readonly changeDetector = inject(ChangeDetectorRef)
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef)
  private readonly injector = inject(Injector)
  private readonly container = inject(ControlContainer, { optional: true, skipSelf: true })
  private readonly accessorDestroyRef = inject(DestroyRef)

  ngAfterViewInit() {
    // Defer NgControl lookup until value-accessor construction is complete to avoid a DI cycle.
    const ngControl = this.injector.get(NgControl, null, { self: true })
    const root = this.container?.control?.root
    if (!ngControl || !root) return

    const core = Array.from(this.element.nativeElement.children).find((child) => 'formResetCallback' in child)
    if (!(core instanceof HTMLElement)) return

    registerControlReset(core, () => this.container?.control?.root, () => {
      const control = ngControl.control
      if (!control) return false

      this.writeValue(control.value as T)
      return true
    }, this.accessorDestroyRef)
  }

  protected onChange: (value: T) => void = () => {
    // Intentionally empty until Angular forms calls registerOnChange(). Do not add logic here.
  }
  protected onTouched: () => void = () => {
    // Intentionally empty until Angular forms calls registerOnTouched(). Do not add logic here.
  }

  abstract writeValue(value: T): void

  setDisabledState(isDisabled: boolean) {
    this.controlDisabled.set(isDisabled)
    this.changeDetector.markForCheck()
  }

  @HostListener('focusout', ['$event'])
  protected handleControlFocusOut(event: FocusEvent) {
    if (event.relatedTarget instanceof Node && this.element.nativeElement.contains(event.relatedTarget)) return

    this.onTouched()
  }

  registerOnChange(fn: (value: T) => void) {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn
  }
}
