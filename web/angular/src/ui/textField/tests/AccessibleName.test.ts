import { describe, expect, it } from 'vitest'
import { Component, type Type } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import {
  AltCoreAutocompleteFieldTagName,
  AltCoreCountFieldTagName,
  AltCoreFieldIconTagName,
  AltCorePopoverTagName,
  AltCoreTextareaTagName,
  AltCoreTextFieldTagName,
} from '~shared/constants'
import { AltTextField } from '~ng/ui/textField'
import { AltTextarea } from '~ng/ui/textarea'
import { AltCountField } from '~ng/ui/countField'
import { AltSearchField } from '~ng/ui/searchField'
import { AltAutocompleteField } from '~ng/ui/autocompleteField'
import { AltFieldIcon } from '~ng/ui/fieldIcon'
import { AltPopover } from '~ng/ui/popover'

const wrappers: [string, Type<unknown>, string][] = [
  ['AltTextField', AltTextField, AltCoreTextFieldTagName],
  ['AltTextarea', AltTextarea, AltCoreTextareaTagName],
  ['AltCountField', AltCountField, AltCoreCountFieldTagName],
  ['AltSearchField', AltSearchField, AltCoreTextFieldTagName],
  ['AltAutocompleteField', AltAutocompleteField, AltCoreAutocompleteFieldTagName],
  ['AltFieldIcon', AltFieldIcon, AltCoreFieldIconTagName],
  ['AltPopover', AltPopover, AltCorePopoverTagName],
]

const renderWrapper = async(selector: string, wrapper: Type<unknown>) => {
  TestBed.resetTestingModule()

  @Component({
    template: `<${selector} [accessibleName]="accessibleName"></${selector}>`,
    imports: [wrapper],
    standalone: true,
  })
  class TestComponent {
    accessibleName = 'Accessible name'
  }

  await TestBed.configureTestingModule({ imports: [TestComponent] }).compileComponents()
  const fixture = TestBed.createComponent(TestComponent)
  fixture.detectChanges()
  await fixture.whenStable()

  return fixture.nativeElement as HTMLElement
}

describe('Angular/accessibleName', () => {
  for (const [
    name,
    wrapper,
    tagName,
  ] of wrappers) {
    it(`${name} forwards accessibleName to the core component`, async() => {
      const element = await renderWrapper(name, wrapper)

      expect(element.querySelector<HTMLElement & { accessibleName?: string }>(tagName)?.accessibleName).toBe('Accessible name')
    })
  }
})
