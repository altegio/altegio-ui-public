import { describe, expect, it, vi } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { YCoreCardButtonTagName as tagName } from '~shared/constants'
import { YCardButton } from '~ng/ui/cardButton'
import type { IYNgCardButtonProps } from '~ng/ui/cardButton/models/types'

import {
  propDisabledCases,
  propHoverableCases,
  propFocusableCases,
  propSizeCases,
  propHeaderTextCases,
  propTagTextCases,
  propTagVariantCases,
  propHeaderIconCases,
  propAnnotationCases,
} from './cases/props'

import {
  slotBeforeTestCases,
  slotMainTestCases,
  slotAnnotationTestCases,
  slotAfterTestCases,
} from './cases/slots'

interface ICreateComponentArgs {
  slots?: {
    cardButtonBefore?: string
    cardButtonMain?: string
    cardButtonAnnotation?: string
    cardButtonAfter?: string
  }
  props?: Partial<IYNgCardButtonProps>
}

const createComponent = async({ slots, props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [YCardButton] }).compileComponents()

  @Component({
    template: `
      <YCardButton
        [annotation]="annotation"
        [disabled]="disabled"
        [hoverable]="hoverable"
        [focusable]="focusable"
        [size]="size"
        [headerText]="headerText"
        [tagText]="tagText"
        [tagVariant]="tagVariant"
        [headerIcon]="headerIcon"
        (click)="handleClick($event)"
        (focus)="handleFocus($event)"
        (blur)="handleBlur($event)"
      >
        @if (beforeSlot) {
          <div card-button-before>
            {{ beforeSlot }}
          </div>
        }
        @if (mainSlot) {
          <div card-button-main>
            {{ mainSlot }}
          </div>
        }
        @if (annotationSlot) {
          <div card-button-annotation>
            {{ annotationSlot }}
          </div>
        }
        @if (afterSlot) {
          <div card-button-after>
            {{ afterSlot }}
          </div>
        }
      </YCardButton>
    `,
    imports: [YCardButton],
    standalone: true,
  })
  class TestComponent {
    annotation = props?.annotation
    disabled = props?.disabled
    hoverable = props?.hoverable
    focusable = props?.focusable
    size = props?.size
    headerText = props?.headerText
    tagText = props?.tagText
    tagVariant = props?.tagVariant
    headerIcon = props?.headerIcon
    beforeSlot = slots?.cardButtonBefore
    mainSlot = slots?.cardButtonMain
    annotationSlot = slots?.cardButtonAnnotation
    afterSlot = slots?.cardButtonAfter

    handleClick = vi.fn()
    handleFocus = vi.fn()
    handleBlur = vi.fn()
  }
  return TestComponent
}

describe(
  'Angular/YCardButton/Unit',
  () => {
    describe(
      'Slots',
      () => {
        for (const testCase of [
          ...slotBeforeTestCases,
          ...slotMainTestCases,
          ...slotAnnotationTestCases,
          ...slotAfterTestCases,
        ]) {
          it(
            `Slot: "${testCase.slot}" должен быть ${testCase.case}`,
            async() => {
              const component = await createComponent({
                slots: { [testCase.slot]: testCase.content },
                props: {},
              })
              const fixture = TestBed.createComponent(component)
              fixture.detectChanges()

              await fixture.whenStable()

              expect((fixture.nativeElement as HTMLElement).textContent).toContain(testCase.content)
            },
          )
        }
      },
    )

    describe(
      'Props',
      () => {
        for (const testCase of [
          ...propDisabledCases,
          ...propHoverableCases,
          ...propFocusableCases,
          ...propSizeCases,
          ...propHeaderTextCases,
          ...propTagTextCases,
          ...propTagVariantCases,
          ...propAnnotationCases,
        ]) {
          it(
            `Prop: "${testCase.prop}" должен изменить свойство ${testCase.prop} у core компонента`,
            async() => {
              const component = await createComponent({ props: { [testCase.prop]: testCase.value } })
              const fixture = TestBed.createComponent(component)
              fixture.detectChanges()

              await fixture.whenStable()

              const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)

              expect(coreElement?.[testCase.prop]).toBe(testCase.expected)
            },
          )
        }
        for (const testCase of propHeaderIconCases) {
          it(
            `Prop: "${testCase.prop}" должен изменить свойство ${testCase.prop} у core компонента`,
            async() => {
              const component = await createComponent({ props: { [testCase.prop]: testCase.value } })
              const fixture = TestBed.createComponent(component)
              fixture.detectChanges()

              await fixture.whenStable()

              const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)

              expect(coreElement?.headerIcon?.name).toBe(testCase.value?.name)
            },
          )
        }
      },
    )

    describe(
      'Events',
      () => {
        it('Event: должен генерировать событие click при клике', async() => {
          const component = await createComponent({
            slots: {},
            props: {},
          })
          const fixture = TestBed.createComponent(component)
          const componentInstance = fixture.componentInstance
          fixture.detectChanges()

          await fixture.whenStable()

          const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
          const mockEvent = new Event('click')

          coreElement?.dispatchEvent(new Event('click'))

          expect(componentInstance.handleClick).toHaveBeenCalledWith(mockEvent)
        })

        it('Event: должен генерировать событие focus при фокусе', async() => {
          const component = await createComponent({
            slots: {},
            props: { focusable: true },
          })
          const fixture = TestBed.createComponent(component)
          const componentInstance = fixture.componentInstance
          fixture.detectChanges()

          await fixture.whenStable()

          const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
          const mockEvent = new Event('focus')

          coreElement?.dispatchEvent(new Event('focus'))

          expect(componentInstance.handleFocus).toHaveBeenCalledWith(mockEvent)
        })

        it('Event: должен генерировать событие blur при потере фокуса', async() => {
          const component = await createComponent({
            slots: {},
            props: { focusable: true },
          })
          const fixture = TestBed.createComponent(component)
          const componentInstance = fixture.componentInstance
          fixture.detectChanges()

          await fixture.whenStable()

          const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
          const mockEvent = new Event('blur')

          coreElement?.dispatchEvent(new Event('blur'))

          expect(componentInstance.handleBlur).toHaveBeenCalledWith(mockEvent)
        })
      },
    )
  },
)
