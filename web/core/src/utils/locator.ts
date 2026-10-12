import type { ReactiveController, ReactiveControllerHost } from 'lit'
import type { ReactiveElement } from 'lit'

/**
 * Интерфейс хоста, который может использовать LocatorController.
 * Расширяет ReactiveControllerHost из библиотеки lit и добавляет свойство locator.
 */
interface ILocatorHost extends ReactiveControllerHost, HTMLElement {
  locator?: string
}

/**
 * Контроллер, который поддерживает атрибут data-locator в актуальном состоянии.
 * Приоритет: проп locator → уже выставленный потребителем data-locator → имя тега.
 */
class LocatorController implements ReactiveController {
  constructor(
    private host: ILocatorHost,
    private fallback: string,
  ) {
    this.host.addController(this)
  }

  /**
   * Применяет значение локатора к хосту.
   */
  private apply() {
    if (this.host.locator) {
      this.host.dataset.locator = this.host.locator

      return
    }

    if (!this.host.dataset.locator) {
      this.host.dataset.locator = this.fallback
    }
  }

  /**
   * Метод жизненного цикла, вызываемый при подключении хоста к DOM.
   */
  hostConnected() {
    this.apply()
  }

  /**
   * Метод жизненного цикла, вызываемый после обновления хоста.
   * Нужен, чтобы динамическое изменение locator доезжало до data-locator.
   */
  hostUpdated() {
    this.apply()
  }
}

/**
 * Тип элемента с прикреплённым контроллером локатора.
 */
type TLocatorElement = ILocatorHost & {
  _locatorController?: LocatorController
  connectedCallback?: () => void
}

/**
 * Тип конструктора для классов, которые могут использовать декоратор withLocator.
 */
type TConstructor<T> = {
  new (...args: unknown[]): T
  prototype: T & { connectedCallback?: () => void }
}

/**
 * Декоратор для классов, который делает локатор компонента управляемым снаружи.
 *
 * Объявляет реактивное свойство locator и выставляет data-locator по правилу:
 * проп locator → уже выставленный потребителем data-locator → fallback (имя тега).
 *
 * Переобъявляет свойство locator через createProperty и затирает опции локального @property locator, если он объявлен в классе.
 * Порядок декораторов важен: @withLocator должен стоять ниже @customElement, иначе observedAttributes не успеет подхватить locator и путь через атрибут молча перестанет работать (путь через DOM-свойство продолжит работать).
 * Если locator был задан, а затем сброшен в undefined, data-locator сохраняет прежнее значение и не возвращается к имени тега.
 *
 * @example
 * ```ts
 * @customElement(tagName)
 * @withLocator(tagName)
 * class MyElement extends LitElement {}
 * ```
 *
 * @param fallback - Значение data-locator по умолчанию, обычно имя тега.
 * @returns Декоратор класса.
 */
export const withLocator = (fallback: string) => {
  return <T extends object>(target: TConstructor<T>) => {
    (target as unknown as typeof ReactiveElement).createProperty(
      'locator',
      {
        type: String,
        attribute: 'locator',
      },
    )

    const originalConnectedCallback = target.prototype.connectedCallback

    target.prototype.connectedCallback = function(this: TLocatorElement) {
      if (!this._locatorController) {
        this._locatorController = new LocatorController(
          this,
          fallback,
        )
      }

      originalConnectedCallback?.call(this)
    }
  }
}
