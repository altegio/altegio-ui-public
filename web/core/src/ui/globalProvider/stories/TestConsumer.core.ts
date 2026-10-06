import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { consume } from '@lit/context'

import type { IQueueModule } from '../context'
import {
  globalContextCreated,
  QueueModule,
  type IGlobalContext,
} from '../context'

export const tagName = 'y-core-test-consumer'

@customElement(tagName)
export class YCoreTestConsumer extends LitElement {
  @consume({ context: globalContextCreated, subscribe: true })
  @state()
  private globalContext!: IGlobalContext

  @state()
  private defaultDelay = 0

  connectedCallback() {
    super.connectedCallback()

    // Подписываемся на обновление глобального контекста
    this.globalContext.onUpdated((module) => {
      // Если добавился новый модуль - подписываемся на его события
      if (module && module instanceof QueueModule) {
        this.setupModuleListeners(module)
      }

      this.requestUpdate()
    })

    // Подписываемся на все существующие модули очереди
    this.setupExistingModuleListeners()
  }

  /**
   * Устанавливает подписки на существующие модули очереди
   */
  private setupExistingModuleListeners() {
    // Получаем все модули из глобального контекста
    const modules = this.globalContext.getModules()

    // Отфильтровываем только модули QueueModule
    const queueModules = modules.filter((module) => module instanceof QueueModule)


    // Подписываемся на события каждого модуля
    queueModules.forEach((module) => {
      this.setupModuleListeners(module)
    })
  }

  protected renderModuleItems(module: IQueueModule) {
    const items = module.getItems()

    return items.length > 0
      ? items.map((item) => html`
          <div class="card bg-level-3">
            <div>Элемент ID: ${item.id}</div>
            
            <hr />
            <button
              data-item-id=${item.id}
              data-module-id=${module.id}
              @click=${this.onDeleteModuleItem}
            >Удалить элемент</button>
          </div>
        `)
      : html`<div>Элементов нет</div>`
  }

  protected renderModules() {
    // Получаем все модули из глобального контекста
    const modules = this.globalContext.getModules()

    // Отфильтровываем только модули QueueModule
    const queueModules = modules.filter((module) => module instanceof QueueModule) as IQueueModule[]

    return queueModules.length > 0
      ? queueModules.map((module) => {
        return html`
            <div class="card bg-level-2">
              <div>Модуль ID: ${module.id}</div>
              
              <hr />
              <button
                data-id=${module.id}
                @click=${this.onDeleteModule}
              >Удалить модуль</button>
              
              <hr />
              
              <div>Добавление элементов в очередь модуля</div>
              
              <br />
              
              <div class="wrap">
                <button
                  data-module-id=${module.id}
                  @click=${this.onAddModuleItem}
                >Добавить элемент</button>
                <button
                  data-module-id=${module.id}
                  @click=${this.onAddModuleItemDirectly}
                >Добавить элемент напрямую</button>
              </div>
              
              <hr />
              
              <div class="wrap">
                ${this.renderModuleItems(module)}
              </div>
            </div>
          `
      })
      : html`<div>Модулей очереди нет</div>`
  }

  private onDeleteModuleItem = (e: Event) => {
    const moduleId = (e.target as HTMLElement).dataset.moduleId
    const itemId = (e.target as HTMLElement).dataset.itemId

    if (!moduleId || !itemId) return

    // Получаем модуль напрямую из контекста
    const module = this.globalContext.getModule(moduleId) as IQueueModule | undefined
    if (!module || !(module instanceof QueueModule)) return

    // eslint-disable-next-line no-console
    console.log(
      '[onDeleteModuleItem]: Удаление элемента из модуля',
      module,
      moduleId,
      itemId,
    )

    module.removeItem(itemId)
  }


  private onAddModuleItem = (e: Event) => {
    const moduleId = (e.target as HTMLElement).dataset.moduleId

    if (!moduleId) return

    // Получаем модуль напрямую из контекста
    const module = this.globalContext.getModule(moduleId) as IQueueModule | undefined
    if (!module || !(module instanceof QueueModule)) return

    module.putItem({ id: Date.now().toString() })
  }


  private onAddModuleItemDirectly = (e: Event) => {
    const moduleId = (e.target as HTMLElement).dataset.moduleId
    if (!moduleId) return

    // Получаем модуль напрямую из контекста
    const module = this.globalContext.getModule(moduleId) as IQueueModule | undefined
    if (!module || !(module instanceof QueueModule)) return

    const itemId = Date.now().toString()
    module.queue[itemId] = { id: itemId }
  }

  private onAddModule = () => {
    // Создаем новый модуль напрямую
    const id = Date.now().toString()
    const module = new QueueModule({ id, defaultDelay: this.defaultDelay })

    // Добавляем его в глобальный контекст
    this.globalContext.putModule(module)

    // Подписка добавляется автоматически в обработчике globalContext.onUpdated
  }

  private setupModuleListeners(module: QueueModule) {
    // Подписываемся на события модуля
    module.onUpdated((item) => {
      // eslint-disable-next-line no-console
      console.log(
        `[module:${module.id}][updated]: Очередь обновилась`,
        item,
      )

      this.requestUpdate()
    })

    module.onCompleted((item) => {
      // eslint-disable-next-line no-console
      console.log(
        `[module:${module.id}][completed]: Очередь завершилась`,
        item,
      )
    })
  }

  private onDeleteModule = (e: Event) => {
    const id = (e.target as HTMLElement).dataset.id
    if (!id) return

    // Получаем модуль напрямую из контекста
    const module = this.globalContext.getModule(id) as IQueueModule | undefined
    if (!module || !(module instanceof QueueModule)) return

    // Очищаем очередь перед удалением
    module.clearAll()

    // Удаляем модуль
    this.globalContext.removeModule(id)
  }

  private onChangeDefaultDelay = (e: Event) => {
    const newDelay = Number((e.target as HTMLInputElement).value)
    this.defaultDelay = newDelay
  }

  static readonly styles = [
    css`
      .wrap {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }

      .card {
        border: 1px solid #000;
        padding: 10px;
      }

      .warning {
        background-color: #fff3cd;
        color: #856404;
        padding: 10px;
        border: 1px solid #ffeeba;
        border-radius: 4px;
        margin-bottom: 15px;
      }

      .module-info {
        background-color: #d4edda;
        color: #155724;
        padding: 10px;
        border: 1px solid #c3e6cb;
        border-radius: 4px;
        margin-bottom: 15px;
      }

      .info-message {
        background-color: #cce5ff;
        color: #004085;
        padding: 8px;
        border: 1px solid #b8daff;
        border-radius: 4px;
        margin-top: 10px;
        font-size: 0.9em;
      }

      .bg-level-1 {
        background-color: #f0f0f0;
      }

      .bg-level-2 {
        background-color: #e0e0e0;
      }

      .bg-level-3 {
        background-color: #d0d0d0;
      }
    `,
  ]

  protected render() {
    return html`
      <div class="card bg-level-1">
        <div>Управление модулями очереди</div>
        
        <br />
        
        <label>
          <span>Задержка по умолчанию:</span>
          <input
            type="number"
            .value=${this.defaultDelay.toString()}
            @input=${this.onChangeDefaultDelay}
          />
        </label>
        
        <div><small>Если задержка меньше или равна 0, таймер автоудаления не будет запущен для элементов очереди</small></div>
        
        <hr />
        
        <div class="wrap">
          <button
            @click=${this.onAddModule}
          >Добавить модуль</button>
        </div>

        <hr />

        <div class="wrap">
          ${this.renderModules()}
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [tagName]: YCoreTestConsumer
  }
}
