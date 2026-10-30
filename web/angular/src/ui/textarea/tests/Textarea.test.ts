import { describe, expect, it, vi } from 'vitest'
import { Component, ChangeDetectionStrategy } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { AltCoreTextareaTagName } from '~shared/constants'
import type { TPropTestCase, TSlotTestCase } from '~shared/types/tests'
import { text } from '~shared/tests/slotContents'
import { AltTextarea } from '~ng/ui/textarea'
import { type IAltNgTextareaProps } from '~ng/ui/textarea/models/types'

const tagName = AltCoreTextareaTagName

interface ICreateComponentArgs {
  slots?: {
    before?: string
    after?: string
  }
  props?: Partial<IAltNgTextareaProps>
}

const createComponent = async({ slots, props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltTextarea] }).compileComponents()

  @Component({
    template: `
      <AltTextarea
        (ngModelChange)="handleModelChange($event)"
        (focus)="handleFocus($event)"
        (blur)="handleBlur($event)"
        (clear)="handleClear($event)"
        [ngModel]="value"
        [name]="name"
        [placeholder]="placeholder"
        [required]="required"
        [maxlength]="maxlength"
        [autofocus]="autofocus"
        [labelText]="labelText"
        [labelTooltipText]="labelTooltipText"
        [labelDebounce]="labelDebounce"
        [errors]="errors"
        [clearable]="clearable"
        [rows]="rows"
        [resize]="resize"
        [disabled]="disabled"
        [size]="size"
        [readonly]="readonly"
        [error]="error"
      >
        @if (showBefore) {
          <ng-template #textareaBefore>{{ beforeContent }}</ng-template>
        }
        @if (showAfter) {
          <ng-template #textareaAfter>{{ afterContent }}</ng-template>
        }
      </AltTextarea>
    `,
    imports: [AltTextarea],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  class TestComponent {
    value = ''
    name = props?.name
    placeholder = props?.placeholder
    required = props?.required
    maxlength = props?.maxlength
    autofocus = props?.autofocus
    labelText = props?.labelText
    labelTooltipText = props?.labelTooltipText
    labelDebounce = props?.labelDebounce
    errors = props?.errors
    clearable = props?.clearable
    rows = props?.rows
    resize = props?.resize
    disabled = props?.disabled
    size = props?.size
    readonly = props?.readonly
    error = props?.error
    showBefore = !!slots?.before
    beforeContent = slots?.before || ''
    showAfter = !!slots?.after
    afterContent = slots?.after || ''

    handleModelChange = vi.fn()
    handleFocus = vi.fn()
    handleBlur = vi.fn()
    handleClear = vi.fn()
  }

  return TestComponent
}

// Unit test cases:
const slotBeforeTestCases: TSlotTestCase[] = [{ slot: 'before', case: 'with content', content: text }]

const slotAfterTestCases: TSlotTestCase[] = [{ slot: 'after', case: 'with content', content: text }]

const propLabelTextTestCases: TPropTestCase<IAltNgTextareaProps, 'labelText'>[] = [{ prop: 'labelText', case: 'with label text', value: 'Test label', expected: 'Test label' }]

const propDisabledTestCases: TPropTestCase<IAltNgTextareaProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'enabled', value: true, expected: true },
  { prop: 'disabled', case: 'disabled', value: false, expected: false },
]

const propErrorTestCases: TPropTestCase<IAltNgTextareaProps, 'error'>[] = [
  { prop: 'error', case: 'enabled', value: true, expected: true },
  { prop: 'error', case: 'disabled', value: false, expected: false },
]

describe(
  'Angular/AltTextarea',
  () => {
    describe(
      'Unit',
      () => {
        describe(
          'Slots',
          () => {
            for (const testCase of [...slotBeforeTestCases, ...slotAfterTestCases]) {
              it(
                `Slot "${testCase.slot}" should render ${testCase.case}`,
                async() => {
                  const component = await createComponent({
                    slots: { [testCase.slot]: testCase.content },
                    props: {},
                  })
                  const fixture = TestBed.createComponent(component)
                  fixture.detectChanges()

                  await fixture.whenStable()

                  const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
                  const slotElement = coreElement?.shadowRoot?.querySelector(`slot[name="${testCase.slot}"]`) as HTMLSlotElement | null
                  expect(slotElement).toBeTruthy()

                  // Check the slot content
                  if (slotElement) {
                    const assignedElements = slotElement.assignedElements()
                    expect(assignedElements.length).toBeGreaterThan(0)

                    // The slot must contain the passed text
                    const slotContent = assignedElements[0]?.textContent?.trim()
                    expect(slotContent).toContain(testCase.content)
                  }
                },
              )
            }
          },
        )

        describe(
          'Props',
          () => {
            for (const testCase of [
              ...propLabelTextTestCases,
              ...propDisabledTestCases,
              ...propErrorTestCases,
            ]) {
              it(
                `Prop "${testCase.prop}" should set ${testCase.prop} on the core component`,
                async() => {
                  const component = await createComponent({
                    slots: {},
                    props: { [testCase.prop]: testCase.value },
                  })
                  const fixture = TestBed.createComponent(component)
                  fixture.detectChanges()

                  await fixture.whenStable()

                  const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
                  expect(coreElement?.[testCase.prop]).toBe(testCase.expected)
                },
              )
            }
          },
        )

        describe(
          'Events',
          () => {
            it('should update the value on input', async() => {
              const component = await createComponent({
                slots: {},
                props: {},
              })
              const fixture = TestBed.createComponent(component)
              fixture.detectChanges()
              await fixture.whenStable()

              const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
              const textareaDebugElement = fixture.debugElement.children[0]
              const textareaComponent = textareaDebugElement.componentInstance as AltTextarea
              const newValue = 'text'

              // Simulate an input event
              const mockEvent = new CustomEvent('input', { detail: { value: newValue } })
              coreElement?.dispatchEvent(mockEvent)

              fixture.detectChanges()
              await fixture.whenStable()

              expect(textareaComponent.textareaValue()).toBe(newValue)
            })

            it('should emit focus on focus', async() => {
              const component = await createComponent({
                slots: {},
                props: {},
              })
              const fixture = TestBed.createComponent(component)
              const componentInstance = fixture.componentInstance
              fixture.detectChanges()

              await fixture.whenStable()

              const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
              const mockEvent = new Event('focus')

              // Simulate a focus event
              coreElement?.dispatchEvent(mockEvent)

              expect(componentInstance.handleFocus).toHaveBeenCalled()
            })

            it('should emit blur on blur', async() => {
              const component = await createComponent({
                slots: {},
                props: {},
              })
              const fixture = TestBed.createComponent(component)
              const componentInstance = fixture.componentInstance
              fixture.detectChanges()

              await fixture.whenStable()

              const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
              const mockEvent = new Event('blur')

              // Simulate a blur event
              coreElement?.dispatchEvent(mockEvent)

              expect(componentInstance.handleBlur).toHaveBeenCalled()
            })

            it('should emit clear on clear', async() => {
              const component = await createComponent({
                slots: {},
                props: { clearable: true },
              })
              const fixture = TestBed.createComponent(component)
              const componentInstance = fixture.componentInstance
              fixture.detectChanges()

              await fixture.whenStable()

              const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
              const mockEvent = new Event('clear')

              // Simulate a clear event
              coreElement?.dispatchEvent(mockEvent)

              expect(componentInstance.handleClear).toHaveBeenCalled()
            })
          },
        )
      },
    )
  },
)
