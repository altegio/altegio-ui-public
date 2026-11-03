import { afterEach, describe, expect, it, vi } from 'vitest'
import { AltCoreFormTagName as tagName } from '~shared/constants'
import { getDeepActiveElement, waitForLitTree } from '~shared/tests/a11y'
import type { FormInvalidEvent, FormSubmitEvent } from '~core/ui/form/models/types'
import type { AltCoreSelectField } from '~core/ui/selectField'
import type { AltCoreMultipleSelectField } from '~core/ui/multipleSelectField'
import type { AltCoreDatePicker } from '~core/ui/datePicker'
import type { AltCoreDateRange } from '~core/ui/dateRange'
import type { AltCoreToggle } from '~core/ui/toggle'
import type { AltCoreFieldInput } from '~core/ui/fieldInput'
import '~core/ui/form'
import '~core/ui/selectField'
import '~core/ui/multipleSelectField'
import '~core/ui/datePicker'
import '~core/ui/dateRange'
import '~core/ui/toggle'

const ITEMS = [
  { id: 1, label: 'Kyiv' },
  { id: 2, label: 'Lviv' },
  { id: 3, label: 'Odesa' },
]

const FIELDS = `
  <alt-core-select-field name="city" required></alt-core-select-field>

  <alt-core-multiple-select-field name="cities" required></alt-core-multiple-select-field>

  <alt-core-date-picker name="date" required></alt-core-date-picker>

  <alt-core-date-range name="period" required></alt-core-date-range>

  <alt-core-toggle name="notify" required></alt-core-toggle>
`

const mountForm = async() => {
  const altForm = document.createElement(tagName)
  altForm.innerHTML = `<form>${FIELDS}</form>`
  document.body.append(altForm)

  const select = altForm.querySelector<AltCoreSelectField>('alt-core-select-field')!
  const multipleSelect = altForm.querySelector<AltCoreMultipleSelectField>('alt-core-multiple-select-field')!
  const datePicker = altForm.querySelector<AltCoreDatePicker>('alt-core-date-picker')!
  const dateRange = altForm.querySelector<AltCoreDateRange>('alt-core-date-range')!
  const toggle = altForm.querySelector<AltCoreToggle>('alt-core-toggle')!
  Object.assign(select, { items: ITEMS, itemLabel: 'label', labelText: 'City' })
  Object.assign(multipleSelect, { items: ITEMS, itemLabel: 'label', labelText: 'Cities' })
  Object.assign(datePicker, { labelText: 'Date' })
  Object.assign(dateRange, { labelText: 'Period' })
  Object.assign(toggle, { labelText: 'Notify me' })
  await waitForLitTree(altForm)

  const onSubmit = vi.fn()
  const onInvalid = vi.fn()
  altForm.addEventListener('form-submit', onSubmit)
  altForm.addEventListener('form-invalid', onInvalid)

  return { altForm, select, multipleSelect, datePicker, dateRange, toggle, onSubmit, onInvalid }
}

type TFields = Awaited<ReturnType<typeof mountForm>>

const getErrorText = (field: Element): string => {
  const error = field.shadowRoot?.querySelector('alt-core-error')
  if (error) return error.shadowRoot?.textContent.trim() ?? ''

  const innerField = field.shadowRoot?.querySelector('alt-core-date-picker')

  return innerField ? getErrorText(innerField) : ''
}

/** The input of a select or a date field; AltDateRange renders it in its date picker */
const getInput = (field: Element): HTMLInputElement | undefined => {
  const innerField = field.shadowRoot?.querySelector('alt-core-date-picker')
  if (innerField) return getInput(innerField)

  return field.shadowRoot?.querySelector<AltCoreFieldInput>('alt-core-field-input')?.inputElement
}

const fill = async(fields: TFields) => {
  const { altForm, select, multipleSelect, datePicker, dateRange, toggle } = fields
  select.value = ITEMS[1]
  multipleSelect.value = [ITEMS[0], ITEMS[2]]
  datePicker.date = '05.03.2026'
  dateRange.from = '2026-03-01'
  dateRange.to = '2026-03-31'
  toggle.checked = true
  await waitForLitTree(altForm)
}

afterEach(() => {
  document.body.replaceChildren()
})

