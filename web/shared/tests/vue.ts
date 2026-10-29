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
 * Test helper for Vue components.
 * @param component - Vue component under test.
 * @param defaultOptions - Default mounting options.
 * @returns {
 *  wrapper: VueWrapper<ComponentPublicInstance>,
 *  updateComponent: (options: ComponentMountingOptions<ComponentPublicInstance>) => Promise<void>,
 *  resetComponent: () => Promise<void>,
 *  removeComponent: () => void,
 *  initCoreComponent: (tagName: string, coreComponent: CustomElementConstructor) => void,
 * } The wrapper plus helpers to update, reset and remove it and to register the core component.
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


  const updateTestBed = async(options?: ComponentMountingOptions<T> & { providers?: Record<string, unknown> }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
    wrapper.vm.componentProps = (options?.props as any) || {}
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
    wrapper.vm.componentSlots = (options?.slots as any) || {}
    wrapper.vm.componentProviders = options?.providers || {}

    await wrapper.vm.$nextTick()
  }

  /**
   * Registers the core component
   * @param tagName - Core component tag name
   * @param coreComponent - Core component constructor
   */
  const initCoreComponent = (tagName: string, coreComponent: CustomElementConstructor) => {
    if (!customElements.get(tagName)) {
      customElements.define(tagName, coreComponent)
    }
  }

  /**
   * Updates the component
   * @param options - Mounting options to apply
   */
  const updateComponent = async(options?: ComponentMountingOptions<T>) => {
    await updateTestBed(options)
  }

  /**
   * Resets the component to its default state
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
   * Removes the component
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
