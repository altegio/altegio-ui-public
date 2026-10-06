import { ref, watch } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import type { TYCoreTabsStoryMeta } from '~core/ui/tabs/stories/Tabs.stories.ts'
import yCoreTabsStoryMeta from '~core/ui/tabs/stories/Tabs.stories.ts'
import type { IYVueCoreTabsProps, IYVueTabsProps } from '~web/vue/src'
import { YTabs } from '~web/vue/src'
import { getComponentStateTable } from '~shared/.storybook/tables'
import { YTab } from '~vue/ui/tab'

type TVueTabsStoryMeta = IYVueTabsProps & IYVueCoreTabsProps & TYCoreTabsStoryMeta

/**
 * Vue-обертка над Core Tabs
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
    components: { YTabs, YTab },
    setup() {
      const valueRef = ref<number | undefined>(args.modelValue)

      watch(() => args.modelValue, (newValue: number | undefined) => {
        valueRef.value = newValue
      })
      return { args, valueRef }
    },
    template: `
      <YTabs
        :tabs="args.tabs"
        :modelValue="valueRef"
        @update:modelValue="valueRef = $event"
      >
        <template v-if="args.showDefaultSlot" #default>
          <YTab
            v-for="(tab, idx) in args.tabs.slice(0, 3)"
            :key="idx"
            v-bind="tab"
            :active="idx === valueRef"
            @click="valueRef = idx"
          ></YTab>
        </template>
      </YTabs>
    `,
  }),
  argTypes: {
    tabs: yCoreTabsStoryMeta.argTypes?.tabs,
    showDefaultSlot: yCoreTabsStoryMeta.argTypes?.showDefaultSlot,
    modelValue: {
      type: 'number',
      description: 'Индекс активного Tab\'а',
      ...getComponentStateTable(0),
    },
  },
  args: {
    tabs: yCoreTabsStoryMeta.args?.tabs,
    showDefaultSlot: yCoreTabsStoryMeta.args?.showDefaultSlot,
    modelValue: 0,
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
