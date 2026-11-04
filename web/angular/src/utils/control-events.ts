import type { DestroyRef } from '@angular/core'
import type { NgControl } from '@angular/forms'
import type { AbstractControl } from '@angular/forms'
import { FormResetEvent } from '@angular/forms'
import { registerFormResetHandler } from '~core/utils/a11y/form-associated'

/** Observes the current control, including a replacement [formControl], until the adapter is destroyed. */
export const observeControlEvents = (
  getControl: () => NgControl['control'] | undefined,
  changed: () => void,
  destroyRef: DestroyRef,
) => {
  let current: NgControl['control'] | undefined
  let subscription: { unsubscribe: () => void } | undefined
  destroyRef.onDestroy(() => { subscription?.unsubscribe() })

  return () => {
    const next = getControl()
    if (current === next) return

    subscription?.unsubscribe()
    current = next
    subscription = next?.events.subscribe(changed)
    changed()
  }
}

/** Use Angular's value only when its model was actually reset during the native reset event. */
export const registerControlReset = (
  element: HTMLElement,
  getRoot: () => AbstractControl | null | undefined,
  restore: () => boolean,
  destroyRef: DestroyRef,
) => {
  let modelResetVersion = 0
  let versionBeforeReset = 0
  let nativeReset: Event | undefined
  let subscription: { unsubscribe: () => void } | undefined
  const handleReset = (event: Event) => {
    if (event.target !== (element as HTMLElement & { readonly form: HTMLFormElement | null }).form) return

    subscription?.unsubscribe()
    subscription = getRoot()?.events.subscribe((modelEvent) => {
      if (modelEvent instanceof FormResetEvent) modelResetVersion++
    })
    nativeReset = event
    versionBeforeReset = modelResetVersion
  }
  const scope = element.getRootNode()
  scope.addEventListener('reset', handleReset, true)
  const remove = registerFormResetHandler(element, () => Boolean(nativeReset && modelResetVersion > versionBeforeReset && restore()))
  destroyRef.onDestroy(() => {
    remove()
    subscription?.unsubscribe()
    scope.removeEventListener('reset', handleReset, true)
  })
}
