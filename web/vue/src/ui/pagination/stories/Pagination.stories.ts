import type { Meta, StoryObj } from '@storybook/vue3'

import { AltPagination } from '~vue/ui/pagination'
import { type IAltVuePaginationProps } from '~vue/ui/pagination/models/types'
import altCorePaginationStoryMeta from '~core/ui/pagination/stories/Pagination.stories'

type TVuePaginationStoryMeta = IAltVuePaginationProps

/**
 * Vue wrapper for Core Pagination
 */
const meta: Meta<TVuePaginationStoryMeta> = {
  title: '⚠️ Pagination',
  id: 'pagination',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    components: { AltPagination },
    setup() {
      return { args }
    },
    template: `
      <AltPagination v-bind="args">
      </AltPagination>
    `,
  }),
  argTypes: { ...altCorePaginationStoryMeta.argTypes },
  args: { ...altCorePaginationStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
