import type { ReactiveController, ReactiveControllerHost } from 'lit'
import { getScrollBehavior } from './motion'

export interface IListboxControllerOptions {

  /** Number of options in the list */
  getOptionCount: () => number

  /** Option elements, in the order of the options */
  getOptionElements: () => ArrayLike<HTMLElement>

  /** Whether the list is shown */
  isOpen: () => boolean

  /** Whether typing filters the list: Home, End and Space then edit the text */
  isFilterable: () => boolean

  /**
   * Whether the input takes free text, as in an autocomplete: Enter without an active option
   * keeps its native meaning, such as submitting the form, instead of opening the list
   */
  isFreeText?: () => boolean

  open: () => void

  /** Hides the list, keeping focus in the input */
  close: () => void

  /** Selects the option at an index */
  select: (index: number, event: KeyboardEvent) => void
}

/**
 * Keyboard support of a combobox that opens a listbox, with DOM focus kept in the input
 * and the active option exposed with `aria-activedescendant`:
 * https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
 *
 * Down and Up open the list or move the active option, Home and End move it to the first and last option,
 * Enter (and Space without filtering) selects it, Escape closes the list and Tab closes it on the way out.
 */
export class ListboxController implements ReactiveController {
  activeIndex = -1 // Index of the option that has visual focus, -1 for none

  private readonly keyHandlers: Partial<Record<string, (event: KeyboardEvent) => void>> = {
    ArrowDown: (event) => { this.openOrMove(event, 1) },
    ArrowUp: (event) => { this.openOrMove(event, -1) },
    Home: (event) => { this.moveToEdge(event, 0) },
    End: (event) => { this.moveToEdge(event, this.options.getOptionCount() - 1) },
    Enter: (event) => { this.selectOrOpen(event) },
    ' ': (event) => { if (!this.options.isFilterable()) this.selectOrOpen(event) },
    Escape: (event) => {
      if (!this.options.isOpen()) return

      // Keep a surrounding modal open: the first Escape closes the list only
      event.preventDefault()
      event.stopPropagation()
      this.options.close()
    },
    Tab: () => { if (this.options.isOpen()) this.options.close() },
  }

  constructor(
    private readonly host: ReactiveControllerHost,
    private readonly options: IListboxControllerOptions,
  ) {
    host.addController(this)
  }

  hostConnected() {
    this.activeIndex = -1
  }

  /** Option element with visual focus while the list is shown */
  get activeOption(): HTMLElement | undefined {
    if (!this.options.isOpen() || this.activeIndex === -1) return undefined

    return this.options.getOptionElements()[this.activeIndex]
  }

  handleKeydown(event: KeyboardEvent) {
    if (event.isComposing || event.defaultPrevented) return

    this.keyHandlers[event.key]?.(event)
  }

  setActiveIndex(index: number) {
    this.activeIndex = index
    this.host.requestUpdate()

    void this.host.updateComplete.then(() => {
      this.activeOption?.scrollIntoView({
        behavior: getScrollBehavior(),
        block: 'nearest',
      })
    })
  }

  private openOrMove(event: KeyboardEvent, step: number) {
    event.preventDefault()

    if (!this.options.isOpen()) {
      this.options.open()
      return
    }

    const lastIndex = this.options.getOptionCount() - 1
    if (lastIndex === -1) return

    this.setActiveIndex(Math.max(0, Math.min(this.activeIndex + step, lastIndex)))
  }

  /** In a filterable combobox Home and End move the caret instead */
  private moveToEdge(event: KeyboardEvent, index: number) {
    if (!this.options.isOpen() || this.options.isFilterable() || index === -1) return

    event.preventDefault()
    this.setActiveIndex(index)
  }

  private get hasActiveOption() {
    return this.options.isOpen() && this.activeIndex !== -1 && this.activeIndex < this.options.getOptionCount()
  }

  private selectOrOpen(event: KeyboardEvent) {
    const { hasActiveOption } = this
    if (!hasActiveOption && this.options.isFreeText?.()) return

    event.preventDefault()

    if (hasActiveOption) {
      this.options.select(this.activeIndex, event)
      return
    }

    if (!this.options.isOpen()) this.options.open()
  }
}
