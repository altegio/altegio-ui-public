import type { Meta, StoryObj } from '@storybook/vue3'
import { useArgs } from 'storybook/preview-api'

import { AltPagination } from '~vue/ui/pagination'
import { type IAltVuePaginationProps } from '~vue/ui/pagination/models/types'
import altCorePaginationStoryMeta from '~core/ui/pagination/stories/Pagination.stories'

type TVuePaginationStoryMeta = IAltVuePaginationProps

/**
 * Vue wrapper for Core Pagination
 */
const meta: Meta<TVuePaginationStoryMeta> = {
  title: '✅ Pagination',
  id: 'pagination',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => {
    const [, updateArgs] = useArgs()

    return {
      components: { AltPagination },
      setup() {
        const handleUpdatePage = (page: number) => {
          updateArgs({ page })
        }

        return { args, handleUpdatePage }
      },
      template: `
        <AltPagination v-bind="args" @update:page="handleUpdatePage" />
      `,
    }
  },
  argTypes: { ...altCorePaginationStoryMeta.argTypes },
  args: { ...altCorePaginationStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
