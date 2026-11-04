import { colord } from 'colord'
import type { TAltSizes } from '~shared/types/global'
import { altCalendar2, altChevronRight } from '~shared/icons'
import { PaletteModule } from '~core/ui/globalProvider/context/modules/PaletteModule'
import { waitForLitTree } from '~shared/tests/a11y'
import '~core/ui/button'
import '~core/ui/textField'
import '~core/ui/selectField'
import '~core/ui/datePicker'
import '~core/ui/checkbox'
import '~core/ui/toggle'
import '~core/ui/brandButton'
import '~core/ui/tag'
import fixtureCss from './fixtures.css?inline'
import interLatin from '~shared/public/fonts/inter/inter_latin.woff2?url'

type ControlState = 'default' | 'hint' | 'error' | 'disabled' | 'loading' | 'long'
type FieldKind = 'text' | 'select' | 'date'
type ControlSize = Extract<TAltSizes, 'small' | 'medium' | 'large'>

export const controlRows: { size: ControlSize; state: ControlState; caption: string }[] = [
  { size: 'small', state: 'default', caption: 'Small · 32px' },
  { size: 'medium', state: 'default', caption: 'Medium · 40px' },
  { size: 'large', state: 'default', caption: 'Large · 48px' },
  { size: 'medium', state: 'hint', caption: 'Hint / required' },
  { size: 'medium', state: 'error', caption: 'Error' },
  { size: 'medium', state: 'disabled', caption: 'Disabled' },
  { size: 'medium', state: 'loading', caption: 'Loading / readonly' },
  { size: 'medium', state: 'long', caption: 'Long label / icons' },
]

export async function loadVisualFont() {
  // No local() fallback: the same bundled variable font is used on macOS and Linux.
  const font = new FontFace('altegio-visual', `url("${interLatin}")`, { weight: '100 900' })
  document.fonts.add(await font.load())
}

export function buttonFixture(size: ControlSize, state: ControlState) {
  const button = document.createElement('alt-core-button')
  Object.assign(button, {
    size,
    label: state === 'long' ? 'Continue with this appointment notification' : 'Continue',
    loading: state === 'loading',
    disabled: state === 'disabled',
    iconLeft: state === 'long' ? altCalendar2 : undefined,
    iconRight: state === 'long' ? altChevronRight : undefined,
    fullWidth: true,
  })
  return button
}

export function fieldFixture(kind: 'text', size: ControlSize, state: ControlState): HTMLElementTagNameMap['alt-core-text-field']
export function fieldFixture(kind: 'select', size: ControlSize, state: ControlState): HTMLElementTagNameMap['alt-core-select-field']
export function fieldFixture(kind: 'date', size: ControlSize, state: ControlState): HTMLElementTagNameMap['alt-core-date-picker']
export function fieldFixture(kind: FieldKind, size: ControlSize, state: ControlState): HTMLElementTagNameMap['alt-core-text-field' | 'alt-core-select-field' | 'alt-core-date-picker']
export function fieldFixture(kind: FieldKind, size: ControlSize, state: ControlState): HTMLElementTagNameMap['alt-core-text-field' | 'alt-core-select-field' | 'alt-core-date-picker'] {
  const props = {
    size,
    labelText: state === 'long' ? 'Customer contact information for appointment notifications' : 'Customer',
    labelTooltipText: state === 'long' ? 'Used for reminders' : '',
    annotationText: state === 'hint' || state === 'error' || state === 'disabled' || state === 'loading' ? 'Shown on appointments' : '',
    required: state === 'hint',
    disabled: state === 'disabled',
    readonly: state === 'loading',
    errors: state === 'error' ? ['This value needs attention'] : [],
    placeholder: 'Enter a value',
  }
  switch (kind) {
    case 'text':
      return Object.assign(document.createElement('alt-core-text-field'), props, { value: 'Jane Cooper' })
    case 'select':
      return Object.assign(document.createElement('alt-core-select-field'), props, {
        items: [{ id: 1, label: 'Lisbon' }, { id: 2, label: 'Berlin' }],
        itemLabel: 'label',
        isMapOptions: true,
        value: 1,
      })
    case 'date':
      return Object.assign(document.createElement('alt-core-date-picker'), props, { date: '2026-11-03' })
  }
}

function element(tag: string, className: string, text?: string) {
  const result = document.createElement(tag)
  result.className = `visual-system__${className}`
  if (text) result.textContent = text
  return result
}

function baseFixture(dark: boolean, dir: 'ltr' | 'rtl', title: string) {
  const style = document.createElement('style')
  style.textContent = fixtureCss
  const root = document.createElement('main')
  root.className = 'visual-system'
  root.dataset.testid = 'visual-system'
  root.dir = dir
  root.append(style)
  root.append(element('h1', 'title', title))
  root.append(element('p', 'description', `${dark ? 'Dark' : 'Light'} theme · ${dir.toUpperCase()} · Inter · semantic foregrounds and states`))
  const palette = new PaletteModule({ id: 'visual', accentColor: colord('#ffcb00'), useDarkTheme: dark, target: root })
  root.dataset.theme = palette.useDarkTheme ? 'dark' : 'light'
  document.body.append(root)
  return root
}

