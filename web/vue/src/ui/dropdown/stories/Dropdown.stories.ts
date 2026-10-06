import type { Meta, StoryObj } from '@storybook/vue3'
import { shallowRef, ref } from 'vue'

import { YDropdown } from '~vue/ui/dropdown'
import yCoreDropdownStoryMeta from '~core/ui/dropdown/stories/Dropdown.stories'
import { type IYVueDropdownProps } from '~vue/ui/dropdown/models/types'

type TVueDropdownStoryMeta = IYVueDropdownProps

/**
 * Vue wrapper for DropdownCell
 */
const meta: Meta<TVueDropdownStoryMeta> = {
  title: '✅ Dropdown',
  id: 'dropdown',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    components: { YDropdown },
    setup() {
      const show = ref(true)
      return { args, cachedDropdown: shallowRef(YDropdown), show }
    },
    template: `
      <button @click="show = !show">show</button>
      
      <keep-alive>
        <component v-if="show" :is="cachedDropdown" v-bind="args" trigger="hover">
          <template #activator>
            Activator1
          </template>

          <template #content>
            Content1
          </template>
        </component>
        
        <component v-else :is="cachedDropdown" v-bind="args" trigger="click">
          <template #activator>
            Activator2
          </template>

          <template #content>
            Content2
          </template>
        </component>
      </keep-alive>
    `,
  }),
  argTypes: { ...yCoreDropdownStoryMeta.argTypes },
  args: { ...yCoreDropdownStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
