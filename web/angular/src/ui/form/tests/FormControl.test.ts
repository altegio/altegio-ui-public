import { afterEach, describe, expect, it, vi } from 'vitest'
import { TestBed } from '~ng/tests/setup'
import type { Type } from '@angular/core'
import { Component, Input } from '@angular/core'
import { By } from '@angular/platform-browser'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { userEvent } from 'vitest/browser'
import type { AltCoreTextField } from '~core/ui/textField'
import { waitForLitTree } from '~shared/tests/a11y'
import { AltTextField } from '~ng/ui/textField/TextField.component'
import { AltTextarea } from '~ng/ui/textarea/Textarea.component'
import { AltSearchField } from '~ng/ui/searchField/SearchField.component'
import { AltCountField } from '~ng/ui/countField/CountField.component'
import { AltCheckbox } from '~ng/ui/checkbox/Checkbox.component'
import { AltToggle } from '~ng/ui/toggle/Toggle.component'
import { AltRadioButton } from '~ng/ui/radioButton/RadioButton.component'
import { AltSimpleRadioButton } from '~ng/ui/simpleRadioButton/SimpleRadioButton.component'
import { AltSelectField } from '~ng/ui/selectField/SelectField.component'
import { AltMultipleSelectField } from '~ng/ui/multipleSelectField/MultipleSelectField.component'
import { AltAutocompleteField } from '~ng/ui/autocompleteField/AutocompleteField.component'
import { AltPhoneField } from '~ng/ui/phoneField/PhoneField.component'
import { AltDatePicker } from '~ng/ui/datePicker/DatePicker.component'
import { AltDateRange } from '~ng/ui/dateRange/DateRange.component'
import { AltRating } from '~ng/ui/rating/Rating.component'
import { AltForm } from '~ng/ui/form/Form.component'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const nativeAttachInternals = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'attachInternals')!

interface IFieldCase {
  component: Type<unknown>
  selector: string
  tag: string
  property: string
  initial: unknown
  changed: unknown
  reset: unknown
  event: string
  detail: object
}

const cases: IFieldCase[] = [
  { component: AltTextField, selector: 'AltTextField', tag: 'text-field', property: 'value', initial: 'one', changed: 'two', reset: '', event: 'input', detail: { value: 'two' } },
  { component: AltTextarea, selector: 'AltTextarea', tag: 'textarea', property: 'value', initial: 'one', changed: 'two', reset: '', event: 'input', detail: { value: 'two' } },
  { component: AltSearchField, selector: 'AltSearchField', tag: 'text-field', property: 'value', initial: 'one', changed: 'two', reset: '', event: 'input', detail: { value: 'two' } },
  { component: AltCountField, selector: 'AltCountField', tag: 'count-field', property: 'value', initial: 1, changed: 2, reset: '0', event: 'changed-value', detail: { value: '2' } },
  { component: AltCheckbox, selector: 'AltCheckbox', tag: 'checkbox', property: 'checked', initial: false, changed: true, reset: false, event: 'checked', detail: { checked: true } },
  { component: AltToggle, selector: 'AltToggle', tag: 'toggle', property: 'checked', initial: false, changed: true, reset: false, event: 'checked', detail: { checked: true } },
  { component: AltRadioButton, selector: 'AltRadioButton', tag: 'radio-button', property: 'checked', initial: false, changed: true, reset: false, event: 'checked', detail: { checked: true } },
  { component: AltSimpleRadioButton, selector: 'AltSimpleRadioButton', tag: 'simple-radio-button', property: 'checked', initial: false, changed: true, reset: false, event: 'checked', detail: { checked: true } },
  { component: AltSelectField, selector: 'AltSelectField', tag: 'select-field', property: 'value', initial: 1, changed: 2, reset: undefined, event: 'select', detail: { value: 2 } },
  { component: AltMultipleSelectField, selector: 'AltMultipleSelectField', tag: 'multiple-select-field', property: 'value', initial: [1], changed: [2], reset: undefined, event: 'select', detail: { value: [2] } },
  { component: AltAutocompleteField, selector: 'AltAutocompleteField', tag: 'autocomplete-field', property: 'value', initial: 'one', changed: 'two', reset: '', event: 'change', detail: { value: 'two' } },
  { component: AltPhoneField, selector: 'AltPhoneField', tag: 'phone-field', property: 'value', initial: '5511999999999', changed: '5511988888888', reset: '', event: 'change', detail: { phone: '5511988888888', meta: { country: null, phoneBody: '11988888888' } } },
  { component: AltDatePicker, selector: 'AltDatePicker', tag: 'date-picker', property: 'date', initial: '01.03.2026', changed: '02.03.2026', reset: undefined, event: 'pick', detail: { value: '02.03.2026' } },
  { component: AltDateRange, selector: 'AltDateRange', tag: 'date-range', property: 'from', initial: { from: '2026-03-01', to: '2026-03-02' }, changed: { from: '2026-04-01', to: '2026-04-02' }, reset: undefined, event: 'change', detail: { from: '2026-04-01', to: '2026-04-02' } },
  { component: AltRating, selector: 'AltRating', tag: 'rating', property: 'value', initial: 1, changed: 2, reset: 0, event: 'change', detail: { value: 2 } },
]

