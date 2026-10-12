import type { EmbeddedViewRef, TemplateRef } from '@angular/core'

export const hasContent = (viewRef: EmbeddedViewRef<unknown>): boolean => {
  const hasActualContent = viewRef.rootNodes.some((node) => {
    return node instanceof HTMLElement
  })
  return hasActualContent
}

export const checkMultipleSlots =
(templates: Record<string, TemplateRef<unknown> | undefined>):
Record<string, boolean> => Object.fromEntries(Object.entries(templates)
  .map(([key, template]) => {
    if (!template) return [key, false]
    const view = template.createEmbeddedView({})
    const hasActualContent = hasContent(view)
    view.destroy()
    return [key, hasActualContent]
  }))
