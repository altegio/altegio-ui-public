import type { Meta, StoryObj } from '@storybook/vue3'
import { shallowRef, ref } from 'vue'

import { AltDropdown } from '~vue/ui/dropdown'
import altCoreDropdownStoryMeta from '~core/ui/dropdown/stories/Dropdown.stories'
import { type IAltVueDropdownProps } from '~vue/ui/dropdown/models/types'

type TVueDropdownStoryMeta = IAltVueDropdownProps

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
    components: { AltDropdown },
    setup() {
      const show = ref(true)
      return { args, cachedDropdown: shallowRef(AltDropdown), show }
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
  argTypes: { ...altCoreDropdownStoryMeta.argTypes },
  args: { ...altCoreDropdownStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
