import type { IGlobalProviderPlugin } from '..'
import type { IGlobalContext, IQueueModule } from '../../context'
import { QueueModule } from '../../context'

/**
 * Конфигурация для инициализации плагина очереди
 */
export interface IQueuePluginConfig {

  /**
   * ID плагина и модуля очереди
   */
  id: string

  /**
   * Задержка по умолчанию для элементов очереди
   */
  defaultDelay?: number
}

/**
 * Плагин для управления модулем очереди в GlobalProvider
 *
 * Этот плагин создает и управляет модулем очереди, который служит
 * точкой доступа к функциональности очередей в приложении.
 * ID плагина используется также как ID для создаваемого модуля.
 */
export class QueuePlugin implements IGlobalProviderPlugin {
  id: string
  private defaultDelay: number
  private context?: IGlobalContext
  private queueModule?: QueueModule

  /**
   * @param config Конфигурация плагина
   */
  constructor(config: IQueuePluginConfig) {
    this.id = config.id
    this.defaultDelay = config.defaultDelay || 0
  }

  /**
   * Инициализирует плагин и добавляет модуль в контекст
   * @param context Глобальный контекст
   */
  init(context: IGlobalContext): void {
    this.context = context

    // Проверяем, существует ли уже модуль с нашим ID
    const existingModule = context.getModule(this.id)

    if (!existingModule) {
      // Создаем модуль очереди с тем же ID, что и у плагина
      this.queueModule = new QueueModule({
        id: this.id,
        defaultDelay: this.defaultDelay,
      })

      // Добавляем его в контекст
      context.putModule(this.queueModule)
    } else {
      // Если модуль уже существует, сохраняем ссылку на него
      this.queueModule = existingModule as QueueModule
    }
  }

  /**
   * Уничтожает плагин и очищает состояние
   */
  destroy(): void {
    // Очищаем ссылки на контекст и модуль
    this.queueModule = undefined
    this.context = undefined
  }

  /**
   * Получает модуль очереди
   * @returns Модуль очереди или undefined, если контекст не инициализирован
   */
  getModule(): IQueueModule | undefined {
    if (!this.context) return undefined
    return this.queueModule
  }

  /**
   * Устанавливает задержку по умолчанию для модуля
   * @param delay Новая задержка по умолчанию
   */
  setDefaultDelay(delay: number): void {
    this.defaultDelay = delay

    // Обновляем задержку в модуле, если он существует
    if (this.queueModule) {
      this.queueModule.editDefaultDelay(delay)
    }
  }

  /**
   * Получает текущую задержку по умолчанию
   */
  getDefaultDelay(): number {
    return this.defaultDelay
  }
}
