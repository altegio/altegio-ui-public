import type { IGlobalContext } from '../context'
export * from './i18n'
export * from './queue'
export * from './palette'

/**
 * Базовый интерфейс для плагинов глобального провайдера
 *
 * Этот интерфейс должны реализовывать все плагины для GlobalProvider.
 * Он определяет основные методы жизненного цикла плагина.
 *
 * @example
 * ```typescript
 * // Пример создания простого плагина
 * class MyPlugin implements IGlobalProviderPlugin {
 *   id = 'my-plugin';
 *
 *   init(context: IGlobalContext): void {
 *     // Инициализация плагина
 *     console.log('MyPlugin initialized');
 *   }
 *
 *   destroy(context: IGlobalContext): void {
 *     // Освобождение ресурсов
 *     console.log('MyPlugin destroyed');
 *   }
 * }
 * ```
 */
export interface IGlobalProviderPlugin {

  /**
   * Уникальный идентификатор плагина
   *
   * Должен быть уникальным среди всех используемых плагинов.
   * Используется для поиска плагинов в массиве плагинов GlobalProvider.
   */
  id: string

  /**
   * Метод инициализации плагина
   *
   * Вызывается автоматически при добавлении плагина в GlobalProvider.
   * Используется для настройки плагина и добавления данных в глобальный контекст.
   *
   * @param context - Глобальный контекст для взаимодействия
   */
  init(context: IGlobalContext): void

  /**
   * Метод уничтожения плагина
   *
   * Вызывается автоматически при удалении плагина из GlobalProvider.
   * Используется для освобождения ресурсов и очистки данных.
   * Необязательный метод - если не реализован, при удалении плагина никаких действий не выполняется.
   *
   * @param context - Глобальный контекст для взаимодействия
   */
  destroy?(context: IGlobalContext): void
}

/**
 * Инициализирует все переданные плагины
 *
 * Последовательно вызывает метод `init` для каждого плагина из массива.
 * Используется внутри GlobalProvider при инициализации или обновлении списка плагинов.
 *
 * @param plugins - Массив плагинов для инициализации
 * @param context - Глобальный контекст для передачи в плагины
 */
export function installPlugins(
  plugins: IGlobalProviderPlugin[] | undefined,
  context: IGlobalContext,
): void {
  if (!plugins?.length) return

  plugins.forEach((plugin) => {
    plugin.init(context)
  })
}

/**
 * Уничтожает все переданные плагины
 *
 * Последовательно вызывает метод `destroy` для каждого плагина из массива, если метод определен.
 * Используется внутри GlobalProvider при удалении или замене плагинов.
 *
 * @param plugins - Массив плагинов для уничтожения
 * @param context - Глобальный контекст для передачи в плагины
 */
export function uninstallPlugins(
  plugins: IGlobalProviderPlugin[] | undefined,
  context: IGlobalContext,
): void {
  if (!plugins?.length) return

  plugins.forEach((plugin) => {
    if (typeof plugin.destroy === 'function') {
      plugin.destroy(context)
    }
  })
}
