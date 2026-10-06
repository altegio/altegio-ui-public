import type { ReactiveController, ReactiveControllerHost } from 'lit'

/**
 * Интерфейс для хоста, который может использовать EventInterceptorController.
 * Расширяет ReactiveControllerHost из библиотеки lit и добавляет свойства disabled, loading и readonly
 * и методы для управления слушателями событий.
 */
interface IEventInterceptorHost extends ReactiveControllerHost {
  disabled?: boolean
  loading?: boolean
  readonly?: boolean
  addEventListener: (type: string, listener: EventListener, options?: boolean | AddEventListenerOptions) => void
  removeEventListener: (type: string, listener: EventListener, options?: boolean | EventListenerOptions) => void
}

/**
 * Тип, описывающий элемент с контроллером перехвата событий.
 * Расширяет IEventInterceptorHost и добавляет свойство для хранения экземпляра контроллера
 * и опциональный метод connectedCallback.
 */
type TEventInterceptorElement = IEventInterceptorHost & {
  _eventInterceptor?: EventInterceptorController
  connectedCallback?: () => void
}

/**
 * Контроллер для перехвата и блокировки событий DOM.
 * Реализует интерфейс ReactiveController из библиотеки lit.
 * Используется для предотвращения обработки событий, когда элемент отключен (disabled), загружается (loading) или только для чтения (readonly).
 */
class EventInterceptorController implements ReactiveController {
  private disabledOrLoadingEvents = [
    'click',
    'dblclick',
    'mousedown',
    'mouseenter',
    'mouseleave',
    'mousemove',
    'mouseover',
    'mouseout',
    'mouseup',
    'keydown',
    'keypress',
    'keyup',
    'blur',
    'change',
    'focus',
    'focusin',
    'focusout',
    'input',
    'invalid',
    'reset',
    'search',
    'select',
    'submit',
    'drag',
    'dragend',
    'dragenter',
    'dragleave',
    'dragover',
    'dragstart',
    'drop',
    'copy',
    'cut',
    'paste',
    'touchcancel',
    'touchend',
  ]

  private readonlyEvents = [
    'keydown',
    'keypress',
    'keyup',
    'change',
    'input',
    'invalid',
    'reset',
    'search',
    'select',
    'submit',
    'drag',
    'dragend',
    'dragenter',
    'dragleave',
    'dragover',
    'dragstart',
    'drop',
    'cut',
    'paste',
  ]

  /**
   * Флаг, указывающий, активны ли в данный момент слушатели для disabled/loading.
   */
  private isDisabledOrLoadingListening = false

  /**
   * Флаг, указывающий, активны ли в данный момент слушатели для readonly.
   */
  private isReadonlyListening = false

  /**
   * Создает экземпляр контроллера и регистрирует его в хосте.
   * @param host - Элемент-хост, к которому прикрепляется контроллер
   */
  constructor(private host: IEventInterceptorHost) {
    this.host.addController(this)
  }

  /**
   * Обработчик событий, который блокирует их распространение и действия по умолчанию.
   * @param e - Объект события DOM
   */
  private handleEvent = (e: Event) => {
    if (e.type === 'keydown') {
      const keyEvent = e as KeyboardEvent
      // набор клавиш для навигации
      const navigationKeys = ['Tab']
      const ctrlComboKeys = ['KeyA', 'KeyC']

      // разрешаем копирование и выделение
      if ((keyEvent.ctrlKey || keyEvent.metaKey) && ctrlComboKeys.includes(keyEvent.code)) return

      // разрешаем навигацию по странице клавишами
      if (navigationKeys.includes(keyEvent.key)) return
    }

    e.preventDefault()
    e.stopPropagation()
    e.stopImmediatePropagation()
  }

