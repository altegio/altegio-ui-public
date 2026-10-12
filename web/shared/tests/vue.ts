import type { ComponentMountingOptions, VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import {
  defineComponent, ref, h, watch, provide,
  type ComponentPublicInstance,
} from 'vue'

export interface IUseVueTests<T> {
  wrapper: VueWrapper<ComponentPublicInstance>
  updateComponent: (options?: ComponentMountingOptions<T>) => Promise<void>
  resetComponent: () => Promise<void>
  removeComponent: () => void
  initCoreComponent: (tagName: string, coreComponent: CustomElementConstructor) => void
}

export interface ITestBedInstance<T> {
  componentSlots: ComponentMountingOptions<T>['slots']
  componentProps: ComponentMountingOptions<T>['props']
  componentProviders: Record<string, unknown>
}

/**
 * Хелпер для тестирования Vue компонентов.
 * @param component - Vue компонент для тестирования.
 * @param defaultOptions - Опции по умолчанию для монтирования.
 * @returns {
 *  wrapper: VueWrapper<ComponentPublicInstance>,
 *  updateComponent: (options: ComponentMountingOptions<ComponentPublicInstance>) => Promise<void>,
 *  resetComponent: () => Promise<void>,
 *  removeComponent: () => void,
 *  initCoreComponent: (tagName: string, coreComponent: CustomElementConstructor) => void,
 * } Объект с компонентом, функцией обновления, сброса, удаления и инициализации core компонента.
 */
export const useVueTests = <T>(
  component: T,
  defaultOptions?: ComponentMountingOptions<T>,
  providers?: Record<string, unknown>,
): IUseVueTests<T> => {
  const TestBed = defineComponent<T & ITestBedInstance<T>>({
    setup() {
      const componentSlots = ref<ComponentMountingOptions<T>['slots']>(defaultOptions?.slots)
      const componentProps = ref<ComponentMountingOptions<T>['props']>(defaultOptions?.props)
      const componentProviders = ref<Record<string, unknown>>(providers ?? {})

      watch(componentProviders, (newProviders) => {
        for (const key in newProviders) {
          provide(key, newProviders[key])
        }
      })

      return {
        componentSlots,
        componentProps,
        componentProviders,
      }
    },
    render(this: T & ITestBedInstance<T>) {
      const slots = Object.entries(this.componentSlots || {})
        .reduce<Record<string, () => unknown>>((acc, [slotKey, slotValue]) => {
        acc[slotKey] = () => slotValue
        return acc
      }, {})

      return h(
        component as ComponentPublicInstance<T>,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this.componentProps as any) || {},
        slots,
      )
    },
  })
  const wrapper = mount(TestBed) as VueWrapper<T & ITestBedInstance<T>>

  // eslint-disable-next-line complexity
  const updateTestBed = async(options?: ComponentMountingOptions<T> & { providers?: Record<string, unknown> }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
    wrapper.vm.componentProps = (options?.props as any) || {}
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
    wrapper.vm.componentSlots = (options?.slots as any) || {}
    wrapper.vm.componentProviders = options?.providers || {}

    await wrapper.vm.$nextTick()
  }

  /**
   * Инициализация core компонента
   * @param tagName - Имя тега core компонента
   * @param coreComponent - Конструктор core компонента
   */
  const initCoreComponent = (tagName: string, coreComponent: CustomElementConstructor) => {
    if (!customElements.get(tagName)) {
      customElements.define(tagName, coreComponent)
    }
  }

  /**
   * Обновление компонента
   * @param options - Опции для обновления
   */
  const updateComponent = async(options?: ComponentMountingOptions<T>) => {
    await updateTestBed(options)
  }

  /**
   * Сброс компонента к состоянию по умолчанию
   */
  const resetComponent = async() => {
    await updateTestBed({
      props: defaultOptions?.props,
      slots: defaultOptions?.slots,
      scopedSlots: defaultOptions?.scopedSlots,
      providers: Object.entries(wrapper.vm.componentProviders)
        .reduce<Record<string, unknown>>((acc, [key]) => {
          acc[key] = undefined
          return acc
        }, {}),
    })
  }

  /**
   * Удаление компонента
   */
  const removeComponent = () => {
    wrapper.unmount()
  }

  return {
    wrapper,
    updateComponent,
    resetComponent,
    removeComponent,
    initCoreComponent,
  }
}
