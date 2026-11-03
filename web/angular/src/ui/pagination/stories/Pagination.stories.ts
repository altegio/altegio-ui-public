import type { Meta, StoryObj } from '@storybook/angular'
import { useArgs } from 'storybook/preview-api'

import { AltPagination } from '~ng/ui/pagination'
import altCorePaginationStoryMeta from '~core/ui/pagination/stories/Pagination.stories'

/**
 * Angular wrapper for Core Pagination
 */
const meta: Meta<AltPagination> = {
  title: '✅ Pagination',
  id: 'pagination',
  parameters: { controls: { sort: 'alpha' } },
  component: AltPagination,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    const [, updateArgs] = useArgs()

    return {
      props: {
        ...args,
        onPageChange: (page: number) => {
          updateArgs({ page })
        },
      },
      template: `
        <AltPagination
          [page]="page"
          [itemsPerPage]="itemsPerPage"
          [total]="total"
          [disabled]="disabled"
          (changePage)="onChangePage($event)"
          (pageChange)="onPageChange($event)"
        />`,
    }
  },
  argTypes: { ...altCorePaginationStoryMeta.argTypes },
  args: { ...altCorePaginationStoryMeta.args },
} satisfies Meta<AltPagination>

export default meta
type Story = StoryObj<AltPagination>

export const Playground: Story = { args: {} }
