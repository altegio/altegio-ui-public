import type { Meta, StoryObj } from '@storybook/vue3'
import { computed } from 'vue'

import { YLink } from '~vue/ui/link'
import { type IYVueLinkProps } from '~vue/ui/link/models/types'
import yCoreLinkStoryMeta, { type IYCoreLinkStoryProps } from '~core/ui/link/stories/Link.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { storyControlsTable } from '~shared/.storybook/tables'
import { ySearch } from '~shared/icons/build/y-search.icon'
import { YIcon } from '~vue/ui/icon'

type TVueLinkStoryMeta = IYVueLinkProps & IYCoreLinkStoryProps

/**
 * Vue-обертка над CoreLink
 */
const meta: Meta<TVueLinkStoryMeta> = {
  title: '⚙️ Link',
  id: 'link',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    components: { YLink, YIcon },
    setup() {
      const computedText = computed(() => args.isLongText ? LOREM_IPSUM : String(args.text))

      const showIcon = computed(() => Boolean(args.showIcon))

      return { args, computedText, showIcon, ySearch }
    },
    template: `
      <YLink v-bind="args">
        <template #default>
          <y-core-icon
            v-if="showIcon"
            :icon="ySearch"
            size="16px"
          />
          {{ computedText }}
        </template>
      </YLink>
    `,
  }),
  argTypes: {
    ...yCoreLinkStoryMeta.argTypes,
    showIcon: {
      type: 'boolean',
      description: 'Показать иконку в ссылке',
      ...storyControlsTable,
    },
  },
  args: {
    ...yCoreLinkStoryMeta.args,
    showIcon: false,
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
