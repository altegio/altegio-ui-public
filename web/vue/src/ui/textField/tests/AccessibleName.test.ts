import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import type { Component } from 'vue'
import {
  AltCoreAutocompleteFieldTagName,
  AltCoreCountFieldTagName,
  AltCoreFieldIconTagName,
  AltCoreMultipleSelectFieldTagName,
  AltCorePopoverTagName,
  AltCoreSelectFieldTagName,
  AltCoreTextareaTagName,
  AltCoreTextFieldTagName,
} from '~shared/constants'
import { AltTextField } from '~vue/ui/textField'
import { AltTextarea } from '~vue/ui/textarea'
import { AltCountField } from '~vue/ui/countField'
import { AltSearchField } from '~vue/ui/searchField'
import { AltAutocompleteField } from '~vue/ui/autocompleteField'
import { AltFieldIcon } from '~vue/ui/fieldIcon'
import { AltSelectField } from '~vue/ui/selectField'
import { AltMultipleSelectField } from '~vue/ui/multipleSelectField'
import { AltPopover } from '~vue/ui/popover'

const wrappers: [string, Component, string, Record<string, unknown>?][] = [
  ['AltTextField', AltTextField, AltCoreTextFieldTagName],
  ['AltTextarea', AltTextarea, AltCoreTextareaTagName],
  ['AltCountField', AltCountField, AltCoreCountFieldTagName],
  ['AltSearchField', AltSearchField, AltCoreTextFieldTagName],
  ['AltAutocompleteField', AltAutocompleteField, AltCoreAutocompleteFieldTagName, { value: '' }],
  ['AltFieldIcon', AltFieldIcon, AltCoreFieldIconTagName],
  ['AltSelectField', AltSelectField, AltCoreSelectFieldTagName],
  ['AltMultipleSelectField', AltMultipleSelectField, AltCoreMultipleSelectFieldTagName],
  ['AltPopover', AltPopover, AltCorePopoverTagName],
]

describe('Vue/accessibleName', () => {
  for (const [
    name,
    wrapper,
    tagName,
    requiredProps,
  ] of wrappers) {
    it(`${name} forwards accessibleName to the core component`, () => {
      const mounted = mount(wrapper, { props: { ...requiredProps, accessibleName: 'Accessible name' } })

      expect((mounted.find(tagName).element as HTMLElement & { accessibleName?: string }).accessibleName).toBe('Accessible name')
    })
  }
})