const mount = async(field: IFieldCase, control = new FormControl<unknown>(field.initial)) => {
  @Component({
    standalone: true,
    imports: [field.component, ReactiveFormsModule],
    template: `<${field.selector} [formControl]="control" />`,
  })
  class Host {
    @Input() @DefaultValue(control) control = control
  }
  await TestBed.configureTestingModule({ imports: [Host] }).compileComponents()
  const fixture = TestBed.createComponent(Host)
  const root = fixture.nativeElement as HTMLElement
  const settle = async() => {
    fixture.detectChanges()
    await fixture.whenStable()
    await waitForLitTree(root)
  }
  await settle()
  const core = root.querySelector<HTMLElement & Record<string, unknown>>(`alt-core-${field.tag}`)!

  return { fixture, control, core, settle }
}

const expectedValue = (field: IFieldCase, value: unknown) => {
  if (field.component === AltCountField) return String(value)
  if (field.component === AltDateRange) return (value as { from: string }).from

  return value
}

afterEach(() => {
  TestBed.resetTestingModule()
  document.body.replaceChildren()
  Object.defineProperty(HTMLElement.prototype, 'attachInternals', nativeAttachInternals)
})

describe('Angular/form control contract', () => {
  for (const field of cases) {
    describe(field.selector, () => {
      it('writes values without feedback, disables, reenables and resets', async() => {
        const { core, control, settle } = await mount(field)
        expect(core[field.property]).toEqual(expectedValue(field, field.initial))
        const changes = vi.fn()
        control.valueChanges.subscribe(changes)
        control.setValue(field.changed)
        await settle()
        expect(core[field.property]).toEqual(expectedValue(field, field.changed))
        expect(changes).toHaveBeenCalledTimes(1)

        control.disable()
        await settle()
        expect(core.disabled).toBe(true)
        control.enable()
        await settle()
        expect(core.disabled).toBe(false)
        control.markAsTouched()
        control.markAsDirty()
        control.reset()
        await settle()
        expect(core[field.property]).toEqual(field.reset)
        expect(control.touched).toBe(false)
        expect(control.pristine).toBe(true)
      })

      it('updates the form once for user changes and marks touched only on leaving the field', async() => {
        const { core, control, settle } = await mount(field)
        const changes = vi.fn()
        control.valueChanges.subscribe(changes)
        core.dispatchEvent(new CustomEvent(field.event, { bubbles: true, composed: true, detail: field.detail }))
        await settle()
        expect(control.value).toEqual(field.changed)
        expect(changes).toHaveBeenCalledTimes(1)
        expect(control.touched).toBe(false)
        core.dispatchEvent(new FocusEvent('focusout', { bubbles: true, composed: true }))
        await settle()
        expect(control.touched).toBe(true)
      })
    })
  }

  it('supports updateOn blur with real text input', async() => {
    const field = cases[0]
    const { core, control, settle } = await mount(field, new FormControl<unknown>('', { updateOn: 'blur' }))
    const input = (core as unknown as AltCoreTextField).fieldInput!.inputElement!
    await userEvent.type(input, 'Jane')
    await settle()
    expect(control.value).toBe('')
    expect(control.touched).toBe(false)
    input.blur()
    await settle()
    expect(control.value).toBe('Jane')
    expect(control.touched).toBe(true)
  })

  it('keeps an explicit disabled input when Angular initially enables its control', async() => {
    @Component({
      standalone: true,
      imports: [AltTextField, ReactiveFormsModule],
      template: '<AltTextField [formControl]="control" [disabled]="disabled" />',
    })
    class Host {
      @Input() @DefaultValue(true) disabled = true
      control = new FormControl('value')
    }
    await TestBed.configureTestingModule({ imports: [Host] }).compileComponents()
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await fixture.whenStable()
    const core = (fixture.nativeElement as HTMLElement).querySelector('alt-core-text-field')!
    expect(core.disabled).toBe(true)
    fixture.componentRef.setInput('disabled', false)
    fixture.detectChanges()
    await fixture.whenStable()
    expect(core.disabled).toBe(false)
    fixture.componentInstance.control.disable()
    fixture.detectChanges()
    await fixture.whenStable()
    expect(core.disabled).toBe(true)
    fixture.componentInstance.control.enable()
    fixture.detectChanges()
    await fixture.whenStable()
    expect(core.disabled).toBe(false)
  })

  it.each(cases.flatMap((field) => ['native', 'legacy'].map((mode) => ({ field, mode }))))('preserves Angular reset semantics in $mode for $field.selector', async({ field, mode }) => {
    if (mode === 'legacy') Object.defineProperty(HTMLElement.prototype, 'attachInternals', { configurable: true, value: undefined })
    @Component({
      standalone: true,
      imports: [field.component, ReactiveFormsModule],
      template: `<form [formGroup]="group"><${field.selector} formControlName="name" /></form>`,
    })
    class Host {
      group = new FormGroup({ name: new FormControl<unknown>(field.initial) })
    }
    await TestBed.configureTestingModule({ imports: [Host] }).compileComponents()
    const fixture = TestBed.createComponent(Host)
    const root = fixture.nativeElement as HTMLElement
    fixture.detectChanges()
    await fixture.whenStable()
    await waitForLitTree(root)
    const control = fixture.componentInstance.group.controls.name
    control.setValue(field.changed)
    fixture.detectChanges()
    await waitForLitTree(root)
    root.querySelector('form')!.reset()
    fixture.detectChanges()
    await fixture.whenStable()
    await waitForLitTree(root)
    expect(control.value).toBeNull()
    const core = root.querySelector<HTMLElement & Record<string, unknown>>(`alt-core-${field.tag}`)!
    expect(core[field.property]).toEqual(field.reset)
    expect(control.pristine).toBe(true)
    expect(control.touched).toBe(false)
  })

  it.each([cases[0], cases[1]])('tracks external touched state, validators and reset in $selector', async(field) => {
    const control = new FormControl<unknown>('', () => ({ server: { message: 'Choose another value' } }))
    const { core, settle } = await mount(field, control)
    expect(core.errors).toBeNull()
    control.markAsTouched()
    await settle()
    expect(core.errors).toEqual(['Choose another value'])
    control.setValidators(Validators.required)
    control.updateValueAndValidity()
    await settle()
    expect(core.required).toBe(true)
    control.clearValidators()
    control.updateValueAndValidity()
    await settle()
    expect(core.required).toBe(false)
    control.reset()
    await settle()
    expect(core.errors).toBeNull()
  })

  it.each(['native', 'legacy'])('retains native default restoration when AltForm wraps an Angular control container in %s', async(mode) => {
    if (mode === 'legacy') Object.defineProperty(HTMLElement.prototype, 'attachInternals', { configurable: true, value: undefined })
    @Component({
      standalone: true,
      imports: [AltForm, AltTextField, ReactiveFormsModule],
      template: '<AltForm [formGroup]="group"><AltTextField formControlName="name" /></AltForm>',
    })
    class Host {
      group = new FormGroup({ name: new FormControl('initial') })
    }
    await TestBed.configureTestingModule({ imports: [Host] }).compileComponents()
    const fixture = TestBed.createComponent(Host)
    const root = fixture.nativeElement as HTMLElement
    fixture.detectChanges()
    await fixture.whenStable()
    await waitForLitTree(root)
    fixture.componentInstance.group.controls.name.setValue('edited')
    fixture.detectChanges()
    await waitForLitTree(root)
    root.querySelector('form')!.reset()
    fixture.detectChanges()
    await fixture.whenStable()
    await waitForLitTree(root)
    expect(root.querySelector('alt-core-text-field')!.value).toBe('initial')
    expect(fixture.componentInstance.group.controls.name.value).toBe('initial')
  })

  it.each([cases[0], cases[1]])('unsubscribes from external control events when $selector is destroyed', async(field) => {
    const control = new FormControl<unknown>('')
    const subscribe = vi.spyOn(control.events, 'subscribe')
    const { fixture } = await mount(field, control)
    expect(fixture.debugElement.query(By.directive(field.component))).not.toBeNull()
    const subscriptions = subscribe.mock.results.flatMap((result) => result.type === 'return' ? [result.value] : [])
    expect(subscriptions.length).toBeGreaterThan(0)
    expect(subscriptions.some((subscription) => !subscription.closed)).toBe(true)
    fixture.destroy()
    expect(subscriptions.every((subscription) => subscription.closed)).toBe(true)
  })

  it.each([cases[0], cases[1]])('moves validation observation to a replacement FormControl in $selector', async(field) => {
    const { core, control, fixture, settle } = await mount(field)
    const replacement = new FormControl<unknown>('', Validators.required)
    fixture.componentRef.setInput('control', replacement)
    await settle()
    expect(core.required).toBe(true)
    replacement.setErrors({ server: { message: 'Replacement error' } })
    replacement.markAsTouched()
    await settle()
    expect(core.errors).toEqual(['Replacement error'])
    control.setErrors({ stale: { message: 'Old error' } })
    await settle()
    expect(core.errors).toEqual(['Replacement error'])
  })
})
