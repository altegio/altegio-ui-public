import { slotDefaultTestCases } from '~vue/ui/modal/tests/cases/slots'
import { describe, expect, it, vi } from 'vitest'
import { YCoreModalTagName as tagName } from '~shared/constants'
import { TestBed } from '~ng/tests/setup'
import { YModal } from '~ng/ui/modal'
import { Component } from '@angular/core'
import type { IYNgModalProps } from '~ng/ui/modal/models/types'
import {
  propsFullScreenTestCases,
  propsHideOverlayTestCases,
  propsOpenTestCases,
  propsPreventEscapeTestCases,
  propsSizeTestCases,
  propsVariantTestCases,
  propsWidthTestCases,
} from '~ng/ui/modal/tests/cases/props'
import {
  eventActivatorCLickCases,
  eventCloseCases, eventCloseIconCLickCases,
  eventOpenCases,
  eventOverlayClickCases, eventPressEscapeCases,
} from '~ng/ui/modal/tests/cases/events'

interface ICreateComponentArgs {
  slots?: {
    activator?: string
    content?: string
    close?: string
  }
  props?: Partial<IYNgModalProps>
}

const createComponent = async({ slots, props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [YModal] }).compileComponents()

  @Component({
    template: `
      <YModal
        [open]="open"
        [size]="size"
        [variant]="variant"
        [width]="width"
        [hideOverlay]="hideOverlay"
        [preventEscape]="preventEscape"
        [fullScreen]="fullScreen"
        (openEvent)="handleOpen($event)"
        (closeEvent)="handleClose($event)"
        (clickCloseIconEvent)="handleClickCloseIcon($event)"
        (clickOverlayEvent)="handleClickOverlay($event)"
        (clickActivatorEvent)="handleClickActivator($event)"
        (pressEscapeEvent)="handlePressEscape($event)"
      >
        @if (activatorSlot) {
          <div activator>
            {{ activatorSlot }}
          </div>
        }
        @if (content) {
          <div content>
            {{ content }}
          </div>
        }
        @if (close) {
          <div close>
            {{ close }}
          </div>
        }
      </YModal>
    `,
    imports: [YModal],
    standalone: true,
  })
  class TestComponent {
    open = props?.open
    size = props?.size
    variant = props?.variant
    width = props?.width
    hideOverlay = props?.hideOverlay
    preventEscape = props?.preventEscape
    fullScreen = props?.fullScreen

    activatorSlot = slots?.activator
    content = slots?.content
    close = slots?.close

    handleOpen = vi.fn()
    handleClose = vi.fn()
    handleClickCloseIcon = vi.fn()
    handleClickOverlay = vi.fn()
    handleClickActivator = vi.fn()
    handlePressEscape = vi.fn()
  }
  return TestComponent
}


const baseSlotsCheck = () => {
  for (const testCase of slotDefaultTestCases) {
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
}

const basePropsCheck = () => {
  for (const testCase of [
    ...propsOpenTestCases,
    ...propsVariantTestCases,
    ...propsSizeTestCases,
    ...propsWidthTestCases,
    ...propsPreventEscapeTestCases,
    ...propsHideOverlayTestCases,
    ...propsFullScreenTestCases,
  ]) {
    it(
      `Prop: "${testCase.prop}" ${testCase.value} ${testCase.value === undefined ? 'не' : ''} должен изменить свойство ${testCase.prop} у core компонента`,
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
}

const baseEventsCheck = () => {
  for (const testCase of [
    ...eventOpenCases,
    ...eventCloseCases,
    ...eventOverlayClickCases,
    ...eventActivatorCLickCases,
    ...eventCloseIconCLickCases,
    ...eventPressEscapeCases,
  ]) {
    it(
      `Event: должен генерировать событие ${testCase.event} ${testCase.case}`,
      async() => {
        const component = await createComponent({
          slots: {},
          props: {},
        })
        const fixture = TestBed.createComponent(component)
        const componentInstance = fixture.componentInstance
        fixture.detectChanges()

        await fixture.whenStable()

        const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
        const mockEvent = new Event(testCase.event)

        coreElement?.dispatchEvent(new Event(testCase.event))

        expect(componentInstance[testCase.methodName]).toHaveBeenCalledWith(mockEvent)
      },
    )
  }
}

describe(
  'Angular/YCoreOrganismModal/Unit',
  () => {
    describe(
      'Slots',
      () => {
        baseSlotsCheck()
      },
    )

    describe(
      'Props',
      () => {
        basePropsCheck()
      },
    )

    describe(
      'Events',
      () => {
        baseEventsCheck()
      },
    )
  },
)
