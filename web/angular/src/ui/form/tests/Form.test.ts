import { describe, expect, it, vi } from 'vitest'
import { Component, ViewChild } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { AltCoreFormTagName as tagName } from '~shared/constants'
import { AltForm } from '~ng/ui/form'
import { AltTextField } from '~ng/ui/textField'
import { AltButton } from '~ng/ui/button'
import type { AltCoreForm } from '~core/ui/form'
import type { IAltCoreFormInvalidDetail, IAltCoreFormSubmitDetail } from '~core/ui/form/models/types'
import type { AltCoreTextField } from '~core/ui/textField'

interface ICreateFixtureArgs {
  noErrorFocus?: boolean
  onSubmit?: (detail: IAltCoreFormSubmitDetail) => void
  onInvalid?: (detail: IAltCoreFormInvalidDetail) => void
  onReset?: () => void
}

const createFixture = async({ noErrorFocus, onSubmit, onInvalid, onReset }: ICreateFixtureArgs = {}) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltForm, AltTextField, AltButton] }).compileComponents()

  @Component({
    template: `
      <AltForm
        [noErrorFocus]="noErrorFocus"
        (formSubmit)="handleSubmit($event)"
        (validationError)="handleInvalid($event)"
        (formReset)="handleReset()"
      >
        <AltTextField name="name" labelText="Name" [required]="true"></AltTextField>
        
        <AltButton type="submit" label="Send"></AltButton>
      </AltForm>
    `,
    imports: [AltForm, AltTextField, AltButton],
    standalone: true,
  })
  class TestComponent {
    @ViewChild(AltForm) altForm!: AltForm
    noErrorFocus = noErrorFocus
    handleSubmit = (detail: IAltCoreFormSubmitDetail) => onSubmit?.(detail)
    handleInvalid = (detail: IAltCoreFormInvalidDetail) => onInvalid?.(detail)
    handleReset = () => onReset?.()
  }

  const fixture = TestBed.createComponent(TestComponent)
  document.body.append(fixture.nativeElement as HTMLElement)
  fixture.detectChanges()
  await fixture.whenStable()

  const element = fixture.nativeElement as HTMLElement
  const coreForm = element.querySelector<AltCoreForm>(tagName)!
  const field = element.querySelector<AltCoreTextField>('alt-core-text-field')!
  await coreForm.updateComplete
  await field.updateComplete

  return { fixture, coreForm, field }
}

const getErrorText = (field: AltCoreTextField) => field.shadowRoot?.querySelector('alt-core-error')?.shadowRoot?.textContent.trim() ?? ''

describe(
  'Angular/AltForm',
  () => {
    it(
      'Input "noErrorFocus" should be set on the core component',
      async() => {
        const { fixture, coreForm } = await createFixture({ noErrorFocus: true })

        expect(coreForm.noErrorFocus).toBe(true)
        fixture.destroy()
      },
    )

    it(
      'Should project the fields into a native form that the core component wraps',
      async() => {
        const { fixture, coreForm, field } = await createFixture()

        expect(coreForm.form?.contains(field)).toBe(true)
        expect(coreForm.form?.noValidate).toBe(true)
        fixture.destroy()
      },
    )

    it(
      'Should emit "validationError" and show the message when "submit()" finds invalid fields',
      async() => {
        const onInvalid = vi.fn()
        const onSubmit = vi.fn()
        const { fixture, field } = await createFixture({ onInvalid, onSubmit })

        fixture.componentInstance.altForm.submit()

        await vi.waitFor(() => { expect(onInvalid).toHaveBeenCalledTimes(1) })
        expect((onInvalid.mock.lastCall?.[0] as IAltCoreFormInvalidDetail).controls).toEqual([field])
        expect(onSubmit).not.toHaveBeenCalled()
        await vi.waitFor(() => { expect(getErrorText(field)).toContain('Fill in this field') })
        fixture.destroy()
      },
    )

    it(
      'Should emit "formSubmit" with the form data from a submit button',
      async() => {
        const onSubmit = vi.fn()
        const { fixture, field } = await createFixture({ onSubmit })
        // The Angular field takes its value from forms directives; set it on the core field here
        field.value = 'Anna'
        await field.updateComplete

        const button = (fixture.nativeElement as HTMLElement).querySelector('alt-core-button')!
        button.shadowRoot!.querySelector('alt-core-simple-button')!.shadowRoot!.querySelector('button')!.click()

        await vi.waitFor(() => { expect(onSubmit).toHaveBeenCalledTimes(1) })
        expect((onSubmit.mock.lastCall?.[0] as IAltCoreFormSubmitDetail).formData.get('name')).toBe('Anna')
        fixture.destroy()
      },
    )

    it(
      'Should validate, reset the validation and reset the form',
      async() => {
        const onReset = vi.fn()
        const { fixture, field } = await createFixture({ onReset })
        const { altForm } = fixture.componentInstance

        expect(await altForm.validate()).toBe(false)
        await vi.waitFor(() => { expect(getErrorText(field)).toContain('Fill in this field') })

        altForm.resetValidation()
        await vi.waitFor(() => { expect(getErrorText(field)).toBe('') })

        altForm.reset()
        await vi.waitFor(() => { expect(onReset).toHaveBeenCalledTimes(1) })
        fixture.destroy()
      },
    )
  },
)
