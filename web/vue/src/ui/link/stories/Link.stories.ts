import type { Meta, StoryObj } from '@storybook/vue3'
import { computed } from 'vue'

import { AltLink } from '~vue/ui/link'
import { type IAltVueLinkProps } from '~vue/ui/link/models/types'
import altCoreLinkStoryMeta, { type IAltCoreLinkStoryProps } from '~core/ui/link/stories/Link.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { storyControlsTable } from '~shared/.storybook/tables'
import { altSearch } from '~shared/icons/build/alt-search.icon'
import { AltIcon } from '~vue/ui/icon'

type TVueLinkStoryMeta = IAltVueLinkProps & IAltCoreLinkStoryProps

/**
 * Vue wrapper for CoreLink
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
    components: { AltLink, AltIcon },
    setup() {
      const computedText = computed(() => args.isLongText ? LOREM_IPSUM : String(args.text))

      const showIcon = computed(() => Boolean(args.showIcon))

      return { args, computedText, showIcon, altSearch }
    },
    template: `
      <AltLink v-bind="args">
        <template #default>
          <alt-core-icon
            v-if="showIcon"
            :icon="altSearch"
            size="16px"
          />
          {{ computedText }}
        </template>
      </AltLink>
    `,
  }),
  argTypes: {
    ...altCoreLinkStoryMeta.argTypes,
    showIcon: {
      type: 'boolean',
      description: 'Show an icon in the link',
      ...storyControlsTable,
    },
  },
  args: {
    ...altCoreLinkStoryMeta.args,
    showIcon: false,
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
