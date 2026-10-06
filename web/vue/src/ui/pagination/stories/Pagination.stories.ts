import type { Meta, StoryObj } from '@storybook/vue3'

import { YPagination } from '~vue/ui/pagination'
import { type IYVuePaginationProps } from '~vue/ui/pagination/models/types'
import yCorePaginationStoryMeta from '~core/ui/pagination/stories/Pagination.stories'

type TVuePaginationStoryMeta = IYVuePaginationProps

/**
 * Vue-обертка над Core Pagination
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
    components: { YPagination },
    setup() {
      return { args }
    },
    template: `
      <YPagination v-bind="args">
      </YPagination>
    `,
  }),
  argTypes: { ...yCorePaginationStoryMeta.argTypes },
  args: { ...yCorePaginationStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