  /**
   * Настраивает слушатели событий для disabled/loading состояний.
   * @param shouldListen - Флаг, указывающий, должны ли быть активированы слушатели
   */
  private setupDisabledAndLoadingListeners(shouldListen: boolean) {
    if (shouldListen === this.isDisabledOrLoadingListening) return

    this.disabledOrLoadingEvents.forEach((eventName) => {
      if (shouldListen) {
        this.host.addEventListener(
          eventName,
          this.handleEvent,
          { capture: true },
        )
      } else {
        this.host.removeEventListener(
          eventName,
          this.handleEvent,
          { capture: true },
        )
      }
    })

    this.isDisabledOrLoadingListening = shouldListen
  }

  /**
   * Настраивает слушатели событий для readonly состояния.
   * @param shouldListen - Флаг, указывающий, должны ли быть активированы слушатели
   */
  private setupReadonlyListeners(shouldListen: boolean) {
    if (shouldListen === this.isReadonlyListening) return

    this.readonlyEvents.forEach((eventName) => {
      if (shouldListen) {
        this.host.addEventListener(
          eventName,
          this.handleEvent,
          { capture: true },
        )
      } else {
        this.host.removeEventListener(
          eventName,
          this.handleEvent,
          { capture: true },
        )
      }
    })

    this.isReadonlyListening = shouldListen
  }

  /**
   * Обновляет состояние слушателей в зависимости от свойств хоста.
   */
  private setupListeners() {
    const isDisabledOrLoading = Boolean(this.host.disabled) || Boolean(this.host.loading)
    const isReadonly = Boolean(this.host.readonly)

    this.setupReadonlyListeners(isReadonly && !isDisabledOrLoading)
    this.setupDisabledAndLoadingListeners(isDisabledOrLoading)
  }

  /**
   * Метод жизненного цикла, вызываемый при подключении хоста к DOM.
   * Активирует слушатели событий, если хост отключен (disabled) или загружается (loading) или доступен только для чтения (readonly).
   */
  hostConnected() {
    this.setupListeners()
  }

  /**
   * Метод жизненного цикла, вызываемый при отключении хоста от DOM.
   * Деактивирует все слушатели событий.
   */
  hostDisconnected() {
    this.setupDisabledAndLoadingListeners(false)
    this.setupReadonlyListeners(false)
  }

  /**
   * Метод жизненного цикла, вызываемый при обновлении хоста.
   * Обновляет состояние слушателей событий в зависимости от свойств disabled, loading и readonly.
   */
  hostUpdated() {
    this.setupListeners()
  }
}

/**
 * Тип, описывающий объект с свойствами disabled, loading и readonly.
 */
type HasDisabledOrLoadingOrReadonly = {
  disabled: boolean | undefined
  loading?: boolean
  readonly?: boolean
}

/**
 * Тип, описывающий объект с опциональным методом connectedCallback.
 */
type HasConnectedCallback = {
  connectedCallback?: () => void
}

/**
 * Тип конструктора для классов, которые могут использовать декоратор interceptEvents.
 */
type Constructor<T> = {
  new (...args: unknown[]): T
  prototype: T & HasConnectedCallback
}

/**
 * Декоратор для классов, который добавляет функциональность перехвата событий.
 * Когда элемент отключен (disabled = true) или загружается (loading = true) или доступен только для чтения (readonly = true),
 * все DOM события будут перехватываться и блокироваться.
 *
 * @example
 * ```ts
 * @interceptEvents()
 * class MyElement extends LitElement {
 *   @property({ type: Boolean, reflect: true })
 *   disabled = false;
 *
 *   @property({ type: Boolean, reflect: true })
 *   loading = false;
 *
 *   @property({ type: Boolean, reflect: true })
 *   readonly = false;
 *
 *   // ... остальной код элемента
 * }
 * ```
 *
 * @returns Декоратор класса, который добавляет контроллер перехвата событий
 */
export const interceptEvents = <T extends HasDisabledOrLoadingOrReadonly>() => {
  return (target: Constructor<T>) => {
    const originalConnectedCallback = target.prototype.connectedCallback

    target.prototype.connectedCallback = function(this: T & TEventInterceptorElement) {
      if (!this._eventInterceptor) {
        this._eventInterceptor = new EventInterceptorController(this)
      }

      if (originalConnectedCallback) {
        originalConnectedCallback.call(this)
      }
    }
  }
}
