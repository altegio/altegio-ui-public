export interface ITransitionClasses {
  enter: string
  enterActive: string
  enterTo: string
  leave: string
  leaveActive: string
  leaveTo: string
  noTransition: string
}

export interface IElementTransition {
  enter: () => Promise<void>
  leave: () => Promise<void>
  abortLeave: () => void
  abortEnter: () => void
}

export const createTransition = (element: HTMLElement, classes: ITransitionClasses): IElementTransition => {
  const handleTransition = (
    initialClass: string,
    activeClass: string,
    toClass: string,
  ): Promise<void> => {
    return new Promise((resolve) => {
      // Начальное состояние
      element.classList.add(initialClass)

      // Форсируем reflow
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      element.offsetHeight

      // Добавляем активные классы
      element.classList.add(activeClass)
      element.classList.add(toClass)
      element.classList.remove(initialClass)
      // Проверяем, есть ли transition на элементе
      const computedStyle = window.getComputedStyle(element)
      const hasTransition = computedStyle.transitionDuration !== '0s'

      if (!hasTransition) {
        element.classList.remove(activeClass)
        element.classList.remove(toClass)
        resolve()
        return
      }

      const onEnd = (event: TransitionEvent) => {
        if (event.target !== element) return

        element.classList.remove(activeClass)
        element.classList.remove(toClass)
        element.removeEventListener(
          'transitionend',
          onEnd,
        )
        resolve()
      }

      element.addEventListener(
        'transitionend',
        onEnd,
      )
    })
  }

  const abort = (...abortClasses: string[]) => {
    element.classList.add(classes.noTransition)
    element.classList.remove(...abortClasses)

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    element.offsetHeight

    requestAnimationFrame(() => {
      element.classList.remove(classes.noTransition)
    })
  }

  return {
    enter: () => handleTransition(
      classes.enter,
      classes.enterActive,
      classes.enterTo,
    ),
    leave: () => handleTransition(
      classes.leave,
      classes.leaveActive,
      classes.leaveTo,
    ),
    abortLeave: () => {
      abort(classes.leaveTo)
    },
    abortEnter: () => {
      abort(classes.enterTo)
    },
  }
}
