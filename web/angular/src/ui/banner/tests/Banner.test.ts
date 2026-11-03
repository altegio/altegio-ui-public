import { describe, expect, it, vi } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { AltCoreBannerTagName as tagName } from '~shared/constants'
import { AltBanner } from '~ng/ui/banner'
import type { IAltNgBannerProps } from '~ng/ui/banner/models/types'
import { EAltCoreBannerLayout, EAltCoreBannerVariant } from '~core/ui/banner/models/types'
import { altRocket } from '~shared/icons'
import type { TPropTestCase } from '~shared/types/tests'

interface ICreateComponentArgs {
  props?: Partial<IAltNgBannerProps>
  onClose?: () => void
}

const createFixture = async({ props, onClose }: ICreateComponentArgs = {}) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltBanner] }).compileComponents()

  @Component({
    template: `
      <AltBanner
        [variant]="variant"
        [layout]="layout"
        [title]="title"
        [description]="description"
        [icon]="icon"
        [hideIcon]="hideIcon"
        [closable]="closable"
        [closeLabel]="closeLabel"
        (close)="handleClose()"
      >
        Message
        <button slot="actions">Action</button>
      </AltBanner>
    `,
    imports: [AltBanner],
    standalone: true,
  })
  class TestComponent {
    variant = props?.variant
    layout = props?.layout
    title = props?.title
    description = props?.description
    icon = props?.icon
    hideIcon = props?.hideIcon
    closable = props?.closable
    closeLabel = props?.closeLabel
    handleClose = () => onClose?.()
  }

  const fixture = TestBed.createComponent(TestComponent)
  fixture.detectChanges()
  await fixture.whenStable()

  return fixture
}

const propTestCases: TPropTestCase<Required<IAltNgBannerProps>, keyof IAltNgBannerProps>[] = [
  { prop: 'variant', case: 'danger', value: EAltCoreBannerVariant.DANGER },
  { prop: 'layout', case: 'page', value: EAltCoreBannerLayout.PAGE },
  { prop: 'title', case: 'with text', value: 'Title' },
  { prop: 'description', case: 'with text', value: 'Description' },
  { prop: 'icon', case: 'with an icon', value: altRocket },
  { prop: 'hideIcon', case: 'true', value: true },
  { prop: 'closable', case: 'true', value: true },
  { prop: 'closeLabel', case: 'with text', value: 'Dismiss' },
]

const getCoreElement = (fixture: Awaited<ReturnType<typeof createFixture>>) => {
  return (fixture.nativeElement as HTMLElement).querySelector(tagName)!
}

describe(
  'Angular/AltBanner',
  () => {
    describe(
      'Props',
      () => {
        for (const testCase of propTestCases) {
          it(
            `Prop "${testCase.prop}" (${testCase.case}) should be set on the core component`,
            async() => {
              const fixture = await createFixture({ props: { [testCase.prop]: testCase.value } })

              expect(getCoreElement(fixture)[testCase.prop]).toStrictEqual(testCase.value)
            },
          )
        }
      },
    )

    describe(
      'Slots',
      () => {
        it(
          'Projected content should reach the default and "actions" slots',
          async() => {
            const fixture = await createFixture()
            const coreElement = getCoreElement(fixture)

            expect(coreElement.textContent).toContain('Message')
            expect(coreElement.querySelector('[slot="actions"]')?.textContent).toBe('Action')
          },
        )
      },
    )

    describe(
      'Events',
      () => {
        it(
          'Should emit "close" once when the core component emits it',
          async() => {
            const onClose = vi.fn()
            const fixture = await createFixture({ props: { closable: true }, onClose })

            getCoreElement(fixture).dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }))

            expect(onClose).toHaveBeenCalledTimes(1)
          },
        )
      },
    )
  },
)