export async function settleFixture(root: HTMLElement) {
  await waitForLitTree(root, 5)
  await document.fonts.ready
  // Freeze motion only inside this visual fixture, including nested Shadow DOM.
  // Geometry/focus/hover are still driven by the real components and browser input.
  const freeze = (parent: Element | ShadowRoot) => {
    for (const child of parent.querySelectorAll('*')) {
      if (!child.shadowRoot) continue
      const style = document.createElement('style')
      style.textContent = '*, *::before, *::after { transition: none !important; animation: none !important; }'
      child.shadowRoot.append(style)
      freeze(child.shadowRoot)
    }
  }
  freeze(root)
}

export async function controlMatrix(dark: boolean, dir: 'ltr' | 'rtl') {
  const root = baseFixture(dark, dir, 'Altegio UI · control families')
  const grid = element('div', 'grid')
  for (const name of ['Size / state', 'Button', 'Text field', 'Select', 'Date picker']) {
    grid.append(element('strong', 'heading', name))
  }
  for (const { size, state, caption } of controlRows) {
    grid.append(element('span', 'caption', caption))
    const controls = [buttonFixture(size, state), ...(['text', 'select', 'date'] as const).map((kind) => fieldFixture(kind, size, state))]
    controls.forEach((control, index) => {
      control.dataset.row = `${size}-${state}`
      control.dataset.column = String(index)
      grid.append(control)
    })
  }
  const footer = element('div', 'footer')
  footer.innerHTML = '<alt-core-checkbox label-text="Accept terms"></alt-core-checkbox><alt-core-brand-button text="WhatsApp"></alt-core-brand-button><alt-core-tag variant="success">Available</alt-core-tag><alt-core-tag variant="danger">Canceled</alt-core-tag><alt-core-tag variant="warning">Attention</alt-core-tag><alt-core-toggle label-text="Reminders"></alt-core-toggle><alt-core-toggle checked label-text="Enabled"></alt-core-toggle>'
  root.append(grid, footer)
  await settleFixture(root)
  return root
}

export async function composedForm(dark: boolean, dir: 'ltr' | 'rtl') {
  const root = baseFixture(dark, dir, 'Altegio UI · appointment form')
  const toolbar = element('div', 'toolbar')
  toolbar.setAttribute('role', 'toolbar')
  toolbar.setAttribute('aria-label', 'Appointment actions')
  const focusButton = buttonFixture('medium', 'default')
  focusButton.label = 'New appointment'
  focusButton.iconLeft = altCalendar2
  focusButton.fullWidth = false
  const search = fieldFixture('text', 'medium', 'default')
  search.labelText = ''
  search.accessibleName = 'Search customers'
  search.value = ''
  search.placeholder = 'Search customers'
  search.style.flex = '1'
  const filters = fieldFixture('select', 'medium', 'default')
  filters.labelText = ''
  filters.accessibleName = 'City filter'
  filters.style.width = '220px'
  toolbar.append(focusButton, search, filters)
  const form = element('form', 'form')
  form.setAttribute('aria-label', 'Appointment details')
  form.append(fieldFixture('text', 'medium', 'hint'), fieldFixture('select', 'medium', 'error'), fieldFixture('date', 'medium', 'long'))
  const actions = element('div', 'actions')
  const cancel = buttonFixture('medium', 'default')
  cancel.label = 'Cancel'
  cancel.variant = 'outline'
  cancel.fullWidth = false
  const submit = buttonFixture('medium', 'loading')
  submit.label = 'Saving appointment'
  submit.fullWidth = false
  actions.append(cancel, submit)
  root.append(toolbar, form, actions)
  await settleFixture(root)
  return { root, focusButton, search }
}

export function deepElement<K extends keyof HTMLElementTagNameMap>(root: Element | ShadowRoot, selector: K): HTMLElementTagNameMap[K]
export function deepElement(root: Element | ShadowRoot, selector: string): HTMLElement
export function deepElement(root: Element | ShadowRoot, selector: string): HTMLElement {
  const found = root.querySelector<HTMLElement>(selector)
  if (found) return found
  if (root instanceof Element && root.shadowRoot) {
    try {
      return deepElement(root.shadowRoot, selector)
    } catch {
      // Continue with light DOM descendants.
    }
  }
  for (const child of root.querySelectorAll('*')) {
    if (!child.shadowRoot) continue
    try {
      return deepElement(child.shadowRoot, selector)
    } catch {
      // Continue in sibling shadow roots.
    }
  }
  throw new Error(`Missing visual-fixture element: ${selector}`)
}

export function nativeButton(button: Element) {
  return deepElement(button, 'button')
}
