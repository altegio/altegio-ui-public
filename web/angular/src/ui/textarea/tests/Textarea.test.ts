import { describe, expect, it, vi } from 'vitest'
import { Component, ChangeDetectionStrategy } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { YCoreTextareaTagName } from '~shared/constants'
import type { TPropTestCase, TSlotTestCase } from '~shared/types/tests'
import { text } from '~shared/tests/slotContents'
import { YTextarea } from '~ng/ui/textarea'
import { type IYNgTextareaProps } from '~ng/ui/textarea/models/types'

const tagName = YCoreTextareaTagName

interface ICreateComponentArgs {
  slots?: {
    before?: string
    after?: string
  }
  props?: Partial<IYNgTextareaProps>
}

const createComponent = async({ slots, props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [YTextarea] }).compileComponents()

  @Component({
    template: `
      <YTextarea
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
      </YTextarea>
    `,
    imports: [YTextarea],
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
const slotBeforeTestCases: TSlotTestCase[] = [{ slot: 'before', case: 'с контентом', content: text }]

const slotAfterTestCases: TSlotTestCase[] = [{ slot: 'after', case: 'с контентом', content: text }]

const propLabelTextTestCases: TPropTestCase<IYNgTextareaProps, 'labelText'>[] = [{ prop: 'labelText', case: 'с текстом метки', value: 'Тестовая метка', expected: 'Тестовая метка' }]

const propDisabledTestCases: TPropTestCase<IYNgTextareaProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'включен', value: true, expected: true },
  { prop: 'disabled', case: 'выключен', value: false, expected: false },
]

const propErrorTestCases: TPropTestCase<IYNgTextareaProps, 'error'>[] = [
  { prop: 'error', case: 'включен', value: true, expected: true },
  { prop: 'error', case: 'выключен', value: false, expected: false },
]

describe(
  'Angular/YTextarea',
  () => {
    describe(
      'Unit',
      () => {
        describe(
          'Slots',
          () => {
            for (const testCase of [...slotBeforeTestCases, ...slotAfterTestCases]) {
              it(
                `Slot "${testCase.slot}" должен быть ${testCase.case}`,
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

                  // Проверка содержимого слотов
                  if (slotElement) {
                    const assignedElements = slotElement.assignedElements()
                    expect(assignedElements.length).toBeGreaterThan(0)

                    // Проверяем, что содержимое слота содержит наш текст
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
                `Prop "${testCase.prop}" должен изменить свойство ${testCase.prop} у core компонента`,
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
            it('должен обновлять значение при вводе', async() => {
              const component = await createComponent({
                slots: {},
                props: {},
              })
              const fixture = TestBed.createComponent(component)
              fixture.detectChanges()
              await fixture.whenStable()

              const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
              const textareaDebugElement = fixture.debugElement.children[0]
              const textareaComponent = textareaDebugElement.componentInstance as YTextarea
              const newValue = 'текст'

              // Эмулируем событие ввода
              const mockEvent = new CustomEvent('input', { detail: { value: newValue } })
              coreElement?.dispatchEvent(mockEvent)

              fixture.detectChanges()
              await fixture.whenStable()

              expect(textareaComponent.textareaValue()).toBe(newValue)
            })

            it('должен генерировать событие focus при фокусе', async() => {
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

              // Эмулируем событие фокуса
              coreElement?.dispatchEvent(mockEvent)

              expect(componentInstance.handleFocus).toHaveBeenCalled()
            })

            it('должен генерировать событие blur при потере фокуса', async() => {
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

              // Эмулируем событие потери фокуса
              coreElement?.dispatchEvent(mockEvent)

              expect(componentInstance.handleBlur).toHaveBeenCalled()
            })

            it('должен генерировать событие clear при очистке', async() => {
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

              // Эмулируем событие очистки
              coreElement?.dispatchEvent(mockEvent)

              expect(componentInstance.handleClear).toHaveBeenCalled()
            })
          },
        )
      },
    )
  },
)
