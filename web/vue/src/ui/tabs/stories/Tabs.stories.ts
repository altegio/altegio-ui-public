import { ref, watch } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import type { TAltCoreTabsStoryMeta } from '~core/ui/tabs/stories/Tabs.stories.ts'
import altCoreTabsStoryMeta from '~core/ui/tabs/stories/Tabs.stories.ts'
import type { IAltVueCoreTabsProps, IAltVueTabsProps } from '~web/vue/src'
import { AltTabs } from '~web/vue/src'
import { getComponentStateTable } from '~shared/.storybook/tables'
import { AltTab } from '~vue/ui/tab'

type TVueTabsStoryMeta = IAltVueTabsProps & IAltVueCoreTabsProps & TAltCoreTabsStoryMeta

/**
 * Vue wrapper for Core Tabs
 */
const meta: Meta<TVueTabsStoryMeta> = {
  title: '✅ Tabs',
  id: 'tabs',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    components: { AltTabs, AltTab },
    setup() {
      const valueRef = ref<number | undefined>(args.modelValue)

      watch(() => args.modelValue, (newValue: number | undefined) => {
        valueRef.value = newValue
      })
      return { args, valueRef }
    },
    template: `
      <AltTabs
        :tabs="args.tabs"
        :modelValue="valueRef"
        @update:modelValue="valueRef = $event"
      >
        <template v-if="args.showDefaultSlot" #default>
          <AltTab
            v-for="(tab, idx) in args.tabs.slice(0, 3)"
            :key="idx"
            v-bind="tab"
            :active="idx === valueRef"
            @click="valueRef = idx"
          ></AltTab>
        </template>
      </AltTabs>
    `,
  }),
  argTypes: {
    tabs: altCoreTabsStoryMeta.argTypes?.tabs,
    showDefaultSlot: altCoreTabsStoryMeta.argTypes?.showDefaultSlot,
    modelValue: {
      type: 'number',
      description: 'Index of the active tab',
      ...getComponentStateTable(0),
    },
  },
  args: {
    tabs: altCoreTabsStoryMeta.args?.tabs,
    showDefaultSlot: altCoreTabsStoryMeta.args?.showDefaultSlot,
    modelValue: 0,
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
