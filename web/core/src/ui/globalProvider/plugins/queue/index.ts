import type { IGlobalProviderPlugin } from '..'
import type { IGlobalContext, IQueueModule } from '../../context'
import { QueueModule } from '../../context'

/**
 * Queue plugin configuration
 */
export interface IQueuePluginConfig {

  /**
   * ID of the plugin and its queue module
   */
  id: string

  /**
   * Default delay for queue items
   */
  defaultDelay?: number
}

/**
 * GlobalProvider plugin that manages a queue module
 *
 * The plugin creates and owns a queue module, which is the
 * entry point to the queue features in the application.
 * The plugin ID is also used as the module ID.
 */
export class QueuePlugin implements IGlobalProviderPlugin {
  id: string
  private defaultDelay: number
  private context?: IGlobalContext
  private queueModule?: QueueModule

  /**
   * @param config Plugin configuration
   */
  constructor(config: IQueuePluginConfig) {
    this.id = config.id
    this.defaultDelay = config.defaultDelay || 0
  }

  /**
   * Initializes the plugin and adds its module to the context
   * @param context Global context
   */
  init(context: IGlobalContext): void {
    this.context = context

    // Reuse a module with the same ID if the context already has one
    const existingModule = context.getModule(this.id)

    if (!existingModule) {
      // Create a queue module with the plugin's ID
      this.queueModule = new QueueModule({
        id: this.id,
        defaultDelay: this.defaultDelay,
      })

      // Add it to the context
      context.putModule(this.queueModule)
    } else {
      // The module already exists: keep a reference to it
      this.queueModule = existingModule as QueueModule
    }
  }

  /**
   * Destroys the plugin and clears its state
   */
  destroy(): void {
    // Drop the module reference
    this.queueModule = undefined
    this.context = undefined
  }

  /**
   * Returns the queue module
   * @returns The queue module, or undefined before the plugin is initialized
   */
  getModule(): IQueueModule | undefined {
    if (!this.context) return undefined
    return this.queueModule
  }

  /**
   * Sets the module's default delay
   * @param delay New default delay
   */
  setDefaultDelay(delay: number): void {
    this.defaultDelay = delay

    // Update the module's delay when the module exists
    if (this.queueModule) {
      this.queueModule.editDefaultDelay(delay)
    }
  }

  /**
   * Returns the current default delay
   */
  getDefaultDelay(): number {
    return this.defaultDelay
  }
}