describe('Core/AltCoreForm/Fields', () => {
  it('shows the required message in the selects, the dates and the switch', async() => {
    const { altForm, select, multipleSelect, datePicker, dateRange, toggle, onInvalid } = await mountForm()

    expect(await altForm.validate()).toBe(false)
    await waitForLitTree(altForm)

    expect((onInvalid.mock.lastCall?.[0] as FormInvalidEvent).detail.controls).toEqual([select, multipleSelect, datePicker, dateRange, toggle])
    for (const field of [select, multipleSelect, datePicker, dateRange, toggle]) {
      expect(getErrorText(field)).toContain('Fill in this field')
    }
  })

  it('submits the values: item values, dates as YYYY-MM-DD, several values under one name', async() => {
    const fields = await mountForm()
    await fill(fields)

    fields.altForm.submit()
    await vi.waitFor(() => { expect(fields.onSubmit).toHaveBeenCalledTimes(1) })

    const { formData } = (fields.onSubmit.mock.lastCall?.[0] as FormSubmitEvent).detail
    expect(formData.get('city')).toBe('2')
    expect(formData.getAll('cities')).toEqual(['1', '3'])
    expect(formData.get('date')).toBe('2026-03-05')
    expect(formData.getAll('period')).toEqual(['2026-03-01', '2026-03-31'])
    expect(formData.get('notify')).toBe('on')
    expect(fields.onInvalid).not.toHaveBeenCalled()
  })

  it('submits values given through isMapOptions', async() => {
    const { altForm, select, multipleSelect } = await mountForm()
    Object.assign(select, { isMapOptions: true, value: 3 })
    Object.assign(multipleSelect, { isMapOptions: true, value: [2] })
    await waitForLitTree(altForm)

    const formData = new FormData(altForm.form!)

    expect(formData.get('city')).toBe('3')
    expect(formData.getAll('cities')).toEqual(['2'])
  })

  it('restores the initial values on reset and reports them', async() => {
    const fields = await mountForm()
    const { altForm, select, multipleSelect, datePicker, dateRange, toggle } = fields
    const onSelect = vi.fn()
    const onPick = vi.fn()
    const onChange = vi.fn()
    select.addEventListener('select', onSelect)
    multipleSelect.addEventListener('select', onSelect)
    datePicker.addEventListener('pick', onPick)
    dateRange.addEventListener('change', onChange)
    await fill(fields)
    await altForm.validate()

    altForm.reset()
    await waitForLitTree(altForm)

    expect(select.value).toBeUndefined()
    expect(multipleSelect.value).toBeUndefined()
    expect(datePicker.date).toBeUndefined()
    expect(dateRange.from).toBeUndefined()
    expect(dateRange.to).toBeUndefined()
    expect(toggle.checked).toBe(false)
    expect(onSelect).toHaveBeenCalledTimes(2)
    expect(onPick).toHaveBeenCalledTimes(1)
    expect(onChange.mock.lastCall?.[0]).toMatchObject({ detail: { from: null, to: null } })
    for (const field of [select, multipleSelect, datePicker, dateRange, toggle]) {
      expect(getErrorText(field)).toBe('')
    }
  })

  it('shows its own errors instead of the required message', async() => {
    const { altForm, select } = await mountForm()
    select.errors = ['Choose another city']

    expect(await altForm.validate()).toBe(false)
    await waitForLitTree(altForm)

    expect(getErrorText(select)).toBe('Choose another city')
  })

  it.each([
    { case: 'AltSelectField', clear: (fields: TFields) => { fields.select.value = undefined }, getField: (fields: TFields) => fields.select },
    { case: 'AltMultipleSelectField', clear: (fields: TFields) => { fields.multipleSelect.value = [] }, getField: (fields: TFields) => fields.multipleSelect },
    { case: 'AltDatePicker', clear: (fields: TFields) => { fields.datePicker.date = '' }, getField: (fields: TFields) => fields.datePicker },
    { case: 'AltDateRange', clear: (fields: TFields) => { fields.dateRange.from = undefined }, getField: (fields: TFields) => fields.dateRange },
  ])('focuses the input of an invalid $case without opening it', async({ clear, getField }) => {
    const fields = await mountForm()
    await fill(fields)
    clear(fields)
    await waitForLitTree(fields.altForm)

    expect(await fields.altForm.validate()).toBe(false)
    await waitForLitTree(fields.altForm)

    const input = getInput(getField(fields))
    expect(getDeepActiveElement()).toBe(input)
    expect(input?.getAttribute('aria-invalid')).toBe('true')
    expect(input?.getAttribute('aria-expanded')).toBe('false')
  })

  it('disables the selects and the dates in a disabled fieldset', async() => {
    const { altForm, select, multipleSelect, datePicker, dateRange, toggle, onInvalid } = await mountForm()
    const fields = [select, multipleSelect, datePicker, dateRange]
    const fieldset = document.createElement('fieldset')
    fieldset.append(...fields)
    altForm.form!.prepend(fieldset)
    fieldset.disabled = true
    await waitForLitTree(altForm)
    // A disabled select stops its events, as a disabled native control fires none
    const onSelectClick = vi.fn()
    select.addEventListener('click', onSelectClick)

    for (const field of fields) {
      field.shadowRoot?.querySelector('alt-core-field-wrapper')?.click()
      field.focus()
      await waitForLitTree(altForm)

      expect(getInput(field)?.disabled).toBe(true)
      expect(getInput(field)?.getAttribute('aria-expanded')).not.toBe('true')
      expect(getDeepActiveElement()).not.toBe(getInput(field))
    }
    expect(onSelectClick).not.toHaveBeenCalled()
    expect(await altForm.validate()).toBe(false)
    expect((onInvalid.mock.lastCall?.[0] as FormInvalidEvent).detail.controls).toEqual([toggle])

    fieldset.disabled = false
    await waitForLitTree(altForm)

    for (const field of fields) expect(getInput(field)?.disabled).toBe(false)
  })
})
