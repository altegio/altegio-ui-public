import { describe, expect, it, vi } from 'vitest'
import { Component, ViewChild } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { AltCoreStepperTagName, AltCoreStepTagName } from '~shared/constants'
import { AltStepper } from '~ng/ui/stepper'
import { AltStep } from '~ng/ui/step'

const createFixture = async(onValueChange: (value: string | number) => void = () => undefined) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltStepper, AltStep] }).compileComponents()

  @Component({
    template: `
      <AltStepper [value]="value" orientation="vertical" [headerNav]="true" accessibleName="Import" (valueChange)="handleValueChange($event)">
        <AltStep name="a" title="A" caption="First" [done]="true">A content</AltStep>
        
        <AltStep name="b" title="B" [error]="true" [disabled]="true">B content</AltStep>
        
        <AltStep name="c" title="C">C content</AltStep>
      </AltStepper>
    `,
    imports: [AltStepper, AltStep],
    standalone: true,
  })
  class TestComponent {
    @ViewChild(AltStepper) stepper!: AltStepper
    value = 'a'

    handleValueChange(value: string | number) {
      onValueChange(value)
    }
  }

  const fixture = TestBed.createComponent(TestComponent)
  fixture.detectChanges()
  await fixture.whenStable()

  return fixture
}

describe(
  'Angular/AltStepper',
  () => {
    it(
      'Should pass inputs to the core stepper and steps',
      async() => {
        const fixture = await createFixture()
        const element = fixture.nativeElement as HTMLElement
        const stepper = element.querySelector(AltCoreStepperTagName)!
        const steps = Array.from(element.querySelectorAll(AltCoreStepTagName))

        expect([stepper.value, stepper.orientation, stepper.headerNav, stepper.accessibleName]).toEqual(['a', 'vertical', true, 'Import'])
        expect(steps.map((step) => [step.name, step.title, step.caption, step.done, step.error, step.disabled])).toEqual([
          ['a', 'A', 'First', true, false, false],
          ['b', 'B', undefined, false, true, true],
          ['c', 'C', undefined, false, false, false],
        ])
      },
    )

    it(
      'Should emit "valueChange" from the core "change" event and from next()',
      async() => {
        const onValueChange = vi.fn()
        const fixture = await createFixture(onValueChange)
        const stepper = (fixture.nativeElement as HTMLElement).querySelector(AltCoreStepperTagName)!
        await stepper.updateComplete

        fixture.componentInstance.stepper.next()

        expect(onValueChange).toHaveBeenCalledWith('c')
        expect(stepper.value).toBe('c')
      },
    )
  },
)
