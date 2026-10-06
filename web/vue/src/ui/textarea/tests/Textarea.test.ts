import { describe, expect, it, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'

import { YCoreTextareaTagName } from '~shared/constants'
import { YTextarea } from '~vue/ui/textarea'
import { YCoreTextarea } from '~core/ui/textarea'

const tagName = YCoreTextareaTagName

describe(
  'Vue/YTextarea',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCoreTextarea,
        )
      }
    })

    describe(
      'Unit',
      () => {
        describe('Component', () => {
          it('должен корректно отрисоваться', () => {
            const wrapper = mount(YTextarea)
            expect(wrapper.find(tagName).exists()).toBe(true)
          })

          it('должен передавать v-model в value', () => {
            const wrapper = mount(YTextarea, { props: { modelValue: 'Test text' } })

            const coreElement = wrapper.find(tagName).element as YCoreTextarea
            expect(coreElement.value).toBe('Test text')
          })

          it('должен обновлять modelValue при вводе', () => {
            const wrapper = mount(YTextarea, { props: { modelValue: '' } })

            wrapper.vm.$emit('update:modelValue', 'New value')
            expect(wrapper.emitted('update:modelValue')).toBeTruthy()
            expect(wrapper.emitted('update:modelValue')![0]).toEqual(['New value'])
          })
        })

        describe('Events', () => {
          it('должен испускать события фокуса', () => {
            const wrapper = mount(YTextarea)

            wrapper.vm.$emit('focus', { detail: { event: new Event('focus') } })
            expect(wrapper.emitted('focus')).toBeTruthy()

            wrapper.vm.$emit('blur', { detail: { event: new Event('blur') } })
            expect(wrapper.emitted('blur')).toBeTruthy()
          })

          it('должен испускать события keydown', () => {
            const wrapper = mount(YTextarea)

            wrapper.vm.$emit('keydown', { detail: { event: new KeyboardEvent('keydown'), code: 'KeyA' } })
            expect(wrapper.emitted('keydown')).toBeTruthy()
          })
        })

        describe('Props', () => {
          it('должен корректно применять пропсы', () => {
            const wrapper = mount(YTextarea, {
              props: {
                placeholder: 'Test placeholder',
                disabled: true,
                rows: 5,
                maxlength: 100,
              },
            })

            const coreElement = wrapper.find(tagName).element as YCoreTextarea
            expect(coreElement.placeholder).toBe('Test placeholder')
            expect(coreElement.disabled).toBe(true)
            expect(coreElement.rows).toBe(5)
            expect(coreElement.maxlength).toBe(100)
          })
        })

        describe('Slots', () => {
          it('должен корректно отображать слоты', () => {
            const wrapper = mount(YTextarea, {
              slots: {
                before: 'Before content',
                after: 'After content',
              },
            })

            expect(wrapper.html()).toContain('Before content')
            expect(wrapper.html()).toContain('After content')
          })
        })
      },
    )
  },
)
